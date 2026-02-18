"use client"
import { useState } from "react"

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

    // 📱 Mobile → direct store redirect
    if (isAndroid) {
      window.location.href = process.env.NEXT_PUBLIC_ANDROID_APP_URL
      return
    }

    if (isIOS) {
      window.location.href = process.env.NEXT_PUBLIC_IOS_APP_URL
      return
    }

    // 💻 Desktop → open OS popup
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
