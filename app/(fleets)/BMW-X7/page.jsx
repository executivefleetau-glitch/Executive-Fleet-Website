"use client";

import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import BusnessClassFleet from "@/components/fleet-single/BusnessClassFleet";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { cars } from "@/data/cars";
import React, { useEffect } from "react";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";

const slideImages = [
  "/assets/imgs/page/fleet/slide1.png",
  "/assets/imgs/page/fleet/slide2.png",
  "/assets/imgs/page/fleet/slide1.png",
  "/assets/imgs/page/fleet/slide2.png",
];


export default function BMWX7page() {
  const car = cars[3]; // Get the first car directly
  useEffect(() => {
    addLeftPaddingSwiper();
  }, []);

  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn31",
      prevEl: ".snbp31",
    },
    modules: [Autoplay, Navigation],
    autoplay: {
      delay: 10000,
    },

    breakpoints: {
      1399: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 2,
      },
      670: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };
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
              src="/assets/imgs/cars/BMW X7.png"
              alt="BMW X7"
              className="fleet-hero-image"
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
                  BMW X7 – <span className="golden-text">Chauffeur Melbourne</span>
                </h1>
                <div className="fleet-title-underline"></div>
              </div>

              {/* Content */}
              <div className="fleet-detail-description wow fadeInUp">
                <p className="fleet-intro-text">
                  The BMW X7 stands at the top of luxury SUVs, offering unmatched comfort, presence, and elegance on Melbourne's roads. With Executive Fleet handling your journey, you get a chauffeur experience that feels grand from start to finish. Whether you're traveling with family, attending a corporate event, or needing extra space for a special occasion, the BMW X7 delivers a first-class ride with exceptional refinement.
                </p>
                <p className="fleet-intro-text">
                  Step inside and you're welcomed by a spacious cabin, soft leather seating, modern tech, and whisper-quiet performance. Every detail of the X7 is built around comfort, making long drives, airport transfers, and city trips feel smooth, calm, and sophisticated.
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
                        <strong>Flagship Luxury SUV Fleet</strong>
                        <span>Our BMW X7 models offer three-row seating, premium materials, and top-level comfort.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Expertly Maintained Vehicles</strong>
                        <span>Each X7 is thoroughly cleaned, inspected, and prepared before every journey.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Safe & Ultra-Comfortable Travel</strong>
                        <span>Handled by skilled chauffeurs who know Melbourne's roads and deliver a secure ride.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Extra Space & Premium Comfort</strong>
                        <span>Perfect for larger groups, families, or passengers who appreciate room to stretch out.</span>
                      </div>
                    </li>
                    <li className="fleet-offer-item">
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>
                        <strong>Polite, Professional Chauffeurs</strong>
                        <span>Friendly, punctual, and committed to providing a seamless and enjoyable experience.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Book Now Button */}
                <div className="fleet-cta-wrapper">
                  <a className="fleet-book-btn" href="/booking-vehicle">
                    <span>Book Now</span>
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
                Features of Our <span className="golden-text">BMW X7</span> Vehicles
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
                  <h5 className="feature-card-title">Top-Tier Safety Systems</h5>
                  <p className="feature-card-description">
                    The BMW X7 includes advanced safety technology for a calm, confident ride in all conditions.
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
                  <h5 className="feature-card-title">Clear, Honest Pricing</h5>
                  <p className="feature-card-description">
                    Transparent rates with no hidden fees — premium service with straightforward pricing.
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
                  <h5 className="feature-card-title">Private, Quiet Cabin</h5>
                  <p className="feature-card-description">
                    A peaceful interior with plenty of space, perfect for relaxation or productivity on the go.
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
                      alt="Performance"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">All-Terrain Capability</h5>
                  <p className="feature-card-description">
                    Smooth performance and strong road presence, ideal for any route and any weather.
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
                  <h5 className="feature-card-title">Experienced Chauffeurs</h5>
                  <p className="feature-card-description">
                    Our drivers are trained, professional, and focused on creating a luxury travel experience.
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
                      alt="Drive"
                      className="feature-icon-img"
                    />
                  </div>
                  <h5 className="feature-card-title">Powerful yet Smooth Drive</h5>
                  <p className="feature-card-description">
                    The X7 blends strength with elegance, offering a refined ride every mile of the way.
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
        }

        .fleet-hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
        }

        .fleet-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .golden-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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

          .fleet-feature-card {
            padding: 30px 20px;
          }

          .feature-icon-wrapper {
            width: 80px;
            height: 80px;
          }
        }

        @media (max-width: 575px) {
          .fleet-detail-title {
            font-size: 24px;
          }

          .fleet-features-title {
            font-size: 24px;
          }

          .fleet-detail-badge span:not(.golden-dot),
          .fleet-features-badge span:not(.golden-dot) {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}
