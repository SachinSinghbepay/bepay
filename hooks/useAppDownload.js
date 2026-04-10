"use client"
import { useState } from "react"

const androidLink = "https://play.google.com/store/apps/details?id=com.bepay.user"
const iosLink = "https://testflight.apple.com/join/51JVNh5g"

export function useAppDownload() {
  const [isOSPopupOpen, setIsOSPopupOpen] = useState(false)
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false)
  const [selectedOS, setSelectedOS] = useState(null)

  const handleDownloadClick = () => {
    if (typeof navigator === "undefined") return

    const userAgent = navigator.userAgent || navigator.vendor
    const isAndroid = /android/i.test(userAgent)
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    if (isAndroid) {
      window.location.href = androidLink
      return
    }

    if (isIOS) {
      window.location.href = iosLink
      return
    }

    // Desktop → open OS selection popup
    setIsOSPopupOpen(true)
  }

  return {
    handleDownloadClick,
    isOSPopupOpen,
    setIsOSPopupOpen,
    isQRPopupOpen,
    setIsQRPopupOpen,
    selectedOS,
    setSelectedOS,
  }
}
