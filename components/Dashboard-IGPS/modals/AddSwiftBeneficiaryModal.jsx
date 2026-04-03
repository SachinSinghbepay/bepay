import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { PAYMENT_CONFIG, remittancePurposeOptions, transferTypeOptions as defaultTransferTypeOptions } from "../utils/paymentConfig";
import Image from "next/image";

export default function AddSwiftBeneficiaryModal({ onClose, onBack }) {
    const { igpsService } = useAuth();
    const { toast } = useToast();
    const scrollRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Beneficiary type
    const [beneficiaryType, setBeneficiaryType] = useState("individual");
    const [nickname, setNickname] = useState("");

    // Individual fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // Business fields
    const [businessName, setBusinessName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");

    const [email, setEmail] = useState("");

    const beneficiaryTypeOptions = [
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" }
    ];

    // Address
    const [country, setCountry] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [zip, setZip] = useState("");

    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);

    // Bank fields
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState("");
    const [bankId, setBankId] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [transferType, setTransferType] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [sortCode, setSortCode] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [remittancePurpose, setRemittancePurpose] = useState("");
    const [targetName, setTargetName] = useState("");
    const [targetBankAccountId, setTargetBankAccountId] = useState("");
    const [pixKeyId, setPixKeyId] = useState("");
    const [taxId, setTaxId] = useState("");

    // Banks
    const [banks, setBanks] = useState([]);
    const [bankSearch, setBankSearch] = useState("");
    const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
    const [loadingBanks, setLoadingBanks] = useState(false);

    // Transfer metadata
    const [category, setCategory] = useState("");
    const [purpose, setPurpose] = useState("");
    const [description, setDescription] = useState("");

    const transferTypeOptions = defaultTransferTypeOptions;

    const accountTypeOptions = [
        { label: "Savings", value: "savings" },
        { label: "Checking / Current account", value: "checking" }
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

    const fields = PAYMENT_CONFIG[country]?.fields || [];

    const fieldValues = {
        accountNumber,
        accountType,
        bankId,
        routingNumber,
        ifscCode,
        transferType,
        swiftCode,
        sortCode,
        bankCode,
        remittancePurpose,
        targetName,
        targetBankAccountId,
        pixKeyId,
        taxId
    };
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

        return () => {
            el.removeEventListener("wheel", onWheel);
        };
    }, []);

    useEffect(() => {
        setAccountNumber(""); setAccountType(""); setBankId(""); setRoutingNumber("");
        setIfscCode(""); setTransferType(""); setSwiftCode(""); setSortCode("");
        setBankCode(""); setRemittancePurpose(""); setTargetName(""); setTargetBankAccountId("");
        setPixKeyId(""); setTaxId(""); setBankSearch("");
    }, [country]);

    useEffect(() => {
        if (!country) return;

        const loadBanks = async () => {
            setLoadingBanks(true);

            const res = await igpsService.getBanks(country);

            if (res.success && Array.isArray(res.data)) {
                setBanks(
                    res.data.map(b => ({
                        label: b.name,
                        value: b.id
                    }))
                );
            } else {
                setBanks([]);
            }

            setLoadingBanks(false);
        };

        loadBanks();
    }, [country]);


    const filteredBanks = banks.filter(b =>
        b.label.toLowerCase().includes(bankSearch.toLowerCase())
    );

    const isFormValid = () => {
        if (
            !email.trim() ||
            !country ||
            !addressLine1 ||
            !city ||
            (states.length > 0 && !selectedState) ||
            !zip
        ) return false;

        if (beneficiaryType === "individual") {
            if (!firstName.trim() || !lastName.trim()) return false;
        } else {
            if (!businessName.trim() || !registrationNumber.trim()) return false;
        }

        for (const field of fields) {
            const value = fieldValues[field];
            if (!value || !value.toString().trim()) return false;
        }

        return true;
    };

    /* ---------------- API LOADERS ---------------- */

    useEffect(() => {
        const loadCountries = async () => {
            const res = await igpsService.getCountries();
            if (res.success) {
                setCountries(res.data.map(c => ({
                    label: c.name,
                    value: c.code
                })));
            }
        };
        loadCountries();
    }, []);

    useEffect(() => {
        if (!country) return;

        const loadStates = async () => {
            setLoadingStates(true);

            const res = await igpsService.getStates(country);

            if (res.success) {
                setStates(res.data.map(s => ({
                    label: s.name,
                    value: s.code
                })));
            }

            setLoadingStates(false);
        };

        loadStates();
    }, [country]);

    useEffect(() => {
        if (!country) return;

        const loadBanks = async () => {
            const res = await igpsService.getBanks(country);

            if (res.success && res.data?.length) {
                setBanks(res.data.map(b => ({
                    label: b.name,
                    value: b.id
                })));
            } else {
                setBanks([]);
            }
        };

        loadBanks();
    }, [country]);

    /* ---------------- PAYLOAD ---------------- */

    const handleSubmit = async () => {
        if (!isFormValid()) return;

        setLoading(true);
        setError("");

        try {

            const config = PAYMENT_CONFIG[country];

            const paymentInfo = {
                paymentType: config.paymentType
            };

            config.fields.forEach(field => {
                const value = fieldValues[field];
                if (value) paymentInfo[field] = value;
            });

            const payload = {
                type: beneficiaryType,
                ...(nickname.trim() && { referenceName: nickname.trim() }),
                ...(beneficiaryType === "individual"
                    ? { firstName: firstName.trim(), lastName: lastName.trim() }
                    : { fullName: businessName.trim(), businessRegistrationNumber: registrationNumber.trim() }
                ),
                email,

                address: {
                    street: `${addressLine1} ${addressLine2}`.trim(),
                    city,
                    ...(states.length > 0 && { state: selectedState }),
                    postalCode: zip,
                    country
                },

                paymentInfo,

                metadata: {
                    category,
                    purpose,
                    description
                }
            };

            const res = await igpsService.createBeneficiary(payload);

            if (res.success) {
                toast.success("Beneficiary added");
                onBack();
            } else {
                const msg = res.error || "Failed to create beneficiary";
                setError(msg);
                toast.error(msg);
            }

        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                <Header onClose={onClose} onBack={onBack} />

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-8 pb-8 space-y-8"
                >

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <SectionTitle title="Beneficiary information" />

                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Beneficiary type</label>
                        <CustomSelect
                            options={beneficiaryTypeOptions}
                            value={beneficiaryType}
                            onChange={setBeneficiaryType}
                            placeholder="Select type"
                        />
                    </div>

                    <Input label="Nickname (optional)" value={nickname} onChange={setNickname} />

                    {beneficiaryType === "individual" ? (
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First name" value={firstName} onChange={setFirstName} />
                            <Input label="Last name" value={lastName} onChange={setLastName} />
                        </div>
                    ) : (
                        <>
                            <Input label="Business name" value={businessName} onChange={setBusinessName} />
                            <Input label="Registration number" value={registrationNumber} onChange={setRegistrationNumber} />
                        </>
                    )}

                    <Input label="Email" value={email} onChange={setEmail} />

                    <SectionTitle title="Business address" />

                    <CustomSelect
                        options={countries}
                        value={country}
                        onChange={(val) => { setCountry(val); setSelectedState(""); }}
                        placeholder="Select country"
                        searchable
                    />

                    <Input placeholder="Address line 1" value={addressLine1} onChange={setAddressLine1} />
                    <Input placeholder="Address line 2" value={addressLine2} onChange={setAddressLine2} />

                    <Grid3>
                        <Input placeholder="City" value={city} onChange={setCity} />

                        {states.length > 0 ? (
                            <CustomSelect
                                options={states}
                                value={selectedState}
                                onChange={setSelectedState}
                                placeholder={loadingStates ? "Loading..." : "Select state"}
                                searchable
                            />
                        ) : (
                            <Input placeholder={loadingStates ? "Loading..." : "State"} value={selectedState} onChange={setSelectedState} />
                        )}

                        <Input placeholder="Postal code" value={zip} onChange={setZip} />
                    </Grid3>

                    <SectionTitle title="Bank details" />

                    {fields.includes("bankId") && (
                        <div className="space-y-2 relative">
                            <label className="text-sm text-[#6A6A6A]">Bank</label>

                            <input
                                value={bankSearch}
                                onChange={(e) => {
                                    setBankSearch(e.target.value);
                                    setBankDropdownOpen(true);
                                }}
                                onFocus={() => setBankDropdownOpen(true)}
                                placeholder="Search bank"
                                className="w-full py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
                            />

                            {bankDropdownOpen && (
                                <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg max-h-62 overflow-y-auto z-50 mt-2">

                                    {loadingBanks ? (
                                        <div className="p-3 text-sm text-gray-500">
                                            Loading banks...
                                        </div>
                                    ) : filteredBanks.length > 0 ? (
                                        filteredBanks.map(bank => (
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
                        </div>
                    )}

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

                    {fields.includes("accountNumber") && (
                        <Input label="Account number" value={accountNumber} onChange={setAccountNumber} />
                    )}

                    {fields.includes("routingNumber") && (
                        <Input label="Routing number" value={routingNumber} onChange={setRoutingNumber} />
                    )}

                    {fields.includes("ifscCode") && (
                        <Input label="IFSC code" value={ifscCode} onChange={setIfscCode} />
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

                    {fields.includes("swiftCode") && (
                        <Input label="SWIFT / BIC code" value={swiftCode} onChange={setSwiftCode} />
                    )}

                    {fields.includes("pixKeyId") && (
                        <Input label="PIX Key" value={pixKeyId} onChange={setPixKeyId} />
                    )}

                    {fields.includes("taxId") && (
                        <Input label="Tax ID" value={taxId} onChange={setTaxId} />
                    )}

                    {fields.includes("sortCode") && (
                        <Input label="Sort Code" value={sortCode} onChange={setSortCode} />
                    )}

                    {fields.includes("bankCode") && (
                        <Input label="Bank Code" value={bankCode} onChange={setBankCode} />
                    )}

                    {fields.includes("targetName") && (
                        <Input label="Target Name" placeholder="Full name as registered with the bank" value={targetName} onChange={setTargetName} />
                    )}

                    {fields.includes("targetBankAccountId") && (
                        <Input label="CLABE / Bank Account ID" placeholder="18-digit CLABE number" value={targetBankAccountId} onChange={setTargetBankAccountId} />
                    )}

                    {fields.includes("remittancePurpose") && (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-500">Remittance Purpose</label>
                            <CustomSelect
                                options={remittancePurposeOptions}
                                value={remittancePurpose}
                                onChange={setRemittancePurpose}
                                placeholder="Select remittance purpose"
                            />
                        </div>
                    )}

                    <SectionTitle title="Transfer details" />

                    <CustomSelect
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        placeholder="Category"
                    />

                    <CustomSelect
                        options={purposeOptions}
                        value={purpose}
                        onChange={setPurpose}
                        placeholder="Purpose of funds"
                    />

                    <Input
                        label="Short business description"
                        value={description}
                        onChange={setDescription}
                    />

                </div>

                <Footer
                    loading={loading}
                    disabled={!isFormValid()}
                    onSubmit={handleSubmit}
                />

            </div>
        </ModalFrame>
    );
}

/* ---------------- UI COMPONENTS ---------------- */

function Header({ onBack, onClose }) {
    return (
        <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
            <button onClick={onBack} className="absolute left-8 cursor-pointer">
                <Image src="/icons/back.svg" alt="" width={18} height={18} />
            </button>

            <h2 className="text-lg font-medium">Add SWIFT beneficiary</h2>

            <button onClick={onClose} className="absolute right-8 cursor-pointer">
                <Image src="/icons/close.png" alt="close" width={16} height={16} />
            </button>
        </div>
    );
}

function Footer({ loading, disabled, onSubmit }) {
    return (
        <div className="px-8 py-6 border-t bg-white">
            <button
                disabled={disabled || loading}
                onClick={onSubmit}
                className={`w-full h-14 rounded-2xl ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white cursor-pointer"
                    }`}
            >
                {loading ? "Adding..." : "Add SWIFT account"}
            </button>
        </div>
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
            {label && <label className="text-sm text-gray-600">{label}</label>}
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full py-4 px-4 text-sm rounded-xl border dashboard-input text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-200"
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