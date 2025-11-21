"use client";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
    <section className="section banner-home8">
      <div className="box-banner-homepage-8">
        <div
          className="box-cover-image boxBgImage"
          style={{
            backgroundImage: "url(assets/imgs/page/homepage8/banner.png)",
          }}
        >
          <div className="container-sub">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <h1 className="heading-52-medium color-white mb-10 wow fadeInUp">
                Luxury Chauffeur Services Across Melbourne
                  <br className="d-none d-lg-block" />
                  Transfer
                </h1>
                <p className="color-white text-16 wow fadeInUp">
                Melbourne chauffeur services for families, weddings, 
                  <br className="d-none d-lg-block" />
                  events, and smooth, comfortable travel.
                </p>
                <div className="mt-30 wow fadeInUp">
                  <Link className="btn btn-white-big" href="/fleet-list">
                    View Our Fleet
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
              <div className="col-lg-5">
                <div className="box-search-ride box-search-ride-style-2 box-search-ride-style-4 wow fadeInUp" >
                  <div className="box-search-tabs light-input" style={{ backgroundColor: "#5b121482" }}>
                    <div className="head-tabs">
                      <ul
                        className="nav nav-tabs nav-tabs-search"
                        role="tablist"
                      >
                        <li>
                          <a
                            className="active"
                            href="#tab-distance"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="tab-distance"
                            aria-selected="true"
                          >
                            Distance
                          </a>
                        </li>
                        <li>
                          <a
                            href="#tab-hourly"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="tab-hourly"
                            aria-selected="false"
                          >
                            Hourly
                          </a>
                        </li>
                        <li>
                          <a
                            href="#tab-rate"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-controls="tab-rate"
                            aria-selected="false"
                          >
                            Flat Rate
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="tab-distance"
                        role="tabpanel"
                        aria-labelledby="tab-distance"
                      >
                        <div className="box-form-search">
                          <div className="search-item search-date">
                            <div className="search-icon">
                              <span className="item-icon icon-date"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button className="btn btn-search" type="submit">
                              <Image
                                width={20}
                                height={20}
                                src="/assets/imgs/template/icons/search.svg"
                                alt="luxride"
                              />
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="tab-hourly"
                        role="tabpanel"
                        aria-labelledby="tab-hourly"
                      >
                        <div className="box-form-search">
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-date">
                            <div className="search-icon">
                              <span className="item-icon icon-date"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button className="btn btn-search" type="submit">
                              <Image
                                width={20}
                                height={20}
                                src="/assets/imgs/template/icons/search.svg"
                                alt="luxride"
                              />
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="tab-rate"
                        role="tabpanel"
                        aria-labelledby="tab-rate"
                      >
                        <div className="box-form-search">
                          <div className="search-item search-date">
                            <div className="search-icon">
                              <span className="item-icon icon-date"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button className="btn btn-search" type="submit">
                              <Image
                                width={20}
                                height={20}
                                src="/assets/imgs/template/icons/search.svg"
                                alt="luxride"
                              />
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <style jsx global>{`
      .nav-tabs-search li a {
        color: #ffffff !important;
      }

      .nav-tabs-search li a.active::after,
      .nav-tabs-search li a.active::before {
        background-color: #ffffff !important;
      }

      .btn-search {
        background: #5b1214 !important;
        color: #ffffff !important;
        border: 2px solid #5b1214 !important;
        padding: 14px 32px !important;
        font-weight: 600 !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative !important;
        overflow: hidden !important;
        z-index: 1 !important;
      }

      .btn-search::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: -100% !important;
        width: 100% !important;
        height: 100% !important;
        background: linear-gradient(135deg, #7a1a1d 0%, #a02326 100%) !important;
        transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        z-index: -1 !important;
      }

      .btn-search:hover::before {
        left: 0 !important;
      }

      .btn-search:hover {
        border-color: #7a1a1d !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(91, 18, 20, 0.4) !important;
      }

      .btn-search svg,
      .btn-search img {
        position: relative !important;
        z-index: 2 !important;
      }

      .btn-white-big:hover {
        background: #5b1214 !important;
        color: #ffffff !important;
        border-color: #5b1214 !important;
      }
    `}</style>
    </>
  );
}
