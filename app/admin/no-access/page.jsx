"use client";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function NoAccessPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/admin/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="no-access-page">
      <section className="section mt-120 mb-100">
        <div className="container-sub">
          <div className="text-center">
            <div className="no-access-content">
              <div className="no-access-icon mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <h1 className="heading-44-medium mb-4">Access Denied</h1>
              
              <p className="text-18 color-text mb-4">
                You don't have permission to access this admin dashboard.
              </p>

              {user && (
                <div className="user-info mb-5">
                  <div className="user-card">
                    <div>
                      <p className="user-name">{user.name || 'Admin User'}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="action-buttons">
                <button
                  onClick={handleGoHome}
                  className="btn btn-primary mr-3"
                >
                  <svg className="icon-16 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="9,22 9,12 15,12 15,22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Go to Website
                </button>

                <button
                  onClick={handleSignOut}
                  className="btn btn-outline-secondary"
                >
                  <svg className="icon-16 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="16,17 21,12 16,7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="21"
                      y1="12"
                      x2="9"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>

              <div className="help-text mt-5">
                <p className="text-14 color-text">
                  If you believe this is an error, please contact your system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .no-access-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-access-content {
          background: #ffffff;
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.1);
          max-width: 600px;
          position: relative;
          overflow: hidden;
        }

        .no-access-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
        }

        .no-access-icon {
          color: #ef4444;
        }

        .no-access-icon svg {
          width: 80px;
          height: 80px;
        }

        .user-card {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.05) 0%, rgba(206, 155, 40, 0.02) 100%);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 400px;
          margin: 0 auto;
        }

        .user-name {
          margin: 0 0 4px 0;
          font-weight: 600;
          color: #000000;
          font-size: 16px;
        }

        .user-email {
          margin: 0;
          color: #666666;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .btn-outline-secondary {
          background: transparent;
          color: #666666;
          border: 2px solid #dee2e6;
        }

        .btn-outline-secondary:hover {
          background: #f8f9fa;
          border-color: #adb5bd;
          transform: translateY(-2px);
        }

        .icon-16 {
          width: 16px;
          height: 16px;
        }

        .mr-2 {
          margin-right: 8px;
        }

        .mr-3 {
          margin-right: 12px;
        }

        @media (max-width: 768px) {
          .no-access-content {
            margin: 20px;
            padding: 40px 24px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            justify-content: center;
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
}
