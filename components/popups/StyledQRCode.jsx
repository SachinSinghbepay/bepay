"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import QRCodeStyling from "qr-code-styling"

export default function StyledQRCode({ url }) {
  const qrRef = useRef(null)
  const qrCode = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!qrRef.current) return

    // No image option — QR generates synchronously, MutationObserver fires instantly
    // Logo is overlaid via CSS below, so no async timing issues
    qrCode.current = new QRCodeStyling({
      width: 220,
      height: 220,
      data: url,
      dotsOptions: { color: "#000000", type: "rounded" },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { type: "extra-rounded" },
    })

    qrRef.current.innerHTML = ""

    const observer = new MutationObserver(() => {
      observer.disconnect()
      setIsReady(true)
    })
    observer.observe(qrRef.current, { childList: true })

    qrCode.current.append(qrRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR if URL changes (iOS ↔ Android)
  useEffect(() => {
    if (!qrCode.current || !qrRef.current) return
    setIsReady(false)
    qrRef.current.innerHTML = ""

    const observer = new MutationObserver(() => {
      observer.disconnect()
      setIsReady(true)
    })
    observer.observe(qrRef.current, { childList: true })

    qrCode.current.update({ data: url })
    qrCode.current.append(qrRef.current)

    return () => observer.disconnect()
  }, [url])

  return (
    <div className="relative flex justify-center items-center" style={{ minHeight: 220, minWidth: 220 }}>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      )}

      <div className="relative">
        <div
          ref={qrRef}
          className={`flex justify-center transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
        />
        {/* Logo overlaid on top of QR via CSS — no async fetch inside qr-code-styling */}
        {isReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/logo.png"
              alt="bepay"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-md bg-white p-0.5"
            />
          </div>
        )}
      </div>
    </div>
  )
}
