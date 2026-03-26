import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1f1f1f] ">
      {/* App container */}
      <div className="mx-auto flex   bg-[#fafafa] overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-64 bg-[#f1f1f1] p-6 flex flex-col gap-8">
          {/* Logo */}
          <div className="h-10 w-32 bg-gray-300 rounded-md" />

          {/* Menu */}
          <nav className="flex flex-col gap-2">
            <SidebarItem active label="Dashboard" />
            <SidebarItem label="Banking" />
            <SidebarItem label="Beneficiary" />
            <SidebarItem label="Team" />
            <SidebarItem label="Invite" />
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 space-y-8">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Overview
            </h2>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="h-8 w-8 rounded-full bg-gray-300" />
              <span className="text-sm font-medium text-gray-700">
                bepay money europe S.R.L
              </span>
            </div>
          </div>

          {/* BALANCE CARD */}
          <div className="grid grid-cols-3 gap-6">
            {/* Total Balance */}
            <div className="col-span-2 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total available balance
              </p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                $100.00
              </p>
            </div>

            {/* Currency Split */}
            <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4">
              <CurrencyRow label="USD" value="80.00" />
              <CurrencyRow label="INR" value="1000.00" />
              <CurrencyRow label="EUR" value="2.50" />

              <div className="border-t pt-3 space-y-2">
                <CurrencyRow label="USDC" value="2.00" />
                <CurrencyRow label="USDT (SOL)" value="4.00" />
                <CurrencyRow label="USDT (TRX)" value="1.50" />
              </div>
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-3 gap-6">
            <ActionCard title="Deposit" bg="bg-[#eaf4f8]" />
            <ActionCard title="Get paid" bg="bg-[#eef4e4]" />
            <ActionCard title="Send" bg="bg-[#f5eee6]" />
          </div>

          {/* SECONDARY ACTIONS */}
          <div className="grid grid-cols-2 gap-6">
            <SecondaryCard
              title="Pay team members"
              desc="Send payment to one or multiple recipients"
            />
            <SecondaryCard
              title="Add Beneficiaries"
              desc="Add employees, vendors, or freelancers"
            />
          </div>

          {/* TRANSACTIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-3">
              <Filter active label="All" />
              <Filter label="Deposit" />
              <Filter label="Sent" />
              <Filter label="Received" />
              <Filter label="Onramp" />
              <Filter label="Offramp" />
            </div>

            {/* Empty State */}
            <div className="text-center py-16 space-y-4">
              <p className="text-sm text-gray-500">
                No transactions yet.
              </p>
              <button className="px-6 py-2 rounded-full bg-black text-white text-sm">
                Deposit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer
      ${active ? "bg-[#2b2b2b] text-white" : "text-gray-600 hover:bg-gray-200"}`}
    >
      {label}
    </div>
  );
}

function CurrencyRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function ActionCard({ title, bg }) {
  return (
    <div
      className={`h-40 rounded-3xl p-6 flex items-end text-lg font-semibold text-gray-800 ${bg}`}
    >
      {title}
    </div>
  );
}

function SecondaryCard({ title, desc }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <div className="h-10 w-10 rounded-full bg-gray-200" />
    </div>
  );
}

function Filter({ label, active }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full text-sm
      ${active ? "bg-black text-white" : "border text-gray-600"}`}
    >
      {label}
    </button>
  );
}
