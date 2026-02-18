"use client";

import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import CustomSelect from "@/components/Dashboard-IGPS/components/CustomSelect";

export default function StepBusinessDetails({ data, setData, onNext, onBack }) {
    const [accountType, setAccountType] = useState("business");
    const [country, setCountry] = useState("");
    const [heardFrom, setHeardFrom] = useState("");
    const [services, setServices] = useState([]);

    const toggleService = (service) => {
        setServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const isValid = accountType && country && services.length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        setData((prev) => ({
            ...prev,
            accountType,
            country,
            services,
            heardFrom
        }));

        onNext();
    };

    const countryOptions = [
        { label: "United States", value: "US" },
        { label: "United Kingdom", value: "UK" },
        { label: "India", value: "IN" },
        { label: "Germany", value: "DE" },
    ];

    const hearAboutOptions = [
        { label: "Friends or colleagues", value: "friends" },
        { label: "Social media (X, LinkedIn, Instagram, YouTube)", value: "social" },
        { label: "Search (Google/ChatGPT)", value: "search" },
        { label: "Influencer", value: "influencer" },
        { label: "Event or conference", value: "event" },
        { label: "Other", value: "other" },
    ];

    const ServiceItem = ({ title, description, value }) => {
        const active = services.includes(value);

        return (
            <div
                onClick={() => toggleService(value)}
                className={`border rounded-2xl p-5 cursor-pointer transition 
                    ${active ? "border-black bg-gray-50" : "border-gray-200"}
                `}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    </div>

                    <div
                        className={`w-6 h-6 rounded-md border flex items-center justify-center
                            ${active ? "bg-black text-white border-black" : "border-gray-300"}
                        `}
                    >
                        {active && "✓"}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-[630px] p-10 pr-0">

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8">

                <div>
                    <h2 className="text-xl font-semibold">
                        Help us understand how you’ll use bepay IGPS
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        This helps us tailor your experience to serve you better.
                    </p>
                </div>

                {/* Account Type */}
                <div>
                    <p className="text-sm mb-3">Choose your account type</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setAccountType("business")}
                            className={`border rounded-2xl p-6 cursor-pointer transition
                                ${accountType === "business"
                                    ? "border-black"
                                    : "border-gray-200"}
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
                                    : "border-gray-200"}
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
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm mb-2">
                        Select your country of residence
                    </label>

                    <CustomSelect
                        options={countryOptions}
                        value={data.country}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                country: value
                            }))
                        }
                        placeholder="Select country"
                    />
                </div>


                {/* Services */}
                <div className="space-y-4">
                    <p className="text-sm">What services are you planning to use?</p>

                    <ServiceItem
                        title="Withdraw stablecoins to bank account"
                        description="Convert stablecoins to fiat in your bank account"
                        value="withdraw"
                    />

                    <ServiceItem
                        title="Virtual account"
                        description="USD and EUR account to receive payments globally"
                        value="virtual"
                    />

                    <ServiceItem
                        title="Send payments to vendors or employees"
                        description="Make instant payouts in stablecoins or local currencies."
                        value="send"
                    />

                    <ServiceItem
                        title="Receive payments"
                        description="Get your multi-chain wallet to accept payments."
                        value="receive"
                    />
                </div>

                {/* Heard From */}
                <div>
                    <label className="block text-sm mb-2">
                        Where did you hear about us?
                    </label>

                    <CustomSelect
                        options={hearAboutOptions}
                        value={data.hearAbout}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                hearAbout: value
                            }))
                        }
                        placeholder="Select an option"
                    />
                </div>

                {/* Continue Button (INSIDE SCROLL) */}
                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`w-full h-14 rounded-full text-white font-medium transition
                            ${isValid
                                ? "bg-black hover:bg-gray-800"
                                : "bg-gray-300 cursor-not-allowed"}
                        `}
                    >
                        Continue
                    </button>

                    <div
                        onClick={onBack}
                        className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-black transition mt-6 cursor-pointer"
                    >
                        <FiChevronLeft size={16} />
                        Back
                    </div>
                </div>

            </div>
        </div>
    );
}
