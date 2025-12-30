"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BookingConfirmationPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'success', 'already-confirmed', 'error'
  const [bookingData, setBookingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const hasConfirmed = useRef(false);

  useEffect(() => {
    // Prevent duplicate API calls in React Strict Mode
    if (hasConfirmed.current) return;
    hasConfirmed.current = true;
    confirmBooking();
  }, []);

  const confirmBooking = async () => {
    try {
      const response = await fetch(`/api/booking/confirm/${params.token}`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        if (data.booking.alreadyConfirmed) {
          setStatus("already-confirmed");
        } else {
          setStatus("success");
        }
        setBookingData(data.booking);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Unable to confirm booking");
      }
    } catch (error) {
      console.error("Confirmation error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="spinner"></div>
          <p className="loading-text">Confirming your booking...</p>
        </div>

        <style jsx>{`
          .confirmation-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
            padding: 40px 20px;
          }

          .confirmation-card {
            background: rgba(0, 0, 0, 0.9);
            border: 3px solid #ce9b28;
            border-radius: 24px;
            padding: 80px 60px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(206, 155, 40, 0.3);
          }

          .spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(206, 155, 40, 0.2);
            border-top-color: #ce9b28;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 30px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .loading-text {
            color: #ffffff;
            font-size: 18px;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        {status === "success" && (
          <>
            {/* Success Animation */}
            <div className="success-animation">
              <div className="success-circle">
                <div className="checkmark"></div>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="title">Booking Confirmed!</h1>
            <p className="subtitle">Thank you for choosing Executive Fleet</p>

            {/* Booking Reference */}
            <div className="ref-badge">
              <p className="ref-label">Booking Reference</p>
              <p className="ref-number">{bookingData?.bookingReference}</p>
            </div>

            {/* Success Message */}
            <div className="message-box">
              <p className="message">
                Your booking has been successfully confirmed! We're excited to provide you with an exceptional chauffeur experience.
              </p>
              <p className="message">
                A confirmation email has been sent to your inbox. Our team will contact you 24 hours before your scheduled pickup to reconfirm all details.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="actions">
              <Link href="/" className="btn-home">
                Return to Homepage
              </Link>
            </div>
          </>
        )}

        {status === "already-confirmed" && (
          <>
            {/* Info Icon */}
            <div className="info-icon">ℹ️</div>

            {/* Message */}
            <h1 className="title">Already Confirmed</h1>
            <div className="ref-badge">
              <p className="ref-label">Booking Reference</p>
              <p className="ref-number">{bookingData?.bookingReference}</p>
            </div>
            <div className="message-box">
              <p className="message">
                This booking has already been confirmed. No further action is required.
              </p>
              <p className="message">
                If you need to make any changes, please contact us directly.
              </p>
            </div>
            <div className="actions">
              <Link href="/" className="btn-home">
                Return to Homepage
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            {/* Error Icon */}
            <div className="error-icon">⚠️</div>

            {/* Error Message */}
            <h1 className="title error">Confirmation Failed</h1>
            <div className="message-box error">
              <p className="message">
                {errorMessage}
              </p>
              <p className="message">
                This booking may have already been confirmed, cancelled, or the link may have expired.
              </p>
              <p className="message">
                Please contact us if you need assistance.
              </p>
            </div>

            {/* Contact Info */}
            <div className="contact-box">
              <p className="contact-title">Contact Us:</p>
              <p className="contact-item">
                📞 <a href="tel:+61430240945">+61 430 240 945</a>
              </p>
              <p className="contact-item">
                ✉️ <a href="mailto:executivefleet.au@gmail.com">executivefleet.au@gmail.com</a>
              </p>
            </div>

            <div className="actions">
              <Link href="/" className="btn-home">
                Return to Homepage
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .confirmation-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .confirmation-page::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(206, 155, 40, 0.15) 0%, transparent 70%);
          animation: pulse 15s ease-in-out infinite;
        }

        .confirmation-page::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(232, 180, 41, 0.12) 0%, transparent 70%);
          animation: pulse 20s ease-in-out infinite reverse;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1) translate(-10%, 10%);
            opacity: 0.8;
          }
        }

        .confirmation-card {
          background: rgba(0, 0, 0, 0.95);
          border: 3px solid #ce9b28;
          border-radius: 24px;
          padding: 80px 60px;
          max-width: 650px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(206, 155, 40, 0.4);
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Success Animation */
        .success-animation {
          margin-bottom: 40px;
        }

        .success-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease;
          box-shadow: 0 10px 40px rgba(206, 155, 40, 0.5);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .checkmark {
          width: 60px;
          height: 60px;
          border: 5px solid #000000;
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
          margin-top: -10px;
          animation: checkmark 0.5s ease 0.3s both;
        }

        @keyframes checkmark {
          from {
            width: 0;
            height: 0;
          }
          to {
            width: 60px;
            height: 30px;
          }
        }

        /* Info & Error Icons */
        .info-icon,
        .error-icon {
          font-size: 100px;
          margin-bottom: 30px;
          animation: scaleIn 0.5s ease;
        }

        /* Title */
        .title {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 15px 0;
          animation: fadeIn 0.6s ease 0.2s both;
        }

        .title.error {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8585 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 18px;
          color: #cccccc;
          margin: 0 0 40px 0;
          animation: fadeIn 0.6s ease 0.3s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Booking Reference Badge */
        .ref-badge {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          padding: 25px 40px;
          border-radius: 16px;
          margin: 30px 0;
          animation: fadeIn 0.6s ease 0.4s both;
          box-shadow: 0 8px 30px rgba(206, 155, 40, 0.4);
        }

        .ref-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #000000;
          margin: 0 0 8px 0;
        }

        .ref-number {
          font-size: 32px;
          font-weight: 900;
          color: #000000;
          letter-spacing: 3px;
          font-family: 'Courier New', monospace;
          margin: 0;
          line-height: 1.4;
          word-break: break-word;
        }

        /* Message Box */
        .message-box {
          background: rgba(206, 155, 40, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          animation: fadeIn 0.6s ease 0.5s both;
        }

        .message-box.error {
          background: rgba(255, 107, 107, 0.1);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .message {
          color: #e0e0e0;
          font-size: 16px;
          line-height: 1.8;
          margin: 0 0 15px 0;
        }

        .message:last-child {
          margin-bottom: 0;
        }

        /* Contact Box */
        .contact-box {
          background: rgba(206, 155, 40, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
        }

        .contact-title {
          color: #E8B429;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 15px 0;
        }

        .contact-item {
          color: #e0e0e0;
          font-size: 15px;
          margin: 10px 0;
        }

        .contact-item a {
          color: #E8B429;
          text-decoration: none;
          font-weight: 600;
        }

        .contact-item a:hover {
          text-decoration: underline;
        }

        /* Actions */
        .actions {
          margin-top: 40px;
          animation: fadeIn 0.6s ease 0.6s both;
        }

        .btn-home {
          display: inline-block;
          background: transparent;
          color: #E8B429;
          border: 2px solid #ce9b28;
          padding: 16px 40px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .btn-home:hover {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(206, 155, 40, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .confirmation-card {
            padding: 40px 20px;
          }

          .title {
            font-size: 32px;
          }

          .ref-badge {
            padding: 20px 15px;
          }

          .ref-number {
            font-size: 20px;
            letter-spacing: 1px;
          }

          .message {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}

