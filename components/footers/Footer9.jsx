"use client";
import { legalLinks, links1, socialMediaPlatforms } from "@/data/footerLinks";
import Link from "next/link";
import Image from "next/image";

export default function Footer9() {
  return (
    <footer className="footer-custom">
      <div className="container-sub">
        <div className="footer-main">
          <div className="row">
            {/* Column 1: Logo & Contact Info */}
            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
              <div className="footer-brand">
                <Image
                  width={100}
                  height={100}
                  src="/assets/imgs/logo/EF Logo-01.png"
                  alt="Executive Fleet"
                  className="footer-logo"
                  style={{ height: "80px", width: "215px !important", objectFit: "contain", backgroundColor: 'white', padding: '10px' }}
                />
                <p className="footer-tagline">Melbourne's Premier Luxury Chauffeur Service</p>
              </div>

              <div className="footer-contact-section">
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Address</p>
                    <p className="contact-value">184 Main Collins Street<br />West Victoria 8007, Melbourne</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.353-.966-.876-1.097l-4.435-1.109a1.125 1.125 0 00-1.45.757l-.437 1.748a14.118 14.118 0 01-6.766-6.766l1.748-.437a1.125 1.125 0 00.757-1.45l-1.109-4.435a1.125 1.125 0 00-1.097-.876H6.75A2.25 2.25 0 004.5 6.75z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Phone</p>
                    <a href="tel:+41227157000" className="contact-value contact-link">+41 22 715 7000</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Email</p>
                    <a href="mailto:admin@executivefleet.com.au" className="contact-value contact-link">admin@executivefleet.com.au</a>
                  </div>
                </div>
              </div>

              <div className="footer-social">
                <p className="social-title">Follow Us</p>
                <div className="social-icons">
                  {socialMediaPlatforms.map((platform) => (
                    <a key={platform.id} href={platform.href} className="social-link" aria-label={platform.name} style={{ backgroundColor: '#ce9b28' }}>
                      <i className={platform.className}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/fleet-list">Our Fleet</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQs</Link></li>
                <li><Link href="/blog-grid">Blogs</Link></li>
                <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/legal-notice">Legal Notice</Link></li>
              </ul>
            </div>

            {/* Column 3: Map */}
            <div className="col-lg-4 col-md-12">
              <h3 className="footer-title">Find Us</h3>
              <div className="footer-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.7894536611824!2d144.9548!3d-37.8172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a4f295%3A0x5045675218ce6e0!2s184%20Collins%20St%2C%20Melbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="footer-map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">© {new Date().getFullYear()} Executive Fleet Melbourne. All Rights Reserved.</p>
        </div>
      </div>

      <style jsx global>{`
        .footer-custom {
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
          color: #ffffff;
          position: relative;
        }

        .footer-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        }

        .footer-main {
          padding: 70px 0 50px;
        }

        /* Logo & Brand Section */
        .footer-brand {
          margin-bottom: 35px;
        }

        .footer-logo {
          width: 90px !important;
          height: auto !important;
          margin-bottom: 15px;
        }

        .footer-tagline {
          color: #c0c0c0;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          font-weight: 400;
        }

        /* Contact Section */
        .footer-contact-section {
          margin-bottom: 35px;
        }

        .contact-item {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          align-items: flex-start;
        }

        .contact-icon-wrapper {
          width: 40px;
          height: 40px;
          background: rgba(206, 155, 40, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon-wrapper {
          background: rgba(206, 155, 40, 0.2);
          border-color: #ce9b28;
          transform: scale(1.05);
        }

        .contact-icon {
          width: 20px;
          height: 20px;
          color: #ce9b28;
        }

        .contact-text {
          flex: 1;
        }

        .contact-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #808080;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .contact-value {
          color: #e0e0e0;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        .contact-link {
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-link:hover {
          color: #ce9b28;
        }

        /* Social Section */
        .footer-social {
          padding-top: 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .social-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #808080;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .social-icons {
          display: flex;
          gap: 10px;
        }

        .social-link {
          width: 42px;
          height: 42px;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c0c0c0;
          font-size: 18px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-decoration: none;
        }

        .social-link:hover {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(206, 155, 40, 0.3);
        }

        /* Footer Title */
        .footer-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 15px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-radius: 2px;
        }

        /* Footer Menu */
        .footer-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-menu li {
          margin-bottom: 14px;
        }

        .footer-menu li a {
          color: #c0c0c0;
          text-decoration: none;
          font-size: 15px;
          font-weight: 400;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          position: relative;
          padding-left: 0;
        }

        .footer-menu li a::before {
          content: '→';
          position: absolute;
          left: 0;
          opacity: 0;
          color: #ce9b28;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .footer-menu li a:hover {
          color: #ce9b28;
          padding-left: 22px;
        }

        .footer-menu li a:hover::before {
          opacity: 1;
        }

        /* Map Container */
        .footer-map-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .footer-map-container:hover {
          border-color: rgba(206, 155, 40, 0.4);
          box-shadow: 0 12px 35px rgba(206, 155, 40, 0.2);
        }

        .footer-map {
          width: 100%;
          height: 250px;
          display: block;
          filter: grayscale(0.4) brightness(0.9);
          transition: all 0.4s ease;
        }

        .footer-map:hover {
          filter: grayscale(0) brightness(1);
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 25px 0;
          text-align: center;
        }

        .copyright-text {
          color: #808080;
          font-size: 14px;
          margin: 0;
          font-weight: 400;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .footer-main {
            padding: 50px 0 40px;
          }

          .footer-title {
            font-size: 18px;
            margin-bottom: 25px;
          }

          .contact-item {
            margin-bottom: 20px;
          }
        }

        @media (max-width: 767px) {
          .footer-main {
            padding: 40px 0 30px;
          }

          .footer-logo {
            width: 75px !important;
          }

          .footer-tagline {
            font-size: 13px;
          }

          .contact-icon-wrapper {
            width: 36px;
            height: 36px;
          }

          .contact-icon {
            width: 18px;
            height: 18px;
          }

          .contact-value {
            font-size: 14px;
          }

          .footer-menu li a {
            font-size: 14px;
          }

          .footer-title {
            font-size: 17px;
            margin-bottom: 20px;
          }

          .social-link {
            width: 38px;
            height: 38px;
            font-size: 16px;
          }

          .footer-map {
            height: 220px;
          }
        }
      `}</style>
    </footer>
  );
}