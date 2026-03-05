"use client";
import React from 'react'
import { Copy } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Image from 'next/image';

export default function Banking() {
  const [tab, setTab] = useState(null);
  const { igpsService } = useAuth();
  const [loading, setLoading] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
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

  const handleDownloadPDF = () => {
    if (!selectedAccount) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Bank Account Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Beneficiary name: ${selectedAccount?.name || ""}`, 20, 40);
    doc.text(`Account number: ${selectedAccount?.accountNumber || ""}`, 20, 50);
    doc.text(`BIC: ${selectedAccount?.bic || ""}`, 20, 60);
    doc.text(`Bank name: ${selectedAccount?.bankDetails?.name || ""}`, 20, 70);
    doc.text(`Bank address: ${selectedAccount?.bankDetails?.address || ""}`, 20, 80);

    doc.save("bank-details.pdf");
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
    <div className="flex-1 px-2 sm:px-10 py-8">
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
        <div className="bg-[#FDFDFD] rounded-3xl  p-2 sm:p-8 max-w-[820px]">

          {/* Top Info Box */}
          {selectedAccount && (
            <div className="bg-[#F6F6F6] rounded-2xl px-6 py-8 flex flex-col sm:flex-row  justify-between items-center mb-8">
              <div>
                <h3 className="font-semibold text-lg">
                  Your USD account details
                </h3>
                <p className="text-sm text-orange-600 mt-1">
                  Note: We only accept ACH payments
                </p>
              </div>

              <div className="flex gap-3 mt-2 sm:mt-0">
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
          {/* Details List */}
          <div className="space-y-6">

            {loading ? (
              /* LOADING STATE */
              <div className="flex justify-center py-12">
                <h2 className="text-md text-gray-500 animate-pulse">
                  Loading banking details...
                </h2>
              </div>

            ) : !selectedAccount ? (
              /* KYC PENDING STATE */
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-yellow-700 font-medium">
                  KYC is in processing. Banking details will appear once verification is completed.
                </p>
              </div>

            ) : (
              /* ACCOUNT DETAILS */
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
                    <Image
                      src="/icons/copy.svg"
                      alt="Copy"
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
              ))
            )}
          </div>


          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 h-14 rounded-2xl border border-[#C0C0C0] text-sm font-medium hover:bg-gray-100 transition"
            >
              Download PDF
            </button>

            <button
              onClick={async () => {
                if (!selectedAccount) return;

                const text = [
                  `Beneficiary name: ${selectedAccount?.name || ""}`,
                  `Account number: ${selectedAccount?.accountNumber || ""}`,
                  `BIC: ${selectedAccount?.bic || ""}`,
                  `Bank name: ${selectedAccount?.bankDetails?.name || ""}`,
                  `Bank address: ${selectedAccount?.bankDetails?.address || ""}`
                ].join("\n");

                try {
                  await navigator.clipboard.writeText(text);
                  setCopiedAll(true);
                  setTimeout(() => setCopiedAll(false), 2000);
                } catch (err) {
                  console.error("Copy failed", err);
                }
              }}
              className="flex-1 h-14 rounded-2xl border border-[#C0C0C0] text-sm font-medium hover:bg-gray-100 transition"
            >
              {copiedAll ? "Copied ✓" : "Copy all details"}
            </button>

          </div>

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

