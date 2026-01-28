"use client";
import React from "react";

export default function PolicyBanner() {
    const benefits = [
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            title: "Same-Day Quotes",
            subtitle: "7am-10pm Response"
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            title: "No Hidden Fees",
            subtitle: "Transparent Pricing"
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                </svg>
            ),
            title: "Meet & Greet",
            subtitle: "Included"
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
            ),
            title: "Free Cancellation",
            subtitle: "Flexible Booking"
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            title: "Free Waiting Time*",
            subtitle: "Airport Pickups"
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            title: "Fully Insured",
            subtitle: "Complete Coverage"
        },
    ];

    return (
        <section className="policy-banner-section section pt-60 pb-60">
            <div className="container-sub">
                <div className="policy-banner-wrapper wow fadeInUp">
                    <div className="row justify-content-center">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="col-lg-2 col-md-4 col-sm-6 col-6 mb-20">
                                <div className="policy-card">
                                    <div className="policy-icon-wrapper">{benefit.icon}</div>
                                    <h4 className="policy-card-title">{benefit.title}</h4>
                                    {benefit.subtitle && (
                                        <span className="policy-card-subtitle">{benefit.subtitle}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="home-policy-note text-center mt-30">
                        <p className="policy-note-text">
                            <span className="policy-highlight">*Free waiting</span> only on airport pick up. All other jobs include 15 minutes complimentary waiting; beyond this, minimum hourly rates apply.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .policy-banner-section {
          background: #000000;
        }
        .policy-banner-wrapper {
          background: rgba(255, 255, 255, 0.03);
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(206, 155, 40, 0.2);
          backdrop-filter: blur(10px);
        }
        .policy-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 100%;
          transition: all 0.3s ease;
          text-align: center;
        }
        .policy-card:hover {
          background: rgba(206, 155, 40, 0.1);
          border-color: rgba(206, 155, 40, 0.4);
          transform: translateY(-5px);
        }
        .policy-icon-wrapper {
          width: 40px;
          height: 40px;
          color: #ce9b28;
          transition: transform 0.3s ease;
        }
        .policy-card:hover .policy-icon-wrapper {
          transform: scale(1.1);
        }
        .policy-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }
        .policy-card-subtitle {
          font-size: 11px;
          color: #ce9b28;
          font-weight: 500;
          margin-top: 4px;
        }
        .home-policy-note {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .policy-note-text {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          max-width: 800px;
          margin: 0 auto;
        }
        .policy-highlight {
          color: #ce9b28;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .policy-card {
            padding: 20px 15px;
          }
          .policy-card-title {
            font-size: 13px;
          }
          .policy-card-subtitle {
            font-size: 10px;
          }
        }
        @media (max-width: 575px) {
          .policy-card {
            padding: 15px 10px;
          }
          .policy-card-title {
            font-size: 12px;
          }
          .policy-icon-wrapper {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
        </section>
    );
}
