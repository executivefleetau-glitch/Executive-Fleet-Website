"use client";
import { features5 } from "@/data/features";
import Image from "next/image";
import { useState } from "react";

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="section box-makeyourtrip-home8 py-90">
      <div className="container-sub">
        <div className="text-center mb-60">
          <h2 className="heading-44-medium wow fadeInUp mb-20">
            Why Choose Executive Fleet
          </h2>
          <p className="text-18 color-grey wow fadeInUp" data-wow-delay="0.2s">
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
                className={`feature-box wow fadeInUp ${
                  hoveredIndex === i ? "active" : ""
                }`}
                data-wow-delay={`${i * 0.1}s`}
              >
                <div className="gradient-overlay"></div>
                
                <div className="feature-icon-wrap">
                  <div className="icon-bg-shape"></div>
                  <Image 
                    width={54} 
                    height={54} 
                    src={elm.src} 
                    alt={elm.title}
                    className="feature-icon"
                  />
                </div>
                
                <h5 className="feature-heading">
                  {elm.title}
                </h5>
                
                <p className="feature-text">
                  {elm.description}
                </p>
                
                <div className="feature-bottom-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .feature-box {
          background: #ffffff;
          padding: 35px 25px;
          border-radius: 12px;
          height: 100%;
          border: 1px solid #eeeeee;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .gradient-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(to bottom, rgba(91, 18, 20, 0.96) 0%, rgba(91, 18, 20, 0.88) 100%);
          transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          border-radius: 12px;
        }

        .feature-box:hover .gradient-overlay {
          height: 100%;
        }

        .feature-box:hover {
          transform: translateY(-8px);
          border-color: #5b1214;
          box-shadow: 0 15px 35px rgba(91, 18, 20, 0.15);
        }

        .feature-icon-wrap {
          width: 75px;
          height: 75px;
          position: relative;
          margin-bottom: 25px;
          z-index: 2;
        }

        .icon-bg-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #5b1214 0%, #7a1a1d 100%);
          opacity: 0.08;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-box:hover .icon-bg-shape {
          opacity: 0.2;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
          transform: rotate(10deg) scale(1.1);
        }

        .feature-icon {
          position: relative;
          display: block;
          margin: auto;
          padding-top: 11px;
          filter: brightness(0) saturate(100%) invert(10%) sepia(62%) saturate(3290%) hue-rotate(346deg) brightness(92%) contrast(99%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-box:hover .feature-icon {
          transform: scale(1.1) rotate(-5deg);
          filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
        }

        .feature-heading {
          font-size: 20px;
          font-weight: 700;
          color: #181a1f;
          margin-bottom: 15px;
          line-height: 1.3;
          transition: color 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .feature-box:hover .feature-heading {
          color: #ffffff;
        }

        .feature-text {
          font-size: 15px;
          line-height: 1.7;
          color: #626262;
          margin-bottom: 0;
          transition: color 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .feature-box:hover .feature-text {
          color: rgba(255, 255, 255, 0.95);
        }

        .feature-bottom-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #5b1214 0%, #7a1a1d 100%);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-box:hover .feature-bottom-line {
          width: 100%;
        }

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

        .mb-20 {
          margin-bottom: 20px;
        }

        @media (max-width: 991px) {
          .feature-box {
            padding: 30px 20px;
          }
          
          .feature-icon-wrap {
            width: 70px;
            height: 70px;
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

          .feature-box {
            padding: 30px 20px;
          }

          .feature-box:hover {
            transform: translateY(-4px);
          }

          .feature-heading {
            font-size: 19px;
          }

          .feature-text {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
