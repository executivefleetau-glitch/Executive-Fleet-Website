"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContact, setEmailContact] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
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

  const openEmailModal = (contact) => {
    setEmailContact(contact);
    setEmailMessage("");
    setShowEmailModal(true);
  };

  const handleSendEmail = async () => {
    if (!emailContact) return;
    if (!emailMessage.trim()) {
      alert("Please enter a reply message.");
      return;
    }
    setSendingEmail(true);
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailContact.email,
          subject: `Re: ${emailContact.subject}`,
          message: emailMessage,
          customerName: emailContact.fullName,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setShowEmailModal(false);
        setEmailContact(null);
        setEmailMessage("");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setSendingEmail(false);
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
          <button 
            className="refresh-btn" 
            onClick={fetchContacts}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading contact queries...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>No Contact Queries</h3>
            <p>Contact submissions will appear here.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container desktop-view">
              <table className="contacts-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>
                        <span className="contact-id">HPN-0{String(index + 1).padStart(3, '0')}</span>
                      </td>
                      <td>
                        <span className="contact-name">{contact.fullName}</span>
                      </td>
                      <td>
                        <a href={`mailto:${contact.email}`} className="contact-email">
                          {contact.email}
                        </a>
                      </td>
                      <td className="subject-cell">{contact.subject}</td>
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
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="btn-email"
                            onClick={() => openEmailModal(contact)}
                            title="Send Email Reply"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(contact.id)}
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
              {contacts.map((contact, index) => (
                <div key={contact.id} className="contact-card">
                  <div className="card-header">
                    <div className="card-id-section">
                      <span className="card-label">Id</span>
                      <span className="card-id">HPN-0{String(index + 1).padStart(3, '0')}</span>
                    </div>
                    <div className="card-actions-top">
                      <button
                        className="btn-view-icon"
                        onClick={() => viewDetails(contact)}
                        title="View Details"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className="btn-delete-icon"
                        onClick={() => handleDelete(contact.id)}
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
                    <span className="card-label">Cookstove no.</span>
                    <span className="card-value">:{String(index + 12).padStart(4, '0')}</span>
                  </div>
                  
                  <div className="card-row">
                    <span className="card-label">Buyer Name</span>
                    <span className="card-value">:{contact.fullName}</span>
                  </div>
                  
                  <div className="card-row">
                    <span className="card-label">Status</span>
                    <span className="card-status">:Pending</span>
                  </div>
                  
                  <button
                    className="btn-send"
                    onClick={() => openEmailModal(contact)}
                  >
                    <span>Send</span>
                  </button>
                </div>
              ))}
            </div>
          </>
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
                  <span className="detail-label" >Message:</span>
                  <div className="message-box">
                    {selectedContact.message}
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-reply"
                    onClick={() => handleSendEmail(selectedContact)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Email Modal */}
        {showEmailModal && emailContact && (
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
                    <a href={`mailto:${emailContact.email}`}>{emailContact.email}</a>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">Re: {emailContact.subject}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="emailMessage" className="detail-label" >Message</label><br /><br />
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
                    {sendingEmail ? "Sending..." : "Send Reply"}
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

        .contact-id {
          font-weight: 700;
          color: #E8B429;
          font-size: 14px;
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

        .subject-cell {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-buttons button {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(206, 155, 40, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          color: #e8b429;
        }

        .action-buttons button svg {
          width: 18px;
          height: 18px;
          stroke: #e8b429;
        }

        /* Force inner paths to stay golden even if other styles leak in */
        .action-buttons button svg * {
          stroke: #e8b429 !important;
        }

        .btn-view {
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-view svg {
          stroke: #e8b429;
        }

        .btn-view:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
        }

        .btn-email {
          background: #000000;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-email svg {
          stroke: #e8b429;
        }

        .btn-email:hover {
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
          stroke: #e8b429;
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

        .contact-card {
          background: #000000;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(206, 155, 40, 0.3);
          position: relative;
          transition: all 0.3s ease;
          margin-bottom: 20px !important;
        }

        .contact-card:hover {
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
          stroke: #e8b429;
        }

        .btn-view-icon svg * {
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
          stroke: #e8b429;
        }

        .btn-delete-icon svg * {
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
        }

        .card-status {
          font-size: 15px;
          font-weight: 700;
          text-align: right;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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

