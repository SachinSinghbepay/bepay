"use client"
import { useEffect, useRef, useState } from "react"
import QRCodeStyling from "qr-code-styling"

export default function StyledQRCode({ url }) {
  const qrRef = useRef(null)
  const qrCode = useRef(null)
  const [isReady, setIsReady] = useState(false)

  // Generate QR on mount — wrapper keeps this always mounted so it pre-warms on page load
  useEffect(() => {
    if (!qrRef.current) return

    qrCode.current = new QRCodeStyling({
      width: 220,
      height: 220,
      data: url,
      image: "/logo.png",
      dotsOptions: { color: "#000000", type: "rounded" },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { type: "extra-rounded" },
    })

    qrRef.current.innerHTML = ""
    qrCode.current.append(qrRef.current)

    // Wait for logo.png to load inside the QR before revealing
    const timer = setTimeout(() => setIsReady(true), 800)
    return () => clearTimeout(timer)
  }, [])

  // Update QR if URL changes (e.g. user switches iOS ↔ Android)
  useEffect(() => {
    if (!qrCode.current) return
    setIsReady(false)
    qrCode.current.update({ data: url })
    const timer = setTimeout(() => setIsReady(true), 800)
    return () => clearTimeout(timer)
  }, [url])

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
