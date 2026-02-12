"use client";

import { Trash2, Mail, Landmark, Wallet } from "lucide-react";
import { useState } from "react";

export default function Beneficiary() {
    // 🔥 Toggle this to test empty vs populated
    const [beneficiaries] = useState([
        {
            id: 1,
            name: "Chahat12",
            methods: ["email", "bank", "wallet"],
        },
        {
            id: 2,
            name: "Chahat12",
            methods: ["email", "wallet"],
        },
        {
            id: 3,
            name: "Chahat12",
            methods: ["email", "bank"],
        },
        {
            id: 4,
            name: "Chahat12",
            methods: ["email"],
        },
    ]);

    return (
        <div className="flex-1 px-10 py-8">

            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Beneficiaries</h1>

                    <button className="bg-black text-white px-6 py-3 rounded-full text-sm">
                        Add beneficiary
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 text-gray-500 text-sm">
                    <span className="text-black border-b-2 border-black pb-1">
                        All
                    </span>
                    <span>Bank</span>
                    <span>Email</span>
                    <span>Wallet</span>
                </div>

                {/* CONDITIONAL RENDER */}
                {beneficiaries.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 text-sm text-gray-500 pb-3 border-b">
                            <span>Name</span>
                            <span>Pay via</span>
                            <span className="text-right">Action</span>
                        </div>

                        {/* Rows */}
                        {beneficiaries.map((item, index) => (
                            <BeneficiaryRow
                                key={item.id}
                                name={item.name}
                                methods={item.methods}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BeneficiaryRow({ name, methods, index }) {
    const avatarColors = [
        "bg-[#E9E0D2]",
        "bg-[#DDE8CF]",
        "bg-[#E8D4D1]",
        "bg-[#D1E5E8]",
        "bg-[#E2D8F0]",
    ];

    return (
        <div className="grid grid-cols-3 items-center bg-white rounded-2xl px-6 py-5 shadow-sm">

            {/* Name + Avatar */}
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium ${avatarColors[index % avatarColors.length]}`}
                >
                    {name[0]}
                </div>

                <span className="font-medium">{name}</span>
            </div>

            {/* Pay Via Pills */}
            <div className="flex gap-3">
                {methods.includes("email") && (
                    <MethodPill icon={<Mail size={16} />} label="Email" />
                )}

                {methods.includes("bank") && (
                    <MethodPill icon={<Landmark size={16} />} label="Bank" />
                )}

                {methods.includes("wallet") && (
                    <MethodPill icon={<Wallet size={16} />} label="Wallet" />
                )}
            </div>

            {/* Delete */}
            <div className="flex justify-end">
                <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

function MethodPill({ icon, label }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-700">
            {icon}
            {label}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-24 space-y-4">
            <p className="text-gray-500 text-lg">No beneficiaries yet</p>
            <p className="text-gray-400 text-sm">
                Add employees, vendors, or freelancers to start sending payments quickly.
            </p>
            <button className="mt-4 px-8 py-3 rounded-full bg-black text-white">
                Add beneficiary
            </button>
        </div>
    );
}
