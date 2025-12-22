"use client";
import { useEffect, useState } from "react";
import { carBrands, carTypes, cars } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";

export default function FeetList1() {
  const [selectedCarTypes, setSelectedCarTypes] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCars, setSelectedCars] = useState(cars);

  useEffect(() => {
    let items = cars;
    if (selectedCarTypes !== "All") {
      items = items.filter((elm) => elm.carType === selectedCarTypes);
    }
    if (selectedBrand !== "All") {
      items = items.filter((elm) => elm.brand === selectedBrand);
    }
    setSelectedCars(items);
  }, [selectedCarTypes, selectedBrand]);

  return (
    <>
      <section className="fleet-list-section section pt-80 pb-80">
        <div className="container-sub">
          {/* Header Section */}
          <div className="row align-items-center mb-50">
            <div className="col-lg-6 col-md-6 col-sm-12 text-center text-sm-start mb-30 mb-sm-0">
              <div className="fleet-list-badge wow fadeInDown">
                <span className="golden-dot"></span>
                <span>OUR FLEET</span>
              </div>
              <h2 className="fleet-list-main-title wow fadeInUp">
                Choose Your <span style={{ color: '#ce9b28' }}>Luxury Fleet</span>
              </h2>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 text-center text-sm-end wow fadeInUp">
              <div className="fleet-filters">
                {/* Vehicle Type */}
                <div className="dropdown fleet-dropdown">
                  <a
                    className="dropdown-toggle fleet-filter-btn"
                    id="dropdownMenuButton1"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                    Vehicle Type
                  </a>
                  <ul
                    className="dropdown-menu fleet-dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {carTypes.map((elm, i) => (
                      <li key={i} onClick={() => setSelectedCarTypes(elm)}>
                        <a
                          className={`dropdown-item ${selectedCarTypes === elm ? "active" : ""
                            }`}
                        >
                          {elm}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vehicle Make */}
                <div className="dropdown fleet-dropdown">
                  <a
                    className="dropdown-toggle fleet-filter-btn"
                    id="dropdownMenuButton2"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8m-4-4h8" />
                    </svg>
                    Vehicle Brand
                  </a>
                  <ul
                    className="dropdown-menu fleet-dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {carBrands.map((elm, i) => (
                      <li key={i} onClick={() => setSelectedBrand(elm)}>
                        <a
                          className={`dropdown-item ${selectedBrand === elm ? "active" : ""
                            }`}
                        >
                          {elm}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Cards */}
          <div className="row">
            {selectedCars.slice(0, 6).map((elm, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-40">
                <div
                  className="fleet-card wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  {/* Top border animation */}
                  <div className="fleet-card-border-top"></div>

                  {/* Card Header */}
                  <div className="fleet-card-header">
                    <Link href={elm.pageurl}>
                      <h3 className="fleet-card-title">{elm.title}</h3>
                    </Link>
                    <p className="fleet-card-description">
                      {elm.details}
                    </p>
                  </div>

                  {/* Car Image */}
                  <div className="fleet-card-image">
                    <div className="fleet-image-wrapper">
                      <Link href={elm.pageurl}>
                        <Image
                          width={1530}
                          height={711}
                          src={elm.imgSrc}
                          alt={elm.title}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="fleet-card-footer">
                    <div className="fleet-info-item">
                      <div className="fleet-icon-circle">
                        <span className="icon-passenger" aria-hidden="true">
                          <svg
                            className="fleet-icon-svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                      </div>
                      <span className="fleet-info-label">Passengers</span>
                      <span className="fleet-info-value">
                        {elm.passengerDisplay || elm.passenger}
                      </span>
                    </div>

                    <div className="fleet-info-item">
                      <div className="fleet-icon-circle">
                        <span className="icon-luggage" aria-hidden="true">
                          <svg
                            className="fleet-icon-svg"
                            viewBox="0 0 24 24"
                          >
                            <rect x="4" y="8" width="16" height="12" rx="2" />
                            <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M12 8v4" />
                          </svg>
                        </span>
                      </div>
                      <span className="fleet-info-label">Luggage</span>
                      <span className="fleet-info-value">{elm.luggageDisplay || elm.luggage}</span>
                    </div>
                  </div>

                  {/* Bottom border animation */}
                  <div className="fleet-card-border-bottom"></div>
                </div>
              </div>
            ))}

            {!selectedCars.length && (
              <div className="col-12">
                <div className="no-results-message">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>No vehicles found. Please try a different filter.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .fleet-list-section {
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          min-height: 100vh;
        }

        /* Badge and Title */
        .fleet-list-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
        }

        .fleet-list-badge .golden-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          border-radius: 50%;
          display: inline-block;
        }

        .fleet-list-badge span:not(.golden-dot) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ce9b28;
          text-transform: uppercase;
        }

        .fleet-list-main-title {
          font-size: 42px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
          margin: 0;
        }

        .golden-text {
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Filter Buttons */
        .fleet-filters {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .fleet-dropdown {
          position: relative;
        }

        .fleet-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: #ffffff;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #000000;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .fleet-filter-btn svg {
          stroke: #666666;
          transition: stroke 0.3s ease;
        }

        .fleet-filter-btn:hover {
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.05);
          color: #ce9b28;
        }

        .fleet-filter-btn:hover svg {
          stroke: #ce9b28;
        }

        .fleet-dropdown-menu {
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          min-width: 200px;
        }

        .fleet-dropdown-menu .dropdown-item {
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .fleet-dropdown-menu .dropdown-item:hover {
          background: rgba(206, 155, 40, 0.1);
          color: #ce9b28;
        }

        .fleet-dropdown-menu .dropdown-item.active {
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          color: #000000;
          font-weight: 700;
        }

        /* Fleet Card */
        .fleet-card {
          background: #ffffff;
          border-radius: 16px;
          border: 2px solid #e5e5e5;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }

        /* Top border animation */
        .fleet-card-border-top {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .fleet-card:hover .fleet-card-border-top {
          left: 0;
        }

        /* Bottom border animation */
        .fleet-card-border-bottom {
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            #ce9b28 0%,
            #fffbe9 50%,
            #e8b429 100%
          );
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .fleet-card:hover .fleet-card-border-bottom {
          left: 0;
        }

        /* Card Header */
        .fleet-card-header {
          padding: 30px 30px 20px;
          flex-shrink: 0;
          min-height: 140px;
          display: flex;
          flex-direction: column;
        }

        .fleet-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 12px;
          transition: color 0.3s ease;
          text-decoration: none;
          display: block;
        }

        .fleet-card:hover .fleet-card-title {
          color: #ce9b28;
        }

        .fleet-card-description {
          font-size: 14px;
          line-height: 1.6;
          color: #666666;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Card Image */
        .fleet-card-image {
          padding: 0 30px;
          margin-bottom: 25px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fleet-image-wrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 20px;
        }

        .fleet-image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fleet-card:hover .fleet-image-wrapper img {
          transform: scale(1.08);
        }

        /* Card Footer */
        .fleet-card-footer {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 25px 30px 30px;
          border-top: 1px solid #f0f0f0;
          margin-top: auto;
          flex-shrink: 0;
        }

        .fleet-info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .fleet-icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f5f5f5;
          border: 2px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          position: relative;
        }

        .icon-passenger,
        .icon-luggage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .fleet-icon-svg {
          width: 24px;
          height: 24px;
          stroke: #000000;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.4s ease;
        }

        .fleet-card:hover .fleet-icon-circle {
          background: #000000;
          border-color: #ce9b28;
        }

        .fleet-card:hover .fleet-icon-circle .fleet-icon-svg {
          stroke: #e8b429;
        }

        .fleet-info-label {
          font-size: 12px;
          font-weight: 600;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fleet-info-value {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          transition: color 0.3s ease;
        }

        .fleet-card:hover .fleet-info-value {
          color: #ce9b28;
        }

        /* Hover Effects */
        .fleet-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(206, 155, 40, 0.4);
        }

        /* No Results Message */
        .no-results-message {
          text-align: center;
          padding: 60px 20px;
        }

        .no-results-message svg {
          stroke: #ce9b28;
          margin-bottom: 20px;
        }

        .no-results-message p {
          font-size: 18px;
          color: #666666;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .fleet-list-main-title {
            font-size: 36px;
          }

          .fleet-filters {
            justify-content: center;
            margin-top: 20px;
          }

          .fleet-card-header {
            min-height: 130px;
            padding: 25px 25px 15px;
          }

          .fleet-card-title {
            font-size: 20px;
          }
        }

        @media (max-width: 767px) {
          .fleet-list-section {
            padding: 60px 0;
          }

          .fleet-list-main-title {
            font-size: 28px;
          }

          .fleet-filters {
            gap: 10px;
          }

          .fleet-filter-btn {
            padding: 10px 18px;
            font-size: 14px;
          }

          .fleet-card-header {
            min-height: 120px;
            padding: 20px 20px 15px;
          }

          .fleet-card-title {
            font-size: 18px;
          }

          .fleet-card-description {
            font-size: 13px;
          }

          .fleet-card-image {
            padding: 0 20px;
          }

          .fleet-card-footer {
            padding: 20px 20px 25px;
          }

          .fleet-icon-circle {
            width: 45px;
            height: 45px;
          }

          .fleet-info-value {
            font-size: 16px;
          }
        }

        @media (max-width: 575px) {
          .fleet-list-main-title {
            font-size: 24px;
          }

          .fleet-list-badge span:not(.golden-dot) {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}
