import React from "react";

export default function Map() {
  return (
    <div className="section wow fadeInUp">
      <iframe
        className="map-contact"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.485123985392!2d144.87854611226068!3d-37.73229713589801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65cba27958b8d%3A0xc3e659c049d592a8!2s9%20Carol%20Grove%2C%20Tullamarine%20VIC%203043!5e0!3m2!1sen!2sau!4v1737103135967!5m2!1sen!2sau"
        style={{ border: "0px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Executive Fleet Location - 9 Carol Grove, Tullamarine VIC 3043"
      ></iframe>
    </div>
  );
}
