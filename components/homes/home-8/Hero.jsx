"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import Link from "next/link";
import TimeRestrictionModal from "@/components/booking/TimeRestrictionModal";

export default function Hero() {
  const router = useRouter();
  const [bookingType, setBookingType] = useState("distance");
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // Helper to check 2-hour restriction
  const validateTimeRestriction = (date, time) => {
    if (!date || !time) return true;

    try {
      // 1. Parse User Input (Treat as Face Value)
      const [y, m, d] = date.split('-').map(Number);
      const [h, min] = time.split(':').map(Number);
      const inputEpoch = Date.UTC(y, m - 1, d, h, min);

      // 2. Get Current Melbourne Time (Treat as Face Value)
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });

      const parts = formatter.formatToParts(now);
      const getPart = (type) => parseInt(parts.find(p => p.type === type).value);

      const my = getPart('year');
      const mm = getPart('month');
      const md = getPart('day');
      let mh = getPart('hour');
      const mmin = getPart('minute');

      if (mh === 24) mh = 0;

      const melbEpoch = Date.UTC(my, mm - 1, md, mh, mmin);
      // 3. Compare: Input > Melbourne + 2 hours
      const twoHoursMs = 2 * 60 * 60 * 1000;

      return inputEpoch >= (melbEpoch + twoHoursMs);

    } catch (error) {
      console.error('Time validation error:', error);
      return true;
    }
  };

  // Route Information State
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    expectedEndTime: "", // For hourly bookings
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

  // Calculate distance and duration when locations change
  useEffect(() => {
    if (!googleMapsLoaded || !window.google?.maps?.DirectionsService) return;
    if (!formData.pickupLat || !formData.dropoffLat) {
      setRouteDistance(null);
      setRouteDuration(null);
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: formData.pickupLat, lng: formData.pickupLng },
        destination: { lat: formData.dropoffLat, lng: formData.dropoffLng },
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          const route = result.routes[0];
          if (route && route.legs && route.legs.length > 0) {
            let totalDistance = 0;
            let totalDuration = 0;

            route.legs.forEach(leg => {
              totalDistance += leg.distance.value; // in meters
              totalDuration += leg.duration.value; // in seconds
            });

            // Convert to kilometers and minutes
            setRouteDistance((totalDistance / 1000).toFixed(1));
            setRouteDuration(Math.round(totalDuration / 60));
          }
        } else {
          setRouteDistance(null);
          setRouteDuration(null);
        }
      }
    );
  }, [googleMapsLoaded, formData.pickupLat, formData.dropoffLat, formData.pickupLng, formData.dropoffLng]);

  // Handle form data updates
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, pickupDate: date }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({ ...prev, pickupTime: time }));
  };

  const handleExpectedEndTimeChange = (time) => {
    setFormData(prev => ({ ...prev, expectedEndTime: time }));
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
      ...(formData.expectedEndTime && { expectedEndTime: formData.expectedEndTime }),
      ...(formData.pickupLocation && { pickupLocation: formData.pickupLocation }),
      ...(formData.pickupLat && { pickupLat: formData.pickupLat.toString() }),
      ...(formData.pickupLng && { pickupLng: formData.pickupLng.toString() }),
      ...(formData.dropoffLocation && { dropoffLocation: formData.dropoffLocation }),
      ...(formData.dropoffLat && { dropoffLat: formData.dropoffLat.toString() }),
      ...(formData.dropoffLng && { dropoffLng: formData.dropoffLng.toString() }),
    });

    // Navigate to quote page with params
    router.push(`/get-quote?${params.toString()}`);
  };

  // Safe wrapper for search with time validation
  const handleSearchWithValidation = (e, type) => {
    e.preventDefault();

    // Check if date/time are selected
    if (formData.pickupDate && formData.pickupTime) {
      if (!validateTimeRestriction(formData.pickupDate, formData.pickupTime)) {
        setShowTimeWarning(true);
        return;
      }
    }

    handleSearch(e, type);
  };

  // Handle tab change
  const handleTabChange = (type) => {
    setBookingType(type);
  };

  return (
    <>
      <section className="section banner-home8">
        <div className="box-banner-homepage-8">
          <div className="box-cover-image boxBgImage" style={{ position: 'relative' }}>
            {/* Optimized background image using Next.js Image */}
            <Image
              src="/assets/hero/executive-fleet-hero-bg.webp"
              alt="Executive Fleet Melbourne Luxury Chauffeur Service"
              fill
              priority
              quality={75}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                zIndex: -1
              }}
            />
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
                    <a className="btn btn-fleet-view" href="tel:+61431951996">
                      Call Now
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
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="box-search-ride box-search-ride-style-2 box-search-ride-style-4 wow fadeInUp" >
                    <div className="box-search-tabs light-input" style={{ backgroundColor: "#090909b3" }}>
                      <div className="head-tabs">
                        {/* Horizontal Toggle Buttons */}
                        <div style={{
                          display: 'flex',
                          gap: '0',
                          width: '100%',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid rgba(206, 155, 40, 0.3)'
                        }}>
                          <button
                            type="button"
                            onClick={() => handleTabChange("distance")}
                            style={{
                              flex: 1,
                              padding: '14px 20px',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '15px',
                              transition: 'all 0.3s ease',
                              background: bookingType === 'distance' 
                                ? 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)' 
                                : 'transparent',
                              color: bookingType === 'distance' ? '#000' : '#fff'
                            }}
                          >
                            Distance
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTabChange("hourly")}
                            style={{
                              flex: 1,
                              padding: '14px 20px',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '15px',
                              transition: 'all 0.3s ease',
                              background: bookingType === 'hourly' 
                                ? 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)' 
                                : 'transparent',
                              color: bookingType === 'hourly' ? '#000' : '#fff'
                            }}
                          >
                            Hourly
                          </button>
                        </div>
                      </div>
                      <div className="tab-content">
                        {/* Distance Tab */}
                        <div
                          style={{ display: bookingType === 'distance' ? 'block' : 'none' }}
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
                                <span style={{ fontSize: '11px', marginTop: '4px', display: 'block', color: '#ce9b28', fontWeight: '500' }}>Melbourne Time</span>
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
                                onClick={(e) => handleSearchWithValidation(e, "distance")}
                              >
                                Get Free Quote
                                <svg
                                  className="icon-16 ml-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  height="16"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Hourly Tab */}
                        <div
                          style={{ display: bookingType === 'hourly' ? 'block' : 'none' }}
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
                                <label className="text-14 color-grey">Start Time</label>
                                <TimePickerComponent
                                  value={formData.pickupTime}
                                  onChange={handleTimeChange}
                                />
                                <span style={{ fontSize: '11px', marginTop: '4px', display: 'block', color: '#ce9b28', fontWeight: '500' }}>Melbourne Time</span>
                              </div>
                            </div>
                            <div className="search-item search-time">
                              <div className="search-icon">
                                <span className="item-icon icon-time"> </span>
                              </div>
                              <div className="search-inputs ">
                                <label className="text-14 color-grey">Expected End Time</label>
                                <TimePickerComponent
                                  value={formData.expectedEndTime}
                                  onChange={handleExpectedEndTimeChange}
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
                                onClick={(e) => handleSearchWithValidation(e, "hourly")}
                              >
                                Get Free Quote
                                <svg
                                  className="icon-16 ml-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  height="16"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
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
                                <span style={{ fontSize: '11px', marginTop: '4px', display: 'block', color: '#ce9b28', fontWeight: '500' }}>Melbourne Time</span>
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
                                onClick={(e) => handleSearchWithValidation(e, "flatrate")}
                              >
                                Get Free Quote
                                <svg
                                  className="icon-16 ml-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  height="16"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Distance & Duration Display */}
                    {routeDistance && routeDuration && (
                      <div className="route-info-display wow fadeInUp" data-wow-delay="0.3s">
                        <div className="route-info-item">
                          <span className="route-info-icon">📏</span>
                          <div className="route-info-content">
                            <span className="route-info-label">Distance</span>
                            <span className="route-info-value">{routeDistance} km</span>
                          </div>
                        </div>
                        <div className="route-info-divider"></div>
                        <div className="route-info-item">
                          <span className="route-info-icon">⏱️</span>
                          <div className="route-info-content">
                            <span className="route-info-label">Est. Duration</span>
                            <span className="route-info-value">{routeDuration} min</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TimeRestrictionModal
        isOpen={showTimeWarning}
        onClose={() => setShowTimeWarning(false)}
      />
    </>
  );
}
