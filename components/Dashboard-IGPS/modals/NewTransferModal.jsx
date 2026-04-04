import ModalFrame from "./ModalFrame";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { px } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function NewTransferModal({ onClose, onGlobalPayout, onPayToEmail, onPayToWallet, onPayToSwift, onOpenModal }) {
  const { twoFactorEnabled, igpsService } = useAuth();
  const [showTwoFactorGate, setShowTwoFactorGate] = useState(false);
  const pendingAction = useRef(null);

  const guard = (action) => {
    if (!twoFactorEnabled) {
      pendingAction.current = action;
      setShowTwoFactorGate(true);
    } else {
      action();
    }
  };
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


  if (showTwoFactorGate) {
    return (
      <ModalFrame key="2fa-gate" size="md" height="h-auto">
        <div className="bg-white rounded-3xl flex flex-col" style={{ minHeight: "420px" }}>
          {/* Header */}
          <div className="relative flex items-center justify-center px-8 pt-6 pb-6">
            <button onClick={onClose} className="absolute right-8 text-gray-500 cursor-pointer">
              <Image src="/icons/close.png" alt="close" width={16} height={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 px-8 pb-6 text-center space-y-5">
            <div className="flex justify-center">
              <Image src="/icons/lock2.png" alt="2FA" width={40} height={40} className="h-12 w-auto" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg mb-2">Enable 2FA to Send Payments</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                For your security, two-factor authentication (2FA) is required to send money from your IGPS account.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="px-8 pb-8 flex gap-3 mt-auto">
            <button
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl border border-gray-300 text-gray-700 text-base font-medium cursor-pointer hover:bg-gray-50 transition-all"
            >
              I&apos;ll do later
            </button>
            <button
              onClick={async () => {
                const res = await igpsService.setupTwoFactor();
                if (res.success) {
                  onOpenModal("enable-two-factor", {
                    qrCode: res.data.qrCode,
                    secret: res.data.secret,
                    backupCodes: res.data.backupCodes,
                  });
                }
              }}
              className="flex-1 h-14 rounded-2xl bg-black text-white text-base font-medium cursor-pointer hover:bg-gray-800 transition-all"
            >
              Enable 2FA
            </button>
          </div>
        </div>
      </ModalFrame>
    );
  }

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
      <div className="px-6 sm:px-8 py-10">
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
            onClick={() => guard(onGlobalPayout)}
          />

          <TransferCard
            title="Pay USD via SWIFT"
            desc="Pay anyone globally with SWIFT payments"
            icon="/icons/swift.svg"
            onClick={() => guard(onPayToSwift)}
          />

          <TransferCard
            title="Pay to Email"
            desc="Send money using an email address. Works just like PayPal. (Money will be transferred directly to the bepay account linked to that email)."
            icon="/icons/email.svg"
            badge="Free"
            onClick={() => guard(onPayToEmail)}
          />

          <TransferCard
            title="Pay to wallet"
            desc="Send stablecoins directly to a wallet address (Onchain transfer)."
            icon="/icons/wallet.svg"
            onClick={() => guard(onPayToWallet)}
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
         cursor-pointer
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
