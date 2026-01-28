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
import Faq from "@/components/homes/home-1/Faq";
import { faqsFleet } from "@/data/faq";

export default function MercedesSClassClient() {
  // mercedes s class is index 0 in cars.js
  const car = cars[0];

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
              src="/assets/imgs/cars/Mercedes-S-Class-VIP.png"
              alt="Mercedes-Benz S-Class"
              className="fleet-hero-image"
              style={{ objectFit: "contain", transform: "scale(0.9)" }} // Adjust for the 3/4 view
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
                  <span>FIRST CLASS</span>
                </div>
                <h1 className="fleet-detail-title">
                  Mercedes-Benz S-Class – <span style={{ color: '#ce9b28' }}>Chauffeur Melbourne</span>
                </h1>
                <div className="fleet-title-underline"></div>
              </div>

              {/* Content */}
              <div className="fleet-detail-description wow fadeInUp">
                <p className="fleet-intro-text">
                  The Mercedes-Benz S-Class is the undisputed icon of automotive prestige. For decades, it has set the standard for what a luxury vehicle should be. In Melbourne, our S-Class fleet offers V.I.P. travelers a sanctuary of silence, comfort, and state-of-the-art technology. It is not just a car; it is a statement of success and refinement.
                </p>
                <p className="fleet-intro-text">
                  Step into a cabin crafted from the finest materials, complete with reclining rear seats, ambient lighting, and world-class suspension that glides over the road. Whether for high-stakes business meetings, red-carpet events, or simply the most comfortable airport transfer imaginable, the S-Class delivers an experience beyond compare.
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
                        <strong>Ultimate First Class Luxury</strong>
                        <span>The finest chauffeur vehicle available, featuring unparalleled rear-seat comfort.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Executive Privacy</strong>
                        <span>A whisper-quiet cabin with privacy shades, perfect for confidential discussions.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Immaculate Presentation</strong>
                        <span>Detailed to perfection and driven by our most elite chauffeurs.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Advanced Climate Control</strong>
                        <span>Individual climate zones ensuring perfect temperature for every passenger.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Get Free Quote Button */}
                <div className="fleet-cta-wrapper">
                  <a className="fleet-book-btn" href="/get-quote">
                    <span>Book S-Class Now</span>
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
                Features of Our <span style={{ color: '#ce9b28' }}>S-Class</span>
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
                  <h5 className="feature-card-title">Unrivaled Safety</h5>
                  <p className="feature-card-description">
                    The S-Class pioneers safety technology. From active driver assistance to the reinforced safety cell, you are in the safest hands possible.
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
                      alt="Pricing"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">All-Inclusive Luxury</h5>
                  <p className="feature-card-description">
                    Premium bottled water, mints, and newspapers are standard. We ensure every detail of your journey is catered for.
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
                  <h5 className="feature-card-title">Reclining Comfort</h5>
                  <p className="feature-card-description">
                    Enjoy the "Chauffeur Package" with extra legroom and reclining rear seats that allow you to rest or work in complete comfort.
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
                      alt="Technology"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">First Class Cabin</h5>
                  <p className="feature-card-description">
                    Surrounded by hand-crafted leather and wood, the interior ambiance of the S-Class is unmatched in the industry.
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
                  <h5 className="feature-card-title">Elite Chauffeurs</h5>
                  <p className="feature-card-description">
                    Our S-Class drivers are our most senior professionals, trained to provide a discreet, white-glove service for VIPs.
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
                      alt="Smoothness"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Magic Body Control</h5>
                  <p className="feature-card-description">
                    Experience the "Magic Carpet Ride." The S-Class suspension scans the road ahead to smooth out bumps before you even feel them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Dynamic FAQ Section */}
        <Faq items={faqsFleet} />
      </main>
      <Footer1 />
      <style jsx global>{`
        /* Hero Section */
        .fleet-detail-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #fcfcfc; /* Light BG to blend */
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
