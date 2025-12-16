"use client";
import { features } from "@/data/features";
import Image from "next/image";

export default function Features() {
  return (
    <>
      <section className="features-section section mt-110">
        <div className="container-sub">
          {/* Badge-style heading */}
          <div className="text-center mb-50">
            <div className="features-subtitle wow fadeInUp">
              <span className="golden-dot"></span>
              <span>YOUR COMFORT MATTERS</span>
            </div>
            <h2 className="features-main-heading wow fadeInUp">
              Travel Comfort Built Around <span style={{ color: '#ce9b28' }}>Your Lifestyle</span>
            </h2>
            <div className="heading-underline wow fadeInUp"></div>
          </div>

          {/* Feature Cards */}
          <div className="row mt-50">
            {features.map((elm, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-30">
                <div className="feature-card wow fadeInUp" data-wow-delay={`${i * 0.1}s`}>
                  <div className="feature-card-inner">
                    {/* Top border animation */}
                    <div className="feature-card-border-top"></div>
                    
                    {/* Icon container */}
                    <div className="feature-icon-container">
                      <div className="feature-icon-wrapper">
                        <Image width={48} height={48} src={elm.icon} alt="luxride" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="feature-content">
                      <h5 className="feature-title">{elm.title}</h5>
                      <p className="feature-description">{elm.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .features-section {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          padding: 80px 0;
          position: relative;
        }

        /* Badge-style subtitle */
        .features-subtitle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ce9b28;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .golden-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-radius: 50%;
          display: inline-block;
        }

        /* Main heading */
        .features-main-heading {
          font-size: 44px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .golden-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .heading-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Feature Card */
        .feature-card {
          height: 100%;
          cursor: pointer;
        }

        .feature-card-inner {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 30px;
          text-align: center;
          border: 1px solid #e5e5e5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top border animation */
        .feature-card-border-top {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover .feature-card-border-top {
          left: 0;
        }

        /* Icon container */
        .feature-icon-container {
          margin-bottom: 25px;
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
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .feature-icon-wrapper img {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.3);
        }

        /* Hover effects */
        .feature-card:hover .feature-card-inner {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .feature-card:hover .feature-icon-wrapper {
          background: #000000;
          border-color: #ce9b28;
          transform: scale(1.05);
        }

        .feature-card:hover .feature-icon-wrapper img {
          filter: brightness(0) saturate(100%) invert(66%) sepia(82%) saturate(426%) hue-rotate(3deg) brightness(98%) contrast(91%);
        }

        /* Content */
        .feature-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .feature-title {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .feature-card:hover .feature-title {
          color: #ce9b28;
        }

        .feature-description {
          font-size: 15px;
          line-height: 1.7;
          color: #666666;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .features-main-heading {
            font-size: 36px;
          }

          .feature-card-inner {
            padding: 35px 25px;
          }
        }

        @media (max-width: 767px) {
          .features-section {
            padding: 60px 0;
          }

          .features-main-heading {
            font-size: 28px;
          }

          .feature-card-inner {
            padding: 30px 20px;
          }

          .feature-icon-wrapper {
            width: 80px;
            height: 80px;
          }

          .feature-icon-wrapper img {
            width: 42px;
            height: 42px;
          }

          .feature-title {
            font-size: 20px;
          }

          .feature-description {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
