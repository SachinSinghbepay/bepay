import ModalFrame from "./ModalFrame";
import Image from "next/image";

export default function GetPaidModal({
  onClose,
  onShowWallet,
  onShowBank,
}) {
  return (
    <ModalFrame size="md">
      {/* HEADER */}
      <div className="relative flex items-center justify-center px-8 pt-6">
        <h2 className="text-lg font-medium">Get paid</h2>

        <button
          onClick={onClose}
          className="absolute right-8 text-xl text-gray-500 cursor-pointer"
        >
          <Image src="/icons/close.png" alt="close" width={16} height={16} />
        </button>
      </div>

      {/* BODY */}
      <div className="px-8 py-8 space-y-8">
        {/* BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-[#EEF3F8] h-26 flex items-center">
          {/* Your banner image */}
          <Image
            src="/icons/bannergetpaid.svg"
            alt="banner"
            fill
            className="object-fill opacity-80 pointer-events-none"
          />
        </div>

        {/* SECTION TITLE */}
        <p className="text-[#6A6A6A] text-xs mb-1.5">
          Select an option to receive funds
        </p>

        {/* OPTIONS */}
        <div className="space-y-4">
          <OptionRow
            icon="/icons/qr.svg"
            title="Show QR or wallet address"
            desc="Share your onchain address or QR code to receive stablecoin"
            onClick={onShowWallet}
          />

          <OptionRow
            icon="/icons/bank.svg"
            title="Bank ACH or wire transfer"
            desc="Accept USD, get paid in a stablecoin"
            onClick={onShowBank}
          />
        </div>
      </div>
    </ModalFrame>
  );
}


function OptionRow({ icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-full bg-[#F7F7F7] rounded-2xl px-2 py-1 flex items-center justify-between hover:bg-[#EFEFEF] transition"
    >
      <div className=" flex items-center gap-4 text-left">
        {/* ICON */}
        <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
          />
        </div>

        {/* TEXT */}
        <div className="p-3">
          <p className="font-medium text-base">{title}</p>
          <p className="text-[12px] text-gray-500 mt-1">{desc}</p>
        </div>
      </div>

      {/* ARROW */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

