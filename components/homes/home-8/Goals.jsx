"use client";

export default function Goals() {
  return (
    <section className="section pt-80 pb-80 bg-goals">
      <div className="container-sub">
        <div className="goals-header mb-50">
          <div className="goals-badge wow fadeInUp">
            <span className="badge-dot"></span>
            <span className="badge-text">OUR GOALS</span>
          </div>
          <h2 className="goals-main-heading wow fadeInUp" data-wow-delay="0.1s">
            Our <span className="golden-gradient-text">Mission</span> & Vision
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.1s">
              <div className="goal-border-accent"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-25">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR MISSION</h3>
                <p className="goal-description">
                  To deliver Melbourne's most luxurious, punctual and discreet chauffeur service with the highest standards of safety and comfort.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.2s">
              <div className="goal-border-accent"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-25">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR VISION</h3>
                <p className="goal-description">
                  To be recognized as Australia's leading luxury chauffeur service through innovation, reliability and world-class customer experience.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.3s">
              <div className="goal-border-accent"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-25">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR STRATEGY</h3>
                <p className="goal-description">
                  Maintain every vehicle to perfection, employ only vetted professional drivers and use real-time tracking for guaranteed on-time performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Section Background */
        .bg-goals {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          position: relative;
        }

        /* Goals Badge - Consistent Style */
        .goals-badge {
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

        .goals-badge:hover {
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

        /* Goals Main Heading */
        .goals-main-heading {
          font-size: 48px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
          margin-bottom: 0;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* Enhanced Goal Cards */
        .goal-card {
          padding: 40px 35px;
          background: #ffffff;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          border: 2px solid #f0f0f0;
          border-radius: 12px;
        }

        /* Black Overlay - Slides from bottom to top */
        .goal-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.08) 100%);
          transition: height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
        }

        .goal-card:hover::before {
          height: 100%;
        }

        .goal-card:hover {
          transform: translateY(-8px);
          border-color: rgba(206, 155, 40, 0.3);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        /* Golden Accent Border - Top slides left to right */
        .goal-border-accent {
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

        .goal-card:hover .goal-border-accent {
          width: 100%;
        }

        /* Bottom Border - Slides from bottom to top */
        .goal-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          transition: height 0.5s ease;
          z-index: 10;
          border-radius: 0 0 12px 12px;
        }

        .goal-card:hover::after {
          height: 4px;
        }

        /* Goal Content */
        .goal-content {
          position: relative;
          z-index: 2;
        }

        /* Icon Wrapper */
        .goal-icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-bg-circle {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          border: 2px solid #e8e8e8;
          transition: all 0.4s ease;
        }

        .goal-card:hover .icon-bg-circle {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border-color: rgba(206, 155, 40, 0.4);
          transform: scale(1.1);
        }

        .goal-icon-wrapper svg {
          position: relative;
          z-index: 2;
          stroke: #000000;
          transition: all 0.4s ease;
        }

        .goal-card:hover .goal-icon-wrapper svg {
          stroke: #ce9b28;
          transform: scale(1.1);
        }

        /* Goal Title */
        .goal-title {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
        }

        .goal-card:hover .goal-title {
          color: #ce9b28;
        }

        /* Goal Description */
        .goal-description {
          font-size: 15px;
          line-height: 1.7;
          color: #666666;
          margin: 0;
          transition: color 0.3s ease;
        }

        .goal-card:hover .goal-description {
          color: #4a4a4a;
        }

        /* Spacing */
        .pt-80 {
          padding-top: 80px;
        }

        .pb-80 {
          padding-bottom: 80px;
        }

        .mb-50 {
          margin-bottom: 50px;
        }

        .mb-30 {
          margin-bottom: 30px;
        }

        .mb-25 {
          margin-bottom: 25px;
        }

        .mb-15 {
          margin-bottom: 15px;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .goals-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .goals-main-heading {
            font-size: 36px;
          }

          .goal-card {
            padding: 35px 30px;
          }

          .pt-80 {
            padding-top: 60px;
          }

          .pb-80 {
            padding-bottom: 60px;
          }

          .mb-50 {
            margin-bottom: 40px;
          }
        }

        @media (max-width: 767px) {
          .goals-main-heading {
            font-size: 30px;
          }

          .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .badge-dot {
            width: 8px;
            height: 8px;
          }

          .goals-badge {
            padding: 8px 16px;
          }

          .goal-card {
            padding: 32px 25px;
          }

          .goal-icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .icon-bg-circle {
            width: 60px;
            height: 60px;
          }

          .goal-icon-wrapper svg {
            width: 36px;
            height: 36px;
          }

          .goal-title {
            font-size: 16px;
          }

          .goal-description {
            font-size: 14px;
          }

          .pt-80 {
            padding-top: 50px;
          }

          .pb-80 {
            padding-bottom: 50px;
          }

          .mb-50 {
            margin-bottom: 35px;
          }
        }

        @media (max-width: 575px) {
          .goals-main-heading {
            font-size: 26px;
          }
        }
      `}</style>
    </section>
  );
}
