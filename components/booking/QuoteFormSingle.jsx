"use client";
import { useState, useEffect, useRef } from "react";
import { cars } from "@/data/cars";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Load Google Maps script
const loadGoogleMapsScript = (callback) => {
  if (typeof window.google === "object" && typeof window.google.maps === "object") {
    callback();
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API Key is missing!");
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => callback();
  script.onerror = () => console.error("Failed to load Google Maps API");
  document.head.appendChild(script);
};

// Icon Components
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
    <circle cx="6.5" cy="16.5" r="2.5"></circle>
    <circle cx="16.5" cy="16.5" r="2.5"></circle>
  </svg>
);

const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const NoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const BabyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h.01"></path>
    <path d="M15 12h.01"></path>
    <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path>
    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
  </svg>
);

export default function QuoteFormSingle({ initialData = {} }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [bookingType, setBookingType] = useState(initialData.bookingType || "distance");

  // Form Data
  const [formData, setFormData] = useState({
    pickupDate: initialData.pickupDate || "",
    pickupTime: initialData.pickupTime || "",
    expectedEndTime: initialData.expectedEndTime || "",
    pickupLocation: initialData.pickupLocation || "",
    pickupLat: initialData.pickupLat || null,
    pickupLng: initialData.pickupLng || null,
    dropoffLocation: initialData.dropoffLocation || "",
    dropoffLat: initialData.dropoffLat || null,
    dropoffLng: initialData.dropoffLng || null,
    vehicleId: initialData.vehicleId || null,
    vehicleName: initialData.vehicleName || "",
    vehicleType: initialData.vehicleType || "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfPassengers: 1,
    hasChildren: false,
    babyCapsule: 0,
    babySeat: 0,
    boosterSeat: 0,
    serviceType: "One Way Transfer",
    otherServiceType: "",
    isReturnTrip: false,
    returnDate: "",
    returnTime: "",
    specialInstructions: "",
    flightNumber: "",
    terminalType: "",
  });

  const [errors, setErrors] = useState({});
  const [showChildSeats, setShowChildSeats] = useState(false);

  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

  const [melbTimeStr, setMelbTimeStr] = useState("");

  useEffect(() => {
    loadGoogleMapsScript(() => setGoogleMapsLoaded(true));
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Australia/Melbourne',
        hour: '2-digit', minute: '2-digit',
        day: '2-digit', month: '2-digit',
        hour12: true
      };
      setMelbTimeStr(new Intl.DateTimeFormat('en-AU', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!googleMapsLoaded) return;
    if (!window.google?.maps?.places) return;

    try {
      if (pickupInputRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(
          pickupInputRef.current,
          { componentRestrictions: { country: "au" }, fields: ["formatted_address", "geometry", "name"] }
        );
        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          if (place.geometry) {
            setFormData(prev => ({
              ...prev,
              pickupLocation: place.formatted_address || place.name,
              pickupLat: place.geometry.location.lat(),
              pickupLng: place.geometry.location.lng(),
            }));
          }
        });
      }

      if (dropoffInputRef.current) {
        const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
          dropoffInputRef.current,
          { componentRestrictions: { country: "au" }, fields: ["formatted_address", "geometry", "name"] }
        );
        dropoffAutocomplete.addListener("place_changed", () => {
          const place = dropoffAutocomplete.getPlace();
          if (place.geometry) {
            setFormData(prev => ({
              ...prev,
              dropoffLocation: place.formatted_address || place.name,
              dropoffLat: place.geometry.location.lat(),
              dropoffLng: place.geometry.location.lng(),
            }));
          }
        });
      }
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
    }
  }, [googleMapsLoaded]);

  const validateTimeRestriction = (date, time) => {
    if (!date || !time) return true;
    try {
      const [y, m, d] = date.split('-').map(Number);
      const [h, min] = time.split(':').map(Number);
      const inputEpoch = Date.UTC(y, m - 1, d, h, min);

      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
      });
      const parts = formatter.formatToParts(now);
      const getPart = (type) => parseInt(parts.find(p => p.type === type).value);

      let mh = getPart('hour');
      if (mh === 24) mh = 0;
      const melbEpoch = Date.UTC(getPart('year'), getPart('month') - 1, getPart('day'), mh, getPart('minute'));

      return inputEpoch >= (melbEpoch + 2 * 60 * 60 * 1000);
    } catch {
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleVehicleChange = (e) => {
    const vehicleId = parseInt(e.target.value);
    const vehicle = cars.find(c => c.id === vehicleId);
    if (vehicle) {
      setFormData(prev => ({
        ...prev,
        vehicleId: vehicle.id,
        vehicleName: vehicle.title,
        vehicleType: vehicle.carType
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        vehicleId: null,
        vehicleName: "",
        vehicleType: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickupDate) newErrors.pickupDate = "Please select a pickup date";
    if (!formData.pickupTime) newErrors.pickupTime = "Please select a pickup time";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Please enter a pickup location";
    if (!formData.dropoffLocation) newErrors.dropoffLocation = "Please enter a drop-off location";

    if (formData.pickupDate && formData.pickupTime) {
      if (!validateTimeRestriction(formData.pickupDate, formData.pickupTime)) {
        newErrors.pickupTime = "Bookings must be made at least 2 hours in advance (Melbourne time)";
      }
    }

    if (bookingType === "hourly" && !formData.expectedEndTime) {
      newErrors.expectedEndTime = "Please select expected end time";
    }

    if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle";

    if (!formData.customerName.trim()) newErrors.customerName = "Please enter your name";
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Please enter your phone number";
    if (!formData.numberOfPassengers || formData.numberOfPassengers < 1) {
      newErrors.numberOfPassengers = "Please enter number of passengers";
    }

    if (formData.serviceType === "Other" && !formData.otherServiceType.trim()) {
      newErrors.otherServiceType = "Please specify the service type";
    }

    const selectedVehicle = cars.find(c => c.id === formData.vehicleId);
    if (selectedVehicle) {
      const totalChildren = formData.hasChildren ? (formData.babyCapsule + formData.babySeat + formData.boosterSeat) : 0;
      const totalOccupancy = formData.numberOfPassengers + totalChildren;
      if (totalOccupancy > selectedVehicle.passenger) {
        newErrors.numberOfPassengers = `Total occupancy (${totalOccupancy}) exceeds vehicle capacity (${selectedVehicle.passenger})`;
      }
    }

    if (formData.isReturnTrip) {
      if (!formData.returnDate) newErrors.returnDate = "Please select a return date";
      if (!formData.returnTime) newErrors.returnTime = "Please select a return time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const finalServiceType = formData.serviceType === "Other" 
        ? formData.otherServiceType 
        : formData.serviceType;

      const submitData = {
        ...formData,
        serviceType: finalServiceType,
        bookingType,
        returnPickupLocation: formData.isReturnTrip ? formData.dropoffLocation : "",
        returnDropoffLocation: formData.isReturnTrip ? formData.pickupLocation : "",
        flightNumber: formData.serviceType === "Airport Transfer" ? formData.flightNumber : "",
        terminalType: formData.serviceType === "Airport Transfer" ? formData.terminalType : "",
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/quote-thank-you?ref=${data.bookingReference}`);
      } else {
        alert(data.message || "Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedVehicle = cars.find(c => c.id === formData.vehicleId);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Trust Badges Header */}
      <div style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        border: '2px solid #ce9b28',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>
            <span style={{ color: '#ce9b28' }}><CheckIcon /></span>
            <span>Licensed &amp; Accredited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>
            <span style={{ color: '#ce9b28' }}><ShieldIcon /></span>
            <span>Fully Insured</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: '500' }}>
            <span style={{ color: '#ffd700' }}><StarIcon /></span>
            <span>5-Star Rated</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'rgba(206, 155, 40, 0.15)',
          padding: '12px 20px',
          borderRadius: '8px',
          color: '#ce9b28',
          fontSize: '13px'
        }}>
          <ClockIcon />
          <span>We respond <strong>7am - 10pm</strong> same day, otherwise next business day</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Trip Details Section */}
        <div style={{ padding: '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><LocationIcon /></span>
            Trip Details
          </h2>

          {/* Booking Type Toggle */}
          <div style={{ display: 'flex', background: '#f0f0f0', borderRadius: '12px', padding: '6px', marginBottom: '28px', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setBookingType("distance")}
              style={{
                flex: 1,
                padding: '14px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: bookingType === "distance" ? '700' : '500',
                color: bookingType === "distance" ? '#000' : '#888',
                background: bookingType === "distance" ? 'linear-gradient(135deg, #ce9b28 0%, #e8b429 100%)' : 'transparent',
                boxShadow: bookingType === "distance" ? '0 4px 20px rgba(206, 155, 40, 0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Distance Based
            </button>
            <button
              type="button"
              onClick={() => setBookingType("hourly")}
              style={{
                flex: 1,
                padding: '14px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: bookingType === "hourly" ? '700' : '500',
                color: bookingType === "hourly" ? '#000' : '#888',
                background: bookingType === "hourly" ? 'linear-gradient(135deg, #ce9b28 0%, #e8b429 100%)' : 'transparent',
                boxShadow: bookingType === "hourly" ? '0 4px 20px rgba(206, 155, 40, 0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Hourly Hire
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Pickup Date */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><CalendarIcon /></span>
                Pickup Date <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${errors.pickupDate ? '#e74c3c' : '#e0e0e0'}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#333',
                  boxSizing: 'border-box'
                }}
              />
              {errors.pickupDate && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.pickupDate}</span>}
            </div>

            {/* Pickup Time */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><ClockIcon /></span>
                Pickup Time <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${errors.pickupTime ? '#e74c3c' : '#e0e0e0'}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#333',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ fontSize: '11px', color: '#ce9b28', marginTop: '4px', display: 'block', fontWeight: '500' }}>Melbourne Time (Current: {melbTimeStr})</span>
              {errors.pickupTime && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.pickupTime}</span>}
            </div>

            {/* Expected End Time (Hourly only) */}
            {bookingType === "hourly" && (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  <span style={{ color: '#ce9b28' }}><ClockIcon /></span>
                  Expected End Time <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
                </label>
                <input
                  type="time"
                  name="expectedEndTime"
                  value={formData.expectedEndTime}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: `2px solid ${errors.expectedEndTime ? '#e74c3c' : '#e0e0e0'}`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    background: '#fff',
                    color: '#333',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ fontSize: '11px', color: '#ce9b28', marginTop: '4px', display: 'block', fontWeight: '500' }}>Minimum 2 hours</span>
                {errors.expectedEndTime && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.expectedEndTime}</span>}
              </div>
            )}

            {/* Pickup Location */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><LocationIcon /></span>
                Pickup Location <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input
                ref={pickupInputRef}
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${errors.pickupLocation ? '#e74c3c' : '#e0e0e0'}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#333',
                  boxSizing: 'border-box'
                }}
              />
              {errors.pickupLocation && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.pickupLocation}</span>}
            </div>

            {/* Drop-off Location */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><TargetIcon /></span>
                Drop-off Location <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input
                ref={dropoffInputRef}
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${errors.dropoffLocation ? '#e74c3c' : '#e0e0e0'}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#333',
                  boxSizing: 'border-box'
                }}
              />
              {errors.dropoffLocation && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.dropoffLocation}</span>}
            </div>
          </div>

          {/* Return Trip Toggle */}
          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '2px dashed #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#f8f8f8', borderRadius: '12px', border: '2px solid #e5e5e5' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#333', flexGrow: 1 }}>Add Return Trip</span>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '30px' }}>
                <input
                  type="checkbox"
                  name="isReturnTrip"
                  checked={formData.isReturnTrip}
                  onChange={handleInputChange}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: formData.isReturnTrip ? '#ce9b28' : '#ccc',
                  transition: '0.4s',
                  borderRadius: '30px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '24px',
                    width: '24px',
                    left: formData.isReturnTrip ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.4s',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}></span>
                </span>
              </label>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#888', minWidth: '30px' }}>{formData.isReturnTrip ? "Yes" : "No"}</span>
            </div>

            {formData.isReturnTrip && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px', padding: '20px', background: '#fafafa', borderRadius: '12px', border: '2px solid #e5e5e5' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    <span style={{ color: '#ce9b28' }}><CalendarIcon /></span>
                    Return Date <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                    style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.returnDate ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
                  />
                  {errors.returnDate && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.returnDate}</span>}
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    <span style={{ color: '#ce9b28' }}><ClockIcon /></span>
                    Return Time <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
                  </label>
                  <input
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.returnTime ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
                  />
                  {errors.returnTime && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.returnTime}</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Selection Section */}
        <div style={{ padding: '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><CarIcon /></span>
            Select Your Vehicle
          </h2>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <span style={{ color: '#ce9b28' }}><CarIcon /></span>
              Vehicle <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
            </label>
            <select
              value={formData.vehicleId || ""}
              onChange={handleVehicleChange}
              style={{
                width: '100%',
                padding: '14px 44px 14px 16px',
                border: `2px solid ${errors.vehicleId ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '10px',
                fontSize: '15px',
                background: '#fff',
                color: '#333',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '20px'
              }}
            >
              <option value="">Choose a vehicle...</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.title} - {car.passengerDisplay || car.passenger} passengers ({car.category})
                </option>
              ))}
            </select>
            {errors.vehicleId && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.vehicleId}</span>}
          </div>

          {selectedVehicle && (
            <div style={{ display: 'flex', gap: '20px', background: '#f9f9f9', borderRadius: '12px', padding: '20px', marginTop: '20px', border: '2px solid #e0e0e0' }}>
              <div style={{ flexShrink: 0 }}>
                <Image src={selectedVehicle.imgSrc} alt={selectedVehicle.title} width={200} height={120} style={{ objectFit: "contain" }} />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#000', margin: '0 0 8px 0' }}>{selectedVehicle.title}</h4>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0' }}>{selectedVehicle.details}</p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#333' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><UsersIcon /> {selectedVehicle.passengerDisplay || selectedVehicle.passenger} passengers</span>
                  <span>🧳 {selectedVehicle.luggageDisplay || selectedVehicle.luggage} luggage</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Your Details Section */}
        <div style={{ padding: '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><UserIcon /></span>
            Your Details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><UserIcon /></span>
                Full Name <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange}
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerName ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
              />
              {errors.customerName && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.customerName}</span>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><MailIcon /></span>
                Email <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange}
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerEmail ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
              />
              {errors.customerEmail && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.customerEmail}</span>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><PhoneIcon /></span>
                Phone <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange}
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerPhone ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
              />
              {errors.customerPhone && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.customerPhone}</span>}
            </div>

            {/* Passengers */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><UsersIcon /></span>
                Passengers <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input type="number" name="numberOfPassengers" value={formData.numberOfPassengers} onChange={handleInputChange} min="1" max={selectedVehicle?.passenger || 11}
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.numberOfPassengers ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
              />
              {errors.numberOfPassengers && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.numberOfPassengers}</span>}
            </div>

            {/* Service Type */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><CarIcon /></span>
                Service Type <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <select name="serviceType" value={formData.serviceType} onChange={handleInputChange}
                style={{ width: '100%', padding: '14px 44px 14px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
              >
                <option value="One Way Transfer">One Way Transfer</option>
                <option value="Airport Transfer">Airport Transfer</option>
                <option value="Corporate Travel">Corporate Travel</option>
                <option value="Special Event">Special Event</option>
                <option value="Winery Tour">Winery Tour</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Other Service Type */}
            {formData.serviceType === "Other" && (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  <span style={{ color: '#ce9b28' }}><NoteIcon /></span>
                  Please Specify <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
                </label>
                <input type="text" name="otherServiceType" value={formData.otherServiceType} onChange={handleInputChange}
                  style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.otherServiceType ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
                />
                {errors.otherServiceType && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.otherServiceType}</span>}
              </div>
            )}

            {/* Airport fields - only when Airport Transfer selected */}
            {formData.serviceType === "Airport Transfer" && (
              <>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    <span style={{ color: '#ce9b28' }}><PlaneIcon /></span>
                    Flight Number
                  </label>
                  <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    <span style={{ color: '#ce9b28' }}><BuildingIcon /></span>
                    Terminal
                  </label>
                  <select name="terminalType" value={formData.terminalType} onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 44px 14px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="">Select terminal</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Travelling with Children */}
          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '2px dashed #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'linear-gradient(135deg, #fff9e6 0%, #fff5d6 100%)', borderRadius: '12px', border: '2px solid #ce9b28' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: '#ce9b28', borderRadius: '50%', color: '#fff' }}><BabyIcon /></span>
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#333', flexGrow: 1 }}>Travelling with children?</span>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '30px' }}>
                <input
                  type="checkbox"
                  checked={showChildSeats}
                  onChange={(e) => {
                    setShowChildSeats(e.target.checked);
                    if (!e.target.checked) {
                      setFormData(prev => ({ ...prev, hasChildren: false, babyCapsule: 0, babySeat: 0, boosterSeat: 0 }));
                    } else {
                      setFormData(prev => ({ ...prev, hasChildren: true }));
                    }
                  }}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: showChildSeats ? '#ce9b28' : '#ccc',
                  transition: '0.4s',
                  borderRadius: '30px',
                  boxShadow: showChildSeats ? '0 0 15px rgba(206, 155, 40, 0.5)' : 'none'
                }}>
                  <span style={{
                    position: 'absolute',
                    height: '24px',
                    width: '24px',
                    left: showChildSeats ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.4s',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}></span>
                </span>
              </label>
              <span style={{ background: '#ce9b28', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{showChildSeats ? "Yes" : "No"}</span>
            </div>

            {showChildSeats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px', padding: '20px', background: '#fafafa', borderRadius: '12px', border: '2px solid #e5e5e5' }}>
                {[
                  { label: 'Baby Capsule', sub: '(0-6 months)', key: 'babyCapsule' },
                  { label: 'Baby Seat', sub: '(6m - 4yrs)', key: 'babySeat' },
                  { label: 'Booster Seat', sub: '(4-8 yrs)', key: 'boosterSeat' }
                ].map((item) => (
                  <div key={item.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                    <label style={{ fontSize: '13px', color: '#555', fontWeight: '600' }}>{item.label}<br/><small style={{ fontWeight: '400', color: '#888' }}>{item.sub}</small></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '2px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, [item.key]: Math.max(0, prev[item.key] - 1) }))}
                        style={{ width: '40px', height: '40px', border: 'none', background: '#f5f5f5', color: '#333', fontSize: '20px', fontWeight: '600', cursor: 'pointer' }}>−</button>
                      <span style={{ width: '40px', textAlign: 'center', fontSize: '16px', fontWeight: '600', color: '#333' }}>{formData[item.key]}</span>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, [item.key]: Math.min(3, prev[item.key] + 1) }))}
                        style={{ width: '40px', height: '40px', border: 'none', background: '#f5f5f5', color: '#333', fontSize: '20px', fontWeight: '600', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <span style={{ color: '#ce9b28' }}><NoteIcon /></span>
              Special Instructions (Optional)
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="3"
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', background: '#fff', color: '#333', boxSizing: 'border-box', resize: 'vertical', minHeight: '100px', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Submit Button - ONE CENTERED BEAUTIFUL GOLD BUTTON */}
        <div style={{ padding: '40px 30px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', textAlign: 'center' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '22px 80px',
              background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%)',
              color: '#000',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '50px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(206, 155, 40, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Processing..." : (
              <>
                Get Free Quote
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
          <p style={{ color: '#999', fontSize: '14px', margin: '20px 0 0 0' }}>No commitment required. We&apos;ll send you a detailed quote.</p>
        </div>
      </form>
    </div>
  );
}
