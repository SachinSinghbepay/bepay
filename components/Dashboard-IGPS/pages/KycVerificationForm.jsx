"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { IgpsService } from "@/services/igpsService";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";



export default function KycVerificationForm() {
    const { igpsService } = useAuth();
    const [accountType, setAccountType] = useState("business");
    const [volume, setVolume] = useState("under_10k");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Countries and States
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);

    // Phone Code
    const [phoneCode, setPhoneCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);
    const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
    const phoneCodeRef = useRef(null);
    const phoneCodeScrollRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        identificationNumber: "",
        registrationDate: "",
        businessType: "corporation",
        useCase: "",
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: ""
        }
    });

    const [files, setFiles] = useState({
        proofOfIdentity: null,
        proofOfAddress: null
    });

    const volumeOptions = [
        { label: "Under $10,000", value: "under_10k" },
        { label: "$10,000 - $50,000", value: "10_50k" },
        { label: "$50,000 - $250,000", value: "50_250k" },
        { label: "250,000+", value: "250k_plus" }
    ];

    const businessTypeOptions = [
        { label: "Corporation", value: "corporation" },
        { label: "LLC", value: "llc" },
        { label: "Partnership", value: "partnership" },
        { label: "Sole Proprietor", value: "sole_proprietor" },
        { label: "Non-Profit", value: "non_profit" }
    ];

    // Phone Code Options with Flags
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
                label: `${flag} ${dial}`,
                fullLabel: `${flag} ${dial} ${name}`,
                value: `${country}-${dial}`,
                dialCode: dial,
                country,
                flag,
                name,
            };
        });
    }, []);

    const selectedPhoneOption = phoneCodeOptions.find(o => o.value === phoneCode);
    const filteredPhoneCodes = phoneCodeOptions.filter(o =>
        o.name?.toLowerCase().includes(phoneCodeSearch.toLowerCase()) ||
        o.dialCode.includes(phoneCodeSearch)
    );

    // Phone code dropdown close on outside click
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

    // Prevent parent scroll when scrolling phone code dropdown
    useEffect(() => {
        if (!phoneCodeOpen || !phoneCodeScrollRef.current) return;

        const scrollDiv = phoneCodeScrollRef.current;

        const handleWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
        };

        scrollDiv.addEventListener("wheel", handleWheel, { passive: false });
        return () => scrollDiv.removeEventListener("wheel", handleWheel);
    }, [phoneCodeOpen]);

    // Load countries
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

    // Load states when country changes
    useEffect(() => {
        if (!formData.address.country) {
            setStates([]);
            return;
        }

        const loadStates = async () => {
            setLoadingStates(true);
            const res = await igpsService.getStates(formData.address.country);

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
    }, [formData.address.country]);

    // Initialize phone code to US on first load
    useEffect(() => {
        if (phoneCodeOptions.length > 0 && !phoneCode) {
            const usOption = phoneCodeOptions.find(o => o.country === "US");
            setPhoneCode(usOption?.value ?? phoneCodeOptions[0]?.value);
        }
    }, [phoneCodeOptions, phoneCode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Combine phone code and number
            const fullPhone = phoneNumber.trim() ? `${selectedPhoneOption?.dialCode}${phoneNumber}` : undefined;

            const payload = {
                type: "business",
                fullName: formData.fullName,
                email: formData.email,
                ...(fullPhone && { phone: fullPhone }),
                identificationNumber: formData.identificationNumber,
                registrationDate: formData.registrationDate,
                businessType: formData.businessType,
                address: formData.address
            };

            const response = await igpsService.createSender(payload);

            if (response.success) {
                setSuccess("KYC/KYB verification submitted successfully!");
                setFormData({
                    fullName: "",
                    email: "",
                    identificationNumber: "",
                    registrationDate: "",
                    businessType: "corporation",
                    useCase: "",
                    website: "",
                    address: {
                        street: "",
                        city: "",
                        state: "",
                        country: "",
                        postalCode: ""
                    }
                });
                setPhoneNumber("");
            } else {
                setError(response.error || "Failed to submit verification. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClearForm = () => {
        setFormData({
            fullName: "",
            email: "",
            identificationNumber: "",
            registrationDate: "",
            businessType: "corporation",
            useCase: "",
            website: "",
            address: {
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: ""
            }
        });
        setPhoneNumber("");
        setFiles({
            proofOfIdentity: null,
            proofOfAddress: null
        });
        setError("");
        setSuccess("");
    };
function FileUpload({ label, onFileChange }) {
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileChange?.(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-black transition">

      <div className="flex flex-col">
        <span className="text-sm text-gray-500">
          {fileName ? "Selected file" : label}
        </span>

        {fileName && (
          <span className="text-sm font-medium text-gray-900 mt-1 truncate max-w-[250px]">
            {fileName}
          </span>
        )}
      </div>

      <label className="cursor-pointer">
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
        />
        <span className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
          {fileName ? "Replace" : "Upload"}
        </span>
      </label>

    </div>
  );
}

    return (
        <div className="bg-white rounded-[32px] p-10 shadow-sm max-w-full m-5 space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                    KYC/KYB verification
                </h1>
                <p className="text-gray-500 mt-3 text-sm max-w-lg">
                    To unlock full access to your account, please complete KYC/KYB
                    verification. This helps us keep your account secure and compliant.
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-50 text-green-600 text-sm rounded-lg border border-green-200">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-[80%] space-y-6">
                {/* ACCOUNT TYPE */}
                {/* <div>
                    <p className="text-sm mb-3">Choose your account type</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setAccountType("business")}
                            className={`border rounded-2xl p-6 cursor-pointer transition
              ${accountType === "business"
                                    ? "border-black"
                                    : "border-gray-200"
                                }
            `}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold">Business</p>
                                    <p className="text-sm text-gray-500">
                                        For companies and registered entities
                                    </p>
                                </div>
                                {accountType === "business" && (
                                    <div className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center">
                                        ✓
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            onClick={() => setAccountType("individual")}
                            className={`border rounded-2xl p-6 cursor-pointer transition
              ${accountType === "individual"
                                    ? "border-black"
                                    : "border-gray-200"
                                }
            `}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold">Individuals</p>
                                    <p className="text-sm text-gray-500">
                                        For freelancers and personal use
                                    </p>
                                </div>
                                {accountType === "individual" && (
                                    <div className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center">
                                        ✓
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* FULL NAME / COMPANY */}
                <div>
                    <label className="block text-sm mb-2">
                        Full name / Company name*
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name or company name"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="block text-sm mb-2">
                        Email address*
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* PHONE */}
                <div>
                    <label className="block text-sm mb-2">
                        Phone number*
                    </label>
                    <div className="flex gap-2">
                        {/* Phone Code Picker */}
                        <div className="relative" ref={phoneCodeRef}>
                            <button
                                type="button"
                                onClick={() => { setPhoneCodeOpen(v => !v); setPhoneCodeSearch(""); }}
                                className="h-14 px-3 rounded-xl border border-gray-200 flex items-center gap-1.5 text-sm whitespace-nowrap bg-white hover:bg-gray-50 min-w-[90px]"
                            >
                                <span className="text-base leading-none">{selectedPhoneOption?.flag}</span>
                                <span className="font-medium">{selectedPhoneOption?.dialCode}</span>
                                <svg className="w-3 h-3 text-gray-400 ml-0.5" viewBox="0 0 10 6" fill="none">
                                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>

                            {phoneCodeOpen && (
                                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 flex flex-col">
                                    <div className="p-2 border-b">
                                        <input
                                            autoFocus
                                            value={phoneCodeSearch}
                                            onChange={(e) => setPhoneCodeSearch(e.target.value)}
                                            placeholder="Search country or code..."
                                            className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
                                        />
                                    </div>
                                    <div className="overflow-y-auto max-h-52" ref={phoneCodeScrollRef}>
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
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            required
                            className="flex-1 h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition text-sm"
                        />
                    </div>
                </div>

                {/* IDENTIFICATION NUMBER */}
                <div>
                    <label className="block text-sm mb-2">
                        Business Registration / Identification Number*
                    </label>
                    <input
                        type="text"
                        name="identificationNumber"
                        value={formData.identificationNumber}
                        onChange={handleInputChange}
                        placeholder="Enter registration number or tax ID"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* REGISTRATION DATE */}
                <div>
                    <label className="block text-sm mb-2">
                        Registration Date*
                    </label>
                    <input
                        type="date"
                        name="registrationDate"
                        value={formData.registrationDate}
                        onChange={handleInputChange}
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* BUSINESS TYPE */}
                <div>
                    <label className="block text-sm mb-2">
                        Business Type*
                    </label>
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                        {businessTypeOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ADDRESS - STREET */}
                <div>
                    <label className="block text-sm mb-2">
                        Street Address*
                    </label>
                    <input
                        type="text"
                        name="street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        placeholder="Enter street address"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* ADDRESS - CITY */}
                <div>
                    <label className="block text-sm mb-2">
                        City*
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        placeholder="Enter city"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* ADDRESS - STATE */}
                <div>
                    <label className="block text-sm mb-2">
                        State/Province*
                    </label>
                    {states.length > 0 ? (
                        <select
                            name="state"
                            value={formData.address.state}
                            onChange={handleAddressChange}
                            disabled={loadingStates}
                            required
                            className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                        >
                            <option value="">{loadingStates ? "Loading..." : "Select state"}</option>
                            {states.map(s => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            name="state"
                            value={formData.address.state}
                            onChange={handleAddressChange}
                            placeholder="Enter state or province"
                            required
                            className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                        />
                    )}
                </div>

                {/* ADDRESS - COUNTRY */}
                <div>
                    <label className="block text-sm mb-2">
                        Country*
                    </label>
                    <select
                        name="country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                        <option value="">Select country</option>
                        {countries.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ADDRESS - POSTAL CODE */}
                <div>
                    <label className="block text-sm mb-2">
                        Postal Code*
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.address.postalCode}
                        onChange={handleAddressChange}
                        placeholder="Enter postal code"
                        required
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* USE CASE */}
                <div>
                    <label className="block text-sm mb-2">
                        How do you plan to use bepay IGPS*
                    </label>
                    <textarea
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleInputChange}
                        placeholder="Please describe your intended use cases, such as fiat deposit (onramp), withdrawals (offramp), vendor payments in USD/EUR or onchain payments."
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-black transition resize-none"
                    />
                </div>

                {/* WEBSITE */}
                <div>
                    <label className="block text-sm mb-2">
                        Website or profile URL*
                    </label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="Share a link to your company website or professional profile"
                        className="w-full h-14 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                </div>

                {/* PROOF OF IDENTITY */}
                <div>
                    <label className="block text-sm mb-2">
                        Proof of identity*
                    </label>

                    <FileUpload
                        label="Upload passport, national ID or driver’s license"                        onFileChange={(file) => setFiles(prev => ({ ...prev, proofOfIdentity: file }))}                    />
                </div>

                {/* PROOF OF ADDRESS */}
                <div>
                    <label className="block text-sm mb-2">
                        Proof of address*
                    </label>

                    <FileUpload
                        label="Upload utility bill or bank statement (last 3 months)"
                        onFileChange={(file) => setFiles(prev => ({ ...prev, proofOfAddress: file }))}
                    />
                </div>
                {/* VOLUME */}
                <div>
                    <label className="block text-sm mb-4">
                        Expected monthly volume*
                    </label>

                    <div className="space-y-3">
                        {volumeOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => setVolume(opt.value)}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <div
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center
                  ${volume === opt.value
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300"
                                        }
                `}
                                >
                                    {volume === opt.value && "✓"}
                                </div>
                                <span className="text-sm">{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={handleClearForm}
                        className="px-6 h-12 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        Clear form
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-8 h-12 rounded-full text-white text-sm font-medium transition ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
                        }`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}