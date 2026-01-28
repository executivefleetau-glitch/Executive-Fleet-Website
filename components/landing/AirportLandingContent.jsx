"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cars } from "@/data/cars";
import QuoteFormSingle from "@/components/booking/QuoteFormSingle";

// Vehicle categories for tabs
const VEHICLE_CATEGORIES = ["Executive Sedan", "SUV", "First Class", "Vans"];

// Testimonials data
const testimonials = [
  {
    quote: "After a 14-hour flight from London, the last thing I wanted was hassle. My chauffeur was waiting exactly where he said he'd be, helped with my bags, and the S-Class was immaculate.",
    name: "James K.",
    location: "Toorak",
    role: "Business Executive"
  },
  {
    quote: "Traveling with two toddlers is stressful enough. The driver had both child seats installed perfectly, tracked our delayed flight, and was waiting with a smile. The V-Class had plenty of room.",
    name: "Sarah M.",
    location: "Melbourne CBD",
    role: "Family Traveler"
  },
  {
    quote: "4am pickup for an international flight. On time, professional, spotless BMW 7 Series. I've used them three times now and they've never let me down. My go-to for airport transfers.",
    name: "Michael T.",
    location: "South Yarra",
    role: "Frequent Flyer"
  }
];

// FAQ data
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
    question: "What's included in the price?",
    answer: "Our all-inclusive pricing covers the chauffeur, vehicle, meet & greet service, flight monitoring, complimentary waiting time, luggage assistance, tolls, and GST. No hidden fees or surge pricing."
  }
];

export default function AirportLandingContent() {
  const [activeCategory, setActiveCategory] = useState("Executive Sedan");
  const [openFaq, setOpenFaq] = useState(null);
  const [showSticky, setShowSticky] = useState(false);
  const [atForm, setAtForm] = useState(false);

  // Filter vehicles by category
  const filteredVehicles = cars.filter(car => car.category === activeCategory);

  // Scroll to quote form
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle scroll for sticky CTA bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past hero
      setShowSticky(window.scrollY > 600);
      
      // Check if user is at the quote form section
      const formSection = document.getElementById('quote-form');
      if (formSection) {
        const rect = formSection.getBoundingClientRect();
        setAtForm(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#ffffff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <Image
            src="/assets/imgs/banner/V-class+bags.webp"
            alt="Melbourne Airport Transfer - Luxury Chauffeur Service"
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)'
          }} />
        </div>

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          textAlign: 'center'
        }}>
          {/* Trust Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            border: '1px solid rgba(206,155,40,0.4)',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ce9b28">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#ce9b28', letterSpacing: '0.5px' }}>
              5-Star Rated Service
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: '800',
            color: '#ffffff',
            lineHeight: '1.1',
            margin: '0 0 24px',
            letterSpacing: '-1px'
          }}>
            Melbourne Airport
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #d4a832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Transfers
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.7',
            margin: '0 0 40px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Premium chauffeur service to and from Melbourne Tullamarine Airport. 
            Professional drivers, luxury vehicles, and real-time flight tracking — 
            arrive in comfort and style.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 48px',
              background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
              color: '#000000',
              fontSize: '16px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206,155,40,0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Get Your Free Quote
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>

          {/* Quick Features */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            marginTop: '48px'
          }}>
            {/* Flight Tracking */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '30px',
              border: '1px solid rgba(206,155,40,0.3)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Flight Tracking</span>
            </div>

            {/* Premium Fleet */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '30px',
              border: '1px solid rgba(206,155,40,0.3)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/>
                <circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Premium Fleet</span>
            </div>

            {/* Meet & Greet */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '30px',
              border: '1px solid rgba(206,155,40,0.3)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Meet & Greet</span>
            </div>

            {/* Free Waiting */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '30px',
              border: '1px solid rgba(206,155,40,0.3)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Free Waiting</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES / STATS ===== */}
      <section style={{
        background: '#000000',
        padding: '48px 24px',
        borderTop: '3px solid #ce9b28'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '48px'
        }}>
          {[
            { number: '2000+', label: 'Airport Transfers' },
            { number: '5.0', label: 'Google Rating' },
            { number: '100%', label: 'On-Time Guarantee' },
            { number: '24/7', label: 'Service Available' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '140px' }}>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '8px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section style={{
        padding: '100px 24px',
        background: '#fafafa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(206,155,40,0.1)',
              border: '1px solid rgba(206,155,40,0.3)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ce9b28',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              Why Choose Us
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#000000',
              margin: '0 0 16px',
              lineHeight: '1.2'
            }}>
              The Executive Fleet Difference
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Experience stress-free airport transfers with Melbourne's most trusted chauffeur service.
            </p>
          </div>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {/* Meet & Greet Service */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M20 8v6"/>
                  <path d="M23 11h-6"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>Meet & Greet Service</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>Your chauffeur waits in arrivals with a name board. No searching, no stress — just seamless pickup.</p>
            </div>

            {/* Real-Time Flight Tracking */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v2"/>
                  <path d="M12 20v2"/>
                  <path d="M2 12h2"/>
                  <path d="M20 12h2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>Real-Time Flight Tracking</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>We monitor your flight 24/7. Delayed? We adjust automatically. No extra charges, ever.</p>
            </div>

            {/* Premium Luxury Fleet */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>Premium Luxury Fleet</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>Mercedes, BMW, Audi — immaculate late-model vehicles with leather, climate control, and complimentary water.</p>
            </div>

            {/* All-Inclusive Pricing */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>All-Inclusive Pricing</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>Fixed rates with no surge pricing. Tolls, GST, waiting time — everything included upfront.</p>
            </div>

            {/* Child Seats Available */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12h.01"/>
                  <path d="M15 12h.01"/>
                  <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/>
                  <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>Child Seats Available</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>Baby capsules, baby seats, and boosters provided free. Just let us know when booking.</p>
            </div>

            {/* Free Waiting Time */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e5e5',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(206,155,40,0.15) 0%, rgba(206,155,40,0.05) 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 22h14"/>
                  <path d="M5 2h14"/>
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 12px' }}>Free Waiting Time</h3>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: '0' }}>60 minutes for domestic, 90 for international flights. Take your time through customs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VEHICLE SHOWCASE ===== */}
      <section style={{
        padding: '100px 24px',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(206,155,40,0.1)',
              border: '1px solid rgba(206,155,40,0.3)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ce9b28',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              Our Fleet
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#000000',
              margin: '0 0 16px',
              lineHeight: '1.2'
            }}>
              Premium Vehicles for Your Journey
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Choose from our immaculate fleet of luxury vehicles, each maintained to the highest standards.
            </p>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {VEHICLE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '14px 28px',
                  background: activeCategory === category ? '#000000' : 'transparent',
                  color: activeCategory === category ? '#ffffff' : '#333333',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: activeCategory === category ? 'none' : '2px solid #e5e5e5',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} style={{
                background: '#fafafa',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #e5e5e5',
                transition: 'all 0.3s ease'
              }}>
                {/* Vehicle Image */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}>
                  <Image
                    src={vehicle.imgSrc}
                    alt={vehicle.title}
                    width={280}
                    height={160}
                    style={{ objectFit: 'contain', maxHeight: '160px', width: 'auto' }}
                  />
                </div>
                {/* Vehicle Info */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#000000',
                    margin: '0 0 8px'
                  }}>
                    {vehicle.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666666',
                    margin: '0 0 16px',
                    lineHeight: '1.5'
                  }}>
                    {vehicle.details}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      color: '#333333'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                      </svg>
                      {vehicle.passengerDisplay || vehicle.passenger} passengers
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      color: '#333333'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ce9b28" strokeWidth="2">
                        <path d="M6 6h15l-1.5 9h-12z"/>
                        <circle cx="9" cy="19" r="1"/>
                        <circle cx="17" cy="19" r="1"/>
                        <path d="M6 6L4 2H2"/>
                      </svg>
                      {vehicle.luggageDisplay || vehicle.luggage} luggage
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={scrollToForm}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 44px',
                background: '#000000',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: '2px solid #ce9b28',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Request a Quote for Your Transfer
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{
        padding: '100px 24px',
        background: '#000000'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(206,155,40,0.15)',
              border: '1px solid rgba(206,155,40,0.3)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ce9b28',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              Testimonials
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 16px',
              lineHeight: '1.2'
            }}>
              What Our Clients Say
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Join thousands of satisfied travelers who trust Executive Fleet for their airport transfers.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={{
                padding: '36px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="#ce9b28">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.7',
                  margin: '0 0 24px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#000000'
                  }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <button
              onClick={scrollToForm}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 44px',
                background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
                color: '#000000',
                fontSize: '15px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(206,155,40,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Join Our Happy Customers
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section style={{
        padding: '100px 24px',
        background: '#fafafa'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(206,155,40,0.1)',
              border: '1px solid rgba(206,155,40,0.3)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ce9b28',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              FAQ
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#000000',
              margin: '0 0 16px',
              lineHeight: '1.2'
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Everything you need to know about our airport transfer service.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqItems.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: openFaq === i ? '2px solid #ce9b28' : '1px solid #e5e5e5',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#000000'
                  }}>
                    {faq.question}
                  </span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: openFaq === i ? '#ce9b28' : 'rgba(206,155,40,0.1)',
                    borderRadius: '8px',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={openFaq === i ? '#000000' : '#ce9b28'}
                      strokeWidth="2"
                      style={{
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 28px 24px',
                    fontSize: '15px',
                    color: '#666666',
                    lineHeight: '1.7'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA + QUOTE FORM ===== */}
      <section id="quote-form" style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(206,155,40,0.1)',
              border: '1px solid rgba(206,155,40,0.3)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ce9b28',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              Book Now
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#000000',
              margin: '0 0 16px',
              lineHeight: '1.2'
            }}>
              Get Your Free Quote
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Fill in your details below and receive a personalized quote within 30 minutes.
            </p>
          </div>

          {/* Quote Form */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid #e5e5e5',
            overflow: 'hidden'
          }}>
            <QuoteFormSingle initialData={{ serviceType: "Airport Transfer" }} />
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            marginTop: '40px'
          }}>
            {[
              { icon: '🔒', text: 'Secure Booking' },
              { icon: '✅', text: 'No Hidden Fees' },
              { icon: '📞', text: '24/7 Support' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#666666'
              }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontWeight: '500' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STICKY BOTTOM CTA BAR ===== */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: '12px 16px',
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(206,155,40,0.3)',
        display: 'flex',
        justifyContent: 'center',
        transform: showSticky ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Get Quote Button - Centered */}
        <button
          onClick={scrollToForm}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
            color: '#000000',
            border: 'none',
            borderRadius: '50px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(206,155,40,0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          {atForm ? 'Fill Quote Form' : 'Get Quote'}
        </button>
      </div>
    </div>
  );
}
