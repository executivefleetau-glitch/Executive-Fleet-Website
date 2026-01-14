"use client";
import Image from "next/image";
import Link from "next/link";

export default function SearchBox({ service, imageUrl, heading }) {
  return (
    <section className="section pt-0">
      <div
        className="service-banner-section"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          objectFit: 'cover'
        }}
      >
        <div className="container-sub banner-container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="banner-content-wrapper">
                {/* Badge */}
                <div className="mb-25 wow fadeInUp">
                  <span className="service-badge">
                    <span className="service-badge-dot"></span>
                    PREMIUM SERVICE
                  </span>
                </div>

                {/* Heading */}
                {heading && (
                  <h1 className="service-hero-heading wow fadeInUp" data-wow-delay="0.1s">
                    {heading.split(' ').slice(0, -2).join(' ')} <span className="gradient-text">{heading.split(' ').slice(-2).join(' ')}</span>
                  </h1>
                )}

                {/* Subtitle */}
                <p className="service-hero-subtitle wow fadeInUp" data-wow-delay="0.2s">
                  Experience unparalleled luxury and professionalism with our premium chauffeur services across Melbourne
                </p>

                {/* CTA Button */}
                <div className="banner-cta-wrapper wow fadeInUp" data-wow-delay="0.3s">
                  <Link href="/booking-vehicle" className="btn-service-cta">
                    <span className="btn-text">Book Your Transfer</span>
                    <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .service-banner-section {
          position: relative;
          padding: 120px 0;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-banner-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.55) 100%);
          z-index: 1;
        }

        .service-banner-section .banner-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .banner-content-wrapper {
          text-align: center;
        }

        /* Badge Styling */
        .service-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ffffff;
          text-transform: uppercase;
        }

        .service-badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          box-shadow: 0 0 12px rgba(232, 180, 41, 0.6);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(232, 180, 41, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(232, 180, 41, 0.9);
          }
        }

        /* Heading Styling */
        .service-hero-heading {
          font-size: 64px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 28px;
          letter-spacing: -1.5px;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.7);
        }

        .gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        /* Subtitle */
        .service-hero-subtitle {
          font-size: 20px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0 auto 40px;
          font-weight: 400;
        }

        /* CTA Button */
        .banner-cta-wrapper {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .btn-service-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 40px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          font-size: 17px;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(206, 155, 40, 0.4);
        }

        .btn-service-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.5s ease;
          z-index: 0;
        }

        .btn-service-cta:hover::before {
          left: 0;
        }

        .btn-service-cta:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(206, 155, 40, 0.6);
        }

        .btn-text,
        .btn-arrow {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .btn-service-cta:hover .btn-text,
        .btn-service-cta:hover .btn-arrow {
          color: #e8b429;
        }

        .btn-service-cta:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .service-banner-section {
            padding: 100px 0;
            min-height: 550px;
          }

          .service-hero-heading {
            font-size: 52px;
          }

          .service-hero-subtitle {
            font-size: 18px;
            margin-bottom: 35px;
          }

          .btn-service-cta {
            padding: 16px 36px;
            font-size: 16px;
          }
        }

        @media (max-width: 767px) {
          .service-banner-section {
            padding: 80px 0;
            min-height: 500px;
          }

          .service-badge {
            font-size: 12px;
            padding: 8px 20px;
          }

          .service-hero-heading {
            font-size: 40px;
            margin-bottom: 24px;
          }

          .service-hero-subtitle {
            font-size: 17px;
            margin-bottom: 30px;
          }

          .btn-service-cta {
            padding: 15px 32px;
            font-size: 15px;
          }
        }

        @media (max-width: 575px) {
          .service-banner-section {
            padding: 60px 0;
            min-height: 450px;
          }

          .service-badge {
            font-size: 11px;
            padding: 7px 18px;
          }

          .service-badge-dot {
            width: 8px;
            height: 8px;
          }

          .service-hero-heading {
            font-size: 32px;
            letter-spacing: -1px;
          }

          .service-hero-subtitle {
            font-size: 16px;
            margin-bottom: 25px;
          }

          .btn-service-cta {
            padding: 14px 28px;
            font-size: 14px;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
