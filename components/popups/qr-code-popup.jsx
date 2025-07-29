"use client"
import Image from "next/image"
import { AppDownloadPopupWrapper } from "./app-download-popup-wrapper"
import { CountryPhoneInput } from "@/components/ui/country-phone-input"



export function QRCodePopup({ isVisible, onClose }) {
  const handleSendSms = (countryCode, phoneNumber) => {
    console.log(`Sending SMS to ${countryCode}${phoneNumber}`)
    // Implement your SMS sending logic here (e.g., API call)
    alert(`SMS link sent to ${countryCode}${phoneNumber}! (Simulated)`)
  }

  return (
    <AppDownloadPopupWrapper isVisible={isVisible} onClose={onClose} direction="right">
      {" "}
      {/* Animate from right */}
      <div className="text-center space-y-6">
          <h2 className="text-2xl lg:text-[60px] font-bold text-[#333333]">
          Get the bepay app
        </h2>
        <p className="text-gray-900">Scan the QR code to download the app</p>
        <div className="flex justify-center">
          <Image
            src="/qr.png" // Use the embedded QR image
            alt="QR Code to download app"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <p className="text-gray-600">or get a download link via SMS</p>
        <CountryPhoneInput onSendSms={handleSendSms} />
      </div>
    </AppDownloadPopupWrapper>
  )
}
