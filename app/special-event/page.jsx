"use client";

import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7SpecialEvents } from "@/data/features";
import Image from "next/image";
import React, { useEffect } from "react";

export default function SpecialEventPage() {
  const service = services2[3];

  // Set metadata dynamically for Client Component
  useEffect(() => {
    document.title = "Special Event Chauffeur Melbourne | Luxury Transfers";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Executive Fleet – Premium chauffeur service for special events in Melbourne. Australian Open, Melbourne Cup, F1 Grand Prix, weddings, concerts. Luxury cars, red carpet service, fixed rates.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Executive Fleet – Premium chauffeur service for special events in Melbourne. Australian Open, Melbourne Cup, F1 Grand Prix, weddings, concerts. Luxury cars, red carpet service, fixed rates.";
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Melbourne special event chauffeur, Australian Open chauffeur, Melbourne Cup chauffeur, F1 Grand Prix transfers, wedding chauffeur Melbourne, concert transfers Melbourne");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "Melbourne special event chauffeur, Australian Open chauffeur, Melbourne Cup chauffeur, F1 Grand Prix transfers, wedding chauffeur Melbourne, concert transfers Melbourne";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb service={service} />
        <SearchBox
          service={service}
          imageUrl={service.bannerImage || service.image}
          heading="Special Events Chauffeur Melbourne – Executive Fleet Luxury Transfers"
        />

        {/* HERO + FEATURE CARDS */}
        <section className="section pt-100 pb-100 airport-premium-section">
          <div className="container-sub">
            {/* Hero Intro with Badge Heading */}
            <div className="row mb-80">
              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="mb-20 wow fadeInUp">
                  <span className="badge-section">
                    <span className="badge-dot"></span>
                    SPECIAL EVENTS
                  </span>
                </div>
                <h2 className="airport-main-heading wow fadeInUp">
                  Special Events <span className="gradient-text">Chauffeur Melbourne</span>
                </h2>
                <p className="text-18 color-grey wow fadeInUp airport-lead">
                  Arrive like a VIP at any Melbourne special event with Executive Fleet&apos;s premium chauffeur
                  service. From Australian Open tennis to Melbourne Cup Carnival, Formula 1 Grand Prix, concerts,
                  theatre shows and luxury galas – we deliver red-carpet treatment, punctual pickups, and stylish
                  transfers across Greater Melbourne.
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="row">
              <div className="col-lg-6 mb-40">
                <div className="airport-feature-card wow fadeInUp">
                  <div className="airport-card-border-top"></div>
                  <div className="airport-card-content">
                    <div className="airport-card-icon-wrapper">
                      <div className="airport-card-icon">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="airport-card-title">
                      Professional Event Chauffeurs Melbourne
                    </h3>
                    <p className="airport-card-desc">
                      Our impeccably dressed, experienced chauffeurs know every venue – MCG, Marvel Stadium,
                      Flemington, Melbourne Park, AAMI Park, Crown, and more. They handle traffic, parking chaos,
                      drop-off points and timing so you can enjoy champagne, photos, and pre-event excitement in
                      complete comfort.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-40">
                <div className="airport-feature-card wow fadeInUp" data-wow-delay="0.15s">
                  <div className="airport-card-border-top"></div>
                  <div className="airport-card-content">
                    <div className="airport-card-icon-wrapper">
                      <div className="airport-card-icon">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="airport-card-title">
                      Luxury Fleet for Special Events
                    </h3>
                    <p className="airport-card-desc">
                      Choose the perfect vehicle for your occasion: Mercedes-Benz S-Class, Bentley, Rolls Royce,
                      GLS SUVs, V-Class and Sprinter vans for groups. Complimentary bottled water, optional champagne,
                      red-carpet rollout, and ribbons or decorations on request – every arrival feels like a premiere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT + TICKS + SERVICE BLOCKS */}
        <section className="section pt-80 pb-100 airport-content-section">
          <div className="container-sub">
            {/* Main Content + Ticks */}
            <div className="row">
              <div className="col-lg-12">
                <div className="airport-content-box">
                  <div className="mb-20 wow fadeInUp">
                    <span className="badge-section">
                      <span className="badge-dot"></span>
                      EVENT LUXURY
                    </span>
                  </div>
                  <h2 className="airport-section-heading wow fadeInUp">
                    Special Events Chauffeur Melbourne –{" "}
                    <span className="gradient-text">Executive Fleet Luxury Transfers</span>
                  </h2>

                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Arrive like a VIP at any Melbourne special event with Executive Fleet&apos;s premium chauffeur
                      service. From Australian Open tennis to Melbourne Cup Carnival, Formula 1 Grand Prix, concerts at
                      Rod Laver Arena, theatre shows at Regent Theatre, or corporate galas at Crown Melbourne – we
                      deliver red-carpet treatment, punctual pickups, and glamorous door-to-door transfers.
                    </p>

                    <p className="text-17 color-grey mb-30 line-height-18">
                      Executive Fleet provides 24/7 luxury transfers for all major events. Enjoy early arrival options,
                      wait-and-return service, multiple stops (pre-drinks → venue → after-party), and fixed transparent
                      pricing with no surge. Our chauffeurs monitor traffic and event schedules so you never miss the
                      opening act, race, or curtain-up.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Step out in style, every single time. From your home in Toorak or South Yarra, hotel in the CBD
                      or Crown Towers, or pickup in Docklands and beyond – we remove parking stress, rideshare surge
                      pricing and drunk-driving worries. Your chauffeur takes care of the logistics so you can focus on
                      the occasion.
                    </p>

                    <ul className="airport-list-ticks">
                      {features7SpecialEvents.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
                          <svg
                            className="tick-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" fill="url(#goldGradientEvents)" />
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="#000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="goldGradientEvents"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#ce9b28" />
                                <stop offset="50%" stopColor="#fffbe9" />
                                <stop offset="100%" stopColor="#E8B429" />
                              </linearGradient>
                            </defs>
                          </svg>
                          {elm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 1: Australian Open */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/hotel-corporate.avif"
                    alt="Australian Open Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Australian Open Transfers –{" "}
                    <span className="gradient-text">Rod Laver Arena</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    VIP transfers to Melbourne Park for the Australian Open. Beat the crowds with priority drop-off,
                    your chauffeur waiting during matches, and a safe, comfortable late-night return after the final
                    point is played.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2: Melbourne Cup */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/Conference-Event Transfers.webp"
                    alt="Melbourne Cup Carnival"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Melbourne Cup Carnival Chauffeur –{" "}
                    <span className="gradient-text">Flemington Racecourse</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Experience Melbourne Cup Day, Oaks Day, Derby Day and Stakes Day in true style. Arrive trackside
                    in a Rolls Royce, Bentley or S-Class – with ribbons, photo stops and a chauffeur on standby all
                    day.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3: Formula 1 */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/V-class+bags.webp"
                    alt="F1 Grand Prix Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Formula 1 Australian Grand Prix{" "}
                    <span className="gradient-text">Transfers – Albert Park</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Grand Prix weekend transfers with early track access, multiple daily pickups, and chauffeurs on
                    standby throughout the race weekend. Avoid road closures and chaos – arrive calm and on time.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4: Concerts */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/VIP.webp"
                    alt="Concert Transfers Melbourne"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Concert &amp; Gig Transfers –{" "}
                    <span className="gradient-text">
                      Rod Laver, John Cain Arena &amp; More
                    </span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Taylor Swift, Coldplay, Ed Sheeran, AFL Grand Final concerts – enjoy door-to-door service, no
                    parking nightmare, and a safe ride home after the encore.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 5: Weddings */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/airport-limo.webp"
                    alt="Wedding Chauffeur Melbourne"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Wedding Chauffeur Service{" "}
                    <span className="gradient-text">Melbourne</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Multiple luxury cars for the bridal party, Rolls Royce or Bentley for the couple, ribbons and
                    timing coordinated perfectly for photos, ceremony and reception transfers.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 6: Theatre & Opera */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src={service.bannerImage || service.image}
                    alt="Theatre Opera Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Theatre &amp; Opera Transfers –{" "}
                    <span className="gradient-text">
                      Regent, Princess &amp; Arts Centre
                    </span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Matinee or evening shows at Regent Theatre, Princess Theatre or Arts Centre. Arrive refreshed,
                    with your chauffeur waiting or returning later to collect you at the end of the performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 7: Corporate Gala */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/hotel-corporate.avif"
                    alt="Corporate Gala Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Corporate Gala &amp; Awards Night{" "}
                    <span className="gradient-text">Transfers</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Executive black-car service for teams, sponsors and VIP guests to Crown Palladium, MCEC and other
                    major venues. Discreet, professional arrivals that match your brand image.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 8: Birthdays */}
            <div className="row align-items-center mt-90 mb-120">
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/V-class+bags.webp"
                    alt="Birthday Celebration Chauffeur"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Birthday &amp; Milestone{" "}
                    <span className="gradient-text">Celebration Chauffeur</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    From 21st to 80th birthdays, hens and bucks nights, restaurant crawls or rooftop bars – enjoy a
                    dedicated chauffeur and luxury vans for groups, so everyone can celebrate safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer9 />

      {/* SAME DESIGN SYSTEM as Family / Airport / Corporate pages */}
      <style jsx global>{`
        .airport-premium-section {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          position: relative;
          border-top: 1px solid rgba(206, 155, 40, 0.1);
        }

        .airport-content-section {
          background: #ffffff;
        }

        /* Badge Section */
        .badge-section {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #000;
          text-transform: uppercase;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
        }

        /* Main Heading */
        .airport-main-heading {
          font-size: 48px;
          font-weight: 700;
          color: #000;
          margin-bottom: 25px;
          line-height: 1.3;
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .airport-lead {
          line-height: 1.8;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Feature Cards */
        .airport-feature-card {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 30px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 100%;
        }

        .airport-feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .airport-card-border-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: width 0.6s ease;
        }

        .airport-feature-card:hover .airport-card-border-top {
          width: 100%;
        }

        .airport-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .airport-card-icon-wrapper {
          margin-bottom: 24px;
        }

        .airport-card-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: all 0.4s ease;
        }

        .airport-feature-card:hover .airport-card-icon {
          background: #000;
          color: #e8b429;
          transform: scale(1.05);
          box-shadow: 0 0 0 8px rgba(232, 180, 41, 0.15);
        }

        .airport-card-title {
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-bottom: 16px;
          transition: color 0.3s ease;
        }

        .airport-feature-card:hover .airport-card-title {
          color: #ce9b28;
        }

        .airport-card-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #666;
          margin: 0;
          flex-grow: 1;
        }

        /* Content Box */
        .airport-content-box {
          background: #ffffff;
          border-radius: 16px;
          padding: 50px 40px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .airport-section-heading {
          font-size: 42px;
          font-weight: 700;
          color: #000;
          margin-bottom: 30px;
          line-height: 1.3;
          position: relative;
          padding-bottom: 20px;
        }

        .airport-section-heading::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
        }

        .line-height-18 {
          line-height: 1.8;
        }

        /* Custom List with Golden Ticks */
        .airport-list-ticks {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .airport-list-ticks li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-left: 0;
        }

        .tick-icon {
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.3s ease;
        }

        .airport-list-ticks li:hover .tick-icon {
          transform: scale(1.15);
        }

        /* Image Wrapper */
        .airport-image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }

        .airport-image-wrapper:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .airport-image-wrapper img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 0.5s ease;
        }

        .airport-image-wrapper:hover img {
          transform: scale(1.05);
        }

        /* Info Box */
        .airport-info-box {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 35px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .airport-info-box:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .airport-info-border-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: width 0.6s ease;
        }

        .airport-info-box:hover .airport-info-border-top {
          width: 100%;
        }

        .airport-info-heading {
          font-size: 32px;
          font-weight: 700;
          color: #000;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .airport-main-heading {
            font-size: 38px;
          }

          .airport-section-heading {
            font-size: 34px;
          }

          .airport-info-heading {
            font-size: 28px;
          }

          .airport-feature-card,
          .airport-content-box,
          .airport-info-box {
            padding: 30px 25px;
          }
        }

        @media (max-width: 767px) {
          .airport-main-heading {
            font-size: 32px;
          }

          .airport-section-heading {
            font-size: 28px;
            text-align: center;
          }

          .airport-section-heading::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .airport-info-heading {
            font-size: 24px;
            text-align: center;
          }

          .airport-card-title {
            font-size: 22px;
          }

          .airport-feature-card,
          .airport-content-box,
          .airport-info-box {
            padding: 25px 20px;
          }

          .badge-section {
            font-size: 12px;
            padding: 6px 16px;
          }
        }
      `}</style>
    </>
  );
}
