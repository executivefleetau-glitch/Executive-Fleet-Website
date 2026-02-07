"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileFloatingCTA from "@/components/common/MobileFloatingCTA";
import NotificationProvider from "@/components/admin/NotificationProvider";

export default function ClientLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then((module) => {
        // Module is imported, you can access any exported functionality if needed
      });

      // Register service worker for PWA support
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered:', registration.scope);
          })
          .catch((error) => {
            console.log('[PWA] Service Worker registration failed:', error);
          });
      }
    }
  }, []);

  const path = usePathname();

  useEffect(() => {
    // Modern lightweight replacement for WOW.js to performant animations
    // Use IntersectionObserver to avoid forced reflows from scroll listeners
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Apply animation configurations if present
          const delay = el.getAttribute('data-wow-delay');
          const duration = el.getAttribute('data-wow-duration');

          if (delay) el.style.animationDelay = delay;
          if (duration) el.style.animationDuration = duration;

          // Trigger animation
          el.style.visibility = 'visible';
          el.classList.add('animated');

          // Stop observing once animated
          observer.unobserve(el);
        }
      });
    };

    const observerOptions = {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '0px 0px -50px 0px' // Offset slightly to mimic WOW feel
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.wow');

    elements.forEach((el) => {
      el.style.visibility = 'hidden'; // Ensure hidden initially
      observer.observe(el);
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [path]);

  return (
    <NotificationProvider>
      {children}
      <MobileFloatingCTA />
    </NotificationProvider>
  );
}

