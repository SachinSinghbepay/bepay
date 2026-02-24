"use client";

import Image from "next/image";
import { FiX, FiLink } from "react-icons/fi";
import ModalFrame from "./ModalFrame";

export default function ShareInviteModal({ onClose }) {
  return (
    <ModalFrame size="md" height="max-h-[480px]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-gray-400 hover:text-gray-600"
      >
        <FiX size={22} />
      </button>

      <div className="px-8 pt-12 pb-10 text-center">
        {/* Top Icons */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <Image
            src="/icons/sharelogo.svg"
            alt="Share"
            width={80}
            height={80}
            className="w-40"
          />
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
          Bring your friends to bepay IGPS
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-[14px] mb-8">
          Pick your preferred network and send them an invite.
        </p>

        {/* Social Buttons */}
        <div className="flex  justify-center gap-4">
          <SocialButton icon="/icons/x.svg" />
          <SocialButton icon="/icons/linkedIn.svg" />
          <SocialButton icon="/icons/telegram.svg" />
          <SocialButton icon="/icons/facebook.svg" />
          <SocialButton isLink />
        </div>
      </div>
    </ModalFrame>
  );
}

function SocialButton({ icon, isLink = false }) {
  return (
    <button className="w-12 h-12 md:w-27 md:h-27 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
      {isLink ? (
        <FiLink size={22} className="text-gray-600" />
      ) : (
        <Image
          src={icon}
          alt="social"
          width={22}
          height={22}
          className="md:w-6 w-3"
        />
      )}
    </button>
  );
}