import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2} from "@/data/services";
import { features7Corporate, features8 } from "@/data/features";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Corporate Transfers Melbourne | Executive Chauffeur Service",
  description:
    "Premium corporate transfers Melbourne by Executive Fleet. Luxury chauffeur-driven sedans, SUVs & vans for airport, hotel, conference & executive meetings. Fixed rates, discreet service across Melbourne CBD & suburbs.",
  };

export default function CorporateTravelPage() {
  const service = services2[0]; 
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb service={service} />
        <SearchBox 
          service={service} 
          imageUrl={service.bannerImage || service.image} 
          heading="Premium Corporate Transfers Melbourne – Corporate Travel Chauffeur Service"
        />
        <section className="section pt-100 pb-100 airport-premium-section">
          <div className="container-sub">
            {/* Hero Intro */}
            <div className="row mb-80">
              <div className="col-lg-10 offset-lg-1 text-center">
                <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
                Premium Corporate Transfers Melbourne – Corporate Travel Chauffeur Service
                </h2>
                <p className="text-18 color-grey wow fadeInUp" style={{ lineHeight: "1.8", maxWidth: "900px", margin: "0 auto" }}>
                Experience executive-level corporate transfers across Melbourne with Executive Fleet Professional chauffeurs, luxury fleet punctual discreet service for business travellers executives teams VIPs. From Melbourne Tullamarine Airport (MEL) to CBD Collins Street Docklands Southbank or suburbs like Toorak Brighton St Kilda – we guarantee stress-free on-time arrival every single time.
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="row">
              <div className="col-lg-6 mb-40">
                <div className="glass-feature-card wow fadeInUp">
                  <div className="glass-card-overlay"></div>
                  <div className="glass-card-content">
                    <div className="glass-card-icon-wrapper">
                      <div className="glass-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="glass-card-title">
                    Professional Corporate Chauffeurs Melbourne
                    </h3>
                    <p className="glass-card-desc">
                    Our accredited executive chauffeurs are corporate specialists – background-checked English-speaking impeccably presented. They handle routes luggage client greetings with total discretion so you prepare for meetings answer emails make calls in complete privacy productivity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-40">
                <div className="glass-feature-card wow fadeInUp" data-wow-delay="0.15s">
                  <div className="glass-card-overlay"></div>
                  <div className="glass-card-content">
                    <div className="glass-card-icon-wrapper">
                      <div className="glass-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="glass-card-title">
                    Executive Luxury Fleet for Corporate Travel
                    </h3>
                    <p className="glass-card-desc">
                    Choose from our fleet of Mercedes-Benz E-Class S-Class BMW 7 Series Audi A8 Genesis G80/G90 luxury SUVs (Mercedes GLE GLS) premium vans (Mercedes V-Class Sprinter). All vehicles feature Wi-Fi charging ports privacy glass noise cancellation leather seats refreshments – perfect for productive corporate journeys across Greater Melbourne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section pt-80 pb-100">
        <div className="container-sub">
            <div className="row">
              <div className="col-lg-12 offset-lg-0">
                <div className="airport-features-content">
                  <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
                  Best Corporate Transfers & Chauffeur Service Melbourne
                  </h2>
                  
                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                    Corporate Travel delivers premium chauffeur-driven corporate transfers 24/7 across Melbourne Victoria. Services include Melbourne Airport transfers (MEL/AVV) hotel transfers (Crown Towers Sofitel Park Hyatt Grand Hyatt The Langham) conference event transfers (MCEC Jeff’s Shed) business meeting shuttles financial roadshows. Enjoy meet-and-greet 60-minute free wait time live flight traffic monitoring child/booster seats corporate accounts. Immaculate vehicles professional chauffeurs guaranteed confidentiality fixed transparent pricing – no surge no hidden fees. Book your Melbourne corporate chauffeur today!
                    </p>
                    
                    <p className="text-17 color-grey mb-40 line-height-18">
                    Travel door-to-door with zero stress distractions. From offices in Melbourne CBD Collins Street corporate headquarters in Docklands Southbank or hotels in Southbank South Yarra we eliminate traffic worries parking hassles. Whether it’s an early investor meeting client lunch in Crown or evening gala at MCEC your dedicated chauffeur ensures calm productive perfectly timed transfers. With white-glove service latest-model vehicles obsessive attention to detail every corporate journey becomes efficient impressive business-class standard.
                    </p>

                    <ul className="list-ticks list-ticks-small">
                      {features7Corporate.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
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
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/airport-limo.webp"
                alt="Corporate Airport Transfers Melbourne"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Corporate Airport Transfers Melbourne Tullamarine (MEL)
                </h3>
                <p className="text-16 color-text line-height-18">
                  Seamless corporate airport transfers to/from Melbourne Airport. Flight monitoring meet-and-greet inside terminal luggage assistance direct transfer to CBD or suburbs. Ideal for executives teams international clients.
                </p>
              </div>
            </div>
          </div>

          {/* Service 2: Corporate Hotel Transfers */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Corporate Hotel Transfers Melbourne CBD & Suburbs
                </h3>
                <p className="text-16 color-text line-height-18">
                  Luxury transfers to/from all major hotels – Crown Towers Sofitel on Collins Park Hyatt Grand Hyatt The Langham Ritz-Carlton. Perfect for client stays board meetings.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/hotel-corporate.avif"
                alt="Corporate Hotel Transfers"
              />
            </div>
          </div>

          {/* Service 3: Conference & Event Transfers */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/Conference-Event Transfers.webp"
                alt="Conference Event Transfers"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Conference & Event Transfers Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  Full-service transport for MCEC events Australian Open corporate functions. Multiple vehicles coordinated pickups drop-offs staff delegate shuttles.
                </p>
              </div>
            </div>
          </div>

          {/* Service 4: Business Meeting & Roadshow */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Business Meeting & Roadshow Transfers
                </h3>
                <p className="text-16 color-text line-height-18">
                  Hourly/daily hire – your chauffeur waits while you attend meetings across Melbourne. Best routes real-time traffic avoidance maximum productivity.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/V-class+bags.webp"
                alt="Business Meeting Transfers"
              />
            </div>
          </div>

          {/* Service 5: VIP & Executive Protection */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/VIP.webp"
                alt="VIP Executive Transfers"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  VIP & Executive Protection Transfers Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  Discreet black-car service for C-level executives celebrities high-net-worth clients. Privacy glass licensed close-protection trained drivers available.
                </p>
              </div>
            </div>
          </div>

          {/* Service 6: Corporate Van & Group */}
          <div className="row align-items-center mt-90 mb-120">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Corporate Van & Group Transfers Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  Mercedes V-Class Sprinter vans for teams delegates (up to 7-20 passengers). Perfect for conference shuttles staff movements site visits.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src={service.bannerImage || service.image}
                alt="Corporate Van Group Transfers"
              />
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer9 />
    </>
  );
}
