import { useState, useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";




export default function AddNewWalletBeneficiary({ onClose, onBack }) {
  const { igpsService } = useAuth();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  // We will support adding one wallet for the beneficiary for now
  const [wallet, setWallet] = useState({ address: "", network: "" });

  const networkOptions = [
    { label: "Polygon", value: "POL", icon: "/icons/polygon.svg" },
    { label: "Ethereum", value: "ETH", icon: "/icons/eth.svg" }
  ];

  const handleAddressChange = (value) => {
    setWallet(prev => ({ ...prev, address: value }));
  };

  const handleNetworkChange = (value) => {
    setWallet(prev => ({ ...prev, network: value }));
  };

  const isFormValid = nickname.trim() !== "" && email.trim() !== "" && wallet.address.trim() !== "" && wallet.network.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError("");

    try {
      const payload = {
        type: 'individual', // Defaulting to individual for wallet beneficiaries often
        fullName: nickname,
        email: email,
        paymentInfo: {
          paymentType: 'crypto_wallet',
          walletAddress: wallet.address,
          network: wallet.network
        }
      };

      const res = await igpsService.createBeneficiary(payload);

      if (res.success) {
        onClose();
        // Ideally trigger refresh on parent
        // We can assume parent auto-refreshes or user manually refreshes
      } else {
        setError(res.error || res.message || "Failed to create beneficiary");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalFrame size="lg">
      <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

        {/* HEADER */}
        <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
          <button
            className="absolute left-8 text-xl text-gray-500 cursor-pointer"
            onClick={onBack}
          >
            <Image
              src="/icons/back.svg"
              alt=""
              width={18}
              height={18}
            />
          </button>

          <h2 className="text-lg font-semibold text-gray-900">
            Add new wallet beneficiary
          </h2>

          <button
            className="absolute right-8 text-xl text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={onClose}
          >
            <Image src="/icons/close.png" alt="close" width={16} height={16} />
          </button>
        </div>

        {/* SCROLL BODY */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-10 pb-40 space-y-8"
        >
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          {/* Nickname */}
          <div>
            <label className="text-sm font-medium text-[#6A6A6A] ">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter beneficiary nickname"
              className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
            />
          </div>

          {/* Email (Added Field) */}
          <div>
            <label className="text-sm font-medium text-[#6A6A6A] ">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter beneficiary email"
              className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
            />
          </div>

          {/* Wallet Block */}
          <div className="space-y-4">
            <div className="border-t pt-6" />

            <div>
              <label className="text-sm font-medium text-[#6A6A6A] ">
                Wallet address
              </label>

              <input
                type="text"
                value={wallet.address}
                onChange={(e) => handleAddressChange(e.target.value)}
                placeholder="Enter beneficiary wallet address"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />

              <div className="mt-2 text-[12px] text-orange-600 flex items-start gap-1">
                <Image
                  src="/icons/iorange.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4"
                />

                Please verify the wallet address and network carefully.
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#6A6A6A] ">
                Network
              </label>

              <CustomSelect
                options={networkOptions}
                placeholder="Select wallet address’ network"
                value={wallet.network}
                onChange={handleNetworkChange}
              />
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t bg-white">
          <button
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-2xl transition-all
              ${isFormValid && !loading
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Saving..." : "Save contact"}
          </button>
        </div>

      </div>
    </ModalFrame >
  );
}
