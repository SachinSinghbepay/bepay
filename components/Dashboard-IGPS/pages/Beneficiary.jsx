"use client";

import { Trash2, Mail, Landmark, Wallet, Plus, RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Image from "next/image";
import useSWR from 'swr';


export default function Beneficiary({ onOpenModal }) {
    const { igpsService } = useAuth();
    const { toast } = useToast();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [confirmTarget, setConfirmTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const { data, isValidating, mutate } = useSWR(
        'igps-beneficiaries',
        async () => {
            const res = await igpsService.listBeneficiaries();
            return res.success ? res.data : [];
        }
    );

    const beneficiaries = data ?? [];
    const [refreshing, setRefreshing] = useState(false);
    const loading = !data && isValidating;

    const handleRefresh = async () => {
        setRefreshing(true);
        await Promise.all([
            mutate(),
            new Promise(resolve => setTimeout(resolve, 600)),
        ]);
        setRefreshing(false);
    };

    const handleDelete = async () => {
        if (!confirmTarget) return;
        setDeleting(true);
        try {
            const res = await igpsService.deleteBeneficiary(confirmTarget.id);
            if (res.success) {
                mutate();
                toast.success("Beneficiary deleted");
                setConfirmTarget(null);
            } else {
                toast.error(res.error || res.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete beneficiary");
        } finally {
            setDeleting(false);
        }
    };

    const filtered = beneficiaries.filter(b => {
        if (filter === "Bank" && (b.paymentInfo?.paymentType || "unknown") !== "bank_account") return false;
        if (filter === "Wallet" && (b.paymentInfo?.paymentType || "unknown") !== "crypto_wallet") return false;
        if (search.trim()) {
            const q = search.toLowerCase();
            const name = b.fullName || (b.firstName ? `${b.firstName} ${b.lastName}` : b.email) || "";
            if (!name.toLowerCase().includes(q) && !(b.email || "").toLowerCase().includes(q)) return false;
        }
        return true;
    });

    return (
        <>
            <div className="flex-1 px-2 sm:px-10 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Tabs */}
                        <div className="flex gap-8 text-[#6A6A6A] font-medium text-sm  pb-1">
                            {["All", "Bank", "Email", "Wallet"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`pb-2 ${filter === tab ? "text-black border-b-2 border-black -mb-1.5" : "hover:text-gray-800"}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRefresh}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                                title="Refresh list"
                            >
                                <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                            </button>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-[#C0C0C099]/60 text-sm text-gray-500 w-80">
                                <Image src='/icons/lens.png' width={20} height={20} alt="search" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search by name or email"
                                    className="bg-transparent outline-none w-48 placeholder-gray-400 text-gray-800"
                                />
                            </div>
                            <button
                                onClick={() => onOpenModal("add-beneficiary", { onSuccess: () => mutate() })}
                                className="bg-black text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition"
                            >
                                Add beneficiary
                            </button>
                        </div>
                    </div>



                    {/* CONTENT */}
                    {loading ? (
                        <div className="py-20 text-center text-gray-400">Loading beneficiaries...</div>
                    ) : filtered.length === 0 ? (
                        <EmptyState onAdd={() => onOpenModal('add-beneficiary', { onSuccess: () => mutate() })} filter={filter} />
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 text-sm text-gray-500 pb-3 border-b">
                                <span>Name</span>
                                <span>Pay via</span>
                                <span className="text-right">Action</span>
                            </div>

                            {filtered.map((item, index) => (
                                <BeneficiaryRow
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onDelete={() => setConfirmTarget(item)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {confirmTarget && (
                <DeleteConfirmModal
                    item={confirmTarget}
                    loading={deleting}
                    onConfirm={handleDelete}
                    onClose={() => setConfirmTarget(null)}
                />
            )}
        </>
    );
}

function DeleteConfirmModal({ item, loading, onConfirm, onClose }) {
    const name = item.fullName || (item.firstName ? `${item.firstName} ${item.lastName}` : item.email);
    const initial = name?.charAt(0).toUpperCase();

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl px-10 py-14 text-center w-full max-w-sm">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                >
                    <Image src="/icons/close.png" alt="close" width={16} height={16} />
                </button>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-[#E9E0D2] flex items-center justify-center text-xl font-medium text-gray-600">
                        {initial}
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-4">
                    Delete {name}?
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                    Are you sure you want to remove{" "}
                    <span className="font-medium">{item.email}</span>{" "}
                    from your beneficiaries?
                </p>

                <p className="text-red-600 text-sm mb-10">
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl border text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl bg-black text-white hover:bg-gray-900 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>

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

                    {/* Name + Avatar + Flag */}
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium text-lg relative ${avatarColors[index % avatarColors.length]}`}>
                            {name.charAt(0).toUpperCase()}
                            {item.countryFlagUrl && (
                                <img
                                    src={item.countryFlagUrl}
                                    alt={item.countryName || item.addressCountry || ""}
                                    className="w-5 h-4 rounded-sm absolute -bottom-1 -right-1 border border-white shadow-sm object-cover"
                                />
                            )}
                        </div>
                        <div>
                            <div className="font-medium">{name}</div>
                            <div className="text-xs text-gray-400">{item.email} {item.countryName ? `· ${item.countryName}` : ""}</div>
                        </div>
                    </div>

                    {/* Pay Via Pills */}
                    <div className="flex gap-3 ml-3">
                        {(type === "bank_account" || type === "pix") && <MethodPill icon={<Landmark size={16} />} label="Bank" />}
                        {type === "crypto_wallet" && <MethodPill icon={<Wallet size={16} />} label="Wallet" />}
                        {!type && <MethodPill icon={<Mail size={16} />} label="Email" />}
                    </div>

                    {/* Delete */}
                    <div className="flex justify-end">
                        <button
                            onClick={onDelete}
                            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition cursor-pointer"
                            title="Delete beneficiary"
                        >
                            <Image src="/icons/delete.png" alt="Delete" width={20} height={20} />
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
