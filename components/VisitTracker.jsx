"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Debounce or just fire? 
        // Fire once per pathname change is good for "Page Views"
        // To avoid double-counting in strict mode, we can use a ref or just accept it (dev only)

        const logVisit = async () => {
            try {
                await fetch('/api/track-visit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pathname })
                });
            } catch (e) {
                // Ignore errors
            }
        };

        logVisit();
    }, [pathname]);

    return null;
}
