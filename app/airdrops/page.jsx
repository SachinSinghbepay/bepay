"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { getAirdropsByNetwork } from "@/lib/dappsData";

const AirdropListItem = ({ logo_url, name, description, website_url, tag }) => (
  <a
    href={website_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-4 w-full py-4 px-4 hover:bg-gray-50 transition-colors rounded-lg"
  >
    <Image
      src={logo_url}
      alt={`${name} logo`}
      width={56}
      height={56}
      className="rounded-xl flex-shrink-0"
    />
    <div className="flex-grow overflow-hidden">
      <p className="font-semibold text-[#080808] text-[13px] mb-1">{name}</p>
      <p className="text-[12px] text-[#6A6A6A] truncate">{description}</p>
    </div>
    <div className="flex-shrink-0">
      <ArrowUpRight size={20} className="text-gray-400" />
    </div>
  </a>
);

const AirdropPage = () => {
  const router = useRouter();
  const airdropList = getAirdropsByNetwork();

  return (
    <div className="bg-white max-w-md mx-auto p-4 font-sans min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex-grow text-center">
          Airdrops
        </h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#6A6A6A] font-medium mb-6 text-left">
        Curious about the hottest airdrops? With bepay money, you can instantly check if you qualify and explore all the latest trending drops. Stay ahead—never let an airdrop pass you by again!
      </p>

      {/* Airdrops List */}
      <div className="space-y-0">
        {airdropList.map((airdrop) => (
          <AirdropListItem key={airdrop.name} {...airdrop} />
        ))}
      </div>
    </div>
  );
};

export default AirdropPage;
