"use client";

import { Trash2, Mail, Landmark, Wallet } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Team({ onOpenModal }) {
    // 🔥 Toggle this to test empty vs populated
    const members = [
        {
            id: 1,
            name: "bepay money europe SRL",
            email: "info@bepay.money",
            role: "Owner",
            status: "Active"
        },
        {
            id: 2,
            name: "Chahat soni",
            email: "Chahatsoni9@gmail.com",
            role: "Employee",
            status: "Invited"
        },
        {
            id: 3,
            name: "Chahat soni",
            email: "Chahatsoni9@gmail.com",
            role: "Bookkeeper",
            status: "Invited"
        },
        {
            id: 4,
            name: "Chahat soni",
            email: "Chahatsoni9@gmail.com",
            role: "Admin",
            status: "Invited"
        },
        {
            id: 5,
            name: "Chahat soni",
            email: "Chahatsoni9@gmail.com",
            role: "Manager",
            status: "Invited"
        },

    ];

    return (
        <div className="flex-1 px-8 py-8 pb-22">

            <div className=" mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Manage Teams</h1>
                    <div>
                        <button
                            className=" text-[#080808] px-6 py-3 rounded-full text-sm"
                            onClick={() => onOpenModal("learn-about-roles")}>
                            Learn more about roles
                            <span className="ml-2 text-blue-500">→</span>

                        </button>
                        {members.length > 0 && (
                            <button
                                onClick={() => onOpenModal("add-new-member")}
                                className="mt-4 px-8 py-3 rounded-full bg-black text-white">
                                Add team member
                            </button>
                        )}
                    </div>
                </div>

                {/* CONDITIONAL RENDER */}
                {members.length === 0 ? (
                    <EmptyState onOpenModal={onOpenModal} />
                ) : (
                    <div className="w-full pb-22">

                        {/* HEADER */}
                        <div className="grid grid-cols-[2.5fr_1fr_1fr_0.5fr] px-6 py-4 text-sm text-gray-500 border-b">
                            <span>Member</span>
                            <span>Role</span>
                            <span>Status</span>
                            <span className="text-right">Action</span>
                        </div>

                        {/* ROWS */}
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="grid grid-cols-[2.5fr_1fr_1fr_0.5fr] items-center px-6 py-5 border-b hover:bg-gray-50 transition"
                            >
                                {/* MEMBER */}
                                <div className="flex items-center gap-4">
                                    <Avatar name={member.name} />
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                </div>

                                {/* ROLE */}
                                <RolePill role={member.role} />

                                {/* STATUS */}
                                <StatusPill status={member.status} />

                                {/* ACTION */}
                                <div className="flex justify-end">
                                    <ActionMenu
                                        onResend={() =>
                                            onOpenModal("invite-success", {
                                                name: member.name,
                                                email: member.email,
                                                role: member.role.toLowerCase(),
                                            })
                                        }
                                        onEdit={() =>
                                            onOpenModal("edit-member", member)
                                        }
                                        onRemove={() =>
                                            onOpenModal("remove-member", member)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


function EmptyState({ onOpenModal }) {
    return (
        <div className="text-center py-24 space-y-4">
            <p className="text-gray-500 text-lg">No team members yet</p>
            <p className="text-gray-400 text-sm">
                Invite your team to collaborate on your IGPS account. Assign roles and control access permissions securely.
            </p>
            <button
                onClick={() => onOpenModal("add-new-member")}
                className="mt-4 px-8 py-3 rounded-full bg-black text-white">
                Add team member
            </button>
        </div>
    );
}

function Avatar({ name }) {
    const initial = name?.charAt(0).toUpperCase();

    return (
        <div className="h-12 w-12 rounded-2xl bg-[#E9E1CF] flex items-center justify-center text-gray-600 font-medium">
            {initial}
        </div>
    );
}

function RolePill({ role }) {
    return (
        <span className="px-4 py-2 rounded-full bg-[#F1F1F1] text-sm font-medium w-fit">
            {role}
        </span>
    );
}

function StatusPill({ status }) {
    const isActive = status === "Active";

    return (
        <span
            className={`px-4 py-2 rounded-full text-sm font-medium w-fit
                ${isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }
            `}
        >
            {status}
        </span>
    );
}


function ActionMenu({ onResend, onEdit, onRemove }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">

            {/* 3 DOT BUTTON */}
            <button
                onClick={() => setOpen(v => !v)}
                className="h-10 w-10 rounded-2xl bg-[#F3F3F3] flex items-center justify-center hover:bg-gray-200 transition"
            >
                <span className="text-lg tracking-widest">•••</span>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-xl p-3 z-50">

                    <MenuItem
                        label="Resend invite"
                        highlighted
                        onClick={() => {
                            onResend?.();
                            setOpen(false);
                        }}
                    />

                    <MenuItem
                        label="Edit"
                        onClick={() => {
                            onEdit?.();
                            setOpen(false);
                        }}
                    />

                    <MenuItem
                        label="Remove member"
                        danger
                        onClick={() => {
                            onRemove?.();
                            setOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

function MenuItem({ label, onClick, highlighted, danger }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full text-left px-5 py-4 rounded-2xl transition text-sm font-medium
                ${highlighted ? "bg-[#F4F4F4]" : ""}
                ${danger ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}
            `}
        >
            {label}
        </button>
    );
}