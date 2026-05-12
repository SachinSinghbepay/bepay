"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ArrowUpRight,
  Star,
  AlertTriangle,
  X,
} from "lucide-react";
import Link from "next/link";
import { DAPPS_DATA } from "@/lib/dappsData"; // Import actual dApps data

const DAppDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showWarning, setShowWarning] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Redirect /dapps/index to the index page
  if (params.name === "index") {
    router.push("/dapps/index");
    return null;
  }

  // Check if warning should be shown from URL parameter
  useEffect(() => {
    if (searchParams.get('showWarning') === 'true') {
      setShowWarning(true);
    }
  }, [searchParams]);

  // Decode the dApp name from URL
  const dappName = decodeURIComponent(params.name || "Hyperliquid bridge"); // Default to "Hyperliquid bridge" for quick testing/matching the screenshot

  // Find the dApp in the data
  const dapp = DAPPS_DATA.find((d) => d.name === dappName);

  // If dApp not found, show not found page
  if (!dapp) {
    return (
      <div className="bg-white max-w-md mx-auto p-4 font-sans min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-4">dApp not found</p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Go back
        </button>
      </div>
    );
  }

  // Helper to open the dApp URL
  const openDApp = () => {
    if (dapp.website_url) {
      window.open(dapp.website_url, "_blank");
    }
    setShowWarning(false);
  };
  
  // Custom structure to match the screenshot's data points precisely
  const dataPoints = [
      { label: "Total value locked", value: dapp.totalValueLocked, icon: null },
      { label: "Supported networks", value: null, icon: "/icons/network-icon.svg" }, // Placeholder for the network icon
      { label: "Website", value: dapp.website_url, icon: null },
      { label: "Social media", value: null, icon: "/icons/social-icons.svg" }, // Placeholder for social icons
  ];

  return (
    // Use min-h-screen to ensure content pushes to bottom if short, add pb-24 for fixed button padding
    <div className="bg-white max-w-md mx-auto p-4 font-sans min-h-screen pb-24 relative">
      {/* Header with back button & Star icon */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-900 transition"
        >
          <ChevronLeft size={24} />
        </button>
        {/* Title is NOT visible in the screenshot's header area */}
        {/* <h1 className="text-xl font-bold text-gray-900 flex-1 text-center">
          {dapp.name}
        </h1> */}
        <button className="text-gray-900 transition">
            <Star size={24} className="text-gray-400" />
        </button>
      </div>

      {/* dApp Icon and Info Card (Restyled to match screenshot) */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Icon (Larger as per screenshot) */}
        <div className="flex-shrink-0">
          <Image
            src={dapp.logo_url}
            alt={`${dapp.name} logo`}
            width={56} // Adjust size to match screenshot
            height={56} // Adjust size to match screenshot
            className="rounded-xl flex-shrink-0"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="font-bold text-2xl text-gray-900">{dapp.name}</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">About</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {dapp.long_description}
        </p>
      </div>

      {/* Table-like Data Points section (Restyled to match screenshot) */}
      <div className="space-y-4 pt-4">
        {dataPoints.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center space-x-2">
                    {/* Render TVL */}
                    {item.label === "Total value locked" && item.value && (
                        <span className="text-sm font-semibold text-gray-900">
                            {item.value}
                        </span>
                    )}
                    {/* Render Supported Networks Icon/Details */}
                    {item.label === "Supported networks" && (
                        <Image
                            src="/icons/network-icon-single.svg" // Placeholder for single network icon
                            alt="Network icon"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                    )}
                    {/* Render Website URL */}
                    {item.label === "Website" && item.value && (
                        <Link
                            href={item.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm"
                        >
                            {item.value.replace('https://', '').replace('http://', '')}
                        </Link>
                    )}
                    {/* Render Social Media Icons */}
                    {item.label === "Social media" && (
                        <>
                            <Image
                                src="/icons/instagram.png" // Placeholder for Instagram icon
                                alt="Instagram"
                                width={18}
                                height={18}
                                className="w-6 h-6"
                            />
                            <Image
                                src="/icons/twitter.png" // Placeholder for Twitter/X icon
                                alt="Twitter/X"
                                width={18}
                                height={18}
                                className="w-6 h-6"
                            />
                        </>
                    )}                    
                </div>                
            </div>            
        ))}
                <button
          onClick={() => setShowWarning(true)}
              className="mt-60 bg-black text-white font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2.5 w-full h-12 rounded-full"
        >
          Open
        </button>
      </div>      
      {/* Warning Modal - Slides up from bottom (Keep original logic) */}
      {showWarning && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            className="absolute inset-0 bg-black/50 pointer-events-auto z-30" // Added dark backdrop
            onClick={() => setShowWarning(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 pb-8 animate-slide-up z-50 pointer-events-auto"
            style={{ width: "100%", maxWidth: "none" }}
          >
            {/* ... Warning Modal Content (Keep as is) ... */}
            
            {/* Close Button */}
            <button
              onClick={() => setShowWarning(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Warning Icon */}
            <div className="flex justify-center mb-5 mt-10">
              <AlertTriangle
                size={56}
                className="text-gray-400"
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 text-center mb-10">
              Use caution with external dApps
            </h2>

            {/* Warning Content */}
            <div className="space-y-4 mb-6">
              <p className="text-[12px] text-[#6A6A6A] leading-relaxed">
                DApps are applications operated by independent, third party,
                project providers and carry inherent risks. Please proceed with
                caution by verifying all addresses before transferring assets.
                We do not have control over these dApps and are not liable for
                any loss of assets or damages resulting from dApp usage.{" "}
              </p>

              <p className="text-[12px] text-[#6A6A6A] leading-relaxed">
                Beware of scammers impersonating bepay customer support staff.
                We will never ask for your seed phrase, private keys or
                passwords.
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3 mb-6">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label
                htmlFor="dontShowAgain"
                className="text-[12px] font-medium text-[#080808] cursor-pointer"
              >
                Don&apos;t show me this warning again
              </label>
            </div>
            {/* Got It Button */}
            <button
              onClick={openDApp}
              className="bg-black text-white font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2.5 w-full h-12 rounded-full"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      {/* Backdrop scroll lock */}
      {showWarning && <style>{`html { overflow: hidden; }`}</style>}
    </div>
  );
};

export default DAppDetailPage;