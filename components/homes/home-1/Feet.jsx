"use client";
import { cars } from "@/data/cars";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Feet() {
  const settings = {
    spaceBetween: 30,
    slidesPerView: 3,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn1",
      prevEl: ".snbp1",
    },
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 10000,
    },
    breakpoints: {
      1399: { slidesPerView: 3 },
      1100: { slidesPerView: 2 },
      670: { slidesPerView: 2 },
      575: { slidesPerView: 1 },
      400: { slidesPerView: 1 },
      350: { slidesPerView: 1 },
      150: { slidesPerView: 1 },
    },
  };

  useEffect(() => {
    addLeftPaddingSwiper();
    window.addEventListener("resize", addLeftPaddingSwiper);
    return () => {
      window.removeEventListener("resize", addLeftPaddingSwiper);
    };
  }, []);

  return (
    <section className="section pt-120 pb-120 bg-our-fleet">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-7">
            <div className="fleet-badge wow fadeInUp">
              <span className="badge-dot"></span>
              <span className="badge-text">OUR FLEET</span>
            </div>
            <h2 className="fleet-main-heading title-fleet swiper-title wow fadeInUp">
              Explore Our <span className="golden-gradient-text">Luxury</span>{" "}
              Fleet
            </h2>
          </div>
          <div className="col-lg-6 col-5 text-end">
            <Link
              className="link-more-fleet d-flex align-items-center justify-content-end wow fadeInUp"
              href="/fleet-list"
            >
              View All Vehicles
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
            </Link>
          </div>
        </div>
      </div>

      <div className="box-slide-fleet swiper-padding mt-50">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            onSwiper={() => {}}
            className="swiper-container swiper-group-4-fleet pb-0"
          >
            {cars.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="cardFleet wow fadeInUp">
                  <div className="cardInfo">
                    <Link href={`/fleet-single/${elm.id}`}>
                      <h3 className="text-20-medium color-text mb-10">
                        {elm.title}
                      </h3>
                    </Link>
                    <p className="text-14 color-text mb-30">{elm.details}</p>
                  </div>

                  <div className="cardImage mb-30">
                    <Link href={elm.pageurl}>
                      <Image
                        width={1530}
                        height={711}
                        style={{ height: "fit-content" }}
                        src={elm.imgSrc}
                        alt={elm.title}
                      />
                    </Link>
                  </div>

                  <div className="cardInfoBottom">
                    <div className="passenger">
                      <span
                        className="icon-circle icon-passenger"
                        aria-hidden="true"
                      >
                        <svg className="fleet-icon-svg" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <span className="text-14">
                        Passengers<span>{elm.passenger}</span>
                      </span>
                    </div>
                    <div className="luggage">
                      <span
                        className="icon-circle icon-luggage"
                        aria-hidden="true"
                      >
                        <svg className="fleet-icon-svg" viewBox="0 0 24 24">
                          <rect x="4" y="8" width="16" height="12" rx="2" />
                          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M12 8v4" />
                        </svg>
                      </span>
                      <span className="text-14">
                        Luggage<span>{elm.luggage}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp1">
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
              <div className="swiper-button-next swiper-button-next-fleet snbn1">
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

      <style jsx global>{`
        /* Section Background */
        .bg-our-fleet {
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          position: relative;
          overflow: hidden;
        }

        /* Fleet Badge */
        .fleet-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid rgba(206, 155, 40, 0.2);
          padding: 10px 20px;
          border-radius: 50px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .fleet-badge:hover {
          border-color: rgba(206, 155, 40, 0.4);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.1);
        }

        .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #e8b429 100%);
          flex-shrink: 0;
        }

        .badge-text {
          color: #000000;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Fleet Main Heading */
        .fleet-main-heading {
          font-size: 48px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
          margin-bottom: 0;
        }

        @media (max-width: 1199px) {
          .fleet-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .fleet-main-heading {
            font-size: 36px;
          }
        }

        @media (max-width: 767px) {
          .fleet-main-heading {
            font-size: 30px;
          }
        }

        @media (max-width: 575px) {
          .fleet-main-heading {
            font-size: 26px;
          }
        }

        .golden-gradient-text {
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #ce9b28  0%,
            #e8b429 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* More Fleet Link */
        .link-more-fleet {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-flex !important;
          width: auto !important;
        }

        .link-more-fleet::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ce9b28 0%, #e8b429 100%);
          transition: width 0.4s ease;
        }

        .link-more-fleet:hover {
          color: #ce9b28;
        }

        .link-more-fleet:hover::after {
          width: calc(100% - 24px);
        }

        .link-more-fleet svg {
          transition: transform 0.3s ease;
        }

        .link-more-fleet:hover svg {
          transform: translate(4px, -4px);
        }

        /* Card */
        .cardFleet {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid #e8e8e8;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .cardFleet::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: height 0.3s ease;
          z-index: 10;
        }

        .cardFleet:hover::before {
          height: 4px;
        }

        .cardFleet:hover {
          transform: translateY(-8px);
          border-color: rgba(206, 155, 40, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .cardFleet::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: width 0.5s ease;
          z-index: 10;
        }

        .cardFleet:hover::after {
          width: 100%;
        }

        .cardFleet .cardInfo {
          padding: 30px 30px 0 30px;
          position: relative;
          z-index: 2;
        }

        .cardFleet .cardInfo h3 {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          min-height: 60px;
          display: flex;
          align-items: center;
        }

        .cardFleet:hover .cardInfo h3 {
          color: #ce9b28;
        }

        .cardFleet .cardInfo p {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 0;
          min-height: 44px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .cardFleet:hover .cardInfo p {
          color: #4a4a4a;
        }

        .cardFleet .cardImage {
          position: relative;
          padding: 40px 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
          margin: 0;
          overflow: visible;
        }

        .cardFleet .cardImage::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(
            circle,
            rgba(206, 155, 40, 0.05) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .cardFleet:hover .cardImage::before {
          opacity: 1;
        }

        .cardFleet .cardImage img {
          position: relative;
          z-index: 2;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1) translateY(0);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08));
        }

        .cardFleet:hover .cardImage img {
          transform: scale(1.12) translateY(-10px);
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.12));
        }

        .cardFleet .cardInfoBottom {
          padding: 25px 30px 30px 30px;
          display: flex;
          gap: 30px;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #f0f0f0;
          margin-top: auto;
          background: #ffffff;
          position: relative;
          z-index: 2;
        }

        .cardFleet .cardInfoBottom .passenger,
        .cardFleet .cardInfoBottom .luggage {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          justify-content: center;
        }

        .cardFleet .cardInfoBottom .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          transition: all 0.3s ease;
          position: relative;
        }

        .cardFleet:hover .cardInfoBottom .icon-circle {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: #ffffff;
        }

        /* icon container + svg */
        .icon-passenger,
        .icon-luggage {
          display: flex !important;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          position: relative;
        }

        /* Remove any pseudo-elements from icon classes */
        .cardFleet .icon-passenger::before,
        .cardFleet .icon-passenger::after,
        .cardFleet .icon-luggage::before,
        .cardFleet .icon-luggage::after {
          content: none !important;
          display: none !important;
        }

        .fleet-icon-svg {
          width: 24px;
          height: 24px;
          stroke: #666666;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.3s ease;
          display: block;
        }

        .cardFleet:hover .cardInfoBottom .fleet-icon-svg {
          stroke: #e8b429;
        }

        .cardFleet .cardInfoBottom .text-14 {
          font-size: 13px;
          color: #666666;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .cardFleet:hover .cardInfoBottom .text-14 {
          color: #000000;
        }

        .cardFleet .cardInfoBottom .text-14 span {
          font-weight: 700;
          color: #000000;
          margin-left: 5px;
        }

        /* Navigation Buttons */
        .swiper-button-prev-fleet,
        .swiper-button-next-fleet {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #e8e8e8;
          transition: all 0.3s ease;
        }

        .swiper-button-prev-fleet:hover,
        .swiper-button-next-fleet:hover {
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          border-color: transparent;
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(206, 155, 40, 0.3);
        }

        .swiper-button-prev-fleet svg,
        .swiper-button-next-fleet svg {
          width: 20px;
          height: 20px;
          stroke: #000000;
          transition: stroke 0.3s ease;
        }

        .swiper-button-prev-fleet:hover svg,
        .swiper-button-next-fleet:hover svg {
          stroke: #000000;
        }

        .swiper-group-4-fleet {
          padding: 10px 0 30px 0;
        }

        /* Responsive tweaks */
        @media (max-width: 1199px) {
          .cardFleet .cardInfo {
            padding: 25px 25px 0 25px;
          }

          .cardFleet .cardImage {
            padding: 35px 25px;
            min-height: 200px;
          }

          .cardFleet .cardInfoBottom {
            padding: 20px 25px 25px 25px;
          }
        }

        @media (max-width: 767px) {
          .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .badge-dot {
            width: 8px;
            height: 8px;
          }

          .fleet-badge {
            padding: 8px 16px;
          }

          .link-more-fleet {
            font-size: 14px;
          }

          .cardFleet .cardInfo {
            padding: 20px 20px 0 20px;
          }

          .cardFleet .cardInfo h3 {
            font-size: 20px;
            min-height: 50px;
          }

          .cardFleet .cardImage {
            padding: 30px 20px;
            min-height: 180px;
          }

          .cardFleet:hover .cardImage img {
            transform: scale(1.08) translateY(-8px);
          }

          .cardFleet .cardInfoBottom {
            padding: 20px;
            gap: 20px;
          }

          .cardFleet .cardInfoBottom .icon-circle {
            width: 36px;
            height: 36px;
          }

          .swiper-button-prev-fleet,
          .swiper-button-next-fleet {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </section>
  );
}
