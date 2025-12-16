"use client";

import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7WineryTours } from "@/data/features";
import Image from "next/image";
import React, { useEffect } from "react";

export default function WineryToursPage() {
  const service = services2[4];

  // Set metadata dynamically for Client Component
  useEffect(() => {
    document.title = "Luxury Winery Tours Melbourne | Yarra Valley Chauffeur";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Executive Fleet – Private luxury chauffeur winery tours Melbourne. Yarra Valley, Mornington Peninsula, Macedon Ranges & Bellarine. Custom itineraries, top cellar doors, gourmet lunch. Mercedes fleet, zero drink-driving.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Executive Fleet – Private luxury chauffeur winery tours Melbourne. Yarra Valley, Mornington Peninsula, Macedon Ranges & Bellarine. Custom itineraries, top cellar doors, gourmet lunch. Mercedes fleet, zero drink-driving.";
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Melbourne winery tours, Yarra Valley chauffeur, Mornington Peninsula wine tour, Macedon Ranges private wine tour, Bellarine Peninsula winery driver, luxury wine tour Melbourne");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "Melbourne winery tours, Yarra Valley chauffeur, Mornington Peninsula wine tour, Macedon Ranges private wine tour, Bellarine Peninsula winery driver, luxury wine tour Melbourne";
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
          heading="Luxury Winery Tours Melbourne – Executive Fleet Private Chauffeur Service"
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
                    WINERY TOURS
                  </span>
                </div>
                <h2 className="airport-main-heading wow fadeInUp">
                  Luxury <span style={{ color: '#ce9b28' }}>Winery Tours</span> Melbourne
                </h2>
                <p className="text-18 color-grey wow fadeInUp airport-lead">
                  Discover Melbourne&apos;s world-class wine regions in complete luxury and zero stress. Executive Fleet
                  offers private, chauffeur-driven winery tours tailored exactly to your taste – from cool-climate Pinot
                  Noir in Yarra Valley to ocean-view tastings on the Mornington and Bellarine Peninsulas.
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
                            d="M12 2C8.13 2 5 5.13 5 9c0 3.25 2.45 7.21 4.4 9.61.79 1 2.41 1 3.2 0C16.55 16.21 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="airport-card-title">
                      Expert Wine-Loving Chauffeurs
                    </h3>
                    <p className="airport-card-desc">
                      Our chauffeurs are local wine enthusiasts – they know hidden gems, the best tasting times, and
                      the most scenic routes. They hold full Victorian Driver Accreditation, drive smoothly between
                      cellar doors, and ensure you enjoy every sip with zero drink-driving concerns.
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
                      Premium Fleet for Winery Tours
                    </h3>
                    <p className="airport-card-desc">
                      Choose from Mercedes S-Class and E-Class sedans for 2–4 guests, GLE/GLS SUVs for couples and
                      cases of wine, V-Class people movers for 6–7 guests, and Sprinter vans for 8–13 guests. Chilled
                      water, champagne flutes, picnic blankets and cooler bags for your purchases come as standard.
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
                      PRIVATE WINE TOURS
                    </span>
                  </div>
                  <h2 className="airport-section-heading wow fadeInUp">
                    Luxury Winery Tours Melbourne –{" "}
                    <span style={{ color: '#ce9b28' }}>Executive Fleet Private Chauffeur Service</span>
                  </h2>

                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Discover Melbourne&apos;s world-class wine regions in complete luxury and zero stress. Executive
                      Fleet offers private, chauffeur-driven winery tours tailored exactly to your taste – whether you
                      love cool-climate Pinot Noir, sparkling wine at Domaine Chandon, or sunset sessions at Pt. Leo
                      Estate. Full-day or multi-day tours from Melbourne CBD or airport, with custom itineraries,
                      gourmet lunch bookings and door-to-door service.
                    </p>

                    <p className="text-17 color-grey mb-30 line-height-18">
                      Our chauffeurs are local wine enthusiasts – they know hidden gems, the best tasting order, and
                      how to time your day so you&apos;re never rushed. They hold Victorian Driver Accreditation, are
                      highly professional, and drive smoothly so you can enjoy every glass with complete peace of mind.
                    </p>

                    <p className="text-17 color-grey mb-30 line-height-18">
                      Executive Fleet delivers bespoke luxury wine tours 7 days a week. Choose your region, wineries,
                      and lunch spot – or let us design the perfect day. We can organise tasting fees at premium cellar
                      doors, restaurant reservations, hot air balloon add-ons in Yarra Valley, and cheese/chocolate
                      stops along the way. Fixed-price packages, no surge pricing, and complimentary pickup from
                      Melbourne CBD, South Yarra, Toorak, Brighton or Melbourne Airport.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Taste, sip and relax – we drive, carry cases, and get you home safely. No nominated driver, no
                      parking stress at busy cellar doors like Montalto or Hubert Estate. Just pure indulgence from the
                      moment your chauffeur arrives with chilled water and a smile.
                    </p>

                    <ul className="airport-list-ticks">
                      {features7WineryTours.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
                          <svg
                            className="tick-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" fill="url(#goldGradientWinery)" />
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="#000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="goldGradientWinery"
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

            {/* Service 1: Yarra Valley */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Yarra Valley Winery Tour –{" "}
                    <span style={{ color: '#ce9b28' }}>Most Popular Luxury Day Trip</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    The ultimate Yarra Valley experience: Domaine Chandon → Hubert Estate → Levantine Hill → Oakridge
                    Wines → De Bortoli or Tokar Estate. Finish with cheese at Yarra Valley Dairy or chocolate at Yering
                    Farm. Optional sunrise hot air balloon and sparkling breakfast to start the day in style.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/winry.jpg"
                    alt="Yarra Valley Winery Tour"
                  />
                </div>
              </div>
            </div>

            {/* Service 2: Mornington Peninsula */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/winry-tour.jpg"
                    alt="Mornington Peninsula Winery Tour"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Mornington Peninsula Winery Tour –{" "}
                    <span style={{ color: '#ce9b28' }}>Scenic Coastal Luxury</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Stunning ocean views and cool-climate wines: Port Phillip Estate → Pt. Leo Estate (lunch and
                    sculpture park) → Montalto → Ten Minutes by Tractor → Crittenden Estate → Polperro. Add a Peninsula
                    Hot Springs soak at the end for the ultimate relaxation.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3: Macedon Ranges */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow FadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Macedon Ranges Winery Tour –{" "}
                    <span style={{ color: '#ce9b28' }}>Cool-Climate Hidden Gem</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Elegant sparkling and Pinot from boutique producers: Hanging Rock Winery → Gisborne Peak →
                    Curly Flat → Mount Towrong → Granite Hills. Enjoy lunch at Mount Macedon Winery restaurant with
                    sweeping views over the ranges.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/V-class+bags.webp"
                    alt="Macedon Ranges Winery Tour"
                  />
                </div>
              </div>
            </div>

            {/* Service 4: Bellarine Peninsula */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/Chauffeured-Winery-Tours.jpg"
                    alt="Bellarine Peninsula Wine Tour"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Bellarine Peninsula Wine Tour –{" "}
                    <span style={{ color: '#ce9b28' }}>Relaxed Coastal Vibes</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Laid-back tastings with ocean breezes: Jack Rabbit Vineyard (iconic lunch view) → Scotchmans Hill →
                    Leura Park Estate → Yes Said The Seal → Terindah Estate. Add a seaside walk, swim or brewery stop
                    to round out the day.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 5: Multi-Region Weekend */}
            <div className="row align-items-center mt-90 mb-120">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Ultimate Multi-Region{" "}
                    <span style={{ color: '#ce9b28' }}>Weekend Wine Tour (2–3 Days)</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Day 1: Yarra Valley with optional sunrise hot air balloon and sparkling breakfast, followed by
                    premium cellar doors and an overnight stay in Healesville.{" "}
                    <br />
                    Day 2: Mornington Peninsula wineries, long lunch and Peninsula Hot Springs.{" "}
                    <br />
                    Perfect for birthdays, anniversaries, hens parties or corporate rewards – all fully chauffeured
                    with luggage and wine storage handled for you.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/images.jpeg"
                    alt="Multi-Region Weekend Wine Tour"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer9 />

      {/* SAME DESIGN SYSTEM as your Airport / Corporate / Family / Events pages */}
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
