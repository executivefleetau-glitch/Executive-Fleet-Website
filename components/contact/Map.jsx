import React from "react";

export default function Map() {
  return (
    <div className="section wow fadeInUp">
      <iframe
        className="map-contact"
        src="https://www.google.com/maps?q=9+Carol+Grove,+Tullamarine,+Victoria+3043,+Melbourne,+Australia&output=embed"
        style={{ border: "0px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Executive Fleet Location - 9 Carol Grove, Tullamarine"
      ></iframe>
    </div>
  );
}
