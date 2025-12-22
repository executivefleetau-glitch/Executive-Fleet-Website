"use client";
import { Suspense } from "react";
import Header2 from "@/components/headers/Header2";
import Footer9 from "@/components/footers/Footer9";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import BlogGrid from "@/components/blog/BlogGrid";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        {/* Breadcrumb Section - Same as Contact/About */}
        <div className="section pt-60 pb-60 bg-primary">
          <div className="container-sub">
            <h1 className="heading-44-medium color-white mb-5">Our Blog</h1>
            <div className="box-breadcrumb">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Suspense fallback={
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading articles...</p>
          </div>
        }>
          <BlogGrid />
        </Suspense>
      </main>
      <Footer9 />

      <style jsx>{`
        .loading-container {
          padding: 80px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(206, 155, 40, 0.2);
          border-top-color: #ce9b28;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-container p {
          color: #666;
          font-size: 18px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
