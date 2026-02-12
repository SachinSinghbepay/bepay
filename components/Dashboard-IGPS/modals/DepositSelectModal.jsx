import ModalFrame from "./ModalFrame";
import { useState, useEffect } from "react";
import { IgpsService } from "../../../services/igpsService";

const igpsService = new IgpsService();

export default function DepositSelectModal({
  onClose,
  onSelect,
  showOtherTokens = false,
  showBackButton = true,
  onBack,
  heading = "Deposit"
}) {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await igpsService.listWallets();
        if (res.success && res.data && Array.isArray(res.data.wallets)) {
          setWallets(res.data.wallets);
        }
      } catch (error) {
        console.error("Failed to fetch wallets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, []);

  return (
    <ModalFrame size="md">
      {/* HEADER */}
      <div className="relative px-10 pt-8 pb-4 mb-4 text-center">
        {showBackButton && (
          <button
            onClick={onBack}
            className="absolute left-6 text-xl text-gray-500"
          >
            <img src="/icons/back.svg" alt="" />
          </button>
        )}

        <h2 className="text-lg font-medium text-gray-900">{heading}</h2>

        <button
          onClick={onClose}
          className="absolute right-10 top-8 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-10 pb-10 space-y-8 max-h-[60vh] overflow-y-auto">
        {/* SECTION */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Select a stablecoin to deposit
          </p>

          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading wallets...</div>
          ) : (
            wallets.map((wallet, index) => (
              <DepositRow
                key={index}
                main={wallet.tokenUrl || "/icons/usdc.svg"}
                network={wallet.networkUrl || "/icons/polygon.png"}
                label={wallet.currency}
                sub={`(${wallet.chain})`} // Format chain name if needed, e.g. title case
                onSelect={() => onSelect({
                  currency: wallet.currency,
                  network: wallet.chain, // pass chain name/slug
                  currencyLogo: wallet.tokenUrl,
                  networkLogo: wallet.networkUrl,
                  address: wallet.address // Pass address!
                })}
              />
            ))
          )}

          {!loading && wallets.length === 0 && (
            <div className="text-center py-4 text-gray-400">No wallets found</div>
          )}
        </div>

        {/* SECOND SECTION */}
        {showOtherTokens && (
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">
              Deposit using another token
            </p>

            <OtherTokensRow />
          </div>
        )}
      </div>
    </ModalFrame>
  );
}

/* ---------- ROWS ---------- */

function DepositRow({ main, network, label, sub, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center gap-4">
        {/* ICON STACK */}
        <div className="relative">
          <img src={main} className="h-10 w-10 rounded-full" alt="" />
          <img
            src={network}
            className="h-5 w-5 rounded-full absolute -bottom-0 -right-0"
            alt=""
          />
        </div>

        <div className="text-gray-800">
          <span className="font-medium">{label}</span>{" "}
          <span className="text-gray-500">{sub}</span>
        </div>
      </div>

      <Chevron />
    </div>
  );
}

function OtherTokensRow() {
  return (
    <div className="flex items-center justify-between bg-[#F7F7F7] rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-100">
      <div className="flex items-center gap-4">
        {/* 4 ICONS STACK */}
        <div className="relative h-10 w-10">
          <img src="/icons/eth.svg" className="h-6 w-6 rounded-full absolute top-0 left-0" />
          <img src="/icons/solana.svg" className="h-6 w-6 rounded-full absolute top-0 right-0" />
          <img src="/icons/usdt.svg" className="h-6 w-6 rounded-full absolute bottom-0 left-0" />
          <img src="/icons/polygon.png" className="h-6 w-6 rounded-full absolute bottom-0 right-0" />
        </div>

        <div>
          <p className="font-medium text-gray-800">
            Add funds using other tokens and networks
          </p>
          <p className="text-sm text-gray-500">Powered by LI.FI</p>
        </div>
      </div>

      <Chevron />
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="h-5 w-5 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
