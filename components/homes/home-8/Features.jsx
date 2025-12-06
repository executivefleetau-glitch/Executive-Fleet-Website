"use client";
import { features5 } from "@/data/features";
import Image from "next/image";
import { useState } from "react";

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="section box-features-elegant py-90">
      <div className="container-sub">
        <div className="text-center mb-60">
          <div className="features-badge wow fadeInUp">
            <span className="badge-dot"></span>
            <span className="badge-text">WHY CHOOSE US</span>
          </div>
          <h2 className="features-main-heading wow fadeInUp" data-wow-delay="0.1s">
            Why Choose <span className="golden-gradient-text">Executive Fleet</span>
          </h2>
          <p className="features-subtitle wow fadeInUp" data-wow-delay="0.2s">
            Experience premium chauffeur service with unmatched professionalism
          </p>
        </div>
        <div className="row">
          {features5.map((elm, i) => (
            <div 
              key={i} 
              className="col-lg-4 col-md-6 col-sm-6 mb-30"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`feature-card wow fadeInUp ${
                  hoveredIndex === i ? "active" : ""
                }`}
                data-wow-delay={`${i * 0.1}s`}
              >
                <div className="card-glow"></div>
                <div className="card-border"></div>
                
                <div className="feature-icon-container">
                  <div className="icon-circle">
                    <div className="icon-pulse"></div>
                    <Image 
                      width={60} 
                      height={60} 
                      src={elm.src} 
                      alt={elm.title}
                      className="feature-icon"
                    />
                  </div>
                </div>
                
                <h3 className="feature-title">
                  {elm.title}
                </h3>
                
                <p className="feature-description">
                  {elm.description}
                </p>
                
                <div className="feature-accent-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .box-features-elegant {
          background: #000000;
          position: relative;
        }

        /* Badge Styling - Matching Other Sections */
        .features-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(206, 155, 40, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .features-badge:hover {
          border-color: rgba(206, 155, 40, 0.6);
          background: rgba(206, 155, 40, 0.1);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
        }

        .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(206, 155, 40, 0.5);
        }

        .badge-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Main Heading */
        .features-main-heading {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        .features-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Feature Card */
        .feature-card {
          background: #ffffff;
          padding: 45px 35px;
          border-radius: 16px;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          border: 2px solid #f0f0f0;
        }

        /* Card Border Animation */
        .card-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          border: 2px solid transparent;
          transition: all 0.4s ease;
          pointer-events: none;
        }

        .feature-card:hover .card-border {
          border-color: rgba(206, 155, 40, 0.3);
        }

        /* Glow Effect - Simplified */
        .card-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(206, 155, 40, 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .feature-card:hover .card-glow {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(206, 155, 40, 0.15);
          border-color: rgba(206, 155, 40, 0.2);
        }

        /* Icon Container */
        .feature-icon-container {
          margin-bottom: 30px;
          position: relative;
          z-index: 2;
        }

        .icon-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border: 2px solid rgba(206, 155, 40, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.4s ease;
          margin: 0 auto;
        }

        .feature-card:hover .icon-circle {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-color: rgba(206, 155, 40, 0.4);
          transform: scale(1.05);
        }

        /* Icon Pulse Ripple Animation */
        .icon-pulse {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          border: 2px solid rgba(206, 155, 40, 0.4);
          opacity: 0;
          animation: none;
        }

        .feature-card:hover .icon-pulse {
          opacity: 1;
          animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .feature-icon {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
          filter: none;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.08);
        }

        /* Feature Title */
        .feature-title {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 18px;
          line-height: 1.3;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .feature-card:hover .feature-title {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Feature Description */
        .feature-description {
          font-size: 15px;
          line-height: 1.7;
          color: #626262;
          margin-bottom: 0;
          transition: color 0.3s ease;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .feature-card:hover .feature-description {
          color: #4a4a4a;
        }

        /* Accent Line - Keep this perfect effect */
        .feature-accent-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          transition: width 0.4s ease;
          border-radius: 4px 4px 0 0;
        }

        .feature-card:hover .feature-accent-line {
          width: 80%;
        }

        /* Spacing */
        .py-90 {
          padding-top: 90px;
          padding-bottom: 90px;
        }

        .mb-60 {
          margin-bottom: 60px;
        }

        .mb-30 {
          margin-bottom: 30px;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .features-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .features-main-heading {
            font-size: 36px;
          }

          .feature-card {
            padding: 40px 30px;
          }
          
          .icon-circle {
            width: 80px;
            height: 80px;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 767px) {
          .py-90 {
            padding-top: 60px;
            padding-bottom: 60px;
          }

          .mb-60 {
            margin-bottom: 40px;
          }

          .features-main-heading {
            font-size: 30px;
          }

          .features-subtitle {
            font-size: 14px;
          }

          .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .badge-dot {
            width: 8px;
            height: 8px;
          }

          .features-badge {
            padding: 8px 16px;
          }

          .feature-card {
            padding: 35px 25px;
          }

          .feature-card:hover {
            transform: translateY(-6px);
          }

          .feature-title {
            font-size: 20px;
          }

          .feature-description {
            font-size: 14px;
          }

          .icon-circle {
            width: 75px;
            height: 75px;
          }

          .feature-icon {
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 575px) {
          .features-main-heading {
            font-size: 26px;
          }
        }
      `}</style>
    </section>
  );
}
