"use client";

import Image from "next/image";
import { FiX, FiLink } from "react-icons/fi";
import ModalFrame from "./ModalFrame";
import { useState } from "react";

export default function ShareInviteModal({ onClose }) {

  const inviteLink = "https://bepay.money/invite";
  const text = "Join me on bepay IGPS 🚀";
  const [copied, setCopied] = useState(false);

  const openShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ModalFrame size="md" height="max-h-[480px]">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-gray-400 hover:text-gray-600"
      >
        <FiX size={22} />
      </button>

      <div className="px-8 pt-12 pb-10 text-center">

        <div className="flex justify-center items-center gap-6 mb-6">
          <Image
            src="/icons/sharelogo.svg"
            alt="Share"
            width={80}
            height={80}
            className="w-40"
          />
        </div>

        <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
          Bring your friends to bepay IGPS
        </h2>

        <p className="text-gray-500 text-[14px] mb-8">
          Pick your preferred network and send them an invite.
        </p>

        <div className="flex justify-center gap-4">

          <SocialButton
            icon="/icons/x.svg"
            onClick={() =>
              openShare(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  text
                )}&url=${encodeURIComponent(inviteLink)}`
              )
            }
          />

          <SocialButton
            icon="/icons/linkedIn.svg"
            onClick={() =>
              openShare(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  inviteLink
                )}`
              )
            }
          />

          <SocialButton
            icon="/icons/telegram.svg"
            onClick={() =>
              openShare(
                `https://t.me/share/url?url=${encodeURIComponent(
                  inviteLink
                )}&text=${encodeURIComponent(text)}`
              )
            }
          />

          <SocialButton
            icon="/icons/facebook.svg"
            onClick={() =>
              openShare(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  inviteLink
                )}`
              )
            }
          />

          <SocialButton
            isLink
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          />

        </div>
        {copied && (
  <p className="text-green-600 text-sm mt-4 font-medium">
    ✔ Invite link copied
  </p>
)}
      </div>
    </ModalFrame>
  );
}

function SocialButton({ icon, isLink = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 md:w-27 md:h-27 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
    >
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