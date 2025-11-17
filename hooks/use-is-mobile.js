"use client"

import { useState, useEffect } from "react"

export const useIsMobile = (breakpoint = 768) => {
  // Initialize as null to prevent flash of wrong content during SSR/hydration
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [breakpoint])

  return isMobile
}
