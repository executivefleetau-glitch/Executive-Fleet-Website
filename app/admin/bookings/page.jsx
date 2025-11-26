"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
        alert("Booking deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const handleSendEmail = async (booking) => {
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: booking.customerEmail,
          subject: `Regarding Your Booking - ${booking.bookingReference}`,
          bookingReference: booking.bookingReference,
          customerName: booking.customerName,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
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
          <button className="refresh-btn" onClick={fetchBookings}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🚗</span>
            <h3>No Bookings Yet</h3>
            <p>Bookings will appear here once customers make reservations.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Customer</th>
                  <th>Pickup Date</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <span className="booking-ref">{booking.bookingReference}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                        <p className="customer-name">{booking.customerName}</p>
                        <p className="customer-email">{booking.customerEmail}</p>
                      </div>
                    </td>
                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td>{booking.vehicleName}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ background: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-view"
                          onClick={() => viewDetails(booking)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          className="btn-email"
                          onClick={() => handleSendEmail(booking)}
                          title="Send Email"
                        >
                          ✉️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(booking.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                <div className="detail-row">
                  <span className="detail-label">Booking Reference:</span>
                  <span className="detail-value">
                    {selectedBooking.bookingReference}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Customer Name:</span>
                  <span className="detail-value">
                    {selectedBooking.customerName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {selectedBooking.customerEmail}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">
                    {selectedBooking.customerPhone}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pickup Location:</span>
                  <span className="detail-value">
                    {selectedBooking.pickupLocation}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Dropoff Location:</span>
                  <span className="detail-value">
                    {selectedBooking.dropoffLocation}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pickup Date:</span>
                  <span className="detail-value">
                    {new Date(selectedBooking.pickupDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Vehicle:</span>
                  <span className="detail-value">
                    {selectedBooking.vehicleName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Passengers:</span>
                  <span className="detail-value">
                    {selectedBooking.numberOfPassengers}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Service Type:</span>
                  <span className="detail-value">
                    {selectedBooking.serviceType}
                  </span>
                </div>
                {selectedBooking.specialInstructions && (
                  <div className="detail-row full">
                    <span className="detail-label">Special Instructions:</span>
                    <span className="detail-value">
                      {selectedBooking.specialInstructions}
                    </span>
                  </div>
                )}
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
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
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
        }

        .refresh-btn:hover {
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
          font-size: 64px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .empty-state p {
          color: #888888;
          margin: 0;
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
        }

        .bookings-table thead {
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.2) 0%, transparent 100%);
        }

        .bookings-table th {
          padding: 20px;
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: #E8B429;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
        }

        .bookings-table td {
          padding: 20px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bookings-table tbody tr {
          transition: background 0.3s ease;
        }

        .bookings-table tbody tr:hover {
          background: rgba(206, 155, 40, 0.05);
        }

        .booking-ref {
          font-weight: 700;
          color: #E8B429;
          font-family: monospace;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .customer-name {
          margin: 0;
          font-weight: 600;
          color: #ffffff;
        }

        .customer-email {
          margin: 0;
          font-size: 13px;
          color: #888888;
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
          gap: 8px;
        }

        .action-buttons button {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-view {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .btn-view:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-email {
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
        }

        .btn-email:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }

        .btn-delete {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
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

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .table-container {
            overflow-x: auto;
          }

          .bookings-table {
            min-width: 800px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

