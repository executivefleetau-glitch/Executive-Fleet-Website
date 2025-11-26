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


export default function BMW5Seriespage() {
  const car = cars[0]; // Get the first car directly
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
        src="/assets/imgs/fleet/BMW 5 series.webp"
        alt="luxride"
      />
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
          BMW 5 Series – Chauffeur Melbourne
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
            The BMW 5 Series brings a mix of elegance and modern comfort that feels right at home on Melbourne’s roads. With Executive Fleet handling the drive, every trip turns into a smooth, stress-free experience. Whether you’re catching a flight, heading to a meeting, or stepping out for a special occasion, this luxury sedan delivers the perfect balance of style and performance. Settle in, relax, and enjoy a ride that feels effortless from the moment the door closes.

            </p>
            <p>
            Even on busy days, the BMW 5 Series keeps things calm inside the cabin. Soft leather seating, advanced features, and its refined drive come together beautifully — giving you a journey that’s both comfortable and quietly impressive.

            </p>
            <h6 className="heading-24-medium color-text mb-30">We offer</h6>
            <ul className="list-ticks list-ticks-small">
              <li className="text-16 mb-20">
                <strong> Premium BMW 5 Series Fleet</strong><br />
                Well-kept, elegant sedans ready for every type of transfer.
              </li>
              <li className="text-16 mb-20">
                <strong> Professionally Prepared Vehicles</strong><br />
                Each car is cleaned, detailed, and maintained to high standards.
              </li>
              <li className="text-16 mb-20">
                <strong> Safe & Secure Experience</strong><br />
                Driven by trained chauffeurs who know Melbourne's routes inside out.
              </li>
              <li className="text-16 mb-20">
                <strong> Comfort Above Everything</strong><br />
                Smooth rides, spacious interiors, and perfect temperature control.
              </li>
              <li className="text-16 mb-20">
                <strong> Polite & Skilled Chauffeurs</strong><br />
                Friendly, punctual, and focused on delivering a seamless service.
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
          Features of Our BMW 5 Series Vehicles
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
                <h5 className="text-20-medium color-text">Premium Safety</h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  Enjoy every ride with peace of mind. Our chauffeurs are trained professionals, and every BMW 5 Series is maintained to high safety standards for a smooth, secure journey.
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
                  Transparent Pricing
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  What you book is exactly what you pay. No hidden fees, no surprise add-ons — just clear, honest pricing for your luxury BMW 5 Series travel.
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
                  Private Travel Experience
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  Your comfort and privacy matter. The BMW 5 Series offers a quiet, refined cabin that keeps your trip relaxed, discreet, and tailored to your needs.
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
                <h5 className="text-20-medium color-text">Comfort-Focused Design</h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  From soft leather seating to refined suspension, the BMW 5 Series is built to keep your ride enjoyable, even on longer trips.
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
                  Ride with experienced drivers who know Melbourne's roads and deliver punctual, polished service from start to finish.
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
                  Smooth & Stylish Performance
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  German engineering ensures every journey feels effortless — stable handling, quiet drive, and a touch of luxury in every mile.
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
