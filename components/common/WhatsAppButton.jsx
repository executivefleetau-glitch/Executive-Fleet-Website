"use client";
import { useState, useEffect } from "react";

export default function WhatsAppButton({ 
  phoneNumber = "61431951996",
  message = "Hi, I'd like to get a quote for chauffeur service in Melbourne."
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    
    // Stop pulsing after 10 seconds
    const pulseTimer = setTimeout(() => setIsPulsing(false), 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (!isVisible) return null;

  return (
    <>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-button ${isPulsing ? 'pulse' : ''}`}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="whatsapp-icon" width="26" height="26">
          <path fill="#fff" d="M16.004 0C7.168 0 0 7.168 0 16.004c0 2.816.736 5.568 2.144 8L.08 32l8.288-2.176A15.88 15.88 0 0016.004 32C24.84 32 32 24.832 32 15.996 32 7.168 24.84 0 16.004 0zm0 29.328a13.24 13.24 0 01-7.072-2.048l-.512-.304-5.28 1.392 1.408-5.152-.336-.528a13.25 13.25 0 01-2.04-7.08c0-7.328 5.96-13.28 13.288-13.28 7.328 0 13.28 5.952 13.28 13.28 0 7.32-5.952 13.28-13.28 13.28l-.456-.016-.544.016zm7.728-9.92c-.424-.208-2.496-1.232-2.88-1.376-.384-.136-.664-.208-.944.216-.28.416-1.088 1.368-1.336 1.656-.248.28-.488.312-.912.104-.416-.208-1.76-.648-3.352-2.072-1.24-1.104-2.072-2.472-2.32-2.888-.24-.424-.024-.648.184-.856.184-.184.416-.488.624-.728.208-.248.28-.416.416-.696.144-.28.072-.528-.032-.736-.104-.208-.944-2.28-1.296-3.12-.336-.816-.68-.704-.944-.72l-.8-.016c-.28 0-.728.104-1.112.52-.384.416-1.464 1.432-1.464 3.496s1.496 4.056 1.704 4.336c.208.28 2.944 4.496 7.128 6.304.992.432 1.768.688 2.376.88.992.312 1.896.272 2.608.168.8-.12 2.496-1.024 2.848-2.008.352-.984.352-1.832.248-2.008-.104-.184-.384-.28-.8-.488z"/>
        </svg>
        <span className="whatsapp-text">Chat with us</span>
      </a>

      <style jsx>{`
        .whatsapp-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: #25D366;
          color: #fff;
          text-decoration: none;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          z-index: 9999;
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .whatsapp-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
        }

        .whatsapp-button.pulse {
          animation: slideIn 0.5s ease-out, pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6), 0 0 0 10px rgba(37, 211, 102, 0.1);
          }
          100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          }
        }

        .whatsapp-icon {
          width: 26px;
          height: 26px;
        }

        .whatsapp-text {
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .whatsapp-button {
            bottom: 20px;
            right: 20px;
            padding: 12px 16px;
          }

          .whatsapp-icon {
            width: 24px;
            height: 24px;
          }

          .whatsapp-text {
            display: none;
          }

          .whatsapp-button {
            border-radius: 50%;
            padding: 14px;
          }
        }
      `}</style>
    </>
  );
}
