import { useState, useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";

export default function AddNewWalletBeneficiary({ onClose, onBack }) {
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

  const [nickname, setNickname] = useState("");

  const [wallets, setWallets] = useState([
    { address: "", network: "" }
  ]);

  const networkOptions = [
    {
      label: "Polygon",
      value: "POL",
      icon: "/icons/polygon.svg"
    },
    {
      label: "Ethereum",
      value: "ETH",
      icon: "/icons/eth.svg"
    }
  ];

  const handleAddressChange = (index, value) => {
    const updated = [...wallets];
    updated[index].address = value;
    setWallets(updated);
  };

  const handleNetworkChange = (index, value) => {
    const updated = [...wallets];
    updated[index].network = value;
    setWallets(updated);
  };

  const addWallet = () => {
    setWallets([...wallets, { address: "", network: "" }]);
  };

  const hasAtLeastOneValidWallet = wallets.some(
    (w) => w.address.trim() !== "" && w.network.trim() !== ""
  );

  const isFormValid =
    nickname.trim() !== "" && hasAtLeastOneValidWallet;

  return (
    <ModalFrame size="lg">
      <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

        {/* HEADER */}
        <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
          {/* Back */}
          <button
            className="absolute left-8 text-xl text-gray-500"
            onClick={onBack}
          >
            <img src="/icons/back.svg" alt="" />
          </button>

          <h2 className="text-lg font-semibold text-gray-900">
            Add new wallet beneficiary
          </h2>

          {/* Close */}
          <button
            className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* SCROLL BODY */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-10 pb-6 space-y-8"
        >

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
              className="w-full mt-2 rounded-xl border px-4 py-3"
            />
          </div>

          {/* Wallet Blocks */}
          {wallets.map((wallet, index) => (
            <div key={index} className="space-y-4">

              {index > 0 && (
                <div className="border-t pt-6" />
              )}

              <div>
                <label className="text-sm font-medium text-[#6A6A6A] ">
                  Wallet address {index + 1}
                </label>

                <input
                  type="text"
                  value={wallet.address}
                  onChange={(e) =>
                    handleAddressChange(index, e.target.value)
                  }
                  placeholder="Enter beneficiary wallet address"
                  className="w-full mt-2 rounded-xl border px-4 py-3"
                />

                <div className="mt-2 flex gap-2 text-sm text-orange-600">
                  <span>

                  </span>
                  <div className="text-[12px] text-orange-600 flex items-start gap-1">
                    <img src="/icons/iorange.svg" alt="" className="w-4" />
                    Please verify the wallet address and network carefully before sending funds to ensure a successful transfer. bepay IGPS will not be responsible for any errors or loss of funds.
                  </div>
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
                  onChange={(val) =>
                    handleNetworkChange(index, val)
                  }
                />
              </div>
            </div>
          ))}

          {/* Add Another */}
          <button
            type="button"
            onClick={addWallet}
            className="w-full border-2 border-dashed rounded-2xl py-6 text-center  hover:bg-gray-50 font-semibold"
          >
            + Add another wallet address
          </button>

        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t bg-white">
          <button
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl transition-all
              ${isFormValid
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Save contact
          </button>
        </div>

      </div>
    </ModalFrame >
  );
}
