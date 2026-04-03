import { useState, useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Image from "next/image";




export default function AddNewWalletBeneficiary({ onClose, onBack }) {
  const { igpsService } = useAuth();
  const { toast } = useToast();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await igpsService.getCountries();
      if (res.success && Array.isArray(res.data)) {
        setCountries(res.data.map(c => ({ label: c.name, value: c.code })));
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!country) { setStates([]); setSelectedState(""); return; }
    setSelectedState("");
    const loadStates = async () => {
      const res = await igpsService.getStates(country);
      if (res.success && Array.isArray(res.data)) {
        setStates(res.data.map(s => ({ label: s.name, value: s.code })));
      } else {
        setStates([]);
      }
    };
    loadStates();
  }, [country]);

  const [wallet, setWallet] = useState({ address: "", chain: "" });

  const networkOptions = [
    { label: "Ethereum", value: "ethereum", icon: "/icons/eth.svg" },
    { label: "Polygon", value: "polygon", icon: "/icons/polygon.svg" },
    { label: "Solana", value: "solana", icon: "/icons/Polygon.png" },
    { label: "Tron", value: "tron" },
    { label: "Stellar", value: "stellar" },
  ];

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    country !== "" &&
    street.trim() !== "" &&
    city.trim() !== "" &&
    postalCode.trim() !== "" &&
    (states.length === 0 || selectedState !== "") &&
    wallet.address.trim() !== "" &&
    wallet.chain !== "";

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);

    try {
      const payload = {
        type: 'individual',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email,
        address: {
          country,
          street: street.trim(),
          city: city.trim(),
          postalCode: postalCode.trim(),
          ...(states.length > 0 && { state: selectedState }),
        },
        paymentInfo: {
          paymentType: 'crypto_wallet',
          walletAddress: wallet.address,
          chain: wallet.chain
        }
      };

      const res = await igpsService.createBeneficiary(payload);

      if (res.success) {
        toast.success("Wallet beneficiary added successfully");
        onClose();
      } else {
        toast.error(res.error || res.message || "Failed to create beneficiary");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
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
            <Image src="/icons/back.svg" alt="" width={18} height={18} />
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
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 pb-40 space-y-6">

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#6A6A6A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter beneficiary email"
              className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-sm font-medium text-[#6A6A6A]">Country</label>
            <CustomSelect
              options={countries}
              value={country}
              onChange={setCountry}
              placeholder="Select country"
              searchable
            />
          </div>

          {/* Street */}
          <div>
            <label className="text-sm font-medium text-[#6A6A6A]">Street Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="123 Main St"
              className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
            />
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal code"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
          </div>

          {/* State — only shown when states are available for the country */}
          {states.length > 0 && (
            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">State</label>
              <CustomSelect
                options={states}
                value={selectedState}
                onChange={setSelectedState}
                placeholder="Select state"
                searchable
              />
            </div>
          )}

          {/* Wallet Block */}
          <div className="space-y-4">
            <div className="border-t pt-4" />

            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">Wallet Address</label>
              <input
                type="text"
                value={wallet.address}
                onChange={(e) => setWallet(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter beneficiary wallet address"
                className="w-full mt-2 rounded-xl border px-4 py-4 dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
              <div className="mt-2 text-[12px] text-orange-600 flex items-start gap-1">
                <Image src="/icons/iorange.svg" alt="" width={16} height={16} className="w-4" />
                Please verify the wallet address and network carefully.
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#6A6A6A]">Network</label>
              <CustomSelect
                options={networkOptions}
                placeholder="Select wallet network"
                value={wallet.chain}
                onChange={(val) => setWallet(prev => ({ ...prev, chain: val }))}
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
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Saving..." : "Save contact"}
          </button>
        </div>

      </div>
    </ModalFrame>
  );
}
