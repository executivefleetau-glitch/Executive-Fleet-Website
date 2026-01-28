"use client";
import QuoteForm from "@/components/booking/QuoteForm";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AirportTransferContent() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const galleryImages = [
    { src: "/assets/imgs/banner/V-class+bags.webp", alt: "Mercedes V-Class with luggage", caption: "Spacious Mercedes V-Class - Perfect for families and groups" },
    { src: "/assets/imgs/fleet/Mercedes GLS.jpg", alt: "Mercedes GLS SUV", caption: "Mercedes GLS - Luxury SUV for premium comfort" },
    { src: "/assets/imgs/fleet/BMW 5 series.webp", alt: "BMW 5 Series", caption: "BMW 5 Series - Executive elegance" },
    { src: "/assets/imgs/banner/airport-transfer.webp", alt: "Airport transfer service", caption: "Professional meet & greet at Tullamarine" },
  ];

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
                <a 
                  href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20book%20an%20airport%20transfer" 
                  className="cta-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us Now
                </a>
              </div>
            </div>
            
            <div className="hero-form-wrapper">
              <div className="form-header">
                <h2>Get Your Free Quote</h2>
                <p>No obligation - Response within 30 mins</p>
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

      {/* Problem/Solution Section - NEW */}
      <section className="lp-problem-solution">
        <div className="landing-container">
          <div className="problem-solution-grid">
            <div className="problem-content">
              <span className="section-tag">The Problem</span>
              <h2>Tired of Stressful Airport Pickups?</h2>
              <ul className="problem-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Unreliable rideshares with surge pricing after long flights</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Waiting in taxi queues with heavy luggage</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Hidden fees and unpredictable costs</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>No one tracking your flight for delays</span>
                </li>
              </ul>
            </div>
            <div className="solution-content">
              <span className="section-tag gold">The Solution</span>
              <h2>Executive Fleet Airport Transfers</h2>
              <ul className="solution-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Fixed, all-inclusive pricing - no surprises</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Chauffeur waiting with your name in arrivals</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Real-time flight tracking - we adjust to delays</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Luxury vehicles, professional service</span>
                </li>
              </ul>
              <a href="#top" className="solution-cta">
                Get Your Free Quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="lp-how-it-works">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">Simple Process</span>
            <h2>How It Works</h2>
            <p>From booking to arrival, we make it effortless</p>
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
              <p>Fill out our quick form or WhatsApp us. Response within 30 minutes with a confirmed quote.</p>
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

      {/* Service Gallery - NEW */}
      <section className="lp-gallery">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">Our Fleet</span>
            <h2>Travel in Premium Comfort</h2>
            <p>Explore our luxury vehicles available for your airport transfer</p>
          </div>
          
          <div className="gallery-container">
            <div className="gallery-main">
              <div className="gallery-image-wrapper">
                <Image
                  src={galleryImages[activeGalleryIndex].src}
                  alt={galleryImages[activeGalleryIndex].alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={85}
                />
              </div>
              <div className="gallery-caption">
                {galleryImages[activeGalleryIndex].caption}
              </div>
            </div>
            
            <div className="gallery-thumbs">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${activeGalleryIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveGalleryIndex(index)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
            
            <div className="gallery-nav">
              <button 
                className="gallery-nav-btn"
                onClick={() => setActiveGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <span className="gallery-counter">{activeGalleryIndex + 1} / {galleryImages.length}</span>
              <button 
                className="gallery-nav-btn"
                onClick={() => setActiveGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
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

      {/* Guarantee Section - NEW */}
      <section className="lp-guarantee">
        <div className="landing-container">
          <div className="guarantee-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9,12 11,14 15,10"/>
                </svg>
              </div>
              <h4>Fully Insured</h4>
              <p>Comprehensive insurance coverage for your peace of mind</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h4>On-Time Guarantee</h4>
              <p>We're there when we say - punctuality is our promise</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M7 15h0M12 15h0"/>
                  <path d="M2 10h20"/>
                </svg>
              </div>
              <h4>Fixed Pricing</h4>
              <p>All-inclusive quotes - no hidden fees or surge pricing</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.97"/>
                </svg>
              </div>
              <h4>Licensed Operators</h4>
              <p>Accredited commercial passenger vehicles</p>
            </div>
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
            </p>
            <div className="cta-buttons">
              <a href="#top" className="btn-primary">Get Free Quote</a>
              <a 
                href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20book%20an%20airport%20transfer" 
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className={`mobile-sticky-cta ${showStickyBar ? 'visible' : ''}`}>
        <a 
          href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20book%20an%20airport%20transfer" 
          className="sticky-btn whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
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
          background: linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.85) 100%);
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

        .hero-subtitle {
          font-size: 19px;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin: 0 0 40px;
          max-width: 520px;
        }

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

        .hero-cta-mobile {
          display: none;
        }

        .cta-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 32px;
          background: #25D366;
          color: #fff;
          text-decoration: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
        }

        .cta-whatsapp-btn svg {
          width: 22px;
          height: 22px;
        }

        .cta-whatsapp-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(37, 211, 102, 0.5);
          background: #20bd5a;
        }

        .hero-form-wrapper {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05);
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

        /* ===== PROBLEM/SOLUTION SECTION ===== */
        .lp-problem-solution {
          padding: 100px 0;
          background: #fff;
        }

        .problem-solution-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .problem-content,
        .solution-content {
          padding: 48px;
          border-radius: 24px;
        }

        .problem-content {
          background: #fafafa;
          border: 1px solid #eee;
        }

        .solution-content {
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }

        .solution-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ce9b28, #E8B429, #ce9b28);
        }

        .problem-content h2,
        .solution-content h2 {
          font-size: 32px;
          font-weight: 800;
          margin: 16px 0 32px;
          line-height: 1.2;
        }

        .problem-content h2 {
          color: #1a1a1a;
        }

        .solution-content h2 {
          color: #fff;
        }

        .section-tag.gold {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.2) 0%, rgba(206, 155, 40, 0.1) 100%);
          border-color: rgba(206, 155, 40, 0.4);
        }

        .problem-list,
        .solution-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .problem-list li,
        .solution-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .solution-list li {
          border-bottom-color: rgba(255,255,255,0.1);
        }

        .problem-list li:last-child,
        .solution-list li:last-child {
          border-bottom: none;
        }

        .problem-list svg {
          width: 24px;
          height: 24px;
          color: #e53935;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .solution-list svg {
          width: 24px;
          height: 24px;
          color: #25D366;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .problem-list span {
          font-size: 16px;
          color: #444;
          line-height: 1.5;
        }

        .solution-list span {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          line-height: 1.5;
        }

        .solution-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 32px;
          padding: 18px 36px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          text-decoration: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          transition: all 0.4s ease;
        }

        .solution-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(206, 155, 40, 0.4);
        }

        .solution-cta svg {
          width: 20px;
          height: 20px;
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

        /* ===== GALLERY SECTION ===== */
        .lp-gallery {
          padding: 100px 0;
          background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
        }

        .gallery-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .gallery-main {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .gallery-image-wrapper {
          position: relative;
          aspect-ratio: 16/9;
        }

        .gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          color: #fff;
          font-size: 16px;
          font-weight: 500;
        }

        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .gallery-thumb {
          position: relative;
          aspect-ratio: 16/10;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          background: none;
          padding: 0;
        }

        .gallery-thumb.active {
          border-color: #ce9b28;
        }

        .gallery-thumb:hover {
          opacity: 0.8;
        }

        .gallery-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .gallery-nav-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-nav-btn:hover {
          background: rgba(206, 155, 40, 0.2);
          border-color: rgba(206, 155, 40, 0.4);
        }

        .gallery-nav-btn svg {
          width: 24px;
          height: 24px;
          color: #fff;
        }

        .gallery-counter {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        /* ===== TESTIMONIALS SECTION ===== */
        .lp-testimonials {
          padding: 100px 0;
          background: linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
        }

        /* ===== GUARANTEE SECTION ===== */
        .lp-guarantee {
          padding: 80px 0;
          background: #fff;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }

        .guarantee-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .guarantee-item {
          text-align: center;
        }

        .guarantee-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.05) 100%);
          border-radius: 50%;
          border: 2px solid rgba(206, 155, 40, 0.2);
        }

        .guarantee-icon svg {
          width: 40px;
          height: 40px;
          color: #ce9b28;
        }

        .guarantee-item h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px;
        }

        .guarantee-item p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        /* ===== FAQ SECTION ===== */
        .lp-faq {
          padding: 100px 0;
          background: #000;
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

          .problem-solution-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .steps-container {
            flex-direction: column;
            align-items: center;
          }

          .step-connector {
            transform: rotate(90deg);
            margin: 20px 0;
          }

          .guarantee-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .lp-hero {
            padding: 100px 0 60px;
          }

          .hero-features {
            grid-template-columns: 1fr;
          }

          .problem-content,
          .solution-content {
            padding: 32px;
          }

          .problem-content h2,
          .solution-content h2 {
            font-size: 26px;
          }

          .gallery-thumbs {
            grid-template-columns: repeat(2, 1fr);
          }

          .guarantee-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .cta-content h2 {
            font-size: 30px;
          }

          .lp-cta {
            padding-bottom: 120px;
          }
        }

        @media (max-width: 480px) {
          .step-item {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
