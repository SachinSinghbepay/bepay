"use client";

import { Trash2, Mail, Landmark, Wallet, Plus, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { IgpsService } from "../../../services/igpsService";



export default function Beneficiary({ onOpenModal }) {
    const { igpsService } = useAuth();
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    const fetchBeneficiaries = async (force = false) => {
        setLoading(true);
        try {
            const res = await igpsService.listBeneficiaries(force);
            if (res.success) {
                setBeneficiaries(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch beneficiaries", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this beneficiary?")) return;
        try {
            const res = await igpsService.deleteBeneficiary(id);
            if (res.success) {
                fetchBeneficiaries();
            } else {
                alert(res.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const filtered = beneficiaries.filter(b => {
        if (filter === "All") return true;
        const type = b.paymentInfo?.paymentType || "unknown";
        if (filter === "Bank" && type === "bank_account") return true;
        if (filter === "Wallet" && type === "crypto_wallet") return true;
        // Email is not a distinct type in current API, usually it's part of contact info. 
        // We can check if it has email? All have email. 
        // Maybe 'Email' tab is not relevant or means 'Internal Transfer'? 
        // For now, let's just filter by paymentType.
        return false;
    });

    return (
        <div className="flex-1 px-2 sm:px-10 py-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Beneficiaries</h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchBeneficiaries(true)}
                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            title="Refresh list"
                        >
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={() => onOpenModal("add-beneficiary")}
                            className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-gray-800 transition"
                        >
                            <Plus size={16} />
                            Add beneficiary
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 text-gray-500 text-sm border-b pb-1">
                    {["All", "Bank", "Wallet"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`pb-2 ${filter === tab ? "text-black border-b-2 border-black -mb-1.5" : "hover:text-gray-800"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading beneficiaries...</div>
                ) : filtered.length === 0 ? (
                    <EmptyState onAdd={() => onOpenModal('add-beneficiary')} filter={filter} />
                ) : (
                    <div className="space-y-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 text-sm text-gray-500 pb-3 border-b">
                            <span>Name</span>
                            <span>Pay via</span>
                            <span className="text-right">Action</span>
                        </div>

                        {/* Rows */}
                        {filtered.map((item, index) => (
                            <BeneficiaryRow
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={() => handleDelete(item.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BeneficiaryRow({ item, index, onDelete }) {
    const avatarColors = [
        "bg-[#E9E0D2]", "bg-[#DDE8CF]", "bg-[#E8D4D1]", "bg-[#D1E5E8]", "bg-[#E2D8F0]",
    ];

    const name = item.fullName || (item.firstName ? `${item.firstName} ${item.lastName}` : item.email);
    const type = item.paymentInfo?.paymentType;

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[600px]">
                <div className="grid grid-cols-3 items-center bg-white rounded-2xl px-2 sm:px-6 py-5 shadow-sm hover:shadow-md transition">

                    {/* Name + Avatar */}
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium text-lg ${avatarColors[index % avatarColors.length]}`}
                        >
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-medium">{name}</div>
                            <div className="text-xs text-gray-400">{item.email}</div>
                        </div>
                    </div>

                    {/* Pay Via Pills */}
                    <div className="flex gap-3 ml-3">
                        {type === "bank_account" && <MethodPill icon={<Landmark size={16} />} label="Bank" />}
                        {type === "crypto_wallet" && <MethodPill icon={<Wallet size={16} />} label="Wallet" />}
                        {!type && <MethodPill icon={<Mail size={16} />} label="Email" />}
                    </div>

                    {/* Delete */}
                    <div className="flex justify-end">
                        <button
                            onClick={onDelete}
                            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                            title="Delete beneficiary"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
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

function EmptyState({ onAdd, filter }) {
    return (
        <div className="text-center py-24 space-y-4">
            <p className="text-gray-500 text-lg">No {filter !== "All" ? filter.toLowerCase() : ""} beneficiaries yet</p>
            <p className="text-gray-400 text-sm">
                Add employees, vendors, or freelancers to start sending payments quickly.
            </p>
            <button
                onClick={onAdd}
                className="mt-4 px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
                Add beneficiary
            </button>
        </div>
    );
}
