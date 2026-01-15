"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="section wow fadeInUp position-relative">
      <div className="banner-overlay"></div>
      <Image
        width={1920}
        height={550}
        style={{ width: "100%", height: "400px", objectFit: "cover", objectPosition: "center" }}
        src="/assets/imgs/about-banner-v5.png"
        alt="luxride"
      />
      <style jsx>{`
        .position-relative {
          position: relative;
        }
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(206, 155, 40, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
