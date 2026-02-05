"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default function MobileFloatingCTA() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin');
  
  // Check if we're on the get-quote page
  const isQuotePage = pathname === '/get-quote';

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Observe hero section visibility
  useEffect(() => {
    if (!isMobile || isAdminPage) return;

    // Find hero section - common selectors used in the codebase
    const heroSelectors = [
      '.banner-home8',
      '.section.banner-home8',
      '[class*="banner-home"]',
      '.hero-section',
      '.box-banner-homepage'
    ];

    let heroElement = null;
    for (const selector of heroSelectors) {
      heroElement = document.querySelector(selector);
      if (heroElement) break;
    }

    if (!heroElement) {
      // No hero found, show buttons after small delay
      setIsHeroVisible(false);
      setShowButtons(true);
      return;
    }

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 } // Hero is "visible" when 30% is in view
    );

    heroObserver.observe(heroElement);

    return () => {
      heroObserver.disconnect();
    };
  }, [isMobile, isAdminPage, pathname]);

  // Determine button visibility
  useEffect(() => {
    // Don't show on admin pages
    if (isAdminPage) {
      setShowButtons(false);
      return;
    }

    // Don't show on desktop
    if (!isMobile) {
      setShowButtons(false);
      return;
    }

    // Hide if hero is visible (hero has its own Call Now button)
    if (isHeroVisible) {
      setShowButtons(false);
      return;
    }

    // Show buttons when hero is not visible
    setShowButtons(true);
  }, [isAdminPage, isMobile, isHeroVisible]);

  // Don't render anything if conditions not met
  if (!showButtons || !isMobile || isAdminPage) {
    return null;
  }

  // Determine which buttons to show
  const showCallButton = true; // Always show call button when visible
  const showQuoteButton = !isQuotePage; // Never show quote button on the get-quote page

  const handleQuoteClick = () => {
    // Navigate to quote page
    window.location.href = '/get-quote';
  };

  // Single button layout (only Call Now on quote page)
  const isSingleButton = !showQuoteButton;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        display: 'flex',
        gap: '0',
        padding: isSingleButton ? '12px 16px' : '0',
        paddingBottom: isSingleButton ? 'max(12px, env(safe-area-inset-bottom))' : '0',
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        borderTop: '2px solid #ce9b28',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
      }}
    >
      {/* Call Now Button */}
      {showCallButton && (
        <a
          href="tel:+61431951996"
          style={{
            flex: isSingleButton ? 'none' : 1,
            width: isSingleButton ? '100%' : 'auto',
            maxWidth: isSingleButton ? '300px' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: isSingleButton ? '14px 24px' : '16px 20px',
            background: 'linear-gradient(135deg, #ce9b28 0%, #e8b429 100%)',
            color: '#000',
            textDecoration: 'none',
            fontSize: isSingleButton ? '16px' : '15px',
            fontWeight: '700',
            borderRadius: isSingleButton ? '50px' : '0',
            borderRight: !isSingleButton ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s ease',
            boxShadow: isSingleButton ? '0 4px 15px rgba(206, 155, 40, 0.4)' : 'none',
          }}
        >
          <PhoneIcon />
          <span>Call Now</span>
        </a>
      )}

      {/* Get Quote Button - Not shown on quote page */}
      {showQuoteButton && (
        <button
          onClick={handleQuoteClick}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px 20px',
            background: 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <QuoteIcon />
          <span>Get Quote</span>
        </button>
      )}
    </div>
  );
}
