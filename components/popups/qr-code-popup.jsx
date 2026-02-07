"use client"
import Image from "next/image"
import { AppDownloadPopupWrapper } from "./app-download-popup-wrapper"
import { CountryPhoneInput } from "@/components/ui/country-phone-input"
import StyledQRCode from "./StyledQRCode"

const androidLink = process.env.NEXT_PUBLIC_ANDROID_APP_URL
const iosLink = process.env.NEXT_PUBLIC_IOS_APP_URL

export function QRCodePopup({ isVisible, onClose, selectedOS }) {
  const handleSendSms = (countryCode, phoneNumber) => {
    console.log(`Sending SMS to ${countryCode}${phoneNumber}`)
    alert(`SMS link sent to ${countryCode}${phoneNumber}! (Simulated)`)
  }

  const qrUrl = selectedOS === "ios" ? iosLink : androidLink

  return (
    <AppDownloadPopupWrapper isVisible={isVisible} onClose={onClose} direction="right">
      <div className="text-center space-y-6">
        <h2 className="text-2xl lg:text-[60px] font-bold text-[#333333]">
          Get the bepay app
        </h2>
        <p className="text-gray-900">Scan the QR code to download the app</p>

        <div className="flex justify-center">
          <StyledQRCode url={qrUrl} isVisible={isVisible} />
        </div>

        {/* <p className="text-gray-600">or get a download link via SMS</p>
        <CountryPhoneInput onSendSms={handleSendSms} /> */}
      </div>
    </AppDownloadPopupWrapper>
  )
}
