"use client";

import React from "react";
import Image from "next/image";
import { Wallet } from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", iconKey: "dashboard" },
  { id: "banking", label: "Banking", iconKey: "bank" },
  { id: "beneficiary", label: "Beneficiary", iconKey: "beneficiary" },
  { id: "payment", label: "Payment", lucideIcon: Wallet },
  { id: "team", label: "Team", iconKey: "team" },
  // { id: "invite", label: "Invite", iconKey: "invite" },
];

export default function Sidebar({ active, onChange, isOpen }) {
  return (
    <aside
      className={`
    fixed lg:relative
    z-50 lg:z-auto
top-0 left-0 h-screen lg:h-auto
    w-[260px] max-w-[80vw] lg:w-[300px]
   bg-white lg:bg-[#C0C0C026]
    p-4 lg:p-6
    flex flex-col gap-8
    rounded-none lg:rounded-3xl
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
    >

      {/* Logo */}
      <div className="flex justify-center items-center gap-4 my-6">
        <Image
          src={"/bepay_business_logo.png"}
          height={150}
          width={150}
          alt="logo"
          className=" "
        />
        {/* <h2 className="font-semibold">bepay IGPS</h2> */}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            iconKey={item.iconKey}
            lucideIcon={item.lucideIcon}
            active={active === item.id}
            onClick={() => onChange(item.id)}
          />
        ))}
      </nav>

    </aside>
  );
}

/* -------- Sidebar Item -------- */

function SidebarItem({ label, iconKey, lucideIcon: LucideIcon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 lg:px-4 lg:py-6 rounded-2xl text-sm font-medium transition
        ${active
          ? "bg-[#2b2b2b] text-white"
          : "text-gray-600 hover:bg-gray-200"
        }`}
    >
      {LucideIcon ? (
        <LucideIcon className="w-5 h-5" />
      ) : (
        <span className="relative w-5 h-5 shrink-0">
          <Image
            src={`/icons/${iconKey}-black.png`}
            alt={label}
            width={20}
            height={20}
            className={`absolute inset-0 transition-opacity duration-0 ${active ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={`/icons/${iconKey}-white.png`}
            alt={label}
            width={20}
            height={20}
            className={`absolute inset-0 transition-opacity duration-0 ${active ? "opacity-100" : "opacity-0"}`}
          />
        </span>
      )}
      {label}
    </button>
  );
}
