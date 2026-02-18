"use client";

import WaitlistTriggerButton from "@/components/waitlist-trigger-button";
import { ChevronDown, GripVertical } from "lucide-react";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import { useAppDownload } from "@/hooks/useAppDownload"
import { AppDownloadPopups } from "@/components/AppDownloadPopups"
import { motion, useTransform } from "framer-motion";


const accounts = [
  { name: "USD", code: "us", balance: "$1190", sub: "$1190" },
  { name: "EUR", code: "eu", balance: "€200", sub: "$230" },
  { name: "CHF", code: "ch", balance: "₣49", sub: "$60" },
  { name: "YUAN", code: "cn", balance: "¥49", sub: "$60" },
];
const handleButtonClick = () => {
  AnalyticsService.sendEvent("Get a free swiss bank account Clicked");
}



export function BankAccountView({ setActiveView }) {
  const {
  handleDownloadClick,
  isOSPopupOpen,
  setIsOSPopupOpen,
  isQRPopupOpen,
  setIsQRPopupOpen,
  selectedOS,
  setSelectedOS,
} = useAppDownload()


  return (
    <div className="flex h-full flex-col bg-white p-4">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex p-[1px] items-center gap-2 rounded-full border border-[#C0C0C04D] text-sm font-medium">
          <button
            onClick={() => setActiveView("debit-card")}
            className="rounded-full bg-black px-4 py-2 text-white"
          >
            Card
          </button>
          <button
            onClick={() => setActiveView("bank-account")}
            className="px-4 py-2 text-gray-500"
          >
            Bank account
          </button>
        </div>
        <GripVertical className="h-6 w-6 text-[#6A6A6A]" />
      </div>

      {/* Balance */}
      <div className="mt-10">
        <p className="text-[12px] text-gray-500">Bank account balance</p>
        <div className="flex items-center gap-2">
          <p className="text-[30px] font-bold">1,450</p>
          <div className="flex items-center text-[10px] text-gray-500">
            <span>USD</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="flex-grow space-y-3 overflow-y-auto mt-6 pr-2">
        {accounts.map((account) => (
          <div
            key={account.name}
            className="flex items-center justify-between rounded-lg bg-[#C0C0C01F] p-3"
          >
            <div className="flex items-center gap-3">
              <Image
                src={`https://flagcdn.com/w40/${account.code}.png`}
                alt={`${account.name} flag`}
                // --- THIS IS THE FIX ---
                width={24}
                height={24}
                // ---------------------
                className="w-6 h-6 rounded-full object-cover"
              />
              <p className="font-medium text-[14px] text-[#080808]">{account.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[14px]">{account.balance}</p>
              <p className="text-[10px] text-gray-500">{account.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
     <motion.button
        onClick={() => {
          handleButtonClick();   // analytics
          handleDownloadClick(); // open popup
        }}
        className="mt-auto mx-auto flex items-center justify-center whitespace-nowrap rounded-full bg-black px-6 py-3 text-[8px] md:text-[12px] font-medium text-white"
      >
        Get a free swiss bank account
      </motion.button>
      <AppDownloadPopups
        isOSPopupOpen={isOSPopupOpen}
        setIsOSPopupOpen={setIsOSPopupOpen}
        isQRPopupOpen={isQRPopupOpen}
        setIsQRPopupOpen={setIsQRPopupOpen}
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
      />
    </div>
  );
}