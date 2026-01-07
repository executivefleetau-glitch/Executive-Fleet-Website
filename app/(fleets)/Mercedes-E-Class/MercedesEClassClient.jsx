"use client";

import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { cars } from "@/data/cars";
import React, { useEffect } from "react";
import Image from "next/image";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";

export default function MercedesEClassClient() {
    // Mercedes E-Class is index 4 in cars.js
    const car = cars[4];

    useEffect(() => {
        addLeftPaddingSwiper();
    }, []);

    return (
        <>
            <Header1 /> <MobailHeader1 />
            <main className="main">
                <BreadCumb />

                {/* Hero Image Section */}
                <section className="fleet-detail-hero">
                    <div className="fleet-hero-image-wrapper">
                        <Image
                            width={1920}
                            height={760}
                            src="/assets/imgs/cars/Mercedes-E-Class-VIP.png"
                            alt="Mercedes-Benz E-Class"
                            className="fleet-hero-image"
                            style={{ objectFit: "contain", transform: "scale(0.9)" }}
                        />
                        <div className="fleet-hero-overlay"></div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="fleet-detail-content section pt-80">
                    <div className="container-sub">
                        <div className="fleet-detail-wrapper">
                            {/* Badge and Title */}
                            <div className="fleet-detail-header wow fadeInUp">
                                <div className="fleet-detail-badge">
                                    <span className="golden-dot"></span>
                                    <span>BUSINESS CLASS</span>
                                </div>
                                <h1 className="fleet-detail-title">
                                    Mercedes-Benz E-Class – <span style={{ color: '#ce9b28' }}>Chauffeur Melbourne</span>
                                </h1>
                                <div className="fleet-title-underline"></div>
                            </div>

                            {/* Content */}
                            <div className="fleet-detail-description wow fadeInUp">
                                <p className="fleet-intro-text">
                                    The Mercedes-Benz E-Class constitutes the core of our business fleet. It is widely regarded as the "World's Best Business Saloon" for a reason. Combining elegant design with proven reliability and comfort, it is the go-to choice for corporate travelers in Melbourne who require punctual and professional transport without compromise.
                                </p>
                                <p className="fleet-intro-text">
                                    Our E-Class vehicles are meticulously maintained to showroom standards. Inside, the cabin offers a serene environment perfect for checking emails on the go or relaxing after a long flight. It balances luxury and efficiency perfectly, making it ideal for airport transfers and day-to-day executive travel.
                                </p>

                                {/* We Offer Section */}
                                <div className="fleet-offers-section">
                                    <h3 className="fleet-offers-title">We Offer</h3>
                                    <ul className="fleet-offers-list">
                                        <li className="fleet-offer-item">
                                            <svg className="check-icon" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <div>
                                                <strong>Business Standard</strong>
                                                <span>The preferred vehicle for corporate accounts and executive transfers.</span>
                                            </div>
                                        </li>
                                        <li className="fleet-offer-item">
                                            <svg className="check-icon" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <div>
                                                <strong>Reliable Comfort</strong>
                                                <span>Ergonomic seating and a smooth ride ensure you arrive fresh.</span>
                                            </div>
                                        </li>
                                        <li className="fleet-offer-item">
                                            <svg className="check-icon" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <div>
                                                <strong>Ample Luggage Space</strong>
                                                <span>Generous boot capacity accomodating two large suitcases easily.</span>
                                            </div>
                                        </li>
                                        <li className="fleet-offer-item">
                                            <svg className="check-icon" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <div>
                                                <strong>Fixed Price Transfers</strong>
                                                <span>Competitive rates for a premium Mercedes-Benz experience.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Book Now Button */}
                                <div className="fleet-cta-wrapper">
                                    <a className="fleet-book-btn" href="/booking-vehicle">
                                        <span>Book E-Class Now</span>
                                        <svg className="btn-arrow" viewBox="0 0 24 24">
                                            <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                        <div className="btn-overlay"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Book Section */}
                <BookSection car={car} />

                {/* Features Section */}
                <section className="fleet-features-section section pt-80 pb-80">
                    <div className="container-sub">
                        {/* Section Header */}
                        <div className="fleet-features-header text-center mb-60 wow fadeInUp">
                            <div className="fleet-features-badge">
                                <span className="golden-dot"></span>
                                <span>VEHICLE FEATURES</span>
                            </div>
                            <h2 className="fleet-features-title">
                                Features of Our <span style={{ color: '#ce9b28' }}>E-Class</span>
                            </h2>
                            <div className="features-title-underline"></div>
                        </div>

                        {/* Features Grid */}
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={56}
                                            height={56}
                                            src="/assets/imgs/page/fleet/camera.svg"
                                            alt="Safety"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">5-Star Safety</h5>
                                    <p className="feature-card-description">
                                        Equipped with Mercedes-Benz's latest active safety systems for your peace of mind.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={56}
                                            height={56}
                                            src="/assets/imgs/page/fleet/water.svg"
                                            alt="Value"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">Great Value</h5>
                                    <p className="feature-card-description">
                                        Experience luxury chauffeur services at a rate comparable to standard taxis.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={64}
                                            height={64}
                                            src="/assets/imgs/page/fleet/coffee.svg"
                                            alt="Comfort"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">Refined Cabin</h5>
                                    <p className="feature-card-description">
                                        Leather upholstery and wood trim create a warm, inviting atmosphere for your journey.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={56}
                                            height={56}
                                            src="/assets/imgs/page/fleet/newspaper.svg"
                                            alt="Work"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">Productivity</h5>
                                    <p className="feature-card-description">
                                        A smooth ride and quiet cabin allow you to focus on calls or preparation for your next meeting.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0.4s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={56}
                                            height={56}
                                            src="/assets/imgs/page/fleet/cooperation.svg"
                                            alt="Chauffeurs"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">Expert Drivers</h5>
                                    <p className="feature-card-description">
                                        Our E-Class chauffeurs are professional, courteous, and knowledgeable about all Melbourne routes.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-40">
                                <div className="fleet-feature-card wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="feature-card-border-top"></div>
                                    <div className="feature-icon-wrapper">
                                        <Image
                                            width={64}
                                            height={64}
                                            src="/assets/imgs/page/fleet/rim.svg"
                                            alt="Sleek"
                                            className="feature-icon-img"
                                        />
                                    </div>
                                    <h5 className="feature-card-title">Modern Design</h5>
                                    <p className="feature-card-description">
                                        The E-Class features a dynamic exterior that looks professional and stylish in any setting.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer1 />
            <style jsx global>{`
        /* Hero Section */
        .fleet-detail-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #fcfcfc;
        }

        .fleet-hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fleet-hero-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        .fleet-hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(to top, #ffffff, transparent);
        }

        /* Content Section */
        .fleet-detail-content {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
        }

        .fleet-detail-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Header */
        .fleet-detail-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .fleet-detail-badge {
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

        .fleet-detail-badge span:not(.golden-dot) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ce9b28;
          text-transform: uppercase;
        }

        .fleet-detail-title {
          font-size: 48px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .fleet-title-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Description */
        .fleet-detail-description {
          margin-top: 40px;
        }

        .fleet-intro-text {
          font-size: 16px;
          line-height: 1.8;
          color: #333333;
          margin-bottom: 20px;
        }

        /* Offers Section */
        .fleet-offers-section {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px;
          margin: 40px 0;
          border: 2px solid #f0f0f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .fleet-offers-title {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 30px;
          display: inline-block;
          position: relative;
        }

        .fleet-offers-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
        }

        .fleet-offers-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .fleet-offer-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 25px;
          border-bottom: 1px solid #f0f0f0;
        }

        .fleet-offer-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .check-icon {
          width: 24px;
          height: 24px;
          min-width: 24px;
          stroke: #ce9b28;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          margin-top: 2px;
        }

        .fleet-offer-item div {
          flex: 1;
        }

        .fleet-offer-item strong {
          display: block;
          font-size: 17px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 5px;
        }

        .fleet-offer-item span {
          display: block;
          font-size: 15px;
          line-height: 1.6;
          color: #666666;
        }

        /* CTA Button */
        .fleet-cta-wrapper {
          text-align: center;
          margin-top: 40px;
        }

        .fleet-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
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

        .fleet-book-btn span,
        .fleet-book-btn .btn-arrow {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .btn-arrow {
          width: 20px;
          height: 20px;
          stroke: #000000;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .btn-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        .fleet-book-btn:hover .btn-overlay {
          left: 0;
        }

        .fleet-book-btn:hover span,
        .fleet-book-btn:hover .btn-arrow {
          color: #e8b429;
          stroke: #e8b429;
        }

        .fleet-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(206, 155, 40, 0.4);
        }

        /* Features Section */
        .fleet-features-section {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
        }

        .fleet-features-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .fleet-features-badge span:not(.golden-dot) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ce9b28;
          text-transform: uppercase;
        }

        .fleet-features-title {
          font-size: 44px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .features-title-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Feature Cards */
        .fleet-feature-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 30px;
          text-align: center;
          border: 2px solid #e5e5e5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          height: 100%;
          cursor: pointer;
        }

        .feature-card-border-top {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .fleet-feature-card:hover .feature-card-border-top {
          left: 0;
        }

        .feature-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          border: 2px solid #e0e0e0;
          margin: 0 auto 25px;
          transition: all 0.4s ease;
        }

        .fleet-feature-card:hover .feature-icon-wrapper {
          background: #000000;
          border-color: #ce9b28;
          transform: scale(1.05);
        }

        .feature-icon-img {
          transition: all 0.4s ease;
          filter: brightness(0.3);
        }

        .fleet-feature-card:hover .feature-icon-img {
          filter: brightness(0) saturate(100%) invert(66%) sepia(82%) saturate(426%) hue-rotate(3deg) brightness(98%) contrast(91%);
        }

        .feature-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .fleet-feature-card:hover .feature-card-title {
          color: #ce9b28;
        }

        .feature-card-description {
          font-size: 15px;
          line-height: 1.7;
          color: #666666;
          margin: 0;
        }

        .fleet-feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: rgba(206, 155, 40, 0.3);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .fleet-hero-image-wrapper {
            height: 400px;
          }

          .fleet-detail-title {
            font-size: 36px;
          }

          .fleet-features-title {
            font-size: 36px;
          }

          .fleet-offers-section {
            padding: 30px 25px;
          }
        }

        @media (max-width: 767px) {
          .fleet-hero-image-wrapper {
            height: 300px;
          }

          .fleet-detail-title {
            font-size: 28px;
          }

          .fleet-features-title {
            font-size: 28px;
          }

          .fleet-offers-section {
            padding: 25px 20px;
          }

          .fleet-offers-title {
            font-size: 20px;
          }

          .fleet-offer-item strong {
            font-size: 16px;
          }

          .fleet-offer-item span {
            font-size: 14px;
          }

          .fleet-book-btn {
            padding: 14px 32px;
            font-size: 15px;
          }
        }
      `}</style>
        </>
    );
}
