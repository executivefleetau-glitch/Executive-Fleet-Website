"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, createContext, useContext } from "react";
import SocialProofToast from "@/components/common/SocialProofToast";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Create context for parallax scroll position
export const ParallaxContext = createContext({ scrollY: 0 });

export function useParallax() {
  return useContext(ParallaxContext);
}

export default function LandingLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxContext.Provider value={{ scrollY }}>
      <div className="landing-page">
        {/* Landing Header - Simplified & Branded */}
        <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="landing-container">
            <Link href="/" className="landing-logo">
              <Image
                src="/assets/imgs/logo/EF Logo-05.png"
                alt="Executive Fleet Chauffeur Services Melbourne"
                width={200}
                height={55}
                priority
                style={{ height: '55px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            <div className="landing-header-right">
              <a href="tel:+61431951996" className="landing-phone">
                <svg className="phone-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
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
          /* ===== CSS VARIABLES ===== */
          :root {
            --gold-primary: #ce9b28;
            --gold-secondary: #E8B429;
            --gold-light: #f0c850;
            --gold-gradient: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #ce9b28 100%);
            --black: #000000;
            --black-soft: #0a0a0a;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f5f5f5;
            --gray-200: #eeeeee;
            --gray-400: #bdbdbd;
            --gray-600: #757575;
            --text-dark: #1a1a1a;
            --text-muted: #666666;
          }

          /* ===== GLOBAL SVG RESET FOR LANDING PAGES ===== */
          .landing-page svg {
            max-width: 100% !important;
            width: auto;
            height: auto;
            flex-shrink: 0;
          }
          
          .landing-page .badge-stars svg {
            width: 16px !important;
            height: 16px !important;
          }
          
          .landing-page .feature-icon svg {
            width: 22px !important;
            height: 22px !important;
          }
          
          .landing-page .step-icon svg {
            width: 40px !important;
            height: 40px !important;
          }
          
          .landing-page .card-icon svg {
            width: 32px !important;
            height: 32px !important;
          }
          
          .landing-page .testimonial-stars svg {
            width: 18px !important;
            height: 18px !important;
          }
          
          .landing-page .faq-toggle svg {
            width: 16px !important;
            height: 16px !important;
          }
          
          .landing-page .cta-call-btn svg,
          .landing-page .btn-secondary svg,
          .landing-page .btn-whatsapp svg,
          .landing-page .sticky-btn svg {
            width: 20px !important;
            height: 20px !important;
          }
          
          .landing-page .step-connector svg {
            width: 100% !important;
            height: 20px !important;
          }

          .landing-page .guarantee-icon svg {
            width: 48px !important;
            height: 48px !important;
          }

          .landing-page .gallery-nav svg {
            width: 24px !important;
            height: 24px !important;
          }

          /* ===== LANDING PAGE BASE STYLES ===== */
          .landing-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: var(--white);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow-x: hidden;
          }

          .landing-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
            width: 100%;
          }

          /* ===== PARALLAX UTILITIES ===== */
          .parallax-bg {
            position: absolute;
            inset: 0;
            z-index: -1;
            will-change: transform;
          }

          .parallax-slow {
            transform: translateY(calc(var(--scroll-y, 0) * 0.3px));
          }

          .parallax-medium {
            transform: translateY(calc(var(--scroll-y, 0) * 0.5px));
          }

          /* ===== ANIMATION UTILITIES ===== */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes countUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }

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

          .landing-header-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .landing-whatsapp {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            padding: 12px 20px;
            background: #25D366;
            border-radius: 50px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .landing-whatsapp:hover {
            background: #20bd5a;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
          }

          .landing-whatsapp svg {
            width: 20px !important;
            height: 20px !important;
          }

          .landing-phone {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            padding: 12px 24px;
            background: var(--gold-gradient);
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

          /* ===== SHARED SECTION STYLES ===== */
          
          /* Section Headers */
          .section-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .section-tag {
            display: inline-block;
            padding: 10px 24px;
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.12) 0%, rgba(232, 180, 41, 0.05) 100%);
            border: 1px solid rgba(206, 155, 40, 0.25);
            border-radius: 50px;
            font-size: 12px;
            font-weight: 700;
            color: var(--gold-primary);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }

          .section-header h2 {
            font-size: 42px;
            font-weight: 800;
            color: var(--text-dark);
            margin: 0;
            line-height: 1.2;
          }

          .section-header.light h2 {
            color: #fff;
          }

          .section-header.light .section-tag {
            background: rgba(206, 155, 40, 0.15);
            border-color: rgba(206, 155, 40, 0.3);
          }

          .section-header p {
            font-size: 18px;
            color: var(--text-muted);
            margin: 16px auto 0;
            max-width: 600px;
            line-height: 1.7;
          }

          .section-header.light p {
            color: rgba(255, 255, 255, 0.7);
          }

          /* Trust Badge */
          .trust-badge {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 12px 24px;
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(206, 155, 40, 0.05) 100%);
            border: 1px solid rgba(206, 155, 40, 0.3);
            border-radius: 50px;
            margin-bottom: 32px;
            backdrop-filter: blur(10px);
          }

          .badge-stars {
            display: flex;
            gap: 3px;
          }

          .badge-stars svg {
            width: 16px;
            height: 16px;
            color: var(--gold-primary);
            filter: drop-shadow(0 0 4px rgba(206, 155, 40, 0.5));
          }

          .badge-text {
            font-size: 13px;
            font-weight: 600;
            color: var(--gold-primary);
            letter-spacing: 0.5px;
          }

          /* Hero Title */
          .hero-title {
            font-size: 60px;
            font-weight: 800;
            color: #fff;
            line-height: 1.05;
            margin: 0 0 24px;
            letter-spacing: -1px;
          }

          .title-highlight {
            display: block;
            background: var(--gold-gradient);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 4s ease-in-out infinite;
          }

          /* Buttons */
          .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 18px 40px;
            background: var(--black);
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          }

          .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 18px 32px;
            background: transparent;
            color: var(--black);
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            border: 2px solid var(--black);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .btn-secondary:hover {
            background: var(--black);
            color: #fff;
          }

          .btn-whatsapp {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 18px 32px;
            background: #25D366;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            border: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .btn-whatsapp:hover {
            background: #20bd5a;
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(37, 211, 102, 0.4);
          }

          .btn-gold {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 18px 40px;
            background: var(--gold-gradient);
            color: var(--black);
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(206, 155, 40, 0.3);
          }

          .btn-gold:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(206, 155, 40, 0.5);
          }

          /* CTA Buttons Container */
          .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
          }

          /* Why Cards */
          .why-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }

          .why-card {
            padding: 40px;
            background: var(--gray-50);
            border-radius: 24px;
            border: 1px solid var(--gray-200);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .why-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .why-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
            border-color: rgba(206, 155, 40, 0.3);
          }

          .why-card:hover::before {
            opacity: 1;
          }

          .why-card.featured {
            background: linear-gradient(135deg, #fff 0%, #fffdf5 100%);
            border-color: rgba(206, 155, 40, 0.3);
          }

          .card-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 6px 14px;
            background: var(--gold-gradient);
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            color: var(--black);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .card-icon {
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.05) 100%);
            border-radius: 20px;
            margin-bottom: 28px;
          }

          .card-icon svg {
            width: 32px;
            height: 32px;
            color: var(--gold-primary);
          }

          .why-card h3 {
            font-size: 22px;
            font-weight: 700;
            color: var(--text-dark);
            margin: 0 0 14px;
          }

          .why-card p {
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.7;
            margin: 0;
          }

          /* Stats Grid */
          .stats-grid {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 60px;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            display: block;
            font-size: 48px;
            font-weight: 800;
            background: var(--gold-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            margin-bottom: 10px;
          }

          .stat-label {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .stat-divider {
            width: 1px;
            height: 60px;
            background: linear-gradient(180deg, transparent, rgba(206, 155, 40, 0.4), transparent);
          }

          /* Testimonials */
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }

          .testimonial-card {
            padding: 36px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            transition: all 0.4s ease;
          }

          .testimonial-card:hover {
            background: rgba(206, 155, 40, 0.05);
            border-color: rgba(206, 155, 40, 0.2);
            transform: translateY(-5px);
          }

          .testimonial-stars {
            display: flex;
            gap: 4px;
            margin-bottom: 20px;
          }

          .testimonial-stars svg {
            width: 18px;
            height: 18px;
            color: var(--gold-primary);
          }

          .testimonial-quote {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.7;
            margin: 0 0 24px;
            font-style: italic;
          }

          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .author-avatar {
            width: 48px;
            height: 48px;
            background: var(--gold-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 700;
            color: var(--black);
          }

          .author-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .author-name {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }

          .author-details {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.5);
          }

          /* FAQ */
          .faq-list {
            max-width: 800px;
            margin: 0 auto;
          }

          .faq-item {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            margin-bottom: 16px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .faq-item:hover {
            border-color: rgba(206, 155, 40, 0.3);
          }

          .faq-item.open {
            background: rgba(206, 155, 40, 0.05);
            border-color: rgba(206, 155, 40, 0.3);
          }

          .faq-question {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 28px;
            gap: 20px;
          }

          .faq-question h4 {
            font-size: 17px;
            font-weight: 600;
            color: #fff;
            margin: 0;
            flex: 1;
          }

          .faq-toggle {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(206, 155, 40, 0.1);
            border-radius: 8px;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }

          .faq-toggle svg {
            width: 16px;
            height: 16px;
            color: var(--gold-primary);
            transition: transform 0.3s ease;
          }

          .faq-item.open .faq-toggle {
            background: var(--gold-primary);
          }

          .faq-item.open .faq-toggle svg {
            color: var(--black);
          }

          .faq-item.open .faq-toggle svg line:first-child {
            transform: rotate(90deg);
            transform-origin: center;
            opacity: 0;
          }

          .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
          }

          .faq-item.open .faq-answer {
            max-height: 300px;
          }

          .faq-answer p {
            padding: 0 28px 24px;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.65);
            line-height: 1.7;
            margin: 0;
          }

          /* Mobile Sticky CTA */
          .mobile-sticky-cta {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 999;
            padding: 12px 16px;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(206, 155, 40, 0.3);
            gap: 12px;
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-sticky-cta.visible {
            transform: translateY(0);
            display: flex;
          }

          .sticky-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px 20px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
            transition: all 0.3s ease;
          }

          .sticky-btn svg {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
          }

          .call-btn {
            background: transparent;
            color: #fff;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .call-btn:hover {
            border-color: #fff;
          }

          .quote-btn {
            background: var(--gold-gradient);
            color: var(--black);
            border: none;
          }

          .quote-btn:hover {
            box-shadow: 0 4px 20px rgba(206, 155, 40, 0.4);
          }

          .whatsapp-btn {
            background: #25D366;
            color: #fff;
            border: none;
          }

          .whatsapp-btn:hover {
            background: #20bd5a;
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
            color: var(--gold-primary);
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
            color: var(--gold-primary);
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
          @media (max-width: 1024px) {
            .why-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .testimonials-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .mobile-sticky-cta {
              display: flex;
            }
          }

          @media (max-width: 768px) {
            .landing-header .landing-container {
              padding: 12px 16px;
            }

            .landing-logo img {
              height: 45px !important;
            }

            .landing-whatsapp span {
              display: none;
            }

            .landing-whatsapp {
              padding: 10px;
              border-radius: 50%;
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

            .section-header h2 {
              font-size: 30px;
            }

            .hero-title {
              font-size: 42px;
            }

            .stats-grid {
              flex-wrap: wrap;
              gap: 30px;
            }

            .stat-divider {
              display: none;
            }

            .stat-item {
              flex: 0 0 45%;
            }

            .stat-number {
              font-size: 36px;
            }

            .why-grid {
              grid-template-columns: 1fr;
            }

            .testimonials-grid {
              grid-template-columns: 1fr;
            }

            .cta-buttons {
              flex-direction: column;
            }

            .btn-primary,
            .btn-secondary,
            .btn-whatsapp,
            .btn-gold {
              width: 100%;
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

          @media (max-width: 480px) {
            .hero-title {
              font-size: 34px;
            }

            .trust-badge {
              padding: 10px 16px;
              gap: 8px;
            }

            .badge-text {
              font-size: 11px;
            }
          }
        `}</style>
      </div>
    </ParallaxContext.Provider>
  );
}
