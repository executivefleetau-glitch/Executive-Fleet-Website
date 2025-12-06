"use client";

import { services } from "@/data/services";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Service() {
  useEffect(() => {
    addLeftPaddingSwiper();
    //add padding to .swiper-padding according to .swiper-title
    window.addEventListener("resize", addLeftPaddingSwiper);
    return () => {
      window.removeEventListener("resize", addLeftPaddingSwiper);
    };
  }, []);
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
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
      600: {
        slidesPerView: 2,
      },
      500: {
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
    <section className="section pt-90 pb-120 xl:pr-120 pr-10 bg-our-service">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-7 col-7">
            <div className="service-badge wow fadeInUp">
              <span className="badge-dot"></span>
              <span className="badge-text-service">OUR SERVICES</span>
            </div>
            <h2 className="service-main-heading wow fadeInUp swiper-title">
              Redefining Luxury <span className="golden-gradient-text">Travel</span>
            </h2>
          </div>
          <div className="col-lg-6 col-sm-5 col-5 text-end">
            <Link
              className="link-more-services d-flex align-items-center justify-content-end wow fadeInUp"
              href="/service-grid"
            >
              More Services
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
      <div className="box-slide-fleet mt-50 swiper-padding">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            className="swiper-container swiper-group-4-service pb-0"
          >
            {services.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="cardService wow fadeInUp">
                  <div className="cardInfo">
                    <h3 className="cardTitle text-20-medium color-white mb-10">
                      {elm.title}
                    </h3>
                    <div className="box-inner-info">
                      <p className="cardDesc text-14 color-white mb-30">
                        {elm.description}
                      </p>
                      <Link
                        className="cardLink btn btn-arrow-up"
                        href={`/service-single/${elm.id}`}
                      >
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
                  <div className="cardImage">
                    <div className="image-overlay-slide"></div>
                    <Image
                      width={370}
                      height={400}
                      style={{ height: "fit-content" }}
                      src={elm.image}
                      alt="Luxride"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp3">
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
              <div className="swiper-button-next swiper-button-next-fleet snbn3">
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
    
    <style jsx global>{`
      /* Section Background */
      .bg-our-service {
        background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
        position: relative;
      }

      .bg-our-service::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(206, 155, 40, 0.3) 50%, transparent 100%);
      }

      /* Service Badge - Same Style as About Section */
      .service-badge {
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

      .service-badge:hover {
        border-color: rgba(206, 155, 40, 0.4);
        box-shadow: 0 4px 15px rgba(206, 155, 40, 0.1);
      }

      .badge-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
        flex-shrink: 0;
      }

      .badge-text-service {
        color: #000000;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      /* Enhanced Main Heading */
      .service-main-heading {
        font-size: 48px;
        font-weight: 700;
        color: #000000;
        line-height: 1.2;
        margin-bottom: 0;
        margin-top: 0;
      }

      @media (max-width: 1199px) {
        .service-main-heading {
          font-size: 42px;
        }
      }

      @media (max-width: 991px) {
        .service-main-heading {
          font-size: 36px;
        }
      }

      @media (max-width: 767px) {
        .service-main-heading {
          font-size: 30px;
        }
      }

      @media (max-width: 575px) {
        .service-main-heading {
          font-size: 26px;
        }
      }

      /* Golden Gradient Text */
      .golden-gradient-text {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        font-weight: 800;
      }

      /* More Services Link */
      .link-more-services {
        font-size: 16px;
        font-weight: 600;
        color: #000000;
        text-decoration: none;
        transition: all 0.3s ease;
        position: relative;
        display: inline-flex !important;
        width: auto !important;
      }

      .link-more-services::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
        transition: width 0.4s ease;
      }

      .link-more-services:hover {
        color: #ce9b28;
      }

      .link-more-services:hover::after {
        width: calc(100% - 24px);
      }

      .link-more-services svg {
        transition: transform 0.3s ease;
      }

      .link-more-services:hover svg {
        transform: translate(4px, -4px);
      }

      /* Card Service Enhancements */
      .cardService {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
      }

      .cardService::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px;
        border: 2px solid transparent;
        transition: all 0.4s ease;
        pointer-events: none;
      }

      .cardService:hover::before {
        border-color: rgba(206, 155, 40, 0.3);
        box-shadow: 0 8px 30px rgba(206, 155, 40, 0.15);
      }

      /* Keep the Perfect Overlay Effect - NO CHANGES */
      .cardService .cardImage {
        position: relative !important;
        overflow: hidden !important;
      }

      .cardService .image-overlay-slide {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 0 !important;
        background: rgba(5, 5, 5, 0.4) !important;
        transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        z-index: 10 !important;
        pointer-events: none !important;
      }

      .cardService:hover .image-overlay-slide {
        height: 100% !important;
      }

      /* Arrow Button Enhancement with Golden Gradient */
      .btn-arrow-up {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000;
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .btn-arrow-up::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #000000;
        transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      .btn-arrow-up:hover::before {
        left: 0;
      }

      .btn-arrow-up svg {
        stroke: #000000;
        transition: all 0.4s ease;
      }

      .btn-arrow-up:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(206, 155, 40, 0.4);
      }

      .btn-arrow-up:hover svg {
        stroke: #ffffff;
        transform: translate(2px, -2px);
      }

      /* Navigation Buttons with Golden Gradient */
      .swiper-button-prev-fleet,
      .swiper-button-next-fleet {
        transition: all 0.3s ease;
      }

      .swiper-button-prev-fleet:hover,
      .swiper-button-next-fleet:hover {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        border-color: transparent;
      }

      .swiper-button-prev-fleet:hover svg,
      .swiper-button-next-fleet:hover svg {
        stroke: #000000;
      }

      /* Card Info Text Enhancement */
      .cardService .cardTitle {
        transition: color 0.3s ease;
      }

      .cardService:hover .cardTitle {
        color: #ffffff !important;
      }

      .cardService .cardDesc {
        transition: color 0.3s ease;
      }

      .cardService:hover .cardDesc {
        color: rgba(255, 255, 255, 0.95) !important;
      }

      /* Responsive adjustments */
      @media (max-width: 767px) {
        .badge-text-service {
          font-size: 10px;
          letter-spacing: 1.5px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
        }

        .service-badge {
          padding: 8px 16px;
        }

        .link-more-services {
          font-size: 14px;
        }
      }
    `}</style>
    </>
  );
}
