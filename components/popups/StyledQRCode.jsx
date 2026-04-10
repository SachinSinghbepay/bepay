"use client"
import { useEffect, useRef, useState } from "react"
import QRCodeStyling from "qr-code-styling"

export default function StyledQRCode({ url, isVisible }) {
  const qrRef = useRef(null)
  const qrCode = useRef(null)
  const [isReady, setIsReady] = useState(false)

  // Pre-initialize the QR instance on mount so it's ready when popup opens
  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 220,
        height: 220,
        data: url,
        image: "/logo.png",
        dotsOptions: { color: "#000000", type: "rounded" },
        backgroundOptions: { color: "#ffffff" },
        cornersSquareOptions: { type: "extra-rounded" },
      })
    }
    // Cleanup: clear qr-code-styling's DOM nodes before React unmounts
    // (prevents "removeChild" conflict since qr-code-styling manages DOM outside React)
    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ""
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || !qrRef.current || !qrCode.current) return

    setIsReady(false)
    qrCode.current.update({ data: url })
    qrRef.current.innerHTML = ""
    qrCode.current.append(qrRef.current)
    // Give one frame for the canvas to paint before revealing
    requestAnimationFrame(() => setIsReady(true))
  }, [url, isVisible])

  return (
    <div className="relative flex justify-center items-center" style={{ minHeight: 220, minWidth: 220 }}>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      )}
      <div
        ref={qrRef}
        className={`flex justify-center transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}
