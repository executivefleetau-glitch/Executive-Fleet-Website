import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getMelbourneDayBounds, getMelbourneDateStr, getMelbourneHour, getReconstructedTimestamp } from "@/lib/timezone";

// Force dynamic rendering - this route uses cookies
export const dynamic = 'force-dynamic';

// Simple in-memory cache with 60 second TTL
// Longer cache since query is now fast and efficient
let cache = {
  data: null,
  timestamp: null,
  ttl: 60000, // 60 seconds (can be increased if needed)
};

function getCachedData() {
  if (cache.data && cache.timestamp && (Date.now() - cache.timestamp < cache.ttl)) {
    return cache.data;
  }
  return null;
}

function setCachedData(data) {
  cache.data = data;
  cache.timestamp = Date.now();
}

export async function GET(request) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Check cache first (skip DB queries if cached)
    const cachedStats = getCachedData();
    if (cachedStats) {
      console.log('[Dashboard Stats] ⚡ Returning cached data');
      return NextResponse.json(cachedStats);
    }

    console.log('[Dashboard Stats] 📦 Starting smart fetch (last 12 months)...');
    const startTime = Date.now();

    const now = new Date();
    // Use Melbourne-aware day boundaries (not server-local time)
    const { start: todayStart, end: todayEnd } = getMelbourneDayBounds(now);

    // Smart approach: Fetch only last 12 months of data
    // This keeps performance consistent regardless of total DB size
    const twelveMonthsAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    // ONE main query + contacts + total count + website visits
    const [recentBookings, allContacts, totalBookingsCount, websiteVisitsCount] = await Promise.all([
      // Fetch last 12 months of bookings (all fields needed for calculations)
      prisma.booking.findMany({
        where: {
          createdAt: {
            gte: twelveMonthsAgo,
          },
        },
        select: {
          id: true,
          status: true,
          contactStatus: true,
          createdAt: true,
          pickupDate: true,
          pickupTime: true,
          pickupLocation: true,
          dropoffLocation: true,
          vehicleName: true,
          vehicleType: true,
          customerName: true,
          customerPhone: true,
          bookingReference: true,
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Contacts (typically not many, so fetch all)
      prisma.contactSubmission.findMany({
        select: { createdAt: true },
      }),

      // Quick count for total bookings
      prisma.booking.count(),

      // Real website visits count
      prisma.websiteVisit.count(),
    ]);

    console.log(`[Dashboard Stats] ✅ Fetched ${recentBookings.length} bookings (last 12mo) in ${Date.now() - startTime}ms`);
    console.log('[Dashboard Stats] 🧮 Calculating stats from in-memory data...');

    // All calculations done in JavaScript - super fast!
    const stats = {
      // Today's bookings
      todayBookings: recentBookings.filter(b => {
        const created = new Date(b.createdAt);
        return created >= todayStart && created <= todayEnd;
      }).length,

      // Upcoming week bookings
      upcomingWeekBookings: recentBookings.filter(b => {
        const pickup = new Date(b.pickupDate);
        return pickup >= now && pickup <= weekFromNow;
      }).length,

      // Pending quotes (uncontacted)
      pendingQuotes: recentBookings.filter(b => b.contactStatus === 'uncontacted').length,

      // Confirmed bookings
      confirmedBookings: recentBookings.filter(b => b.status === 'confirmed').length,

      // Contacts today
      contactsToday: allContacts.filter(c => {
        const created = new Date(c.createdAt);
        return created >= todayStart && created <= todayEnd;
      }).length,

      websiteVisits: websiteVisitsCount,

      // Bookings over time (last 30 days)
      bookingsOverTime: generateBookingsOverTime(
        recentBookings.filter(b => {
          const created = new Date(b.createdAt);
          return created >= thirtyDaysAgo;
        }),
        30
      ),

      // Booking status breakdown
      statusBreakdown: {
        pending: recentBookings.filter(b => b.status === 'pending').length,
        confirmed: recentBookings.filter(b => b.status === 'confirmed').length,
        cancelled: recentBookings.filter(b => b.status === 'cancelled').length,
        completed: recentBookings.filter(b => b.status === 'completed').length,
      },

      // Vehicle type popularity (from recent bookings)
      vehiclePopularity: getVehiclePopularity(recentBookings),

      // Top pickup locations (from recent bookings)
      topLocations: getTopPickupLocations(recentBookings),

      // Bookings by time of day (from recent bookings)
      bookingsByTimeOfDay: getBookingsByTimeOfDay(recentBookings),

      // Funnel data
      funnel: {
        contacts: allContacts.length,
        quoteSent: recentBookings.filter(b => b.contactStatus === 'contacted').length,
        confirmed: recentBookings.filter(b => b.status === 'confirmed').length,
      },

      // Upcoming trips (next 48 hours) - FIXED to use reconstructed timestamp
      upcomingTrips: recentBookings
        .filter(b => {
          if (b.status !== 'confirmed') return false;
          const pickupTimestamp = getReconstructedTimestamp(b.pickupDate, b.pickupTime);
          if (!pickupTimestamp) return false;
          return pickupTimestamp >= now && pickupTimestamp <= in48Hours;
        })
        .sort((a, b) => {
          const aTime = getReconstructedTimestamp(a.pickupDate, a.pickupTime);
          const bTime = getReconstructedTimestamp(b.pickupDate, b.pickupTime);
          return aTime - bTime;
        })
        .slice(0, 5)
        .map(b => ({
          id: b.id,
          customerName: b.customerName,
          customerPhone: b.customerPhone,
          bookingReference: b.bookingReference,
          pickupLocation: b.pickupLocation,
          dropoffLocation: b.dropoffLocation,
          pickupDate: b.pickupDate,
          pickupTime: b.pickupTime,
          vehicleName: b.vehicleName,
        })),

      // Next 24 hours trips - urgent/imminent trips
      next24HoursTrips: recentBookings
        .filter(b => {
          if (b.status !== 'confirmed') return false;
          const pickupTimestamp = getReconstructedTimestamp(b.pickupDate, b.pickupTime);
          if (!pickupTimestamp) return false;
          return pickupTimestamp >= now && pickupTimestamp <= in24Hours;
        })
        .sort((a, b) => {
          const aTime = getReconstructedTimestamp(a.pickupDate, a.pickupTime);
          const bTime = getReconstructedTimestamp(b.pickupDate, b.pickupTime);
          return aTime - bTime;
        })
        .map(b => ({
          id: b.id,
          customerName: b.customerName,
          customerPhone: b.customerPhone,
          bookingReference: b.bookingReference,
          pickupLocation: b.pickupLocation,
          dropoffLocation: b.dropoffLocation,
          pickupDate: b.pickupDate,
          pickupTime: b.pickupTime,
          vehicleName: b.vehicleName,
        })),

      // Metadata (useful for monitoring)
      _meta: {
        totalBookings: totalBookingsCount,
        recentBookings: recentBookings.length,
        dataRange: 'Last 12 months',
        calculationTime: `${Date.now() - startTime}ms`,
      },
    };

    // Cache the results
    setCachedData(stats);

    console.log(`[Dashboard Stats] ✅ Total time: ${Date.now() - startTime}ms`);
    console.log(`[Dashboard Stats] Results cached for ${cache.ttl / 1000} seconds`);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to fetch dashboard statistics";
    let statusCode = 500;

    if (error.code === 'P1001') {
      errorMessage = "Database connection error. Please check your connection.";
      statusCode = 503;
    } else if (error.code === 'P1002') {
      errorMessage = "Database timeout. Please try again.";
      statusCode = 504;
    } else if (error.message?.includes('timeout')) {
      errorMessage = "Request timeout. The database took too long to respond.";
      statusCode = 504;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

function generateBookingsOverTime(bookingsWithDate, days) {
  const result = [];
  const now = new Date();

  // Create a map for faster lookups — group by Melbourne date
  const bookingsByDate = new Map();

  bookingsWithDate.forEach(b => {
    const dateKey = getMelbourneDateStr(new Date(b.createdAt));
    bookingsByDate.set(dateKey, (bookingsByDate.get(dateKey) || 0) + 1);
  });

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = getMelbourneDateStr(date);
    const count = bookingsByDate.get(dateKey) || 0;

    result.push({
      date: dateKey,
      bookings: count,
    });
  }

  return result;
}

function getVehiclePopularity(bookings) {
  const vehicleCounts = {};

  bookings.forEach(b => {
    const vehicle = b.vehicleName || b.vehicleType || 'Unknown';
    vehicleCounts[vehicle] = (vehicleCounts[vehicle] || 0) + 1;
  });

  return Object.entries(vehicleCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

function getTopPickupLocations(bookings) {
  const locationCounts = {};

  bookings.forEach(b => {
    // Extract suburb/city from pickup location (simplified)
    const location = b.pickupLocation || 'Unknown';
    const suburb = location.split(',')[0].trim();
    locationCounts[suburb] = (locationCounts[suburb] || 0) + 1;
  });

  return Object.entries(locationCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getBookingsByTimeOfDay(bookings) {
  const timeSlots = {
    '00-03': 0, '03-06': 0, '06-09': 0, '09-12': 0,
    '12-15': 0, '15-18': 0, '18-21': 0, '21-24': 0,
  };

  bookings.forEach(b => {
    if (b.pickupTime) {
      // Use Melbourne hour (not server-local or UTC)
      const hour = getMelbourneHour(b.pickupTime, b.pickupDate);
      if (hour === null) return;

      if (hour >= 0 && hour < 3) timeSlots['00-03']++;
      else if (hour >= 3 && hour < 6) timeSlots['03-06']++;
      else if (hour >= 6 && hour < 9) timeSlots['06-09']++;
      else if (hour >= 9 && hour < 12) timeSlots['09-12']++;
      else if (hour >= 12 && hour < 15) timeSlots['12-15']++;
      else if (hour >= 15 && hour < 18) timeSlots['15-18']++;
      else if (hour >= 18 && hour < 21) timeSlots['18-21']++;
      else timeSlots['21-24']++;
    }
  });

  return Object.entries(timeSlots).map(([slot, count]) => ({ slot, count }));
}
