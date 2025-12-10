"use client";
import { locations } from "@/data/locations";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PlacePicker({ value, onChange, useGoogleMaps = false }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    value || locations[0].placeName
  );
  const inputRef = useRef();
  const autocompleteRef = useRef(null);

  const addInactive = (event) => {
    if (!inputRef.current?.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", addInactive);
    return () => {
      document.removeEventListener("click", addInactive);
    };
  }, []);

  // Initialize Google Maps Autocomplete if enabled
  useEffect(() => {
    if (!useGoogleMaps) return;
    
    const initAutocomplete = () => {
      if (!window.google?.maps?.places) {
        console.log("Google Maps not loaded yet, retrying...");
        setTimeout(initAutocomplete, 500);
        return;
      }

      if (inputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: { country: "au" },
            fields: ["formatted_address", "geometry", "name"]
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry && onChange) {
            const location = place.formatted_address || place.name;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setSelectedLocation(location);
            onChange(location, lat, lng);
          }
        });
      }
    };

    initAutocomplete();
  }, [useGoogleMaps, onChange]);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedLocation(value);
    }
  }, [value]);

  const handleLocationSelect = (elm) => {
    setSelectedLocation(elm.placeName);
    if (onChange) {
      // For preset locations, we don't have exact lat/lng, so pass null
      onChange(elm.placeName, null, null);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSelectedLocation(newValue);
    if (onChange && !useGoogleMaps) {
      onChange(newValue, null, null);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="search-input dropdown-location"
        onClick={() => !useGoogleMaps && setIsActive((pre) => !pre)}
        type="text"
        placeholder={useGoogleMaps ? "Enter address" : ""}
        value={selectedLocation}
        onChange={handleInputChange}
        readOnly={!useGoogleMaps}
      />
      {!useGoogleMaps && (
        <div
          className="box-dropdown-location"
          style={isActive ? { display: "block" } : { display: "none" }}
        >
          <div className="list-locations">
            {locations.map((elm, i) => (
              <div
                key={i}
                onClick={() => handleLocationSelect(elm)}
                className="item-location"
              >
                <div className="location-icon">
                  <Image width={16} height={16} src={elm.icon} alt="luxride" />
                </div>
                <div className="location-info">
                  <h6 className="text-16-medium color-text title-location">
                    {elm.placeName}
                  </h6>
                  <p className="text-14 color-grey searchLocations">
                    {elm.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
