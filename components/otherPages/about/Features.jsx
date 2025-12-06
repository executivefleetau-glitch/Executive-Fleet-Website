"use client";
import { features7 } from "@/data/features";

export default function Features() {
  return (
    <section className="section features-content-section">
      <div className="container-sub">
        <div className="mt-60">
          <div className="features-content-badge wow fadeInUp">
            <span className="badge-dot"></span>
            <span className="badge-text">WHY CHOOSE US</span>
          </div>
          <h2 className="features-content-heading wow fadeInUp" data-wow-delay="0.1s">
            We deliver a smarter, smoother way to <span className="golden-gradient-text">travel</span> Melbourne
          </h2>
          <div className="content-wrapper wow fadeInUp" data-wow-delay="0.2s">
            <div className="text-content">
              <p className="paragraph-text">
                Experience premium chauffeur services designed for comfort, safety, and total peace of mind. From airport arrivals to private city travel, our team ensures every moment feels seamless. Your chauffeur tracks flights, arrives early, and handles every detail with precision. Luxury vehicles, trained drivers, and clear fixed pricing—your travel experience just became effortless.
              </p>
              <p className="paragraph-text">
                Every journey is planned with care, whether it's corporate travel, special occasions, or daily transfers. Our service focuses on reliability, clean vehicles, and respectful chauffeurs who know Melbourne inside and out. Sit back and enjoy a calm, comfortable ride while we handle the roads, timing, and routes for you. Your safety, comfort, and satisfaction remain our highest priorities from start to finish.
              </p>
            </div>
            <div className="features-list-wrapper">
              <ul className="features-list">
                {features7.map((elm, i) => (
                  <li key={i} className="feature-item">
                    <span className="check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="feature-text">{elm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-content-section {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          padding: 60px 0;
        }

        /* Badge Styling */
        .features-content-badge {
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

        .features-content-badge:hover {
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
        .features-content-heading {
          font-size: 44px;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          margin-bottom: 40px;
          max-width: 900px;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* Content Wrapper */
        .content-wrapper {
          background: #ffffff;
          border-radius: 12px;
          padding: 45px;
          border: 2px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .content-wrapper:hover {
          border-color: rgba(206, 155, 40, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        /* Text Content */
        .text-content {
          margin-bottom: 35px;
        }

        .paragraph-text {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4a4a;
          margin-bottom: 20px;
        }

        .paragraph-text:last-child {
          margin-bottom: 0;
        }

        /* Features List */
        .features-list-wrapper {
          padding-top: 35px;
          border-top: 1px solid #f0f0f0;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .check-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .feature-item:hover .check-icon {
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(206, 155, 40, 0.3);
        }

        .check-icon svg {
          stroke: #ffffff;
        }

        .feature-text {
          font-size: 16px;
          line-height: 1.6;
          color: #000000;
          font-weight: 500;
          padding-top: 5px;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .features-content-heading {
            font-size: 38px;
          }
        }

        @media (max-width: 991px) {
          .features-content-heading {
            font-size: 34px;
          }

          .content-wrapper {
            padding: 35px;
          }

          .features-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .features-content-heading {
            font-size: 28px;
            margin-bottom: 30px;
          }

          .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .badge-dot {
            width: 8px;
            height: 8px;
          }

          .features-content-badge {
            padding: 8px 16px;
          }

          .content-wrapper {
            padding: 30px 25px;
          }

          .paragraph-text {
            font-size: 15px;
          }

          .feature-text {
            font-size: 15px;
          }

          .check-icon {
            width: 28px;
            height: 28px;
          }

          .check-icon svg {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 575px) {
          .features-content-heading {
            font-size: 24px;
          }

          .content-wrapper {
            padding: 25px 20px;
          }
        }
      `}</style>
    </section>
  );
}
