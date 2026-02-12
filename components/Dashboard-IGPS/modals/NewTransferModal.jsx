import ModalFrame from "./ModalFrame";

export default function NewTransferModal({ onClose, onGlobalPayout, onPayToEmail, onPayToWallet, onPayToSwift }) {
  return (
    <ModalFrame size="lg">
      {/* HEADER */}
      <div className="relative flex items-center justify-center px-8 pt-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          New transfer
        </h2>

        <button
          onClick={onClose}
          className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-8 py-10">
        <div className="grid grid-cols-2 gap-6">
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
          <div className="flex -space-x-2">
            {flags.map((src, i) => (
              <img
                key={i}
                src={src}
                className="h-8 w-8 rounded-full border border-white"
                alt=""
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">+ more</span>
          </div>
        )}

        {icon && (
          <img src={icon} className="h-8 w-8" alt="" />
        )}

        {badge && (
          <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
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
