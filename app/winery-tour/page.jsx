import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { services2 } from "@/data/services";
import { features7WineryTours, features8 } from "@/data/features";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Luxury Winery Tours Melbourne | Yarra Valley Chauffeur",
  description:
    "Executive Fleet – Private luxury chauffeur winery tours Melbourne. Yarra Valley, Mornington Peninsula, Macedon Ranges & Bellarine. Custom itineraries, top cellar doors, gourmet lunch. Mercedes fleet, zero drink-driving.",
  keywords: "Melbourne airport transfers, Tullamarine airport chauffeur, luxury airport transfer Melbourne, MEL airport pickup, private airport car service Melbourne",
};

export default function SpecialEventPage() {
  const service = services2[4]; // Airport Transfers service (id: 3)
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
       
        
        <section className="section pt-80 pb-100">
          <div className="container-sub">
            <div className="row">
              <div className="col-lg-12 offset-lg-0">
                <div className="airport-features-content">
                  <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
                    Luxury Winery Tours Melbourne – Executive Fleet Private Chauffeur Service
                  </h2>
                  
                  <div className="content-single wow fadeInUp">
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Discover Melbourne's world-class wine regions in complete luxury and zero stress. Executive Fleet offers private, chauffeur-driven winery tours tailored exactly to your taste – whether you love cool-climate Pinot Noir, sparkling wine at Domaine Chandon, or sunset sessions at Pt. Leo Estate. Full-day or multi-day tours from Melbourne CBD or airport, with custom itineraries, gourmet lunch bookings and door-to-door service.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Expert Wine-Loving Chauffeurs
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Our chauffeurs are local wine enthusiasts – they know hidden gems, best tasting times, and secret cellar door entrances. They handle all hold Victorian Driver Accreditation, love recommending wines, and drive smoothly so you enjoy every sip without worry.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Premium Fleet for Winery Tours
                    </h3>
                    <p className="text-17 color-grey mb-20 line-height-18">
                      – Mercedes S-Class E-Class sedans (2-4 guests, intimate tours)<br />
                      – Mercedes GLE/GLS SUVs (perfect for couples + cases of wine)<br />
                      – Mercedes V-Class luxury people movers (6-7 guests + cheese platters)<br />
                      – Mercedes Sprinter vans (8-13 guests, big groups)<br /><br />
                      All with chilled water, champagne flutes, picnic blankets, cooler bags for your purchases.
                    </p>

                    <h3 className="text-24-medium color-text mb-20 mt-40">
                      Best Private Winery Tours Melbourne – Yarra Valley, Mornington Peninsula & Beyond
                    </h3>
                    <p className="text-17 color-grey mb-30 line-height-18">
                      Executive Fleet delivers bespoke luxury wine tours 7 days a week. Choose your region, wineries, lunch spot – or let us design the perfect day. Includes all tasting fees at premium cellar doors, restaurant reservations, hot air balloon add-ons in Yarra Valley, cheese/chocolate stops. Fixed-price packages, no surge, complimentary pickup from Melbourne CBD, South Yarra, Toorak, Brighton or Tullamarine Airport.
                    </p>

                    <p className="text-17 color-grey mb-40 line-height-18">
                      Taste, sip and relax – we drive, carry cases, and get you home safely. No rushing between wineries, no nominated driver, no parking stress at Montalto or Hubert Estate. Just pure indulgence from the moment your chauffeur arrives with chilled water and a smile.
                    </p>

                    <ul className="list-ticks list-ticks-small">
                      {features7WineryTours.map((elm, i) => (
                        <li key={i} className="text-16 mb-20">
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
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Yarra Valley Winery Tour – Most Popular Luxury Day Trip
                </h3>
                <p className="text-16 color-text line-height-18">
                  The ultimate Yarra Valley experience: Domaine Chandon → Hubert Estate → Levantine Hill → Oakridge Wines → De Bortoli or Tokar Estate. Finish with cheese at Yarra Valley Dairy or chocolate at Yering Farm. Optional sunrise hot air balloon + sparkling breakfast.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/winry.jpg"
                alt="Yarra Valley Winery Tour"
              />
            </div>
          </div>

          {/* Service 2: Mornington Peninsula */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/winry-tour.jpg"
                alt="Mornington Peninsula Winery Tour"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Mornington Peninsula Winery Tour – Scenic Coastal Luxury
                </h3>
                <p className="text-16 color-text line-height-18">
                  Stunning ocean views + cool-climate wines: Port Phillip Estate → Pt. Leo Estate (lunch + sculpture park) → Montalto → Ten Minutes by Tractor → Crittenden Estate → Polperro. Add Peninsula Hot Springs soak at the end.
                </p>
              </div>
            </div>
          </div>

          {/* Service 3: Macedon Ranges */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Macedon Ranges Winery Tour – Cool-Climate Hidden Gem
                </h3>
                <p className="text-16 color-text line-height-18">
                  Elegant sparkling Pinot: Hanging Rock Winery → Gisborne Peak → Curly Flat → Mount Towrong → Granite Hills. Lunch at Mount Macedon Winery restaurant with epic views.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/V-class+bags.webp"
                alt="Macedon Ranges Winery Tour"
              />
            </div>
          </div>

          {/* Service 4: Bellarine Peninsula */}
          <div className="row align-items-center mt-90">
            <div className="col-lg-6 mb-30 wow fadeInUp">
              <Image
                width={1710}
                height={1800}
                style={{ height: "fit-content" }}
                src="/assets/imgs/banner/Chauffeured-Winery-Tours.jpg"
                alt="Bellarine Peninsula Wine Tour"
              />
            </div>
            <div className="col-lg-6 mb-30">
              <div className="box-info-right wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Bellarine Peninsula Wine Tour – Relaxed Coastal Vibes
                </h3>
                <p className="text-16 color-text line-height-18">
                  Laid-back tasting with ocean breezes: Jack Rabbit Vineyard (iconic lunch view) → Scotchmans Hill → Leura Park Estate → Yes Said the Seal → Terindah Estate. Add sea swim or brewery stop.
                </p>
              </div>
            </div>
          </div>

          {/* Service 5: Multi-Region Weekend */}
          <div className="row align-items-center mt-90 mb-120">
            <div className="col-lg-6 mb-30">
              <div className="box-info-left wow fadeInUp">
                <h3 className="heading-44-medium color-text mb-30">
                  Ultimate Multi-Region Weekend Tour (2-3 Days)
                </h3>
                <p className="text-16 color-text line-height-18">
                  Day 1 Yarra Valley + hot air balloon, overnight Healesville<br />
                  Day 2 Mornington Peninsula + hot springs<br /><br />
                  Perfect for birthdays, anniversaries, hens parties or corporate rewards.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow fadeInUp">
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
        </section>
      </main>
      <Footer9 />
    </>
  );
}
