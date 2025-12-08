"use client";
import DashboardLayout from "@/components/admin/DashboardLayout";

export default function BlogsPage() {
  return (
    <DashboardLayout>
      <div className="blogs-coming-soon-page">
        <div className="coming-soon-container">
          {/* Icon */}
          <div className="icon-wrapper">
            <svg 
              className="coming-soon-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="coming-soon-title">
            Blog Management
          </h1>

          {/* Coming Soon Badge */}
          <div className="coming-soon-badge">
            <svg 
              className="badge-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M12 6V12L16 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>Coming Soon</span>
          </div>

          {/* Description */}
          <p className="coming-soon-description">
            Our blog management system is currently under development. This powerful feature will allow you to create, edit, and publish engaging content for your audience.
          </p>

          {/* Features List */}
          <div className="features-list">
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Rich Text Editor</span>
            </div>
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Image Upload & Gallery</span>
            </div>
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>SEO Optimization</span>
            </div>
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Categories & Tags</span>
            </div>
          </div>

          {/* Timeline Hint */}
          <div className="timeline-hint">
            <svg 
              className="timeline-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M16 2V6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M8 2V6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M3 10H21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>Expected Launch: Q1 2025</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blogs-coming-soon-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .coming-soon-container {
          max-width: 700px;
          text-align: center;
          animation: fadeInUp 0.8s ease;
        }

        /* Icon Wrapper */
        .icon-wrapper {
          margin: 0 auto 40px;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1), rgba(232, 180, 41, 0.05));
          border: 3px solid rgba(206, 155, 40, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconFloat 3s ease-in-out infinite;
        }

        .coming-soon-icon {
          width: 60px;
          height: 60px;
          color: #ce9b28;
        }

        /* Main Title */
        .coming-soon-title {
          font-size: 56px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 30px 0;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        /* Coming Soon Badge */
        .coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(206, 155, 40, 0.4);
          border-radius: 50px;
          margin-bottom: 30px;
          animation: badgePulse 2s ease-in-out infinite;
        }

        .badge-icon {
          width: 24px;
          height: 24px;
          color: #e8b429;
        }

        .coming-soon-badge span {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Description */
        .coming-soon-description {
          font-size: 18px;
          line-height: 1.7;
          color: #000000;
          margin: 0 0 50px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }

        /* Features List */
        .features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 50px;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(206, 155, 40, 0.05);
          border-color: rgba(206, 155, 40, 0.4);
          transform: translateY(-3px);
        }

        .feature-icon {
          width: 22px;
          height: 22px;
          color: #e8b429;
          flex-shrink: 0;
        }

        .feature-item span {
          font-size: 15px;
          font-weight: 600;
          color: #000000;
          text-align: left;
        }

        /* Timeline Hint */
        .timeline-hint {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15), rgba(232, 180, 41, 0.1));
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 50px;
        }

        .timeline-icon {
          width: 20px;
          height: 20px;
          color: #ce9b28;
        }

        .timeline-hint span {
          font-size: 14px;
          font-weight: 600;
          color: #e8b429;
          letter-spacing: 0.5px;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes badgePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(206, 155, 40, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(206, 155, 40, 0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .coming-soon-title {
            font-size: 42px;
          }

          .icon-wrapper {
            width: 100px;
            height: 100px;
            margin-bottom: 30px;
          }

          .coming-soon-icon {
            width: 50px;
            height: 50px;
          }

          .coming-soon-badge {
            padding: 14px 24px;
          }

          .coming-soon-badge span {
            font-size: 16px;
          }

          .coming-soon-description {
            font-size: 16px;
          }

          .features-list {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .feature-item {
            padding: 16px 18px;
          }
        }

        @media (max-width: 480px) {
          .coming-soon-title {
            font-size: 32px;
          }

          .icon-wrapper {
            width: 80px;
            height: 80px;
          }

          .coming-soon-icon {
            width: 40px;
            height: 40px;
          }

          .timeline-hint {
            padding: 12px 20px;
          }

          .timeline-hint span {
            font-size: 13px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

