"use client";

import { Copy } from "lucide-react";

export default function Invite({ onOpenModal }) {
  const referralLink = "https://bepay.igps/referrals/4F8CG7";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="flex-1 px-10 py-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">

        {/* Top Card Image + Logo */}
        <div className="w-[420px] h-[220px] bg-white rounded-3xl overflow-hidden shadow-sm flex">

          {/* Image Left */}
          <div className="w-[65%]">
            <img
              src="/icons/invite.png"
              alt="Invite"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logo Right */}
          <div className="w-1/2 flex items-center justify-center bg-gray-50">
            <img
              src="/bepayicon.png"
              alt="logo"
              className="w-14 h-14"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">
            Invite your friends
          </h1>
          <p className="text-gray-500">
            Share your referral link with friends and start earning rewards.
          </p>
        </div>

        {/* Referral Count Card */}
        <div className="w-full bg-[#F4F4F4] rounded-3xl py-10">
          <p className="text-sm text-gray-500">Your referrals</p>
          <p className="text-5xl font-medium mt-2">0</p>
        </div>

        {/* Referral Link */}
        <div className="w-full text-left space-y-2">
          <p className="text-sm text-gray-500">
            Your unique referral link
          </p>

          <div className="relative">
            <input
              value={referralLink}
              readOnly
              className="w-full h-14 rounded-2xl border px-6 pr-14 bg-white text-center"
            />

            <button
              onClick={handleCopy}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
            >
              <img src="/icons/copy.svg" alt="" />
            </button>
          </div>
        </div>

        {/* Invite Button */}
        <button
       onClick={() => onOpenModal("invite-friends")}
          className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:opacity-90 transition">
          Invite friends
        </button>

      </div>
    </div>
  );
}
