import React from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "banking", label: "Banking" },
  { id: "beneficiary", label: "Beneficiary" },
  { id: "team", label: "Team" },
  { id: "invite", label: "Invite" },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="w-64 bg-[#f1f1f1] p-6 flex flex-col gap-8">
      
      {/* Logo placeholder */}
      <div className="h-10 w-32 bg-gray-300 rounded-md" />

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition
              ${
                active === item.id
                  ? "bg-[#2b2b2b] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
