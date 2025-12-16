"use client";

import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7Family } from "@/data/features";
import Image from "next/image";
import React, { useEffect } from "react";

export default function FamilyTravelPage() {
  const service = services2[1];

  // Set metadata dynamically for Client Component
  useEffect(() => {
    document.title = "Family Airport Transfers Melbourne | Baby Seats & Boosters";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Executive Fleet – Melbourne's #1 family chauffeur service. FREE baby capsules, child seats & boosters. Spacious SUVs & vans for airport, hotels, Great Ocean Road & day trips. Safe, stress-free rides.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Executive Fleet – Melbourne's #1 family chauffeur service. FREE baby capsules, child seats & boosters. Spacious SUVs & vans for airport, hotels, Great Ocean Road & day trips. Safe, stress-free rides.";
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
          heading="Family Travel Melbourne – Executive Fleet Chauffeur Service with Child Seats"
        />

        {/* HERO + FEATURE CARDS (same layout as airport/corporate pages) */}
        <section className="section pt-100 pb-100 airport-premium-section">
          <div className="container-sub">
            {/* Hero Intro with Badge Heading */}
            <div className="row mb-80">
              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="mb-20 wow fadeInUp">
                  <span className="badge-section">
                    <span className="badge-dot"></span>
                    FAMILY TRAVEL
                  </span>
                </div>
                  <h2 className="airport-main-heading wow fadeInUp">
                    Family Travel <span style={{ color: '#ce9b28' }}>Melbourne</span>
                </h2>
                <p className="text-18 color-grey wow fadeInUp airport-lead">
                  Travel with your babies, toddlers, kids, teens, and grandparents across Melbourne with complete peace
                  of mind. Executive Fleet specialises in safe, spacious, luxury family transfers – with FREE baby
                  capsules (0–6 months), rear/forward-facing child seats, boosters, and ISOFIX in every vehicle. From
                  Melbourne Tullamarine Airport (MEL) or Avalon (AVV) to Brighton, Toorak, Kew, Point Cook, Mornington
                  Peninsula, or CBD hotels – we make family travel feel like a holiday from the moment you step in.
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
                      Kid-Friendly Professional Chauffeurs
                    </h3>
                    <p className="airport-card-desc">
                      Our chauffeurs are parents themselves, police-checked, Working With Children certified, and
                      trained in child seat installation. They drive smoothly, help with prams and luggage, and keep
                      the ride calm — your family’s comfort and safety is their number one priority.
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
                      Luxury & Spacious Family Fleet
                    </h3>
                    <p className="airport-card-desc">
                      Mercedes GLE/GLS 7-seater SUVs, Mercedes V-Class people movers, and Sprinter vans for large
                      families. Dual-zone air-conditioning, tinted windows, device charging, bottled water, and room for
                      prams, luggage, and little legs – all set up for real-world family needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT + TICKS + SERVICE BLOCKS (matching layout of Airport/Corporate pages) */}
        <section className="section pt-80 pb-100 airport-content-section">
          <div className="container-sub">
            <div className="row">
              <div className="col-lg-12">
                <div className="airport-content-box">
                  <div className="mb-20 wow fadeInUp">
                    <span className="badge-section">
                      <span className="badge-dot"></span>
                      SAFE FAMILY TRAVEL
                    </span>
                  </div>
                  <h2 className="airport-section-heading wow fadeInUp">
                    Family Travel Melbourne – Executive Fleet Chauffeur Service with{" "}
                    <span style={{ color: '#ce9b28' }}>Child Seats</span>
                  </h2>

                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Travel with your babies, toddlers, kids, teens, and grandparents across Melbourne with complete
                      peace of mind. Executive Fleet specialises in safe, spacious, luxury family transfers – with FREE
                      baby capsules (0–6 months), rear/forward-facing child seats, boosters, and ISOFIX in every
                      vehicle. From Melbourne Tullamarine Airport (MEL) or Avalon (AVV) to Brighton, Toorak, Kew, Point
                      Cook, Mornington Peninsula, or CBD hotels – we make family travel feel effortless.
                    </p>

                    <p className="text-17 color-grey mb-30 line-height-18">
                      We monitor your flight in real time, provide complimentary wait time, meet you inside arrivals
                      with a personalised family name board, install child seats before you land, and load
                      prams/suitcases while you settle the kids. Fixed price – no surge pricing, no queues, no stress.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Travel like a VIP family, every single time. From your home in Camberwell, a holiday house in
                      Sorrento, or a hotel in Crown Melbourne, The Langham, Sofitel, or Southbank – we eliminate airport
                      chaos. No more folding prams in car parks, no heavy lifting, no fighting for uberXL. Just one text
                      when you land – your clean, cool, child-seat-ready luxury vehicle is waiting curbside.
                    </p>

                    <ul className="airport-list-ticks">
                      {features7Family.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
                          <svg
                            className="tick-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" fill="url(#goldGradientFamily)" />
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="#000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="goldGradientFamily"
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

            {/* Service 1: Family Airport Transfers */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/airport-limo.webp"
                    alt="Family Airport Transfers Melbourne"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Family Airport Transfers{" "}
                    <span style={{ color: '#ce9b28' }}>Melbourne Tullamarine (MEL)</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    The smartest choice for families flying in or out of Melbourne Airport. Flight tracking, meet &
                    greet at arrivals, pre-installed child seats, and zero waiting with tired kids.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2: Family Hotel Transfers */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Family Hotel &amp; Accommodation{" "}
                    <span style={{ color: '#ce9b28' }}>Transfers Melbourne</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Direct transfers to Crown Towers, Pan Pacific, QT Melbourne, The Ritz-Carlton, and family-friendly
                    apartments in Docklands, St Kilda Road, South Yarra and more – with child seats pre-fitted and
                    tested before pickup.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/hotel-corporate.avif"
                    alt="Family Hotel Transfers"
                  />
                </div>
              </div>
            </div>

            {/* Service 3: Great Ocean Road */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/Conference-Event Transfers.webp"
                    alt="Great Ocean Road Family Day Trips"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Great Ocean Road Family{" "}
                    <span style={{ color: '#ce9b28' }}>Day Trips &amp; Tours</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Full-day private tours with family-friendly stops: Twelve Apostles, Loch Ard Gorge, Lorne, Apollo
                    Bay. We schedule ice-cream breaks, playground stops, and wildlife parks – your pace, your kids,
                    your day.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4: Phillip Island */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Phillip Island Penguin Parade{" "}
                      <span style={{ color: '#ce9b28' }}>Family Transfers</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Afternoon/evening transfers with properly fitted child seats. Leave Melbourne around 2pm, watch the
                    penguins at sunset, and arrive back by around 10:30pm – kids can sleep comfortably on the way home.
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
                    alt="Phillip Island Family Transfers"
                  />
                </div>
              </div>
            </div>

            {/* Service 5: Yarra Valley */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/VIP.webp"
                    alt="Yarra Valley Family Adventure"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Yarra Valley Family Adventure{" "}
                    <span style={{ color: '#ce9b28' }}>
                      (Healesville Sanctuary + Wineries)
                    </span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Visit Healesville Sanctuary in the morning, then chocolate factory and family-friendly wineries.
                    Your chauffeur helps with prams, bags, and tired little feet so everyone enjoys the day.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 6: Mornington Peninsula */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Mornington Peninsula{" "}
                    <span style={{ color: '#ce9b28' }}>
                      Hot Springs &amp; Beach Day
                    </span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Peninsula Hot Springs with kids, beach stops, strawberry picking, scenic lookouts – all in a
                    spacious van so everyone can stretch out, nap, and enjoy the ride.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/banner/airport-limo.webp"
                    alt="Mornington Peninsula Family"
                  />
                </div>
              </div>
            </div>

            {/* Service 7: Large Family Group */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src={service.bannerImage || service.image}
                    alt="Large Family Group Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Large Family &amp; Multi-Generational{" "}
                    <span style={{ color: '#ce9b28' }}>Group Transfers</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Up to 13 passengers in luxury Sprinter vans – perfect for grandparents, parents, and kids travelling
                    together for reunions, weddings, or big family holidays.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 8: School Holidays Package */}
            <div className="row align-items-center mt-90 mb-120">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    School Holidays{" "}
                    <span style={{ color: '#ce9b28' }}>Melbourne Attractions Package</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Melbourne Zoo → Scienceworks → Luna Park → Sea Life Aquarium in one luxury vehicle with the same
                    chauffeur all day. No parking drama, no multiple bookings – just fun.
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
                    alt="School Holidays Attractions"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer9 />

      {/* SAME DESIGN SYSTEM as your previous Airport/Corporate pages */}
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
