// src/components/ScrollToTop.js
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

// This is the client component that handles scrolling
function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// We wrap it in a Suspense boundary because usePathname can suspend
export default function ScrollToTop() {
  return (
    <Suspense>
      <ScrollManager />
    </Suspense>
  );
}