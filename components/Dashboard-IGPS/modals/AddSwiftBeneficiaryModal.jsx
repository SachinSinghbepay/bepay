import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useRef, useEffect, useState } from "react";

export default function AddSwiftBeneficiaryModal({ onClose, onBack }) {
    const scrollRef = useRef(null);
    const [country, setCountry] = useState("");
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

    const [nickname, setNickname] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("");

    const countryOptions = [
        "United States",
        "United Kingdom",
        "Germany",
        "India"
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

    const isFormValid =
        nickname.trim() &&
        businessName.trim() &&
        email.trim();

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button
                        onClick={onBack}
                        className="absolute left-8 text-xl text-gray-500"
                    >
                        <img src="/icons/back.svg" alt="" />
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
                            options={countryOptions}
                            placeholder="Select country"
                            value={country}
                            onChange={setCountry}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">
                            Business address
                        </label>

                        <div className="space-y-4">
                            <Input placeholder="Address line 1" />
                            <Input placeholder="Address line 2" />
                            <Grid3>
                                <Input placeholder="City" />
                                <Input placeholder="State" />
                                <Input placeholder="Zip / Pin code" />
                            </Grid3>
                        </div>
                    </div>

                    {/* BANK DETAILS */}
                    <Grid2>
                        <Input
                            label="Account Number / IBAN"
                            placeholder="Account number or IBAN"
                        />
                        <Input
                            label="BIC / SWIFT Code"
                            placeholder="e.g. DEUTGB2LXXX"
                        />
                    </Grid2>

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
                        disabled={!isFormValid}
                        className={`w-full h-14 rounded-2xl transition-all
              ${isFormValid
                                ? "bg-black text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Add swift account
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
