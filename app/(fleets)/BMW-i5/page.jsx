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


export default function BMWi5page() {
  const car = cars[1]; // Get the first car directly
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
        src="/assets/imgs/fleet/BMW i5.webp"
        alt="luxride"
      />
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
          BMW i5 – Chauffeur Melbourne
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
            The BMW i5 brings a new level of modern luxury to Melbourne. Sleek, fully electric, and incredibly quiet, it delivers a premium chauffeur experience that feels futuristic from the moment you step inside. With Executive Fleet behind the wheel, you get a smooth, eco-friendly ride paired with advanced comfort and elegant styling. Whether you’re heading to the airport, attending a business meeting, or enjoying a night out, the BMW i5 keeps your journey calm, clean, and effortlessly refined.
            </p>
            <p>
            Inside the cabin, the atmosphere stays peaceful even during busy hours. The soft seats, digital displays, and silent electric performance blend together beautifully — giving you a drive that feels both relaxed and high-class.
            </p>
            <h6 className="heading-24-medium color-text mb-30">We offer</h6>
            <ul className="list-ticks list-ticks-small">
              <li className="text-16 mb-20">
                <strong>✔ Premium Electric Fleet</strong><br />
                Our BMW i5 models are fully electric, modern, and maintained to the highest standards.
              </li>
              <li className="text-16 mb-20">
                <strong>✔ Professionally Prepared Cars</strong><br />
                Every vehicle is charged, cleaned, and detailed before your trip.
              </li>
              <li className="text-16 mb-20">
                <strong>✔ Safe & Secure Travel</strong><br />
                Handled by expert chauffeurs who know Melbourne's routes inside out.
              </li>
              <li className="text-16 mb-20">
                <strong>✔ Quiet & Comfortable Ride</strong><br />
                Enjoy a smooth electric drive with plenty of space and perfect climate control.
              </li>
              <li className="text-16 mb-20">
                <strong>✔ Friendly & Skilled Chauffeurs</strong><br />
                Polite, punctual, and focused on delivering a seamless travel experience.
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
          Features of Our BMW i5 Vehicles
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
                <h5 className="text-20-medium color-text">Advanced Safety</h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  The BMW i5 is loaded with smart safety technology, giving you a secure trip with smooth handling and precise controls.
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
                  Transparent, Fair Pricing
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  What you see is what you pay. No hidden fees or surprise costs — just clear pricing for reliable electric luxury travel.
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
                  Private, Quiet Travel
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  The fully electric cabin stays peaceful, offering a private and calming space to work, relax, or enjoy the moment.
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
                <h5 className="text-20-medium color-text">Eco-Friendly Luxury</h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  The BMW i5 delivers zero-emission travel without compromising comfort or style — perfect for environmentally conscious clients.
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
                  Driven by experienced, Melbourne-based chauffeurs who prioritize safety, comfort, and punctuality.
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
                  Smooth, Silent Performance
                </h5>
              </div>
              <div className="cardDesc">
                <p className="text-16 color-text">
                  The electric motor ensures every journey is quiet, fast, and effortlessly smooth.
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
