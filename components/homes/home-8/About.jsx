"use client";

export default function About() {
  return (
    <section className="section pt-60 pb-60">
      <div className="container-sub">
        <div className="about-wrapper">
          <div className="about-header mb-30 wow fadeInUp">
            <p className="about-label mb-10">About</p>
            <h2 className="about-title mb-15">
              EXECUTIVE FLEET MELBOURNE
            </h2>
            <p className="about-tagline">
              Largest Fleet • Widest Range
            </p>
          </div>
          
          <div className="about-body wow fadeInUp" data-wow-delay="0.2s">
            <p className="about-description">
              Since 2022, Executive Fleet has been Melbourne's trusted luxury chauffeur experts. We run the city's biggest and most varied fleet, guaranteeing spotless vehicles, professional drivers and on-time arrival – always. Airport, corporate or special event: one booking, zero stress.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section {
          background: #ffffff;
        }

        .about-wrapper {
          max-width: 1000px;
        }

        .about-label {
          font-size: 14px;
          font-weight: 600;
          color: #5b1214;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
        }

        .about-title {
          font-size: 40px;
          font-weight: 700;
          color: #181a1f;
          line-height: 1.3;
        }

        .about-tagline {
          font-size: 18px;
          font-weight: 600;
          color: #5b1214;
          margin: 0;
        }

        .about-description {
          font-size: 17px;
          line-height: 1.7;
          color: #626262;
          margin: 0;
          font-weight: 400;
        }

        .pt-60 {
          padding-top: 60px;
        }

        .pb-60 {
          padding-bottom: 60px;
        }

        .mb-30 {
          margin-bottom: 30px;
        }

        .mb-15 {
          margin-bottom: 15px;
        }

        .mb-10 {
          margin-bottom: 10px;
        }

        @media (max-width: 991px) {
          .about-title {
            font-size: 34px;
          }

          .about-tagline {
            font-size: 17px;
          }

          .about-description {
            font-size: 16px;
          }

          .pt-60 {
            padding-top: 50px;
          }

          .pb-60 {
            padding-bottom: 50px;
          }
        }

        @media (max-width: 767px) {
          .about-title {
            font-size: 28px;
          }

          .about-label {
            font-size: 13px;
          }

          .about-tagline {
            font-size: 16px;
          }

          .about-description {
            font-size: 15px;
          }

          .pt-60 {
            padding-top: 40px;
          }

          .pb-60 {
            padding-bottom: 40px;
          }

          .mb-30 {
            margin-bottom: 25px;
          }
        }
      `}</style>
    </section>
  );
}

