"use client";
import { useEffect } from "react";

export default function TimeRestrictionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="btn-close-icon" aria-label="Close">
          ×
        </button>
        <div className="modal-icon">
          ⚠️
        </div>
        <h3>Immediate Booking</h3>
        <p>
          For bookings within the next 2 hours, please call us directly to ensure availability.
        </p>

        <div className="modal-actions">
          <a href="tel:+61431951996" className="btn-call">
            Call +61 431 951 996
          </a>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #ffffff;
          padding: 40px 30px 30px;
          border-radius: 16px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          border: 2px solid #ce9b28;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
          position: relative;
        }

        .btn-close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 28px;
          color: #999;
          cursor: pointer;
          line-height: 1;
          padding: 5px;
          border-radius: 50%;
          transition: all 0.2s;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-close-icon:hover {
          color: #333;
          background: #f5f5f5;
        }

        .modal-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }

        h3 {
          margin: 0 0 10px;
          color: #000;
          font-size: 22px;
          font-weight: 700;
        }

        p {
          color: #666;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-call {
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          transition: transform 0.2s;
          display: block;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.2);
        }

        .btn-call:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
