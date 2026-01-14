"use client";
import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { supabase } from "@/lib/supabase";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPriceQuoteModal, setShowPriceQuoteModal] = useState(false);
  const [emailBooking, setEmailBooking] = useState(null);
  const [priceQuoteBooking, setPriceQuoteBooking] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(false);
  const [outboundFare, setOutboundFare] = useState("");
  const [returnFare, setReturnFare] = useState("");
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  // Simplified pricing for new quotation modal
  const [additionalCharges, setAdditionalCharges] = useState([]); // [{description: 'Airport fee', amount: '50'}]
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
  const [discountValue, setDiscountValue] = useState("");
  const [discountReason, setDiscountReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // New explicit pricing states for consistency
  const [calculatedSubtotal, setCalculatedSubtotal] = useState(0);
  const [calculatedDiscountAmount, setCalculatedDiscountAmount] = useState(0);

  // Follow Up Modal States
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpBooking, setFollowUpBooking] = useState(null);
  const [followUpAction, setFollowUpAction] = useState('reminder'); // 'reminder', 'discount', 'message', 'call', 'lost'
  const [followUpNote, setFollowUpNote] = useState("");
  const [followUpDiscountType, setFollowUpDiscountType] = useState('percentage');
  const [followUpDiscountValue, setFollowUpDiscountValue] = useState("");

  // Helper function to check if a follow-up action has already been sent
  // Backend stores tags like "Reminder (07/01)", so we check if any tag includes the action name
  const hasFollowUpBeenSent = (booking, action) => {
    if (!booking?.followUpTags || !Array.isArray(booking.followUpTags)) return false;
    const actionLower = action.toLowerCase();
    return booking.followUpTags.some(tag =>
      tag.toLowerCase().includes(actionLower)
    );
  };


  // Filter states
  const [activeTab, setActiveTab] = useState("upcoming");
  const [contactFilter, setContactFilter] = useState("all");

  // Helper function to format time properly
  const formatTime = (timeValue, booking = null) => {
    if (!timeValue) return 'N/A';

    try {
      // 1. Handle simple HH:MM strings (e.g. from user input)
      if (typeof timeValue === 'string' && timeValue.match(/^\d{1,2}:\d{2}$/)) {
        const [hours, minutes] = timeValue.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
      }

      // 2. Handle Date objects or ISO strings (e.g. from database)
      const date = new Date(timeValue);
      if (isNaN(date.getTime())) return 'N/A';

      // Use Intl to force Melbourne time and AM/PM format
      return new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Melbourne',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'N/A';
    }
  };

  // Helper to reconstruct a full Melbourne Date from separate Date and Time parts
  const getReconstructedTimestamp = (dateValue, timeValue) => {
    if (!dateValue || !timeValue) return null;
    try {
      const d = new Date(dateValue);
      const t = new Date(timeValue);
      if (isNaN(d.getTime()) || isNaN(t.getTime())) return null;

      // Create a string: YYYY-MM-DDTHH:mm:ss
      // We use UTC methods because Prisma usually returns @db.Date/Time as UTC midnights or 1970 UTC
      const dateStr = d.toISOString().split('T')[0];
      const timeStr = t.toISOString().split('T')[1];

      // Combined string: e.g. "2026-01-15T19:00:00.000Z"
      // Wait, if the DB stores HH:MM:SS but we read it as a Date object, it might be offset.
      // However, Prisma @db.Time is usually "1970-01-01T[Time]Z".
      // So timeStr is correctly the HH:MM:SS.

      const combinedIso = `${dateStr}T${timeStr}`;
      return new Date(combinedIso); // This is now a proper absolute timestamp
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    fetchBookings();

    // Set up Realtime subscription to the Signals table
    const channel = supabase
      .channel('realtime-booking-signals')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'booking_signals'
        },
        (payload) => {
          console.log('🔄 Booking signal received, refreshing data...', payload);
          // When a signal is received (insert/update/delete on bookings),
          // we re-fetch the data securely from the API without showing the loading spinner
          fetchBookings(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendFollowUp = async () => {
    if (!followUpBooking) return;

    setSendingEmail(true); // Reusing sendingEmail loading state for simplicity

    try {
      const response = await fetch('/api/admin/follow-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: followUpBooking.id,
          action: followUpAction,
          note: followUpNote,
          discountType: followUpDiscountType,
          discountValue: followUpDiscountValue
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setShowFollowUpModal(false);
        setFollowUpBooking(null);
        setFollowUpNote("");
        // Refresh bookings to see any status changes
        fetchBookings();
        alert('Follow-up action completed successfully!');
      } else {
        alert(data.message || 'Failed to send follow-up');
      }
    } catch (error) {
      console.error('Error sending follow-up:', error);
      alert('An error occurred while sending the follow-up.');
    } finally {
      setSendingEmail(false);
    }
  };

  const fetchBookings = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await fetch("/api/admin/bookings");
      if (response.ok) {
        const data = await response.json();

        // Process bookings with simple 1-to-1 mapping
        // The API now handles splitting confirmed Return trips into separate records.
        // We only add 'tags' for display purposes.
        const processedBookings = (data.bookings || []).map(booking => {
          let typeTag = 'One Way';

          if (booking.isReturnTrip) {
            typeTag = 'Round Trip'; // Pending quotes or un-split bookings
          } else if (booking.bookingReference.endsWith('-R') || booking.specialInstructions?.includes('Return leg')) {
            typeTag = 'Return Leg';
          } else if (booking.specialInstructions?.includes('Outbound leg')) {
            typeTag = 'Outbound';
          }

          // Reconstruct timestamp for accurate sorting and filtering
          const precisePickupTime = getReconstructedTimestamp(booking.pickupDate, booking.pickupTime);

          return {
            ...booking,
            tripType: typeTag,
            displayStatus: booking.status,
            displayDate: booking.pickupDate,
            displayTime: precisePickupTime || booking.pickupTime, // Use reconstructed for table display too
            precisePickupTime: precisePickupTime,
            displayPickup: booking.pickupLocation,
            displayDropoff: booking.dropoffLocation,
            isVirtualReturn: false // No longer using virtual rows
          };
        });

        // Sort by arrival time (Newest first) - ABSOLUTE PRIORITY
        processedBookings.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Descending: Newest at the top
        });

        setBookings(processedBookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Handle status change (triggers return trip splitting for confirmed bookings)
  const handleStatusChange = async (booking, newStatus) => {
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const data = await response.json();

        // If the booking was split, show a message
        if (data.split) {
          alert(`Booking confirmed and split into Outbound and Return legs!`);
        }

        // Refresh bookings to show the updated/split bookings
        await fetchBookings(false);
      } else {
        const error = await response.json();
        alert(`Failed to update status: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('An error occurred while updating the booking status.');
    }
  };

  // Calculate real-time counts for tabs
  const getTabCounts = () => {
    const counts = {
      upcoming: 0,
      quotes: 0,
      booked: 0,
      history: 0
    };

    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    (bookings || []).forEach(booking => {
      // Quotes (Pending)
      if (booking.displayStatus === 'pending') {
        counts.quotes++;
      }
      // Booked (Confirmed)
      else if (booking.displayStatus === 'confirmed') {
        counts.booked++;
      }
      // History (Completed/Cancelled)
      else if (['completed', 'cancelled'].includes(booking.displayStatus)) {
        counts.history++;
      }

      // Upcoming (24h) - Independent check
      const pickupDate = booking.precisePickupTime ? new Date(booking.precisePickupTime) : null;
      if (
        pickupDate &&
        !isNaN(pickupDate.getTime()) &&
        pickupDate.getTime() >= now.getTime() &&
        pickupDate.getTime() <= twentyFourHoursLater.getTime() &&
        booking.displayStatus === 'confirmed'
      ) {
        counts.upcoming++;
      }
    });

    return counts;
  };

  const tabCounts = getTabCounts();

  // Filter bookings based on selected filters
  const getFilteredBookings = () => {
    let filtered = [...bookings];
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    switch (activeTab) {
      case 'upcoming':
        // Filter: Recent/Upcoming in next 24 hours
        filtered = filtered.filter(booking => {
          const pickupDate = booking.precisePickupTime ? new Date(booking.precisePickupTime) : null;
          return (
            pickupDate &&
            !isNaN(pickupDate.getTime()) &&
            pickupDate.getTime() >= now.getTime() &&
            pickupDate.getTime() <= twentyFourHoursLater.getTime() &&
            booking.displayStatus === 'confirmed'
          );
        });
        break;
      case 'quotes':
        // Filter: Status is 'pending'
        filtered = filtered.filter(booking => booking.displayStatus === 'pending');
        break;
      case 'booked':
        // Filter: Status is 'confirmed'
        filtered = filtered.filter(booking => booking.displayStatus === 'confirmed');
        break;
      case 'history':
        // Filter: Status is 'completed' or 'cancelled'
        filtered = filtered.filter(booking => ['completed', 'cancelled'].includes(booking.displayStatus));
        break;
      default:
        break;
    }

    // Filter by contact status - applies to the parent booking
    if (contactFilter !== "all") {
      filtered = filtered.filter(booking => booking.contactStatus === contactFilter);
    }

    return filtered;
  };

  const filteredBookings = getFilteredBookings();



  const handleDelete = async (id) => {
    // Professional confirmation dialog
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this booking? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookings(bookings.filter((b) => b.id !== id));

        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        `;
        notification.textContent = "✅ Booking deleted successfully!";
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 3000);
      } else {
        // Create error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
        notification.textContent = "❌ Failed to delete booking. Please try again.";
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 4000);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Create error notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
        color: #ffffff;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      `;
      notification.textContent = "❌ Network error. Please try again.";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 4000);
    }
  };

  const openEmailModal = (booking) => {
    setEmailBooking(booking);
    // Set a professional default message template
    const defaultMessage = `Thank you for your booking with Executive Fleet.

We are writing to you regarding your booking reference: ${booking.bookingReference || 'your recent booking'}.

[Please add your message here]

If you have any questions or need to make any changes, please don't hesitate to contact us.

Best regards,
The Executive Fleet Team`;

    setEmailMessage(defaultMessage);
    setShowEmailModal(true);
  };

  const handleSendEmail = async () => {
    if (!emailMessage.trim()) {
      // Create a professional notification instead of alert
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(206, 155, 40, 0.3);
      `;
      notification.textContent = "Please enter a message before sending";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailBooking.customerEmail,
          subject: `Regarding Your Booking - ${emailBooking.bookingReference}`,
          message: emailMessage,
          customerName: emailBooking.customerName,
        }),
      });

      if (response.ok) {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        `;
        notification.textContent = `✅ Email sent successfully to ${emailBooking.customerName}!`;
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 4000);

        setShowEmailModal(false);
        setEmailMessage("");
        setEmailBooking(null);
      } else {
        // Create error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
        notification.textContent = "❌ Failed to send email. Please try again.";
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 4000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Create error notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
        color: #ffffff;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      `;
      notification.textContent = "❌ Network error. Please check your connection.";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 4000);
    } finally {
      setSendingEmail(false);
    }
  };

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const openPriceQuoteModal = (booking) => {
    setPriceQuoteBooking(booking);
    setOutboundFare("");
    setReturnFare("");
    setAdditionalCharges([]);
    setDiscountType('percentage');
    setDiscountValue("");
    setDiscountReason("");
    setAdditionalNotes("");
    setCalculatedTotal(0);
    setShowPriceQuoteModal(true);
  };

  // Add a new additional charge
  const addAdditionalCharge = () => {
    setAdditionalCharges([...additionalCharges, { description: '', amount: '' }]);
  };

  // Remove an additional charge
  const removeAdditionalCharge = (index) => {
    setAdditionalCharges(additionalCharges.filter((_, i) => i !== index));
  };

  // Update additional charge
  const updateAdditionalCharge = (index, field, value) => {
    const updated = [...additionalCharges];
    updated[index][field] = value;
    setAdditionalCharges(updated);
  };

  // Calculate total quote in real-time
  // Calculate total quote in real-time
  useEffect(() => {
    const outboundAmount = parseFloat(outboundFare) || 0;

    // Only include return fare if it's a return trip
    const isReturn = priceQuoteBooking?.isReturnTrip;
    const returnAmount = isReturn ? (parseFloat(returnFare) || 0) : 0;

    const baseFare = outboundAmount + returnAmount;

    // Calculate additional charges total
    const additionalTotal = additionalCharges.reduce((sum, charge) => {
      return sum + (parseFloat(charge.amount) || 0);
    }, 0);

    const subtotal = baseFare + additionalTotal;
    setCalculatedSubtotal(subtotal);

    // Calculate discount
    let discountAmount = 0;
    const discountVal = parseFloat(discountValue) || 0;

    if (discountVal > 0) {
      if (discountType === 'percentage') {
        // Percentage applied to the entire subtotal (Outbound + Return + Extras)
        discountAmount = subtotal * (discountVal / 100);
      } else {
        // Fixed amount
        discountAmount = discountVal;
      }
    }

    setCalculatedDiscountAmount(discountAmount);

    const total = Math.max(0, subtotal - discountAmount);
    setCalculatedTotal(total);
  }, [outboundFare, returnFare, additionalCharges, discountType, discountValue, priceQuoteBooking]);


  const handleSendPriceQuote = async () => {
    if (!outboundFare || parseFloat(outboundFare) <= 0) {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(206, 155, 40, 0.3);
      `;
      notification.textContent = "Please enter outbound fare";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
      return;
    }

    if (priceQuoteBooking?.isReturnTrip && (!returnFare || parseFloat(returnFare) <= 0)) {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(206, 155, 40, 0.3);
      `;
      notification.textContent = "Please enter return fare for return trip";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
      return;
    }

    setSendingQuote(true);
    try {
      // Prepare additional charges for API
      const formattedCharges = additionalCharges
        .filter(charge => charge.description && charge.amount)
        .map(charge => ({
          description: charge.description,
          amount: parseFloat(charge.amount)
        }));

      const response = await fetch("/api/admin/send-price-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: priceQuoteBooking.id,
          outboundFare: parseFloat(outboundFare),
          returnFare: priceQuoteBooking.isReturnTrip ? parseFloat(returnFare) : 0,
          additionalCharges: formattedCharges.length > 0 ? formattedCharges : null,
          discountType: discountType,
          discountValue: discountValue ? parseFloat(discountValue) : 0,
          discountReason: discountReason || null,
          additionalNotes: additionalNotes || null,
          totalAmount: calculatedTotal,
        }),
      });

      if (response.ok) {
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        `;
        notification.textContent = `✅ Price quote sent successfully to ${priceQuoteBooking.customerName}!`;
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 4000);

        setShowPriceQuoteModal(false);
        setOutboundFare("");
        setReturnFare("");
        setPriceQuoteBooking(null);
        fetchBookings(false); // Refresh silently to get updated booking
      } else {
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
        notification.textContent = "❌ Failed to send price quote. Please try again.";
        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 4000);
      }
    } catch (error) {
      console.error("Error sending price quote:", error);
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
        color: #ffffff;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      `;
      notification.textContent = "❌ Network error. Please check your connection.";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 4000);
    } finally {
      setSendingQuote(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#E8B429";
      case "confirmed":
        return "#4ade80";
      case "cancelled":
        return "#ef4444";
      case "completed":
        return "#3b82f6";
      default:
        return "#888888";
    }
  };


  return (
    <DashboardLayout>
      <div className="bookings-page" style={{ padding: '30px', backgroundColor: '#f9fafb', minHeight: '100vh' }} >
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 10px 0' }}>Bookings</h1>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>Manage all your transport reservations</p>
        </div>

        <div className="content-card" style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {/* Tabs & Filters Header */}
          <div className="tabs-header" style={{
            padding: '20px 30px 0 30px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            paddingBottom: '0'
          }}>
            <div className="tabs-list">
              {[
                { id: 'upcoming', label: 'Upcoming (24h)' },
                { id: 'quotes', label: 'Quotes' },
                { id: 'booked', label: 'Booked' },
                { id: 'history', label: 'History' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0 0 15px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #ce9b28' : '2px solid transparent',
                    color: activeTab === tab.id ? '#ce9b28' : '#6b7280',
                    fontWeight: activeTab === tab.id ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label} <span style={{
                    fontSize: '12px',
                    backgroundColor: activeTab === tab.id ? '#fffbeb' : '#f3f4f6',
                    color: activeTab === tab.id ? '#b45309' : '#6b7280',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    marginLeft: '6px'
                  }}>
                    {tabCounts[tab.id]}
                  </span>
                </button>
              ))}
            </div>

            <div className="filter-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <select
                value={contactFilter}
                onChange={(e) => setContactFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  color: '#374151',
                  outline: 'none'
                }}
              >
                <option value="all">All Contacts</option>
                <option value="uncontacted">Uncontacted</option>
                <option value="contacted">Contacted</option>
              </select>

              {contactFilter !== "all" && (
                <button
                  onClick={() => setContactFilter("all")}
                  style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            activeTab !== "upcoming" || contactFilter !== "all" ? (
              <div className="empty-state" style={{ color: '#374151' }}>
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6l3-3h12l3 3v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 style={{ color: '#111827' }}>No Bookings Found</h3>
                <p style={{ color: '#4b5563' }}>No bookings match your current filters.</p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setActiveTab("upcoming");
                    setContactFilter("all");
                  }}
                  style={{ marginTop: '20px' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="empty-state" style={{ color: '#374151' }}>
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6l3-3h12l3 3v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 style={{ color: '#111827' }}>No Bookings Yet</h3>
                <p style={{ color: '#4b5563' }}>Bookings will appear here once customers make reservations.</p>
              </div>
            )
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="table-container desktop-view">
                <table className="bookings-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', width: '10%' }}>Booking Ref</th>
                      <th style={{ textAlign: 'left', width: '18%' }}>Customer</th>
                      <th style={{ textAlign: 'left', width: '12%', minWidth: '120px' }}>Pickup Date/Time</th>
                      <th style={{ textAlign: 'left', width: '18%', minWidth: '140px' }}>Route</th>
                      <th style={{ textAlign: 'left', width: '12%', minWidth: '100px' }}>Vehicle</th>
                      <th style={{ textAlign: 'center', width: '14%', minWidth: '150px' }}>Status</th>
                      <th style={{ textAlign: 'right', paddingRight: '10px', width: '10%' }}>Contact Status</th>
                      <th style={{ textAlign: 'right', width: '6%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking, index) => (
                      <tr key={booking.id}>
                        {/* Booking Reference & Tags */}
                        <td style={{ width: '10%', verticalAlign: 'middle', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', gap: '3px' }}>
                            <span className="booking-ref" style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>
                              {booking.bookingReference || `BKG-0${String(index + 1).padStart(3, '0')}`}
                            </span>

                            {/* Trip Type Badge - Conditional */}
                            {booking.displayStatus !== 'pending' && ['Outbound', 'Return Leg'].includes(booking.tripType) && (
                              <span style={{
                                fontSize: '10px',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: '600',
                                backgroundColor: booking.tripType === 'Return Leg' ? '#fff1f2' : '#f0fdf4',
                                color: booking.tripType === 'Return Leg' ? '#be123c' : '#15803d',
                                border: `1px solid ${booking.tripType === 'Return Leg' ? '#fda4af' : '#bbf7d0'}`,
                                width: 'fit-content',
                                letterSpacing: '0.3px'
                              }}>
                                {booking.tripType === 'Return Leg' ? '↩ Return Leg' : '↗ Outbound'}
                              </span>
                            )}


                            {/* Follow-up Badge - Simplified Count */}
                            {booking.followUpTags && booking.followUpTags.length > 0 && (
                              <span style={{
                                fontSize: '10px',
                                padding: '1px 5px',
                                borderRadius: '3px',
                                fontWeight: '500',
                                backgroundColor: '#eff6ff',
                                color: '#2563eb',
                                border: '1px solid #bfdbfe',
                                whiteSpace: 'nowrap',
                                width: 'fit-content'
                              }}>
                                {booking.followUpTags.length} Follow-up{booking.followUpTags.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Customer Info */}
                        < td style={{ width: '18%', verticalAlign: 'middle', overflow: 'hidden' }}>
                          <div className="customer-info" style={{ gap: '2px', maxWidth: '100%' }}>
                            <p className="customer-name" style={{ marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{booking.customerName}</p>
                            <a href={`mailto:${booking.customerEmail}`} className="customer-email" style={{ marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                              {booking.customerEmail}
                            </a>
                            <span className="customer-phone" style={{ whiteSpace: 'nowrap' }}>📞 {booking.customerPhone}</span>
                          </div>
                        </td>

                        {/* Pickup Date & Time */}
                        <td style={{ width: '12%', minWidth: '120px', verticalAlign: 'middle' }}>
                          <div className="datetime-cell">
                            <div className="date-row">
                              <span className="date-icon">📅</span>
                              <span className="date-text">
                                {new Date(booking.displayDate).toLocaleDateString('en-AU', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  timeZone: 'Australia/Melbourne'
                                })}
                              </span>
                            </div>
                            <div className="time-row">
                              <span className="time-icon">🕐</span>
                              <span className="time-text">
                                {formatTime(booking.displayTime)}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Route (From → To) */}
                        <td style={{ width: '18%', minWidth: '140px', verticalAlign: 'middle', overflow: 'hidden' }}>
                          <div className="route-cell" style={{ maxWidth: '100%' }}>
                            <div className="location-row from" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <span className="location-icon">📍</span>
                              <span className="location-text" title={booking.displayPickup}>
                                {booking.displayPickup}
                              </span>
                            </div>
                            <div className="arrow-row">→</div>
                            <div className="location-row to" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <span className="location-icon">🎯</span>
                              <span className="location-text" title={booking.displayDropoff}>
                                {booking.displayDropoff}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Vehicle */}
                        <td style={{ width: '12%', minWidth: '100px', verticalAlign: 'middle' }}>
                          <div className="vehicle-info">
                            <span className="vehicle-name">{booking.vehicleName}</span>
                            <span className="vehicle-passengers">👥 {booking.numberOfPassengers}</span>
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td style={{ width: '14%', minWidth: '150px', verticalAlign: 'middle' }}>
                          <select
                            value={booking.displayStatus}
                            onChange={(e) => handleStatusChange(booking, e.target.value)}
                            style={{
                              padding: '4px 4px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '600',
                              border: '1px solid #e5e7eb',
                              backgroundColor: getStatusColor(booking.displayStatus),
                              color: '#ffffff',
                              cursor: 'pointer',
                              outline: 'none',
                              textTransform: 'capitalize',
                              width: '100%',
                              textAlign: 'center'
                            }}
                          >
                            <option value="pending" style={{ color: '#000' }}>Pending</option>
                            <option value="confirmed" style={{ color: '#000' }}>Confirmed</option>
                            <option value="completed" style={{ color: '#000' }}>Completed</option>
                            <option value="cancelled" style={{ color: '#000' }}>Cancelled</option>
                          </select>
                        </td>

                        {/* Contact Status */}
                        <td style={{ width: '10%', verticalAlign: 'middle', textAlign: 'right', paddingRight: '10px' }}>
                          <span
                            className="status-badge"
                            style={{
                              backgroundColor: booking.contactStatus === 'contacted' ? '#10b981' : '#6b7280',
                              color: '#ffffff',
                              padding: '4px 10px',
                              borderRadius: '3px',
                              fontSize: '9px',
                              fontWeight: '600',
                              display: 'inline-block',
                              whiteSpace: 'nowrap',
                              textAlign: 'center'
                            }}
                          >
                            {booking.contactStatus === 'contacted' ? 'Contacted' : 'Uncontacted'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ width: '6%', textAlign: 'right', verticalAlign: 'middle' }}>
                          <div className="action-buttons" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                            <button
                              className="btn-view"
                              onClick={() => viewDetails(booking)}
                              title="View Details"
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(booking.id)}
                              title="Delete"
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-cards-container mobile-view">
                {filteredBookings.map((booking, index) => (
                  <div key={booking.id} className="booking-card">
                    <div className="card-header">
                      <div className="card-id-section">
                        <span className="card-label">Booking Ref</span>
                        <span className="card-id">{booking.bookingReference || `BKG-0${String(index + 1).padStart(3, '0')}`}</span>
                        {/* Trip Type Badge - Mobile Conditional */}
                        {booking.displayStatus !== 'pending' && ['Outbound', 'Return Leg'].includes(booking.tripType) && (
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: '600',
                            backgroundColor: booking.tripType === 'Return Leg' ? '#fff1f2' : '#f0fdf4',
                            color: booking.tripType === 'Return Leg' ? '#be123c' : '#15803d',
                            border: `1px solid ${booking.tripType === 'Return Leg' ? '#fda4af' : '#bbf7d0'}`,
                            width: 'fit-content',
                            letterSpacing: '0.3px',
                            marginTop: '2px'
                          }}>
                            {booking.tripType === 'Return Leg' ? '↩ Return Leg' : '↗ Outbound'}
                          </span>
                        )}
                      </div>
                      <div className="card-actions-top">
                        <button
                          className="btn-view-icon"
                          onClick={() => viewDetails(booking)}
                          title="View Details"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          className="btn-delete-icon"
                          onClick={() => handleDelete(booking.id)}
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="card-row">
                      <span className="card-label">Customer</span>
                      <span className="card-value">{booking.customerName}</span>
                    </div>

                    <div className="card-row">
                      <span className="card-label">Email</span>
                      <span className="card-value">{booking.customerEmail}</span>
                    </div>

                    <div className="card-row">
                      <span className="card-label">Pickup</span>
                      <span className="card-value">
                        {new Date(booking.pickupDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'Australia/Melbourne' })} • {formatTime(booking.pickupTime)}
                      </span>
                    </div>

                    <div className="card-row">
                      <span className="card-label">Route</span>
                      <span className="card-value route-compact">📍 → 🎯</span>
                    </div>

                    <div className="card-row">
                      <span className="card-label">Status</span>
                      <span className="card-status-badges">
                        <span
                          className="mini-badge"
                          style={{
                            backgroundColor: getStatusColor(booking.status),
                            color: '#ffffff'
                          }}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.isReturnTrip && <span className="mini-badge return">🔄 Return</span>}
                        <span
                          className="mini-badge"
                          style={{
                            backgroundColor: booking.contactStatus === 'contacted' ? '#10b981' : '#6b7280',
                            color: '#ffffff'
                          }}
                        >
                          {booking.contactStatus === 'contacted' ? 'Contacted' : 'Uncontacted'}
                        </span>
                      </span>
                    </div>

                    <button
                      className="btn-send"
                      onClick={() => viewDetails(booking)}
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Booking Details Modal */}
          {
            showDetails && selectedBooking && (
              <div className="modal-overlay" onClick={() => setShowDetails(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Booking Details</h2>
                    <button
                      className="modal-close"
                      onClick={() => setShowDetails(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="modal-body" style={{ padding: '24px', backgroundColor: '#f9fafb' }}>

                    {/* Top Grid: Customer & Activity */}
                    <div className="details-top-grid">

                      {/* Customer Card */}
                      <div className="detail-card" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <h3 className="section-title" style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Customer Details</h3>
                          <span className="id-badge" style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#374151', letterSpacing: '0.5px' }}>
                            {selectedBooking.bookingReference}
                          </span>
                        </div>

                        <div className="info-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div className="info-item">
                            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px', letterSpacing: '0.5px' }}>Name</label>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedBooking.customerName}</div>
                          </div>
                          <div className="info-grid-2col">
                            <div className="info-item">
                              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px', letterSpacing: '0.5px' }}>Phone</label>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>{selectedBooking.customerPhone}</div>
                            </div>
                            <div className="info-item">
                              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px', letterSpacing: '0.5px' }}>Passengers</label>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>{selectedBooking.numberOfPassengers} Pax</div>
                            </div>
                          </div>
                          <div className="info-item">
                            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px', letterSpacing: '0.5px' }}>Email</label>
                            <a href={`mailto:${selectedBooking.customerEmail}`} style={{ fontSize: '14px', fontWeight: '500', color: '#2563eb', textDecoration: 'none' }}>{selectedBooking.customerEmail}</a>
                          </div>
                          <div className="info-item">
                            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px', letterSpacing: '0.5px' }}>Service Type</label>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedBooking.serviceType}</div>
                          </div>
                        </div>
                      </div>

                      {/* Activity & Quick Stats Card */}
                      <div className="detail-card" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                        <h3 className="section-title" style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#111827' }}>Activity History</h3>

                        <div style={{ flex: 1, backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', border: '1px dashed #e2e8f0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px', borderRadius: '50%' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                            </div>
                            <span style={{ fontWeight: '600', color: '#1e40af', fontSize: '14px' }}>
                              {selectedBooking.followUpTags?.length || 0} Follow-ups Sent
                            </span>
                          </div>
                          {selectedBooking.followUpTags?.length > 0 ? (
                            <div style={{ paddingLeft: '34px', fontSize: '13px', color: '#64748b' }}>
                              Latest: <span style={{ fontWeight: '500', color: '#334155' }}>{selectedBooking.followUpTags[selectedBooking.followUpTags.length - 1]}</span>
                            </div>
                          ) : (
                            <div style={{ paddingLeft: '34px', fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                              No activity recorded yet.
                            </div>
                          )}
                        </div>

                        {/* Status Highlights */}
                        <div className="status-grid-2col" style={{ marginTop: '20px', gap: '12px' }}>
                          <div style={{
                            padding: '10px', borderRadius: '8px',
                            backgroundColor: selectedBooking.status === 'confirmed' ? '#f0fdf4' : '#fff7ed',
                            border: `1px solid ${selectedBooking.status === 'confirmed' ? '#bbf7d0' : '#ffedd5'}`
                          }}>
                            <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Status</label>
                            <span style={{ fontWeight: '700', color: selectedBooking.status === 'confirmed' ? '#166534' : '#9a3412', textTransform: 'capitalize' }}>
                              {selectedBooking.status}
                            </span>
                          </div>
                          <div style={{
                            padding: '10px', borderRadius: '8px',
                            backgroundColor: selectedBooking.contactStatus === 'contacted' ? '#ecfdf5' : '#f3f4f6',
                            border: `1px solid ${selectedBooking.contactStatus === 'contacted' ? '#a7f3d0' : '#e5e7eb'}`
                          }}>
                            <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Contact</label>
                            <span style={{ fontWeight: '700', color: selectedBooking.contactStatus === 'contacted' ? '#047857' : '#4b5563' }}>
                              {selectedBooking.contactStatus === 'contacted' ? 'Contacted' : 'Uncontacted'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Journey Section - Timeline Style */}
                    <div className={`journey-grid ${selectedBooking.isReturnTrip ? 'has-return' : ''}`} style={{ marginBottom: '24px' }}>

                      {/* Outbound */}
                      <div className="journey-card outbound" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '4px solid #f59e0b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                          <span style={{ fontSize: '18px' }}>↗</span>
                          <h3 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Outbound Journey</h3>
                          <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '500', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>
                            {new Date(selectedBooking.pickupDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'Australia/Melbourne' })}
                          </span>
                        </div>

                        <div className="timeline" style={{ position: 'relative', paddingLeft: '16px' }}>
                          {/* Decorative Line */}
                          <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '24px', width: '2px', backgroundColor: '#e5e7eb' }}></div>

                          {/* Pickup */}
                          <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <div style={{ position: 'absolute', left: '-16px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', border: '2px solid white', boxShadow: '0 0 0 1px #f59e0b' }}></div>
                            <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>PICKUP • {formatTime(selectedBooking.pickupTime)}</label>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>{selectedBooking.pickupLocation}</div>
                          </div>

                          {/* Dropoff */}
                          <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-16px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid white', boxShadow: '0 0 0 1px #111827' }}></div>
                            <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>
                              DROPOFF {selectedBooking.expectedEndTime && `• ~${formatTime(selectedBooking.expectedEndTime)}`}
                            </label>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>{selectedBooking.dropoffLocation}</div>
                          </div>
                        </div>

                        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>🚘</span>
                          <div>
                            <label style={{ display: 'block', fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>VEHICLE</label>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{selectedBooking.vehicleName}</div>
                          </div>
                        </div>
                      </div>

                      {/* Return - Conditional */}
                      {selectedBooking.isReturnTrip && (
                        <div className="journey-card return" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '4px solid #3b82f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                            <span style={{ fontSize: '18px' }}>↩</span>
                            <h3 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Return Journey</h3>
                            <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '500', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>
                              {selectedBooking.returnDate ? new Date(selectedBooking.returnDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'Australia/Melbourne' }) : 'Date TBD'}
                            </span>
                          </div>

                          <div className="timeline" style={{ position: 'relative', paddingLeft: '16px' }}>
                            <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '24px', width: '2px', backgroundColor: '#e5e7eb' }}></div>

                            <div style={{ position: 'relative', marginBottom: '24px' }}>
                              <div style={{ position: 'absolute', left: '-16px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '2px solid white', boxShadow: '0 0 0 1px #3b82f6' }}></div>
                              <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>PICKUP • {formatTime(selectedBooking.returnTime)}</label>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>{selectedBooking.returnPickupLocation || selectedBooking.dropoffLocation}</div>
                            </div>

                            <div style={{ position: 'relative' }}>
                              <div style={{ position: 'absolute', left: '-16px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid white', boxShadow: '0 0 0 1px #111827' }}></div>
                              <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>DROPOFF</label>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>{selectedBooking.returnDropoffLocation || selectedBooking.pickupLocation}</div>
                            </div>
                          </div>

                          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '16px' }}>🚘</span>
                            <div>
                              <label style={{ display: 'block', fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>VEHICLE</label>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{selectedBooking.vehicleName}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Extras Section (Flight, Child Seats, Instructions) */}
                    {(selectedBooking.serviceType === "Airport Transfer" && selectedBooking.flightNumber || (selectedBooking.hasChildren && (selectedBooking.babyCapsule > 0 || selectedBooking.babySeat > 0 || selectedBooking.boosterSeat > 0)) || selectedBooking.specialInstructions) && (
                      <div className="extras-section" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
                        <h3 className="section-title" style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>📋</span> Additional Requirements
                        </h3>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                          {/* Flight Info */}
                          {selectedBooking.serviceType === "Airport Transfer" && selectedBooking.flightNumber && (
                            <div className="extra-item" style={{ flex: '1 1 200px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 'bold', marginBottom: '4px' }}>Flight Details</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontWeight: '600', color: '#1f2937' }}>{selectedBooking.flightNumber}</span>
                                {selectedBooking.terminalType && <span style={{ fontSize: '12px', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>{selectedBooking.terminalType}</span>}
                              </div>
                            </div>
                          )}

                          {/* Child Seats */}
                          {(selectedBooking.hasChildren && (selectedBooking.babyCapsule > 0 || selectedBooking.babySeat > 0 || selectedBooking.boosterSeat > 0)) && (
                            <div className="extra-item" style={{ flex: '1 1 200px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 'bold', marginBottom: '4px' }}>Child Seats</label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {selectedBooking.babyCapsule > 0 && <span style={{ fontSize: '12px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>Capsule: {selectedBooking.babyCapsule}</span>}
                                {selectedBooking.babySeat > 0 && <span style={{ fontSize: '12px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>Baby Seat: {selectedBooking.babySeat}</span>}
                                {selectedBooking.boosterSeat > 0 && <span style={{ fontSize: '12px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>Booster: {selectedBooking.boosterSeat}</span>}
                              </div>
                            </div>
                          )}

                          {/* Special Instructions */}
                          {selectedBooking.specialInstructions && (
                            <div className="extra-item" style={{ flex: '1 1 100%', backgroundColor: '#fffbeb', padding: '12px', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#b45309', fontWeight: 'bold', marginBottom: '4px' }}>Special Instructions</label>
                              <p style={{ margin: 0, fontSize: '13px', color: '#92400e', lineHeight: '1.4' }}>{selectedBooking.specialInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Actions Footer - Sticky */}
                    <div className="quick-actions-section" style={{ position: 'sticky', bottom: '-24px', backgroundColor: 'white', padding: '20px', borderTop: '1px solid #e5e7eb', margin: '0 -24px -24px -24px', borderRadius: '0 0 12px 12px', boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <h3 className="quick-actions-title" style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Quick Actions</h3>

                      {/* Main Action Logic */}
                      {selectedBooking.contactStatus === 'contacted' ? (
                        <>
                          <div className="quote-status-banner" style={{
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <div style={{
                              backgroundColor: '#22c55e',
                              color: 'white',
                              borderRadius: '50%',
                              width: '24px',
                              minWidth: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>✓</div>
                            <div className="quote-status-text">
                              <div style={{ fontWeight: '700', color: '#15803d', fontSize: '15px' }}>
                                Quote sent: ${parseFloat(selectedBooking.quotedPrice || selectedBooking.finalPrice || selectedBooking.calculatedTotal || 0).toFixed(2)}
                              </div>
                              <div style={{ fontSize: '12px', color: '#16a34a' }}>
                                Sent on {selectedBooking.quoteSentAt
                                  ? new Date(selectedBooking.quoteSentAt).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne', dateStyle: 'short', timeStyle: 'short' })
                                  : new Date(selectedBooking.updatedAt || Date.now()).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne', dateStyle: 'short', timeStyle: 'short' })}
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn-follow-up-primary"
                            onClick={() => {
                              setShowDetails(false);
                              setFollowUpBooking(selectedBooking);
                              setShowFollowUpModal(true);
                              setFollowUpAction('reminder');
                            }}
                            style={{ width: '100%', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Follow Up with Customer
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn-send-quote-primary"
                          onClick={() => {
                            setShowDetails(false);
                            openPriceQuoteModal(selectedBooking);
                          }}
                          style={{ width: '100%', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Send Quote with Pricing
                        </button>
                      )}

                      {/* Secondary Actions */}
                      <div className="secondary-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                        <button
                          className="btn-calendar"
                          onClick={() => alert('Add to Calendar feature coming soon!')}
                          style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Add to Calendar
                        </button>
                        <button
                          className="btn-whatsapp"
                          onClick={() => alert('Send WhatsApp feature coming soon!')}
                          style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Send WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* Send Email Modal */}
          {
            showEmailModal && emailBooking && (
              <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Send Email Reply</h2>
                    <button
                      className="modal-close"
                      onClick={() => setShowEmailModal(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="detail-row">
                      <span className="detail-label">To:</span>
                      <span className="detail-value">
                        <a href={`mailto:${emailBooking.customerEmail}`}>{emailBooking.customerEmail}</a>
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Subject:</span>
                      <span className="detail-value">Regarding Your Booking - {emailBooking.bookingReference}</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="emailMessage" className="detail-label">Message</label><br /><br />
                      <textarea
                        id="emailMessage"
                        className="modal-textarea"
                        rows="6"
                        placeholder="Type your reply..."
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                      />
                    </div>

                    <div className="modal-actions">
                      <button
                        className="btn-reply"
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sendingEmail ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* NEW SIMPLIFIED PRICE QUOTE MODAL */}
          {
            showPriceQuoteModal && priceQuoteBooking && (
              <div className="modal-overlay" onClick={() => setShowPriceQuoteModal(false)}>
                <div className="modal-content new-quote-modal" onClick={(e) => e.stopPropagation()}>
                  {/* Modal Header */}
                  <div className="new-quote-header">
                    <h2 className="new-quote-title">
                      <span className="dollar-icon">$</span>
                      Send Quote to {priceQuoteBooking.customerName}
                    </h2>
                    <button
                      className="modal-close"
                      onClick={() => setShowPriceQuoteModal(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="new-quote-body">
                    {/* Customer Details Section */}
                    <div className="customer-details-card">
                      <h3 className="section-heading">Customer Details</h3>
                      <div className="customer-grid">
                        <div className="customer-col">
                          <p><strong>Name:</strong> {priceQuoteBooking.customerName}</p>
                          <p><strong>Email:</strong> {priceQuoteBooking.customerEmail}</p>
                        </div>
                        <div className="customer-col">
                          <p><strong>Phone:</strong> {priceQuoteBooking.customerPhone}</p>
                          <p><strong>Vehicle:</strong> {priceQuoteBooking.vehicleName}</p>
                          <p><strong>Passengers:</strong> {priceQuoteBooking.numberOfPassengers}</p>
                        </div>
                      </div>
                    </div>

                    {/* Return Trip Alert - Conditional */}
                    {priceQuoteBooking.isReturnTrip && (
                      <div className="return-trip-alert">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Return Trip Detected - Please enter pricing for both journeys</span>
                      </div>
                    )}

                    {/* Base Fares Section */}
                    <div className="base-fares-section">
                      <div className="fare-field">
                        <label htmlFor="outboundFare">Outbound Base Fare ($) *</label>
                        <input
                          id="outboundFare"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Enter base fare"
                          value={outboundFare}
                          onChange={(e) => setOutboundFare(e.target.value)}
                          className="fare-input-new"
                        />
                      </div>

                      {/* Return Fare - Only if return trip */}
                      {priceQuoteBooking.isReturnTrip && (
                        <div className="fare-field">
                          <label htmlFor="returnFare">Return Base Fare ($) *</label>
                          <input
                            id="returnFare"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter return fare"
                            value={returnFare}
                            onChange={(e) => setReturnFare(e.target.value)}
                            className="fare-input-new"
                          />
                        </div>
                      )}
                    </div>

                    {/* Additional Charges Section */}
                    <div className="additional-charges-section">
                      <div className="section-header-row">
                        <h3 className="section-heading-dark">Additional Charges (Optional)</h3>
                        <button
                          type="button"
                          className="add-item-btn-new"
                          onClick={addAdditionalCharge}
                        >
                          <span className="plus-icon">+</span>
                          Add Item
                        </button>
                      </div>

                      {additionalCharges.map((charge, index) => (
                        <div key={index} className="charge-row-new">
                          <input
                            type="text"
                            placeholder="Description (e.g., Airport fee, Tolls)"
                            value={charge.description}
                            onChange={(e) => updateAdditionalCharge(index, 'description', e.target.value)}
                            className="charge-description-input"
                          />
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Amount"
                            value={charge.amount}
                            onChange={(e) => updateAdditionalCharge(index, 'amount', e.target.value)}
                            className="charge-amount-input"
                          />
                          <button
                            type="button"
                            className="delete-charge-btn"
                            onClick={() => removeAdditionalCharge(index)}
                            title="Remove item"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Discount Section */}
                    <div className="discount-section-new">
                      <h3 className="section-heading-with-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Discount (Optional)
                      </h3>

                      <div className="discount-fields-row">
                        <div className="discount-field">
                          <label htmlFor="discountType">Type</label>
                          <select
                            id="discountType"
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            className="discount-type-select-new"
                          >
                            <option value="percentage">% Percentage</option>
                            <option value="fixed">$ Fixed</option>
                          </select>
                        </div>

                        <div className="discount-field">
                          <label htmlFor="discountValue">
                            {discountType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                          </label>
                          <input
                            id="discountValue"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder={discountType === 'percentage' ? 'e.g., 5' : 'e.g., 50'}
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            className="discount-value-input-new"
                          />
                        </div>

                        <div className="discount-field discount-reason-field">
                          <label htmlFor="discountReason">Reason (Optional)</label>
                          <input
                            id="discountReason"
                            type="text"
                            placeholder="e.g., Return booking"
                            value={discountReason}
                            onChange={(e) => setDiscountReason(e.target.value)}
                            className="discount-reason-input-new"
                          />
                        </div>
                      </div>

                      {parseFloat(discountValue) > 0 && (
                        <div className="discount-applied-banner">
                          <strong>Discount Applied:</strong> {discountType === 'percentage' ? `${discountValue}%` : `$${parseFloat(discountValue).toFixed(2)}`} =
                          <span className="discount-amount-text"> -${calculatedDiscountAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    {/* Total Quote Breakdown (Yellow Box) */}
                    <div className="total-quote-breakdown">
                      <div className="breakdown-row">
                        <span className="breakdown-label">Subtotal:</span>
                        <span className="breakdown-value">
                          ${calculatedSubtotal.toFixed(2)}
                        </span>
                      </div>

                      {parseFloat(discountValue) > 0 && (
                        <div className="breakdown-row">
                          <span className="breakdown-label highlight-green">Discount:</span>
                          <span className="breakdown-value highlight-green">
                            -${calculatedDiscountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="breakdown-divider"></div>

                      <div className="breakdown-row total-row">
                        <span className="breakdown-label">Total Quote:</span>
                        <span className="breakdown-value">${calculatedTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Additional Notes Section */}
                    <div className="additional-notes-section">
                      <label htmlFor="additionalNotes" className="notes-label">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="additionalNotes"
                        placeholder="Any special instructions or information for the customer..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="notes-textarea"
                        rows="4"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="quote-modal-actions">
                      <button
                        type="button"
                        className="cancel-quote-btn"
                        onClick={() => setShowPriceQuoteModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="send-quote-btn"
                        onClick={handleSendPriceQuote}
                        disabled={sendingQuote || !outboundFare || (priceQuoteBooking.isReturnTrip && !returnFare)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {sendingQuote ? 'Sending...' : 'Send Quote'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* FOLLOW UP MODAL */}
          {
            showFollowUpModal && followUpBooking && (
              <div className="modal-overlay" onClick={() => setShowFollowUpModal(false)}>
                <div className="modal-content follow-up-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>

                  {/* Header */}
                  <div className="modal-header" style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>Follow Up</h2>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Select an action to move this booking forward.</p>
                    </div>
                    <button className="modal-close" onClick={() => setShowFollowUpModal(false)} style={{ fontSize: '20px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                  </div>

                  <div className="modal-body" style={{ padding: '24px', backgroundColor: '#f9fafb' }}>

                    {/* Context Ticket */}
                    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', marginBottom: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '15px' }}>{followUpBooking.customerName}</span>
                          <span style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>{followUpBooking.bookingReference}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>
                          {followUpBooking.pickupDate ? new Date(followUpBooking.pickupDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date TBD'} • {formatTime(followUpBooking.pickupTime)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '600', marginBottom: '2px' }}>Current Quote</div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: '#059669' }}>
                          ${parseFloat(followUpBooking.quotedPrice || followUpBooking.finalPrice || followUpBooking.calculatedTotal || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Action Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                      {[
                        { id: 'reminder', icon: '👋', label: 'Reminder', color: '#3b82f6', activeBg: '#eff6ff', activeBorder: '#bfdbfe' },
                        { id: 'discount', icon: '🏷️', label: 'Discount', color: '#10b981', activeBg: '#ecfdf5', activeBorder: '#a7f3d0' },
                        { id: 'message', icon: '✉️', label: 'Message', color: '#8b5cf6', activeBg: '#f5f3ff', activeBorder: '#ddd6fe' },
                        { id: 'call', icon: '📞', label: 'Log Call', color: '#f59e0b', activeBg: '#fffbeb', activeBorder: '#fcd34d' },
                        { id: 'lost', icon: '🚫', label: 'Mark Lost', color: '#ef4444', activeBg: '#fef2f2', activeBorder: '#fecaca' }
                      ].map(action => {
                        const isSent = hasFollowUpBeenSent(followUpBooking, action.id);
                        const isActive = followUpAction === action.id;
                        return (
                          <div
                            key={action.id}
                            onClick={() => !isSent && setFollowUpAction(action.id)}
                            style={{
                              backgroundColor: isActive ? action.activeBg : 'white',
                              border: `1px solid ${isActive ? action.activeBorder : isSent ? '#f3f4f6' : '#e5e7eb'}`,
                              borderRadius: '10px',
                              padding: '16px 12px',
                              cursor: isSent ? 'default' : 'pointer',
                              opacity: isSent ? 0.6 : 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              transition: 'all 0.2s ease',
                              boxShadow: isActive ? `0 4px 6px -1px ${action.activeBorder}40` : '0 1px 2px rgba(0,0,0,0.05)',
                              transform: isActive ? 'translateY(-2px)' : 'none'
                            }}
                          >
                            <span style={{ fontSize: '20px' }}>{isSent ? '✓' : action.icon}</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: isActive ? action.color : '#4b5563' }}>{action.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dynamic Content Area */}
                    <div style={{ minHeight: '120px' }}>

                      {/* Reminder Info */}
                      {followUpAction === 'reminder' && (
                        <div style={{ backgroundColor: '#eff6ff', border: '1px dashed #bfdbfe', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '20px' }}>👋</span>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>Send Gentle Reminder</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: '#3b82f6', lineHeight: '1.5' }}>
                              We'll send a friendly email reminding {followUpBooking.customerName.split(' ')[0]} about their quote. No extra text needed.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Call Log Info */}
                      {followUpAction === 'call' && (
                        <div style={{ backgroundColor: '#fffbeb', border: '1px dashed #fcd34d', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '20px' }}>📞</span>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#b45309' }}>Log Phone Interaction</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: '#d97706', lineHeight: '1.5' }}>
                              Record that you spoke with the customer. No email will be sent.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Lost Lead Info */}
                      {followUpAction === 'lost' && (
                        <div style={{ backgroundColor: '#fef2f2', border: '1px dashed #fecaca', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '20px' }}>🚫</span>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#991b1b' }}>Mark as Lost</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: '#ef4444', lineHeight: '1.5' }}>
                              Remove this booking from your active pipeline. You can still access it in History.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Message Input */}
                      {followUpAction === 'message' && (
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Your Message</label>
                          <textarea
                            value={followUpNote}
                            onChange={(e) => setFollowUpNote(e.target.value)}
                            placeholder="Type your personal message here..."
                            rows={4}
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                            onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        </div>
                      )}

                      {/* Discount Input */}
                      {followUpAction === 'discount' && (
                        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#166534' }}>Configure Discount</h4>

                          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#15803d', fontWeight: '700', marginBottom: '6px' }}>Type</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => setFollowUpDiscountType('percentage')}
                                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: followUpDiscountType === 'percentage' ? '1px solid #166534' : '1px solid #bbf7d0', backgroundColor: followUpDiscountType === 'percentage' ? '#166534' : 'white', color: followUpDiscountType === 'percentage' ? 'white' : '#166534', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                  % Percent
                                </button>
                                <button
                                  onClick={() => setFollowUpDiscountType('fixed')}
                                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: followUpDiscountType === 'fixed' ? '1px solid #166534' : '1px solid #bbf7d0', backgroundColor: followUpDiscountType === 'fixed' ? '#166534' : 'white', color: followUpDiscountType === 'fixed' ? 'white' : '#166534', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                  $ Fixed
                                </button>
                              </div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#15803d', fontWeight: '700', marginBottom: '6px' }}>Value ({followUpDiscountType === 'percentage' ? '%' : '$'})</label>
                              <input
                                type="number"
                                value={followUpDiscountValue}
                                onChange={(e) => setFollowUpDiscountValue(e.target.value)}
                                placeholder={followUpDiscountType === 'percentage' ? '10' : '50'}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '14px', outline: 'none' }}
                              />
                            </div>
                          </div>

                          {/* Price Preview */}
                          {(() => {
                            const original = parseFloat(followUpBooking.quotedPrice || followUpBooking.finalPrice || followUpBooking.subtotal || 0);
                            let da = 0;
                            if (followUpDiscountType === 'percentage') {
                              da = original * (parseFloat(followUpDiscountValue || 0) / 100);
                            } else {
                              da = parseFloat(followUpDiscountValue || 0);
                            }
                            const final = Math.max(0, original - da);

                            return (
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                                <span style={{ fontSize: '13px', color: '#374151' }}>New Price:</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '13px' }}>${original.toFixed(2)}</span>
                                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#16a34a' }}>${final.toFixed(2)}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                    </div>

                    {/* Footer - Sticky */}
                    <div className="quick-actions-section" style={{ position: 'sticky', bottom: '-24px', backgroundColor: 'white', padding: '20px', borderTop: '1px solid #e5e7eb', margin: '24px -24px -24px -24px', borderRadius: '0 0 12px 12px', boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', gap: '12px' }}>
                      <button
                        className="btn-cancel"
                        onClick={() => setShowFollowUpModal(false)}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: 'white', color: '#374151', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-confirm-follow-up"
                        onClick={handleSendFollowUp}
                        disabled={sendingEmail}
                        style={{
                          flex: 2,
                          padding: '12px',
                          borderRadius: '8px',
                          border: 'none',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          backgroundColor: followUpAction === 'lost' ? '#ef4444' : followUpAction === 'call' ? '#f59e0b' : '#3b82f6'
                        }}
                      >
                        {sendingEmail ? 'Processing...' : (
                          <>
                            <span>
                              {followUpAction === 'lost' ? 'Mark as Lost' :
                                followUpAction === 'call' ? 'Log Call' :
                                  followUpAction === 'discount' ? 'Send Offer' :
                                    'Send Follow-up'}
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div >



      <style jsx>{`
        .bookings-page {
          max-width: 1600px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #ce9b28 0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 10px 0;
        }

        .page-subtitle {
          color: #888888;
          font-size: 16px;
          margin: 0;
        }

        .refresh-btn {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .refresh-btn svg {
          width: 18px;
          height: 18px;
          stroke: #000000;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Filters Container */
        .filters-container {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          padding: 20px;
          background: rgba(26, 26, 26, 0.95);
          border-radius: 12px;
          margin-bottom: 20px;
          border: 1px solid rgba(206, 155, 40, 0.2);
          position: relative;
          z-index: 100;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }

        .filter-group label {
          font-size: 13px;
          font-weight: 600;
          color: #ce9b28;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select {
          padding: 10px 16px;
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          min-width: 180px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
          appearance: auto;
        }

        .filter-select option {
          background: #1a1a1a;
          color: #ffffff;
          padding: 10px;
        }

        .filter-select:hover {
          border-color: rgba(206, 155, 40, 0.6);
          background: rgba(206, 155, 40, 0.05);
        }

        .filter-select:focus {
          outline: none;
          border-color: #ce9b28;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
          z-index: 20;
        }

        .clear-filters-btn {
          padding: 10px 20px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000000;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .clear-filters-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          color: #E8B429;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(206, 155, 40, 0.2);
          border-top-color: #E8B429;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 20px;
          stroke: #E8B429;
        }

        .empty-state h3 {
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .empty-state p {
          color: #888888;
          margin: 0;
        }

        /* Desktop Table View */
        .desktop-view {
          display: block;
        }

        .mobile-view {
          display: none;
        }

        .table-container {
          background: #1a1a1a;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 12px;
          overflow: hidden;
        }

        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .bookings-table thead {
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.2) 0%, transparent 100%);
        }

        .bookings-table th {
          padding: 10px 12px;
          text-align: left;
          font-size: 10px;
          font-weight: 700;
          color: #E8B429;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
          white-space: nowrap;
        }

        .bookings-table td {
          padding: 10px 12px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          vertical-align: top;
        }

        /* Column widths */
        .bookings-table th:nth-child(1),
        .bookings-table td:nth-child(1) { width: 12%; } /* Booking Ref */
        .bookings-table th:nth-child(2),
        .bookings-table td:nth-child(2) { width: 11%; } /* Customer */
        .bookings-table th:nth-child(3),
        .bookings-table td:nth-child(3) { width: 11%; } /* Pickup Date/Time */
        .bookings-table th:nth-child(4),
        .bookings-table td:nth-child(4) { width: 18%; } /* Route */
        .bookings-table th:nth-child(5),
        .bookings-table td:nth-child(5) { width: 9%; }  /* Vehicle */
        .bookings-table th:nth-child(6) { 
          width: 7%; 
          text-align: center;
        } /* Return - Header */
        .bookings-table td:nth-child(6) { 
          width: 7%; 
          text-align: center;
        } /* Return - Cell */
        
        .bookings-table th:nth-child(7) { 
          width: 7%; 
          text-align: center;
        } /* Status - Header */
        .bookings-table td:nth-child(7) { 
          width: 7%; 
          text-align: center;
        } /* Status - Cell */
        
        .bookings-table th:nth-child(8) { 
          width: 9%; 
          text-align: center;
        } /* Contact - Header */
        .bookings-table td:nth-child(8) { 
          width: 9%; 
          text-align: center;
        } /* Contact - Cell */
        .bookings-table th:nth-child(9),
        .bookings-table td:nth-child(9) { width: 16%; } /* Actions */

        .bookings-table tbody tr {
          transition: background 0.3s ease;
        }

        .bookings-table tbody tr:hover {
          background: rgba(206, 155, 40, 0.05);
        }

        .booking-ref {
          font-family: 'Courier New', monospace;
          font-weight: 700;
          color: #ce9b28;
          font-size: 11px;
          padding: 2px 6px;
          background: rgba(206, 155, 40, 0.1);
          border-radius: 3px;
          border: 1px solid rgba(206, 155, 40, 0.3);
          white-space: nowrap;
          display: inline-block;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .customer-name {
          margin: 0;
          font-weight: 600;
          color: #ffffff;
          font-size: 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-email {
          margin: 0;
          font-size: 10px;
          color: #E8B429;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-email:hover {
          text-decoration: underline;
        }

        .customer-phone {
          font-size: 9px;
          color: #888888;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Datetime Cell Styling */
        .datetime-cell {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .date-row,
        .time-row {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 6px;
          border-radius: 3px;
        }

        .date-row {
          background: rgba(206, 155, 40, 0.1);
          border-left: 2px solid #ce9b28;
        }

        .time-row {
          background: rgba(0, 0, 0, 0.3);
          border-left: 2px solid #888888;
        }

        .date-icon,
        .time-icon {
          font-size: 11px;
          flex-shrink: 0;
        }

        .date-text,
        .time-text {
          font-size: 10px;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
        }

        .time-text {
          color: #ce9b28;
        }

        /* Route Cell Styling */
        .route-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .location-row {
          display: flex;
          align-items: flex-start;
          gap: 4px;
          padding: 2px 4px;
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.2);
        }

        .location-row.from {
          border-left: 2px solid #3b82f6;
        }

        .location-row.to {
          border-left: 2px solid #10b981;
        }

        .location-icon {
          font-size: 10px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .location-text {
          font-size: 10px;
          color: #cccccc;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-word;
        }

        .arrow-row {
          text-align: center;
          color: #ce9b28;
          font-size: 10px;
          font-weight: bold;
          padding: 1px 0;
        }

        /* Vehicle Info */
        .vehicle-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .vehicle-name {
          font-weight: 600;
          color: #ffffff;
          font-size: 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vehicle-passengers {
          font-size: 9px;
          color: #ce9b28;
          font-weight: 500;
        }

        .return-badge {
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 600;
          white-space: nowrap;
          display: inline-block;
        }

        .return-badge.yes {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .return-badge.no {
          background: rgba(107, 114, 128, 0.2);
          color: #9ca3af;
          border: 1px solid rgba(107, 114, 128, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          display: inline-block;
        }

        .action-buttons {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .action-buttons button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid rgba(206, 155, 40, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          color: #e8b429;
          padding: 0;
        }

        .action-buttons button svg {
          width: 14px;
          height: 14px;
          stroke: #e8b429 !important;
        }

        .btn-view {
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-view svg {
          stroke: #e8b429 !important;
        }

        .btn-view:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
        }

        .btn-price-quote {
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-price-quote svg {
          stroke: #e8b429 !important;
        }

        .btn-price-quote:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
        }

        .btn-delete {
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-delete svg {
          stroke: #e8b429 !important;
        }

        .btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
        }

        /* Mobile Card View - Theme Colors (Black with Golden) */
        .mobile-cards-container {
          display: flex;
          flex-direction: column;
          gap: 30px !important;
          margin-bottom: 30px;
        }

        .booking-card {
          background: #000000;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(206, 155, 40, 0.3);
          position: relative;
          transition: all 0.3s ease;
          margin-bottom: 20px !important;
        }

        .booking-card:hover {
          border-color: #ce9b28;
          box-shadow: 0 8px 24px rgba(206, 155, 40, 0.2);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
        }

        .card-id-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-label {
          font-size: 12px;
          color: #999999;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-id {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-actions-top {
          display: flex;
          gap: 12px;
        }

        .btn-view-icon,
        .btn-delete-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #e8b429;
        }

        .btn-view-icon {
          background: rgba(206, 155, 40, 0.15);
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-view-icon svg {
          width: 20px;
          height: 20px;
          stroke: #e8b429 !important;
        }

        .btn-view-icon:hover {
          background: rgba(206, 155, 40, 0.25);
          border-color: #ce9b28;
          transform: translateY(-2px);
        }

        .btn-delete-icon {
          background: rgba(206, 155, 40, 0.15);
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-delete-icon svg {
          width: 20px;
          height: 20px;
          stroke: #e8b429 !important;
        }

        .btn-delete-icon:hover {
          background: rgba(206, 155, 40, 0.25);
          border-color: #ce9b28;
          transform: translateY(-2px);
        }

        .card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .card-row:last-of-type {
          border-bottom: none;
          margin-bottom: 20px;
        }

        .card-row .card-label {
          color: #999999;
        }

        .card-value {
          font-size: 15px;
          color: #ffffff;
          font-weight: 600;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-value.route-compact {
          font-size: 18px;
        }

        .card-status {
          font-size: 15px;
          font-weight: 700;
          text-align: right;
        }

        .card-status-badges {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .mini-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .mini-badge.return {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .btn-send {
          width: 100%;
          padding: 16px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-send::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.5s ease;
          z-index: 0;
          border: 2px solid #ce9b28;
        }

        .btn-send:hover::before {
          left: 0;
        }

        .btn-send:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .btn-send span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .btn-send:hover span {
          color: #e8b429;
        }

        /* Email Modal Styles */
        .form-group {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-group label {
          display: block;
          color: #E8B429;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.5px;
          margin-bottom: 0;
          order: 1;
        }

        .form-group .modal-textarea {
          order: 2;
        }

        .modal-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 10px;
          color: #ffffff;
          padding: 12px;
          font-size: 15px;
          min-height: 140px;
          resize: vertical;
          transition: all 0.3s ease;
          margin-top: 0;
          position: relative;
          z-index: 1;
        }

        .modal-textarea:focus {
          outline: none;
          border-color: #E8B429;
          box-shadow: 0 0 0 2px rgba(232, 180, 41, 0.2);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-content {
          background: #1a1a1a;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 16px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
        }

        .modal-header h2 {
          margin: 0;
          color: #E8B429;
          font-size: 24px;
        }

        .modal-close {
          background: transparent;
          border: 2px solid rgba(206, 155, 40, 0.3);
          color: #E8B429;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(206, 155, 40, 0.2);
          border-color: #E8B429;
        }

        .modal-body {
          padding: 30px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detail-row.full {
          flex-direction: column;
          gap: 10px;
        }

        .detail-label {
          color: #888888;
          font-weight: 600;
        }

        .detail-value {
          color: #ffffff;
          font-weight: 500;
        }

        .detail-value a {
          color: #E8B429;
          text-decoration: none;
        }

        .detail-value a:hover {
          text-decoration: underline;
        }

        .message-box {
          background: rgba(0, 0, 0, 0.4);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid rgba(206, 155, 40, 0.2);
          color: #ffffff;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .modal-actions {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }

        .btn-reply {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-reply svg {
          width: 20px;
          height: 20px;
          stroke: #000000;
        }

        .btn-reply:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.5);
        }

        /* Enhanced Details Modal Sections */
        .details-section {
          margin-bottom: 25px;
          
          
        }

        .details-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .section-title {
          color: #E8B429;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Quick Actions Section */
        .quick-actions-section {
          
        }

        .quick-actions-title {
          color: #888888;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 16px 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .btn-send-quote-primary {
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(206, 155, 40, 0.2);
        }

        .btn-send-quote-primary svg {
          width: 18px;
          height: 18px;
          stroke: #ffffff;
        }

        .btn-send-quote-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(206, 155, 40, 0.35);
          background: linear-gradient(90deg, #E8B429 0%, #ce9b28 100%);
        }

        .secondary-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn-calendar,
        .btn-whatsapp {
          padding: 12px 16px;
          background: #ffffff;
          color: #555555;
          border: 1.5px solid rgba(206, 155, 40, 0.25);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-calendar svg,
        .btn-whatsapp svg {
          width: 16px;
          height: 16px;
          stroke: #555555;
        }

        .btn-calendar:hover,
        .btn-whatsapp:hover {
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.04);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(206, 155, 40, 0.15);
          color: #333333;
        }

        .btn-calendar:hover svg,
        .btn-whatsapp:hover svg {
          stroke: #ce9b28;
        }


        .journey-section {
          background: rgba(206, 155, 40, 0.05);
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #ce9b28;
        }

        .journey-section.outbound {
          background: rgba(206, 155, 40, 0.08);
        }

        .journey-section.return {
          background: rgba(91, 155, 213, 0.08);
          border-left-color: #5b9bd5;
        }

        /* Price Quote Modal Styles */
        .price-quote-modal {
          max-width: 800px;
        }

        .quote-section {
          margin-bottom: 25px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(206, 155, 40, 0.2);
        }

        .quote-section-title {
          color: #E8B429;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .outbound-section {
          border-left: 4px solid #ce9b28;
          background: rgba(206, 155, 40, 0.08);
        }

        .return-section {
          border-left: 4px solid #5b9bd5;
          background: rgba(91, 155, 213, 0.08);
        }

        .journey-details {
          margin-bottom: 20px;
        }

        .journey-details p {
          margin: 8px 0;
          color: #ffffff;
          font-size: 14px;
          line-height: 1.6;
        }

        .journey-details strong {
          color: #E8B429;
          margin-right: 8px;
        }

        .fare-input-group {
          margin-top: 15px;
        }

        .fare-input-group label {
          display: block;
          color: #E8B429;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .fare-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .fare-input:focus {
          outline: none;
          border-color: #E8B429;
          box-shadow: 0 0 0 3px rgba(232, 180, 41, 0.2);
        }

        .fare-input::placeholder {
          color: #666666;
        }

        /* Pricing Summary */
        .pricing-summary {
          background: rgba(206, 155, 40, 0.1);
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 15px;
        }

        .price-row.subtotal {
          font-weight: 700;
          border-bottom: 2px solid rgba(206, 155, 40, 0.3);
          padding-top: 15px;
        }

        .price-row.discount {
          background: rgba(34, 197, 94, 0.1);
          padding: 12px 15px;
          margin: 10px -20px;
          border-bottom: none;
          color: #4ade80;
          font-weight: 600;
        }

        .price-row.discount small {
          display: block;
          font-size: 11px;
          color: #4ade80;
          margin-top: 2px;
        }

        .price-row.total {
          background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%);
          padding: 18px 20px;
          margin: 15px -20px -20px -20px;
          border-radius: 0 0 10px 10px;
          font-size: 18px;
          font-weight: 800;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
        }

        .special-offer {
          background: #fff3cd;
          border: 2px solid #d4a574;
          border-left: 4px solid #ce9b28;
          color: #856404;
          padding: 12px 15px;
          border-radius: 8px;
          margin: 15px 0 0 0;
          font-size: 13px;
          font-weight: 700;
        }

        .btn-send-quote {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-send-quote svg {
          width: 20px;
          height: 20px;
          stroke: #000000;
        }

        .btn-send-quote:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.5);
        }

        .btn-send-quote:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Child Seats Section */
        .child-seats-section {
          background: rgba(255, 248, 225, 0.3);
          border-left: 4px solid #ce9b28;
        }

        .child-seats-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .child-seat-item-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #f0e6d2;
        }

        .seat-icon {
          font-size: 24px;
        }

        .seat-name {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .seat-quantity {
          font-size: 18px;
          font-weight: 700;
          color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
          padding: 4px 12px;
          border-radius: 6px;
          min-width: 40px;
          text-align: center;
        }

        /* Additional Items Section */
        .additional-items-section {
          background: rgba(240, 247, 255, 0.3);
          border-left: 4px solid #5b9bd5;
        }

        .price-item-row {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 12px;
          align-items: start;
          margin-bottom: 15px;
          padding: 15px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e8e8e8;
        }

        .price-item-select {
          position: relative;
        }

        .item-type-dropdown {
          width: 100%;
          padding: 10px 12px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .item-type-dropdown:focus {
          outline: none;
          border-color: #ce9b28;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .price-item-custom-name {
          grid-column: span 3;
          margin-top: -5px;
        }

        .custom-name-input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(206, 155, 40, 0.05);
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          color: #333;
          font-size: 13px;
          font-weight: 500;
        }

        .custom-name-input:focus {
          outline: none;
          border-color: #ce9b28;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .price-item-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .price-item-input {
          width: 100%;
          padding: 10px 12px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          color: #333;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .price-item-input:focus {
          outline: none;
          border-color: #ce9b28;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .price-item-input:disabled {
          background: #f5f5f5;
          border-color: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .custom-name-input:disabled {
          background: #f5f5f5;
          border-color: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .price-helper-text {
          font-size: 11px;
          color: #666;
          font-weight: 500;
          line-height: 1.4;
        }

        .remove-item-btn {
          width: 36px;
          height: 36px;
          background: #fff5f5;
          border: 2px solid #dc3545;
          border-radius: 8px;
          color: #dc3545;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
        }

        .remove-item-btn:hover {
          background: #dc3545;
          color: #ffffff;
          transform: scale(1.1);
        }

        .add-item-btn {
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border: none;
          border-radius: 8px;
          color: #000000;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }

        .add-item-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .add-item-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .add-icon {
          font-size: 20px;
          font-weight: 700;
        }

        /* Pricing Summary Enhancements */
        .price-divider {
          height: 1px;
          background: rgba(206, 155, 40, 0.2);
          margin: 8px 0;
        }

        .child-seat-row {
          background: rgba(255, 248, 225, 0.3);
          padding: 8px 15px;
          margin: 0 -20px;
          border-left: 3px solid #ce9b28;
        }

        .discount-control {
          background: rgba(231, 255, 235, 0.2);
          border-left: 3px solid #4ade80;
          padding: 10px 15px;
          margin: 10px -20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .discount-inputs {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .discount-type-select {
          padding: 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: white;
          width: 50px;
          cursor: pointer;
        }

        .discount-value-input {
          padding: 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 80px;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .filters-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-select {
            width: 100%;
          }

          .table-container {
            overflow-x: auto;
          }

          .bookings-table {
            min-width: 800px;
          }
        }

        /* Responsive Styles */
        /* Desktop: Show table, hide mobile cards */
        .desktop-view {
          display: block;
        }

        .mobile-view {
          display: none;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          /* Mobile: Hide desktop table, show mobile cards */
          .desktop-view {
            display: none !important;
          }

          .mobile-view {
            display: block !important;
          }
        }

        /* NEW PRICE QUOTE MODAL STYLES */
        .new-quote-modal {
          max-width: 800px !important;
          width: 95%;
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden;
          background-color: #ffffff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .new-quote-header {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .new-quote-title {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
        }

        .dollar-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(232, 180, 41, 0.2);
          color: #E8B429;
          border-radius: 50%;
          font-size: 18px;
          font-weight: bold;
        }

        .modal-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: #ffffff;
        }

        .new-quote-body {
          padding: 32px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .section-heading {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .section-heading-dark {
          font-size: 18px;
          color: #111;
          font-weight: 700;
          margin: 0;
        }

        .section-heading-with-icon {
          font-size: 18px;
          color: #111;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .section-heading-with-icon svg {
          width: 20px;
          height: 20px;
          color: #E8B429;
        }

        /* Customer Card */
        .customer-details-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #e9ecef;
        }

        .customer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .customer-col p {
          margin: 8px 0;
          font-size: 14px;
          color: #495057;
        }

        .customer-col strong {
          color: #212529;
          font-weight: 600;
          margin-right: 8px;
        }

        /* Return Trip Alert */
        .return-trip-alert {
          background-color: #fff9db; /* Light yellow */
          border-left: 4px solid #fab005;
          padding: 16px;
          margin-bottom: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #8c6d1f;
          font-weight: 500;
        }
        
        .return-trip-alert svg {
          width: 24px;
          height: 24px;
        }

        /* Base Fares */
        .base-fares-section {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }

        .fare-field {
          flex: 1;
        }

        .fare-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #343a40;
        }

        .fare-input-new {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          color: #212529;
          transition: border-color 0.2s;
        }

        .fare-input-new:focus {
          border-color: #E8B429;
          outline: none;
          box-shadow: 0 0 0 3px rgba(232, 180, 41, 0.1);
        }

        /* Additional Charges */
        .additional-charges-section {
          margin-bottom: 32px;
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 24px;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .add-item-btn-new {
          background: #f1f3f5;
          color: #495057;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .add-item-btn-new:hover {
          background: #e9ecef;
          color: #212529;
        }

        .plus-icon {
          font-size: 18px;
          font-weight: bold;
        }

        .charge-row-new {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
        }

        .charge-description-input {
          flex: 2;
          padding: 10px 14px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
        }

        .charge-amount-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          max-width: 120px;
        }

        .delete-charge-btn {
          color: #fa5252;
          background: rgba(250, 82, 82, 0.1);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .delete-charge-btn:hover {
           background: rgba(250, 82, 82, 0.2);
        }
        
        .delete-charge-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Discount Section */
        .discount-section-new {
          margin-bottom: 32px;
          padding: 24px;
          background: #f8fff9; /* Very light green hint */
          border: 1px solid #ebfbee;
          border-radius: 8px;
        }

        .discount-fields-row {
          display: flex;
          gap: 16px;
        }

        .discount-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .discount-field label {
           font-size: 12px;
           font-weight: 600;
           color: #555;
           text-transform: uppercase;
        }

        .discount-type-select-new, 
        .discount-value-input-new,
        .discount-reason-input-new {
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .discount-reason-field {
           flex: 2;
        }

        /* Total Quote */
        .total-quote-display {
          background: #212529;
          color: white;
          padding: 24px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .total-label {
          font-size: 20px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }

        .total-amount {
          font-size: 36px;
          font-weight: 800;
          color: #E8B429;
        }

        /* Additional Notes */
        .additional-notes-section {
          margin-bottom: 32px;
        }

        .notes-label {
           display: block;
           font-weight: 600;
           margin-bottom: 8px; 
           color: #333;
        }

        .notes-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          resize: vertical;
          min-height: 80px;
        }

        /* Action Buttons */
        .quote-modal-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }

        .cancel-quote-btn {
          padding: 12px 24px;
          background: white;
          border: 1px solid #ced4da;
          color: #495057;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .send-quote-btn {
          padding: 12px 32px;
          background: linear-gradient(90deg, #CE9B28 0%, #B78922 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 6px rgba(206, 155, 40, 0.2);
          transition: transform 0.2s;
        }
        
        .send-quote-btn:hover:not(:disabled) {
           transform: translateY(-2px);
           box-shadow: 0 6px 12px rgba(206, 155, 40, 0.3);
        }
        
        .send-quote-btn:disabled {
           opacity: 0.6;
           cursor: not-allowed;
           transform: none;
        }
        
        .send-quote-btn svg {
           width: 20px;
           height: 20px;
        }

        .discount-applied-banner {
          background-color: #ecfdf5;
          border: 1px solid #d1fae5;
          color: #065f46;
          padding: 12px 16px;
          border-radius: 6px;
          margin-top: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .discount-amount-text {
          color: #059669;
          font-weight: 800;
        }

        /* Total Quote Breakdown */
        .total-quote-breakdown {
          background-color: #fff9db;
          border: 2px solid #ffe066;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .breakdown-label {
          font-size: 16px;
          color: #495057;
          font-weight: 700;
        }

        .breakdown-value {
          font-size: 20px;
          color: #212529;
          font-weight: 700;
        }

        .highlight-green {
          color: #059669 !important;
        }

        .breakdown-divider {
          height: 1px;
          background-color: rgba(0,0,0,0.1);
          margin: 16px 0;
        }

        .total-row .breakdown-label {
          font-size: 24px;
          color: #495057;
          font-weight: 800;
        }

        .total-row .breakdown-value {
          font-size: 36px;
          color: #d97706; /* Darker amber */
          font-weight: 900;
        }

        /* Follow Up Workflow Styles */
        .quote-status-banner {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .check-icon {
          color: #16a34a;
          font-weight: 900;
          font-size: 18px;
        }
        
        .quote-status-text {
          display: flex;
          flex-direction: column;
        }
        
        .quote-sent-title {
           color: #15803d;
           font-weight: 700;
           font-size: 15px;
        }
        
        .quote-sent-date {
           color: #16a34a;
           font-size: 13px;
        }
        
        .btn-follow-up-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-follow-up-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
        }
        
        .btn-follow-up-primary svg {
          width: 20px;
          height: 20px;
        }

        /* Follow Up Modal */
        .follow-up-modal {
           max-width: 600px;
           width: 90%;
           background-color: #ffffff !important;
           color: #1e293b !important;
           border: none;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Force header text color in this specific modal */
        .follow-up-modal .modal-header h2 {
           color: #1e293b !important;
           font-size: 20px;
           font-weight: 700;
        }

        .follow-up-modal .modal-close {
           color: #94a3b8 !important;
        }
        
        .follow-up-modal .modal-close:hover {
           color: #475569 !important;
        }
        
        .modal-subtitle {
           color: #64748b !important;
           margin-top: -12px;
           margin-bottom: 24px;
           font-size: 14px;
           font-weight: 500;
        }
        
        .customer-summary-card {
           background-color: #f8fafc !important;
           border: 1px solid #e2e8f0;
           padding: 20px;
           border-radius: 12px;
           margin-bottom: 28px;
           display: grid;
           gap: 10px;
        }
        
        .summary-row {
           font-size: 14px;
           color: #475569 !important;
           display: flex;
           gap: 8px;
        }

        .summary-row strong {
           color: #1e293b !important;
           min-width: 100px;
        }
        
        .section-label {
           font-size: 14px;
           font-weight: 700;
           color: #334155 !important;
           margin-bottom: 14px;
           text-transform: uppercase;
           letter-spacing: 0.05em;
        }
        
        .action-options {
           display: flex;
           flex-direction: column;
           gap: 12px;
        }
        
        .action-option {
           display: flex;
           align-items: center;
           gap: 16px;
           padding: 16px 20px;
           border: 1px solid #e2e8f0;
           border-radius: 12px;
           cursor: pointer;
           transition: all 0.2s ease;
           background-color: #ffffff !important;
        }

        .action-option.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .action-option.disabled input {
          cursor: not-allowed;
        }

        .action-option.disabled .action-icon {
          opacity: 0.5;
        }

        .action-option.disabled .action-title {
          color: #9ca3af !important;
        }

        .action-option.disabled .action-desc {
          color: #9ca3af !important;
        }
        
        .action-option:hover {
           border-color: #cbd5e1;
           background-color: #f8fafc !important;
           transform: translateY(-1px);
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        
        .action-option.selected {
           border-color: #6366f1;
           background-color: #eef2ff !important;
           box-shadow: 0 0 0 1px #6366f1;
        }
        
        .action-option input[type="radio"] {
           width: 18px;
           height: 18px;
           accent-color: #4f46e5;
        }
        
        .action-icon {
           color: #64748b !important;
           display: flex;
           align-items: center;
           padding: 8px;
           background: #f1f5f9;
           border-radius: 8px;
        }
        
        .action-option.selected .action-icon {
           color: #4f46e5 !important;
           background: #e0e7ff;
        }
        
        .action-icon svg {
           width: 20px;
           height: 20px;
        }
        
        .action-details {
           display: flex;
           flex-direction: column;
           gap: 2px;
        }
        
        .action-title {
           font-weight: 600;
           color: #1e293b !important;
           font-size: 15px;
        }
        
        .action-desc {
           font-size: 13px;
           color: #64748b !important;
        }
        
        .action-preview-box {
           margin-top: 20px;
           padding: 16px;
           background-color: #eff6ff !important;
           border: 1px solid #dbeafe;
           border-radius: 8px;
           color: #1e40af !important;
           font-size: 14px;
           line-height: 1.5;
        }
        
        .modal-actions-follow-up {
           display: flex;
           justify-content: flex-end;
           gap: 12px;
           margin-top: 32px;
           padding-top: 20px;
           border-top: 1px solid #e2e8f0;
        }
        
        .btn-cancel {
           padding: 10px 24px;
           background: white !important;
           border: 1px solid #cbd5e1;
           border-radius: 8px;
           color: #64748b !important;
           font-weight: 600;
           cursor: pointer;
           transition: all 0.2s;
        }

        .btn-cancel:hover {
           background: #f8fafc !important;
           color: #475569 !important;
        }
        
        .btn-confirm-follow-up {
           padding: 10px 28px;
           background: #1e293b !important; /* Dark navy/black */
           color: white !important;
           border: none;
           border-radius: 8px;
           font-weight: 600;
           cursor: pointer;
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
           transition: all 0.2s;
        }
        
        .btn-confirm-follow-up:hover {
           background: #0f172a !important;
           transform: translateY(-1px);
           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Responsive Styles for Quote Modal */
        @media (max-width: 768px) {
          .new-quote-modal {
             max-height: 95vh;
             width: 95% !important;
             border-radius: 8px !important;
             margin: 10px;
          }

          .new-quote-header {
             padding: 16px 20px;
          }

          .new-quote-title {
             font-size: 18px;
          }

          .new-quote-body {
             padding: 20px;
          }

          .customer-grid {
             grid-template-columns: 1fr;
             gap: 12px;
          }
          
          .base-fares-section {
             flex-direction: column;
             gap: 16px;
          }

          .charge-row-new {
             flex-direction: column;
             align-items: stretch;
             gap: 10px;
             background: #f8f9fa;
             padding: 12px;
             border-radius: 8px;
             border: 1px solid #eee;
          }

          .charge-description-input, .charge-amount-input {
             width: 100%;
             max-width: none;
          }

          .delete-charge-btn {
             width: 100%;
             margin-top: 5px;
             height: 40px;
          }

          .discount-fields-row {
             flex-direction: column;
          }
          
          .discount-field label {
             font-size: 13px;
          }

          .discount-type-select-new, 
          .discount-value-input-new,
          .discount-reason-input-new {
             width: 100%;
          }
           
          .total-quote-display {
             flex-direction: column;
             align-items: flex-start;
             gap: 10px;
             padding: 16px;
          }

          .total-amount {
             font-size: 28px;
          }
          
          .quote-modal-actions {
             flex-direction: column-reverse; /* Put primary button on top if column */
             gap: 12px;
          }

          .cancel-quote-btn, .send-quote-btn {
             width: 100%;
             justify-content: center;
             padding: 14px;
          }

          .total-quote-breakdown {
             padding: 16px;
          }

          .total-row .breakdown-label {
             font-size: 18px;
          }
          
          .total-row .breakdown-value {
             font-size: 24px;
          }

          /* Mobile Responsive Styles for Follow Up Modal */
          .follow-up-modal {
             width: 95% !important;
             max-height: 90vh;
             overflow-y: auto;
             padding: 24px !important; /* Override default if needed, though usually handled by inner content padding. Wait, follow-up-modal has specific padding? No, modal-content usually has. Let's check. */
          }
          
          .customer-summary-card {
             padding: 15px;
             margin-bottom: 20px;
          }

          .summary-row {
             flex-direction: column;
             align-items: flex-start;
             gap: 4px;
          }

          .summary-row strong {
             min-width: auto; 
          }

          .action-option {
             padding: 12px 15px;
             gap: 12px;
          }

          .action-icon {
             padding: 6px;
          }
          
          .action-icon svg {
             width: 18px;
             height: 18px;
          }

          .modal-actions-follow-up {
             flex-direction: column-reverse; /* Primary button on top */
             gap: 12px;
             margin-top: 24px;
          }

          .btn-cancel, .btn-confirm-follow-up {
             width: 100%;
             justify-content: center;
             padding: 14px;
          }
        }

        /* Tabs List - Mobile Responsive */
        .tabs-list {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          white-space: nowrap;
          max-width: 100%;
          padding-bottom: 5px;
        }

        @media (max-width: 768px) {
          .tabs-list {
            flex-wrap: wrap;
            white-space: normal;
            gap: 10px;
            justify-content: flex-start;
          }
          
          /* Adjust button spacing on mobile */
          .tabs-list > button {
             flex: 1 1 auto; /* Grow to fill space */
             text-align: center;
             padding-bottom: 10px !important;
          }
        }

        /* Booking Details Modal Responsive Grids */
        .details-top-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .info-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .status-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .journey-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .journey-grid.has-return {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .details-top-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .status-grid-2col {
             grid-template-columns: 1fr;
          }

          .journey-grid.has-return {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout >
  );
}

