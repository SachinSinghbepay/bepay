"use client"
import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

export default function StyledQRCode({ url, isVisible }) {
  const qrRef = useRef(null)
  const qrCode = useRef(null)

  useEffect(() => {
    // ❌ Don’t run if popup hidden or ref missing
    if (!isVisible || !qrRef.current) return

    // Create QR only once
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 220,
        height: 220,
        data: url,
        image: "/logo.png", // optional center logo
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
      })
    } else {
      // If QR already exists, just update the URL
      qrCode.current.update({ data: url })
    }

    // Clear old QR before appending new
    qrRef.current.innerHTML = ""
    qrCode.current.append(qrRef.current)

  }, [url, isVisible])

  return <div ref={qrRef} className="flex justify-center" />
}
