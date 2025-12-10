"use client";

export default function About() {
  return (
    <section className="section about-section">
      <div className="container-sub">
        <div className="row align-items-center">
          {/* Left Column: Content */}
          <div className="col-lg-6 mb-50 mb-lg-0">
            <div className="about-content wow fadeInUp">
              <div className="premium-badge">
                <span className="badge-dot"></span>
                <span>About Executive Fleet</span>
              </div>

              <h2 className="heading-44-medium mb-30 color-black">
                Redefining Luxury <br className="d-none d-lg-block" />
                Travel in <span className="text-gold">Melbourne</span>
              </h2>

              <p className="text-16 color-grey-dark mb-40">
                Since 2022, Executive Fleet has established itself as Melbourne's premier chauffeur service. We combine the city's most diverse fleet of luxury vehicles with impeccable service standards. Whether it's a corporate transfer, airport pickup, or a special wedding day, we ensure every journey is seamless, comfortable, and strictly on time.
              </p>

              <div className="list-features mb-40">
                <div className="feature-item">
                  <div className="check-icon">✓</div>
                  <span>Professional Chauffeurs</span>
                </div>
                <div className="feature-item">
                  <div className="check-icon">✓</div>
                  <span>Fixed Price Booking</span>
                </div>
                <div className="feature-item">
                  <div className="check-icon">✓</div>
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              <a href="/about" className="btn btn-black-gold">
                Discover More
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="col-lg-6">
            <div className="stats-grid-2x2 wow fadeInRight">
              {/* Card 1 */}
              <div className="stat-card">
                <div className="stat-icon-box">
                  <svg className="icon-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 className="stat-value">5000+</h3>
                <p className="stat-label">Happy Clients</p>
              </div>

              {/* Card 2 */}
              <div className="stat-card">
                <div className="stat-icon-box">
                  <svg className="icon-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="stat-value">99.9%</h3>
                <p className="stat-label">On-Time Arrival</p>
              </div>

              {/* Card 3 */}
              <div className="stat-card">
                <div className="stat-icon-box">
                  <svg className="icon-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="stat-value">50+</h3>
                <p className="stat-label">Luxury Vehicles</p>
              </div>

              {/* Card 4 */}
              <div className="stat-card">
                <div className="stat-icon-box">
                  <svg className="icon-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </div>
                <h3 className="stat-value">4.9/5</h3>
                <p className="stat-label">Top Rated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 120px 0;
          background-color: #ffffff;
          overflow: hidden;
          position: relative;
        }

        /* Typography */
        .heading-44-medium {
          font-family: var(--dm-saans-font) !important;
          font-size: 48px !important;
          font-weight: 700 !important;
          line-height: 1.2 !important;
          letter-spacing: -1.2px !important;
          margin-bottom: 30px !important;
        }

        .color-black {
          color: #000000 !important;
        }

        .color-grey-dark {
          color: #555555 !important;
        }

        .text-gold {
          background: linear-gradient(90deg, #ce9b28 0%, #ce9b28  50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
          font-weight: 700 !important;
        }

        .text-16 {
          font-family: var(--dm-saans-font) !important;
          font-size: 17px !important;
          line-height: 1.8 !important;
          margin-bottom: 40px !important;
        }

        /* Premium Badge */
        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          padding: 10px 20px;
          background: rgba(206, 155, 40, 0.08);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 30px;
          color: #000000;
          font-family: var(--dm-saans-font);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background-color: #ce9b28;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        /* Feature List */
        .list-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px !important;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          transition: transform 0.2s ease;
        }

        .feature-item:hover {
          transform: translateX(5px);
        }

        .check-icon {
          width: 26px;
          height: 26px;
          background: #000000;
          color: #ce9b28;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .feature-item span {
          font-family: var(--dm-saans-font);
          font-size: 16px;
          font-weight: 600;
          color: #000000;
        }

        /* Button */
        .btn-black-gold {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 40px;
          background: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          font-family: var(--dm-saans-font);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          transition: all 0.3s ease;
          border-radius: 6px;
          text-decoration: none;
        }

        .btn-black-gold:hover {
          background: #ce9b28;
          border-color: #ce9b28;
          color: #000000;
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(206, 155, 40, 0.3);
        }

        .btn-black-gold svg {
          transition: transform 0.3s ease;
        }

        .btn-black-gold:hover svg {
          transform: translateX(4px);
        }

        /* Stats Grid */
        .stats-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          padding-left: 40px;
        }

        .stat-card {
          background: linear-gradient(135deg, #f9f9f9 0%, #f3f3f3 100%);
          padding: 35px 28px;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.05) 0%, rgba(206, 155, 40, 0.02) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          background: #ffffff;
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(206, 155, 40, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .stat-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.4s ease;
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 1;
        }

        .stat-card:hover .stat-icon-box {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #ffffff;
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 8px 20px rgba(206, 155, 40, 0.4);
        }

        .stat-value {
          font-family: var(--dm-saans-font);
          font-size: 40px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 10px;
          color: #000000;
          position: relative;
          z-index: 1;
        }

        .stat-label {
          font-family: var(--dm-saans-font);
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: #666666;
          position: relative;
          z-index: 1;
        }

        .icon-32 {
          width: 30px;
          height: 30px;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .heading-44-medium {
            font-size: 42px !important;
          }
          .stats-grid-2x2 {
            gap: 18px;
            padding-left: 20px;
          }
        }

        @media (max-width: 991px) {
          .about-section {
            padding: 80px 0;
          }
          .col-lg-6.mb-50 {
            margin-bottom: 50px;
          }
          .stats-grid-2x2 {
            padding-left: 0;
            max-width: 600px;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .about-section {
            padding: 60px 0;
          }
          .heading-44-medium {
            font-size: 32px !important;
            line-height: 1.3 !important;
          }
          .text-16 {
            font-size: 16px !important;
            line-height: 1.7 !important;
          }
          .stats-grid-2x2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .stat-card {
            flex-direction: row;
            align-items: center;
            padding: 24px 20px;
            gap: 20px;
          }
          .stat-icon-box {
            margin-bottom: 0;
            width: 50px;
            height: 50px;
          }
          .stat-value {
            font-size: 32px;
            margin-bottom: 4px;
          }
          .stat-label {
            font-size: 13px;
          }
          .btn-black-gold {
            padding: 16px 32px;
            font-size: 13px;
          }
        }

        @media (max-width: 575px) {
          .heading-44-medium {
            font-size: 28px !important;
          }
          .premium-badge {
            font-size: 11px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </section>
  );
}