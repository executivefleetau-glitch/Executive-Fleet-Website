"use client";
import { useEffect } from "react";
import MobileNav from "./components/MobileNav";
import Link from "next/link";

export default function MobailHeader1() {
  useEffect(() => {
    const navbarTrigger = document.getElementsByClassName("burger-icon")[0];
    const container = document.getElementsByClassName(
      "mobile-header-active"
    )[0];
    const wrapper4 = document.body;

    const handleClick = (e) => {
      console.log("first");

      navbarTrigger?.classList.toggle("burger-close");
      e.preventDefault();
      container?.classList.toggle("sidebar-visible");
      wrapper4.classList.toggle("mobile-menu-active");
    };

    navbarTrigger?.addEventListener("click", handleClick);

    return () => {
      navbarTrigger?.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav className="mt-15">
                  <ul className="mobile-menu font-heading">
                    <MobileNav />
                  </ul>
                </nav>

                {/* Action Buttons */}
                <div className="mobile-action-buttons">
                  <a href="tel:+61431951996" className="mobile-call-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Call Now
                  </a>

                  <Link href="/get-quote" className="mobile-book-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Mobile Header - Clean Professional Design */
        .mobile-header-active {
          background: #ffffff !important;
          box-shadow: -5px 0 40px rgba(0, 0, 0, 0.15) !important;
        }

        .mobile-header-wrapper-inner {
          padding: 20px 25px 20px !important;
        }

        /* Mobile Menu Items */
        .mobile-menu li {
          margin-bottom: 0 !important;
        }

        .mobile-menu li a {
          padding: 12px 18px !important;
          display: block !important;
          color: #181a1f !important;
          font-weight: 500 !important;
          font-size: 16px !important;
          border-left: 3px solid transparent !important;
          transition: all 0.3s ease !important;
          border-radius: 0 !important;
        }

        .mobile-menu li a:hover {
          color: #ce9b28 !important;
          background: rgba(206, 155, 40, 0.05) !important;
          border-left-color: #ce9b28 !important;
        }

        /* Active Link */
        .mobile-menu li a.active-link {
          color: #ce9b28 !important;
          background: rgba(206, 155, 40, 0.08) !important;
          border-left-color: #ce9b28 !important;
          font-weight: 600 !important;
        }

        /* Parent Menu */
        .mobile-menu li.has-children > a {
          font-weight: 600 !important;
        }

        .mobile-menu li.has-children > a.parent-open {
          color: #ce9b28 !important;
          background: rgba(206, 155, 40, 0.05) !important;
          border-left-color: #ce9b28 !important;
        }

        /* Menu Expand Icon */
        .menu-expand {
          transition: transform 0.3s ease !important;
          display: inline-block !important;
        }

        .parent-open .menu-expand {
          transform: rotate(180deg) !important;
        }

        .menu-expand svg path {
          fill: #181a1f !important;
          transition: fill 0.3s ease !important;
        }

        .mobile-menu li a:hover .menu-expand svg path {
          fill: #ce9b28 !important;
        }

        .mobile-menu li a.active-link .menu-expand svg path,
        .parent-open .menu-expand svg path {
          fill: #ce9b28 !important;
        }

        /* Submenu */
        .mobile-sub-menu {
          padding-left: 15px !important;
          margin-top: 2px !important;
          border-left: 2px solid rgba(206, 155, 40, 0.15) !important;
          margin-left: 18px !important;
        }

        .mobile-sub-menu li a {
          padding: 10px 16px !important;
          font-size: 15px !important;
          font-weight: 400 !important;
        }

        .mobile-sub-menu li a:hover {
          background: rgba(206, 155, 40, 0.06) !important;
          color: #ce9b28 !important;
        }

        .mobile-sub-menu li a.active-link {
          background: rgba(206, 155, 40, 0.1) !important;
          color: #ce9b28 !important;
          font-weight: 600 !important;
        }

        /* Action Buttons Section */
        .mobile-action-buttons {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid #e8e8e8;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mobile-call-btn,
        .mobile-book-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .mobile-call-btn {
          background: transparent;
          color: #ce9b28;
          border: 2px solid #ce9b28;
        }

        .mobile-call-btn:hover {
          background: #ce9b28;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.25);
        }

        .mobile-call-btn:hover svg {
          stroke: #ffffff;
        }

        .mobile-call-btn svg {
          stroke: #ce9b28;
          transition: stroke 0.3s ease;
        }

        .mobile-book-btn {
          background: #ce9b28;
          color: #ffffff;
          border: 2px solid #ce9b28;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.25);
        }

        .mobile-book-btn:hover {
          background: #E8B429;
          border-color: #E8B429;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.35);
        }

        .mobile-book-btn svg {
          stroke: #ffffff;
        }

        /* Scrollbar */
        .perfect-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .perfect-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        .perfect-scrollbar::-webkit-scrollbar-thumb {
          background: #ce9b28;
          border-radius: 10px;
        }

        .perfect-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #E8B429;
        }
      `}</style>
    </>
  );
}