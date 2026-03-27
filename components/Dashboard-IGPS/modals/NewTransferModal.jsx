import ModalFrame from "./ModalFrame";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { px } from "framer-motion";

export default function NewTransferModal({ onClose, onGlobalPayout, onPayToEmail, onPayToWallet, onPayToSwift }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);


  return (
    <ModalFrame size="lg" height="40vh">
      {/* HEADER */}
      <div className="relative flex items-center justify-center px-2 sm:px-8 pt-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          New transfer
        </h2>

        <button
          onClick={onClose}
          className="absolute right-8 text-xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <Image src="/icons/close.png" alt="close" width={16} height={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-2 sm:px-8 py-10">
        <div
          ref={scrollRef}
          className="grid sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
          <TransferCard
            title="Global payouts"
            desc="Pay anyone globally via local payment rails"
            flags={[
              "/icons/usa.svg",
              "/icons/europe.png",
              "/icons/india.svg",
              "/icons/china.svg",
            ]}
            onClick={onGlobalPayout}
          />

          <TransferCard
            title="Pay USD via SWIFT"
            desc="Pay anyone globally with SWIFT payments"
            icon="/icons/swift.svg"
            onClick={onPayToSwift}
          />

          <TransferCard
            title="Pay to Email"
            desc="Send money using an email address. Works just like PayPal. (Money will be transferred directly to the bepay account linked to that email)."
            icon="/icons/email.svg"
            badge="Free"
            onClick={onPayToEmail}
          />

          <TransferCard
            title="Pay to wallet"
            desc="Send stablecoins directly to a wallet address (Onchain transfer)."
            icon="/icons/wallet.svg"
            onClick={onPayToWallet}
          />
        </div>
      </div>
    </ModalFrame>
  );
}

function TransferCard({ title, desc, icon, flags, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-3xl
        bg-[#F9F9F9]
        p-6
        text-left
        hover:bg-[#F3F3F3]
        transition
        h-[200px]
      "
    >
      {/* TOP */}
      <div className="flex items-center gap-3 mb-3">
        {flags && (
          <div className="flex -space-x-2 items-center">
            {flags.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={32}
                height={32}
                className="rounded-full border border-white"
              />
            ))}
            <span className="text-sm text-gray-500 ml-4"> + more</span>
          </div>
        )}

        {icon && (
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
          />
        )}

        {badge && (
          <span className="ml-auto rounded-full bg-[#0E763014]/80 px-3 py-1 text-xs text-[#0E7630] font-medium">
            {badge}
          </span>
        )}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-lg font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </button>
  );
}
