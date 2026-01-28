"use client";
import { useState, useRef, useEffect } from "react";
import { cars } from "@/data/cars";
import Image from "next/image";

export default function VehicleSelector({ 
  selectedId = null, 
  onSelect, 
  maxVehicles = 6,
  variant = "grid", // "grid" | "scroll" | "compact"
  className = ""
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const vehiclesToShow = cars.slice(0, maxVehicles);

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (scrollRef.current && variant === "scroll") {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', updateScrollButtons);
      return () => ref.removeEventListener('scroll', updateScrollButtons);
    }
  }, [variant]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSelect = (vehicle) => {
    if (onSelect) {
      onSelect({
        id: vehicle.id,
        title: vehicle.title,
        carType: vehicle.carType,
        passenger: vehicle.passenger,
        luggage: vehicle.luggage,
        imgSrc: vehicle.imgSrc
      });
    }
  };

  if (variant === "scroll") {
    return (
      <div className={`vehicle-selector-scroll ${className}`}>
        {canScrollLeft && (
          <button 
            className="scroll-btn left" 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}
        
        <div className="vehicle-scroll-container" ref={scrollRef}>
          {vehiclesToShow.map(vehicle => (
            <div
              key={vehicle.id}
              className={`vehicle-scroll-card ${selectedId === vehicle.id ? 'selected' : ''}`}
              onClick={() => handleSelect(vehicle)}
            >
              <div className="vehicle-img">
                <Image
                  src={vehicle.imgSrc}
                  alt={vehicle.title}
                  width={240}
                  height={140}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="vehicle-content">
                <h4>{vehicle.title}</h4>
                <div className="vehicle-meta">
                  <span>👥 {vehicle.passengerDisplay || vehicle.passenger}</span>
                  <span>🧳 {vehicle.luggageDisplay || vehicle.luggage}</span>
                </div>
                <p className="vehicle-desc">{vehicle.carType}</p>
              </div>
              {selectedId === vehicle.id && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button 
            className="scroll-btn right" 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}

        <style jsx>{`
          .vehicle-selector-scroll {
            position: relative;
            width: 100%;
          }

          .vehicle-scroll-container {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 10px 5px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .vehicle-scroll-container::-webkit-scrollbar {
            display: none;
          }

          .scroll-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #ce9b28;
            color: #ce9b28;
            font-size: 28px;
            font-weight: 300;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.2s;
          }

          .scroll-btn:hover {
            background: #ce9b28;
            color: #000;
          }

          .scroll-btn.left {
            left: -22px;
          }

          .scroll-btn.right {
            right: -22px;
          }

          .vehicle-scroll-card {
            flex: 0 0 280px;
            background: #fff;
            border: 2px solid #e0e0e0;
            border-radius: 16px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.25s;
            position: relative;
          }

          .vehicle-scroll-card:hover {
            border-color: #ce9b28;
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          }

          .vehicle-scroll-card.selected {
            border-color: #ce9b28;
            background: linear-gradient(135deg, #fef9f0 0%, #fff 100%);
            box-shadow: 0 4px 20px rgba(206, 155, 40, 0.2);
          }

          .vehicle-img {
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          }

          .vehicle-content h4 {
            font-size: 17px;
            font-weight: 700;
            margin: 0 0 10px;
            color: #000;
          }

          .vehicle-meta {
            display: flex;
            gap: 16px;
            font-size: 14px;
            color: #555;
            margin-bottom: 8px;
          }

          .vehicle-desc {
            font-size: 13px;
            color: #888;
            margin: 0;
          }

          .selected-indicator {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(206, 155, 40, 0.3);
          }

          @media (max-width: 768px) {
            .vehicle-scroll-card {
              flex: 0 0 240px;
              padding: 16px;
            }

            .vehicle-img {
              height: 100px;
            }

            .scroll-btn {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`vehicle-selector-compact ${className}`}>
        {vehiclesToShow.map(vehicle => (
          <div
            key={vehicle.id}
            className={`vehicle-compact-card ${selectedId === vehicle.id ? 'selected' : ''}`}
            onClick={() => handleSelect(vehicle)}
          >
            <div className="vehicle-thumb">
              <Image
                src={vehicle.imgSrc}
                alt={vehicle.title}
                width={80}
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="vehicle-info">
              <h5>{vehicle.title}</h5>
              <span>{vehicle.passengerDisplay || vehicle.passenger} pax</span>
            </div>
            {selectedId === vehicle.id && <span className="check">✓</span>}
          </div>
        ))}

        <style jsx>{`
          .vehicle-selector-compact {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .vehicle-compact-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            background: #fff;
          }

          .vehicle-compact-card:hover {
            border-color: #ce9b28;
          }

          .vehicle-compact-card.selected {
            border-color: #ce9b28;
            background: #fef9f0;
          }

          .vehicle-thumb {
            width: 80px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .vehicle-info {
            flex: 1;
          }

          .vehicle-info h5 {
            font-size: 14px;
            font-weight: 600;
            margin: 0 0 4px;
            color: #000;
          }

          .vehicle-info span {
            font-size: 12px;
            color: #666;
          }

          .check {
            width: 24px;
            height: 24px;
            background: #ce9b28;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-size: 12px;
            font-weight: 700;
          }
        `}</style>
      </div>
    );
  }

  // Default grid variant
  return (
    <div className={`vehicle-selector-grid ${className}`}>
      {vehiclesToShow.map(vehicle => (
        <div
          key={vehicle.id}
          className={`vehicle-grid-card ${selectedId === vehicle.id ? 'selected' : ''}`}
          onClick={() => handleSelect(vehicle)}
        >
          <div className="vehicle-image">
            <Image
              src={vehicle.imgSrc}
              alt={vehicle.title}
              width={200}
              height={120}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="vehicle-details">
            <h4>{vehicle.title}</h4>
            <div className="vehicle-specs">
              <span>👥 {vehicle.passengerDisplay || vehicle.passenger}</span>
              <span>🧳 {vehicle.luggageDisplay || vehicle.luggage}</span>
            </div>
            <p className="vehicle-type">{vehicle.carType}</p>
          </div>
          {selectedId === vehicle.id && (
            <div className="selected-badge">✓</div>
          )}
        </div>
      ))}

      <style jsx>{`
        .vehicle-selector-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .vehicle-grid-card {
          border: 2px solid #e0e0e0;
          border-radius: 14px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          background: #fff;
        }

        .vehicle-grid-card:hover {
          border-color: #ce9b28;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }

        .vehicle-grid-card.selected {
          border-color: #ce9b28;
          background: linear-gradient(135deg, #fef9f0 0%, #fff 100%);
        }

        .vehicle-image {
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .vehicle-details h4 {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 10px;
          color: #000;
        }

        .vehicle-specs {
          display: flex;
          gap: 14px;
          font-size: 13px;
          color: #555;
          margin-bottom: 8px;
        }

        .vehicle-type {
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        .selected-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-weight: 700;
          font-size: 15px;
        }

        @media (max-width: 992px) {
          .vehicle-selector-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .vehicle-selector-grid {
            grid-template-columns: 1fr;
          }

          .vehicle-grid-card {
            display: flex;
            gap: 16px;
            padding: 16px;
          }

          .vehicle-image {
            width: 100px;
            height: 70px;
            margin-bottom: 0;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
