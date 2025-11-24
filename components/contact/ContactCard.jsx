"use client";

export default function ContactCard({ icon: Icon, title, value, description }) {
  return (
    <div className="contact-card-wrapper">
      {/* Card Background with elegant border */}
      <div className="contact-card-background"></div>

      {/* Black overlay that slides from bottom to top on hover */}
      <div className="contact-card-overlay-container">
        <div className="contact-card-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="contact-card-content">
        {/* Icon Container with elegant styling */}
        <div className="contact-card-icon-wrapper">
          <div className="contact-card-icon-glow"></div>
          <div className="contact-card-icon-circle">
            <Icon />
          </div>
        </div>

        {/* Title */}
        <h3 className="contact-card-title">{title}</h3>

        {/* Main Value */}
        <p className="contact-card-value">{value}</p>

        {/* Description */}
        <p className="contact-card-description">{description}</p>

        {/* Decorative bottom line */}
        <div className="contact-card-bottom-line"></div>
      </div>

      <style jsx>{`
        .contact-card-wrapper {
          position: relative;
          overflow: hidden;
          height: 100%;
          min-height: 320px;
        }

        .contact-card-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f7f7f7 0%, #fafafa 100%);
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          transition: all 0.5s ease;
        }

        .contact-card-wrapper:hover .contact-card-background {
          border-color: #000000;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .contact-card-overlay-container {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          overflow: hidden;
          pointer-events: none;
        }

        .contact-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 5, 5, 0.4) 0%,
            rgba(5, 5, 5, 0.2) 50%,
            transparent 100%
          );
          transform: translateY(100%);
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-card-wrapper:hover .contact-card-overlay {
          transform: translateY(0);
        }

        .contact-card-content {
          position: relative;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          border-radius: 10px;
          transition: all 0.5s ease;
        }

        .contact-card-icon-wrapper {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .contact-card-icon-glow {
          position: absolute;
          inset: 0;
          background: #000000;
          border-radius: 50%;
          opacity: 0;
          filter: blur(16px);
          transition: all 0.5s ease;
        }

        .contact-card-wrapper:hover .contact-card-icon-glow {
          opacity: 0.1;
          transform: scale(1.5);
        }

        .contact-card-icon-circle {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          border-radius: 50%;
          transition: all 0.5s ease;
        }

        .contact-card-icon-circle :global(svg) {
          width: 32px;
          height: 32px;
          color: #ffffff;
          stroke: currentColor;
          fill: none;
        }

        .contact-card-wrapper:hover .contact-card-icon-circle {
          transform: scale(1.1);
        }

        .contact-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        .contact-card-value {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.75rem;
          word-break: break-word;
        }

        .contact-card-description {
          font-size: 0.875rem;
          color: #626262;
          margin-bottom: 0;
          transition: color 0.3s ease;
        }

        .contact-card-wrapper:hover .contact-card-description {
          color: #3a3a3a;
        }

        .contact-card-bottom-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 4px;
          background: #000000;
          border-radius: 2px;
          width: 0;
          transition: width 0.5s ease;
        }

        .contact-card-wrapper:hover .contact-card-bottom-line {
          width: 48px;
        }

        @media (max-width: 991px) {
          .contact-card-content {
            padding: 2rem;
          }
          .contact-card-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 767px) {
          .contact-card-wrapper {
            min-height: 280px;
          }
          .contact-card-content {
            padding: 1.75rem;
          }
          .contact-card-icon-circle {
            width: 56px;
            height: 56px;
          }
          .contact-card-icon-circle :global(svg) {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}

