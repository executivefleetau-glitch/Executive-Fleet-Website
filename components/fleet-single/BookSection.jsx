"use client";
import Image from "next/image";
import React from "react";

export default function BookSection({ car }) {
  return (
    <section className="section mt-90">
      <div className="container-sub">
        <h2 className="heading-44-medium wow fadeInUp">
          Book Your Business Class
        </h2>
        <div className="row mt-50">
          <div className="col-xl-8 col-lg-7 mb-30">
            <h5 className="text-20-medium color-text mb-10 wow fadeInUp">
              {car.title}
            </h5>
            <p className="text-14 color-text mb-15 wow fadeInUp">
              {car.description}
            </p>
            <div className="mt-5 wow fadeInUp">
              <span className="passengers-info mr-20 color-text">
                Passengers {car.passenger}
              </span>
              <span className="luggages-info color-text">
                Luggage {car.luggage}
              </span>
            </div>
            <div className="mt-20 text-center wow fadeInUp">
              <Image
                width={700}
                height={326}
                style={{ height: "fit-content" }}
                className="d-block"
                src={car.imgSrc}
                alt="luxride"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 mb-30">
            <div className="box-vehicle-price wow fadeInUp">
              <h5 className="text-20-medium color-text mb-20">Why Choose This Vehicle?</h5>
              <ul className="list-vehicle-features">
                <li className="feature-item">
                  <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b1214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="feature-text">Executive luxury sedan</span>
                </li>
                <li className="feature-item">
                  <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b1214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="feature-text">Premium leather interiors</span>
                </li>
                
                <li className="feature-item">
                  <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b1214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="feature-text">Professional chauffeur</span>
                </li>
                <li className="feature-item">
                  <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b1214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="feature-text">Complimentary refreshments</span>
                </li>
                <li className="feature-item">
                  <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b1214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="feature-text">Flexible booking options</span>
                </li>
              </ul>
              
              <div className="mt-30 wow fadeInUp">
                <a className="btn btn-primary btn-book mw-100" href="/booking-vehicle">
                  Book Now
                  <svg
                    className="icon-16 ml-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <style jsx>{`
              .list-vehicle-features {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              
              .feature-item {
                display: flex;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
              }
              
              .feature-item:last-child {
                border-bottom: none;
              }
              
              .feature-icon {
                flex-shrink: 0;
                margin-right: 12px;
              }
              
              .feature-text {
                font-size: 15px;
                color: #253d4e;
                line-height: 1.5;
              }
              
              .quote-cta {
                background: #f8f8f8;
                padding: 15px;
                border-radius: 8px;
                border-left: 3px solid #5b1214;
              }
            `}</style>
            <div className="row mt-30">
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-meet">
                  Meet & Greet included
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-free-cancel">
                  Free cancellation
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-free-wait">
                  Free Waiting time
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-safe">
                  Safe and secure travel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
