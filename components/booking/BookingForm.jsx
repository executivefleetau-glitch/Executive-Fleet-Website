"use client";
import { useState, useEffect, useRef } from "react";
import { cars } from "@/data/cars";
import Image from "next/image";

// Load Google Maps script
const loadGoogleMapsScript = (callback) => {
  if (typeof window.google === "object" && typeof window.google.maps === "object") {
    callback();
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Google Maps API Key is missing! Please check your .env.local file.");
    alert("Google Maps API Key is not configured. Please contact support.");
    return;
  }
  
  console.log("✅ Loading Google Maps API with key:", apiKey.substring(0, 10) + "...");

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    console.log("✅ Google Maps API loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("❌ Failed to load Google Maps API. Please check:");
    console.error("1. API key is valid");
    console.error("2. Places API is enabled in Google Cloud Console");
    console.error("3. Billing is set up");
    console.error("4. API key has no domain restrictions blocking localhost");
    alert("Failed to load Google Maps. Please check the console for details.");
  };
  document.head.appendChild(script);
};

export default function BookingForm({ initialData = {} }) {
  // State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState(initialData.bookingType || "distance");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    // Step 1: Trip Details
    pickupDate: initialData.pickupDate || "",
    pickupTime: initialData.pickupTime || "",
    pickupLocation: initialData.pickupLocation || "",
    pickupLat: initialData.pickupLat || null,
    pickupLng: initialData.pickupLng || null,
    dropoffLocation: initialData.dropoffLocation || "",
    dropoffLat: initialData.dropoffLat || null,
    dropoffLng: initialData.dropoffLng || null,
    
    // Step 2: Vehicle Selection
    vehicleId: initialData.vehicleId || null,
    vehicleName: initialData.vehicleName || "",
    vehicleType: initialData.vehicleType || "",
    
    // Step 3: Personal Details
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfPassengers: 1,
    serviceType: "Airport Transfer",
    additionalDestination: "",
    additionalDestinationLat: null,
    additionalDestinationLng: null,
    isReturnTrip: false,
    returnPickupLocation: "", // Auto-filled from dropoffLocation
    returnDropoffLocation: "", // Auto-filled from pickupLocation
    returnDate: "",
    returnTime: "",
    specialInstructions: "",
  });
  
  const [showAdditionalDestination, setShowAdditionalDestination] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Refs for Google Maps Autocomplete
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const additionalDestinationInputRef = useRef(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  
  // Load Google Maps on component mount
  useEffect(() => {
    loadGoogleMapsScript(() => {
      setGoogleMapsLoaded(true);
    });
  }, []);
  
  // Initialize Google Maps Autocomplete
  useEffect(() => {
    if (!googleMapsLoaded) return;
    
    // Check if Places API is available
    if (!window.google?.maps?.places) {
      console.error("❌ Google Maps Places API is not loaded!");
      return;
    }
    
    try {
      // Pickup Autocomplete
      if (pickupInputRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(
          pickupInputRef.current,
          { 
            componentRestrictions: { country: "au" },
            fields: ["formatted_address", "geometry", "name"]
          }
        );
        
        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          console.log("Pickup place selected:", place);
          if (place.geometry) {
            setFormData(prev => ({
              ...prev,
              pickupLocation: place.formatted_address || place.name,
              pickupLat: place.geometry.location.lat(),
              pickupLng: place.geometry.location.lng(),
            }));
          }
        });
        console.log("✅ Pickup autocomplete initialized");
      }
      
      // Dropoff Autocomplete
      if (dropoffInputRef.current) {
        const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
          dropoffInputRef.current,
          { 
            componentRestrictions: { country: "au" },
            fields: ["formatted_address", "geometry", "name"]
          }
        );
        
        dropoffAutocomplete.addListener("place_changed", () => {
          const place = dropoffAutocomplete.getPlace();
          console.log("Dropoff place selected:", place);
          if (place.geometry) {
            setFormData(prev => ({
              ...prev,
              dropoffLocation: place.formatted_address || place.name,
              dropoffLat: place.geometry.location.lat(),
              dropoffLng: place.geometry.location.lng(),
            }));
          }
        });
        console.log("✅ Dropoff autocomplete initialized");
      }
      
      // Additional Destination Autocomplete
      if (additionalDestinationInputRef.current && showAdditionalDestination) {
        const additionalAutocomplete = new window.google.maps.places.Autocomplete(
          additionalDestinationInputRef.current,
          { 
            componentRestrictions: { country: "au" },
            fields: ["formatted_address", "geometry", "name"]
          }
        );
        
        additionalAutocomplete.addListener("place_changed", () => {
          const place = additionalAutocomplete.getPlace();
          console.log("Additional destination selected:", place);
          if (place.geometry) {
            setFormData(prev => ({
              ...prev,
              additionalDestination: place.formatted_address || place.name,
              additionalDestinationLat: place.geometry.location.lat(),
              additionalDestinationLng: place.geometry.location.lng(),
            }));
          }
        });
        console.log("✅ Additional destination autocomplete initialized");
      }
    } catch (error) {
      console.error("❌ Error initializing Google Maps Autocomplete:", error);
    }
  }, [googleMapsLoaded, showAdditionalDestination]);
  
  // Initialize and update Google Map
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) return;
    if (!formData.pickupLat || !formData.dropoffLat) return;
    
    // Initialize map if not already initialized
    if (!mapRef.current.map) {
      mapRef.current.map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: formData.pickupLat, lng: formData.pickupLng },
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9e6ff" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#ffeaa0" }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#666666" }]
          },
        ]
      });
      
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapRef.current.map,
        polylineOptions: {
          strokeColor: "#ce9b28",
          strokeWeight: 5,
          strokeOpacity: 0.9
        },
        markerOptions: {
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ce9b28",
            fillOpacity: 1,
            strokeColor: "#000000",
            strokeWeight: 2
          }
        }
      });
    }
    
    // Display route
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = [];
    
    if (formData.additionalDestinationLat && formData.additionalDestinationLng) {
      waypoints.push({
        location: { 
          lat: formData.additionalDestinationLat, 
          lng: formData.additionalDestinationLng 
        },
        stopover: true
      });
    }
    
    directionsService.route(
      {
        origin: { lat: formData.pickupLat, lng: formData.pickupLng },
        destination: { lat: formData.dropoffLat, lng: formData.dropoffLng },
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(result);
        }
      }
    );
  }, [googleMapsLoaded, formData.pickupLat, formData.dropoffLat, formData.additionalDestinationLat, formData.additionalDestinationLng]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for return trip checkbox
    if (name === "isReturnTrip" && type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        isReturnTrip: checked,
        // Auto-reverse the addresses when return trip is checked
        returnPickupLocation: checked ? prev.dropoffLocation : "",
        returnDropoffLocation: checked ? prev.pickupLocation : "",
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.dropoffLocation) newErrors.dropoffLocation = "Dropoff location is required";
    
    if (formData.isReturnTrip) {
      if (!formData.returnPickupLocation) newErrors.returnPickupLocation = "Return pickup location is required";
      if (!formData.returnDropoffLocation) newErrors.returnDropoffLocation = "Return dropoff location is required";
      if (!formData.returnDate) newErrors.returnDate = "Return date is required";
      if (!formData.returnTime) newErrors.returnTime = "Return time is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate Step 3
  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.customerName) newErrors.customerName = "Name is required";
    if (!formData.customerEmail) newErrors.customerEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email";
    }
    if (!formData.customerPhone) newErrors.customerPhone = "Phone number is required";
    if (!formData.numberOfPassengers || formData.numberOfPassengers < 1) {
      newErrors.numberOfPassengers = "Number of passengers is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle Next Step
  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // Handle Previous Step
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Handle Vehicle Selection
  const handleSelectVehicle = (vehicle) => {
    setFormData(prev => ({
      ...prev,
      vehicleId: vehicle.id,
      vehicleName: vehicle.title,
      vehicleType: vehicle.carType
    }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bookingType
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setBookingReference(data.bookingReference);
        setIsSuccess(true);
      } else {
        alert(data.message || "Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Go Back from Thank You
  const handleGoBack = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setFormData({
      pickupDate: "",
      pickupTime: "",
      pickupLocation: "",
      pickupLat: null,
      pickupLng: null,
      dropoffLocation: "",
      dropoffLat: null,
      dropoffLng: null,
      vehicleId: null,
      vehicleName: "",
      vehicleType: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      numberOfPassengers: 1,
      serviceType: "Airport Transfer",
      additionalDestination: "",
      additionalDestinationLat: null,
      additionalDestinationLng: null,
      isReturnTrip: false,
      returnPickupLocation: "",
      returnDropoffLocation: "",
      returnDate: "",
      returnTime: "",
      specialInstructions: "",
    });
    setShowAdditionalDestination(false);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Render Thank You Message
  if (isSuccess) {
    return (
      <div className="booking-thank-you">
        <div className="thank-you-card">
          <div className="success-icon">✓</div>
          <h1 className="thank-you-title">Booking Received!</h1>
          <div className="booking-ref-badge">
            <p className="ref-label">Your Booking Reference</p>
            <p className="ref-number">{bookingReference}</p>
          </div>
          <p className="thank-you-message">
            Thank you for choosing <strong>Executive Fleet</strong>. Your booking request has been successfully submitted and our team will contact you within 24 hours to confirm availability and finalize pricing.
          </p>
          <div className="thank-you-actions">
            <button onClick={handleGoBack} className="btn-go-back">
              Make Another Booking
            </button>
            <a href="/" className="btn-home">
              Return to Homepage
            </a>
          </div>
        </div>
        
        <style jsx>{`
          .booking-thank-you {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            background: #ffffff;
          }
          
          .thank-you-card {
            background: #000000;
            border: 3px solid #ce9b28;
            border-radius: 24px;
            padding: 70px 50px;
            max-width: 650px;
            text-align: center;
            box-shadow: 0 15px 60px rgba(0, 0, 0, 0.15);
            animation: fadeInUp 0.6s ease;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .success-icon {
            width: 130px;
            height: 130px;
            background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 75px;
            color: #000000;
            margin: 0 auto 35px;
            animation: scaleIn 0.5s ease 0.2s both;
            box-shadow: 0 10px 40px rgba(206, 155, 40, 0.5);
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }
          
          .thank-you-title {
            font-size: 46px;
            font-weight: 800;
            background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 35px;
            animation: fadeIn 0.6s ease 0.4s both;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .booking-ref-badge {
            background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
            padding: 30px 45px;
            border-radius: 16px;
            margin: 35px 0;
            animation: fadeIn 0.6s ease 0.6s both;
            box-shadow: 0 8px 30px rgba(206, 155, 40, 0.4);
          }
          
          .ref-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            color: #000000;
            margin-bottom: 10px;
          }
          
          .ref-number {
            font-size: 36px;
            font-weight: 900;
            color: #000000;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
          }
          
          .thank-you-message {
            font-size: 16px;
            line-height: 1.9;
            color: #e0e0e0;
            margin-bottom: 45px;
            animation: fadeIn 0.6s ease 0.8s both;
          }
          
          .thank-you-message strong {
            color: #fffbe9;
            font-weight: 700;
          }
          
          .thank-you-actions {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeIn 0.6s ease 1s both;
          }
          
          .btn-go-back, .btn-home {
            padding: 18px 40px;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          
          .btn-go-back {
            background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
            color: #000000;
            border: none;
            box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
          }
          
          .btn-go-back:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(206, 155, 40, 0.6);
          }
          
          .btn-home {
            background: transparent;
            color: #fffbe9;
            border: 2px solid #ce9b28;
          }
          
          .btn-home:hover {
            background: rgba(206, 155, 40, 0.1);
            border-color: #fffbe9;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="booking-form-container">
      {/* Progress Bar */}
      <div className="booking-progress">
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Trip Details</div>
        </div>
        <div className={`progress-line ${currentStep > 1 ? "completed" : ""}`}></div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Select Vehicle</div>
        </div>
        <div className={`progress-line ${currentStep > 2 ? "completed" : ""}`}></div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-label">Your Details</div>
        </div>
      </div>
      
      {/* Step 1: Trip Details */}
      {currentStep === 1 && (
        <div className="booking-step">
          <h2 className="step-title">Where and When?</h2>
          
          {/* Booking Type Tabs */}
          <div className="booking-type-tabs">
            <button
              className={`tab-btn ${bookingType === "distance" ? "active" : ""}`}
              onClick={() => setBookingType("distance")}
            >
              Distance
            </button>
            <button
              className={`tab-btn ${bookingType === "hourly" ? "active" : ""}`}
              onClick={() => setBookingType("hourly")}
            >
              Hourly
            </button>
          </div>
          
          <div className="form-grid">
            {/* Pickup Date */}
            <div className="form-group">
              <label htmlFor="pickupDate" className="form-label">
                <span className="label-icon">📅</span>
                Pickup Date
              </label>
              <input
                id="pickupDate"
                name="pickupDate"
                type="date"
                className={`form-input ${errors.pickupDate ? "error" : ""}`}
                value={formData.pickupDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.pickupDate && <span className="error-message">{errors.pickupDate}</span>}
            </div>
            
            {/* Pickup Time */}
            <div className="form-group">
              <label htmlFor="pickupTime" className="form-label">
                <span className="label-icon">🕐</span>
                Pickup Time
              </label>
              <input
                id="pickupTime"
                name="pickupTime"
                type="time"
                className={`form-input ${errors.pickupTime ? "error" : ""}`}
                value={formData.pickupTime}
                onChange={handleInputChange}
              />
              {errors.pickupTime && <span className="error-message">{errors.pickupTime}</span>}
            </div>
            
            {/* Pickup Location */}
            <div className="form-group full-width">
              <label htmlFor="pickupLocation" className="form-label">
                <span className="label-icon">📍</span>
                From (Pickup Location)
              </label>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                ref={pickupInputRef}
                className={`form-input ${errors.pickupLocation ? "error" : ""}`}
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
              />
              {errors.pickupLocation && <span className="error-message">{errors.pickupLocation}</span>}
            </div>
            
            {/* Dropoff Location */}
            <div className="form-group full-width">
              <label htmlFor="dropoffLocation" className="form-label">
                <span className="label-icon">🎯</span>
                To (Dropoff Location)
              </label>
              <input
                id="dropoffLocation"
                name="dropoffLocation"
                type="text"
                ref={dropoffInputRef}
                className={`form-input ${errors.dropoffLocation ? "error" : ""}`}
                placeholder="Enter dropoff address"
                value={formData.dropoffLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
              />
              {errors.dropoffLocation && <span className="error-message">{errors.dropoffLocation}</span>}
            </div>
          </div>
          
          {/* Google Map */}
          {formData.pickupLat && formData.dropoffLat && (
            <div className="map-container">
              <div ref={mapRef} className="google-map"></div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="step-actions">
            <button onClick={handleNext} className="btn-next">
              Continue to Vehicle Selection
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Vehicle Selection */}
      {currentStep === 2 && (
        <div className="booking-step">
          <h2 className="step-title">Choose Your Vehicle</h2>
          
          <div className="vehicles-grid">
            {cars.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-image">
                  <Image
                    src={vehicle.imgSrc}
                    alt={vehicle.title}
                    width={400}
                    height={200}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="vehicle-info">
                  <h3 className="vehicle-name">{vehicle.title}</h3>
                  <p className="vehicle-description">{vehicle.description}</p>
                  <div className="vehicle-features">
                    <span className="feature">
                      <span className="feature-icon">👥</span>
                      {vehicle.passenger} Passengers
                    </span>
                    <span className="feature">
                      <span className="feature-icon">🧳</span>
                      {vehicle.luggage} Luggage
                    </span>
                  </div>
                  <button
                    onClick={() => handleSelectVehicle(vehicle)}
                    className={`btn-select-vehicle ${formData.vehicleId === vehicle.id ? "selected" : ""}`}
                  >
                    {formData.vehicleId === vehicle.id ? "Selected ✓" : "Select Vehicle"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {errors.vehicleId && <span className="error-message centered">{errors.vehicleId}</span>}
          
          <div className="step-actions">
            <button onClick={handlePrev} className="btn-prev">
              <span className="btn-arrow">←</span>
              Back
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: Personal Details */}
      {currentStep === 3 && (
        <div className="booking-step">
          <h2 className="step-title">Your Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="customerName" className="form-label">
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  className={`form-input ${errors.customerName ? "error" : ""}`}
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
                {errors.customerName && <span className="error-message">{errors.customerName}</span>}
              </div>
              
              {/* Email */}
              <div className="form-group">
                <label htmlFor="customerEmail" className="form-label">
                  <span className="label-icon">✉️</span>
                  Email Address
                </label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  className={`form-input ${errors.customerEmail ? "error" : ""}`}
                  placeholder="your@email.com"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                />
                {errors.customerEmail && <span className="error-message">{errors.customerEmail}</span>}
              </div>
              
              {/* Phone */}
              <div className="form-group">
                <label htmlFor="customerPhone" className="form-label">
                  <span className="label-icon">📱</span>
                  Phone Number
                </label>
                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  className={`form-input ${errors.customerPhone ? "error" : ""}`}
                  placeholder="+61 xxx xxx xxx"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                />
                {errors.customerPhone && <span className="error-message">{errors.customerPhone}</span>}
              </div>
              
              {/* Number of Passengers */}
              <div className="form-group">
                <label htmlFor="numberOfPassengers" className="form-label">
                  <span className="label-icon">👥</span>
                  Number of Passengers
                </label>
                <input
                  id="numberOfPassengers"
                  name="numberOfPassengers"
                  type="number"
                  min="1"
                  max="20"
                  className={`form-input ${errors.numberOfPassengers ? "error" : ""}`}
                  value={formData.numberOfPassengers}
                  onChange={handleInputChange}
                />
                {errors.numberOfPassengers && <span className="error-message">{errors.numberOfPassengers}</span>}
              </div>
              
              {/* Service Type */}
              <div className="form-group full-width">
                <label htmlFor="serviceType" className="form-label">
                  <span className="label-icon">🚗</span>
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="form-input"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                >
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Corporate Travel">Corporate Travel</option>
                  <option value="Special Event">Special Event</option>
                  <option value="Winery Tour">Winery Tour</option>
                </select>
              </div>
            </div>
            
            {/* Additional Destination */}
            <div className="form-section">
              <div className="section-header">
                <button
                  type="button"
                  onClick={() => setShowAdditionalDestination(!showAdditionalDestination)}
                  className="btn-toggle-section"
                >
                  {showAdditionalDestination ? "−" : "+"} Add Additional Destination
                </button>
              </div>
              
              {showAdditionalDestination && (
                <div className="form-group full-width">
                  <label htmlFor="additionalDestination" className="form-label">
                    <span className="label-icon">📍</span>
                    Additional Stop
                  </label>
                  <input
                    id="additionalDestination"
                    name="additionalDestination"
                    type="text"
                    ref={additionalDestinationInputRef}
                    className="form-input"
                    placeholder="Enter additional stop address"
                    value={formData.additionalDestination}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalDestination: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdditionalDestination(false);
                      setFormData(prev => ({ 
                        ...prev, 
                        additionalDestination: "",
                        additionalDestinationLat: null,
                        additionalDestinationLng: null
                      }));
                    }}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            {/* Return Trip */}
            <div className="form-section">
              <div className="section-header">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isReturnTrip"
                    checked={formData.isReturnTrip}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Add Return Trip</span>
                </label>
              </div>
              
              {formData.isReturnTrip && (
                <div className="form-grid">
                  {/* Return From (auto-filled with original dropoff) */}
                  <div className="form-group full-width">
                    <label htmlFor="returnPickupLocation" className="form-label">
                      <span className="label-icon">📍</span>
                      Return From
                    </label>
                    <input
                      id="returnPickupLocation"
                      name="returnPickupLocation"
                      type="text"
                      className={`form-input ${errors.returnPickupLocation ? "error" : ""}`}
                      placeholder="Return pickup address"
                      value={formData.returnPickupLocation}
                      onChange={handleInputChange}
                    />
                    {errors.returnPickupLocation && <span className="error-message">{errors.returnPickupLocation}</span>}
                  </div>
                  
                  {/* Return To (auto-filled with original pickup) */}
                  <div className="form-group full-width">
                    <label htmlFor="returnDropoffLocation" className="form-label">
                      <span className="label-icon">🎯</span>
                      Return To
                    </label>
                    <input
                      id="returnDropoffLocation"
                      name="returnDropoffLocation"
                      type="text"
                      className={`form-input ${errors.returnDropoffLocation ? "error" : ""}`}
                      placeholder="Return dropoff address"
                      value={formData.returnDropoffLocation}
                      onChange={handleInputChange}
                    />
                    {errors.returnDropoffLocation && <span className="error-message">{errors.returnDropoffLocation}</span>}
                  </div>
                  
                  {/* Return Date & Time */}
                  <div className="form-group">
                    <label htmlFor="returnDate" className="form-label">
                      <span className="label-icon">📅</span>
                      Return Date
                    </label>
                    <input
                      id="returnDate"
                      name="returnDate"
                      type="date"
                      className={`form-input ${errors.returnDate ? "error" : ""}`}
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                    />
                    {errors.returnDate && <span className="error-message">{errors.returnDate}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="returnTime" className="form-label">
                      <span className="label-icon">🕐</span>
                      Return Time
                    </label>
                    <input
                      id="returnTime"
                      name="returnTime"
                      type="time"
                      className={`form-input ${errors.returnTime ? "error" : ""}`}
                      value={formData.returnTime}
                      onChange={handleInputChange}
                    />
                    {errors.returnTime && <span className="error-message">{errors.returnTime}</span>}
                  </div>
                </div>
              )}
            </div>
            
            {/* Special Instructions */}
            <div className="form-group full-width">
              <label htmlFor="specialInstructions" className="form-label">
                <span className="label-icon">📝</span>
                Special Instructions (Optional)
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                className="form-textarea"
                placeholder="Any special requests or instructions..."
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="step-actions">
              <button type="button" onClick={handlePrev} className="btn-prev">
                <span className="btn-arrow">←</span>
                Back
              </button>
              <button type="submit" disabled={isLoading} className="btn-submit">
                {isLoading ? "Submitting..." : "Submit Booking"}
                {!isLoading && <span className="btn-arrow">✓</span>}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <style jsx global>{`
        /* Google Maps Autocomplete Dropdown Fix */
        .pac-container {
          background-color: #ffffff !important;
          border: 2px solid #ce9b28 !important;
          border-radius: 12px !important;
          margin-top: 8px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
          font-family: inherit !important;
          z-index: 9999 !important;
          overflow: hidden !important;
        }
        
        .pac-item {
          padding: 14px 18px !important;
          border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
          color: #333333 !important;
          font-size: 14px !important;
          cursor: pointer !important;
          line-height: 1.6 !important;
          transition: all 0.2s ease !important;
        }
        
        .pac-item:first-child {
          border-top: none !important;
        }
        
        .pac-item:hover {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%) !important;
          color: #000000 !important;
        }
        
        .pac-item-selected {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%) !important;
          color: #000000 !important;
        }
        
        .pac-item-query {
          color: #ce9b28 !important;
          font-weight: 600 !important;
        }
        
        .pac-item:hover .pac-item-query,
        .pac-item-selected .pac-item-query {
          color: #000000 !important;
        }
        
        .pac-matched {
          font-weight: 700 !important;
        }
        
        .pac-icon {
          display: none !important;
        }
        
        .pac-icon-marker {
          display: none !important;
        }
        
        .hdpi.pac-logo:after {
          background-image: none !important;
        }
        
        .pac-container:after {
          display: none !important;
        }
      `}</style>
      
      <style jsx>{`
        .booking-form-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          background: #ffffff;
          min-height: 100vh;
        }
        
        /* Progress Bar */
        .booking-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 50px;
          padding: 40px 30px;
          background: #000000;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: #999999;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }
        
        .progress-step.active .step-number {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #000000;
          box-shadow: 0 6px 25px rgba(206, 155, 40, 0.4);
          transform: scale(1.1);
        }
        
        .progress-step.completed .step-number {
          background: #000000;
          border-color: #ce9b28;
          color: #ce9b28;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.2);
        }
        
        .step-label {
          margin-top: 15px;
          font-size: 13px;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
        }
        
        .progress-step.active .step-label {
          color: #fffbe9;
          font-weight: 700;
        }
        
        .progress-step.completed .step-label {
          color: #ce9b28;
        }
        
        .progress-line {
          width: 120px;
          height: 4px;
          background: #333333;
          margin: 0 20px;
          transition: all 0.4s ease;
          border-radius: 2px;
        }
        
        .progress-line.completed {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          box-shadow: 0 2px 10px rgba(206, 155, 40, 0.3);
        }
        
        /* Booking Step */
        .booking-step {
          background: #ffffff;
          border: 2px solid #f0f0f0;
          border-radius: 24px;
          padding: 50px;
          animation: fadeIn 0.6s ease;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .step-title {
          font-size: 38px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 40px;
          text-align: center;
          position: relative;
          padding-bottom: 20px;
        }
        
        .step-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-radius: 2px;
        }
        
        /* Booking Type Tabs */
        .booking-type-tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          justify-content: center;
        }
        
        .tab-btn {
          padding: 16px 45px;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 12px;
          border: 2px solid #e0e0e0;
          background: #ffffff;
          color: #666666;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .tab-btn:hover {
          border-color: #ce9b28;
          color: #ce9b28;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(206, 155, 40, 0.15);
        }
        
        .tab-btn.active {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #000000;
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.35);
          transform: translateY(-2px);
        }
        
        /* Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 35px 30px;
          margin-bottom: 30px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 90px;
          gap: 0;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.5;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          background: #ffffff;
          padding-bottom: 2px;
        }
        
        .label-icon {
          font-size: 16px;
          filter: grayscale(100%);
          flex-shrink: 0;
          display: inline-block;
        }
        
        .form-input, .form-textarea {
          padding: 16px 18px;
          font-size: 15px;
          background: #ffffff;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          color: #000000;
          transition: all 0.3s ease;
          width: 100%;
          font-family: inherit;
          font-weight: 500;
          position: relative;
          z-index: 0;
          margin-top: 0;
        }
        
        .form-input:hover {
          border-color: #ce9b28;
        }
        
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #ce9b28;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(206, 155, 40, 0.08);
        }
        
        .form-input.error {
          border-color: #dc3545;
          background: #fff5f5;
        }
        
        .form-input.error:focus {
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.08);
        }
        
        .form-input::placeholder, .form-textarea::placeholder {
          color: #999999;
          font-weight: 400;
        }
        
        .error-message {
          color: #dc3545;
          font-size: 12px;
          margin-top: 6px;
          display: block;
          font-weight: 600;
        }
        
        .error-message.centered {
          text-align: center;
          margin: 20px 0;
          font-size: 14px;
        }
        
        /* Map Container */
        .map-container {
          margin: 40px 0;
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid #ce9b28;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .google-map {
          width: 100%;
          height: 450px;
        }
        
        /* Vehicles Grid */
        .vehicles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .vehicle-card {
          background: #ffffff;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .vehicle-card:hover {
          border-color: #ce9b28;
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(206, 155, 40, 0.2);
        }
        
        .vehicle-image {
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #f8f8f8;
          position: relative;
        }
        
        .vehicle-image::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
        }
        
        .vehicle-info {
          padding: 24px;
        }
        
        .vehicle-name {
          font-size: 22px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 12px;
        }
        
        .vehicle-description {
          font-size: 14px;
          color: #666666;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .vehicle-features {
          display: flex;
          gap: 25px;
          margin-bottom: 24px;
          padding: 16px 0;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #333333;
          font-weight: 600;
        }
        
        .feature-icon {
          font-size: 20px;
        }
        
        .btn-select-vehicle {
          width: 100%;
          padding: 16px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 10px;
          border: 2px solid #ce9b28;
          background: #ffffff;
          color: #ce9b28;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-select-vehicle:hover {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.3);
        }
        
        .btn-select-vehicle.selected {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #000000;
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.35);
        }
        
        /* Form Sections */
        .form-section {
          margin: 35px 0;
          padding: 30px;
          background: #f9f9f9;
          border-radius: 16px;
          border: 2px solid #e8e8e8;
        }
        
        .section-header {
          margin-bottom: 20px;
        }
        
        .btn-toggle-section {
          padding: 14px 28px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          border-radius: 10px;
          border: 2px solid #ce9b28;
          background: #ffffff;
          color: #ce9b28;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-toggle-section:hover {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border-color: #ce9b28;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.25);
        }
        
        .btn-remove {
          margin-top: 12px;
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 8px;
          border: 2px solid #dc3545;
          background: #ffffff;
          color: #dc3545;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-remove:hover {
          background: #dc3545;
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          padding: 16px 20px;
          background: #ffffff;
          border-radius: 12px;
          border: 2px solid #e0e0e0;
          transition: all 0.3s ease;
        }
        
        .checkbox-label:hover {
          border-color: #ce9b28;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.1);
        }
        
        .checkbox-input {
          width: 22px;
          height: 22px;
          cursor: pointer;
          accent-color: #ce9b28;
        }
        
        .checkbox-text {
          font-size: 14px;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }
        
        .return-trip-info {
          background: linear-gradient(90deg, rgba(200,145,22,0.08) 0%, rgba(244,208,63,0.08) 100%);
          padding: 18px 20px;
          border-radius: 10px;
          border-left: 4px solid #ce9b28;
        }
        
        .return-trip-info p {
          margin: 0;
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
        
        /* Action Buttons */
        .step-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 50px;
        }
        
        .btn-next, .btn-prev, .btn-submit {
          padding: 18px 45px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
        }
        
        .btn-next, .btn-submit {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.3);
        }
        
        .btn-next:hover, .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(206, 155, 40, 0.45);
        }
        
        .btn-prev {
          background: #ffffff;
          border: 2px solid #e0e0e0;
          color: #666666;
        }
        
        .btn-prev:hover {
          border-color: #ce9b28;
          color: #ce9b28;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.15);
        }
        
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.2) !important;
        }
        
        .btn-arrow {
          font-size: 18px;
          font-weight: 700;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .booking-form-container {
            padding: 30px 15px;
          }
          
          .booking-progress {
            padding: 25px 15px;
          }
          
          .step-number {
            width: 50px;
            height: 50px;
            font-size: 18px;
          }
          
          .booking-step {
            padding: 30px 20px;
            border-radius: 16px;
          }
          
          .step-title {
            font-size: 28px;
            margin-bottom: 30px;
          }
          
          .step-title::after {
            width: 60px;
          }
          
          .booking-type-tabs {
            gap: 12px;
          }
          
          .tab-btn {
            padding: 14px 30px;
            font-size: 13px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .form-group {
            min-height: 85px;
          }
          
          .form-label {
            font-size: 11px;
            gap: 6px;
            margin-bottom: 12px;
            letter-spacing: 0.8px;
            padding-bottom: 3px;
          }
          
          .label-icon {
            font-size: 14px;
          }
          
          .form-input, .form-textarea {
            padding: 14px 16px;
            font-size: 14px;
          }
          
          .vehicles-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .progress-line {
            width: 60px;
            margin: 0 12px;
          }
          
          .step-label {
            font-size: 10px;
            margin-top: 10px;
          }
          
          .step-actions {
            flex-direction: column;
            gap: 12px;
          }
          
          .btn-next, .btn-prev, .btn-submit {
            width: 100%;
            justify-content: center;
            padding: 16px 30px;
          }
          
          .map-container {
            margin: 30px 0;
          }
          
          .google-map {
            height: 350px;
          }
          
          .thank-you-card {
            padding: 50px 30px;
            border-radius: 20px;
          }
          
          .success-icon {
            width: 100px;
            height: 100px;
            font-size: 60px;
          }
          
          .thank-you-title {
            font-size: 32px;
          }
          
          .ref-number {
            font-size: 28px;
          }
          
          .thank-you-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .btn-go-back, .btn-home {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

