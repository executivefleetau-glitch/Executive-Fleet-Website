"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then((module) => {
        // Module is imported, you can access any exported functionality if needed
      });
    }
  }, []);

  const path = usePathname();
  
  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
      mobile: false,
    });
    wow.init();
  }, [path]);

  return <>{children}</>;
}

