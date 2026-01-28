"use client";
import QuoteForm from "@/components/booking/QuoteForm";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WeddingCarHireContent() {
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
    { src: "/assets/imgs/banner/premium-wedding-b.jpg", alt: "Luxury wedding car Melbourne", caption: "Make your grand entrance in style" },
    { src: "/assets/imgs/fleet/Mercedes GLS.jpg", alt: "Mercedes GLS wedding car", caption: "Mercedes GLS - Elegance for your special day" },
    { src: "/assets/imgs/fleet/BMW 5 series.webp", alt: "BMW 5 Series wedding", caption: "BMW 5 Series - Sophisticated wedding transport" },
    { src: "/assets/imgs/fleet/BMW x7.webp", alt: "BMW X7 wedding car", caption: "BMW X7 - Spacious luxury for bridal parties" },
  ];

  const faqItems = [
    {
      question: "Can you decorate the vehicle for our wedding?",
      answer: "Yes! We offer ribbon decorations in your wedding colors at no extra charge. Fresh flowers can be arranged with advance notice. We work with you to ensure the vehicle perfectly complements your wedding aesthetic."
    },
    {
      question: "How long can we hire the car for?",
      answer: "We offer flexible packages from ceremony-only (2-3 hours) to full-day hire (8+ hours). Most couples book 4-6 hours to cover the ceremony, photos, and reception arrival. We'll customize a package to your timeline."
    },
    {
      question: "Do you allow time for photos with the car?",
      answer: "Absolutely! We factor in photo time with every booking. Your chauffeur will ensure the car is positioned perfectly for photos and will assist your photographer. It's your day - take all the photos you need."
    },
    {
      question: "Can you transport our entire bridal party?",
      answer: "Yes, we can coordinate multiple vehicles for bridesmaids, groomsmen, and family. Our fleet includes sedans for couples and the Mercedes V-Class for larger groups. We ensure everyone arrives coordinated and on time."
    },
    {
      question: "Is champagne service available?",
      answer: "Yes, we offer complimentary champagne glasses and can arrange premium champagne service upon request. Toast to your new life together in luxury comfort. Please advise at booking for alcohol service arrangements."
    },
    {
      question: "What if we're running behind schedule?",
      answer: "Weddings rarely run perfectly to time - we understand! Our chauffeurs are patient and flexible. Extended time is charged at fair hourly rates. We're there to reduce stress, not add to it."
    }
  ];

  const testimonials = [
    {
      quote: "The white ribbon on the black Mercedes looked absolutely stunning in our photos. Our chauffeur was so patient during the photo session and made sure we had champagne ready when we got back in. Perfect service!",
      name: "Emma & Daniel",
      title: "",
      location: "Brighton Wedding"
    },
    {
      quote: "We needed three cars for our bridal party and Executive Fleet coordinated everything flawlessly. All arrived together, all immaculate. The guests were impressed and it made the day feel extra special.",
      name: "Sarah T.",
      title: "Bride",
      location: "Yarra Valley"
    },
    {
      quote: "Despite traffic making us 20 minutes late, our driver never rushed us and still got us to the reception right on cue. He knew alternate routes and kept us calm. Worth every cent.",
      name: "Michael & Jessica",
      title: "",
      location: "Melbourne CBD"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="lp-hero" id="top">
        <div className="hero-bg">
          <Image
            src="/assets/imgs/banner/premium-wedding-b.jpg"
            alt="Luxury Wedding Car Hire Melbourne"
            fill
            priority
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="hero-overlay wedding-overlay"></div>
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
                <span className="badge-text">Melbourne's Premier Wedding Car Service</span>
              </div>

              <h1 className="hero-title">
                Wedding Car Hire
                <span className="title-highlight">Melbourne</span>
              </h1>
              
              <p className="hero-subtitle">
                Your perfect day deserves the perfect arrival. Elegant vehicles, 
                romantic touches, and a chauffeur who understands your special moment.
              </p>
              
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <span>Romantic Touches</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <span>Luxury Vehicles</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                  <span>Photo Ready</span>
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
                  <span>Bridal Party Fleet</span>
                </div>
              </div>

              <div className="hero-cta-mobile">
                <a 
                  href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20inquire%20about%20wedding%20car%20hire" 
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
                <h2>Get Your Wedding Quote</h2>
                <p>No obligation - Response within 30 mins</p>
              </div>
              <QuoteForm variant="landing" preselectedService="wedding" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lp-stats">
        <div className="landing-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Weddings Served</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5.0</span>
              <span className="stat-label">Google Rating</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Happy Couples</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Premium Vehicles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="lp-problem-solution">
        <div className="landing-container">
          <div className="problem-solution-grid">
            <div className="problem-content">
              <span className="section-tag">The Concern</span>
              <h2>Your Wedding Day Deserves Better</h2>
              <ul className="problem-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Unreliable transport adding stress to your big day</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Ordinary vehicles that don't match your vision</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Rushed drivers who don't understand wedding timelines</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>Coordinating multiple cars for your bridal party</span>
                </li>
              </ul>
            </div>
            <div className="solution-content">
              <span className="section-tag gold">The Promise</span>
              <h2>Executive Fleet Wedding Service</h2>
              <ul className="solution-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Stress-free, punctual service - we handle everything</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Immaculate luxury vehicles with ribbon decorations</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Patient chauffeurs who allow time for photos</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <span>Coordinated fleet for entire bridal party</span>
                </li>
              </ul>
              <a href="#top" className="solution-cta">
                Get Wedding Quote
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
            <h2>How Wedding Bookings Work</h2>
            <p>From inquiry to your grand arrival</p>
          </div>
          
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Share Your Vision</h3>
              <p>Tell us your wedding date, venue details, and vehicle preferences. We'll create a custom package.</p>
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3>Confirm & Secure</h3>
              <p>Lock in your date with a deposit. We'll confirm all details and coordinate with your timeline.</p>
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>Your Perfect Day</h3>
              <p>Arrive in style with a decorated vehicle, patient chauffeur, and memories to last a lifetime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="lp-why">
        <div className="landing-container">
          <div className="section-header">
            <span className="section-tag">Why Executive Fleet</span>
            <h2>Your Perfect Wedding Day Transport</h2>
          </div>
          
          <div className="why-grid">
            <div className="why-card featured">
              <div className="card-badge">Most Popular</div>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>Stunning Vehicles</h3>
              <p>Mercedes S-Class, BMW 7-Series, and luxury SUVs - all immaculately presented for your big day with ribbon decorations included.</p>
            </div>
            
            <div className="why-card featured">
              <div className="card-badge">Romantic</div>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Romantic Details</h3>
              <p>Champagne service, ribbon decorations in your colors, and red carpet treatment available on request. It's your day.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Professional Chauffeurs</h3>
              <p>Impeccably dressed chauffeurs who understand the importance of your special day and every moment matters.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                </svg>
              </div>
              <h3>Flexible Packages</h3>
              <p>From ceremony only to full-day hire. We'll work around your schedule perfectly with custom timing.</p>
            </div>
            
            <div className="why-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <h3>Photo Opportunities</h3>
              <p>We allow dedicated time for photos with the vehicle. Your memories deserve the perfect backdrop.</p>
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
              <h3>Bridal Party Transport</h3>
              <p>Multiple vehicles available for bridesmaids, groomsmen, and family members. Coordinated arrivals guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Gallery */}
      <section className="lp-gallery">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">Wedding Fleet</span>
            <h2>Our Wedding Vehicles</h2>
            <p>Luxury cars that photograph beautifully</p>
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
            <span className="section-tag">Happy Couples</span>
            <h2>Wedding Day Stories</h2>
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

      {/* Guarantee Section */}
      <section className="lp-guarantee">
        <div className="landing-container">
          <div className="guarantee-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h4>Ribbon Decorations</h4>
              <p>Complimentary ribbons in your wedding colors</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h4>Patient Service</h4>
              <p>Time for photos and moments that matter</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 21h8M12 21V11M17 6l-5 5-5-5M17 3l-5 5-5-5"/>
                </svg>
              </div>
              <h4>Champagne Service</h4>
              <p>Toast to your new life in luxury</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.97"/>
                </svg>
              </div>
              <h4>Fully Insured</h4>
              <p>Comprehensive coverage for peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="lp-faq">
        <div className="landing-container">
          <div className="section-header light">
            <span className="section-tag">FAQ</span>
            <h2>Wedding Car Questions</h2>
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
            <h2>Make Your Wedding Day Perfect</h2>
            <p>
              Join 300+ happy couples who trusted Executive Fleet for their special day. Get your free quote today.
            </p>
            <div className="cta-buttons">
              <a href="#top" className="btn-primary">Get Wedding Quote</a>
              <a 
                href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20inquire%20about%20wedding%20car%20hire" 
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
          href="https://wa.me/61431951996?text=Hi%2C%20I'd%20like%20to%20inquire%20about%20wedding%20car%20hire" 
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
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          Get Quote
        </a>
      </div>

      <style jsx global>{`
        .lp-hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 120px 0 80px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; z-index: -1; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.85) 100%); }
        .hero-glow { position: absolute; top: 20%; left: -10%; width: 50%; height: 60%; background: radial-gradient(ellipse, rgba(206, 155, 40, 0.08) 0%, transparent 70%); pointer-events: none; }
        .hero-grid { display: grid; grid-template-columns: 1fr 480px; gap: 60px; align-items: start; }
        .hero-subtitle { font-size: 19px; color: rgba(255,255,255,0.75); line-height: 1.7; margin: 0 0 40px; max-width: 520px; }
        .hero-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
        .feature-item { display: flex; align-items: center; gap: 14px; padding: 16px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; transition: all 0.4s ease; }
        .feature-item:hover { background: rgba(206, 155, 40, 0.1); border-color: rgba(206, 155, 40, 0.3); transform: translateY(-2px); }
        .feature-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(206, 155, 40, 0.25) 0%, rgba(232, 180, 41, 0.1) 100%); border-radius: 12px; flex-shrink: 0; }
        .feature-icon svg { width: 22px; height: 22px; color: #ce9b28; }
        .feature-item span { font-size: 14px; font-weight: 600; color: #fff; }
        .hero-cta-mobile { display: none; }
        .cta-whatsapp-btn { display: inline-flex; align-items: center; gap: 12px; padding: 18px 32px; background: #25D366; color: #fff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; transition: all 0.4s ease; box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3); }
        .cta-whatsapp-btn svg { width: 22px; height: 22px; }
        .cta-whatsapp-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 40px rgba(37, 211, 102, 0.5); background: #20bd5a; }
        .hero-form-wrapper { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .form-header { background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); padding: 28px 32px; text-align: center; }
        .form-header h2 { font-size: 24px; font-weight: 700; color: #000; margin: 0 0 6px; }
        .form-header p { font-size: 14px; color: rgba(0,0,0,0.7); margin: 0; }
        .lp-stats { padding: 60px 0; background: #000; border-top: 1px solid rgba(206, 155, 40, 0.2); border-bottom: 1px solid rgba(206, 155, 40, 0.2); }
        .lp-problem-solution { padding: 100px 0; background: #fff; }
        .problem-solution-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .problem-content, .solution-content { padding: 48px; border-radius: 24px; }
        .problem-content { background: #fafafa; border: 1px solid #eee; }
        .solution-content { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); position: relative; }
        .solution-content::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #ce9b28, #E8B429, #ce9b28); }
        .problem-content h2 { color: #1a1a1a; font-size: 32px; font-weight: 800; margin: 16px 0 32px; }
        .solution-content h2 { color: #fff; font-size: 32px; font-weight: 800; margin: 16px 0 32px; }
        .section-tag.gold { background: linear-gradient(135deg, rgba(206, 155, 40, 0.2) 0%, rgba(206, 155, 40, 0.1) 100%); border-color: rgba(206, 155, 40, 0.4); }
        .problem-list, .solution-list { list-style: none; padding: 0; margin: 0; }
        .problem-list li, .solution-list li { display: flex; align-items: flex-start; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .solution-list li { border-bottom-color: rgba(255,255,255,0.1); }
        .problem-list li:last-child, .solution-list li:last-child { border-bottom: none; }
        .problem-list svg { width: 24px; height: 24px; color: #e53935; flex-shrink: 0; margin-top: 2px; }
        .solution-list svg { width: 24px; height: 24px; color: #25D366; flex-shrink: 0; margin-top: 2px; }
        .problem-list span { font-size: 16px; color: #444; line-height: 1.5; }
        .solution-list span { font-size: 16px; color: rgba(255,255,255,0.85); line-height: 1.5; }
        .solution-cta { display: inline-flex; align-items: center; gap: 12px; margin-top: 32px; padding: 18px 36px; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); color: #000; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; transition: all 0.4s ease; }
        .solution-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(206, 155, 40, 0.4); }
        .solution-cta svg { width: 20px; height: 20px; }
        .lp-how-it-works { padding: 100px 0; background: linear-gradient(180deg, #0a0a0a 0%, #000 100%); }
        .steps-container { display: flex; align-items: flex-start; justify-content: center; gap: 20px; margin-top: 60px; }
        .step-item { flex: 1; max-width: 300px; text-align: center; position: relative; }
        .step-number { position: absolute; top: -12px; right: -12px; width: 36px; height: 36px; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #000; z-index: 2; box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4); }
        .step-icon { width: 90px; height: 90px; margin: 0 auto 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(206, 155, 40, 0.2); border-radius: 24px; display: flex; align-items: center; justify-content: center; transition: all 0.4s ease; }
        .step-item:hover .step-icon { background: rgba(206, 155, 40, 0.1); border-color: rgba(206, 155, 40, 0.4); transform: translateY(-5px); }
        .step-icon svg { width: 40px; height: 40px; color: #ce9b28; }
        .step-item h3 { font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 12px; }
        .step-item p { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0; }
        .step-connector { flex: 0 0 60px; height: 20px; margin-top: 45px; color: rgba(206, 155, 40, 0.4); }
        .lp-why { padding: 100px 0; background: #fff; }
        .lp-gallery { padding: 100px 0; background: linear-gradient(180deg, #000 0%, #0a0a0a 100%); }
        .gallery-container { max-width: 900px; margin: 0 auto; }
        .gallery-main { position: relative; border-radius: 24px; overflow: hidden; margin-bottom: 24px; }
        .gallery-image-wrapper { position: relative; aspect-ratio: 16/9; }
        .gallery-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff; font-size: 16px; font-weight: 500; }
        .gallery-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .gallery-thumb { position: relative; aspect-ratio: 16/10; border-radius: 12px; overflow: hidden; cursor: pointer; border: 3px solid transparent; transition: all 0.3s ease; background: none; padding: 0; }
        .gallery-thumb.active { border-color: #ce9b28; }
        .gallery-thumb:hover { opacity: 0.8; }
        .gallery-nav { display: flex; align-items: center; justify-content: center; gap: 24px; }
        .gallery-nav-btn { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; cursor: pointer; transition: all 0.3s ease; }
        .gallery-nav-btn:hover { background: rgba(206, 155, 40, 0.2); border-color: rgba(206, 155, 40, 0.4); }
        .gallery-nav-btn svg { width: 24px; height: 24px; color: #fff; }
        .gallery-counter { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 500; }
        .lp-testimonials { padding: 100px 0; background: linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%); }
        .lp-guarantee { padding: 80px 0; background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
        .guarantee-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .guarantee-item { text-align: center; }
        .guarantee-icon { width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.05) 100%); border-radius: 50%; border: 2px solid rgba(206, 155, 40, 0.2); }
        .guarantee-icon svg { width: 40px; height: 40px; color: #ce9b28; }
        .guarantee-item h4 { font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px; }
        .guarantee-item p { font-size: 14px; color: #666; margin: 0; line-height: 1.5; }
        .lp-faq { padding: 100px 0; background: #000; }
        .lp-cta { padding: 100px 0; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #ce9b28 100%); background-size: 200% 200%; animation: shimmer 6s ease-in-out infinite; position: relative; }
        @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .lp-cta::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); pointer-events: none; }
        .cta-content { text-align: center; max-width: 650px; margin: 0 auto; position: relative; }
        .cta-content h2 { font-size: 44px; font-weight: 800; color: #000; margin: 0 0 18px; }
        .cta-content p { font-size: 18px; color: rgba(0,0,0,0.75); margin: 0 0 40px; line-height: 1.6; }
        @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr; gap: 50px; } .hero-form-wrapper { max-width: 520px; margin: 0 auto; } .hero-cta-mobile { display: block; margin-bottom: 40px; } .problem-solution-grid { grid-template-columns: 1fr; gap: 40px; } .steps-container { flex-direction: column; align-items: center; } .step-connector { transform: rotate(90deg); margin: 20px 0; } .guarantee-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .lp-hero { padding: 100px 0 60px; } .hero-features { grid-template-columns: 1fr; } .problem-content, .solution-content { padding: 32px; } .problem-content h2, .solution-content h2 { font-size: 26px; } .gallery-thumbs { grid-template-columns: repeat(2, 1fr); } .guarantee-grid { grid-template-columns: 1fr; gap: 30px; } .cta-content h2 { font-size: 30px; } .lp-cta { padding-bottom: 120px; } }
        @media (max-width: 480px) { .step-item { max-width: 100%; } }
      `}</style>
    </>
  );
}
