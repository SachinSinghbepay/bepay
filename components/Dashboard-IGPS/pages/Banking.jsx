"use client";
import React from 'react'
import { Copy } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Banking() {
  const [tab, setTab] = useState(null);
  const { igpsService } = useAuth();
  const [loading, setLoading] = useState(true);
  // const accountDetails = [
  //   {
  //     label: "Beneficiary name",
  //     value: "bepay money europe S.R.L"
  //   },
  //   {
  //     label: "Account number",
  //     value: "211493669471"
  //   },
  //   {
  //     label: "ABA Routing number",
  //     value: "101019644"
  //   },
  //   {
  //     label: "Bank name",
  //     value: "Lead Bank"
  //   },
  //   {
  //     label: "Bank address",
  //     value: "1801 Main St., Kansas City, MO, US, 64108"
  //   }
  // ];
  const [accounts, setAccounts] = useState([]);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        setLoading(true);

        // Step 1: Get sender profile
        const senderRes = await igpsService.getSenderProfile();

        if (!senderRes.success) return;

        const senderId = senderRes.data.id;
        console.log("Sender response:", senderRes);
        // Step 2: Get deposit accounts
        const depositRes = await igpsService.getDepositAccounts(senderId);

        if (!depositRes.success || !depositRes.data?.length) {
          setAccounts([]);
          setTab(null);
          return;
        }

        const depositAccounts = depositRes.data || [];

        setAccounts(depositAccounts);

        if (depositAccounts.length > 0) {
          setTab(depositAccounts[0].currency);
        }

      } catch (err) {
        console.error("Banking fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBankingDetails();
  }, [igpsService]);

  const selectedAccount = accounts.find(acc => acc.currency === tab);


  return (
    <div className="flex-1 px-10 py-8">
      <div className="mx-auto w-full max-w-[772px]">
        {/* Tabs */}
        <div className="flex gap-8 mb-6 text-base">
          {accounts.map((acc, i) => (
            <button
              key={i}
              onClick={() => setTab(acc.currency)}
              className={`pb-2 border-b-2 transition ${tab === acc.currency
                ? "border-black font-medium"
                : "border-transparent text-gray-500"
                }`}
            >
              {acc.currency} Account
            </button>
          ))}
        </div>

        {/* Account Card */}
        <div className="bg-[#FDFDFD] rounded-3xl p-8 max-w-[820px]">

          {/* Top Info Box */}
          {selectedAccount && (
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
          )}


          {/* Details List */}
          <div className="space-y-6">
            {!selectedAccount ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-yellow-700 font-medium">
                  KYC is in processing. Banking details will appear once verification is completed.
                </p>
              </div>
            ) : (
              [
                { label: "Beneficiary name", value: selectedAccount?.name || "-" },
                { label: "Account number", value: selectedAccount?.accountNumber || "-" },
                { label: "BIC", value: selectedAccount?.bic || "-" },
                { label: "Bank name", value: selectedAccount?.bankDetails?.name || "-" },
                { label: "Bank address", value: selectedAccount?.bankDetails?.address || "-" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-4 px-2">
                  <div>
                    <p className="font-medium text-[14px] text-gray-500">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[#6A6A6A] text-[20px]">
                      {item.value}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(item.value)}
                    className="bg-white p-4 rounded-xl hover:bg-gray-100 transition"
                  >
                    <img src="/icons/copy.svg" alt="Copy" className="h-10 w-10" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 h-14 rounded-2xl border border-[#C0C0C0] text-sm font-medium hover:bg-gray-100 transition">
              Download PDF
            </button>

            <button
              onClick={() => {
                if (!selectedAccount) return;

                const text = [
                  `Beneficiary name: ${selectedAccount?.name || "-"}`,
                  `Account number: ${selectedAccount?.accountNumber || "-"}`,
                  `BIC: ${selectedAccount?.bic || "-"}`,
                  `Bank name: ${selectedAccount?.bankDetails?.name || "-"}`,
                  `Bank address: ${selectedAccount?.bankDetails?.address || "-"}`
                ].join("\n");

                handleCopy(text);
              }}
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

