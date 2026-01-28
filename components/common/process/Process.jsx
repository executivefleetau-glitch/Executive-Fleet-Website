"use client";
import { process } from "@/data/process";

// Sophisticated icon components for each step
const FormIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="formGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8B429" />
        <stop offset="100%" stopColor="#ce9b28" />
      </linearGradient>
    </defs>
    <rect x="8" y="4" width="26" height="36" rx="3" stroke="url(#formGrad)" strokeWidth="2.5" fill="none"/>
    <rect x="12" y="10" width="18" height="2" rx="1" fill="url(#formGrad)" opacity="0.9"/>
    <rect x="12" y="16" width="14" height="2" rx="1" fill="url(#formGrad)" opacity="0.7"/>
    <rect x="12" y="22" width="16" height="2" rx="1" fill="url(#formGrad)" opacity="0.7"/>
    <rect x="12" y="28" width="10" height="2" rx="1" fill="url(#formGrad)" opacity="0.5"/>
    <circle cx="36" cy="36" r="10" fill="url(#formGrad)" opacity="0.15"/>
    <path d="M32 36l3 3 6-6" stroke="url(#formGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="quoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8B429" />
        <stop offset="100%" stopColor="#ce9b28" />
      </linearGradient>
    </defs>
    <rect x="4" y="10" width="30" height="24" rx="3" stroke="url(#quoteGrad)" strokeWidth="2.5" fill="none"/>
    <path d="M4 16l15 10 15-10" stroke="url(#quoteGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="38" cy="14" r="8" fill="url(#quoteGrad)" opacity="0.15"/>
    <path d="M35 14h6M38 11v6" stroke="url(#quoteGrad)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="38" r="6" fill="url(#quoteGrad)" opacity="0.1"/>
    <path d="M8 38l2 2 4-4" stroke="url(#quoteGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8B429" />
        <stop offset="100%" stopColor="#ce9b28" />
      </linearGradient>
    </defs>
    <path d="M6 28v6a2 2 0 002 2h4a2 2 0 002-2v-2h20v2a2 2 0 002 2h4a2 2 0 002-2v-6" stroke="url(#carGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M8 28l3-10a2 2 0 011.9-1.4h22.2a2 2 0 011.9 1.4l3 10" stroke="url(#carGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M6 28h36" stroke="url(#carGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="12" cy="28" r="3" fill="url(#carGrad)" opacity="0.3"/>
    <circle cx="36" cy="28" r="3" fill="url(#carGrad)" opacity="0.3"/>
    <path d="M16 22h16" stroke="url(#carGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    <circle cx="40" cy="10" r="6" fill="url(#carGrad)" opacity="0.15"/>
    <path d="M38 10l2 2 4-4" stroke="url(#carGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M4 12l4 2M4 16l6 1" stroke="url(#carGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
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
                  {/* Icon */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.08) 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    border: '1px solid rgba(206, 155, 40, 0.2)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
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
