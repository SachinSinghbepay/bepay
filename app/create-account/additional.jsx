"use client";

import { useState } from "react";

export default function KycPage() {
    const [accountType, setAccountType] = useState("business");
    const [volume, setVolume] = useState("under_10k");

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        useCase: "",
        website: "",
    });

    const handleChange = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ accountType, volume, ...form });
    };

    const handleClear = () => {
        setForm({
            fullName: "",
            email: "",
            useCase: "",
            website: "",
        });
        setAccountType("business");
        setVolume("under_10k");
    };

    return (
        <div className="min-h-screen bg-[#F6F6F6] flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-5xl rounded-[40px] p-12 shadow-sm">

                <div className="max-h-[80vh] overflow-y-auto pr-4">

                    <h1 className="text-4xl font-semibold mb-4">
                        KYC/KYB verification
                    </h1>

                    <p className="text-gray-500 mb-10">
                        To unlock full access to your account, please complete KYC/KYB verification.
                        This helps us keep your account secure and compliant.
                    </p>

                    {/* Account Type */}
                    <div className="mb-8">
                        <p className="mb-4 font-medium">Choose your account type</p>

                        <div className="flex gap-6">
                            {["business", "individual"].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => setAccountType(type)}
                                    className={`flex-1 border rounded-2xl p-6 cursor-pointer transition relative
                                        ${accountType === type
                                            ? "border-black shadow-sm"
                                            : "border-gray-200"}
                                    `}
                                >
                                    {accountType === type && (
                                        <div className="absolute top-4 right-4 w-6 h-6 bg-black text-white flex items-center justify-center rounded-md text-xs">
                                            ✓
                                        </div>
                                    )}

                                    <h3 className="text-xl font-semibold capitalize">
                                        {type === "business" ? "Business" : "Individuals"}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {type === "business"
                                            ? "For companies and registered entities"
                                            : "For freelancers and personal use"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full Name */}
                    <Input
                        label="Full name / Company name*"
                        value={form.fullName}
                        onChange={(v) => handleChange("fullName", v)}
                        placeholder="Enter your full name or company name"
                    />

                    {/* Email */}
                    <Input
                        label="Email address*"
                        value={form.email}
                        onChange={(v) => handleChange("email", v)}
                        placeholder="Enter your email"
                    />

                    {/* Use Case */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            How do you plan to use bepay IGPS*
                        </label>
                        <textarea
                            rows={4}
                            value={form.useCase}
                            onChange={(e) => handleChange("useCase", e.target.value)}
                            placeholder="Please describe your intended use cases, such as fiat deposit (onramp), withdrawals (offramp), vendor payments..."
                            className="w-full border rounded-2xl p-4 outline-none focus:border-black transition resize-none"
                        />
                    </div>

                    {/* Website */}
                    <Input
                        label="Website or profile URL*"
                        value={form.website}
                        onChange={(v) => handleChange("website", v)}
                        placeholder="Share a link to your company website or professional profile"
                    />

                    {/* Volume */}
                    <div className="mb-10">
                        <p className="mb-4 font-medium">Expected monthly volume*</p>

                        <div className="space-y-4">
                            {[
                                { label: "Under $10,000", value: "under_10k" },
                                { label: "$10,000 - $50,000", value: "10_50k" },
                                { label: "$50,000 - $250,000", value: "50_250k" },
                                { label: "250,000+", value: "250k_plus" }
                            ].map((item) => (
                                <div
                                    key={item.value}
                                    onClick={() => setVolume(item.value)}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <div className={`w-5 h-5 border rounded-md flex items-center justify-center
                                        ${volume === item.value ? "bg-black border-black" : "border-gray-300"}
                                    `}>
                                        {volume === item.value && (
                                            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                                        )}
                                    </div>
                                    <span className="text-gray-700">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        >
                            Clear form
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* Reusable Input */
function Input({ label, value, onChange, placeholder }) {
    return (
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded-2xl p-4 outline-none focus:border-black transition"
            />
        </div>
    );
}
