import React from "react";

export default function Map() {
  return (
    <div className="section wow fadeInUp">
      <iframe
        className="map-contact"
        src="https://www.google.com/maps?q=3/199+Greenvale+Drive,+Greenvale,+Victoria+3059,+Melbourne,+Australia&output=embed"
        style={{ border: "0px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Executive Fleet Location - 3/199 Greenvale Drive, Greenvale"
      ></iframe>
    </div>
  );
}
