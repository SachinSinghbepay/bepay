"use client";
import { Button } from "@/components/ui/button";
import { AppDownloadPopupWrapper } from "./app-download-popup-wrapper";
import { CountryPhoneInput } from "@/components/ui/country-phone-input";
import Image from "next/image";

export function OSSelectionPopup({ isVisible, onClose, onOSSelected }) {
  const handleSendSms = (countryCode, phoneNumber) => {
    console.log(`Sending SMS to ${countryCode}${phoneNumber}`);
    // Implement your SMS sending logic here (e.g., API call)
    alert(`SMS link sent to ${countryCode}${phoneNumber}! (Simulated)`);
  };

  return (
    <AppDownloadPopupWrapper
      isVisible={isVisible}
      onClose={onClose}
      direction="bottom" 
    >
      {" "}
      {/* Animate from bottom */}
      <div className="text-center space-y-6">
        <h2 className="text-2xl lg:text-[60px] font-bold text-[#333333]">
          Get the bepay money app 
        </h2>
        <p className="text-gray-900">Choose your device OS</p>
        <div className="flex flex-col max-w-[300px] mx-auto gap-3">
          <Button
            className="w-full py-8 px-5 cursor-pointer rounded-full text-sm font-semibold flex items-center justify-center gap-2 bg-black text-white hover:bg-black/80"
           onClick={() => onOSSelected("ios")}// Trigger QR popup on click
          >
            <div>
              <Image
                src={"/apple.png"}
                width={20}
                height={20}
                className="object-cover"
                alt="apple logo"
              />{" "}
            </div>
            Download on the App Store!
          </Button>
          <Button
            className="w-full cursor-pointer py-8 px-5 text-sm rounded-full font-semibold flex items-center justify-center gap-2 bg-black text-white hover:bg-black/80"
           onClick={() => onOSSelected("android")}// Trigger QR popup on click
          >
            <Image
              src={"/playstore.png"}
              width={20}
              height={20}
              className="object-cover"
              alt="Google Play logo"
            />{" "}
            Get the App on Google Play!
          </Button>
          {/* <Button
            className="w-full py-8 px-5 cursor-pointer text-sm rounded-full font-semibold flex items-center justify-center gap-2 bg-black text-white hover:bg-black/80"
            onClick={() => onOSSelected("gallery")} // Trigger QR popup on click
          >
            <Image
              src={"/gal.png"}
              width={20}
              height={20}
              className="object-cover"
              alt="App Gallery logo"
            />{" "}
            Get it on the App Gallery!
          </Button> */}
        </div>
        {/* <p className="text-gray-900">or get a download link via SMS</p>
        <CountryPhoneInput onSendSms={handleSendSms} /> */}
      </div>
    </AppDownloadPopupWrapper>
  );
}
