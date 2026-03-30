import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useState, useEffect, useRef, useMemo } from "react";
import { IgpsService } from "../../../services/igpsService";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";




export default function AddBeneficiaryModal({ onClose, onBack, onOpenModal, onSuccess }) {
    const { igpsService } = useAuth();
    const { toast } = useToast();
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

    // payment config for each countries    
    const PAYMENT_CONFIG = {
        IN: {
            paymentType: "bank_account",
            fields: ["accountNumber", "accountType", "bankId", "ifscCode"]
        },

        US: {
            paymentType: "bank_account",
            fields: ["accountNumber", "routingNumber", "transferType"]
        },

        BR: {
            paymentType: "pix",
            fields: ["pixKeyId", "taxId"]
        }
    };

    // Selection State
    const [addBank, setAddBank] = useState(false);
    const [addWallet, setAddWallet] = useState(false);

    // Common State
    const [beneficiaryType, setBeneficiaryType] = useState("individual");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessRegistrationNumber, setbusinessRegistrationNumber] = useState("");
    const [email, setEmail] = useState("");

    // Address State
    const [country, setCountry] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [loadingStates, setLoadingStates] = useState(false);
    const [zip, setZip] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");

    const [countries, setCountries] = useState([]);

    // --- WALLET STATE ---
    const [wallets, setWallets] = useState([{ id: 1, address: "", network: "" }]);
    const networkOptions = [
        { label: "Polygon", value: "polygon", icon: "/icons/Polygon.png" },
        { label: "Ethereum", value: "ethereum", icon: "/icons/Eth.png" }
    ];

    const transferTypeOptions = [
        { label: "ACH (Standard Bank Transfer)", value: "ach" },
        { label: "RTP (Real Time Payment)", value: "rtp" },
        { label: "Wire Transfer", value: "wire" },
        { label: "SWIFT (International Wire)", value: "swift" }
    ];

    // --- BANK STATE (Simplified/Ported) ---
    // If Bank selected, we might want Business Name? 
    // For now, let's stick to the requested change which focused on Crypto beneficiary payload.
    // We will use firstName/lastName for Bank too (Individual) or BusinessName if we add it.

    // Bank Details
    const [accountNumber, setAccountNumber] = useState("");

    const [routingNumber, setRoutingNumber] = useState(""); // US
    const [transferType, setTransferType] = useState("");
    const [sortCode, setSortCode] = useState(""); // UK
    const [ifscCode, setIfscCode] = useState(""); // IN
    const [bankId, setBankId] = useState(""); // IN
    const [accountType, setAccountType] = useState("");
    const [pixKeyId, setPixKeyId] = useState(""); //BR
    const [taxId, setTaxId] = useState(""); //BR



    const fields = PAYMENT_CONFIG[country]?.fields || [];


    const [phoneNumber, setPhoneNumber] = useState("");
    const [search, setSearch] = useState("");
    const [banks, setBanks] = useState([]);
    const [loadingBanks, setLoadingBanks] = useState(false);

    const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
    const [bankSearch, setBankSearch] = useState("");

    const filteredBanks = banks.filter(b =>
        b.label.toLowerCase().includes(bankSearch.toLowerCase())
    );

    const beneficiaryTypeOptions = [
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" }
    ];

    const accountTypeOptions = [
        { label: "Savings", value: "savings" },
        { label: "Checking / Current account", value: "checking" }
    ];

    // Replace the phoneCodeOptions useMemo
    const phoneCodeOptions = useMemo(() => {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

        const countryToFlag = (countryCode) =>
            countryCode
                .toUpperCase()
                .replace(/./g, (char) =>
                    String.fromCodePoint(127397 + char.charCodeAt(0))
                );

        return getCountries().map((country) => {
            const dial = `+${getCountryCallingCode(country)}`;
            const name = regionNames.of(country);
            const flag = countryToFlag(country);
            return {
                label: `${flag} ${dial}`,      // shown in trigger button
                fullLabel: `${flag} ${dial} ${name}`, // shown in dropdown list
                value: `${country}-${dial}`,
                dialCode: dial,
                country,
                flag,
                name,
            };
        });
    }, []);

    useEffect(() => {
        setAccountNumber("");
        setRoutingNumber("");
        setSortCode("");
        setIfscCode("");
        setBankId("");
        setAccountType("");
        setPixKeyId("");
        setTaxId("");
        setBankSearch("");
    }, [country]);

    const [phoneCode, setPhoneCode] = useState(phoneCodeOptions.find(o => o.country === "US")?.value ?? phoneCodeOptions[0]?.value);
    const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);
    const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
    const phoneCodeRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (phoneCodeRef.current && !phoneCodeRef.current.contains(e.target)) {
                setPhoneCodeOpen(false);
                setPhoneCodeSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectedPhoneOption = phoneCodeOptions.find(o => o.value === phoneCode);
    const filteredPhoneCodes = phoneCodeOptions.filter(o =>
        o.name?.toLowerCase().includes(phoneCodeSearch.toLowerCase()) ||
        o.dialCode.includes(phoneCodeSearch)
    );


    // Switcher Logic
    const handleBankChange = () => {
        setAddBank(v => !v);
    };
    const handleWalletChange = () => {
        setAddWallet(v => !v);
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
        if (beneficiaryType === "individual") {
            if (!firstName.trim() || !lastName.trim()) return false;
        } else if (beneficiaryType === "business") {
            if (!businessName.trim() || !businessRegistrationNumber.trim()) return false;
        }
        if (!email.trim()) return false;
        if (!country || !addressLine1.trim() || !city.trim() || !selectedState.trim() || !zip.trim()) return false;
        return wallets.every(w => w.address.trim() && w.network);
    };

    const isBankFormValid = () => {
        if (!beneficiaryType) return false;

        if (beneficiaryType === "individual") {
            if (!firstName.trim() || !lastName.trim()) return false;
        } else if (beneficiaryType === "business") {
            if (!businessName.trim() || !businessRegistrationNumber.trim()) return false;
        }

        if (!email.trim()) return false;
        if (!country || !addressLine1.trim() || !city.trim() || !selectedState.trim() || !zip.trim()) return false;

        const fieldValues = {
            accountNumber,
            accountType,
            bankId,
            ifscCode,
            routingNumber,
            sortCode,
            pixKeyId,
            taxId,
            transferType
        };

        for (const field of fields) {
            const value = fieldValues[field];
            if (!value || !value.toString().trim()) {
                return false;
            }
        }

        return true;
    };
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const res = await igpsService.getCountries();
                if (res.success && Array.isArray(res.data)) {

                    const formatted = res.data.map(c => ({
                        label: c.name,
                        value: c.code
                    }));

                    setCountries(formatted);
                }
            } catch (err) {
                console.error("Failed to load countries", err);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        if (!country) {
            setStates([]);
            return;
        }

        const loadStates = async () => {
            setLoadingStates(true);

            const res = await igpsService.getStates(country);

            if (res.success && Array.isArray(res.data)) {
                const formatted = res.data.map((s) => ({
                    label: s.name,
                    value: s.code,
                }));

                setStates(formatted);
            } else {
                setStates([]);
            }

            setLoadingStates(false);
        };

        loadStates();
    }, [country]);

    useEffect(() => {
        if (!country || !addBank) {
            setBanks([]);
            return;
        }

        const loadBanks = async () => {
            setLoadingBanks(true);

            const res = await igpsService.getBanks(country);

            if (res.success && Array.isArray(res.data) && res.data.length > 0) {
                const formatted = res.data.map(b => ({
                    label: b.name,
                    value: b.id
                }));
                setBanks(formatted);
            } else {
                setBanks([]);
                setBankDropdownOpen(false);
            }

            setLoadingBanks(false);
        };

        loadBanks();
    }, [country, addBank]);

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);

        const fullPhone =
            phoneNumber.trim() ? `${selectedPhoneOption?.dialCode}${phoneNumber}`
                : undefined;


        const config = PAYMENT_CONFIG[country] || PAYMENT_CONFIG["IN"];
        const paymentInfo = {
            paymentType: config.paymentType
        };

        config.fields.forEach(field => {
            const value = {
                accountNumber,
                accountType,
                bankId,
                ifscCode,
                routingNumber,
                sortCode,
                pixKeyId,
                taxId,
                transferType
            }[field];

            if (value) {
                paymentInfo[field] = value;
            }
        });

        try {
            let payload = {};

            const commonAddress = {
                country: country,
                street: addressLine1,
                city: city,
                state: selectedState,
                postalCode: zip
            };

            if (addWallet) {
                if (!isWalletFormValid()) throw new Error("Please fill all required wallet fields.");
                const w = wallets[0];

                payload = {
                    type: beneficiaryType,
                    ...(beneficiaryType === "individual" && {
                        firstName: firstName,
                        lastName: lastName
                    }),
                    ...(beneficiaryType === "business" && {
                        fullName: businessName,
                        businessRegistrationNumber
                    }),
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
                    type: beneficiaryType,
                    ...(beneficiaryType === "individual" && {
                        firstName,
                        lastName
                    }),
                    ...(beneficiaryType === "business" && {
                        fullName: businessName,
                        businessRegistrationNumber
                    }),
                    email,
                    ...(fullPhone && { phone: fullPhone }),
                    address: commonAddress,
                    paymentInfo
                };
            }
            console.log("PAYLOAD:", payload);
            const res = await igpsService.createBeneficiary(payload);
            if (res.success) {
                toast.success("Beneficiary added");
                onClose();
                onSuccess?.();
            } else {
                const msg = res.error || res.message || "Failed to create beneficiary";
                setError({
                    message: msg,
                    details: Array.isArray(res.details) ? res.details : [],
                });
                toast.error(msg);
            }
        } catch (err) {
            setError({ message: err.message, details: [] });
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    const isValid =
        (addBank && isBankFormValid()) ||
        (addWallet && isWalletFormValid());

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl max-w-[99%]">

                {/* HEADER */}
                <div className="relative flex items-center justify-center md:px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500 cursor-pointer">
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={18}
                            height={18}
                        />
                    </button>
                    <h2 className="text-lg font-medium">Add beneficiary</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500 cursor-pointer">
                        <Image src="/icons/close.png" alt="close" width={16} height={16} />
                    </button>
                </div>

                {/* BODY */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto md:px-8 py-6 space-y-6 pb-40">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm space-y-1">
                            <p className="font-medium">{error.message}</p>
                            {error.details?.length > 0 && (
                                <ul className="list-disc list-inside space-y-0.5 text-xs">
                                    {error.details.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Beneficiary Type Selector */}
                    <div className="space-y-2">
                        <label className="text-sm text-[#6A6A6A]">Beneficiary type</label>
                        <CustomSelect
                            options={beneficiaryTypeOptions}
                            value={beneficiaryType}
                            onChange={setBeneficiaryType}
                            placeholder="Select beneficiary type"
                        />
                    </div>

                    {/* Common Fields - Conditional based on Beneficiary Type */}
                    {beneficiaryType === "individual" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">First Name</label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">Last Name</label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">Business Name</label>
                                <input
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Your Business Name"
                                    className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">Business Registration Number</label>
                                <input
                                    value={businessRegistrationNumber}
                                    onChange={(e) => setbusinessRegistrationNumber(e.target.value)}
                                    placeholder="Your Business Registration Number"
                                    className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                            </div>
                        </>
                    )}


                    <div className="space-y-2">
                        <label className="text-sm text-[#6A6A6A]">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                        />
                    </div>



                    {/* SELECTOR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
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
                            <div className="space-y-2">
                                <label className="text-sm text-[#6A6A6A]">Country</label>

                                <CustomSelect
                                    options={countries}
                                    value={country}
                                    onChange={(val) => { setCountry(val); setSelectedState(""); }}
                                    placeholder="Select Country"
                                    searchable
                                />
                            </div>
                            {fields.includes("bankId") && (
                                <div className="space-y-2 relative">
                                    <label className="text-sm text-[#6A6A6A]">Bank</label>

                                    {banks.length > 0 ? (
                                        <>
                                            <input
                                                value={bankSearch}
                                                onChange={(e) => {
                                                    setBankSearch(e.target.value);
                                                    setBankDropdownOpen(true);
                                                }}
                                                onFocus={() => setBankDropdownOpen(true)}
                                                placeholder="Search bank"
                                                className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                            />

                                            {bankDropdownOpen && (
                                                <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg max-h-[250px] overflow-y-auto z-50 mt-2">
                                                    {loadingBanks ? (
                                                        <div className="p-3 text-sm text-gray-500">Loading banks...</div>
                                                    ) : filteredBanks.length > 0 ? (
                                                        filteredBanks.map((bank) => (
                                                            <div
                                                                key={bank.value}
                                                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                                                                onClick={() => {
                                                                    setBankId(bank.value);
                                                                    setBankSearch(bank.label);
                                                                    setBankDropdownOpen(false);
                                                                }}
                                                            >
                                                                {bank.label}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-3 text-sm text-gray-500">
                                                            No banks found
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <input
                                            placeholder="Enter bank name"
                                            value={bankSearch}
                                            onChange={(e) => setBankSearch(e.target.value)}
                                            className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    )}
                                </div>
                            )}
                            <div className="space-y-4">


                                {/* Account Type */}
                                {fields.includes("accountType") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Account type</label>
                                        <CustomSelect
                                            options={accountTypeOptions}
                                            value={accountType}
                                            onChange={setAccountType}
                                            placeholder="Select account type"
                                        />
                                    </div>
                                )}
                                {/* Account Number */}
                                {fields.includes("accountNumber") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Account Number</label>
                                        <input
                                            placeholder="Account Number"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            className="w-full py-4 px-4 text-sm border rounded-xl dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                )}

                                {fields.includes("transferType") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Transfer type</label>
                                        <CustomSelect
                                            options={transferTypeOptions}
                                            value={transferType}
                                            onChange={setTransferType}
                                            placeholder="Select transfer type"
                                        />
                                    </div>
                                )}

                                {fields.includes("routingNumber") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Routing Number</label>
                                        <input
                                            placeholder="Routing Number"
                                            value={routingNumber}
                                            onChange={(e) => setRoutingNumber(e.target.value)}
                                            className="w-full py-4 px-4 text-sm border rounded-xl dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                )}

                                {fields.includes("ifscCode") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">IFSC Code</label>
                                        <input
                                            placeholder="IFSC Code"
                                            value={ifscCode}
                                            onChange={(e) => setIfscCode(e.target.value)}
                                            className="w-full py-4 px-4 text-sm border rounded-xl dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                )}

                                {fields.includes("pixKeyId") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">PIX Key</label>
                                        <input
                                            placeholder="PIX Key"
                                            value={pixKeyId}
                                            onChange={(e) => setPixKeyId(e.target.value)}
                                            className="w-full py-4 px-4 text-sm border rounded-xl dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                )}

                                {fields.includes("taxId") && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Tax ID</label>
                                        <input
                                            placeholder="Tax ID"
                                            value={taxId}
                                            onChange={(e) => setTaxId(e.target.value)}
                                            className="w-full py-4 px-4 text-sm border rounded-xl dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                )}


                                {/* IFSC Code (India example) */}
                                {/* <input
                                    placeholder="IFSC Code"
                                    value={ifscCode}
                                    onChange={(e) => setIfscCode(e.target.value)}
                                    className="w-full py-3 px-4 text-sm border rounded-xl"
                                /> */}

                                <div className="space-y-2">
                                    <label className="text-sm text-[#6A6A6A]">
                                        Phone number (optional)
                                    </label>
                                    <div className="flex gap-2">
                                        {/* Custom Phone Code Picker */}
                                        <div className="relative" ref={phoneCodeRef}>
                                            <button
                                                type="button"
                                                onClick={() => { setPhoneCodeOpen(v => !v); setPhoneCodeSearch(""); }}
                                                className="h-12 px-3 rounded-xl border flex items-center gap-1.5 text-sm whitespace-nowrap bg-white hover:bg-gray-50 min-w-[90px]"
                                            >
                                                <span className="text-base leading-none">{selectedPhoneOption?.flag}</span>
                                                <span className="font-medium">{selectedPhoneOption?.dialCode}</span>
                                                <svg className="w-3 h-3 text-gray-400 ml-0.5" viewBox="0 0 10 6" fill="none">
                                                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </button>

                                            {phoneCodeOpen && (
                                                <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-xl shadow-xl z-50 flex flex-col">
                                                    <div className="p-2 border-b">
                                                        <input
                                                            autoFocus
                                                            value={phoneCodeSearch}
                                                            onChange={(e) => setPhoneCodeSearch(e.target.value)}
                                                            placeholder="Search country or code..."
                                                            className="w-full h-9 rounded-lg border px-3 text-sm outline-none focus:border-black"
                                                        />
                                                    </div>
                                                    <div className="overflow-y-auto max-h-52">
                                                        {filteredPhoneCodes.length > 0 ? filteredPhoneCodes.map(opt => (
                                                            <div
                                                                key={opt.value}
                                                                onClick={() => {
                                                                    setPhoneCode(opt.value);
                                                                    setPhoneCodeOpen(false);
                                                                    setPhoneCodeSearch("");
                                                                }}
                                                                className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 text-sm ${phoneCode === opt.value ? "bg-gray-50 font-medium" : ""}`}
                                                            >
                                                                <span className="text-base w-6 text-center leading-none">{opt.flag}</span>
                                                                <span className="text-gray-500 w-12 shrink-0">{opt.dialCode}</span>
                                                                <span className="truncate text-gray-700">{opt.name}</span>
                                                            </div>
                                                        )) : (
                                                            <div className="p-3 text-sm text-gray-400 text-center">No results</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone Number Input */}
                                        <input
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Enter beneficiary phone number"
                                            className="flex-1 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Address Section */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-medium text-gray-900">Address</h3>

                                <div className="space-y-2">
                                    <label className="text-sm text-[#6A6A6A]">Street Address</label>
                                    <input
                                        value={addressLine1}
                                        onChange={(e) => setAddressLine1(e.target.value)}
                                        placeholder="123 Main St"
                                        className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                    />
                                    {/[^a-zA-Z0-9\s]/.test(addressLine1) && (
                                        <p className="text-xs text-amber-600">
                                            Special characters like {[...new Set(addressLine1.match(/[^a-zA-Z0-9\s]/g))].map(c => `"${c}"`).join(", ")} are not allowed. Use only letters, numbers, and spaces.
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#6A6A6A]">City</label>
                                        <input
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="New York"
                                            className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#6A6A6A]">State</label>

                                        {states.length > 0 ? (
                                            <CustomSelect
                                                options={states}
                                                value={selectedState}
                                                onChange={setSelectedState}
                                                placeholder={loadingStates ? "Loading..." : "Select state"}
                                                searchable
                                            />
                                        ) : (
                                            <input
                                                value={selectedState}
                                                onChange={(e) => setSelectedState(e.target.value)}
                                                placeholder="Enter state"
                                                className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-[#6A6A6A]">Postal Code</label>
                                    <input
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        placeholder="10001"
                                        className="w-full mt-2 py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 active:border-black focus:outline-none focus:ring-0 focus:border-gray-200"
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    {/* --- WALLET FORM --- */}
                    {addWallet && (
                        <div className="pt-8 space-y-6">
                            <h1 className="text-xl mb-3 font-medium">Wallet addresses</h1>
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
                    {/* FOOTER */}
                    <div className="px-8 pb-8 pt-4 space-y-4 bg-white border-t">
                        <button
                            disabled={!isValid || loading}
                            onClick={handleSubmit}
                            className={`w-full h-14 rounded-xl text-white text-base transition-colors ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            {loading ? "Adding..." : "Add beneficiary"}
                        </button>

                        <button onClick={onClose} className="w-full text-center text-base hover:text-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>


            </div>
        </ModalFrame>
    );
}

function OptionCard({ title, desc, checked, onChange }) {
    return (
        <label onClick={onChange} className={`cursor-pointer rounded-2xl p-5 border transition ${checked ? "border-black bg-white" : "bg-[#FAFAFA]"}`}>
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 shrink-0 h-6 w-6 rounded-sm flex items-center justify-center transition-colors ${checked ? "bg-[#1C1C1C]" : "bg-gray-200"}`}>
                    {checked && (
                        <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>
            </div>
        </label>
    );
}

function WalletAddressBlock({ index, data, networkOptions, canRemove, onRemove, onChange }) {
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            onChange("address", text);
        } catch {
            // clipboard access denied — do nothing
        }
    };

    return (
        <div>
            <div className="relative rounded-2xl bg-[#F9F9F9] px-4 py-7 space-y-4">

                <div className="flex items-center justify-between">
                    <p className="font-bold text-md">Wallet address {index}</p>
                    {canRemove && (
                        <button onClick={onRemove} className="text-gray-400 hover:text-gray-700 text-lg"><Image src="/icons/close.png" alt="close" width={14} height={14} /></button>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="text-sm text-[#6A6A6A]">Network</label>
                    <CustomSelect
                        options={networkOptions}
                        placeholder="Select network"
                        value={data.network}
                        onChange={(val) => onChange("network", val)}
                    />
                </div>
                <div className="relative ">
                    <label className="text-sm text-[#6A6A6A]">Wallet address</label>
                    <input
                        value={data.address}
                        onChange={(e) => onChange("address", e.target.value)}
                        className="w-full rounded-xl border px-4 py-4 pr-16 text-sm dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                        placeholder="Enter wallet address"
                    />
                    <button
                        type="button"
                        onClick={handlePaste}
                        className="absolute right-4 top-12 -translate-y-1/2 text-sm font-medium text-[#6A6A6A] hover:opacity-70 transition-opacity"
                    >
                        Paste
                    </button>
                </div>
                <div className="text-[12px] text-[#C07417] flex items-start gap-1">
                    <Image
                        src="/icons/iorange.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-5 mt-0.5"
                    />
                    Please verify the wallet address and network carefully before sending funds to ensure a successful transfer. bepay IGPS will not be responsible for any errors or loss of funds.
                </div>
            </div>
        </div>
    );
}
