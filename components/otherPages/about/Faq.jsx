"use client";
import { faqs } from "@/data/faq";

export default function Faq({ items }) {
  const displayFaqs = items || faqs;
  return (
    <>
      <section className="section faq-section">
        <div className="container-sub">
          <div className="box-faqs">
            <div className="text-center mb-60">
              <div className="faq-badge wow fadeInDown">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>FAQ</span>
              </div>
              <h2 className="faq-main-title wow fadeInUp">
                Frequently Asked Questions
              </h2>
              <p className="faq-subtitle wow fadeInUp" data-wow-delay="0.2s">
                Everything you need to know about our luxury chauffeur services
              </p>
            </div>
            <div className="faq-container">
              <div className="accordion wow fadeInUp" id="accordionFAQ">
                {displayFaqs.map((elm, i) => (
                  <div key={i} className="accordion-item">
                    <h5 className="accordion-header" id={`heading${i}`}>
                      <button
                        className={`accordion-button ${i ? "collapsed" : ""
                          }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${i}`}
                        aria-expanded={`${!i ? "true" : "false"}`}
                        aria-controls={`collapse${i}`}
                      >
                        <span className="question-number">0{i + 1}</span>
                        {elm.question}
                      </button>
                    </h5>
                    <div
                      className={`accordion-collapse collapse ${!i ? "show" : ""
                        }`}
                      id={`collapse${i}`}
                      aria-labelledby={`heading${i}`}
                      data-bs-parent="#accordionFAQ"
                    >
                      <div className="accordion-body">{elm.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
        .faq-section {
          padding: 100px 0;
          background: #ffffff;
          position: relative;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(206, 155, 40, 0.08);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 50px;
          padding: 8px 20px;
          margin-bottom: 20px;
        }

        .faq-badge svg {
          stroke: #ce9b28;
        }

        .faq-badge span {
          color: #ce9b28;
          font-family: var(--dm-saans-font);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .faq-main-title {
          font-family: var(--dm-saans-font) !important;
          font-size: 48px !important;
          font-weight: 700 !important;
          color: #000000 !important;
          letter-spacing: -1.2px !important;
          margin-bottom: 16px !important;
          line-height: 1.2 !important;
        }

        .faq-subtitle {
          font-family: var(--dm-saans-font) !important;
          font-size: 17px !important;
          color: #666666 !important;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6 !important;
        }

        .mb-60 {
          margin-bottom: 60px;
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-section .accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-section .accordion-item {
          background: #ffffff;
          border: 2px solid #f0f0f0 !important;
          border-radius: 12px !important;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-section .accordion-item:hover {
          border-color: rgba(206, 155, 40, 0.3) !important;
          box-shadow: 0 4px 20px rgba(206, 155, 40, 0.1);
        }

        .faq-section .accordion-button {
          font-family: var(--dm-saans-font) !important;
          font-size: 18px !important;
          font-weight: 600 !important;
          color: #000000 !important;
          background: #ffffff !important;
          padding: 24px 28px !important;
          border: none !important;
          box-shadow: none !important;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .faq-section .accordion-button:not(.collapsed) {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.05) 0%, rgba(206, 155, 40, 0.02) 100%) !important;
          color: #ce9b28 !important;
        }

        .faq-section .accordion-button::after {
          content: '+';
          width: 32px;
          height: 32px;
          background: #f8f8f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 400;
          color: #000000;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-left: auto;
          background-image: none;
        }

        .faq-section .accordion-button:not(.collapsed)::after {
          content: '−';
          background: #ce9b28;
          color: #ffffff;
          transform: rotate(180deg);
        }

        .faq-section .accordion-button:hover::after {
          background: #ce9b28;
          color: #ffffff;
        }

        .question-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(206, 155, 40, 0.1);
          border-radius: 50%;
          font-family: var(--dm-saans-font);
          font-size: 14px;
          font-weight: 700;
          color: #ce9b28;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-section .accordion-button:not(.collapsed) .question-number {
          background: #ce9b28;
          color: #ffffff;
        }

        .faq-section .accordion-body {
          font-family: var(--dm-saans-font) !important;
          font-size: 15px !important;
          line-height: 1.8 !important;
          color: #333333 !important;
          padding: 0 28px 24px 76px !important;
          background: #ffffff !important;
        }

        .faq-section .accordion-collapse {
          border: none !important;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .faq-section {
            padding: 80px 0;
          }
          .faq-main-title {
            font-size: 40px !important;
          }
          .faq-subtitle {
            font-size: 16px !important;
          }
        }

        @media (max-width: 767px) {
          .faq-section {
            padding: 60px 0;
          }
          .faq-main-title {
            font-size: 32px !important;
          }
          .faq-subtitle {
            font-size: 15px !important;
          }
          .mb-60 {
            margin-bottom: 40px;
          }
          .faq-section .accordion-button {
            font-size: 16px !important;
            padding: 20px 20px !important;
            gap: 12px;
          }
          .faq-section .accordion-body {
            font-size: 14px !important;
            padding: 0 20px 20px 56px !important;
          }
          .question-number {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }
          .faq-section .accordion-button::after {
            width: 28px;
            height: 28px;
            font-size: 20px;
          }
        }

        @media (max-width: 575px) {
          .faq-main-title {
            font-size: 28px !important;
          }
          .faq-badge {
            padding: 6px 16px;
          }
          .faq-badge span {
            font-size: 11px;
          }
        }
      `}</style>
      </section>
    </>
  );
}
