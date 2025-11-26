import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7SpecialEvents, features8 } from "@/data/features";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Special Event Chauffeur Melbourne | Luxury Transfers ",
  description:
    "Executive Fleet – Premium chauffeur service for special events in Melbourne. Australian Open, Melbourne Cup, F1 Grand Prix, weddings, concerts. Luxury cars, red carpet service, fixed rates.",
  keywords: "Melbourne airport transfers, Tullamarine airport chauffeur, luxury airport transfer Melbourne, MEL airport pickup, private airport car service Melbourne",
};

export default function SpecialEventPage() {
  const service = services2[3]; // Airport Transfers service (id: 3)
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
       
        
        <section className="section pt-80 pb-100">
        <div className="container-sub">
            <div className="row">
              <div className="col-lg-12 offset-lg-0">
                <div className="airport-features-content">
                  <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
                    Special Events Chauffeur Melbourne – Executive Fleet Luxury Transfers
                  </h2>
                  
                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Arrive like a VIP at any Melbourne special event with Executive Fleet's premium chauffeur service. From Australian Open tennis to Melbourne Cup carnival, Formula 1 Grand Prix, concerts at Rod Laver Arena, theatre shows at Regent Theatre or corporate galas at Crown Melbourne – we deliver red-carpet treatment, punctual pickups and stylish luxury transfers across Greater Melbourne.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Professional Event Chauffeurs Melbourne
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Our impeccably dressed, experienced chauffeurs know every venue inside out – MCG, Marvel Stadium, Flemington Racecourse, AAMI Park, John Cain Arena. They handle traffic, parking chaos and tight schedules so you relax with champagne, enjoy the pre-event excitement or debrief afterwards in total privacy.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Luxury Fleet for Special Events
                    </h3>
                    <p className="text-17 color-grey mb-20 line-height-18">
                      Choose the perfect vehicle for your occasion:<br />
                      – Mercedes S-Class Bentley Continental (ultimate red-carpet arrival)<br />
                      – Rolls Royce Phantom Ghost (weddings gala events)<br />
                      – Mercedes GLE/GLS SUVs (groups with gowns suits)<br />
                      – Mercedes V-Class Sprinter vans (larger parties hens/bucks)<br /><br />
                      All with complimentary champagne, red carpet rollout, ribbons decorations on request.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Premium Special Event Transfers Melbourne
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Executive Fleet provides door-to-door luxury chauffeur service for every major Melbourne event 24/7. Enjoy early arrival options, wait-and-return service, multiple stops (pre-drinks → venue → after-party), fixed transparent pricing no surge. Our chauffeurs monitor event schedules traffic for perfect timing – never miss a minute of the action.
                    </p>
                    
                    <p className="text-17 color-grey mb-40 line-height-18">
                      Step out in style, every single time. From your home in Toorak South Yarra, hotel in CBD Crown Towers or pickup in Docklands – we eliminate parking stress, drunk-driving worries expensive rideshare surges. Whether it's Spring Racing Carnival, White Night, Comedy Festival or New Year's Eve fireworks your dedicated chauffeur ensures safe, sophisticated glamorous transfers.
                    </p>

                    <ul className="list-ticks list-ticks-small">
                      {features7SpecialEvents.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
                          {elm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <Image
              width={1710}
              height={1800}
              style={{ height: "fit-content" }}
              src="/assets/imgs/banner/airport-limo.webp"
                alt="Family Airport Transfers Melbourne"
            />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                  Family Airport Transfers Melbourne Tullamarine (MEL)
              </h3>
                <p className="text-16 color-text line-height-18">
                  The smartest choice for families flying in or out of Melbourne Airport. Flight tracking + meet & greet + zero waiting with kids.
                </p>
              </div>
            </div>
          </div>

          {/* Service 1: Australian Open */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Australian Open Transfers Melbourne – Rod Laver Arena
                </h3>
                <p className="text-16 color-text line-height-18">
                  VIP transfers to Melbourne Park for Australian Open 2026. Beat the crowds with priority drop-off, chauffeur waiting during matches, late-night safe return.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/hotel-corporate.avif"
                alt="Australian Open Transfers"
              />
            </div>
          </div>

          {/* Service 2: Melbourne Cup */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/Conference-Event Transfers.webp"
                alt="Melbourne Cup Carnival"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Melbourne Cup Carnival Chauffeur – Flemington Racecourse
                </h3>
                <p className="text-16 color-text line-height-18">
                  The most luxurious way to experience Melbourne Cup Day, Oaks Day, Derby Day Stakes Day. Arrive trackside in a Rolls Royce or Bentley – red carpet ribbons included.
              </p>
            </div>
          </div>
          </div>

          {/* Service 3: Formula 1 */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Formula 1 Australian Grand Prix Transfers Albert Park
                </h3>
                <p className="text-16 color-text line-height-18">
                  F1 weekend transfers with early track access, multiple laps if needed, chauffeur on standby throughout the Grand Prix weekend.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/V-class+bags.webp"
                alt="F1 Grand Prix Transfers"
              />
            </div>
          </div>

          {/* Service 4: Concerts */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/VIP.webp"
                alt="Concert Transfers Melbourne"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Concerts Gigs Melbourne – Rod Laver Arena John Cain Arena Sidney Myer Music Bowl
                </h3>
                <p className="text-16 color-text line-height-18">
                  Taylor Swift, Coldplay, Ed Sheeran, AFL Grand Final concerts – door-to-door service, late-night returns, no parking nightmare.
                </p>
              </div>
            </div>
          </div>

          {/* Service 5: Weddings */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Wedding Chauffeur Service Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  Multiple luxury cars for bridal party, Rolls Royce for bride groom, decorations timing coordinated perfectly.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/airport-limo.webp"
                alt="Wedding Chauffeur Melbourne"
              />
            </div>
          </div>

          {/* Service 6: Theatre */}
          <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <Image
              width={1710}
              height={1800}
              style={{ height: "fit-content" }}
              src={service.bannerImage || service.image} 
                alt="Theatre Opera Transfers"
            />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                  Theatre Opera Shows Transfers – Regent Theatre, Princess Theatre, Arts Centre Melbourne
              </h3>
                <p className="text-16 color-text line-height-18">
                  Matinee or evening shows Hamlet, Wicked, Hamilton arrive refreshed, chauffeur waits or returns later.
                </p>
              </div>
            </div>
          </div>

          {/* Service 7: Corporate Gala */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Corporate Gala Awards Night Transfers – Crown Palladium, MCEC
                </h3>
                <p className="text-16 color-text line-height-18">
                  Executive black-car service for teams, clients VIPs discreet professional arrivals.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/hotel-corporate.avif"
                alt="Corporate Gala Transfers"
              />
            </div>
          </div>

          {/* Service 8: Birthday Celebrations */}
          <div className="row align-items-center mt-90 mb-120">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/V-class+bags.webp"
                alt="Birthday Celebration Chauffeur"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Birthday Milestone Celebration Chauffeur Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  From 21st to 80th surprise parties, restaurant crawls, nightclub transfers luxury vans for groups.
              </p>
            </div>
          </div>
          </div>
          </div>
        </section>
      </main>
      <Footer9 />
    </>
  );
}
