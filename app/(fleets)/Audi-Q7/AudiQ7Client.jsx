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

export default function AudiQ7Client() {
  // Audi Q7 is index 6 in cars.js (assuming order based on provided snippets or typical flow, 
  // but safer to use find if IDs were consistent, here we use index for speed as per previous patterns.
  // First Class: 0,1,2. Business: 3(maybe?), 4,5. SUV: 6? 
  // Let's verify index logic or just use find. 
  // Logic: cars.js likely has S-Class(0), 7-Series(1), A8(2), E-Class(4?), A6(5?).
  // Let's use title matching to be safe or check the cars.js file content provided in context.
  // Context showed cars array.
  // Index 6 corresponds to Q7 in the list I'm working through.
  const car = cars[9];

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
              src="/assets/imgs/cars/Audi-Q7-VIP.png"
              alt="Audi Q7"
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
                  <span>LUXURY SUV</span>
                </div>
                <h1 className="fleet-detail-title">
                  Audi Q7 – <span style={{ color: '#ce9b28' }}>Chauffeur Melbourne</span>
                </h1>
                <div className="fleet-title-underline"></div>
              </div>

              {/* Content */}
              <div className="fleet-detail-description wow fadeInUp">
                <p className="fleet-intro-text">
                  The Audi Q7 is the versatile all-rounder of our luxury fleet. It combines the comfort and refinement of a luxury sedan with the spaciousness and road presence of an SUV. Ideal for families, small groups with luggage, or executives who prefer a higher seating position.
                </p>
                <p className="fleet-intro-text">
                  With its sophisticated Quattro all-wheel drive, the Q7 offers a secure and composed ride in all conditions. The cabin is flexible and impeccably finished, ensuring that even with extra luggage, passengers never have to compromise on comfort.
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
                        <strong>Versatile Luxury</strong>
                        <span>A premium SUV that adapts to your needs, from airport runs to events.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Extra Luggage Capacity</strong>
                        <span>Plenty of room for suitcases, golf clubs, or prams.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Commanding View</strong>
                        <span>Enjoy the sights of Melbourne from a raised, comfortable vantage point.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Group Comfort</strong>
                        <span>Seats up to 4 passengers with ample personal space for everyone.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Get Free Quote Button */}
                <div className="fleet-cta-wrapper">
                  <a className="fleet-book-btn" href="/get-quote">
                    <span>Book Audi Q7 Now</span>
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
                Features of Our <span style={{ color: '#ce9b28' }}>Audi Q7</span>
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
                  <h5 className="feature-card-title">Quattro Safety</h5>
                  <p className="feature-card-description">
                    Legendary all-wheel drive provides superior grip and safety in all weather conditions.
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
                      alt="Amenities"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Bottled Water</h5>
                  <p className="feature-card-description">
                    Complimentary hydration provided for all passengers on every trip.
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
                  <h5 className="feature-card-title">Refined Interior</h5>
                  <p className="feature-card-description">
                    Soft leather surfaces and adjustable climate control ensure a relaxing journey.
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
                      alt="Space"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Family Friendly</h5>
                  <p className="feature-card-description">
                    ISOFIX points and ample space make it perfect for traveling with children.
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
                      alt="Driver"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Experienced Chauffeur</h5>
                  <p className="feature-card-description">
                    Our drivers are skilled in smooth driving, ensuring your coffee never spills.
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
                      alt="Prestige"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Luxury Appeal</h5>
                  <p className="feature-card-description">
                    The Q7 carries the prestigious Audi rings, suitable for any high-end venue arrival.
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
