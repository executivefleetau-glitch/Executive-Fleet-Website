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
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
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
      1399: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
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
            <h2 className="heading-44-medium title-fleet swiper-title wow fadeInUp">
              Our Fleet
            </h2>
          </div>
          <div className="col-lg-6 col-5 text-end">
            <Link
              className="text-16-medium color-primary wow fadeInUp"
              href="/fleet-list"
            >
              More Fleet
              <svg
                className="icon-16"
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
                    <p className="text-14 color-text mb-30">
                      {elm.description}
                    </p>
                  </div>
                  <div className="cardImage mb-30">
                    <Link href={`/fleet-single/${elm.id}`}>
                      <Image
                        width={1530}
                        height={711}
                        style={{ height: "fit-content" }}
                        src={elm.imgSrc}
                        alt="Luxride"
                      />
                    </Link>
                  </div>
                  <div className="cardInfoBottom">
                    <div className="passenger">
                      <span className="icon-circle icon-passenger"></span>
                      <span className="text-14">
                        Passengers<span>{elm.passenger}</span>
                      </span>
                    </div>
                    <div className="luggage">
                      <span className="icon-circle icon-luggage"></span>
                      <span className="text-14">
                        Luggage<span>{elm.luggage}</span>
                      </span>
                    </div>
                  </div>
                  <div className="fleet-card-overlay"></div>
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
        .cardFleet {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid transparent;
        }

        .cardFleet::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.8s ease;
          z-index: 3;
          pointer-events: none;
        }

        .cardFleet:hover::before {
          left: 100%;
        }

        .cardFleet::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: #5b1214;
          transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 3;
        }

        .cardFleet:hover::after {
          width: 100%;
          right: auto;
          left: 0;
        }

        .cardFleet:hover {
          transform: translateY(-8px);
          border-color: rgba(91, 18, 20, 0.15);
          box-shadow: 0 15px 45px rgba(91, 18, 20, 0.12);
        }

        .fleet-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(91, 18, 20, 0.03) 0%, rgba(91, 18, 20, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
          pointer-events: none;
        }

        .cardFleet:hover .fleet-card-overlay {
          opacity: 1;
        }

        .cardFleet .cardImage {
          position: relative;
          overflow: visible;
          z-index: 2;
        }

        .cardFleet .cardImage img {
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1) translateY(0);
          filter: drop-shadow(0 0 0 transparent);
        }

        .cardFleet:hover .cardImage img {
          transform: scale(1.12) translateY(-8px);
          filter: drop-shadow(0 18px 40px rgba(91, 18, 20, 0.2));
        }

        .cardFleet .cardInfo,
        .cardFleet .cardInfoBottom {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .cardFleet:hover .cardInfo h3,
        .cardFleet:hover .cardInfo p {
          color: #5b1214;
        }

        .cardFleet .cardInfo h3 {
          transition: color 0.4s ease;
        }

        .cardFleet .cardInfo p {
          transition: color 0.4s ease;
        }
      `}</style>
    </section>
  );
}
