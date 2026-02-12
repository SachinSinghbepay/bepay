"use client";
import React from 'react'
import { useState } from "react";
import { Copy } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
export default function Banking() {
  const [tab, setTab] = useState("usd");

  const accountDetails = [
    {
      label: "Beneficiary name",
      value: "bepay money europe S.R.L"
    },
    {
      label: "Account number",
      value: "211493669471"
    },
    {
      label: "ABA Routing number",
      value: "101019644"
    },
    {
      label: "Bank name",
      value: "Lead Bank"
    },
    {
      label: "Bank address",
      value: "1801 Main St., Kansas City, MO, US, 64108"
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 px-10 py-8">
      <div className="mx-auto w-full max-w-[772px]">
        {/* Tabs */}
        <div className="flex gap-8 mb-6 text-base">
          <button
            onClick={() => setTab("usd")}
            className={`pb-2 border-b-2 transition ${tab === "usd"
              ? "border-black font-medium"
              : "border-transparent text-gray-500"
              }`}
          >
            USD Account
          </button>

          <button
            onClick={() => setTab("eur")}
            className={`pb-2 border-b-2 transition ${tab === "eur"
              ? "border-black font-medium"
              : "border-transparent text-gray-500"
              }`}
          >
            EUR Account
          </button>
        </div>

        {/* Account Card */}
        <div className="bg-[#FDFDFD] rounded-3xl p-8 max-w-[820px]">

          {/* Top Info Box */}
          <div className="bg-[#F6F6F6] rounded-2xl px-6 py-8 flex justify-between items-center mb-8">
            <div>
              <h3 className="font-semibold text-lg">
                Your USD account details
              </h3>
              <p className="text-sm text-orange-600 mt-1">
                Note: We only accept ACH payments
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#F2E6DA] text-sm px-4 py-2 rounded-full font-semibold">
                Minimum transfer $2
              </div>

              <div className="bg-[#E6ECF8] text-sm px-4 py-2 rounded-full cursor-pointer font-semibold">
                Fees and limits →
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-6">
            {accountDetails.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-4 px-2"
              >
                <div>
                  <p className="font-medium text-[14px] text-gray-500">
                    {item.label}
                  </p>
                  <p className="font-semibold  text-[#6A6A6A] text-[20px]">
                    {item.value}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(item.value)}
                  className="bg-white p-4 rounded-xl  hover:bg-gray-100 transition"
                >
                  <img
                    src="/icons/copy.svg"
                    alt="Copy"
                    className="h-10 w-10"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 h-14 rounded-2xl border border-[#C0C0C0] text-sm font-medium hover:bg-gray-100 transition">
              Download PDF
            </button>

            <button
              onClick={() =>
                handleCopy(
                  accountDetails.map(d => `${d.label}: ${d.value}`).join("\n")
                )
              }
              className="flex-1 h-14 rounded-2xl border border-[#C0C0C0] text-sm font-medium hover:bg-gray-100 transition"
            >
              Copy all details
            </button>
          </div>

        </div>

      </div>
      {/* TRANSACTIONS */}
      <div className="rounded-3xl p-6 space-y-6">

        {/* Header Row */}
        <div className="flex items-center justify-between">

          {/* Left side */}
          <div className="flex items-center gap-3">
            <p className="font-semibold text-[#333333]">
              Recent transactions
            </p>

            <Filter active label="All" />
            <Filter label="Deposit" />
            <Filter label="Sent" />
            <Filter label="Received" />
            <Filter label="Onramp" />
            <Filter label="Offramp" />
          </div>

          {/* Right side filter icon */}
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            <img src="/icons/filter.svg" alt="filter" className='h-5 w-5' />
          </button>

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

    </div >
  );
}

function Filter({ label, active }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full text-sm ${active ? "bg-black text-white" : "border text-gray-600"
        }`}
    >
      {label}
    </button>
  );
}

