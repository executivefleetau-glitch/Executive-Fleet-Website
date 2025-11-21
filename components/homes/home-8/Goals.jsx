"use client";

export default function Goals() {
  return (
    <section className="section pt-80 pb-80 bg-goals">
      <div className="container-sub">
        <div className="goals-header mb-50 wow fadeInUp">
          <h2 className="goals-main-title">OUR GOALS</h2>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.1s">
              <div className="goal-shine"></div>
              <div className="goal-border-top"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-20">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR MISSION</h3>
                <div className="goal-line"></div>
                <p className="goal-description">
                  To deliver Melbourne's most luxurious, punctual and discreet chauffeur service with the highest standards of safety and comfort.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.2s">
              <div className="goal-shine"></div>
              <div className="goal-border-top"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-20">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR VISION</h3>
                <div className="goal-line"></div>
                <p className="goal-description">
                  To remain the city's first choice by owning the largest and most diverse premium fleet in Victoria.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-30">
            <div className="goal-card wow fadeInUp" data-wow-delay="0.3s">
              <div className="goal-shine"></div>
              <div className="goal-border-top"></div>
              <div className="goal-content">
                <div className="goal-icon-wrapper mb-20">
                  <div className="icon-bg-circle"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="goal-title mb-15">OUR STRATEGY</h3>
                <div className="goal-line"></div>
                <p className="goal-description">
                  Maintain every vehicle to perfection, employ only vetted professional drivers and use real-time tracking for guaranteed on-time performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-goals {
          background: #ffffff;
          position: relative;
        }

        .goals-header {
          text-align: left;
        }

        .goals-main-title {
          font-size: 44px;
          font-weight: 700;
          color: #181a1f;
          letter-spacing: 0.5px;
          position: relative;
          display: inline-block;
        }

        .goals-main-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #5b1214, transparent);
          animation: titleLineGrow 1s ease forwards;
          animation-delay: 0.3s;
        }

        @keyframes titleLineGrow {
          to {
            width: 80px;
          }
        }

        .goal-card {
          padding: 40px 35px;
          background: #fafafa;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        /* Animated shine effect */
        .goal-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
          pointer-events: none;
        }

        .goal-card:hover .goal-shine {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }

        /* Top border animation */
        .goal-border-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #5b1214 0%, #7a1a1d 50%, #5b1214 100%);
          transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 3;
        }

        .goal-card:hover .goal-border-top {
          width: 100%;
        }

        /* Gradient background overlay on hover */
        .goal-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(
            180deg,
            rgba(91, 18, 20, 0.02) 0%,
            rgba(91, 18, 20, 0.04) 100%
          );
          transition: height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
        }

        .goal-card:hover::before {
          height: 100%;
        }

        /* Bottom shadow line */
        .goal-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: rgba(91, 18, 20, 0.2);
          transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 3;
        }

        .goal-card:hover::after {
          width: 90%;
        }

        .goal-card:hover {
          background: #ffffff;
          box-shadow: 
            0 15px 45px rgba(91, 18, 20, 0.08),
            0 5px 15px rgba(0, 0, 0, 0.05);
          transform: translateY(-8px);
        }

        .goal-content {
          position: relative;
          z-index: 2;
        }

        .goal-icon-wrapper {
          display: inline-block;
          position: relative;
        }

        .icon-bg-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(91, 18, 20, 0.08), transparent);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .goal-card:hover .icon-bg-circle {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.3);
        }

        .goal-icon-wrapper svg {
          color: #5b1214;
          position: relative;
          z-index: 1;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 0 transparent);
        }

        .goal-card:hover .goal-icon-wrapper svg {
          transform: translateY(-3px) scale(1.12) rotate(-5deg);
          filter: drop-shadow(0 6px 12px rgba(91, 18, 20, 0.25));
        }

        .goal-title {
          font-size: 18px;
          font-weight: 700;
          color: #181a1f;
          letter-spacing: 0.5px;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .goal-card:hover .goal-title {
          color: #5b1214;
          letter-spacing: 1px;
          transform: translateX(3px);
        }

        .goal-line {
          width: 40px;
          height: 2px;
          background: #d0d0d0;
          margin-bottom: 18px;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .goal-card:hover .goal-line {
          width: 70px;
          background: linear-gradient(90deg, #5b1214 0%, #7a1a1d 100%);
          box-shadow: 0 2px 8px rgba(91, 18, 20, 0.3);
        }

        .goal-description {
          font-size: 16px;
          line-height: 1.7;
          color: #626262;
          margin: 0;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .goal-card:hover .goal-description {
          color: #2a2a2a;
          transform: translateX(2px);
        }

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

        .mb-20 {
          margin-bottom: 20px;
        }

        .mb-15 {
          margin-bottom: 15px;
        }

        @media (max-width: 991px) {
          .goals-main-title {
            font-size: 36px;
          }

          .goal-card {
            padding: 35px 28px;
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
          .goals-main-title {
            font-size: 30px;
          }

          .goal-card {
            padding: 32px 25px;
          }

          .goal-icon-wrapper svg {
            width: 36px;
            height: 36px;
          }

          .icon-bg-circle {
            width: 55px;
            height: 55px;
          }

          .goal-title {
            font-size: 16px;
          }

          .goal-description {
            font-size: 15px;
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
      `}</style>
    </section>
  );
}

