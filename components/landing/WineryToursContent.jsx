"use client";
import QuoteForm from "@/components/booking/QuoteForm";
import Image from "next/image";

export default function WineryToursContent() {
  return (
    <>
      <section className="lp-hero" id="top">
        <div className="hero-bg">
          <Image src="/assets/hero/executive-fleet-hero-bg.webp" alt="Yarra Valley Winery Tours Melbourne" fill priority quality={80} style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className="hero-overlay"></div>
        </div>
        <div className="landing-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="trust-badge">
                <div className="badge-stars">{[...Array(5)].map((_, i) => <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
                <span className="badge-text">Melbourne's Premier Wine Tour Service</span>
              </div>
              <h1 className="hero-title">Yarra Valley<span className="title-highlight">Winery Tours</span></h1>
              <p className="hero-subtitle">Explore Victoria's finest wineries in style. Luxury transport, expert local knowledge, and a safe journey home after tasting the best wines.</p>
              <div className="hero-features">
                <div className="feature-item"><div className="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 21h8M12 21V11M17 6l-5 5-5-5M17 3l-5 5-5-5"/></svg></div><span>Wine Expert Guides</span></div>
                <div className="feature-item"><div className="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><span>Full Day Tours</span></div>
                <div className="feature-item"><div className="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><span>Private Groups</span></div>
                <div className="feature-item"><div className="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><span>Custom Itinerary</span></div>
              </div>
              <div className="hero-cta-mobile"><a href="tel:+61431951996" className="cta-call-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call Now: +61 431 951 996</a></div>
            </div>
            <div className="hero-form-wrapper">
              <div className="form-header"><h2>Get Your Free Quote</h2><p>No obligation • Response within 30 mins</p></div>
              <QuoteForm variant="landing" preselectedService="winery" />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-stats">
        <div className="landing-container">
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-number">500+</span><span className="stat-label">Wine Tours</span></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><span className="stat-number">5.0</span><span className="stat-label">Google Rating</span></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><span className="stat-number">50+</span><span className="stat-label">Partner Wineries</span></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><span className="stat-number">100%</span><span className="stat-label">Safe Returns</span></div>
          </div>
        </div>
      </section>

      <section className="lp-why">
        <div className="landing-container">
          <div className="section-header"><span className="section-tag">Why Executive Fleet</span><h2>The Ultimate Wine Tour Experience</h2></div>
          <div className="why-grid">
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21h8M12 21V11M17 6l-5 5-5-5M17 3l-5 5-5-5"/></svg></div><h3>Local Wine Knowledge</h3><p>Our chauffeurs know the Yarra Valley intimately. Get insider tips on the best cellar doors and hidden gems.</p></div>
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div><h3>Flexible Itineraries</h3><p>Visit your favorite wineries or let us create a custom route. Lunch stops, cheese tastings - we arrange it all.</p></div>
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><h3>Groups Welcome</h3><p>From couples to corporate groups. We have vehicles for 2-12 passengers to suit your party.</p></div>
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><h3>Luxury Vehicles</h3><p>Travel in comfort in our Mercedes and BMW fleet. Chilled water and snacks available during your tour.</p></div>
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><h3>Safe Journey Home</h3><p>Enjoy your tastings without worry. We'll get you home safely no matter how many wines you sample.</p></div>
            <div className="why-card"><div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><h3>Full Day Tours</h3><p>Typically 8am pickup, return by 6pm. Half-day options also available for shorter adventures.</p></div>
          </div>
        </div>
      </section>

      <section className="lp-cta">
        <div className="landing-container">
          <div className="cta-content">
            <h2>Ready for a Day in Wine Country?</h2>
            <p>Book your private Yarra Valley wine tour today.</p>
            <div className="cta-buttons">
              <a href="#top" className="btn-primary">Get Free Quote</a>
              <a href="tel:+61431951996" className="btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+61 431 951 996</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .lp-hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 100px 0 80px; }
        .hero-bg { position: absolute; inset: 0; z-index: -1; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%); }
        .hero-grid { display: grid; grid-template-columns: 1fr 480px; gap: 60px; align-items: start; }
        .trust-badge { display: inline-flex; align-items: center; gap: 12px; padding: 10px 20px; background: rgba(206, 155, 40, 0.1); border: 1px solid rgba(206, 155, 40, 0.3); border-radius: 50px; margin-bottom: 28px; }
        .badge-stars { display: flex; gap: 2px; }
        .badge-stars svg { width: 16px; height: 16px; color: #ce9b28; }
        .badge-text { font-size: 13px; font-weight: 600; color: #ce9b28; letter-spacing: 0.5px; }
        .hero-title { font-size: 56px; font-weight: 800; color: #fff; line-height: 1.1; margin: 0 0 24px; }
        .title-highlight { display: block; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 50%, #ce9b28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: 18px; color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 36px; max-width: 500px; }
        .hero-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
        .feature-item { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; transition: all 0.3s ease; }
        .feature-item:hover { background: rgba(206, 155, 40, 0.1); border-color: rgba(206, 155, 40, 0.3); }
        .feature-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(206, 155, 40, 0.2) 0%, rgba(232, 180, 41, 0.1) 100%); border-radius: 10px; }
        .feature-icon svg { width: 20px; height: 20px; color: #ce9b28; }
        .feature-item span { font-size: 14px; font-weight: 600; color: #fff; }
        .hero-cta-mobile { display: none; }
        .cta-call-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 28px; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); color: #000; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; transition: all 0.3s ease; }
        .cta-call-btn svg { width: 20px; height: 20px; }
        .cta-call-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(206, 155, 40, 0.4); }
        .hero-form-wrapper { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .form-header { background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); padding: 28px 32px; text-align: center; }
        .form-header h2 { font-size: 24px; font-weight: 700; color: #000; margin: 0 0 6px; }
        .form-header p { font-size: 14px; color: rgba(0,0,0,0.7); margin: 0; }
        .lp-stats { padding: 50px 0; background: #000; border-top: 1px solid rgba(206, 155, 40, 0.2); border-bottom: 1px solid rgba(206, 155, 40, 0.2); }
        .stats-grid { display: flex; justify-content: center; align-items: center; gap: 50px; }
        .stat-item { text-align: center; }
        .stat-number { display: block; font-size: 42px; font-weight: 800; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 500; }
        .stat-divider { width: 1px; height: 50px; background: rgba(206, 155, 40, 0.3); }
        .lp-why { padding: 100px 0; background: #fff; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-tag { display: inline-block; padding: 8px 20px; background: linear-gradient(135deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.05) 100%); border: 1px solid rgba(206, 155, 40, 0.2); border-radius: 50px; font-size: 12px; font-weight: 700; color: #ce9b28; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
        .section-header h2 { font-size: 40px; font-weight: 800; color: #000; margin: 0; line-height: 1.2; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .why-card { padding: 36px; background: #fafafa; border-radius: 20px; border: 1px solid #eee; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .why-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.1); border-color: rgba(206, 155, 40, 0.3); }
        .card-icon { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.05) 100%); border-radius: 16px; margin-bottom: 24px; }
        .card-icon svg { width: 28px; height: 28px; color: #ce9b28; }
        .why-card h3 { font-size: 20px; font-weight: 700; color: #000; margin: 0 0 12px; }
        .why-card p { font-size: 15px; color: #666; line-height: 1.7; margin: 0; }
        .lp-cta { padding: 100px 0; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); }
        .cta-content { text-align: center; max-width: 600px; margin: 0 auto; }
        .cta-content h2 { font-size: 40px; font-weight: 800; color: #000; margin: 0 0 16px; }
        .cta-content p { font-size: 18px; color: rgba(0,0,0,0.7); margin: 0 0 36px; }
        .cta-buttons { display: flex; gap: 16px; justify-content: center; }
        .btn-primary { padding: 18px 40px; background: #000; color: #fff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .btn-secondary { display: flex; align-items: center; gap: 10px; padding: 18px 32px; background: transparent; color: #000; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; border: 2px solid #000; transition: all 0.3s ease; }
        .btn-secondary svg { width: 20px; height: 20px; }
        .btn-secondary:hover { background: #000; color: #fff; }
        @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr; gap: 50px; } .hero-form-wrapper { max-width: 500px; margin: 0 auto; } .hero-cta-mobile { display: block; margin-bottom: 40px; } .why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .lp-hero { padding: 100px 0 60px; } .hero-title { font-size: 38px; } .hero-subtitle { font-size: 16px; } .hero-features { grid-template-columns: 1fr; } .stats-grid { flex-wrap: wrap; gap: 30px; } .stat-divider { display: none; } .stat-item { flex: 0 0 45%; } .stat-number { font-size: 32px; } .section-header h2 { font-size: 28px; } .why-grid { grid-template-columns: 1fr; } .cta-content h2 { font-size: 28px; } .cta-buttons { flex-direction: column; } .btn-primary, .btn-secondary { width: 100%; justify-content: center; } }
      `}</style>
    </>
  );
}
