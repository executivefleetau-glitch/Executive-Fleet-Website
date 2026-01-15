"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Reviews() {
  const swiperRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      initials: "SM",
      rating: 5,
      date: "2 weeks ago",
      text: "Exceptional service from start to finish. Our chauffeur was punctual, professional, and the BMW X7 was immaculate. Used them for our wedding and couldn't be happier.",
      service: "Wedding Transport",
    },
    {
      id: 2,
      name: "David Thompson",
      initials: "DT",
      rating: 5,
      date: "3 weeks ago",
      text: "Reliable airport transfer service. Flight was delayed by 2 hours but the driver waited without any extra charge. Professional service and luxury vehicle.",
      service: "Airport Transfer",
    },
    {
      id: 3,
      name: "Emma Richardson",
      initials: "ER",
      rating: 5,
      date: "1 month ago",
      text: "Best chauffeur service in Melbourne! The Mercedes GLS was spotless and the driver was incredibly courteous. Perfect for our family trip.",
      service: "Family Travel",
    },
    {
      id: 4,
      name: "Michael Chen",
      initials: "MC",
      rating: 5,
      date: "1 month ago",
      text: "Outstanding corporate service. Always on time, pristine vehicles, and professional drivers. They set the standard for luxury chauffeur service in Melbourne.",
      service: "Corporate Travel",
    },
    {
      id: 5,
      name: "Jessica Harper",
      initials: "JH",
      rating: 5,
      date: "2 months ago",
      text: "Incredible attention to detail. Used them for a special event and they exceeded all expectations. The BMW i5 was stunning and the service was world-class.",
      service: "Special Event",
    },
    {
      id: 6,
      name: "Robert Williams",
      initials: "RW",
      rating: 5,
      date: "2 months ago",
      text: "Professional and luxurious. Perfect for our Melbourne wedding. The chauffeur was impeccably dressed and made our day even more special.",
      service: "Wedding Transport",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="review-stars">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={index < rating ? "#FBBC04" : "#E0E0E0"}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="section pt-80 pb-80 bg-reviews">
      <div className="container-sub">
        <div className="reviews-header-section mb-60 wow fadeInUp">
          <div className="reviews-header-content">
            <div className="reviews-badge wow fadeInUp">
              <span className="badge-dot"></span>
              <span className="badge-text">CLIENT REVIEWS</span>
            </div>
            <h2 className="reviews-main-heading wow fadeInUp" data-wow-delay="0.1s">
              What Our <span className="" style={{ color: "#ce9b28 " }}>Clients</span> Say
            </h2>
            <p className="reviews-subtitle">Trusted by Melbourne's finest</p>
          </div>
          <div className="google-badge">
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <div className="google-rating">
              <div className="google-score">5.0</div>
              <div className="google-stars">
                {[...Array(5)].map((_, index) => (
                  <svg key={index} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC04">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-slider-container wow fadeInUp">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            navigation={{
              prevEl: ".review-button-prev",
              nextEl: ".review-button-next",
            }}
            pagination={{
              el: ".review-pagination",
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-card">
                  <div className="review-card-inner">
                    <div className="review-header-section">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{review.initials}</div>
                        <div className="reviewer-details">
                          <div className="reviewer-name">{review.name}</div>
                          <div className="review-service">{review.service}</div>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <div className="review-content">
                      <p className="review-text">{review.text}</p>
                    </div>

                    <div className="review-footer">
                      <div className="review-date">{review.date}</div>
                    </div>

                    <div className="card-hover-overlay"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="review-navigation">
            <button className="review-button-prev" aria-label="Previous review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="review-button-next" aria-label="Next review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Pagination */}
          <div className="review-pagination"></div>
        </div>
      </div>

      <style jsx global>{`
        .bg-reviews {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          position: relative;
        }

        /* Reviews Badge - Consistent Style */
        .reviews-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid rgba(206, 155, 40, 0.2);
          padding: 10px 20px;
          border-radius: 50px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .reviews-badge:hover {
          border-color: rgba(206, 155, 40, 0.4);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.1);
        }

        .reviews-badge .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
        }

        .reviews-badge .badge-text {
          color: #000000;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .reviews-header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .reviews-header-content {
          text-align: left;
        }

        .reviews-main-heading {
          font-size: 48px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #ce9b28  0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        .reviews-subtitle {
          font-size: 16px;
          color: #626262;
          margin: 0;
        }

        .google-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: #ffffff;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .google-rating {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .google-score {
          font-size: 20px;
          font-weight: 700;
          color: #181a1f;
          line-height: 1;
        }

        .google-stars {
          display: flex;
          gap: 2px;
        }

        .reviews-slider-container {
          position: relative;
          padding: 0 50px;
        }

        .reviews-swiper {
          padding-bottom: 50px;
        }

        .review-card {
          height: 380px;
          padding: 0;
          background: transparent;
          transition: all 0.5s ease;
        }

        .review-card:hover {
          transform: translateY(-3px);
        }

        .review-card-inner {
          background: #ffffff;
          border-radius: 0;
          padding: 30px 28px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          border: 1px solid #e5e5e5;
          border-left: 3px solid #000000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.5s ease;
        }

        .review-card:hover .review-card-inner {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .card-hover-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.02) 80%, transparent 100%);
          transition: height 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
          pointer-events: none;
        }

        .review-card:hover .card-hover-overlay {
          height: 100%;
        }

        .review-header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .review-content {
          flex: 1;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .review-stars {
          display: flex;
          gap: 3px;
        }

        .review-text {
          font-size: 15px;
          line-height: 1.7;
          color: #3a3a3a;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .review-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 15px;
          border-top: 1px solid #f0f0f0;
          position: relative;
          z-index: 1;
        }

        .reviewer-info {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .reviewer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .reviewer-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .reviewer-name {
          font-size: 15px;
          font-weight: 700;
          color: #181a1f;
        }

        .review-service {
          font-size: 12px;
          color: #000000;
          font-weight: 500;
        }

        .review-date {
          font-size: 12px;
          color: #999;
        }

        .reviews-slider-container .review-navigation {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }

        .reviews-slider-container .review-button-prev,
        .reviews-slider-container .review-button-next {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #e8e8e8;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: all;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .reviews-slider-container .review-button-prev:hover,
        .reviews-slider-container .review-button-next:hover {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .reviews-slider-container .review-button-prev.swiper-button-disabled,
        .reviews-slider-container .review-button-next.swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Hide default Swiper navigation buttons in other components */
        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }

        /* Only show navigation in reviews slider */
        .reviews-slider-container .swiper-button-prev,
        .reviews-slider-container .swiper-button-next {
          display: none !important;
        }

        .review-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }

        .review-pagination :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: #d0d0d0;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .review-pagination :global(.swiper-pagination-bullet-active) {
          background: #000000;
          width: 30px;
          border-radius: 5px;
        }

        .pt-80 {
          padding-top: 80px;
        }

        .pb-80 {
          padding-bottom: 80px;
        }

        .mb-60 {
          margin-bottom: 60px;
        }

        @media (max-width: 1024px) {
          .reviews-slider-container {
            padding: 0 45px;
          }
        }

        @media (max-width: 991px) {
          .reviews-main-title {
            font-size: 36px;
          }

          .reviews-slider-container {
            padding: 0 40px;
          }

          .review-button-prev,
          .review-button-next {
            width: 42px;
            height: 42px;
          }

          .pt-80 {
            padding-top: 60px;
          }

          .pb-80 {
            padding-bottom: 60px;
          }
        }

        @media (max-width: 767px) {
          .reviews-main-title {
            font-size: 30px;
          }

          .reviews-header-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .reviews-slider-container {
            padding: 0 35px;
          }

          .review-card {
            height: 360px;
          }

          .review-card-inner {
            padding: 25px 22px;
          }

          .review-button-prev,
          .review-button-next {
            width: 38px;
            height: 38px;
          }

          .review-button-prev svg,
          .review-button-next svg {
            width: 18px;
            height: 18px;
          }

          .review-header-section {
            flex-direction: column;
            gap: 12px;
          }

          .reviewer-avatar {
            width: 40px;
            height: 40px;
            font-size: 13px;
          }

          .reviewer-name {
            font-size: 14px;
          }

          .review-service {
            font-size: 11px;
          }

          .review-text {
            font-size: 14px;
            -webkit-line-clamp: 7;
          }

          .pt-80 {
            padding-top: 50px;
          }

          .pb-80 {
            padding-bottom: 50px;
          }

          .mb-60 {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
}

