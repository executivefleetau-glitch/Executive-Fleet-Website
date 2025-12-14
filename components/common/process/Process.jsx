"use client";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { process } from "@/data/process";
import Image from "next/image";
function PrevArrow() {
  return (
    <button type="button" className="slick-prev">
      <svg
        className="w-6 h-6 icon-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    </button>
  );
}

function NextArrow() {
  return (
    <button type="button" className="slick-next">
      <svg
        className="w-6 h-6 icon-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </button>
  );
}

export default function Process() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: 0,
    fade: false,
    draggable: false,

    // asNavFor: ".slider-nav-thumbnails"
  };
  const options2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderRef1.current,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    infinite: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <section className="section pt-120 pb-20 bg-primary bg-how-it-works">
      <div className="container-sub">
        <div className="process-badge wow fadeInUp">
          <span className="badge-dot"></span>
          <span className="badge-text">HOW IT WORKS</span>
        </div>
        <h2 className="process-main-heading color-white mb-60 wow fadeInUp">
          Simple <span className="golden-gradient-text">Booking</span> Process
        </h2>
        <div className="row">
          <div className="col-lg-6 order-lg-last">
            <div className="box-main-slider">
              <div className="detail-gallery wow fadeInUp">
                <Slider
                  asNavFor={nav2}
                  ref={(slider) => (sliderRef1 = slider)}
                  {...options}
                  className="main-image-slider"
                >
                  {process.map((elm, i) => (
                    <figure key={i}>
                      <Image
                        width={400}
                        height={600}
                        src={elm.img}
                        alt="process-img"
                        className="w-[500px] h-[600px]"
                      />
                    </figure>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-lg-first justify-content-between position-z3 wow fadeInUp">
            <Slider
              {...options2}
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              className="slider-nav-thumbnails list-how"
            >
              {process.map((elm, i) => (
                <li key={i}>
                  <span className="line-white"></span>
                  <h4 className="text-20-medium mb-20">{elm.title}</h4>
                  <p className="text-16">{elm.description}</p>
                </li>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Process Badge - Consistent Style */
        .process-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .process-badge:hover {
          border-color: rgba(206, 155, 40, 0.6);
          background: rgba(206, 155, 40, 0.15);
        }

        .process-badge .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(206, 155, 40, 0.5);
        }

        .process-badge .badge-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Process Main Heading */
        .process-main-heading {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (max-width: 1199px) {
          .process-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .process-main-heading {
            font-size: 36px;
          }
        }

        @media (max-width: 767px) {
          .process-main-heading {
            font-size: 30px;
          }

          .process-badge .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .process-badge .badge-dot {
            width: 8px;
            height: 8px;
          }

          .process-badge {
            padding: 8px 16px;
          }
            .main-image-slider img{
            height: 300px;}
        }

        @media (max-width: 575px) {
          .process-main-heading {
            font-size: 26px;
          }
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* Large Screen Adjustment for 1440px */
        @media (min-width: 1440px) {
          .box-main-slider {
            top: 30% !important;
          }
        }
      `}</style>
    </section>
  );
}
