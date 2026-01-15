"use client";
import Link from "next/link";
import React from "react";

export default function Breadcumb({ service }) {
  return (
    <>
      <div className="breadcrumb-section">
        <div className="container-sub">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb-title">
              {service.title}
            </h2>
            <div className="breadcrumb-nav">
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item">
                  <Link href="/" className="breadcrumb-link">
                    <svg className="breadcrumb-home-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-separator">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/services" className="breadcrumb-link">
                    Services
                  </Link>
                </li>
                <li className="breadcrumb-separator">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </li>
                <li className="breadcrumb-item breadcrumb-current">
                  <span>{service.title}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .breadcrumb-section {
          position: relative;
          padding: 80px 0 60px;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          overflow: hidden;
        }

        .breadcrumb-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        }

        .breadcrumb-section::after {
          content: "";
          position: absolute;
          top: 0;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(232, 180, 41, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .breadcrumb-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .breadcrumb-title {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          line-height: 1.3;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .breadcrumb-nav {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: 12px;
          list-style: none;
          padding: 0;
          margin: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 50px;
          padding: 12px 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .breadcrumb-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          transition: width 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: #ffffff;
        }

        .breadcrumb-link:hover::after {
          width: 100%;
        }

        .breadcrumb-home-icon {
          width: 16px;
          height: 16px;
        }

        .breadcrumb-separator {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.3);
        }

        .breadcrumb-current span {
          color: #e8b429;
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .breadcrumb-section {
            padding: 60px 0 50px;
          }

          .breadcrumb-title {
            font-size: 38px;
          }

          .breadcrumb-list {
            padding: 10px 20px;
            gap: 10px;
          }

          .breadcrumb-link,
          .breadcrumb-current span {
            font-size: 13px;
          }
        }

        @media (max-width: 767px) {
          .breadcrumb-section {
            padding: 50px 0 40px;
          }

          .breadcrumb-title {
            font-size: 32px;
            margin-bottom: 16px;
          }

          .breadcrumb-list {
            padding: 8px 16px;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .breadcrumb-link,
          .breadcrumb-current span {
            font-size: 12px;
          }

          .breadcrumb-home-icon {
            width: 14px;
            height: 14px;
          }

          .breadcrumb-separator svg {
            width: 6px;
            height: 10px;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb-title {
            font-size: 26px;
          }

          .breadcrumb-list {
            padding: 6px 12px;
          }
        }
      `}</style>
    </>
  );
}
