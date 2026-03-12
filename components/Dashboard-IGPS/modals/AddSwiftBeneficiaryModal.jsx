import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useRef, useEffect, useState } from "react";
import { IgpsService } from "../../../services/igpsService";
import Image from "next/image";

const igpsService = new IgpsService();

export default function AddSwiftBeneficiaryModal({ onClose, onBack }) {
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [nickname, setNickname] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("");

    const [registrationNumber, setRegistrationNumber] = useState("");

    // Address
    const [country, setCountry] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [zip, setZip] = useState("");
    const [loadingStates, setLoadingStates] = useState(false);
    // Bank Details
    const [accountNumber, setAccountNumber] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [bankName, setBankName] = useState("");

    // Country specific
    const [ifscCode, setIfscCode] = useState("");
    const [bankId, setBankId] = useState("");
    const [routingNumber, setRoutingNumber] = useState(""); // For US
    const [sortCode, setSortCode] = useState(""); // For UK
    const [countries, setCountries] = useState([]);

    const [category, setCategory] = useState("");
    const [purpose, setPurpose] = useState("");

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

    const INDIAN_STATES = [
        { label: "Andhra Pradesh", value: "AP" },
        { label: "Arunachal Pradesh", value: "AR" },
        { label: "Assam", value: "AS" },
        { label: "Bihar", value: "BR" },
        { label: "Chhattisgarh", value: "CG" },
        { label: "Goa", value: "GA" },
        { label: "Gujarat", value: "GJ" },
        { label: "Haryana", value: "HR" },
        { label: "Himachal Pradesh", value: "HP" },
        { label: "Jharkhand", value: "JH" },
        { label: "Karnataka", value: "KA" },
        { label: "Kerala", value: "KL" },
        { label: "Madhya Pradesh", value: "MP" },
        { label: "Maharashtra", value: "MH" },
        { label: "Manipur", value: "MN" },
        { label: "Meghalaya", value: "ML" },
        { label: "Mizoram", value: "MZ" },
        { label: "Nagaland", value: "NL" },
        { label: "Odisha", value: "OR" },
        { label: "Punjab", value: "PB" },
        { label: "Rajasthan", value: "RJ" },
        { label: "Sikkim", value: "SK" },
        { label: "Tamil Nadu", value: "TN" },
        { label: "Telangana", value: "TG" },
        { label: "Tripura", value: "TR" },
        { label: "Uttar Pradesh", value: "UP" },
        { label: "Uttarakhand", value: "UT" },
        { label: "West Bengal", value: "WB" },
        { label: "Andaman and Nicobar Islands", value: "AN" },
        { label: "Chandigarh", value: "CH" },
        { label: "Dadra and Nagar Haveli", value: "DN" },
        { label: "Daman and Diu", value: "DD" },
        { label: "Delhi", value: "DL" },
        { label: "Jammu and Kashmir", value: "JK" },
        { label: "Ladakh", value: "LA" },
        { label: "Lakshadweep", value: "LD" },
        { label: "Puducherry", value: "PY" }
    ];

    const categoryOptions = [
        "Client",
        "Parent company",
        "Subsidiary",
        "Supplier"
    ];

    const purposeOptions = [
        "Invoice for goods and services",
        "Intra group transfer"
    ];

    const isFormValid = (() => {
        const basic = nickname.trim() &&
            businessName.trim() &&
            registrationNumber.trim() &&
            email.trim() &&
            country &&
            addressLine1 &&
            city &&
            selectedState &&
            zip &&
            accountNumber;

        if (!basic) return false;

        // Country specific validation
        if (country === "India") {
            return basic && ifscCode.trim() && bankId.trim();
        } else if (country === "United States") {
            return basic && routingNumber.trim();
        } else if (country === "United Kingdom") {
            return basic && sortCode.trim();
        }

        // Default to requiring SWIFT for others or as fallback
        return basic && swiftCode.trim();
    })();

    const handleSubmit = async () => {
        if (!isFormValid) return;
        setLoading(true);
        setError("");

        try {
            // Sanitize street address: STRICTLY alphanumeric and spaces only to avoid "special characters" error.
            // Replace any non-alphanumeric char with a space, then collapse multiple spaces.
            const cleanAddress = (addr) => addr.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
            const fullStreet = cleanAddress(addressLine1 + " " + (addressLine2 || ""));

            const payload = {
                type: 'business',
                fullName: businessName,
                email: email,
                businessRegistrationNumber: registrationNumber, // Added field
                address: {
                    street: fullStreet,
                    city: cleanAddress(city), // Apply to city too just in case
                    state: state, // Already set to code if India via dropdown logic
                    postalCode: zip.replace(/[^a-zA-Z0-9]/g, ''), // strict verify alphanumeric for zip too
                    country: country
                },
                paymentInfo: {
                    paymentType: 'bank_account',
                    accountNumber: accountNumber,
                    // Conditional fields based on country
                    ...(country === "India" && { ifscCode: ifscCode, bankId: bankId }),
                    ...(country === "United States" && { routingNumber: routingNumber }),
                    ...(country === "United Kingdom" && { sortCode: sortCode }),
                    swiftCode: swiftCode // Always send if populated, or maybe only if needed?
                }
            };

            // If India, we might NOT need swiftCode if we have IFSC/BankID, but keeping it if user entered it is safer unless it conflicts.
            // The user example had NO swiftCode.
            if (country === "India" && !swiftCode) delete payload.paymentInfo.swiftCode;


            const countryMap = { "United States": "US", "United Kingdom": "GB", "Germany": "DE", "India": "IN" };
            if (countryMap[country]) payload.address.country = countryMap[country];

            const response = await igpsService.createBeneficiary(payload);

            if (response.success) {
                onBack();
            } else {
                setError(response.error || "Failed to create beneficiary");
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
                        onClick={onBack}
                        className="absolute left-8 text-xl text-gray-500"
                    >
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </button>

                    <h2 className="text-lg font-medium">Add a new SWIFT beneficiary</h2>

                    <button
                        onClick={onClose}
                        className="absolute right-8 text-xl text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* SCROLL BODY */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-8 pb-8 space-y-8"
                >
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* BUSINESS INFO */}
                    <SectionTitle title="Business information" />

                    <Input
                        label="Nickname"
                        placeholder="Enter a unique beneficiary nickname for your reference"
                        value={nickname}
                        onChange={setNickname}
                    />

                    <Input
                        label="Business name"
                        placeholder="e.g. Airus corporation Ltd."
                        value={businessName}
                        onChange={setBusinessName}
                    />

                    <Input
                        label="Registration Number"
                        placeholder="e.g. U12345MH2024PTC123456"
                        value={registrationNumber}
                        onChange={setRegistrationNumber}
                    />

                    <Input
                        label="Email"
                        placeholder="e.g. contact@airus.com"
                        value={email}
                        onChange={setEmail}
                    />

                    {/* BUSINESS ADDRESS */}
                    <SectionTitle title="Business address" />

                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Business country
                        </label>
                        <CustomSelect
                            options={countries}
                            value={country}
                            onChange={setCountry}
                            placeholder="Select Country"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Business address
                        </label>

                        <div className="space-y-4">
                            <Input placeholder="Address line 1" value={addressLine1} onChange={setAddressLine1} />
                            <Input placeholder="Address line 2" value={addressLine2} onChange={setAddressLine2} />
                            <Grid3>
                                <Input placeholder="City" value={city} onChange={setCity} />

                                {/* Conditional State Input */}
                                {states.length > 0 ? (
                                    <CustomSelect
                                        options={states}
                                        value={selectedState}
                                        onChange={setSelectedState}
                                        placeholder={loadingStates ? "Loading..." : "Select state"}
                                    />
                                ) : (
                                    <input
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                        placeholder="Enter state"
                                        className="w-full mt-2 h-12 rounded-xl border px-4 outline-none focus:border-black"
                                    />
                                )}

                                <Input placeholder="Zip / Pin code" value={zip} onChange={setZip} />
                            </Grid3>
                        </div>
                    </div>

                    {/* BANK DETAILS */}
                    <SectionTitle title="Bank details" />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Account Number / IBAN"
                            placeholder="Account number or IBAN"
                            value={accountNumber}
                            onChange={setAccountNumber}
                        />

                        {country === "India" && (
                            <>
                                <Input
                                    label="IFSC Code"
                                    placeholder="e.g. SBIN0001234"
                                    value={ifscCode}
                                    onChange={setIfscCode}
                                />
                                <Input
                                    label="Bank ID"
                                    placeholder="e.g. 1300"
                                    value={bankId}
                                    onChange={setBankId}
                                />
                            </>
                        )}

                        {country === "United States" && (
                            <Input
                                label="ACH Routing Number"
                                placeholder="9 digits"
                                value={routingNumber}
                                onChange={setRoutingNumber}
                            />
                        )}

                        {country === "United Kingdom" && (
                            <Input
                                label="Sort Code"
                                placeholder="6 digits"
                                value={sortCode}
                                onChange={setSortCode}
                            />
                        )}

                        {/* Always show SWIFT unless we want to hide it for India strictly? Let's show it as optional for India if we want, or side by side. */}
                        {/* If not specific country specialized flow, or if user wants to provide SWIFT as well */}
                        <Input
                            label="BIC / SWIFT Code"
                            placeholder="e.g. DEUTGB2LXXX"
                            value={swiftCode}
                            onChange={setSwiftCode}
                        />
                    </div>

                    {/* TRANSFER DETAILS */}
                    <SectionTitle title="Transfer details" />

                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Category
                        </label>
                        <CustomSelect
                            options={categoryOptions}
                            placeholder="Select category"
                            value={category}
                            onChange={setCategory}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Purpose of funds
                        </label>
                        <CustomSelect
                            options={purposeOptions}
                            placeholder="Select purpose"
                            value={purpose}
                            onChange={setPurpose}
                        />
                    </div>

                    <Input
                        label="Short business description"
                        placeholder="e.g. software development services"
                    />

                    <p className="text-xs text-gray-500 -mt-3">
                        Brief description of the business relationship (max 200 characters)
                    </p>

                </div>

                {/* FOOTER */}
                <div className="px-8 py-6 border-t bg-white">
                    <button
                        disabled={!isFormValid || loading}
                        onClick={handleSubmit}
                        className={`w-full h-14 rounded-2xl transition-all
              ${isFormValid && !loading
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Adding..." : "Add swift account"}
                    </button>
                </div>

            </div>
        </ModalFrame>
    );
}

function SectionTitle({ title }) {
    return (
        <h3 className="text-[20px] font-medium text-gray-900 pt-2">
            {title}
        </h3>
    );
}

function Input({ label, placeholder, value, onChange }) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm text-gray-600">
                    {label}
                </label>
            )}
            <input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full h-14 rounded-xl border px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
        </div>
    );
}

function Grid3({ children }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {children}
        </div>
    );
}

function Grid2({ children }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {children}
        </div>
    );
}
