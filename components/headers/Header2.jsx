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
            <div className="header-logo" style={{ maxWidth: "300px" }}>
              <Link className="d-flex" href="/">
                <Image
                  width={150}
                  height={150}
                  alt="Executive Fleet"
                  src="/assets/imgs/logo/logo.png"
                  style={{ height: "80px", width: "250px", objectFit: "contain" }}
                />
              </Link>
            </div>
            <div className="header-nav" style={{Width: "70%" }}>
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
                  href="tel:+41227157000"
                >
                  +41 22 715 7000
                </a>
              </div>
               
             
              <div className="box-button-login d-none2 d-inline-block align-middle">
                <Link className="btn btn-book-now hover-up" href="/booking-vehicle">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <style jsx global>{`
      /* Menu Hover Effect */
      .header-white .main-menu li a:hover {
        color: #5b1214 !important;
        background-color: rgba(91, 18, 20, 0.08) !important;
      }

      /* Active Menu Link */
      .header-white .main-menu li a.active-link {
        color: #5b1214 !important;
      }

      /* Submenu Hover */
      .header-white .main-menu li ul {
        background-color: #ffffff !important;
      }
      
      .header-white .main-menu li ul li a:hover {
        color: #ffffff !important;
        background-color: #5b1214 !important;
      }

      /* Book Now Button */
      .btn-book-now {
        background: #000000 !important;
        color: #ffffff !important;
        border: 2px solid #000000 !important;
        border-radius: 8px !important;
        padding: 12px 28px !important;
        font-weight: 600 !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 4px 15px rgba(91, 18, 20, 0.25) !important;
      }

      .btn-book-now:hover {
        background: transparent !important;
        color: #5b1214 !important;
        border-color: #000000 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 30px rgba(91, 18, 20, 0.4) !important;
      }

      /* Phone Number */
      .header-white .call-phone {
        transition: all 0.3s ease !important;
        display: inline-block !important;
      }

      .header-white .call-phone:hover {
        color: #5b1214 !important;
        font-weight: 700 !important;
        transform: scale(1.08) !important;
        letter-spacing: 0.3px !important;
      }
    `}</style>
    </>
  );
}
