"use client";

import React from "react";
import Image from "next/image";

const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "banking", label: "Banking" },
    { id: "beneficiary", label: "Beneficiary" },
    { id: "team", label: "Team" },
    { id: "invite", label: "Invite" },
];

export default function Sidebar({ active, onChange }) {
    return (
        <aside className="w-[300px] bg-[#C0C0C026] p-6 flex flex-col gap-8 rounded-3xl">
            <div className="flex justify-center  items-center gap-4 my-6">
            <Image
                src={"/bepayicon.png"}
                height={40}
                width={41}
                alt="logo"
                className="object-cover h-[40px] z-50 w-[42px]"
            />
            <h2 className="font-semibold">bepay IGPS</h2>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        label={item.label}
                        active={active === item.id}
                        onClick={() => onChange(item.id)}
                    />
                ))}
            </nav>
        </aside>
    );
}

/* -------- Sidebar Item -------- */

function SidebarItem({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition
        ${active
                    ? "bg-[#2b2b2b] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
        >
            {label}
        </button>
    );
}
