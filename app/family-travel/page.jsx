import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7Family, features8 } from "@/data/features";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Family Airport Transfers Melbourne | Baby Seats & Boosters ",
  description:
    "Executive Fleet – Melbourne's #1 family chauffeur service. FREE baby capsules, child seats & boosters. Spacious SUVs & vans for airport, hotels, Great Ocean Road & day trips. Safe, stress-free rides."
  };

export default function FamilyTravelPage() {
  const service = services2[1]; 
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
        
        
        <section className="section pt-80 pb-100">
        <div className="container-sub">
            <div className="row">
              <div className="col-lg-12 offset-lg-0">
                <div className="airport-features-content">
                  <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
                    Family Travel Melbourne – Executive Fleet Chauffeur Service with Child Seats
                  </h2>
                  
                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Travel with your babies, toddlers, kids, teens and grandparents across Melbourne with complete peace of mind. Executive Fleet specialises in safe, spacious, luxury family transfers – with FREE baby capsules (0-6 months), rear/forward-facing child seats, boosters and ISOFIX in every vehicle. From Melbourne Tullamarine Airport (MEL) or Avalon (AVV) to Brighton, Toorak, Kew, Point Cook, Mornington Peninsula or CBD hotels – we make family travel feel like a holiday from the moment you step in.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Kid-Friendly Professional Chauffeurs
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Our chauffeurs are parents themselves, police-checked, Working With Children certified and trained in child seat installation. They drive smoothly, help with prams, luggage, snacks and even sing Wiggles songs if needed. Your family's comfort and safety is their #1 priority.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Luxury & Spacious Family Fleet
                    </h3>
                    <p className="text-17 color-grey mb-20 line-height-18">
                      – Mercedes GLE/GLS 7-seater SUVs (perfect for 4-5 people + pram + luggage)<br />
                      – Mercedes V-Class 7-seater luxury people movers (massive boot + sliding doors)<br />
                      – Mercedes Sprinter 11-13 seater vans (large families, multi-generational trips)<br /><br />
                      All vehicles have dual-zone air-conditioning, tinted windows, device charging, bottled water and optional snacks.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Best Family Airport Transfers Melbourne – Tullamarine & Avalon
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      We monitor your flight in real-time, provide complimentary 90-minute wait time, meet you inside arrivals with a personalised family name board, install child seats before you land, and load prams/suitcases while you relax. Fixed price – no surge, no stress, no taxi queues with crying kids ever again.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Travel like a VIP family, every single time. From your home in Camberwell, holiday house in Sorrento, or hotel in Crown Melbourne, The Langham, Sofitel, Southbank – we eliminate airport chaos. No more folding prams in car parks, no heavy lifting, no fighting for uberXL. Just one text when you land – your clean, cool, child-seat-ready luxury vehicle is waiting curbside.
                    </p>

                    <ul className="list-ticks list-ticks-small">
                      {features7Family.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
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

          {/* Service 2: Family Hotel Transfers */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Family Hotel & Accommodation Transfers Melbourne
                </h3>
                <p className="text-16 color-text line-height-18">
                  Direct transfers to Crown Towers, Pan Pacific, QT Melbourne, The Ritz-Carlton, holiday apartments in Docklands, St Kilda Road, South Yarra – child seats pre-fitted and tested.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/hotel-corporate.avif"
                alt="Family Hotel Transfers"
              />
            </div>
          </div>

          {/* Service 3: Great Ocean Road */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/Conference-Event Transfers.webp"
                alt="Great Ocean Road Family Day Trips"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Great Ocean Road Family Day Trips & Tours
                </h3>
                <p className="text-16 color-text line-height-18">
                  Full-day private tours with multiple stops: Twelve Apostles, Loch Ard Gorge, Lorne, Apollo Bay. We stop for ice cream, playgrounds, wildlife parks – your schedule, your pace.
                </p>
              </div>
            </div>
          </div>

          {/* Service 4: Phillip Island */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Phillip Island Penguin Parade Family Transfers
                </h3>
                <p className="text-16 color-text line-height-18">
                  Evening transfer with child seats – leave Melbourne 2pm, watch penguins at sunset, back by 10:30pm. Kids sleep comfortably on the way home.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/V-class+bags.webp"
                alt="Phillip Island Family Transfers"
              />
            </div>
          </div>

          {/* Service 5: Yarra Valley */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/VIP.webp"
                alt="Yarra Valley Family Adventure"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Yarra Valley Family Adventure (Healesville Sanctuary + Wineries)
                </h3>
                <p className="text-16 color-text line-height-18">
                  Visit animals in the morning, chocolate factory, lunch – we carry the pram and keep everyone happy.
                </p>
              </div>
            </div>
          </div>

          {/* Service 6: Mornington Peninsula */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Mornington Peninsula Hot Springs & Beach Day
                </h3>
                <p className="text-16 color-text line-height-18">
                  Peninsula Hot Springs with kids, beach stops, strawberry picking – spacious van so everyone stretches out.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/airport-limo.webp"
                alt="Mornington Peninsula Family"
              />
            </div>
          </div>

          {/* Service 7: Large Family Group */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src={service.bannerImage || service.image}
                alt="Large Family Group Transfers"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Large Family & Multi-Generational Group Transfers
                </h3>
                <p className="text-16 color-text line-height-18">
                  Up to 13 passengers in luxury Sprinter vans – perfect for grandparents + parents + kids reunions, weddings, or big family holidays.
                </p>
              </div>
            </div>
          </div>

          {/* Service 8: School Holidays Package */}
          <div className="row align-items-center mt-90 mb-120">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  School Holidays Melbourne Attractions Package
                </h3>
                <p className="text-16 color-text line-height-18">
                  Melbourne Zoo → Scienceworks → Luna Park → Sea Life Aquarium in one luxury vehicle with the same chauffeur all day.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
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
        </section>
      </main>
      <Footer9 />
    </>
  );
}
