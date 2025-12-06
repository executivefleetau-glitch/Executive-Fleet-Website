"use client";
import { features5 } from "@/data/features";
import Image from "next/image";

export default function Features2() {
  return (
    <section className="section mt-90 features2-section">
      <div className="container-sub">
        <div className="features2-wrapper">
          <div className="features2-header wow fadeInUp">
            <div className="features2-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">YOUR JOURNEY</span>
            </div>
            <h3 className="features2-heading wow fadeInUp" data-wow-delay="0.1s">
              Make Your Trip Your Way <span className="golden-gradient-text">With Us</span>
            </h3>
          </div>
          
          <div className="features2-grid">
            {features5.map((elm, i) => (
              <div key={i} className="feature2-card wow fadeInUp" data-wow-delay={`${i * 0.1}s`}>
                <div className="feature2-card-inner">
                  <div className="feature2-icon-wrapper">
                    <div className="icon-circle-bg"></div>
                    <Image width={56} height={56} src={elm.src} alt="luxride" className="feature2-icon" />
                  </div>
                  <div className="feature2-content">
                    <h6 className="feature2-title">{elm.title}</h6>
                    <p className="feature2-description">{elm.description}</p>
                  </div>
                  <div className="feature2-border-accent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .features2-section {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          padding: 90px 0;
          position: relative;
        }

        .features2-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header Section */
        .features2-header {
          text-align: center;
          margin-bottom: 60px;
        }

        /* Badge Styling */
        .features2-badge {
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

        .features2-badge:hover {
          border-color: rgba(206, 155, 40, 0.4);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.1);
        }

        .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
        }

        .badge-text {
          color: #000000;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Main Heading */
        .features2-heading {
          font-size: 44px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin: 0;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* Features Grid */
        .features2-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        /* Feature Card */
        .feature2-card {
          height: 100%;
        }

        .feature2-card-inner {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px 30px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 2px solid #f0f0f0;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .feature2-card-inner:hover {
          transform: translateY(-8px);
          border-color: rgba(206, 155, 40, 0.3);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        /* Golden Accent Border */
        .feature2-border-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          transition: width 0.5s ease;
          z-index: 3;
          border-radius: 12px 0 0 0;
        }

        .feature2-card-inner:hover .feature2-border-accent {
          width: 100%;
        }

        /* Icon Wrapper */
        .feature2-icon-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle-bg {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          border: 2px solid #e8e8e8;
          transition: all 0.4s ease;
        }

        .feature2-card-inner:hover .icon-circle-bg {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border-color: rgba(206, 155, 40, 0.4);
          transform: scale(1.1);
        }

        .feature2-icon {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .feature2-card-inner:hover .feature2-icon {
          transform: scale(1.1);
          filter: brightness(10);
        }

        /* Content */
        .feature2-content {
          flex: 1;
        }

        .feature2-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .feature2-card-inner:hover .feature2-title {
          color: #ce9b28;
        }

        .feature2-description {
          font-size: 15px;
          line-height: 1.7;
          color: #666666;
          margin: 0;
          transition: color 0.3s ease;
        }

        .feature2-card-inner:hover .feature2-description {
          color: #4a4a4a;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .features2-heading {
            font-size: 38px;
          }
        }

        @media (max-width: 991px) {
          .features2-heading {
            font-size: 34px;
          }

          .features2-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }

          .feature2-card-inner {
            padding: 35px 25px;
          }
        }

        @media (max-width: 767px) {
          .features2-heading {
            font-size: 28px;
          }

          .features2-header {
            margin-bottom: 40px;
          }

          .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .badge-dot {
            width: 8px;
            height: 8px;
          }

          .features2-badge {
            padding: 8px 16px;
          }

          .features2-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .feature2-card-inner {
            padding: 30px 25px;
          }

          .feature2-icon-wrapper {
            width: 75px;
            height: 75px;
            margin-bottom: 20px;
          }

          .icon-circle-bg {
            width: 75px;
            height: 75px;
          }

          .feature2-icon {
            width: 48px !important;
            height: 48px !important;
          }

          .feature2-title {
            font-size: 18px;
          }

          .feature2-description {
            font-size: 14px;
          }
        }

        @media (max-width: 575px) {
          .features2-heading {
            font-size: 24px;
          }

          .features2-section {
            padding: 60px 0;
          }
        }
      `}</style>
    </section>
  );
}
