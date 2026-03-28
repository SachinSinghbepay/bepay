"use client";
import React, { useEffect, useState } from 'react'
import { Copy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import Image from 'next/image';
import useSWR from 'swr';

export default function Banking() {
  const [tab, setTab] = useState(null);
  const { igpsService } = useAuth();
  const [copiedAll, setCopiedAll] = useState(false);

  const { data, isValidating } = useSWR(
    'igps-banking',
    async () => {
      const senderRes = await igpsService.getSenderProfile();
      if (!senderRes.success) return [];
      const depositRes = await igpsService.getDepositAccounts(senderRes.data.id);
      if (!depositRes.success || !depositRes.data?.length) return [];
      return depositRes.data;
    }
  );

  const accounts = data ?? [];
  const loading = !data && isValidating;
  const updating = !!data && isValidating;

  useEffect(() => {
    if (accounts.length > 0 && !tab) {
      setTab(accounts[0].currency);
    }
  }, [accounts]);

  const selectedAccount = accounts.find(acc => acc.currency === tab);

  const accountDetails = selectedAccount
    ? [
        { label: "Beneficiary name", value: selectedAccount?.name },
        { label: "Account number", value: selectedAccount?.accountNumber },
        { label: "BIC", value: selectedAccount?.bic },
        { label: "Routing number", value: selectedAccount?.routingDetails?.[0]?.routingNumber },
        { label: "Bank name", value: selectedAccount?.bankDetails?.name },
        { label: "Bank address", value: selectedAccount?.bankDetails?.address }
      ].filter(item => item.value)
    : [];

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

  return (
    <div className="flex-1 px-2 sm:px-10 py-8">
      <div className="mx-auto w-full max-w-[772px]">

        {/* Tabs */}
        <div className="flex items-center gap-8 mb-6 text-base">
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
          {updating && (
            <svg className="ml-auto animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4v6h6" /><path d="M20 20v-6h-6" /><path d="M5 15a7 7 0 0011 2l4-4" /><path d="M19 9a7 7 0 00-11-2L4 11" />
            </svg>
          )}
        </div>

        {/* Account Card */}
        <div className="bg-[#FDFDFD] rounded-3xl p-2 sm:p-8 max-w-[820px]">
          <div className="space-y-6">

            {loading ? (
              <div className="flex justify-center py-12">
                <h2 className="text-md text-gray-500 animate-pulse">
                  Loading banking details...
                </h2>
              </div>

            ) : !selectedAccount ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-yellow-700 font-medium">
                  KYC is in processing. Banking details will appear once verification is completed.
                </p>
              </div>

            ) : (
              <>
                {accountDetails.map((item, i) => (
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
                      <Image src="/icons/copy.svg" alt="Copy" width={40} height={40} />
                    </button>
                  </div>
                ))}

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
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
