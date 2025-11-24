"use client";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";

export default function SearchBox({ service, imageUrl, heading }) {
  return (
    <section className="section pt-0">
      <div 
        className="service-banner-section"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          objectFit: 'cover'
        }}
      >
        <div className="container-sub banner-container" style={{paddingBottom: '155px'}}>
          <div className="row align-items-end banner-row">
            {/* LEFT COLUMN - HEADING */}
            {heading && (
              <div className="col-lg-6 col-md-12">
                <div className="banner-heading-wrapper">
                  <h1 className="service-banner-heading">{heading}</h1>
                </div>
              </div>
            )}

            {/* RIGHT COLUMN - FORM */}
            <div className="col-lg-6 col-md-12">
              <div className="service-form-wrapper">
                <div className="box-search-ride box-search-ride-style-2 wow fadeInUp light-input">
                  <div className="box-search-tabs" styyle={{bottom: '-180px'}}>
                    <div className="head-tabs">
                      <ul className="nav nav-tabs nav-tabs-search" role="tablist">
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
                      {/* Distance Tab */}
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
                            <div className="search-inputs">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs">
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

                      {/* Hourly Tab */}
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
                            <div className="search-inputs">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-date">
                            <div className="search-icon">
                              <span className="item-icon icon-date"> </span>
                            </div>
                            <div className="search-inputs">
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

                      {/* Flat Rate Tab */}
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
                            <div className="search-inputs">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs">
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

      <style jsx global>{`
        .service-banner-section {
          position: relative;
          padding: 0;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
        }

        .service-banner-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .service-banner-section .banner-container {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-bottom: 80px;
        }

        .banner-row {
          min-height: auto;
        }

        .banner-heading-wrapper {
          padding-right: 40px;
        }

        .service-banner-heading {
          font-size: 52px;
          font-weight: 700;
          color: #ffffff;
          text-align: left;
          line-height: 1.15;
          margin: 0;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
          letter-spacing: -0.5px;
        }

        .service-form-wrapper {
          position: relative;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .service-banner-section {
            min-height: 500px;
            align-items: center;
          }

          .service-banner-section .banner-container {
            padding: 60px 0;
          }

          .banner-row {
            align-items: flex-start !important;
          }

          .banner-heading-wrapper {
            padding-right: 0;
            margin-bottom: 40px;
          }

          .service-banner-heading {
            font-size: 40px;
          }
        }

        @media (max-width: 767px) {
          .service-banner-section {
            min-height: 450px;
          }

          .service-banner-section .banner-container {
            padding: 50px 0;
          }

          .banner-heading-wrapper {
            margin-bottom: 30px;
          }

          .service-banner-heading {
            font-size: 32px;
          }
        }

        @media (max-width: 575px) {
          .service-banner-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
