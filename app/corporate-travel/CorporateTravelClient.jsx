"use client";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { features7Corporate } from "@/data/features";
import Image from "next/image";
import React from "react";
import Faq from "@/components/homes/home-1/Faq";
import { faqsCorporate } from "@/data/faq";

export default function CorporateTravelClient({ service }) {
  if (!service) return null;
  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        <Breadcumb service={service} />
        <SearchBox
          service={service}
          imageUrl={service.bannerImage || service.image}
          heading="Premium Corporate Transfers Melbourne – Corporate Travel Chauffeur Service"
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
                    CORPORATE TRAVEL
                  </span>
                </div>
                <h2 className="airport-main-heading wow fadeInUp">
                  Premium <span style={{ color: '#ce9b28' }}>Corporate Transfers</span> Melbourne
                </h2>
                <p className="text-18 color-grey wow fadeInUp airport-lead">
                  Experience executive-level corporate transfers across Melbourne with Executive Fleet. Professional
                  chauffeurs, a luxury fleet, and punctual, discreet service for business travellers, executives, teams,
                  and VIPs. From Melbourne Tullamarine Airport (MEL) to the CBD, Collins Street, Docklands, Southbank,
                  or suburbs like Toorak, Brighton, and St Kilda – we guarantee stress-free, on-time arrival every
                  single time.
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
                      Professional Corporate Chauffeurs Melbourne
                    </h3>
                    <p className="airport-card-desc">
                      Our accredited executive chauffeurs are corporate specialists – background-checked,
                      English-speaking, and impeccably presented. They handle routes, luggage, and client greetings with
                      total discretion, so you can prepare for meetings, answer emails, and make calls in complete
                      privacy and productivity.
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
                      Executive Luxury Fleet for Corporate Travel
                    </h3>
                    <p className="airport-card-desc">
                      Choose from our fleet of Mercedes-Benz E-Class, S-Class, BMW 7 Series, Audi A8, Genesis G80/G90,
                      luxury SUVs (Mercedes GLE, GLS), and premium vans (Mercedes V-Class, Sprinter). All vehicles offer
                      Wi-Fi, charging ports, privacy glass, leather seating, and refreshments – ideal for productive
                      corporate journeys across Greater Melbourne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT + TICK LIST + SERVICE BLOCKS */}
        <section className="section pt-80 pb-100 airport-content-section">
          <div className="container-sub">
            <div className="row">
              <div className="col-lg-12">
                <div className="airport-content-box">
                  <div className="mb-20 wow fadeInUp">
                    <span className="badge-section">
                      <span className="badge-dot"></span>
                      BEST FOR BUSINESS
                    </span>
                  </div>
                  <h2 className="airport-section-heading wow fadeInUp">
                    Best Corporate Transfers &amp; <span style={{ color: '#ce9b28' }}>Chauffeur Service Melbourne</span>
                  </h2>

                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Corporate Travel delivers premium chauffeur-driven corporate transfers 24/7 across Melbourne and
                      Victoria. Services include Melbourne Airport transfers (MEL/AVV), hotel transfers (Crown Towers,
                      Sofitel, Park Hyatt, Grand Hyatt, The Langham), conference &amp; event transfers (MCEC, Jeff’s
                      Shed), business meeting shuttles, and financial roadshows. Enjoy meet-and-greet, 60-minute free
                      wait time, live flight &amp; traffic monitoring, child/booster seats, and dedicated corporate
                      accounts. Immaculate vehicles, professional chauffeurs, guaranteed confidentiality, and fixed,
                      transparent pricing – no surge, no hidden fees.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Travel door-to-door with zero stress or distractions. From offices in Melbourne CBD, Collins
                      Street, corporate headquarters in Docklands and Southbank, or hotels in Southbank and South Yarra,
                      we remove traffic worries and parking hassles. Whether it’s an early investor meeting, a client
                      lunch at Crown, or an evening gala at MCEC, your dedicated chauffeur ensures calm, productive, and
                      perfectly timed transfers. With white-glove service, latest-model vehicles, and obsessive
                      attention to detail, every corporate journey feels efficient, impressive, and business-class.
                    </p>

                    <ul className="airport-list-ticks">
                      {features7Corporate.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
                          <svg
                            className="tick-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" fill="url(#goldGradientCorporate)" />
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="#000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="goldGradientCorporate"
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

            {/* Service 1: Corporate Airport Transfers */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_airport_transfer.png"
                    alt="Corporate Airport Transfers Melbourne"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Corporate Airport Transfers <span style={{ color: '#ce9b28' }}>Melbourne Tullamarine (MEL)</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Seamless corporate airport transfers to and from Melbourne Airport. Flight monitoring, meet-and-greet
                    inside the terminal, luggage assistance, and direct transfers to the CBD or suburbs. Perfect for
                    executives, teams, and international clients.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2: Corporate Hotel Transfers */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Corporate Hotel Transfers <span style={{ color: '#ce9b28' }}>Melbourne CBD &amp; Suburbs</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Luxury transfers to and from all major hotels – Crown Towers, Sofitel on Collins, Park Hyatt, Grand
                    Hyatt, The Langham, Ritz-Carlton, and more. Ideal for client stays, board meetings, and hosted
                    delegations.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_hotel_transfer.png"
                    alt="Corporate Hotel Transfers"
                  />
                </div>
              </div>
            </div>

            {/* Service 3: Conference & Event Transfers */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_event_transfer.png"
                    alt="Conference Event Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Conference &amp; <span style={{ color: '#ce9b28' }}>Event Transfers Melbourne</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Full-service transport for MCEC events, the Australian Open, and corporate functions. Multiple
                    vehicles, coordinated pickups and drop-offs, staff and delegate shuttles, and tailored logistics for
                    your schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4: Business Meeting & Roadshow */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Business Meeting &amp; <span style={{ color: '#ce9b28' }}>Roadshow Transfers</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Hourly or daily hire – your chauffeur waits while you attend meetings across Melbourne. Smart route
                    planning with real-time traffic avoidance ensures maximum productivity and zero delays between
                    appointments.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_meeting_transfer.png"
                    alt="Business Meeting Transfers"
                  />
                </div>
              </div>
            </div>

            {/* Service 5: VIP & Executive Protection */}
            <div className="row align-items-center mt-90">
              <div className="col-lg-6 mb-30 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_vip_transfer.png"
                    alt="VIP Executive Transfers"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    VIP &amp; Executive <span style={{ color: '#ce9b28' }}>Protection Transfers Melbourne</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Discreet black-car service for C-level executives, celebrities, and high-net-worth clients. Privacy
                    glass, low-profile vehicles, and close-protection trained drivers available on request.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 6: Corporate Van & Group */}
            <div className="row align-items-center mt-90 mb-60">
              <div className="col-lg-6 mb-30 order-lg-1">
                <div className="airport-info-box wow fadeInUp">
                  <div className="airport-info-border-top"></div>
                  <h3 className="airport-info-heading">
                    Corporate Van &amp; <span style={{ color: '#ce9b28' }}>Group Transfers Melbourne</span>
                  </h3>
                  <p className="text-16 color-text line-height-18">
                    Mercedes V-Class and Sprinter vans for teams and delegates (up to 7–20 passengers). Ideal for
                    conference shuttles, staff movements, site visits, and multi-stop corporate itineraries.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-30 order-lg-2 wow fadeInUp">
                <div className="airport-image-wrapper">
                  <Image
                    width={1710}
                    height={1800}
                    style={{ height: "fit-content" }}
                    src="/assets/imgs/page/corporate/corporate_group_transfer.png"
                    alt="Corporate Van Group Transfers"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ Section */}
        <Faq items={faqsCorporate} />
      </main>
      <Footer9 />

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
