import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useState, useEffect, useRef } from "react";
import { IgpsService } from "../../../services/igpsService";

const igpsService = new IgpsService();

export default function AddBeneficiaryModal({ onClose, onBack, onOpenModal }) {
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


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Selection State
    const [addBank, setAddBank] = useState(false);
    const [addWallet, setAddWallet] = useState(false);

    // Common State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // Address State
    const [country, setCountry] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const countryOptions = ["United States", "United Kingdom", "Germany", "India"];

    // --- WALLET STATE ---
    const [wallets, setWallets] = useState([{ id: 1, address: "", network: "" }]);
    const networkOptions = [
        { label: "Polygon", value: "polygon", icon: "/icons/polygon.svg" },
        { label: "Ethereum", value: "ethereum", icon: "/icons/eth.svg" }
    ];

    // --- BANK STATE (Simplified/Ported) ---
    // If Bank selected, we might want Business Name? 
    // For now, let's stick to the requested change which focused on Crypto beneficiary payload.
    // We will use firstName/lastName for Bank too (Individual) or BusinessName if we add it.

    // Bank Details
    const [accountNumber, setAccountNumber] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [routingNumber, setRoutingNumber] = useState(""); // US
    const [sortCode, setSortCode] = useState(""); // UK
    const [ifscCode, setIfscCode] = useState(""); // IN
    const [bankId, setBankId] = useState(""); // IN

    // Switcher Logic
    const handleBankChange = () => {
        setAddBank(v => !v);
        if (!addBank) setAddWallet(false);
    };
    const handleWalletChange = () => {
        setAddWallet(v => !v);
        if (!addWallet) setAddBank(false);
    };

    // --- HANDLERS ---

    const handleWalletUpdate = (id, field, value) => {
        setWallets(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w));
    };

    const removeWallet = (id) => {
        setWallets(prev => prev.length > 1 ? prev.filter(w => w.id !== id) : prev);
    };

    const isWalletFormValid = () => {
        // Validate fields
        if (!firstName.trim() || !lastName.trim() || !email.trim()) return false;
        if (!country || !addressLine1.trim() || !city.trim() || !state.trim() || !zip.trim()) return false;
        return wallets.every(w => w.address.trim() && w.network);
    };

    const isBankFormValid = () => {
        if (!firstName.trim() || !country || !accountNumber) return false;
        return true;
    };

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            let payload = {};
            const countryMap = { "United States": "US", "United Kingdom": "GB", "Germany": "DE", "India": "IN" };
            const countryCode = countryMap[country] || country;

            const commonAddress = {
                country: countryCode,
                street: addressLine1,
                city: city,
                state: state,
                postalCode: zip
            };

            if (addWallet) {
                if (!isWalletFormValid()) throw new Error("Please fill all required wallet fields.");
                const w = wallets[0];

                payload = {
                    type: 'individual',
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: commonAddress,
                    paymentInfo: {
                        paymentType: 'crypto_wallet',
                        walletAddress: w.address,
                        network: w.network
                    }
                };
            } else if (addBank) {
                if (!isBankFormValid()) throw new Error("Please fill all required bank fields.");

                payload = {
                    type: 'individual', // Defaulting to individual for consistency with common fields
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: commonAddress,
                    paymentInfo: {
                        paymentType: 'bank_account',
                        accountNumber: accountNumber,
                        swiftCode: swiftCode,
                        ...(country === "United States" && { routingNumber }),
                        ...(country === "United Kingdom" && { sortCode }),
                        ...(country === "India" && { ifscCode, bankId }),
                    }
                };
            }

            const res = await igpsService.createBeneficiary(payload);
            if (res.success) {
                onClose();
            } else {
                setError(res.error || res.message || "Failed to create beneficiary");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500">
                        <img src="/icons/back.svg" alt="" />
                    </button>
                    <h2 className="text-lg font-medium">Add beneficiary</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500">
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6 pb-40">
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                    {/* Common Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-[#6A6A6A]">First Name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                                className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-[#6A6A6A]">Last Name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-[#6A6A6A]">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                        />
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-medium text-gray-900">Address</h3>

                        <div className="space-y-2">
                            <label className="text-sm text-[#6A6A6A]">Country</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black bg-white"
                            >
                                <option value="">Select Country</option>
                                {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-[#6A6A6A]">Street Address</label>
                            <input
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                placeholder="123 Main St"
                                className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">City</label>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="New York"
                                    className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">State</label>
                                <input
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="NY"
                                    className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-[#6A6A6A]">Postal Code</label>
                            <input
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="10001"
                                className="w-full mt-2 h-12 rounded-xl border px-4 outline-none active:border-black focus:border-black"
                            />
                        </div>
                    </div>

                    {/* SELECTOR */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <OptionCard
                            title="Add bank account"
                            desc="Add bank account details to send payments directly to a bank."
                            checked={addBank}
                            onChange={handleBankChange}
                        />
                        <OptionCard
                            title="Add wallet address"
                            desc="Add cryptocurrency wallet addresses for direct Stablecoin payments via blockchain."
                            checked={addWallet}
                            onChange={handleWalletChange}
                        />
                    </div>

                    {/* --- BANK FORM --- */}
                    {addBank && (
                        <div className="pt-8 space-y-6">
                            <div className="p-4 bg-gray-50 border rounded-xl text-sm text-gray-600">
                                Bank Account Fields
                            </div>
                            {/* Render Simplified Bank Fields */}
                            <div className="space-y-4">
                                <input placeholder="Account Number / IBAN" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full h-12 border rounded-xl px-4" />
                                <input placeholder="SWIFT / BIC" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} className="w-full h-12 border rounded-xl px-4" />
                                {country === "United States" &&
                                    <input placeholder="Routing Number" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} className="w-full h-12 border rounded-xl px-4" />
                                }
                            </div>
                        </div>
                    )}

                    {/* --- WALLET FORM --- */}
                    {addWallet && (
                        <div className="pt-8 space-y-6">
                            {wallets.map((w, i) => (
                                <WalletAddressBlock
                                    key={w.id}
                                    index={i + 1}
                                    data={w}
                                    networkOptions={networkOptions}
                                    canRemove={wallets.length > 1}
                                    onRemove={() => removeWallet(w.id)}
                                    onChange={(field, val) => handleWalletUpdate(w.id, field, val)}
                                />
                            ))}
                            {/* Hide add button since we only support 1 for API right now to be safe, or allow UI but API takes first */}
                            <button
                                onClick={() => setWallets(prev => [...prev, { id: Date.now(), address: "", network: "" }])}
                                className="w-full rounded-xl border border-dashed py-3 text-sm hover:bg-gray-50 transition"
                            >
                                + Add another wallet address
                            </button>
                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="px-8 pb-8 pt-4 space-y-4 bg-white border-t">
                    <button
                        disabled={(!addBank && !addWallet) || loading}
                        onClick={handleSubmit}
                        className={`w-full h-14 rounded-full text-white text-base transition-colors ${(addBank || addWallet) ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Adding..." : "Add beneficiary"}
                    </button>

                    <button onClick={onClose} className="w-full text-center text-base hover:text-gray-700">
                        Cancel
                    </button>
                </div>
            </div>
        </ModalFrame>
    );
}

function OptionCard({ title, desc, checked, onChange }) {
    return (
        <label className={`cursor-pointer rounded-2xl p-5 border transition ${checked ? "border-black bg-white" : "bg-[#FAFAFA]"}`}>
            <div className="flex items-start gap-3">
                <input type="checkbox" checked={checked} onChange={onChange} className="mt-1 h-4 w-4 accent-black" />
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>
            </div>
        </label>
    );
}

function WalletAddressBlock({ index, data, networkOptions, canRemove, onRemove, onChange }) {
    return (
        <div className="relative rounded-2xl bg-[#FAFAFA] px-4 py-7 space-y-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Wallet address {index}</p>
                {canRemove && (
                    <button onClick={onRemove} className="text-gray-400 hover:text-gray-700 text-lg">✕</button>
                )}
            </div>

            <CustomSelect
                options={networkOptions}
                placeholder="Select network"
                value={data.network}
                onChange={(val) => onChange("network", val)}
            />

            <div className="relative">
                <input
                    value={data.address}
                    onChange={(e) => onChange("address", e.target.value)}
                    className="w-full rounded-xl border px-3 py-5 pr-16 text-sm outline-none focus:border-black"
                    placeholder="Enter wallet address"
                />
            </div>
            <div className="text-[12px] text-orange-600 flex items-start gap-1">
                <img src="/icons/i.svg" alt="" className="w-4" />
                Please verify the wallet address and network carefully.
            </div>
        </div>
    );
}
