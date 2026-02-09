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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    numberOfPassengers: "",
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
  const [warnings, setWarnings] = useState({});
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

  // Auto-correct expected end time to minimum 2 hours from pickup
  const autoCorrectEndTime = (pickupTime, endTime) => {
    if (!pickupTime) return endTime;
    const [pickH, pickM] = pickupTime.split(':').map(Number);
    const [endH, endM] = (endTime || '').split(':').map(Number);
    
    if (!endTime || isNaN(endH)) {
      // Set default to 2 hours after pickup
      const newH = (pickH + 2) % 24;
      return `${String(newH).padStart(2, '0')}:${String(pickM).padStart(2, '0')}`;
    }
    
    // Calculate duration in minutes
    const pickMins = pickH * 60 + pickM;
    const endMins = endH * 60 + endM;
    const duration = endMins >= pickMins ? endMins - pickMins : (24 * 60 - pickMins + endMins);
    
    // If less than 2 hours, auto-correct to 2 hours
    if (duration < 120) {
      const newH = (pickH + 2) % 24;
      return `${String(newH).padStart(2, '0')}:${String(pickM).padStart(2, '0')}`;
    }
    
    return endTime;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle expected end time with auto-correction
    if (name === "expectedEndTime" && bookingType === "hourly") {
      const correctedTime = autoCorrectEndTime(formData.pickupTime, value);
      setFormData(prev => ({ ...prev, expectedEndTime: correctedTime }));
    } else if (name === "pickupTime" && bookingType === "hourly" && formData.expectedEndTime) {
      // Re-validate end time when pickup time changes
      const correctedTime = autoCorrectEndTime(value, formData.expectedEndTime);
      setFormData(prev => ({
        ...prev,
        pickupTime: value,
        expectedEndTime: correctedTime
      }));
    } else {
      // Parse numeric values for number inputs to prevent string concatenation issues
      let processedValue = value;
      if (type === "number") {
        const parsed = parseInt(value, 10);
        processedValue = isNaN(parsed) ? 0 : parsed;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : processedValue
      }));
    }
    
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
    // Clear capacity warning when vehicle changes
    setWarnings(prev => ({ ...prev, vehicleCapacity: null }));
  };

  // Get suitable vehicles for a given passenger count
  const getSuitableVehicles = (passengerCount) => {
    return cars
      .filter(car => car.passenger >= passengerCount)
      .sort((a, b) => a.passenger - b.passenger)
      .slice(0, 3); // Return top 3 suggestions
  };

  // Check vehicle capacity and update warnings
  const checkVehicleCapacity = () => {
    const selectedVehicle = cars.find(c => c.id === formData.vehicleId);
    if (!selectedVehicle) {
      setWarnings(prev => ({ ...prev, vehicleCapacity: null }));
      return;
    }

    const passengers = parseInt(formData.numberOfPassengers, 10) || 0;
    const babyCapsules = parseInt(formData.babyCapsule, 10) || 0;
    const babySeats = parseInt(formData.babySeat, 10) || 0;
    const boosterSeats = parseInt(formData.boosterSeat, 10) || 0;
    const totalChildren = formData.hasChildren ? (babyCapsules + babySeats + boosterSeats) : 0;
    const totalOccupancy = passengers + totalChildren;

    if (totalOccupancy > selectedVehicle.passenger) {
      const suitableVehicles = getSuitableVehicles(totalOccupancy);
      const suggestions = suitableVehicles.length > 0
        ? suitableVehicles.map(v => `${v.title} (${v.passengerDisplay || v.passenger} passengers)`).join(', ')
        : 'Please contact us for larger group arrangements';
      
      setWarnings(prev => ({
        ...prev,
        vehicleCapacity: {
          message: `You've selected ${totalOccupancy} total occupants, but the ${selectedVehicle.title} seats ${selectedVehicle.passenger}.`,
          suggestion: suitableVehicles.length > 0 ? `Consider: ${suggestions}` : suggestions,
          suitableVehicles
        }
      }));
    } else {
      setWarnings(prev => ({ ...prev, vehicleCapacity: null }));
    }
  };

  // Effect to check vehicle capacity when relevant fields change
  useEffect(() => {
    checkVehicleCapacity();
  }, [formData.vehicleId, formData.numberOfPassengers, formData.babyCapsule, formData.babySeat, formData.boosterSeat, formData.hasChildren]);

  // Sanitise and format phone: strip non-digits except leading +
  const normalisePhone = (raw) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('+')) return '+' + trimmed.slice(1).replace(/[^0-9]/g, '');
    return trimmed.replace(/[^0-9]/g, '');
  };

  const validateForm = () => {
    const newErrors = {};

    // --- Trip Details ---
    if (!formData.pickupDate) newErrors.pickupDate = "Please select a pickup date";
    if (!formData.pickupTime) newErrors.pickupTime = "Please select a pickup time";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Please enter a pickup location";
    
    if (bookingType !== "hourly" && !formData.dropoffLocation) {
      newErrors.dropoffLocation = "Please enter a drop-off location";
    }

    if (formData.pickupDate && formData.pickupTime) {
      if (!validateTimeRestriction(formData.pickupDate, formData.pickupTime)) {
        newErrors.pickupTime = "Bookings must be made at least 2 hours in advance (Melbourne time)";
      }
    }

    if (bookingType === "hourly" && !formData.expectedEndTime) {
      newErrors.expectedEndTime = "Please select expected end time";
    }

    // --- Vehicle & Passengers ---
    if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle";
    
    if (!formData.numberOfPassengers || formData.numberOfPassengers === "" || formData.numberOfPassengers === 0) {
      newErrors.numberOfPassengers = "Please select number of passengers";
    }

    // --- Customer Details (strict) ---
    const nameTrimmed = formData.customerName.trim();
    if (!nameTrimmed) {
      newErrors.customerName = "Full name is required";
    } else if (nameTrimmed.length < 2) {
      newErrors.customerName = "Name must be at least 2 characters";
    } else if (/^\d+$/.test(nameTrimmed)) {
      newErrors.customerName = "Name cannot be only numbers";
    } else if (!/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF' .\-]+$/.test(nameTrimmed)) {
      newErrors.customerName = "Name contains invalid characters";
    }

    // Email validation
    const emailTrimmed = formData.customerEmail.trim();
    if (!emailTrimmed) {
      newErrors.customerEmail = "Email address is required";
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)) {
      newErrors.customerEmail = "Please enter a valid email (e.g. name@example.com)";
    }

    // Phone validation – Australian format
    const phoneTrimmed = formData.customerPhone.trim();
    if (!phoneTrimmed) {
      newErrors.customerPhone = "Phone number is required";
    } else {
      const digits = normalisePhone(phoneTrimmed);
      // Accept +61XXXXXXXXX (12 chars) or 0XXXXXXXXX (10 digits) or international 8-15 digits
      const isAU = /^(\+61\d{9}|0[2-9]\d{8})$/.test(digits);
      const isIntl = /^\+?\d{8,15}$/.test(digits);
      if (!isAU && !isIntl) {
        newErrors.customerPhone = "Enter a valid phone number (e.g. 0412 345 678 or +61412345678)";
      }
    }

    if (formData.serviceType === "Other" && !formData.otherServiceType.trim()) {
      newErrors.otherServiceType = "Please specify the service type";
    }

    // Return trip only applies to distance-based bookings
    if (bookingType !== "hourly" && formData.isReturnTrip) {
      if (!formData.returnDate) newErrors.returnDate = "Please select a return date";
      if (!formData.returnTime) newErrors.returnTime = "Please select a return time";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to error summary first, then highlight the first field
      const errorSummary = document.getElementById('quote-error-summary');
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Briefly flash the error summary
        errorSummary.style.animation = 'none';
        requestAnimationFrame(() => {
          errorSummary.style.animation = 'shake 0.5s ease-in-out';
        });
      } else {
        // Fallback: scroll to the first error field
        const firstErrorKey = Object.keys(validationErrors)[0];
        const element = document.querySelector(`[name="${firstErrorKey}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    setIsLoading(true);

    try {
      const finalServiceType = formData.serviceType === "Other" 
        ? formData.otherServiceType 
        : formData.serviceType;

      // For hourly bookings, dropoff is optional - use "As directed" if not provided
      const dropoffForSubmit = bookingType === "hourly" && !formData.dropoffLocation 
        ? "As directed by client" 
        : formData.dropoffLocation;

      const submitData = {
        ...formData,
        dropoffLocation: dropoffForSubmit,
        serviceType: finalServiceType,
        bookingType,
        // Return trip only applies to distance-based
        isReturnTrip: bookingType === "hourly" ? false : formData.isReturnTrip,
        returnPickupLocation: (bookingType !== "hourly" && formData.isReturnTrip) ? formData.dropoffLocation : "",
        returnDropoffLocation: (bookingType !== "hourly" && formData.isReturnTrip) ? formData.pickupLocation : "",
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
        router.push('/quote-thank-you');
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '12px' : '20px' }}>
      {/* Trust Badges Header */}
      <div style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        border: '2px solid #ce9b28',
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '20px' : '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '30px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: isMobile ? '12px' : '14px', fontWeight: '500' }}>
            <span style={{ color: '#ce9b28' }}><CheckIcon /></span>
            <span>Licensed &amp; Accredited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: isMobile ? '12px' : '14px', fontWeight: '500' }}>
            <span style={{ color: '#ce9b28' }}><ShieldIcon /></span>
            <span>Fully Insured</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: isMobile ? '12px' : '14px', fontWeight: '500' }}>
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
          padding: isMobile ? '10px 12px' : '12px 20px',
          borderRadius: '8px',
          color: '#ce9b28',
          fontSize: isMobile ? '11px' : '13px',
          textAlign: 'center',
          flexWrap: 'wrap'
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
        {/* Error Summary - Shows when there are validation errors */}
        {Object.keys(errors).length > 0 && (
          <div id="quote-error-summary" style={{
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            border: '2px solid #fca5a5',
            borderRadius: '12px',
            padding: '16px 20px',
            margin: isMobile ? '16px' : '24px',
            marginBottom: '0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#ef4444',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>!</div>
              <span style={{ fontWeight: '700', color: '#991b1b', fontSize: '15px' }}>
                Please fix the following errors:
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#b91c1c', fontSize: '13px', lineHeight: '1.8' }}>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}
                  onClick={() => {
                    const el = document.querySelector(`[name="${field}"]`);
                    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); }
                  }}
                  style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                >{message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Trip Details Section */}
        <div style={{ padding: isMobile ? '20px 16px' : '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '38px' : '44px', height: isMobile ? '38px' : '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><LocationIcon /></span>
            Trip Details
          </h2>

          {/* Booking Type Toggle */}
          <div style={{ display: 'flex', background: '#f0f0f0', borderRadius: '12px', padding: '6px', marginBottom: '28px', gap: '6px', flexDirection: 'row', flexWrap: 'nowrap' }}>
            <button
              type="button"
              onClick={() => setBookingType("distance")}
              style={{
                flex: 1,
                padding: isMobile ? '12px 8px' : '14px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: isMobile ? '13px' : '15px',
                fontWeight: bookingType === "distance" ? '700' : '500',
                color: bookingType === "distance" ? '#000' : '#888',
                background: bookingType === "distance" ? 'linear-gradient(135deg, #ce9b28 0%, #e8b429 100%)' : 'transparent',
                boxShadow: bookingType === "distance" ? '0 4px 20px rgba(206, 155, 40, 0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minWidth: 0
              }}
            >
              {isMobile ? 'Distance' : 'Distance Based'}
            </button>
            <button
              type="button"
              onClick={() => setBookingType("hourly")}
              style={{
                flex: 1,
                padding: isMobile ? '12px 8px' : '14px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: isMobile ? '13px' : '15px',
                fontWeight: bookingType === "hourly" ? '700' : '500',
                color: bookingType === "hourly" ? '#000' : '#888',
                background: bookingType === "hourly" ? 'linear-gradient(135deg, #ce9b28 0%, #e8b429 100%)' : 'transparent',
                boxShadow: bookingType === "hourly" ? '0 4px 20px rgba(206, 155, 40, 0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minWidth: 0
              }}
            >
              {isMobile ? 'Hourly' : 'Hourly Hire'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '16px' : '20px' }}>
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

            {/* Drop-off Location - Optional for hourly */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><TargetIcon /></span>
                Drop-off Location {bookingType === "hourly" ? <span style={{ color: '#888', fontWeight: '400', fontSize: '12px' }}>(Optional - As directed)</span> : <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>}
              </label>
              <input
                ref={dropoffInputRef}
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                placeholder={bookingType === "hourly" ? "Leave blank if as directed by you" : ""}
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

          {/* Return Trip Toggle - Only for distance-based bookings */}
          {bookingType !== "hourly" && (
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '2px dashed #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px', padding: isMobile ? '14px 16px' : '16px 20px', background: '#f8f8f8', borderRadius: '12px', border: '2px solid #e5e5e5', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#333', flexGrow: 1 }}>Add Return Trip</span>
                <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '30px', flexShrink: 0 }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '16px' : '20px', marginTop: '20px', padding: isMobile ? '16px' : '20px', background: '#fafafa', borderRadius: '12px', border: '2px solid #e5e5e5' }}>
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
          )}
        </div>

        {/* Vehicle Selection Section */}
        <div style={{ padding: isMobile ? '20px 16px' : '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '38px' : '44px', height: isMobile ? '38px' : '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><CarIcon /></span>
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
              {['Executive Sedan', 'SUV', 'First Class', 'Vans'].map((category) => (
                <optgroup key={category} label={category}>
                  {cars.filter(car => car.category === category).map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.title} - {car.passengerDisplay || car.passenger} passengers
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.vehicleId && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.vehicleId}</span>}
          </div>

          {selectedVehicle && (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '16px' : '20px', background: '#f9f9f9', borderRadius: '12px', padding: isMobile ? '16px' : '20px', marginTop: '20px', border: '2px solid #e0e0e0', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>
                <Image src={selectedVehicle.imgSrc} alt={selectedVehicle.title} width={isMobile ? 160 : 200} height={isMobile ? 96 : 120} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <h4 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', color: '#000', margin: '0 0 8px 0' }}>{selectedVehicle.title}</h4>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0' }}>{selectedVehicle.details}</p>
                <div style={{ display: 'flex', gap: isMobile ? '16px' : '20px', fontSize: '13px', color: '#333', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><UsersIcon /> {selectedVehicle.passengerDisplay || selectedVehicle.passenger} passengers</span>
                  <span>🧳 {selectedVehicle.luggageDisplay || selectedVehicle.luggage} luggage</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Your Details Section */}
        <div style={{ padding: isMobile ? '20px 16px' : '30px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', color: '#000', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '38px' : '44px', height: isMobile ? '38px' : '44px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', borderRadius: '50%', color: '#ce9b28' }}><UserIcon /></span>
            Your Details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '16px' : '20px' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><UserIcon /></span>
                Full Name <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange}
                placeholder="e.g. John Smith"
                autoComplete="name"
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerName ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: errors.customerName ? '#fff5f5' : '#fff', color: '#333', boxSizing: 'border-box' }}
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
                placeholder="e.g. john@email.com"
                autoComplete="email"
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerEmail ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: errors.customerEmail ? '#fff5f5' : '#fff', color: '#333', boxSizing: 'border-box' }}
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
                placeholder="e.g. 0412 345 678"
                autoComplete="tel"
                style={{ width: '100%', padding: '14px 16px', border: `2px solid ${errors.customerPhone ? '#e74c3c' : '#e0e0e0'}`, borderRadius: '10px', fontSize: '15px', background: errors.customerPhone ? '#fff5f5' : '#fff', color: '#333', boxSizing: 'border-box' }}
              />
              {errors.customerPhone && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.customerPhone}</span>}
            </div>

            {/* Passengers */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                <span style={{ color: '#ce9b28' }}><UsersIcon /></span>
                Passengers <span style={{ color: '#ce9b28', fontWeight: '700' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  name="numberOfPassengers"
                  value={formData.numberOfPassengers}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 16px',
                    border: `2px solid ${warnings.vehicleCapacity ? '#f39c12' : errors.numberOfPassengers ? '#e74c3c' : '#e0e0e0'}`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    background: '#fff',
                    color: '#333',
                    boxSizing: 'border-box',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select Passengers</option>
                  {[...Array(15)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                <div style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666'
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors.numberOfPassengers && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>{errors.numberOfPassengers}</span>}
              {warnings.vehicleCapacity && (
                <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(243, 156, 18, 0.1)', border: '1px solid rgba(243, 156, 18, 0.3)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '13px', color: '#b7791f', margin: '0 0 6px 0', fontWeight: '600' }}>
                    ⚠️ {warnings.vehicleCapacity.message}
                  </p>
                  <p style={{ fontSize: '12px', color: '#92610e', margin: 0 }}>
                    {warnings.vehicleCapacity.suggestion}
                  </p>
                  {warnings.vehicleCapacity.suitableVehicles?.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {warnings.vehicleCapacity.suitableVehicles.map(vehicle => (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              vehicleId: vehicle.id,
                              vehicleName: vehicle.title,
                              vehicleType: vehicle.carType
                            }));
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            background: '#ce9b28',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Select {vehicle.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '16px', padding: isMobile ? '14px 12px' : '16px 20px', background: 'linear-gradient(135deg, #fff9e6 0%, #fff5d6 100%)', borderRadius: '12px', border: '2px solid #ce9b28', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '32px' : '36px', height: isMobile ? '32px' : '36px', background: '#ce9b28', borderRadius: '50%', color: '#fff', flexShrink: 0 }}><BabyIcon /></span>
              <span style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '600', color: '#333', flexGrow: 1 }}>Travelling with children?</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '30px', flexShrink: 0 }}>
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
            </div>

            {showChildSeats && (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '20px', padding: isMobile ? '16px' : '20px', background: '#fafafa', borderRadius: '12px', border: '2px solid #e5e5e5' }}>
                {[
                  { label: 'Baby Capsule', sub: '(0-6 months)', key: 'babyCapsule' },
                  { label: 'Baby Seat', sub: '(6m - 4yrs)', key: 'babySeat' },
                  { label: 'Booster Seat', sub: '(4-8 yrs)', key: 'boosterSeat' }
                ].map((item) => (
                  <div key={item.key} style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'center', gap: '10px', textAlign: 'center', padding: isMobile ? '10px 0' : '0', borderBottom: isMobile ? '1px solid #e5e5e5' : 'none' }}>
                    <label style={{ fontSize: '13px', color: '#555', fontWeight: '600', textAlign: isMobile ? 'left' : 'center' }}>{item.label}<br/><small style={{ fontWeight: '400', color: '#888' }}>{item.sub}</small></label>
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
        <div style={{ padding: isMobile ? '24px 16px' : '40px 30px', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', textAlign: 'center' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: isMobile ? '18px 40px' : '22px 80px',
              background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #e8b429 100%)',
              color: '#000',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '50px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(206, 155, 40, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isLoading ? 0.7 : 1,
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '320px' : 'none'
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
          <p style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', margin: '16px 0 0 0' }}>No commitment required. We&apos;ll send you a detailed quote.</p>
        </div>
      </form>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
