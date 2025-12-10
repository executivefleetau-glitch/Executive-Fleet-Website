"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();
  const [bookingType, setBookingType] = useState("distance");
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    pickupLat: null,
    pickupLng: null,
    dropoffLocation: "",
    dropoffLat: null,
    dropoffLng: null,
  });

  // Load Google Maps Script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setGoogleMapsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Handle form data updates
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, pickupDate: date }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({ ...prev, pickupTime: time }));
  };

  const handlePickupChange = (location, lat, lng) => {
    setFormData(prev => ({
      ...prev,
      pickupLocation: location,
      pickupLat: lat,
      pickupLng: lng,
    }));
  };

  const handleDropoffChange = (location, lat, lng) => {
    setFormData(prev => ({
      ...prev,
      dropoffLocation: location,
      dropoffLat: lat,
      dropoffLng: lng,
    }));
  };

  // Handle search button click
  const handleSearch = (e, type) => {
    e.preventDefault();
    
    // Build URL with query parameters
    const params = new URLSearchParams({
      bookingType: type || bookingType,
      ...(formData.pickupDate && { pickupDate: formData.pickupDate }),
      ...(formData.pickupTime && { pickupTime: formData.pickupTime }),
      ...(formData.pickupLocation && { pickupLocation: formData.pickupLocation }),
      ...(formData.pickupLat && { pickupLat: formData.pickupLat.toString() }),
      ...(formData.pickupLng && { pickupLng: formData.pickupLng.toString() }),
      ...(formData.dropoffLocation && { dropoffLocation: formData.dropoffLocation }),
      ...(formData.dropoffLat && { dropoffLat: formData.dropoffLat.toString() }),
      ...(formData.dropoffLng && { dropoffLng: formData.dropoffLng.toString() }),
    });
    
    // Navigate to booking page with params
    router.push(`/booking-vehicle?${params.toString()}`);
  };

  // Handle tab change
  const handleTabChange = (type) => {
    setBookingType(type);
  };

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
                <div className="premium-badge wow fadeInUp">
                  <span className="badge-star">⭐</span>
                  <span className="badge-text" style={{ color: "#ffffff" }}>MELBOURNE'S PREMIER LUXURY SERVICE</span>
                </div>
                <h1 className="hero-heading wow fadeInUp">
                  Luxury Chauffeur
                  <br className="d-none d-lg-block" />
                  Services Across
                  <br className="d-none d-lg-block" />
                  <span className="golden-text">Melbourne</span>
                </h1>
                <p className="hero-description wow fadeInUp">
                  Experience unparalleled comfort and elegance with our premium
                  <br className="d-none d-lg-block" />
                  chauffeur services for families, weddings, corporate events, and
                  <br className="d-none d-lg-block" />
                  seamless travel across Melbourne.
                </p>
                <div className="mt-30 wow fadeInUp">
                  <Link className="btn btn-fleet-view" href="/fleet-list">
                    View Our Fleet
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
              <div className="col-lg-5">
                <div className="box-search-ride box-search-ride-style-2 box-search-ride-style-4 wow fadeInUp" >
                  <div className="box-search-tabs light-input" style={{ backgroundColor: "#090909b3" }}>
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
                            onClick={() => handleTabChange("distance")}
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
                            onClick={() => handleTabChange("hourly")}
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
                            onClick={() => handleTabChange("flatrate")}
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
                              <DatePickerComponent 
                                value={formData.pickupDate}
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent 
                                value={formData.pickupTime}
                                onChange={handleTimeChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker 
                                value={formData.pickupLocation}
                                onChange={handlePickupChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker 
                                value={formData.dropoffLocation}
                                onChange={handleDropoffChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button 
                              className="btn btn-search" 
                              type="submit"
                              onClick={(e) => handleSearch(e, "distance")}
                            >
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
                              <TimePickerComponent 
                                value={formData.pickupTime}
                                onChange={handleTimeChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-date">
                            <div className="search-icon">
                              <span className="item-icon icon-date"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Date</label>
                              <DatePickerComponent 
                                value={formData.pickupDate}
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker 
                                value={formData.pickupLocation}
                                onChange={handlePickupChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker 
                                value={formData.dropoffLocation}
                                onChange={handleDropoffChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button 
                              className="btn btn-search" 
                              type="submit"
                              onClick={(e) => handleSearch(e, "hourly")}
                            >
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
                              <DatePickerComponent 
                                value={formData.pickupDate}
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-time">
                            <div className="search-icon">
                              <span className="item-icon icon-time"> </span>
                            </div>
                            <div className="search-inputs ">
                              <label className="text-14 color-grey">Time</label>
                              <TimePickerComponent 
                                value={formData.pickupTime}
                                onChange={handleTimeChange}
                              />
                            </div>
                          </div>
                          <div className="search-item search-from">
                            <div className="search-icon">
                              <span className="item-icon icon-from"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">From</label>
                              <PlacePicker 
                                value={formData.pickupLocation}
                                onChange={handlePickupChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-to">
                            <div className="search-icon">
                              <span className="item-icon icon-to"> </span>
                            </div>
                            <div className="search-inputs">
                              <label className="text-14 color-grey">To</label>
                              <PlacePicker 
                                value={formData.dropoffLocation}
                                onChange={handleDropoffChange}
                                useGoogleMaps={googleMapsLoaded}
                              />
                            </div>
                          </div>
                          <div className="search-item search-button mb-0">
                            <button 
                              className="btn btn-search" 
                              type="submit"
                              onClick={(e) => handleSearch(e, "flatrate")}
                            >
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
      /* Large Laptop Screen - Move content up */
      @media (min-width: 1200px) and (max-width: 1920px) {
        .banner-home8 .container-sub {
          padding-top: 60px !important;
        }
        
        .banner-home8  .row {
          margin-top: -40px;
        }
      }

      /* Extra Large Screens - Further adjustments */
      @media (min-width: 1440px) and (max-width: 1920px) {
        .banner-home8 .container-sub {
          padding-top: 80px !important;
        }
        
        .banner-home8 .container-sub .row {
          margin-top: -147px;
        }
      }

      /* Premium Badge Styling */
      .premium-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(206, 155, 40, 0.3);
        padding: 10px 20px;
        border-radius: 50px;
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }

      .premium-badge:hover {
        border-color: rgba(206, 155, 40, 0.6);
        background: rgba(0, 0, 0, 0.7);
      }

      .badge-star {
        font-size: 16px;
      }

      .badge-text {
        color: #ce9b28;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      /* Hero Heading Styling */
      .hero-heading {
        font-size: 56px;
        font-weight: 600;
        color: #ffffff;
        line-height: 1.2;
        margin-bottom: 20px;
        font-family: inherit;
      }

      @media (max-width: 1199px) {
        .hero-heading {
          font-size: 48px;
        }
      }

      @media (max-width: 991px) {
        .hero-heading {
          font-size: 40px;
        }
      }

      @media (max-width: 767px) {
        .hero-heading {
          font-size: 32px;
        }
      }

      @media (max-width: 575px) {
        .hero-heading {
          font-size: 28px;
        }
      }

      /* Golden Text with Gradient */
      .golden-text {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        font-weight: 700;
      }

      /* Hero Description */
      .hero-description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 0;
      }

      @media (max-width: 767px) {
        .hero-description {
          font-size: 14px;
        }
      }

      /* View Fleet Button with Sliding Black Effect */
      .btn-fleet-view {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000;
        border: none;
        padding: 16px 36px;
        font-weight: 700;
        font-size: 16px;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
      }

      .btn-fleet-view::before {
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

      .btn-fleet-view:hover::before {
        left: 0;
      }

      .btn-fleet-view:hover {
        color: #ffffff;
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(206, 155, 40, 0.5);
      }

      .btn-fleet-view svg {
        transition: transform 0.3s ease;
      }

      .btn-fleet-view:hover svg {
        transform: translate(4px, -4px);
      }

      @media (max-width: 575px) {
        .btn-fleet-view {
          padding: 14px 28px;
          font-size: 14px;
        }
      }

      /* Tab Styling */
      .nav-tabs-search li a {
        color: #ffffff !important;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .nav-tabs-search li a:hover {
        color: #ce9b28 !important;
      }

      .nav-tabs-search li a.active {
        color: #ce9b28 !important;
      }

      .nav-tabs-search li a.active::after,
      .nav-tabs-search li a.active::before {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%) !important;
      }

      /* Search Button with Sliding Black Effect */
      .btn-search {
        background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
        color: #000000 !important;
        border: none !important;
        padding: 14px 32px !important;
        font-weight: 700 !important;
        border-radius: 8px !important;
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
        background: #000000 !important;
        transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
        z-index: -1 !important;
      }

      .btn-search:hover::before {
        left: 0 !important;
      }

      .btn-search:hover {
        color: #ffffff !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(206, 155, 40, 0.4) !important;
      }

      .btn-search svg,
      .btn-search img {
        position: relative !important;
        z-index: 2 !important;
        filter: brightness(0);
        transition: filter 0.4s ease !important;
      }

      .btn-search:hover svg,
      .btn-search:hover img {
        filter: brightness(0) invert(1);
      }

      /* Form Responsiveness */
      @media (max-width: 991px) {
        .box-search-ride-style-4 {
          margin-top: 40px;
        }

        .premium-badge {
          font-size: 11px;
          padding: 8px 16px;
        }
      }

      @media (max-width: 767px) {
        .box-search-tabs {
          padding: 20px !important;
        }

        .nav-tabs-search li a {
          font-size: 14px;
          padding: 10px 15px !important;
        }

        .btn-search {
          padding: 12px 24px !important;
          font-size: 14px !important;
        }
      }

      /* Ensure form stays exactly as shown */
      .box-search-ride-style-4 .search-item {
        width: 100%;
      }

      .box-search-ride-style-4 .box-form-search {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
    `}</style>
    </>
  );
}
