"use client";
import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";

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
  
  // Child seat and extra charges pricing
  const [priceItems, setPriceItems] = useState([]); // [{type: 'babyCapsule', price: '50'}, {type: 'custom', name: 'Tolls', price: '30'}]
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");

  // Helper function to format time properly
  const formatTime = (timeValue) => {
    if (!timeValue) return 'N/A';
    
    try {
      // If it's already a simple time string like "10:30", return it with AM/PM
      if (typeof timeValue === 'string' && timeValue.match(/^\d{2}:\d{2}$/)) {
        const [hours, minutes] = timeValue.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
      }
      
      // If it's an ISO string or DateTime, parse it
      const date = new Date(timeValue);
      if (isNaN(date.getTime())) return 'N/A';
      
      // Format to local time string
      return date.toLocaleTimeString('en-AU', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'N/A';
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on selected filters
  const getFilteredBookings = () => {
    let filtered = [...bookings];

    // Filter by booking status
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Filter by contact status
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
    setPriceItems([]);
    setCalculatedTotal(0);
    setShowPriceQuoteModal(true);
  };
  
  // Add a new price item
  const addPriceItem = () => {
    setPriceItems([...priceItems, { type: '', price: '', customName: '' }]);
  };
  
  // Remove a price item
  const removePriceItem = (index) => {
    setPriceItems(priceItems.filter((_, i) => i !== index));
  };
  
  // Update price item
  const updatePriceItem = (index, field, value) => {
    const updated = [...priceItems];
    updated[index][field] = value;
    setPriceItems(updated);
  };
  
  // Get available options for dropdown (excluding already selected)
  const getAvailableOptions = (currentIndex) => {
    const booking = priceQuoteBooking;
    if (!booking) return [];
    
    const selectedTypes = priceItems
      .map((item, idx) => idx !== currentIndex ? item.type : null)
      .filter(Boolean);
    
    const options = [];
    
    // Add child seat options only if quantity > 0 and not already selected
    if (booking.babyCapsule > 0 && !selectedTypes.includes('babyCapsule')) {
      options.push({ value: 'babyCapsule', label: `Baby Capsule (${booking.babyCapsule})` });
    }
    if (booking.babySeat > 0 && !selectedTypes.includes('babySeat')) {
      options.push({ value: 'babySeat', label: `Baby Seat (${booking.babySeat})` });
    }
    if (booking.boosterSeat > 0 && !selectedTypes.includes('boosterSeat')) {
      options.push({ value: 'boosterSeat', label: `Booster Seat (${booking.boosterSeat})` });
    }
    
    // Always show custom item option
    options.push({ value: 'custom', label: 'Custom Item / Extras' });
    
    return options;
  };

  // Pure calculation function (doesn't update state)
  const calculateTotal = (outbound, returnTrip) => {
    const outboundAmount = parseFloat(outbound) || 0;
    const returnAmount = parseFloat(returnTrip) || 0;
    let baseFare = outboundAmount + returnAmount;
    
    // Calculate child seat costs
    let childSeatTotal = 0;
    const childSeatBreakdown = [];
    
    priceItems.forEach(item => {
      const price = parseFloat(item.price) || 0;
      if (price > 0) {
        if (item.type === 'babyCapsule' && priceQuoteBooking?.babyCapsule > 0) {
          const total = price * priceQuoteBooking.babyCapsule;
          childSeatTotal += total;
          childSeatBreakdown.push({ 
            name: 'Baby Capsule', 
            quantity: priceQuoteBooking.babyCapsule, 
            priceEach: price, 
            total 
          });
        } else if (item.type === 'babySeat' && priceQuoteBooking?.babySeat > 0) {
          const total = price * priceQuoteBooking.babySeat;
          childSeatTotal += total;
          childSeatBreakdown.push({ 
            name: 'Baby Seat', 
            quantity: priceQuoteBooking.babySeat, 
            priceEach: price, 
            total 
          });
        } else if (item.type === 'boosterSeat' && priceQuoteBooking?.boosterSeat > 0) {
          const total = price * priceQuoteBooking.boosterSeat;
          childSeatTotal += total;
          childSeatBreakdown.push({ 
            name: 'Booster Seat', 
            quantity: priceQuoteBooking.boosterSeat, 
            priceEach: price, 
            total 
          });
        } else if (item.type === 'custom' && item.customName) {
          childSeatTotal += price;
          childSeatBreakdown.push({ 
            name: item.customName, 
            quantity: 1, 
            priceEach: price, 
            total: price 
          });
        }
      }
    });
    
    const subtotal = baseFare + childSeatTotal;
    const discount = priceQuoteBooking?.isReturnTrip && returnAmount > 0 ? baseFare * 0.04 : 0;
    const total = subtotal - discount;
    return { baseFare, childSeatTotal, childSeatBreakdown, subtotal, discount, total };
  };

  // Memoized calculation to prevent infinite loops
  const pricingCalculation = useMemo(() => {
    return calculateTotal(outboundFare, returnFare);
  }, [outboundFare, returnFare, priceItems, priceQuoteBooking]);

  // Update calculatedTotal state when calculation changes
  useEffect(() => {
    setCalculatedTotal(pricingCalculation.total);
  }, [pricingCalculation]);

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
      // Extract child seat prices from priceItems
      const babyCapsulePrice = priceItems.find(item => item.type === 'babyCapsule')?.price || null;
      const babySeatPrice = priceItems.find(item => item.type === 'babySeat')?.price || null;
      const boosterSeatPrice = priceItems.find(item => item.type === 'boosterSeat')?.price || null;
      
      // Extract custom/extra items
      const extraCharges = priceItems
        .filter(item => item.type === 'custom' && item.customName && item.price)
        .map(item => ({
          name: item.customName,
          price: parseFloat(item.price)
        }));
      
      const response = await fetch("/api/admin/send-price-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: priceQuoteBooking.id,
          outboundFare: parseFloat(outboundFare),
          returnFare: priceQuoteBooking.isReturnTrip ? parseFloat(returnFare) : 0,
          babyCapsulePrice: babyCapsulePrice ? parseFloat(babyCapsulePrice) : null,
          babySeatPrice: babySeatPrice ? parseFloat(babySeatPrice) : null,
          boosterSeatPrice: boosterSeatPrice ? parseFloat(boosterSeatPrice) : null,
          extraCharges: extraCharges.length > 0 ? extraCharges : null,
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
        fetchBookings(); // Refresh to get updated booking
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
      <div className="bookings-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Booking Management</h1>
            <p className="page-subtitle">
              View and manage all customer bookings
            </p>
          </div>
          <button 
            className="refresh-btn" 
            onClick={fetchBookings}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Filters Section */}
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="status-filter">Booking Status:</label>
            <select 
              id="status-filter"
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="contact-filter">Contact Status:</label>
            <select 
              id="contact-filter"
              className="filter-select"
              value={contactFilter}
              onChange={(e) => setContactFilter(e.target.value)}
            >
              <option value="all">All Contacts</option>
              <option value="uncontacted">Uncontacted</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>

          {(statusFilter !== "all" || contactFilter !== "all") && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setStatusFilter("all");
                setContactFilter("all");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          statusFilter !== "all" || contactFilter !== "all" ? (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6l3-3h12l3 3v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>No Bookings Found</h3>
              <p>No bookings match your current filters.</p>
              <button 
                className="btn-primary"
                onClick={() => {
                  setStatusFilter("all");
                  setContactFilter("all");
                }}
                style={{marginTop: '20px'}}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6l3-3h12l3 3v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>No Bookings Yet</h3>
              <p>Bookings will appear here once customers make reservations.</p>
            </div>
          )
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container desktop-view">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking Ref</th>
                    <th>Customer</th>
                    <th>Pickup Date/Time</th>
                    <th>Route</th>
                    <th>Vehicle</th>
                    <th>Return Trip</th>
                    <th>Status</th>
                    <th>Contact Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking.id}>
                      {/* Booking Reference */}
                      <td>
                        <span className="booking-ref">
                          {booking.bookingReference || `BKG-0${String(index + 1).padStart(3, '0')}`}
                        </span>
                      </td>
                      
                      {/* Customer Info */}
                      <td>
                        <div className="customer-info">
                          <p className="customer-name">{booking.customerName}</p>
                          <a href={`mailto:${booking.customerEmail}`} className="customer-email">
                            {booking.customerEmail}
                          </a>
                          <span className="customer-phone">📞 {booking.customerPhone}</span>
                        </div>
                      </td>
                      
                      {/* Pickup Date & Time */}
                      <td>
                        <div className="datetime-cell">
                          <div className="date-row">
                            <span className="date-icon">📅</span>
                            <span className="date-text">
                              {new Date(booking.pickupDate).toLocaleDateString('en-AU', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="time-row">
                            <span className="time-icon">🕐</span>
                            <span className="time-text">
                              {formatTime(booking.pickupTime)}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Route (From → To) */}
                      <td>
                        <div className="route-cell">
                          <div className="location-row from">
                            <span className="location-icon">📍</span>
                            <span className="location-text" title={booking.pickupLocation}>
                              {booking.pickupLocation}
                            </span>
                          </div>
                          <div className="arrow-row">→</div>
                          <div className="location-row to">
                            <span className="location-icon">🎯</span>
                            <span className="location-text" title={booking.dropoffLocation}>
                              {booking.dropoffLocation}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Vehicle */}
                      <td>
                        <div className="vehicle-info">
                          <span className="vehicle-name">{booking.vehicleName}</span>
                          <span className="vehicle-passengers">👥 {booking.numberOfPassengers}</span>
                        </div>
                      </td>
                      
                      {/* Return Trip */}
                      <td>
                        {booking.isReturnTrip ? (
                          <span className="return-badge yes">🔄 Yes</span>
                        ) : (
                          <span className="return-badge no">No</span>
                        )}
                      </td>
                      
                      {/* Booking Status */}
                      <td>
                        <span 
                          className="status-badge"
                          style={{
                            backgroundColor: getStatusColor(booking.status),
                            color: '#ffffff',
                            padding: '3px 8px',
                            borderRadius: '3px',
                            fontSize: '9px',
                            fontWeight: '600',
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      
                      {/* Contact Status */}
                      <td>
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
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {booking.contactStatus === 'contacted' ? 'Contacted' : 'Uncontacted'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-view"
                            onClick={() => viewDetails(booking)}
                            title="View Details"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="btn-price-quote"
                            onClick={() => openPriceQuoteModal(booking)}
                            title="Send Price Quote"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(booking.id)}
                            title="Delete"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    </div>
                    <div className="card-actions-top">
                      <button
                        className="btn-view-icon"
                        onClick={() => viewDetails(booking)}
                        title="View Details"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className="btn-delete-icon"
                        onClick={() => handleDelete(booking.id)}
                        title="Delete"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                      {new Date(booking.pickupDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })} • {formatTime(booking.pickupTime)}
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
                    onClick={() => openPriceQuoteModal(booking)}
                  >
                    <span>Send Price Quote</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Booking Details Modal */}
        {showDetails && selectedBooking && (
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
              <div className="modal-body">
                {/* Customer Info */}
                <div className="details-section">
                  <h3 className="section-title">Customer Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Booking Reference:</span>
                    <span className="detail-value">{selectedBooking.bookingReference}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedBooking.customerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedBooking.customerEmail}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedBooking.customerPhone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Passengers:</span>
                    <span className="detail-value">{selectedBooking.numberOfPassengers}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Service Type:</span>
                    <span className="detail-value">{selectedBooking.serviceType}</span>
                  </div>
                </div>

                {/* Outbound Journey */}
                <div className="details-section journey-section outbound">
                  <h3 className="section-title">🚗 Outbound Journey</h3>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{new Date(selectedBooking.pickupDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Pickup Time:</span>
                    <span className="detail-value">{formatTime(selectedBooking.pickupTime)}</span>
                  </div>
                  {selectedBooking.expectedEndTime && (
                    <div className="detail-row">
                      <span className="detail-label">Expected End Time:</span>
                      <span className="detail-value">{formatTime(selectedBooking.expectedEndTime)}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Pickup:</span>
                    <span className="detail-value">{selectedBooking.pickupLocation}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Destination:</span>
                    <span className="detail-value">{selectedBooking.dropoffLocation}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vehicle:</span>
                    <span className="detail-value">{selectedBooking.vehicleName}</span>
                  </div>
                </div>

                {/* Return Journey */}
                {selectedBooking.isReturnTrip && (
                  <div className="details-section journey-section return">
                    <h3 className="section-title">🔄 Return Journey</h3>
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">
                        {selectedBooking.returnDate ? new Date(selectedBooking.returnDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Pickup Time:</span>
                      <span className="detail-value">{formatTime(selectedBooking.returnTime)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Pickup:</span>
                      <span className="detail-value">{selectedBooking.returnPickupLocation || selectedBooking.dropoffLocation}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Destination:</span>
                      <span className="detail-value">{selectedBooking.returnDropoffLocation || selectedBooking.pickupLocation}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Vehicle:</span>
                      <span className="detail-value">{selectedBooking.vehicleName}</span>
                    </div>
                  </div>
                )}

                {/* Child Seat Requirements */}
                {selectedBooking.hasChildren && (selectedBooking.babyCapsule > 0 || selectedBooking.babySeat > 0 || selectedBooking.boosterSeat > 0) && (
                  <div className="details-section">
                    <h3 className="section-title">👶 Child Seat Requirements</h3>
                    {selectedBooking.babyCapsule > 0 && (
                      <div className="detail-row">
                        <span className="detail-label">🍼 Baby Capsule (Rear Facing):</span>
                        <span className="detail-value">{selectedBooking.babyCapsule}</span>
                      </div>
                    )}
                    {selectedBooking.babySeat > 0 && (
                      <div className="detail-row">
                        <span className="detail-label">👶 Baby Seat:</span>
                        <span className="detail-value">{selectedBooking.babySeat}</span>
                      </div>
                    )}
                    {selectedBooking.boosterSeat > 0 && (
                      <div className="detail-row">
                        <span className="detail-label">🧒 Booster Seat (4-7 yrs):</span>
                        <span className="detail-value">{selectedBooking.boosterSeat}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Special Instructions */}
                {selectedBooking.specialInstructions && (
                  <div className="details-section">
                    <h3 className="section-title">Special Instructions</h3>
                    <div className="detail-row full">
                      <span className="detail-value">{selectedBooking.specialInstructions}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Send Email Modal */}
        {showEmailModal && emailBooking && (
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {sendingEmail ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Price Quote Modal */}
        {showPriceQuoteModal && priceQuoteBooking && (
          <div className="modal-overlay" onClick={() => setShowPriceQuoteModal(false)}>
            <div className="modal-content price-quote-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Send Price Quote</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowPriceQuoteModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                {/* Customer Info */}
                <div className="quote-section">
                  <h3 className="quote-section-title">Customer</h3>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{priceQuoteBooking.customerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{priceQuoteBooking.customerEmail}</span>
                  </div>
                </div>

                {/* Outbound Journey */}
                <div className="quote-section outbound-section">
                  <h3 className="quote-section-title">🚗 Outbound Journey</h3>
                  <div className="journey-details">
                    <p><strong>From:</strong> {priceQuoteBooking.pickupLocation}</p>
                    <p><strong>To:</strong> {priceQuoteBooking.dropoffLocation}</p>
                    <p><strong>Date:</strong> {new Date(priceQuoteBooking.pickupDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p><strong>Pickup Time:</strong> {formatTime(priceQuoteBooking.pickupTime)}</p>
                    {priceQuoteBooking.expectedEndTime && (
                      <p><strong>Expected End Time:</strong> {formatTime(priceQuoteBooking.expectedEndTime)}</p>
                    )}
                    <p><strong>Vehicle:</strong> {priceQuoteBooking.vehicleName}</p>
                  </div>
                  <div className="fare-input-group">
                    <label htmlFor="outboundFare">Outbound Base Fare (AUD)</label>
                    <input
                      id="outboundFare"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter fare amount"
                      value={outboundFare}
                      onChange={(e) => {
                        setOutboundFare(e.target.value);
                        calculateTotal(e.target.value, returnFare);
                      }}
                      className="fare-input"
                    />
                  </div>
                </div>

                {/* Return Journey */}
                {priceQuoteBooking.isReturnTrip && (
                  <div className="quote-section return-section">
                    <h3 className="quote-section-title">🔄 Return Journey</h3>
                    <div className="journey-details">
                      <p><strong>From:</strong> {priceQuoteBooking.returnPickupLocation || priceQuoteBooking.dropoffLocation}</p>
                      <p><strong>To:</strong> {priceQuoteBooking.returnDropoffLocation || priceQuoteBooking.pickupLocation}</p>
                      <p><strong>Date:</strong> {priceQuoteBooking.returnDate ? new Date(priceQuoteBooking.returnDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</p>
                      <p><strong>Pickup Time:</strong> {formatTime(priceQuoteBooking.returnTime)}</p>
                      <p><strong>Vehicle:</strong> {priceQuoteBooking.vehicleName}</p>
                    </div>
                    <div className="fare-input-group">
                      <label htmlFor="returnFare">Return Base Fare (AUD)</label>
                      <input
                        id="returnFare"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter fare amount"
                        value={returnFare}
                        onChange={(e) => {
                          setReturnFare(e.target.value);
                          calculateTotal(outboundFare, e.target.value);
                        }}
                        className="fare-input"
                      />
                    </div>
                  </div>
                )}

                {/* Child Seat Requirements */}
                {priceQuoteBooking.hasChildren && (priceQuoteBooking.babyCapsule > 0 || priceQuoteBooking.babySeat > 0 || priceQuoteBooking.boosterSeat > 0) && (
                  <div className="quote-section child-seats-section">
                    <h3 className="quote-section-title">👶 Child Seat Requirements</h3>
                    <div className="child-seats-info">
                      {priceQuoteBooking.babyCapsule > 0 && (
                        <div className="child-seat-item-info">
                          <span className="seat-icon">🍼</span>
                          <span className="seat-name">Baby Capsule (Rear Facing):</span>
                          <span className="seat-quantity">{priceQuoteBooking.babyCapsule}</span>
                        </div>
                      )}
                      {priceQuoteBooking.babySeat > 0 && (
                        <div className="child-seat-item-info">
                          <span className="seat-icon">👶</span>
                          <span className="seat-name">Baby Seat:</span>
                          <span className="seat-quantity">{priceQuoteBooking.babySeat}</span>
                        </div>
                      )}
                      {priceQuoteBooking.boosterSeat > 0 && (
                        <div className="child-seat-item-info">
                          <span className="seat-icon">🧒</span>
                          <span className="seat-name">Booster Seat (4-7 yrs):</span>
                          <span className="seat-quantity">{priceQuoteBooking.boosterSeat}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Pricing Items */}
                {(priceQuoteBooking.hasChildren || true) && (
                  <div className="quote-section additional-items-section">
                    <h3 className="quote-section-title">💰 Additional Items</h3>
                    
                    {/* Dynamic Price Items */}
                    {priceItems.map((item, index) => (
                      <div key={index} className="price-item-row">
                        <div className="price-item-select">
                          <select
                            value={item.type}
                            onChange={(e) => updatePriceItem(index, 'type', e.target.value)}
                            className="item-type-dropdown"
                          >
                            <option value="">Select item...</option>
                            {getAvailableOptions(index).map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        {item.type === 'custom' && (
                          <div className="price-item-custom-name">
                            <input
                              type="text"
                              placeholder="Item name (e.g., Tolls, Parking)"
                              value={item.customName}
                              onChange={(e) => updatePriceItem(index, 'customName', e.target.value)}
                              className="custom-name-input"
                              disabled={!item.type}
                            />
                          </div>
                        )}
                        
                        <div className="price-item-input-wrapper">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder={!item.type ? "Select item first..." : "Price (AUD)"}
                            value={item.price}
                            onChange={(e) => updatePriceItem(index, 'price', e.target.value)}
                            className="price-item-input"
                            disabled={!item.type}
                          />
                          {item.type && ['babyCapsule', 'babySeat', 'boosterSeat'].includes(item.type) && (
                            <small className="price-helper-text">
                              ℹ️ Price per seat. Will be multiplied by {
                                item.type === 'babyCapsule' ? priceQuoteBooking.babyCapsule :
                                item.type === 'babySeat' ? priceQuoteBooking.babySeat :
                                priceQuoteBooking.boosterSeat
                              }
                            </small>
                          )}
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removePriceItem(index)}
                          className="remove-item-btn"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    
                    {/* Add Item Button */}
                    <button
                      type="button"
                      onClick={addPriceItem}
                      className="add-item-btn"
                      disabled={getAvailableOptions(-1).length === 0}
                    >
                      <span className="add-icon">+</span>
                      Add Item
                    </button>
                  </div>
                )}

                {/* Pricing Summary */}
                {(outboundFare || returnFare || priceItems.some(item => item.price)) && (
                  <div className="pricing-summary">
                    <h3 className="quote-section-title">💵 Pricing Summary</h3>
                    
                    {/* Base Fares */}
                    <div className="price-row">
                      <span>Outbound Fare:</span>
                      <span>${parseFloat(outboundFare || 0).toFixed(2)}</span>
                    </div>
                    {priceQuoteBooking.isReturnTrip && returnFare && (
                      <div className="price-row">
                        <span>Return Fare:</span>
                        <span>${parseFloat(returnFare || 0).toFixed(2)}</span>
                      </div>
                    )}
                    
                    {/* Child Seats & Extras */}
                    {pricingCalculation.childSeatBreakdown && pricingCalculation.childSeatBreakdown.length > 0 && (
                      <>
                        <div className="price-divider"></div>
                        {pricingCalculation.childSeatBreakdown.map((item, idx) => (
                          <div key={idx} className="price-row child-seat-row">
                            <span>
                              {item.name}
                              {item.quantity > 1 && ` (${item.quantity} × $${item.priceEach.toFixed(2)})`}
                            </span>
                            <span>${item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {/* Subtotal */}
                    <div className="price-row subtotal">
                      <span>Subtotal:</span>
                      <span>${pricingCalculation.subtotal.toFixed(2)}</span>
                    </div>
                    
                    {/* Discount */}
                    {priceQuoteBooking.isReturnTrip && returnFare && pricingCalculation.discount > 0 && (
                      <>
                        <div className="price-row discount">
                          <div>
                            <span>Discount (4%)</span>
                            <small>Return booking discount on base fare</small>
                          </div>
                          <span>-${pricingCalculation.discount.toFixed(2)}</span>
                        </div>
                        <div className="special-offer">
                          🎉 Special Offer Applied! - Return booking discount
                        </div>
                      </>
                    )}
                    
                    {/* Total */}
                    <div className="price-row total">
                      <span>TOTAL:</span>
                      <span>${pricingCalculation.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    className="btn-send-quote"
                    onClick={handleSendPriceQuote}
                    disabled={sendingQuote || !outboundFare}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {sendingQuote ? 'Sending Quote...' : 'Send Price Quote'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.1);
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
      `}</style>
    </DashboardLayout>
  );
}

