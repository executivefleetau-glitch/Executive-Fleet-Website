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
          <h2 className="heading-44-medium mb-60 text-center wow fadeInUp">
            Leave us your info
          </h2>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="thank-you-message wow fadeInUp" role="alert">
              <div className="thank-you-content">
                <div className="thank-you-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2"/>
                    <path d="M8 12.5L10.5 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="thank-you-title">Thank You!</h3>
                <p className="thank-you-text">
                  Your message has been sent successfully. We've sent a confirmation email to your inbox.
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
              <strong>Error!</strong> Failed to submit the form. Please try again or contact us directly.
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
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Get In Touch"}
                    {!isSubmitting && (
                      <svg
                        className="icon-16 ml-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
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
        }

        .contact-form-input {
          width: 100%;
          padding: 15px 20px;
          font-size: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background-color: #ffffff;
          transition: all 0.3s ease;
        }

        .contact-form-input:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .contact-form-input::placeholder {
          color: #999999;
          font-size: 14px;
        }

        .contact-form-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .thank-you-message {
          margin-bottom: 30px;
          padding: 50px 40px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
          border: 2px solid #000000;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
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
          background: linear-gradient(90deg, #000000 0%, #666666 50%, #000000 100%);
        }

        .thank-you-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .thank-you-icon {
          margin: 0 auto 20px auto;
          width: 60px;
          height: 60px;
          animation: checkmarkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
        }

        .thank-you-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.1));
        }

        .thank-you-title {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 15px 0;
          letter-spacing: -0.5px;
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

        .thank-you-subtext {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin: 0 0 30px 0;
          animation: fadeInUp 0.5s ease 0.6s both;
        }

        .thank-you-info {
          margin-top: 25px;
          padding: 20px;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-left: 4px solid #000000;
          border-radius: 6px;
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
          border-bottom: 2px solid #000000;
          transition: all 0.3s ease;
        }

        .thank-you-info-text a:hover {
          color: #333333;
          border-bottom-color: #666666;
        }

        .alert {
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          animation: slideIn 0.3s ease;
        }

        .alert-danger {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

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

        @media (max-width: 767px) {
          .thank-you-message {
            padding: 40px 30px;
          }

          .thank-you-title {
            font-size: 26px;
          }

          .thank-you-text {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}
