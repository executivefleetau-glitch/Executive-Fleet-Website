"use client";
import { faqs } from "@/data/faq";

export default function Faq() {
  return (
    <section className="section pt-80 mb-30 bg-faqs">
      <div className="container-sub">
        <div className="box-faqs">
          <div className="text-center">
            <h2 className="color-brand-1 mb-20 wow fadeInUp">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-60 mb-40">
            <div className="accordion wow fadeInUp" id="accordionFAQ">
              {faqs.map((elm, i) => (
                <div key={i} className="accordion-item">
                  <h5 className="accordion-header" id={`heading${i}`}>
                    <button
                      className={`accordion-button text-heading-5 ${
                        i ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${i}`}
                      aria-expanded={`${!i ? "true" : "false"}`}
                      aria-controls={`collapse${i}`}
                    >
                      {elm.question}
                    </button>
                  </h5>
                  <div
                    className={`accordion-collapse collapse ${
                      !i ? "show" : ""
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
        .accordion-item {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid #e8e8e8 !important;
          margin-bottom: 15px !important;
          border-radius: 8px !important;
          overflow: hidden;
        }

        .accordion-item:hover {
          border-color: #5b1214 !important;
          box-shadow: 0 8px 25px rgba(91, 18, 20, 0.1) !important;
          transform: translateX(5px);
        }

        .accordion-button {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          border: none !important;
          border-radius: 8px !important;
        }

        .accordion-button::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: #5b1214;
          transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: -1;
        }

        .accordion-button:hover::before {
          width: 100%;
        }

        .accordion-button:hover {
          color: #ffffff !important;
          box-shadow: none !important;
          padding-left: 25px !important;
        }

        .accordion-button:not(.collapsed) {
          background-color: #5b1214 !important;
          color: #ffffff !important;
          box-shadow: none !important;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }

        .accordion-button:not(.collapsed):hover {
          background-color: #5b1214 !important;
          color: #ffffff !important;
        }

        .accordion-button:not(.collapsed)::after {
          filter: brightness(0) invert(1);
        }

        .accordion-body {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
