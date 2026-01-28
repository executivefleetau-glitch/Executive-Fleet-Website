"use client";
import Image from "next/image";
import React from "react";

export default function BookSection({ car }) {
  return (
    <>
      <section className="book-section section pt-80 pb-80">
        <div className="container-sub">
          {/* Section Header */}
          <div className="book-section-header text-center mb-60 wow fadeInUp">
            <div className="book-section-badge">
              <span className="golden-dot"></span>
              <span>BOOK YOUR RIDE</span>
            </div>
            <h2 className="book-section-title">
              Reserve Your <span style={{ color: '#ce9b28' }}>Luxury Experience</span>
            </h2>
            <div className="book-title-underline"></div>
          </div>

          <div className="row">
            {/* Left Column - Vehicle Details */}
            <div className="col-xl-8 col-lg-7 mb-30">
              <div className="vehicle-details-card wow fadeInUp">
                <div className="vehicle-card-header">
                  <h3 className="vehicle-title">{car.title}</h3>
                  <p className="vehicle-description">{car.description}</p>
                </div>

                {/* Vehicle Info */}
                <div className="vehicle-info-row">
                  <div className="vehicle-info-item">
                    <svg className="info-icon" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="info-label">Passengers</span>
                    <span className="info-value">{car.passengerDisplay || car.passenger}</span>
                  </div>
                  <div className="vehicle-info-item">
                    <svg className="info-icon" viewBox="0 0 24 24">
                      <rect x="4" y="8" width="16" height="12" rx="2" />
                      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M12 8v4" />
                    </svg>
                    <span className="info-label">Luggage</span>
                    <span className="info-value">{car.luggageDisplay || car.luggage}</span>
                  </div>
                </div>

                {/* Vehicle Image */}
                <div className="vehicle-image-wrapper">
                  <div className="vehicle-image-border-glow"></div>
                  <Image
                    width={700}
                    height={326}
                    src={car.imgSrc}
                    alt={car.title}
                    className="vehicle-image"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Booking Info */}
            <div className="col-xl-4 col-lg-5 mb-30">
              <div className="booking-card wow fadeInUp">
                <h4 className="booking-card-title">Why Choose This Vehicle?</h4>

                <ul className="vehicle-features-list">
                  <li className="feature-list-item">
                    <svg className="feature-check-icon" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Executive luxury sedan</span>
                  </li>
                  <li className="feature-list-item">
                    <svg className="feature-check-icon" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Premium leather interiors</span>
                  </li>
                  <li className="feature-list-item">
                    <svg className="feature-check-icon" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Professional chauffeur</span>
                  </li>
                  <li className="feature-list-item">
                    <svg className="feature-check-icon" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Complimentary refreshments</span>
                  </li>
                  <li className="feature-list-item">
                    <svg className="feature-check-icon" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Flexible booking options</span>
                  </li>
                </ul>

                {/* Get Free Quote Button */}
                <div className="booking-cta-wrapper">
                  <a className="booking-cta-btn" href="/get-quote">
                    <span>Get Free Quote</span>
                    <svg className="cta-arrow" viewBox="0 0 24 24">
                      <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                    <div className="cta-overlay"></div>
                  </a>
                </div>

                {/* Additional Benefits */}
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span>Meet & Greet included</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                    <span>Free cancellation</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>Free Waiting Time*</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Fully Insured Travel</span>
                  </div>
                </div>

                {/* Policy Notes */}
                <div className="policy-notes mt-25">
                  <p className="policy-note-text">
                    <span className="policy-highlight">*Free waiting</span> only on airport pick up. All other jobs include 15 minutes complimentary waiting; beyond this, minimum hourly rates apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .book-section {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
        }

        /* Section Header */
        .book-section-header {
          margin-bottom: 60px;
        }

        .book-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .golden-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          border-radius: 50%;
        }

        .book-section-badge span:not(.golden-dot) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ce9b28;
          text-transform: uppercase;
        }

        .book-section-title {
          font-size: 44px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .golden-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .book-title-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Vehicle Details Card */
        .vehicle-details-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px;
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
        }

        .vehicle-details-card:hover {
          border-color: rgba(206, 155, 40, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .vehicle-card-header {
          margin-bottom: 30px;
        }

        .vehicle-title {
          font-size: 28px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 15px;
        }

        .vehicle-description {
          font-size: 15px;
          line-height: 1.7;
          color: #666666;
                margin: 0;
              }
              
        /* Vehicle Info Row */
        .vehicle-info-row {
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
        }

        .vehicle-info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
          border-radius: 12px;
          flex: 1;
          transition: all 0.3s ease;
        }

        .vehicle-info-item:hover {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .info-icon {
          width: 32px;
          height: 32px;
          stroke: #666666;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.3s ease;
        }

        .vehicle-info-item:hover .info-icon {
          stroke: #e8b429;
        }

        .info-label {
          font-size: 13px;
          font-weight: 600;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .vehicle-info-item:hover .info-label {
          color: #cccccc;
        }

        .info-value {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          transition: color 0.3s ease;
        }

        .vehicle-info-item:hover .info-value {
          color: #e8b429;
        }

        /* Vehicle Image */
        .vehicle-image-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          padding: 40px;
        }

        .vehicle-image-border-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vehicle-details-card:hover .vehicle-image-border-glow {
          left: 0;
        }

        .vehicle-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .vehicle-details-card:hover .vehicle-image {
          transform: scale(1.05);
        }

        /* Booking Card */
        .booking-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 30px;
          border: 2px solid #e5e5e5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 100px;
        }

        .booking-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 25px;
          position: relative;
          padding-bottom: 15px;
        }

        .booking-card-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
        }

        /* Features List */
        .vehicle-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }

        .feature-list-item {
                display: flex;
                align-items: center;
          gap: 12px;
          padding: 15px 0;
                border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
              }
              
        .feature-list-item:last-child {
                border-bottom: none;
              }
              
        .feature-list-item:hover {
          padding-left: 8px;
        }

        .feature-check-icon {
          width: 20px;
          height: 20px;
          min-width: 20px;
          stroke: #ce9b28;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.3s ease;
        }

        .feature-list-item:hover .feature-check-icon {
          stroke: #e8b429;
          transform: scale(1.15);
        }

        .feature-list-item span {
                font-size: 15px;
          color: #333333;
          font-weight: 500;
                line-height: 1.5;
              }
              
        /* CTA Button */
        .booking-cta-wrapper {
          margin-bottom: 30px;
        }

        .booking-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 16px 30px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          color: #000000;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
        }

        .booking-cta-btn span,
        .booking-cta-btn .cta-arrow {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .cta-arrow {
          width: 20px;
          height: 20px;
          stroke: #000000;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cta-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        .booking-cta-btn:hover .cta-overlay {
          left: 0;
        }

        .booking-cta-btn:hover span,
        .booking-cta-btn:hover .cta-arrow {
          color: #e8b429;
          stroke: #e8b429;
        }

        .booking-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(206, 155, 40, 0.4);
        }

        /* Benefits Grid */
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          padding-top: 30px;
          border-top: 2px solid #f0f0f0;
        }

        .policy-notes {
          padding: 15px;
          background: rgba(206, 155, 40, 0.05);
          border-left: 3px solid #ce9b28;
          border-radius: 4px;
        }

        .policy-note-text {
          font-size: 13px;
          line-height: 1.5;
          color: #555555;
          margin: 0;
        }

        .policy-highlight {
          color: #ce9b28;
          font-weight: 700;
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 15px;
          background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
          border-radius: 10px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          transform: translateY(-3px);
        }

        .benefit-icon {
          width: 24px;
          height: 24px;
          stroke: #666666;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.3s ease;
        }

        .benefit-item:hover .benefit-icon {
          stroke: #e8b429;
        }

        .benefit-item span {
          font-size: 12px;
          font-weight: 600;
          color: #333333;
          line-height: 1.4;
          transition: color 0.3s ease;
        }

        .benefit-item:hover span {
          color: #ffffff;
        }

        /* Responsive */
        @media (max-width: 1199px) {
          .booking-card {
            position: static;
          }
        }

        @media (max-width: 991px) {
          .book-section-title {
            font-size: 36px;
          }

          .vehicle-details-card,
          .booking-card {
            padding: 30px 25px;
          }

          .vehicle-title {
            font-size: 24px;
          }

          .vehicle-info-row {
            gap: 15px;
          }

          .vehicle-info-item {
                padding: 15px;
          }
        }

        @media (max-width: 767px) {
          .book-section-title {
            font-size: 28px;
          }

          .vehicle-details-card,
          .booking-card {
            padding: 25px 20px;
          }

          .vehicle-title {
            font-size: 22px;
          }

          .vehicle-info-row {
            flex-direction: column;
            gap: 12px;
          }

          .vehicle-image-wrapper {
            padding: 30px 20px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .booking-cta-btn {
            padding: 14px 25px;
            font-size: 15px;
          }
        }

        @media (max-width: 575px) {
          .book-section-title {
            font-size: 24px;
          }

          .book-section-badge span:not(.golden-dot) {
            font-size: 11px;
          }
              }
            `}</style>
    </>
  );
}
