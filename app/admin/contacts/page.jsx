"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact query?")) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
        alert("Contact query deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact query");
    }
  };

  const handleSendEmail = async (contact) => {
    const message = prompt("Enter your reply message:");
    if (!message) return;

    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: contact.email,
          subject: `Re: ${contact.subject}`,
          message: message,
          customerName: contact.fullName,
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

  const viewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  return (
    <DashboardLayout>
      <div className="contacts-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Contact Queries</h1>
            <p className="page-subtitle">
              Manage and respond to customer inquiries
            </p>
          </div>
          <button className="refresh-btn" onClick={fetchContacts}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading contact queries...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📧</span>
            <h3>No Contact Queries</h3>
            <p>Contact submissions will appear here.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <span className="contact-name">{contact.fullName}</span>
                    </td>
                    <td>
                      <a href={`mailto:${contact.email}`} className="contact-email">
                        {contact.email}
                      </a>
                    </td>
                    <td>{contact.subject}</td>
                    <td>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-view"
                          onClick={() => viewDetails(contact)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          className="btn-email"
                          onClick={() => handleSendEmail(contact)}
                          title="Send Email Reply"
                        >
                          ✉️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(contact.id)}
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

        {/* Contact Details Modal */}
        {showDetails && selectedContact && (
          <div className="modal-overlay" onClick={() => setShowDetails(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Contact Query Details</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowDetails(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {selectedContact.fullName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    <a href={`mailto:${selectedContact.email}`}>
                      {selectedContact.email}
                    </a>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">
                    {selectedContact.subject}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="detail-row full">
                  <span className="detail-label">Message:</span>
                  <div className="message-box">
                    {selectedContact.message}
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-reply"
                    onClick={() => handleSendEmail(selectedContact)}
                  >
                    ✉️ Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .contacts-page {
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

        .contacts-table {
          width: 100%;
          border-collapse: collapse;
        }

        .contacts-table thead {
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.2) 0%, transparent 100%);
        }

        .contacts-table th {
          padding: 20px;
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: #E8B429;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
        }

        .contacts-table td {
          padding: 20px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contacts-table tbody tr {
          transition: background 0.3s ease;
        }

        .contacts-table tbody tr:hover {
          background: rgba(206, 155, 40, 0.05);
        }

        .contact-name {
          font-weight: 600;
          color: #ffffff;
        }

        .contact-email {
          color: #E8B429;
          text-decoration: none;
        }

        .contact-email:hover {
          text-decoration: underline;
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
        }

        .btn-reply:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.5);
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

          .contacts-table {
            min-width: 800px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

