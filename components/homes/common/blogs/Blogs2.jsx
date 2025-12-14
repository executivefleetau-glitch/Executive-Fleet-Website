"use client";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  return (
    <section className="section pt-120 pb-90 bg-primary">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-7">
            <div className="blogs-badge wow fadeInUp">
              <span className="badge-dot"></span>
              <span className="badge-text">LATEST NEWS</span>
            </div>
            <h2 className="blogs-main-heading color-white wow fadeInUp" data-wow-delay="0.1s">
              Latest From <span className="golden-gradient-text">News</span>
            </h2>
          </div>
          <div className="col-lg-6 col-5 text-end">
            <Link
              className="link-more-blogs d-inline-flex align-items-center justify-content-end wow fadeInUp"
              href="/blogs"
            >
              More News
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
        <div className="row mt-50">
          {blogs.map((elm, i) => (
            <div key={i} className="col-lg-4">
              <div className="cardNews wow fadeInUp">
                <Link href={`/blog-single/${elm.id}`}>
                  <div className="cardImage">
                    <div className="datePost">
                      <div className="heading-52-medium color-white">
                        {elm.date}.
                      </div>
                      <p className="text-14 color-white">{elm.monthYear}</p>
                    </div>
                    <Image
                      width={1104}
                      height={780}
                      src={elm.imageSrc}
                      style={{ height: "fit-content" }}
                      alt="luxride"
                    />
                    <div className="blog-image-overlay"></div>
                  </div>
                </Link>
                <div className="cardInfo">
                  <div className="tags mb-10">
                    <a href="#">{elm.category}</a>
                  </div>
                  <Link className="color-white" href={`/blog-single/${elm.id}`}>
                    <h3 className="text-20-medium color-white mb-20">
                      {elm.title}
                    </h3>
                  </Link>
                  <Link
                    className="cardLink btn btn-arrow-up"
                    href={`/blog-single/${elm.id}`}
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
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* Blogs Badge - Consistent Style */
        .blogs-badge {
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

        .blogs-badge:hover {
          border-color: rgba(206, 155, 40, 0.6);
          background: rgba(206, 155, 40, 0.15);
        }

        .blogs-badge .badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(206, 155, 40, 0.5);
        }

        .blogs-badge .badge-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Blogs Main Heading */
        .blogs-main-heading {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0;
        }

        .golden-gradient-text {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
        }

        /* More News Link */
        .link-more-blogs {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          width: auto !important;
        }

        .link-more-blogs::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          transition: width 0.4s ease;
        }

        .link-more-blogs:hover {
          color: #ce9b28;
        }

        .link-more-blogs:hover::after {
          width: calc(100% - 24px);
        }

        .link-more-blogs svg {
          transition: all 0.3s ease;
          stroke: #ffffff;
        }

        .link-more-blogs:hover svg {
          transform: translate(4px, -4px);
          stroke: #ce9b28;
        }

        /* Card Image Overlay - Keep as is */
        .cardNews .cardImage {
          position: relative;
          overflow: hidden;
        }

        .cardNews .cardImage .blog-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: rgba(5, 5, 5, 0.4) !important;
          transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
          pointer-events: none;
        }

        .cardNews:hover .cardImage .blog-image-overlay {
          height: 100%;
        }

        /* Category Tag - Golden on Hover */
        .cardNews .tags a {
          transition: all 0.3s ease;
        }

        .cardNews .tags a:hover {
          color: #ce9b28 !important;
        }

        /* Card Title - Golden on Hover */
        .cardNews h3:hover {
          color: #ce9b28 !important;
        }

        /* Arrow Button - Golden Theme */
        .cardNews .btn-arrow-up {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          border: none;
          transition: all 0.4s ease;
        }

        .cardNews .btn-arrow-up:hover {
          background: #000000;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(206, 155, 40, 0.4);
        }

        .cardNews .btn-arrow-up svg {
          stroke: #000000;
          transition: stroke 0.4s ease;
        }

        .cardNews .btn-arrow-up:hover svg {
          stroke: #ce9b28;
        }

        /* Responsive */
        @media (max-width: 1199px) {
          .blogs-main-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 991px) {
          .blogs-main-heading {
            font-size: 36px;
          }
        }

        @media (max-width: 767px) {
          .blogs-main-heading {
            font-size: 30px;
          }

          .blogs-badge .badge-text {
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          .blogs-badge .badge-dot {
            width: 8px;
            height: 8px;
          }

          .blogs-badge {
            padding: 8px 16px;
          }

          .link-more-blogs {
            font-size: 14px;
          }
        }

        @media (max-width: 575px) {
          .blogs-main-heading {
            font-size: 26px;
          }
        }
      `}</style>
    </section>
  );
}
