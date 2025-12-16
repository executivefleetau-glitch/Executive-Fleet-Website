"use client";

import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", data.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section mt-120 mb-120">
      <div className="container-sub">
        <div className="mw-770">
          {/* Badge & Heading */}
          <div className="text-center mb-60 wow fadeInUp">
            <div className="mb-20">
              <span className="contact-badge">
                <span className="contact-badge-dot"></span>
                GET IN TOUCH
              </span>
            </div>
            <h2 className="contact-main-heading">
              Leave Us Your <span style={{ color: '#ce9b28' }}>Info</span>
            </h2>
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="thank-you-message wow fadeInUp" role="alert">
              <div className="thank-you-content">
                <div className="thank-you-icon">
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="url(#thankYouGradient)"/>
                    <path d="M8 12.5L10.5 15L16 9" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="thankYouGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ce9b28" />
                        <stop offset="50%" stopColor="#fffbe9" />
                        <stop offset="100%" stopColor="#E8B429" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="thank-you-title">Thank You!</h3>
                <p className="thank-you-text">
                  Your message has been sent successfully. <strong>We've sent a confirmation email to your inbox.</strong>
                </p>
                <p className="thank-you-subtext">
                  Our team will review your message and get back to you within 24 hours.
                </p>
                <div className="thank-you-info">
                  <p className="thank-you-info-text">
                    Need immediate assistance? Call us at <a href="tel:+41227157000">+41 22 715 7000</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="alert alert-danger mb-30 wow fadeInUp" role="alert">
              <strong>Error!</strong> Failed to submit the form. Please try again or contact us directly at <a href="tel:+41227157000">+41 22 715 7000</a>
            </div>
          )}

          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group contact-form-group">
                    <label className="form-label contact-form-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      className="form-control contact-form-input"
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group contact-form-group">
                    <label className="form-label contact-form-label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      className="form-control contact-form-input"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group contact-form-group">
                    <label className="form-label contact-form-label" htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      className="form-control contact-form-input"
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="What is this about?"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group contact-form-group">
                    <label className="form-label contact-form-label" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      className="form-control contact-form-input"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Write your message here..."
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="btn-text">{isSubmitting ? "Sending..." : "Get In Touch"}</span>
                    {!isSubmitting && (
                      <svg
                        className="btn-arrow"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Badge Styling */
        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #000;
          text-transform: uppercase;
        }

        .contact-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        }

        /* Main Heading */
        .contact-main-heading {
          font-size: 44px;
          font-weight: 700;
          color: #000;
          margin: 0;
          line-height: 1.3;
        }

        .gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Form Styling */
        .contact-form-group {
          position: relative;
          margin-bottom: 25px;
        }

        .contact-form-label {
          display: block;
          position: static !important;
          margin-bottom: 10px !important;
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          transform: none !important;
          top: auto !important;
          left: auto !important;
          opacity: 1 !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .contact-form-input {
          width: 100%;
          padding: 16px 20px;
          font-size: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background-color: #ffffff;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #000000;
        }

        .contact-form-input:focus {
          outline: none;
          border-color: #ce9b28;
          box-shadow: 0 0 0 4px rgba(206, 155, 40, 0.1);
          background-color: #fffef9;
        }

        .contact-form-input::placeholder {
          color: #999999;
          font-size: 14px;
          font-weight: 400;
        }

        .contact-form-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Submit Button - Golden Theme */
        .btn-contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 40px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: 100%;
        }

        .btn-contact-submit::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.5s ease;
          z-index: 0;
        }

        .btn-contact-submit:hover::before {
          left: 0;
        }

        .btn-contact-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(206, 155, 40, 0.5);
        }

        .btn-text,
        .btn-arrow {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .btn-contact-submit:hover .btn-text,
        .btn-contact-submit:hover .btn-arrow {
          color: #e8b429;
        }

        .btn-contact-submit:hover .btn-arrow {
          transform: translateX(4px) translateY(-4px);
        }

        .btn-contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-contact-submit:disabled:hover {
          transform: none;
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.3);
        }

        /* Thank You Message - Theme Colors */
        .thank-you-message {
          margin-bottom: 40px;
          padding: 50px 40px;
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 2px solid #ce9b28;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(206, 155, 40, 0.2);
          animation: thankYouAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .thank-you-message::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        }

        .thank-you-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .thank-you-icon {
          margin: 0 auto 24px auto;
          width: 70px;
          height: 70px;
          animation: checkmarkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
        }

        .thank-you-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 20px rgba(206, 155, 40, 0.3));
        }

        .thank-you-title {
          font-size: 36px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 16px 0;
          letter-spacing: -1px;
          animation: fadeInUp 0.5s ease 0.4s both;
        }

        .thank-you-text {
          font-size: 16px;
          color: #333333;
          line-height: 1.7;
          margin: 0 0 12px 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.5s ease 0.5s both;
        }

        .thank-you-text strong {
          color: #ce9b28;
          font-weight: 700;
        }

        .thank-you-subtext {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin: 0 0 30px 0;
          animation: fadeInUp 0.5s ease 0.6s both;
        }

        .thank-you-info {
          margin-top: 30px;
          padding: 24px;
          background: linear-gradient(135deg, #fffef9 0%, #ffffff 100%);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-left: 4px solid #ce9b28;
          border-radius: 8px;
          animation: fadeInUp 0.5s ease 0.7s both;
        }

        .thank-you-info-text {
          margin: 0;
          font-size: 14px;
          color: #333333;
        }

        .thank-you-info-text a {
          color: #000000;
          font-weight: 700;
          text-decoration: none;
          border-bottom: 2px solid #ce9b28;
          transition: all 0.3s ease;
          padding-bottom: 2px;
        }

        .thank-you-info-text a:hover {
          color: #ce9b28;
          border-bottom-color: #e8b429;
        }

        /* Error Alert */
        .alert {
          padding: 18px 24px;
          border-radius: 10px;
          margin-bottom: 30px;
          animation: slideIn 0.3s ease;
          border: 2px solid;
        }

        .alert-danger {
          background-color: #fff5f5;
          border-color: #dc3545;
          color: #721c24;
        }

        .alert-danger strong {
          color: #000000;
        }

        .alert-danger a {
          color: #000000;
          font-weight: 700;
          text-decoration: none;
          border-bottom: 2px solid #000000;
        }

        .alert-danger a:hover {
          color: #dc3545;
          border-bottom-color: #dc3545;
        }

        /* Animations */
        @keyframes thankYouAppear {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes checkmarkPop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-45deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 767px) {
          .contact-main-heading {
            font-size: 32px;
          }

          .contact-badge {
            font-size: 12px;
            padding: 6px 16px;
          }

          .thank-you-message {
            padding: 40px 30px;
          }

          .thank-you-title {
            font-size: 28px;
          }

          .thank-you-text {
            font-size: 15px;
          }

          .btn-contact-submit {
            padding: 16px 32px;
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}
