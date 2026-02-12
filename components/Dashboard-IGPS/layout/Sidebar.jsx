"use client";

import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Landmark,
  Users,
  UserPlus,
  UserCog
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "banking", label: "Banking", icon: Landmark },
  { id: "beneficiary", label: "Beneficiary", icon: Users },
  { id: "team", label: "Team", icon: UserCog },
  { id: "invite", label: "Invite", icon: UserPlus },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="w-[300px] bg-[#C0C0C026] p-6 flex flex-col gap-8 rounded-3xl">

      {/* Logo */}
      <div className="flex justify-center items-center gap-4 my-6">
        <Image
          src={"/bepayicon.png"}
          height={40}
          width={41}
          alt="logo"
          className="object-cover h-[40px] w-[42px]"
        />
        <h2 className="font-semibold">bepay IGPS</h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            Icon={item.icon}
            active={active === item.id}
            onClick={() => onChange(item.id)}
          />
        ))}
      </nav>

    </aside>
  );
}

/* -------- Sidebar Item -------- */

function SidebarItem({ label, Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-6 rounded-2xl text-sm font-medium transition
        ${
          active
            ? "bg-[#2b2b2b] text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}
