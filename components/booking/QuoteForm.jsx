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
    passengers: "1",
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pickupDate) newErrors.pickupDate = "Required";
    if (!formData.pickupTime) newErrors.pickupTime = "Required";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Required";
    if (!formData.dropoffLocation) newErrors.dropoffLocation = "Required";
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (formData.returnTrip) {
      if (!formData.returnDate) newErrors.returnDate = "Required";
      if (!formData.returnTime) newErrors.returnTime = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validateForm()) return;
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
          returnTime: "", fullName: "", email: "", phone: "", passengers: "1", babyCapsule: "0",
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
          </div>
          <div className="ef-field">
            <label>Pickup Time *</label>
            <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange}
              className={errors.pickupTime ? 'error' : ''} />
          </div>
        </div>
        <div className="ef-field">
          <label>Pickup Location *</label>
          <PlacePicker value={formData.pickupLocation} onChange={handlePickupChange}
            useGoogleMaps={googleMapsLoaded} placeholder="Enter pickup address" className={errors.pickupLocation ? 'error' : ''} />
        </div>
        <div className="ef-field">
          <label>Drop-off Location *</label>
          <PlacePicker value={formData.dropoffLocation} onChange={handleDropoffChange}
            useGoogleMaps={googleMapsLoaded} placeholder="Enter destination" className={errors.dropoffLocation ? 'error' : ''} />
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
            </div>
            <div className="ef-field">
              <label>Return Time *</label>
              <input type="time" name="returnTime" value={formData.returnTime} onChange={handleInputChange}
                className={errors.returnTime ? 'error' : ''} />
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
              placeholder="John Smith" className={errors.fullName ? 'error' : ''} />
          </div>
          <div className="ef-field">
            <label>Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
              placeholder="0400 000 000" className={errors.phone ? 'error' : ''} />
          </div>
        </div>
        <div className="ef-form-grid">
          <div className="ef-field">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
              placeholder="you@email.com" className={errors.email ? 'error' : ''} />
          </div>
          <div className="ef-field">
            <label>Passengers</label>
            <select name="passengers" value={formData.passengers} onChange={handleInputChange}>
              {[...Array(11)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
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
