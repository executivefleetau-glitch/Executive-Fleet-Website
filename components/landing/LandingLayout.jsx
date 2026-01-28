"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SocialProofToast from "@/components/common/SocialProofToast";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function LandingLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Landing Header - Simplified & Branded */}
      <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="landing-container">
          <Link href="/" className="landing-logo">
            <Image
              src="/assets/imgs/logo/EF Logo-05.png"
              alt="Executive Fleet Chauffeur Services Melbourne"
              width={200}
              height={50}
              priority
              style={{ height: '45px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <div className="landing-header-right">
            <a href="tel:+61431951996" className="landing-phone">
              <svg className="phone-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="phone-text">
                <span className="phone-label">Call Now</span>
                <span className="phone-number">+61 431 951 996</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        {children}
      </main>

      {/* Premium Footer - Google Ads Compliant */}
      <footer className="landing-footer">
        <div className="footer-gold-line"></div>
        <div className="landing-container">
          <div className="footer-content">
            <div className="footer-brand">
              <Image
                src="/assets/imgs/logo/EF Logo-05.png"
                alt="Executive Fleet"
                width={180}
                height={45}
                style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
              <p className="footer-tagline">Melbourne's Premier Luxury Chauffeur Service</p>
              <p className="footer-address">
                9 Carol Grove, Tullamarine VIC 3043<br />
                ABN: Executive Fleet Chauffeurs
              </p>
            </div>
            <div className="footer-links">
              <Link href="/terms-and-conditions/">Terms & Conditions</Link>
              <span className="footer-divider">|</span>
              <Link href="/privacy-policy/">Privacy Policy</Link>
              <span className="footer-divider">|</span>
              <Link href="/legal-notice/">Legal Notice</Link>
              <span className="footer-divider">|</span>
              <Link href="/contact/">Contact Us</Link>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Executive Fleet Chauffeurs Melbourne. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Social Proof Toast */}
      <SocialProofToast />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      <style jsx global>{`
        /* ===== LANDING PAGE BASE STYLES ===== */
        .landing-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .landing-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ===== HEADER STYLES ===== */
        .landing-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(206, 155, 40, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .landing-header.scrolled {
          background: rgba(0, 0, 0, 0.98);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          border-bottom-color: rgba(206, 155, 40, 0.3);
        }

        .landing-header .landing-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
        }

        .landing-logo {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .landing-logo:hover {
          transform: scale(1.02);
        }

        .landing-phone {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          padding: 12px 24px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #ce9b28 100%);
          background-size: 200% 200%;
          border-radius: 50px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(206, 155, 40, 0.3);
        }

        .landing-phone:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(206, 155, 40, 0.5);
          background-position: 100% 100%;
        }

        .phone-svg-icon {
          width: 20px;
          height: 20px;
          stroke: #000;
        }

        .phone-text {
          display: flex;
          flex-direction: column;
        }

        .phone-label {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.7);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .phone-number {
          font-size: 15px;
          font-weight: 700;
          color: #000;
          letter-spacing: 0.5px;
        }

        /* ===== MAIN CONTENT ===== */
        .landing-main {
          flex: 1;
          padding-top: 80px;
        }

        /* ===== FOOTER STYLES ===== */
        .landing-footer {
          background: linear-gradient(180deg, #0a0a0a 0%, #000 100%);
          padding: 50px 0 30px;
          position: relative;
        }

        .footer-gold-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #ce9b28 20%, #E8B429 50%, #ce9b28 80%, transparent 100%);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 28px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .footer-tagline {
          font-size: 14px;
          color: #ce9b28;
          font-weight: 500;
          letter-spacing: 1px;
          margin: 8px 0 0;
        }

        .footer-address {
          font-size: 13px;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .footer-links a {
          color: #888;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 4px 0;
        }

        .footer-links a:hover {
          color: #ce9b28;
        }

        .footer-divider {
          color: #333;
          font-size: 12px;
        }

        .footer-copyright {
          font-size: 12px;
          color: #555;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .landing-header .landing-container {
            padding: 12px 16px;
          }

          .landing-logo img {
            height: 35px !important;
          }

          .landing-phone {
            padding: 10px 16px;
            gap: 8px;
          }

          .phone-label {
            display: none;
          }

          .phone-number {
            font-size: 13px;
          }

          .landing-main {
            padding-top: 70px;
          }

          .footer-links {
            gap: 8px;
          }

          .footer-divider {
            display: none;
          }

          .footer-links a {
            font-size: 12px;
            padding: 6px 12px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
