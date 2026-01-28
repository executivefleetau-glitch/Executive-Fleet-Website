"use client";
import QuoteForm from "@/components/booking/QuoteForm";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AirportTransferContent() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past hero section
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24 hours in advance, but we can accommodate same-day bookings with minimum 2 hours notice subject to availability."
    },
    {
      question: "What happens if my flight is delayed?",
      answer: "We monitor all flights in real-time and automatically adjust your pickup time. There's no extra charge for flight delays — we wait for you with 60 minutes free waiting for domestic and 90 minutes for international flights."
    },
    {
      question: "Where will my chauffeur meet me?",
      answer: "For arrivals, your chauffeur will be waiting at the designated meeting point in the arrivals hall with a name board displaying your name. Full instructions are sent with your booking confirmation."
    },
    {
      question: "Do you provide child seats?",
      answer: "Yes, we offer baby capsules, baby seats, and booster seats at no additional charge. Please specify your requirements when booking and our chauffeur will have them installed and ready."
    },
    {
      question: "What vehicles are available?",
      answer: "Our premium fleet includes Mercedes-Benz S-Class and E-Class sedans, BMW 7 Series, Audi A8, and Mercedes V-Class for larger groups. All vehicles are late-model, immaculately maintained, and equipped with complimentary water and WiFi."
    },
    {
      question: "What's included in the price?",
      answer: "Our all-inclusive pricing covers the chauffeur, vehicle, meet & greet service, flight monitoring, complimentary waiting time, luggage assistance, tolls, and GST. No hidden fees or surge pricing."
    }
  ];

  const testimonials = [
    {
      quote: "After a 14-hour flight from London, the last thing I wanted was hassle. My chauffeur was waiting exactly where he said he'd be, helped with my bags, and the S-Class was immaculate. Worth every dollar.",
      name: "James K.",
      title: "Business Consultant",
      location: "Toorak"
    },
    {
      quote: "Traveling with two toddlers is stressful enough. The driver had both child seats installed perfectly, tracked our delayed flight, and was waiting with a smile. The V-Class had plenty of room for our luggage.",
      name: "Sarah M.",
      title: "",
      location: "Melbourne CBD"
    },
    {
      quote: "4am pickup for an international flight. On time, professional, spotless BMW 7 Series. I've used them three times now and they've never let me down. My go-to for airport transfers.",
      name: "Michael T.",
      title: "Accountant",
      location: "South Yarra"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="lp-hero" id="top">
        <div className="hero-bg">
          <Image
            src="/assets/imgs/banner/V-class+bags.webp"
            alt="Melbourne Airport Transfer - Mercedes V-Class with Luggage"
            fill
            priority
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className="hero-overlay"></div>
          <div className="hero-glow"></div>
        </div>
        
        <div className="landing-container">
          <div className="hero-grid">
            <div className="hero-content">
              {/* Trust Badge */}
              <div className="trust-badge">
                <div className="badge-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="badge-text">5-Star Rated Melbourne Airport Transfers</span>
              </div>

              <h1 className="hero-title">
                Melbourne Airport
                <span className="title-highlight">Transfers</span>
              </h1>
              
              <p className="hero-subtitle">
                From landing to destination in complete comfort. Premium vehicles, 
                real-time flight tracking, and a chauffeur waiting with your name.
              </p>
              
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <span>Premium Fleet</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <span>Flight Tracking</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <span>Meet & Greet</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <span>Free Waiting</span>
                </div>
              </div>

              <div className="hero-cta-mobile">
                <a href="tel:+61431951996" className="cta-call-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call Now: +61 431 951 996
                </a>
              </div>
            </div>
            
            <div className="hero-form-wrapper">
              <div className="form-header">
                <h2>Get Your Free Quote</h2>
                <p>No obligation • Response within 30 mins</p>
              </div>
              <QuoteForm variant="landing" preselectedService="airport" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lp-stats">
        <div className="landing-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">2000+</span>
              <span className="stat-label">Airport Transfers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5.0</span>
              <span className="stat-label">Google Rating</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">On-Time Guarantee</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Service Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="lp-how-it-works">
        <div className="landing-container">
          <div className="section-header">
            <span className="section-tag">Simple Process</span>
            <h2>How It Works</h2>
          </div>
          
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3>Book Your Transfer</h3>
              <p>Fill out our quick form or call us. Response within 30 minutes with a confirmed quote.</p>
            </div>
            
            <div className="step-connector">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 L90,10" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" fill="none"/>
                <polygon points="90,5 100,10 90,15" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <h3>We Confirm Details</h3>
              <p>Receive instant confirmation with your chauffeur's details and vehicle information.</p>
            </div>
            
            <div className="step-connector">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 L90,10" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" fill="none"/>
                <polygon points="90,5 100,10 90,15" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10.5V6l-2-2H4v12l2 1h1"/>
                  <circle cx="7" cy="17" r="2"/>
                  <path d="M9 17h6"/>
                  <circle cx="17" cy="17" r="2"/>
                </svg>
              </div>
              <h3>Seamless Pickup</h3>
              <p>Your chauffeur tracks your flight and meets you in arrivals with a name board.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="lp-why">
        <div className="landing-container">
          <div className="section-header">
            <span className="section-tag">Why Executive Fleet</span>
            <h2>Melbourne's Premier Airport Transfer Service</h2>
          </div>
          
          <div className="why-grid">
            <div className="why-card featured">
              <div className="card-badge">Most Popular</div>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>Premium Fleet</h3>
              <p>Travel in style with Mercedes-Benz, BMW, and Audi luxury vehicles. Immaculately maintained and professionally presented.</p>
            </div>
            
            <div className="why-card featured">
              <div className="card-badge">Smart Service</div>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h3>Real-Time Flight Tracking</h3>
              <p>We monitor your flight and adjust pickup time accordingly. No extra charges for delayed flights — ever.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Meet & Greet Service</h3>
              <p>Your chauffeur will be waiting with a name board at the arrivals terminal. Seamless, professional service.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3>Complimentary Waiting</h3>
              <p>60 minutes free waiting for domestic, 90 minutes for international flights. Stress-free collection guaranteed.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Full Luggage Assistance</h3>
              <p>Our chauffeurs help with your luggage from terminal to vehicle and to your door. Travel in complete comfort.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <h3>Instant Confirmation</h3>
              <p>Receive immediate booking confirmation with your chauffeur's details, vehicle info, and meeting instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="lp-testimonials">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">Client Experiences</span>
            <h2>What Our Clients Say</h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-details">
                      {testimonial.title && `${testimonial.title}, `}{testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="lp-faq">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div 
                className={`faq-item ${openFaq === index ? 'open' : ''}`} 
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{item.question}</h4>
                  <div className="faq-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12" className="horizontal"/>
                    </svg>
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lp-cta">
        <div className="landing-container">
          <div className="cta-content">
            <h2>Ready to Book Your Airport Transfer?</h2>
            <p>
              Experience premium Melbourne airport transfers. Get a free quote in minutes — no obligation, all-inclusive pricing.
              {/* PRICING_PLACEHOLDER: Replace with your custom pricing */}
            </p>
            <div className="cta-buttons">
              <a href="#top" className="btn-primary">Get Free Quote</a>
              <a href="tel:+61431951996" className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +61 431 951 996
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className={`mobile-sticky-cta ${showStickyBar ? 'visible' : ''}`}>
        <a href="tel:+61431951996" className="sticky-btn call-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call Now
        </a>
        <a href="#top" className="sticky-btn quote-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
          Get Quote
        </a>
      </div>

      <style jsx global>{`
        /* ===== HERO SECTION ===== */
        .lp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg, 
            rgba(0,0,0,0.92) 0%, 
            rgba(0,0,0,0.75) 40%,
            rgba(0,0,0,0.85) 100%
          );
        }

        .hero-glow {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 50%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(206, 155, 40, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 60px;
          align-items: start;
        }

        /* Trust Badge */
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(206, 155, 40, 0.05) 100%);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 50px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-stars {
          display: flex;
          gap: 3px;
        }

        .badge-stars svg {
          width: 16px;
          height: 16px;
          color: #ce9b28;
          filter: drop-shadow(0 0 4px rgba(206, 155, 40, 0.5));
        }

        .badge-text {
          font-size: 13px;
          font-weight: 600;
          color: #ce9b28;
          letter-spacing: 0.5px;
        }

        /* Hero Title */
        .hero-title {
          font-size: 60px;
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 24px;
          letter-spacing: -1px;
        }

        .title-highlight {
          display: block;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 40%, #f0c850 60%, #E8B429 80%, #ce9b28 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 19px;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin: 0 0 40px;
          max-width: 520px;
        }

        /* Hero Features */
        .hero-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .feature-item:hover {
          background: rgba(206, 155, 40, 0.1);
          border-color: rgba(206, 155, 40, 0.3);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.25) 0%, rgba(232, 180, 41, 0.1) 100%);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 22px;
          height: 22px;
          color: #ce9b28;
        }

        .feature-item span {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        /* Mobile CTA */
        .hero-cta-mobile {
          display: none;
        }

        .cta-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 32px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          text-decoration: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(206, 155, 40, 0.3);
        }

        .cta-call-btn svg {
          width: 20px;
          height: 20px;
        }

        .cta-call-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(206, 155, 40, 0.5);
        }

        /* Form Wrapper */
        .hero-form-wrapper {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 
            0 30px 80px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.05);
        }

        .form-header {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          padding: 28px 32px;
          text-align: center;
        }

        .form-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin: 0 0 6px;
        }

        .form-header p {
          font-size: 14px;
          color: rgba(0,0,0,0.7);
          margin: 0;
        }

        /* ===== STATS SECTION ===== */
        .lp-stats {
          padding: 60px 0;
          background: #000;
          border-top: 1px solid rgba(206, 155, 40, 0.2);
          border-bottom: 1px solid rgba(206, 155, 40, 0.2);
          position: relative;
        }

        .lp-stats::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ce9b28, transparent);
        }

        .stats-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #f0c850 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, transparent, rgba(206, 155, 40, 0.4), transparent);
        }

        /* ===== HOW IT WORKS SECTION ===== */
        .lp-how-it-works {
          padding: 100px 0;
          background: linear-gradient(180deg, #0a0a0a 0%, #000 100%);
        }

        .steps-container {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 20px;
          margin-top: 60px;
        }

        .step-item {
          flex: 1;
          max-width: 300px;
          text-align: center;
          position: relative;
        }

        .step-number {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          color: #000;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }

        .step-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .step-item:hover .step-icon {
          background: rgba(206, 155, 40, 0.1);
          border-color: rgba(206, 155, 40, 0.4);
          transform: translateY(-5px);
        }

        .step-icon svg {
          width: 40px;
          height: 40px;
          color: #ce9b28;
        }

        .step-item h3 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px;
        }

        .step-item p {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin: 0;
        }

        .step-connector {
          flex: 0 0 60px;
          height: 20px;
          margin-top: 45px;
          color: rgba(206, 155, 40, 0.4);
        }

        .step-connector svg {
          width: 100%;
          height: 100%;
        }

        /* ===== WHY SECTION ===== */
        .lp-why {
          padding: 100px 0;
          background: #fff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-tag {
          display: inline-block;
          padding: 10px 24px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.12) 0%, rgba(232, 180, 41, 0.05) 100%);
          border: 1px solid rgba(206, 155, 40, 0.25);
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          color: #ce9b28;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 42px;
          font-weight: 800;
          color: #000;
          margin: 0;
          line-height: 1.2;
        }

        .section-header.light h2 {
          color: #fff;
        }

        .section-header.light .section-tag {
          background: rgba(206, 155, 40, 0.15);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .why-card {
          padding: 40px;
          background: #fafafa;
          border-radius: 24px;
          border: 1px solid #eee;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #ce9b28, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.12);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .why-card:hover::before {
          opacity: 1;
        }

        .why-card.featured {
          background: linear-gradient(135deg, #fff 0%, #fffdf5 100%);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .card-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 6px 14px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.05) 100%);
          border-radius: 20px;
          margin-bottom: 28px;
        }

        .card-icon svg {
          width: 32px;
          height: 32px;
          color: #ce9b28;
        }

        .why-card h3 {
          font-size: 22px;
          font-weight: 700;
          color: #000;
          margin: 0 0 14px;
        }

        .why-card p {
          font-size: 15px;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== TESTIMONIALS SECTION ===== */
        .lp-testimonials {
          padding: 100px 0;
          background: linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .testimonial-card {
          padding: 36px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          background: rgba(206, 155, 40, 0.05);
          border-color: rgba(206, 155, 40, 0.2);
          transform: translateY(-5px);
        }

        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .testimonial-stars svg {
          width: 18px;
          height: 18px;
          color: #ce9b28;
        }

        .testimonial-quote {
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          margin: 0 0 24px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #000;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .author-name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }

        .author-details {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        /* ===== FAQ SECTION ===== */
        .lp-faq {
          padding: 100px 0;
          background: #000;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          margin-bottom: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: rgba(206, 155, 40, 0.3);
        }

        .faq-item.open {
          background: rgba(206, 155, 40, 0.05);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          gap: 20px;
        }

        .faq-question h4 {
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          flex: 1;
        }

        .faq-toggle {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(206, 155, 40, 0.1);
          border-radius: 8px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-toggle svg {
          width: 16px;
          height: 16px;
          color: #ce9b28;
          transition: transform 0.3s ease;
        }

        .faq-item.open .faq-toggle {
          background: #ce9b28;
        }

        .faq-item.open .faq-toggle svg {
          color: #000;
        }

        .faq-item.open .faq-toggle svg line:first-child {
          transform: rotate(90deg);
          transform-origin: center;
          opacity: 0;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }

        .faq-item.open .faq-answer {
          max-height: 300px;
        }

        .faq-answer p {
          padding: 0 28px 24px;
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin: 0;
        }

        /* ===== CTA SECTION ===== */
        .lp-cta {
          padding: 100px 0;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #ce9b28 100%);
          background-size: 200% 200%;
          animation: shimmer 6s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .lp-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .cta-content {
          text-align: center;
          max-width: 650px;
          margin: 0 auto;
          position: relative;
        }

        .cta-content h2 {
          font-size: 44px;
          font-weight: 800;
          color: #000;
          margin: 0 0 18px;
        }

        .cta-content p {
          font-size: 18px;
          color: rgba(0,0,0,0.75);
          margin: 0 0 40px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex !important;
          gap: 18px !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
        }

        .lp-cta .btn-primary {
          display: inline-block !important;
          padding: 20px 48px !important;
          background: #000 !important;
          color: #fff !important;
          text-decoration: none !important;
          border-radius: 50px !important;
          font-size: 17px !important;
          font-weight: 700 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
          border: none !important;
        }

        .lp-cta .btn-primary:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important;
          color: #fff !important;
        }

        .lp-cta .btn-secondary {
          display: inline-flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 20px 36px !important;
          background: transparent !important;
          color: #000 !important;
          text-decoration: none !important;
          border-radius: 50px !important;
          font-size: 17px !important;
          font-weight: 700 !important;
          border: 2px solid #000 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .lp-cta .btn-secondary svg {
          width: 20px !important;
          height: 20px !important;
          flex-shrink: 0 !important;
        }

        .lp-cta .btn-secondary:hover {
          background: #000 !important;
          color: #fff !important;
        }
        
        .lp-cta .btn-secondary:hover svg {
          stroke: #fff !important;
        }

        /* ===== MOBILE STICKY CTA ===== */
        .mobile-sticky-cta {
          display: none !important;
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 999 !important;
          padding: 12px 16px !important;
          background: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-top: 1px solid rgba(206, 155, 40, 0.3) !important;
          gap: 12px !important;
          transform: translateY(100%) !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .mobile-sticky-cta.visible {
          transform: translateY(0) !important;
          display: flex !important;
        }

        .sticky-btn {
          flex: 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          padding: 16px 20px !important;
          border-radius: 12px !important;
          text-decoration: none !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          transition: all 0.3s ease !important;
        }

        .sticky-btn svg {
          width: 20px !important;
          height: 20px !important;
          flex-shrink: 0 !important;
        }

        .call-btn {
          background: transparent !important;
          color: #fff !important;
          border: 2px solid rgba(255,255,255,0.3) !important;
        }

        .call-btn:hover {
          border-color: #fff !important;
        }

        .quote-btn {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%) !important;
          color: #000 !important;
          border: none !important;
        }

        .quote-btn:hover {
          box-shadow: 0 4px 20px rgba(206, 155, 40, 0.4) !important;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .hero-form-wrapper {
            max-width: 520px;
            margin: 0 auto;
          }

          .hero-cta-mobile {
            display: block;
            margin-bottom: 40px;
          }

          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps-container {
            flex-direction: column;
            align-items: center;
          }

          .step-connector {
            transform: rotate(90deg);
            margin: 20px 0;
          }

          .mobile-sticky-cta {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .lp-hero {
            padding: 100px 0 60px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-features {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            flex-wrap: wrap;
            gap: 30px;
          }

          .stat-divider {
            display: none;
          }

          .stat-item {
            flex: 0 0 45%;
          }

          .stat-number {
            font-size: 36px;
          }

          .section-header h2 {
            font-size: 30px;
          }

          .why-grid {
            grid-template-columns: 1fr;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .cta-content h2 {
            font-size: 30px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .faq-question {
            padding: 20px 22px;
          }

          .faq-answer p {
            padding: 0 22px 20px;
          }

          /* Add padding for sticky CTA */
          .lp-cta {
            padding-bottom: 120px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 34px;
          }

          .trust-badge {
            padding: 10px 16px;
            gap: 8px;
          }

          .badge-text {
            font-size: 11px;
          }

          .step-item {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
