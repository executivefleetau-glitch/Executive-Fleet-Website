"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Notification Context
const NotificationContext = createContext(null);

export const useNotifications = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastBookingCount, setLastBookingCount] = useState(null);
  const [lastBookingId, setLastBookingId] = useState(null);
  const audioRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  // Only run on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  // Load sound preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ef-notification-sound');
      setSoundEnabled(saved !== 'false');
    }
  }, []);

  // Save sound preference
  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('ef-notification-sound', newValue.toString());
  };

  // Request notification permission
  useEffect(() => {
    if (!isAdminPage) return;
    
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [isAdminPage]);

  // Play notification sound using Web Audio API
  const playNotificationSound = () => {
    if (!soundEnabled) return;
    
    try {
      // Create AudioContext on demand (browser requirement)
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Create a pleasant notification chime (two-tone)
      const playTone = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        // Envelope: quick attack, sustain, quick release
        const now = audioContext.currentTime + startTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.setValueAtTime(0.3, now + duration - 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
      };
      
      // Play two-tone chime (G5, then B5 - pleasant notification sound)
      playTone(784, 0, 0.15);      // G5
      playTone(988, 0.12, 0.2);    // B5
      
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Show browser notification
  const showBrowserNotification = (title, body) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/assets/imgs/logo/EF Logo-05.png',
          badge: '/assets/imgs/logo/tab.png',
          tag: 'new-booking',
          requireInteraction: true,
        });
      } catch (error) {
        console.log('Could not show browser notification:', error);
      }
    }
  };

  // Add toast notification
  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);

    // Play sound
    playNotificationSound();

    // Show browser notification
    if (notification.showBrowser !== false) {
      showBrowserNotification(notification.title, notification.message);
    }
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Poll for new bookings
  useEffect(() => {
    if (!isAdminPage) return;

    const checkForNewBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings?limit=1');
        if (!response.ok) return;
        
        const data = await response.json();
        const bookings = data.bookings || [];
        const totalCount = data.total || bookings.length;
        const latestBooking = bookings[0];

        // First load - just set the baseline
        if (lastBookingCount === null) {
          setLastBookingCount(totalCount);
          setLastBookingId(latestBooking?.id);
          return;
        }

        // Check if there's a new booking
        if (latestBooking && latestBooking.id !== lastBookingId) {
          addNotification({
            type: 'new-booking',
            title: 'New Booking Request!',
            message: `${latestBooking.customerName} - ${latestBooking.serviceType}`,
            booking: latestBooking,
          });
          
          setLastBookingId(latestBooking.id);
          setLastBookingCount(totalCount);
        }
      } catch (error) {
        console.log('Error checking for new bookings:', error);
      }
    };

    // Initial check
    checkForNewBookings();

    // Poll every 30 seconds
    pollingIntervalRef.current = setInterval(checkForNewBookings, 30000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isAdminPage, lastBookingCount, lastBookingId]);

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    soundEnabled,
    toggleSound,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Container */}
      {isAdminPage && notifications.length > 0 && (
        <div className="toast-container">
          {notifications.map((notification) => (
            <div key={notification.id} className={`toast toast-${notification.type || 'info'}`}>
              <div className="toast-icon">
                {notification.type === 'new-booking' ? '🔔' : 
                 notification.type === 'success' ? '✅' : 
                 notification.type === 'error' ? '❌' : 'ℹ️'}
              </div>
              <div className="toast-content">
                <div className="toast-title">{notification.title}</div>
                <div className="toast-message">{notification.message}</div>
              </div>
              <button 
                className="toast-close" 
                onClick={() => removeNotification(notification.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 380px;
          width: 100%;
          pointer-events: none;
        }

        .toast {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid #ce9b28;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(206, 155, 40, 0.2);
          animation: slideIn 0.3s ease-out;
          pointer-events: all;
        }

        .toast-new-booking {
          border-color: #ce9b28;
          background: linear-gradient(145deg, #1a1a0a 0%, #0a0a00 100%);
        }

        .toast-success {
          border-color: #10b981;
        }

        .toast-error {
          border-color: #ef4444;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .toast-content {
          flex: 1;
          min-width: 0;
        }

        .toast-title {
          font-size: 15px;
          font-weight: 700;
          color: #ce9b28;
          margin-bottom: 4px;
        }

        .toast-message {
          font-size: 13px;
          color: #ccc;
          line-height: 1.4;
        }

        .toast-close {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          color: #888;
          width: 28px;
          height: 28px;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .toast-close:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        @media (max-width: 480px) {
          .toast-container {
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}
