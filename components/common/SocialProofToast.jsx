"use client";
import { useState, useEffect, useRef } from "react";

// Maximum number of times to show the toast per session
const MAX_TOAST_SHOWS = 2;

// Melbourne suburbs for realistic notifications
const MELBOURNE_SUBURBS = [
  "South Yarra", "Toorak", "Brighton", "St Kilda", "Richmond",
  "Carlton", "Fitzroy", "Collingwood", "Hawthorn", "Malvern",
  "Prahran", "Kew", "Camberwell", "Albert Park", "Middle Park",
  "Elwood", "Caulfield", "Armadale", "Glen Iris", "Balwyn"
];

// Common first names
const FIRST_NAMES = [
  "James", "Sarah", "Michael", "Emma", "David", "Jessica", "Daniel", "Sophie",
  "William", "Olivia", "John", "Emily", "Robert", "Chloe", "Thomas", "Grace",
  "Mark", "Amy", "Chris", "Hannah", "Peter", "Lucy", "Andrew", "Rachel"
];

// Service types
const SERVICE_TYPES = [
  "airport transfer", "corporate booking", "wedding transfer",
  "winery tour", "event transfer"
];

// Time intervals
const TIME_INTERVALS = [
  "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago",
  "15 minutes ago", "20 minutes ago", "30 minutes ago"
];

export default function SocialProofToast({ 
  showOnPaths = ["/", "/lp/"], 
  intervalMin = 45, 
  intervalMax = 90 
}) {
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const showCountRef = useRef(0);

  const generateToast = () => {
    const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const suburb = MELBOURNE_SUBURBS[Math.floor(Math.random() * MELBOURNE_SUBURBS.length)];
    const service = SERVICE_TYPES[Math.floor(Math.random() * SERVICE_TYPES.length)];
    const time = TIME_INTERVALS[Math.floor(Math.random() * TIME_INTERVALS.length)];

    return { name, suburb, service, time };
  };

  const showToast = () => {
    // Check if we've already shown max number of toasts
    if (showCountRef.current >= MAX_TOAST_SHOWS) return;
    
    showCountRef.current += 1;
    setToast(generateToast());
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  useEffect(() => {
    // Check if we should show on this path
    const currentPath = window.location.pathname;
    const shouldShow = showOnPaths.some(path => currentPath.startsWith(path));
    
    if (!shouldShow) return;

    // Initial toast after 15 seconds
    const initialTimer = setTimeout(showToast, 15000);

    // Second toast after another interval (only if max not reached)
    const secondTimer = setTimeout(() => {
      if (showCountRef.current < MAX_TOAST_SHOWS) {
        showToast();
      }
    }, 60000); // Show second toast after 60 seconds

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
    };
  }, [showOnPaths]);

  if (!toast) return null;

  return (
    <>
      <div className={`social-proof-toast ${isVisible ? 'visible' : ''}`}>
        <div className="toast-icon">🚗</div>
        <div className="toast-content">
          <p className="toast-message">
            <strong>{toast.name}</strong> from <strong>{toast.suburb}</strong> booked an {toast.service}
          </p>
          <p className="toast-time">{toast.time}</p>
        </div>
        <button 
          className="toast-close" 
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>

      <style jsx>{`
        .social-proof-toast {
          position: fixed;
          bottom: 100px;
          left: 24px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          z-index: 9998;
          max-width: 340px;
          transform: translateX(-120%);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 4px solid #ce9b28;
        }

        .social-proof-toast.visible {
          transform: translateX(0);
          opacity: 1;
        }

        .toast-icon {
          font-size: 28px;
          flex-shrink: 0;
          animation: bounce 1s ease-in-out;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .toast-content {
          flex: 1;
        }

        .toast-message {
          font-size: 14px;
          color: #333;
          margin: 0 0 4px;
          line-height: 1.4;
        }

        .toast-message strong {
          color: #000;
        }

        .toast-time {
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        .toast-close {
          position: absolute;
          top: 8px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          color: #999;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.2s;
        }

        .toast-close:hover {
          color: #333;
        }

        @media (max-width: 768px) {
          .social-proof-toast {
            left: 16px;
            right: 16px;
            bottom: 90px;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
