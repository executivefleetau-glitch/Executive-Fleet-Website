"use client";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Image from "next/image";
import { languages } from "@/data/languages";
import Link from "next/link";
import Language from "./components/Language";

export default function Header2() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`header header-white sticky-bar ${scrolled ? "stick" : ""}`}
      >
        <div className="container-fluid box-header-home4">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo" style={{ maxWidth: "410px" }}>
                <Link className="d-flex" href="/" style={{ width: "200px" }}>
                  <Image
                    width={150}
                    height={150}
                    alt="Executive Fleet"
                    src="/assets/imgs/logo/EF Logo-05.png"
                    style={{ height: "70px", width: "250px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <div className="header-nav" style={{ Width: "70%" }}>
                <nav className="nav-main-menu d-none d-xl-block">
                  <ul className="main-menu">
                    <Nav />
                  </ul>
                </nav>
                <div className="burger-icon burger-icon-white">
                  <span className="burger-icon-mid"></span>
                  <span className="burger-icon-bottom"></span>
                </div>
              </div>
              <div className="header-right">
                <div className="d-none d-xxl-inline-block align-middle mr-10">
                  <a
                    className="text-14-medium call-phone color-white hover-up"
                    href="tel:+61431951996"
                  >
                    +61 431 951 996
                  </a>
                </div>


                <div className="box-button-login d-none2 d-inline-block align-middle">
                  <Link className="btn btn-book-now hover-up" href="/get-quote">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
      /* Menu Items - Black Text - Ultra Compact for Laptops */
      .header-white .main-menu li a,
      .header.header-white .main-menu li a,
      .header-white.stick .main-menu li a {
        color: #000000 !important;
        position: relative !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 8px !important;
        padding: 8px 10px !important;
        font-size: 13px !important;
        white-space: nowrap !important;
      }

      /* Hide Dropdown Arrow on Desktop - Prevent CSS Conflicts */
      .header-white .main-menu li.has-children > a::after,
      .header.header-white .main-menu li.has-children > a::after,
      .header-white.stick .main-menu li.has-children > a::after,
      .header.sticky-bar.header-white .main-menu li.has-children > a::after {
        display: none !important;
      }

      .header-white .main-menu li.has-children > a,
      .header.header-white .main-menu li.has-children > a,
      .header-white.stick .main-menu li.has-children > a,
      .header.sticky-bar.header-white .main-menu li.has-children > a {
        padding-right: 10px !important;
        gap: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
      }

      /* Menu Icons */
      .menu-icon {
        display: inline-flex;
        align-items: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .menu-icon svg {
        stroke: #000000;
        transition: all 0.3s ease;
        width: 14px;
        height: 14px;
      }

      .header-white .main-menu li a:hover .menu-icon svg,
      .header-white .main-menu li a.active-link .menu-icon svg {
        stroke: #ce9b28;
        transform: scale(1.1);
      }

      /* Submenu Icons */
      .submenu-icon {
        display: inline-flex;
        align-items: center;
        margin-right: 6px;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .submenu-icon svg {
        stroke: #626262;
        transition: all 0.3s ease;
        width: 13px;
        height: 13px;
      }

      .header-white .main-menu li ul li a:hover .submenu-icon svg {
        stroke: #000000;
        transform: translateX(3px);
      }

      /* Animated Underline on Hover */
      .header-white .main-menu li a::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .header-white .main-menu li a:hover::after {
        width: 80%;
      }

      .header-white .main-menu li a:hover {
        color: #000000 !important;
      }

      /* Active Menu Link */
      .header-white .main-menu li a.active-link {
        color: #000000 !important;
        font-weight: 600 !important;
      }

      .header-white .main-menu li a.active-link::after {
        width: 80%;
      }

      /* Submenu */
      .header-white .main-menu li ul {
        background-color: #ffffff !important;
      }
      
      .header-white .main-menu li ul li a {
        font-size: 14px !important;
        padding: 10px 15px !important;
      }
      
      .header-white .main-menu li ul li a:hover {
        color: #000000 !important;
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%) !important;
      }

      /* Book Now Button */
      .btn-book-now {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%) !important;
        color: #000000 !important;
        border: 2px solid #ce9b28 !important;
        border-radius: 8px !important;
        padding: 9px 16px !important;
        font-weight: 700 !important;
        font-size: 13px !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3) !important;
        white-space: nowrap !important;
      }

      .btn-book-now:hover {
        background: #000000 !important;
        color: #ffffff !important;
        border-color: #000000 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
      }

      /* Phone Number */
      .header-white .call-phone {
        color: #000000 !important;
        transition: all 0.3s ease !important;
        display: inline-block !important;
        font-size: 12px !important;
      }

      .header-white .call-phone:hover {
        color: #ce9b28 !important;
        font-weight: 700 !important;
        transform: scale(1.08) !important;
        letter-spacing: 0.3px !important;
      }

      /* Main Menu List - Prevent Wrapping */
      .header-white .main-menu {
        display: flex !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
      }

      .header-white .main-menu > li {
        flex-shrink: 0 !important;
      }

      /* Responsive Design */
      
      /* Extra Large Desktop (1700px+) */
      @media (min-width: 1700px) {
        .header-white .main-menu li a,
        .header.header-white .main-menu li a,
        .header-white.stick .main-menu li a {
          gap: 12px !important;
          padding: 10px 20px !important;
          font-size: 16px !important;
        }

        .header-white .main-menu li.has-children > a,
        .header.header-white .main-menu li.has-children > a,
        .header-white.stick .main-menu li.has-children > a {
          padding-right: 20px !important;
          gap: 12px !important;
        }

        .header-white .main-menu li.has-children > a::after,
        .header.header-white .main-menu li.has-children > a::after,
        .header-white.stick .main-menu li.has-children > a::after {
          display: none !important;
        }
        
        .menu-icon svg {
          width: 20px;
          height: 20px;
        }

        .btn-book-now {
          padding: 12px 28px !important;
          font-size: 15px !important;
        }

        .header-white .call-phone {
          font-size: 14px !important;
        }
      }

      /* Large Desktop (1400px - 1699px) */
      @media (min-width: 1400px) and (max-width: 1699px) {
        .header-white .main-menu li a,
        .header.header-white .main-menu li a,
        .header-white.stick .main-menu li a {
          gap: 10px !important;
          padding: 9px 14px !important;
          font-size: 14px !important;
        }

        .header-white .main-menu li.has-children > a,
        .header.header-white .main-menu li.has-children > a,
        .header-white.stick .main-menu li.has-children > a {
          padding-right: 14px !important;
          gap: 10px !important;
        }

        .header-white .main-menu li.has-children > a::after,
        .header.header-white .main-menu li.has-children > a::after,
        .header-white.stick .main-menu li.has-children > a::after {
          display: none !important;
        }
        
        .menu-icon svg {
          width: 16px;
          height: 16px;
        }

        .btn-book-now {
          padding: 10px 22px !important;
          font-size: 14px !important;
        }

        .header-white .call-phone {
          font-size: 13px !important;
        }
      }

      /* Standard Laptop (1200px - 1399px) */
      @media (min-width: 1200px) and (max-width: 1399px) {
        .header-white .main-menu li a,
        .header.header-white .main-menu li a,
        .header-white.stick .main-menu li a {
          gap: 8px !important;
          padding: 8px 10px !important;
          font-size: 13px !important;
        }

        .header-white .main-menu li.has-children > a,
        .header.header-white .main-menu li.has-children > a,
        .header-white.stick .main-menu li.has-children > a {
          padding-right: 10px !important;
          gap: 8px !important;
        }

        .header-white .main-menu li.has-children > a::after,
        .header.header-white .main-menu li.has-children > a::after,
        .header-white.stick .main-menu li.has-children > a::after {
          display: none !important;
        }
        
        .menu-icon svg {
          width: 14px;
          height: 14px;
        }

        .btn-book-now {
          padding: 9px 16px !important;
          font-size: 13px !important;
        }

        .header-white .call-phone {
          font-size: 12px !important;
        }
      }

      /* Compact Laptop (1024px - 1199px) */
      @media (min-width: 1024px) and (max-width: 1199px) {
        .header-white .main-menu li a,
        .header.header-white .main-menu li a,
        .header-white.stick .main-menu li a {
          gap: 6px !important;
          padding: 7px 8px !important;
          font-size: 12px !important;
        }

        .header-white .main-menu li.has-children > a,
        .header.header-white .main-menu li.has-children > a,
        .header-white.stick .main-menu li.has-children > a {
          padding-right: 8px !important;
          gap: 6px !important;
        }

        .header-white .main-menu li.has-children > a::after,
        .header.header-white .main-menu li.has-children > a::after,
        .header-white.stick .main-menu li.has-children > a::after {
          display: none !important;
        }
        
        .menu-icon svg {
          width: 13px;
          height: 13px;
        }

        .btn-book-now {
          padding: 8px 14px !important;
          font-size: 12px !important;
        }

        .header-white .call-phone {
          font-size: 11px !important;
        }

        .submenu-icon svg {
          width: 12px;
          height: 12px;
        }
      }

      /* Tablet Landscape (992px - 1023px) */
      @media (min-width: 992px) and (max-width: 1023px) {
        .header-white .main-menu li a,
        .header.header-white .main-menu li a,
        .header-white.stick .main-menu li a {
          gap: 5px !important;
          padding: 7px 7px !important;
          font-size: 11px !important;
        }

        .header-white .main-menu li.has-children > a,
        .header.header-white .main-menu li.has-children > a,
        .header-white.stick .main-menu li.has-children > a {
          padding-right: 7px !important;
          gap: 5px !important;
        }

        .header-white .main-menu li.has-children > a::after,
        .header.header-white .main-menu li.has-children > a::after,
        .header-white.stick .main-menu li.has-children > a::after {
          display: none !important;
        }
        
        .menu-icon svg {
          width: 12px;
          height: 12px;
        }

        .btn-book-now {
          padding: 7px 12px !important;
          font-size: 11px !important;
        }

        .header-white .call-phone {
          font-size: 10px !important;
        }
      }

      /* Tablet Portrait & Mobile (below 992px) */
      @media (max-width: 991px) {
        .header-white .main-menu li a {
          gap: 8px !important;
          padding: 12px 15px !important;
          font-size: 15px !important;
        }
        
        .menu-icon {
          flex-shrink: 0;
        }

        .menu-icon svg {
          width: 18px;
          height: 18px;
        }

        .submenu-icon svg {
          width: 15px;
          height: 15px;
        }
      }

      /* Mobile (below 768px) */
      @media (max-width: 767px) {
        .btn-book-now {
          padding: 10px 20px !important;
          font-size: 14px !important;
        }
      }

      /* Small Mobile (below 576px) */
      @media (max-width: 575px) {
        .header-white .main-menu li a {
          gap: 6px !important;
          padding: 10px 12px !important;
          font-size: 14px !important;
        }

        .btn-book-now {
          padding: 8px 16px !important;
          font-size: 13px !important;
        }
      }
    `}</style>
    </>
  );
}