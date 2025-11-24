"use client";

import ContactCard from "./ContactCard";

// Icon components (SVG based) - matching V0 design
const PhoneIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function ContactCards() {
  const contactInfo = [
    {
      icon: MailIcon,
      title: "Email",
      value: "info@executivefleet.com.au",
      description: "Get in touch via email",
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      value: "+41 22 715 7000",
      description: "Call us during business hours",
    },
    {
      icon: MapPinIcon,
      title: "Address",
      value: "Melbourne VIC, Australia",
      description: "Visit our main office",
    },
  ];

  return (
    <section className="contact-cards-section">
      <div className="container-sub">
        {/* Header Section - matching V0 design */}
        <div className="contact-cards-header">
          <h1 className="contact-cards-main-title">Get In Touch</h1>
          <p className="contact-cards-subtitle">
            Reach out to our team for inquiries, partnerships, or just to say hello. We're here to help.
          </p>
        </div>

        {/* Contact Cards Grid - matching V0 layout */}
        <div className="contact-cards-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-card-item wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
              <ContactCard
                icon={info.icon}
                title={info.title}
                value={info.value}
                description={info.description}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .contact-cards-section {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1.5rem;
        }

        .contact-cards-header {
          max-width: 768px;
          text-align: center;
          margin: 0 auto 4rem auto;
        }

        .contact-cards-main-title {
          font-size: 3.75rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .contact-cards-subtitle {
          font-size: 1.125rem;
          color: #626262;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .contact-card-item {
          width: 100%;
        }

        /* Tablet */
        @media (max-width: 991px) {
          .contact-cards-section {
            padding: 4rem 1.5rem;
          }

          .contact-cards-main-title {
            font-size: 3rem;
          }

          .contact-cards-header {
            margin-bottom: 3rem;
          }

          .contact-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .contact-cards-section {
            padding: 3rem 1rem;
            min-height: auto;
          }

          .contact-cards-main-title {
            font-size: 2.25rem;
          }

          .contact-cards-subtitle {
            font-size: 1rem;
          }

          .contact-cards-header {
            margin-bottom: 2.5rem;
          }

          .contact-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .contact-cards-main-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

