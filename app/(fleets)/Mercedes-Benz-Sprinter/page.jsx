"use client";

import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import BusnessClassFleet from "@/components/fleet-single/BusnessClassFleet";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { cars } from "@/data/cars";
import React, { useEffect } from "react";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";

const slideImages = [
  "/assets/imgs/page/fleet/slide1.png",
  "/assets/imgs/page/fleet/slide2.png",
  "/assets/imgs/page/fleet/slide1.png",
  "/assets/imgs/page/fleet/slide2.png",
];


export default function BMWX7page() {
  const car = cars[5]; // Get the first car directly
  useEffect(() => {
    addLeftPaddingSwiper();
  }, []);

  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn31",
      prevEl: ".snbp31",
    },
    modules: [Autoplay, Navigation],
    autoplay: {
      delay: 10000,
    },

    breakpoints: {
      1399: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 2,
      },
      670: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BreadCumb />
        {/* Details Section */}
        <section className="section">
      <Image
        width={1920}
        height={760}
        style={{ height: "fit-content" }}
        className=""
        src="/assets/imgs/fleet/Mercedes-Benz Sprinter.jpg"
        alt="luxride"
      />
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
          Mercedes GLS – Chauffeur Melbourne

          </h2>
          <div className="content-single wow fadeInUp">
            <p>
            The Mercedes GLS brings a blend of power, elegance, and full-size luxury to Melbourne’s roads. With Executive Fleet managing your journey, you get a chauffeur experience that feels spacious, smooth, and incredibly refined. Whether you're traveling with family, attending an event, or need a premium SUV for business travel, the GLS delivers comfort and presence in every moment.
             </p>
            <p>
            Inside, the GLS offers a generous cabin with soft leather seating, advanced tech, and a naturally quiet ride. Every detail is designed to make long drives, airport transfers, and city trips feel calm, relaxed, and effortlessly upscale.
            </p>
            <h6 className="heading-24-medium color-text mb-30">We offer</h6>
            <ul className="list-ticks list-ticks-small">
              <li className="text-16 mb-20">
                <strong> Premium Luxury Van Fleet</strong><br />
                Our Mercedes-Benz Sprinter vans offer exceptional space, comfort, and versatility for larger groups.
              </li>
              <li className="text-16 mb-20">
                <strong> Professionally Prepared Vehicles</strong><br />
                Each Sprinter is fully cleaned, inspected, and detailed before your pickup.
              </li>
              <li className="text-16 mb-20">
                <strong> Safe & Comfortable Group Travel</strong><br />
                Driven by professional chauffeurs who know Melbourne's roads and deliver a safe, smooth ride.
              </li>
              <li className="text-16 mb-20">
                <strong> Maximum Space & Group Comfort</strong><br />
                Perfect for corporate groups, large families, or events requiring seating for up to 12 passengers.
              </li>
              <li className="text-16 mb-20">
                <strong> Polite & Experienced Chauffeurs</strong><br />
                Friendly, punctual, and committed to giving you a top-level group travel experience.
              </li>
            </ul>
            <div className="mt-30">
              <a className="btn btn-primary btn-book" href="/booking-vehicle">
                Book Now
                <svg
                  className="icon-16 ml-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="box-slide-fleet mt-120 wow fadeInUp">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            className="swiper-container swiper-group-2-single-fleet pb-0"
          >
            {slideImages.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <Image
                  width={870}
                  height={600}
                  style={{ height: "fit-content" }}
                  src={elm}
                  alt="luxride"
                />
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp31">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-fleet snbn31">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
        </section>

        {/* Book Section */}
        <BookSection car={car} />
      
        {/* Features */}
        <section className="section mt-120">
        <div className="container-sub">
          <h2 className="heading-44-medium wow fadeInUp">
            Features of Our Mercedes-Benz Sprinter Vehicles
          </h2>
          <div className="row mt-50 cardIconTitleDescLeft">
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={56}
                    height={56}
                    src="/assets/imgs/page/fleet/camera.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">Advanced Group Safety</h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    Equipped with Mercedes safety technology designed for secure group travel and confident journeys.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={56}
                    height={56}
                    src="/assets/imgs/page/fleet/water.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">
                    Clear, Fair Pricing
                  </h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    Transparent group rates with no hidden charges — premium service with honest pricing.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={64}
                    height={64}
                    src="/assets/imgs/page/fleet/coffee.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">
                    Spacious Group Cabin
                  </h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    A comfortable interior with seating for up to 12 passengers, perfect for corporate events or family travel.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={56}
                    height={56}
                    src="/assets/imgs/page/fleet/newspaper.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">Smooth Group Performance</h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    Reliable handling and smooth ride quality make the Sprinter ideal for any route and weather.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={56}
                    height={56}
                    src="/assets/imgs/page/fleet/cooperation.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">
                    Professional Chauffeurs
                  </h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    Handled by trained drivers experienced in group travel who prioritize comfort, safety, and punctuality.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image
                    width={64}
                    height={64}
                    src="/assets/imgs/page/fleet/rim.svg"
                    alt="luxride"
                  />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">
                    Luxury Group Transport
                  </h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">
                    The Sprinter delivers premium group travel with ample cargo space, combining practicality with comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>
        
      </main>
      <Footer1 />
    </>
  );
}
