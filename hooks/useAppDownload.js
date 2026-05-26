"use client"
import { useState } from "react"
import { APP_DOWNLOAD_LINKS } from "@/lib/appDownloadLinks"

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
      window.location.href = APP_DOWNLOAD_LINKS.android
      return
    }

    if (isIOS) {
      window.location.href = APP_DOWNLOAD_LINKS.ios
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
