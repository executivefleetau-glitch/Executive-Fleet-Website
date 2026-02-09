"use client";
import { useState, useEffect } from "react";
import PlacePicker from "@/components/common/PlacePicker";

const SERVICE_TYPES = [
  { id: "airport", label: "Airport", icon: "✈️" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "wedding", label: "Wedding", icon: "💒" },
  { id: "winery", label: "Winery", icon: "🍷" },
  { id: "event", label: "Event", icon: "🎉" },
];

export default function QuoteForm({ variant = "default", preselectedService = null }) {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showChildSeats, setShowChildSeats] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: preselectedService || "airport",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    pickupLat: null,
    pickupLng: null,
    dropoffLocation: "",
    dropoffLat: null,
    dropoffLng: null,
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    fullName: "",
    email: "",
    phone: "",
    passengers: "",
    babyCapsule: "0",
    babySeats: "0",
    boosterSeats: "0",
    specialInstructions: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (window.google?.maps) {
      setGoogleMapsLoaded(true);
      return;
    }
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setGoogleMapsLoaded(true));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.head.appendChild(script);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePickupChange = (location, lat, lng) => {
    setFormData(prev => ({ ...prev, pickupLocation: location, pickupLat: lat, pickupLng: lng }));
  };

  const handleDropoffChange = (location, lat, lng) => {
    setFormData(prev => ({ ...prev, dropoffLocation: location, dropoffLat: lat, dropoffLng: lng }));
  };

  // Sanitise phone: strip non-digits except leading +
  const normalisePhone = (raw) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('+')) return '+' + trimmed.slice(1).replace(/[^0-9]/g, '');
    return trimmed.replace(/[^0-9]/g, '');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.dropoffLocation) newErrors.dropoffLocation = "Drop-off location is required";

    // Name validation
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = "Full name is required";
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    } else if (/^\d+$/.test(nameTrimmed)) {
      newErrors.fullName = "Name cannot be only numbers";
    } else if (!/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF' .\-]+$/.test(nameTrimmed)) {
      newErrors.fullName = "Name contains invalid characters";
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = "Email address is required";
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)) {
      newErrors.email = "Enter a valid email (e.g. name@example.com)";
    }

    // Phone validation – Australian / international
    const phoneTrimmed = formData.phone.trim();
    if (!phoneTrimmed) {
      newErrors.phone = "Phone number is required";
    } else {
      const digits = normalisePhone(phoneTrimmed);
      const isAU = /^(\+61\d{9}|0[2-9]\d{8})$/.test(digits);
      const isIntl = /^\+?\d{8,15}$/.test(digits);
      if (!isAU && !isIntl) {
        newErrors.phone = "Enter a valid phone (e.g. 0412 345 678)";
      }
    }

    if (!formData.passengers) newErrors.passengers = "Please select number of passengers";
    if (formData.returnTrip) {
      if (!formData.returnDate) newErrors.returnDate = "Return date is required";
      if (!formData.returnTime) newErrors.returnTime = "Return time is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validateForm()) {
      // Scroll to the error summary or first error field
      const errorSummary = document.getElementById('lp-error-summary');
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorSummary.style.animation = 'none';
        requestAnimationFrame(() => { errorSummary.style.animation = 'efShake 0.5s ease-in-out'; });
      }
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "landing_page", landingPage: window.location.pathname }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData(prev => ({
          ...prev,
          pickupDate: "", pickupTime: "", pickupLocation: "", pickupLat: null, pickupLng: null,
          dropoffLocation: "", dropoffLat: null, dropoffLng: null, returnTrip: false, returnDate: "",
          returnTime: "", fullName: "", email: "", phone: "", passengers: "", babyCapsule: "0",
          babySeats: "0", boosterSeats: "0", specialInstructions: "",
        }));
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ef-quote-form">
      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange}
        style={{ position: "absolute", left: "-9999px", opacity: 0 }} tabIndex={-1} autoComplete="off" />

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div id="lp-error-summary" className="ef-error-summary">
          <div className="ef-error-summary-header">
            <span className="ef-error-icon">!</span>
            <strong>Please fix the following errors:</strong>
          </div>
          <ul className="ef-error-list">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field} onClick={() => {
                const el = document.querySelector(`[name="${field}"]`);
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); }
              }}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Service Type */}
      <div className="ef-form-section">
        <div className="ef-section-label">Service Type</div>
        <div className="ef-service-grid">
          {SERVICE_TYPES.map((s) => (
            <button key={s.id} type="button"
              className={`ef-service-btn ${formData.serviceType === s.id ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, serviceType: s.id }))}>
              <span className="ef-service-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trip Details */}
      <div className="ef-form-section">
        <div className="ef-section-label">Trip Details</div>
        <div className="ef-form-grid">
          <div className="ef-field">
            <label>Pickup Date *</label>
            <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange}
              className={errors.pickupDate ? 'error' : ''} min={new Date().toISOString().split('T')[0]} />
            {errors.pickupDate && <span className="error-msg">{errors.pickupDate}</span>}
          </div>
          <div className="ef-field">
            <label>Pickup Time *</label>
            <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange}
              className={errors.pickupTime ? 'error' : ''} />
            {errors.pickupTime && <span className="error-msg">{errors.pickupTime}</span>}
          </div>
        </div>
        <div className="ef-field">
          <label>Pickup Location *</label>
          <PlacePicker value={formData.pickupLocation} onChange={handlePickupChange}
            useGoogleMaps={googleMapsLoaded} placeholder="Enter pickup address" className={errors.pickupLocation ? 'error' : ''} />
          {errors.pickupLocation && <span className="error-msg">{errors.pickupLocation}</span>}
        </div>
        <div className="ef-field">
          <label>Drop-off Location *</label>
          <PlacePicker value={formData.dropoffLocation} onChange={handleDropoffChange}
            useGoogleMaps={googleMapsLoaded} placeholder="Enter destination" className={errors.dropoffLocation ? 'error' : ''} />
          {errors.dropoffLocation && <span className="error-msg">{errors.dropoffLocation}</span>}
        </div>
        <label className="ef-checkbox">
          <input type="checkbox" name="returnTrip" checked={formData.returnTrip} onChange={handleInputChange} />
          <span className="ef-checkmark"></span>
          Add Return Trip
        </label>
        {formData.returnTrip && (
          <div className="ef-form-grid ef-return-fields">
            <div className="ef-field">
              <label>Return Date *</label>
              <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange}
                className={errors.returnDate ? 'error' : ''} min={formData.pickupDate || new Date().toISOString().split('T')[0]} />
              {errors.returnDate && <span className="error-msg">{errors.returnDate}</span>}
            </div>
            <div className="ef-field">
              <label>Return Time *</label>
              <input type="time" name="returnTime" value={formData.returnTime} onChange={handleInputChange}
                className={errors.returnTime ? 'error' : ''} />
              {errors.returnTime && <span className="error-msg">{errors.returnTime}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="ef-form-section">
        <div className="ef-section-label">Your Details</div>
        <div className="ef-form-grid">
          <div className="ef-field">
            <label>Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
              placeholder="John Smith" autoComplete="name" className={errors.fullName ? 'error' : ''} />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
          </div>
          <div className="ef-field">
            <label>Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
              placeholder="0412 345 678" autoComplete="tel" className={errors.phone ? 'error' : ''} />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
        </div>
        <div className="ef-form-grid">
          <div className="ef-field">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
              placeholder="name@email.com" autoComplete="email" className={errors.email ? 'error' : ''} />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <div className="ef-field">
            <label>Passengers *</label>
            <select name="passengers" value={formData.passengers} onChange={handleInputChange} className={errors.passengers ? 'error' : ''}>
              <option value="">Select Passengers</option>
              {[...Array(15)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Passenger' : 'Passengers'}</option>)}
            </select>
            {errors.passengers && <span className="error-msg">{errors.passengers}</span>}
          </div>
        </div>
        <button type="button" className="ef-toggle-btn" onClick={() => setShowChildSeats(!showChildSeats)}>
          {showChildSeats ? '−' : '+'} Child Seats
        </button>
        {showChildSeats && (
          <div className="ef-child-seats">
            <div className="ef-field">
              <label>Baby Capsule</label>
              <select name="babyCapsule" value={formData.babyCapsule} onChange={handleInputChange}>
                {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="ef-field">
              <label>Baby Seat</label>
              <select name="babySeats" value={formData.babySeats} onChange={handleInputChange}>
                {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="ef-field">
              <label>Booster</label>
              <select name="boosterSeats" value={formData.boosterSeats} onChange={handleInputChange}>
                {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Special Instructions */}
      <div className="ef-field">
        <label>Special Instructions <span className="ef-optional">(Optional)</span></label>
        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange}
          placeholder="Flight number, special requirements..." rows={3} />
      </div>

      {/* Submit */}
      <button type="submit" className="ef-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Get Your Free Quote'}
      </button>

      {submitStatus === "success" && (
        <div className="ef-success">✓ Quote request sent! We'll respond within 30 minutes.</div>
      )}
      {submitStatus === "error" && (
        <div className="ef-error">Something went wrong. Please try again or call us.</div>
      )}

      <p className="ef-trust">🛡️ Response within 30 mins • No obligation • Free quote</p>

      <style jsx>{`
        .ef-quote-form {
          padding: 24px;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .ef-form-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .ef-section-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #ce9b28;
          margin-bottom: 12px;
        }

        .ef-service-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ef-service-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #f5f5f5;
          border: 2px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          transition: all 0.2s;
        }

        .ef-service-btn:hover {
          background: #eee;
        }

        .ef-service-btn.active {
          background: rgba(206, 155, 40, 0.1);
          border-color: #ce9b28;
          color: #000;
        }

        .ef-service-icon {
          font-size: 16px;
        }

        .ef-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .ef-field {
          margin-bottom: 12px;
        }

        .ef-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }

        .ef-field input,
        .ef-field select,
        .ef-field textarea,
        .ef-field :global(.search-input) {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          color: #000;
          background: #fafafa;
          transition: all 0.2s;
        }

        .ef-field input:focus,
        .ef-field select:focus,
        .ef-field textarea:focus,
        .ef-field :global(.search-input:focus) {
          outline: none;
          border-color: #ce9b28;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .ef-field input.error,
        .ef-field select.error,
        .ef-field :global(.search-input.error) {
          border-color: #e74c3c;
          background: #fff5f5;
        }

        .ef-field .error-msg {
          display: block;
          font-size: 12px;
          color: #e74c3c;
          margin-top: 4px;
        }

        .ef-field input::placeholder,
        .ef-field textarea::placeholder {
          color: #999;
        }

        .ef-field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }

        .ef-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
          margin-top: 8px;
        }

        .ef-checkbox input {
          display: none;
        }

        .ef-checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 4px;
          position: relative;
          transition: all 0.2s;
        }

        .ef-checkbox input:checked + .ef-checkmark {
          background: #ce9b28;
          border-color: #ce9b28;
        }

        .ef-checkbox input:checked + .ef-checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 12px;
          font-weight: bold;
        }

        .ef-return-fields {
          margin-top: 12px;
          padding: 12px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .ef-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: transparent;
          border: 1px dashed #ccc;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          color: #666;
          width: 100%;
          justify-content: center;
          margin-top: 8px;
          transition: all 0.2s;
        }

        .ef-toggle-btn:hover {
          border-color: #ce9b28;
          color: #ce9b28;
        }

        .ef-child-seats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 12px;
          padding: 12px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .ef-child-seats .ef-field {
          margin-bottom: 0;
        }

        .ef-child-seats label {
          font-size: 11px;
        }

        .ef-optional {
          color: #999;
          font-weight: 400;
          font-size: 11px;
        }

        .ef-submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border: none;
          border-radius: 10px;
          color: #000;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 16px;
        }

        .ef-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.35);
        }

        .ef-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ef-success {
          margin-top: 12px;
          padding: 12px;
          background: rgba(39, 174, 96, 0.1);
          border: 1px solid rgba(39, 174, 96, 0.2);
          border-radius: 8px;
          color: #27ae60;
          font-size: 14px;
          text-align: center;
        }

        .ef-error {
          margin-top: 12px;
          padding: 12px;
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid rgba(231, 76, 60, 0.2);
          border-radius: 8px;
          color: #e74c3c;
          font-size: 14px;
          text-align: center;
        }

        .ef-trust {
          text-align: center;
          font-size: 12px;
          color: #888;
          margin-top: 16px;
        }

        .ef-error-summary {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border: 2px solid #fca5a5;
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }

        .ef-error-summary-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          color: #991b1b;
          font-size: 14px;
        }

        .ef-error-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .ef-error-list {
          margin: 0;
          padding-left: 18px;
          color: #b91c1c;
          font-size: 12px;
          line-height: 1.8;
        }

        .ef-error-list li {
          cursor: pointer;
          text-decoration: underline;
          text-decoration-style: dotted;
        }

        .ef-error-list li:hover {
          color: #991b1b;
        }

        @keyframes efShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        @media (max-width: 576px) {
          .ef-quote-form {
            padding: 20px;
          }

          .ef-form-grid {
            grid-template-columns: 1fr;
          }

          .ef-child-seats {
            grid-template-columns: 1fr;
          }

          .ef-service-btn {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </form>
  );
}
