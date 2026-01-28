"use client";
import { process } from "@/data/process";

// Icon components for each step
const FormIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const CarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
    <circle cx="6.5" cy="16.5" r="2.5"></circle>
    <circle cx="16.5" cy="16.5" r="2.5"></circle>
  </svg>
);

const icons = [FormIcon, QuoteIcon, CarIcon];

export default function Process() {
  return (
    <section className="section pt-120 pb-90 bg-primary bg-how-it-works">
      <div className="container-sub">
        <div className="text-center mb-60">
          <div className="process-badge wow fadeInUp" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
            <span className="badge-dot"></span>
            <span className="badge-text">HOW IT WORKS</span>
          </div>
          <h2 className="process-main-heading color-white wow fadeInUp">
            Simple <span className="golden-gradient-text">Quote</span> Process
          </h2>
        </div>
        
        {/* 3 Cards Grid */}
        <div className="row">
          {process.map((step, index) => {
            const IconComponent = icons[index];
            return (
              <div key={step.id} className="col-lg-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(206, 155, 40, 0.2)',
                  borderRadius: '16px',
                  padding: '40px 30px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="process-card"
                >
                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '30px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                    color: '#000',
                    boxShadow: '0 4px 15px rgba(206, 155, 40, 0.4)'
                  }}>
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'rgba(206, 155, 40, 0.15)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    color: '#E8B429'
                  }}>
                    <IconComponent />
                  </div>
                  
                  {/* Title */}
                  <h4 style={{
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    lineHeight: '1.3'
                  }}>
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        /* Process Badge - Consistent Style */
        .process-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .process-badge:hover {
          border-color: rgba(206, 155, 40, 0.6);
          background: rgba(206, 155, 40, 0.15);
        }

        .process-badge .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(206, 155, 40, 0.5);
        }

        .process-badge .badge-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Process Main Heading */
        .process-main-heading {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
        }

        .process-card:hover {
          border-color: rgba(206, 155, 40, 0.5) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-5px);
        }

        @media (max-width: 1199px) {
          .process-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .process-main-heading {
            font-size: 36px;
          }
        }

        @media (max-width: 767px) {
          .process-main-heading {
            font-size: 30px;
          }

          .process-badge .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .process-badge .badge-dot {
            width: 8px;
            height: 8px;
          }

          .process-badge {
            padding: 8px 16px;
          }
        }

        @media (max-width: 575px) {
          .process-main-heading {
            font-size: 26px;
          }
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }
      `}</style>
    </section>
  );
}
