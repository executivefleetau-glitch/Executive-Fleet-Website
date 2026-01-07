"use client";
import { cars } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";

export default function FeetList1() {
  const categories = [
    {
      id: "first-class",
      title: "First Class",
      description: "The pinnacle of automotive luxury. Experience unmatched comfort and prestige.",
      filter: ["First Class"],
      bgClass: "bg-light"
    },
    {
      id: "business-class",
      title: "Business Class",
      description: "Refined efficiency for the modern executive. Arrive ready to perform.",
      filter: ["Business Class"],
      bgClass: "bg-white"
    },
    {
      id: "luxury-suv",
      title: "Luxury SUV",
      description: "Commanding presence with generous space. Perfect for groups who demand style.",
      filter: ["Luxury SUV"],
      bgClass: "bg-light"
    },
    {
      id: "group-travel",
      title: "Group Travel & V-Class",
      description: "Executive solutions for larger parties. Space without compromise.",
      filter: ["Luxury Van", "Minibus"], // Combined categories
      bgClass: "bg-white"
    },
  ];

  const getCarsByCategory = (filters) => {
    return cars.filter((car) => filters.includes(car.category));
  };

  return (
    <>
      <section className="fleet-list-section">
        <div className="container">
          {/* Main Header */}
          <div className="text-center pt-80 pb-60">
            <div className="fleet-badge wow fadeInDown">
              <span className="badge-line"></span>
              <span className="badge-text">EXECUTIVE COLLECTION</span>
              <span className="badge-line"></span>
            </div>
            <h1 className="main-title wow fadeInUp" data-wow-delay="0.1s">
              Our <span className="text-gold">Premium Fleet</span>
            </h1>
            <p className="main-subtitle wow fadeInUp" data-wow-delay="0.2s">
              Curated for the most discerning travelers in Melbourne.
            </p>
          </div>

          {/* Categories */}
          <div className="categories-wrapper">
            {categories.map((cat, index) => {
              const categoryCars = getCarsByCategory(cat.filter);
              if (categoryCars.length === 0) return null;

              return (
                <div key={cat.id} className={`category-section ${cat.bgClass} wow fadeInUp`}>
                  <div className="category-header">
                    <h2 className="cat-title">{cat.title}</h2>
                    <p className="cat-desc">{cat.description}</p>
                    <div className="cat-divider"></div>
                  </div>

                  <div className="row g-4 justify-content-center">
                    {categoryCars.map((elm, i) => (
                      <div key={i} className="col-lg-4 col-md-6">
                        <div className="luxury-card" data-wow-delay={`${i * 0.1}s`}>
                          <div className="card-content">
                            <Link href={elm.pageurl} className="img-container">
                              <div className="img-backdrop"></div>
                              <Image
                                width={800} // Increased res
                                height={450}
                                src={elm.imgSrc}
                                alt={elm.title}
                                className="vehicle-img"
                              />
                              <div className="hover-overlay">
                                <span className="view-btn">View Details</span>
                              </div>
                            </Link>

                            <div className="info-container">
                              <div className="info-header">
                                <Link href={elm.pageurl} className="vehicle-title-link">
                                  <h3 className="vehicle-title">{elm.title}</h3>
                                </Link>
                              </div>

                              <p className="vehicle-details">{elm.details}</p>

                              <div className="specs-row">
                                <div className="spec-item">
                                  <i className="spec-icon icon-user"></i>
                                  <span>{elm.passengerDisplay || elm.passenger} Pax</span>
                                </div>
                                <div className="spec-dot">•</div>
                                <div className="spec-item">
                                  <i className="spec-icon icon-briefcase"></i>
                                  <span>{elm.luggageDisplay || elm.luggage} Luggage</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* --- Global Setup --- */
        .fleet-list-section {
          background-color: #ffffff;
          overflow: hidden;
        }
        
        .container {
            max-width: 1320px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .text-gold {
          color: #ce9b28;
        }

        /* --- Main Header --- */
        .fleet-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .badge-line {
          width: 40px;
          height: 1px;
          background-color: #ce9b28;
          opacity: 0.6;
        }

        .badge-text {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #ce9b28;
          font-weight: 700;
        }

        .main-title {
          font-size: 56px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 15px;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .main-subtitle {
          font-size: 18px;
          color: #666;
          font-weight: 300;
        }

        /* --- Category Section --- */
        .category-section {
          padding: 80px 0;
          border-bottom: 1px solid #eee;
        }
        
        .category-section:last-child {
            border-bottom: none;
        }

        .category-section.bg-light {
            background-color: #fafafa;
            /* Extend full width background hack */
            box-shadow: 0 0 0 100vmax #fafafa;
            clip-path: inset(0 -100vmax);
        }

        .category-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .cat-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #000;
        }
        
        .cat-desc {
            font-size: 16px;
            color: #777;
            max-width: 500px;
            margin: 0 auto 20px;
        }

        .cat-divider {
          width: 60px;
          height: 3px;
          background: #ce9b28;
          margin: 0 auto;
        }

        /* --- Luxury Card --- */
        .luxury-card {
          position: relative;
          background: #fff;
          border-radius: 20px; /* Softer, modern radius */
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          height: 100%;
          border: 1px solid transparent; /* Prepare for hover */
        }
        
        .luxury-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            border-color: rgba(206, 155, 40, 0.3);
            z-index: 10;
        }

        .card-content {
            padding: 20px;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        /* Image Area */
        .img-container {
          position: relative;
          display: block;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff; /* Pure white to blend with new images */
          margin-bottom: 25px;
          aspect-ratio: 16/9; /* Consistent sizing */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vehicle-img {
          width: 85%; /* Slightly reduced to give breathing room vs full width, or 100% if we want impact. Let's go large but contain. */
          height: auto;
          object-fit: contain;
          object-position: center;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          z-index: 2;
          /* Filter to ensure white matches if slightly off, but usually not needed for pure white gen */
        }

        .luxury-card:hover .vehicle-img {
            transform: scale(1.15) translateY(-5px); /* Stronger "pump" */
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25)); /* Dynamic shadow on lift */
        }
        
        .hover-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); /* Subtle gradient instead of full cover */
            display: flex;
            align-items: flex-end; /* Button at bottom */
            justify-content: center;
            opacity: 0;
            transition: all 0.4s ease;
            z-index: 3;
            padding-bottom: 30px;
        }
        
        .luxury-card:hover .hover-overlay {
            opacity: 1;
        }
        
        .view-btn {
            background: #ce9b28; /* Gold button */
            color: #fff;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transform: translateY(20px);
            transition: transform 0.4s ease;
            box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }
        
        .luxury-card:hover .view-btn {
            transform: translateY(0);
        }

        /* Info Area */
        .info-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .info-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .vehicle-title-link {
            text-decoration: none;
        }

        .vehicle-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          transition: color 0.3s;
        }
        
        .luxury-card:hover .vehicle-title {
            color: #ce9b28;
        }
        
        .vehicle-price {
            text-align: right;
            line-height: 1;
        }
        
        .currency {
            font-size: 14px;
            font-weight: 600;
            vertical-align: top;
            margin-right: 2px;
        }
        
        .unit {
            display: block;
            font-size: 10px;
            color: #888;
            text-transform: uppercase;
            margin-top: 4px;
        }

        .vehicle-details {
          font-size: 14px;
          color: #555;
          margin-bottom: 20px;
          line-height: 1.5;
          flex-grow: 1;
        }

        /* Specs */
        .specs-row {
          display: flex;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          color: #444;
          font-size: 13px;
          font-weight: 600;
        }
        
        .spec-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .spec-icon {
            /* Fallback or could use SVG */
            display: inline-block;
            width: 14px;
            height: 14px;
            background-color: #ce9b28; 
            mask-size: contain;
            mask-position: center;
            -webkit-mask-repeat: no-repeat;
        }
        
        .icon-user {
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
        }
        
        .icon-briefcase {
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>');
        }
        
        .spec-dot {
            margin: 0 10px;
            color: #ddd;
        }

        /* --- Responsive --- */
        @media (max-width: 991px) {
          .main-title {
            font-size: 42px;
          }
        }

        @media (max-width: 767px) {
          .main-title {
            font-size: 32px;
          }
          .category-section {
            padding: 50px 0;
            clip-path: none; /* remove special BG on mobile to prevent overflow issues */
            box-shadow: none;
          }
          .category-section.bg-light {
              width: 100vw;
              margin-left: -20px; /* Offset container padding */
              padding-left: 20px;
              padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}
