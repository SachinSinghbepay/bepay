"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { useState } from "react";

function downloadCSV(filename, rows) {
    const csv = rows.map(r => r.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export default function Profile({ onOpenModal, setActivePage }) {
    const { igpsService } = useAuth();
    const { user, organization, loading } = useAuth();
    const [exportingTransactions, setExportingTransactions] = useState(false);
    const [exportingBanks, setExportingBanks] = useState(false);
    const [exportingPayees, setExportingPayees] = useState(false);

    const handleExportTransactions = async () => {
        setExportingTransactions(true);
        try {
            const res = await igpsService.listOrders({ page: 1, limit: 1000 });
            const orders = res.success ? (res.data?.orders ?? []) : [];
            const header = ["Date", "Payer", "Source Amount", "Source Currency", "Target Amount", "Target Currency", "Status"];
            const rows = orders.map(o => {
                const b = o.beneficiary;
                const payer = b ? (b.firstName && b.lastName ? `${b.firstName} ${b.lastName}` : b.fullName ?? "-") : "-";
                return [
                    o.quote?.createdAt ? new Date(o.quote.createdAt).toLocaleString("en-IN") : "-",
                    payer,
                    o.sourceAmount ?? "",
                    o.sourceCurrency ?? "",
                    o.targetAmount ?? "",
                    o.targetCurrency ?? "",
                    o.status ?? "",
                ];
            });
            downloadCSV("transactions.csv", [header, ...rows]);
        } finally {
            setExportingTransactions(false);
        }
    };

    const handleExportBankAccounts = async () => {
        setExportingBanks(true);
        try {
            const senderRes = await igpsService.getSenderProfile();
            if (!senderRes.success) return;
            const depositRes = await igpsService.getDepositAccounts(senderRes.data.id);
            const accounts = depositRes.success ? (depositRes.data ?? []) : [];
            const header = ["Currency", "Beneficiary Name", "Account Number", "BIC", "Routing Number", "Bank Name", "Bank Address"];
            const rows = accounts.map(acc => [
                acc.currency ?? "",
                acc.name ?? "",
                acc.accountNumber ?? "",
                acc.bic ?? "",
                acc.routingDetails?.[0]?.routingNumber ?? "",
                acc.bankDetails?.name ?? "",
                acc.bankDetails?.address ?? "",
            ]);
            downloadCSV("bank-accounts.csv", [header, ...rows]);
        } finally {
            setExportingBanks(false);
        }
    };

    const handleExportPayees = async () => {
        setExportingPayees(true);
        try {
            const res = await igpsService.listBeneficiaries();
            const beneficiaries = res.success ? (res.data ?? []) : [];
            const header = ["Name", "Type", "Email", "Phone", "Payment Type", "Account Number / IBAN / Address", "Status"];
            const rows = beneficiaries.map(b => {
                const name = b.firstName && b.lastName ? `${b.firstName} ${b.lastName}` : (b.fullName ?? "-");
                const paymentId = b.paymentInfo?.accountNumber ?? b.paymentInfo?.iban ?? b.paymentInfo?.address ?? b.paymentInfo?.pixKeyId ?? "";
                return [name, b.type ?? "", b.email ?? "", b.phone ?? "", b.paymentInfo?.paymentType ?? "", paymentId, b.status ?? ""];
            });
            downloadCSV("payees.csv", [header, ...rows]);
        } finally {
            setExportingPayees(false);
        }
    };
    if (loading) return <div>Loading...</div>;

    const displayName = organization?.name || user?.organizationName || (user?.firstName ? `${user.firstName} ${user.lastName}` : "User");
    const email = user?.email || "user@example.com"
    const status = user?.isActive ? 'active' : "unverified";
    const isTwoFactorEnabled = user?.twoFactorEnabled;

    const handleEnable2FA = async () => {
        const res = await igpsService.setupTwoFactor();

        if (res.success) {
            onOpenModal("enable-two-factor", {
                qrCode: res.data.qrCode,
                secret: res.data.secret,
                backupCodes: res.data.backupCodes
            });
        }
    };
    return (
        <div className="px-4 sm:px-8 space-y-8 py-2 max-w-full">

            {/* <button
                className="  text-xl text-gray-500 cursor-pointer"
                onClick={() => setActivePage("dashboard")}
            >
                <Image
                    src="/icons/back.svg"
                    alt=""
                    width={24}
                    height={24}
                />
            </button> */}
            {/* USER CARD */}
            <div className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row  items-center justify-between shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div
                        className="h-22 w-22 rounded-[12.71px] bg-[#FFD4B8] flex items-center justify-center text-2xl font-semibold text-gray-700 shrink-0"
                        style={{
                            border: "1.59px solid #B6B6B6",
                            boxShadow: "3.18px 3.18px 7.94px 0px rgba(0,0,0,0.15)"
                        }}
                    >
                        {displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                        <p className=" text-center sm:text-start text-lg font-semibold text-gray-900">
                            {displayName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center gap-2 bg-[#0E76301A]/70 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full ">
                       <Image src="/icons/check.png" alt="check" width={30} height={30}  className="w-5 h-5"/>
                    </span>
                  KYC  {status}
                </div>

            </div>

            {/* SECURITY */}

            <SecurityCard
                title="Change password"
                desc="Update your password for enhanced security"
                action="Change password"
                onClick={() => onOpenModal("change-password")}
            />

            <TwoFactorCard
                enabled={user?.twoFactorEnabled}
                onEnable={handleEnable2FA}
                onDisable={() => onOpenModal("disable-two-factor")}
            />


            {/* EXPORT DATA */}
            <Section title="Export data">
                <ExportRow title="Export transactions" desc="Download your transaction history" loading={exportingTransactions} onClick={handleExportTransactions} />
                <ExportRow title="Export payees" desc="Download your saved payees" loading={exportingPayees} onClick={handleExportPayees} />
                <ExportRow title="Export bank accounts" desc="Download your saved bank accounts" loading={exportingBanks} onClick={handleExportBankAccounts} />
            </Section>

            {/* LEGAL */}
            <Section title="Legal">
                <SimpleRow
                    title="Privacy policy"
                    onClick={() => setActivePage("privacy-policies")}
                />
                <SimpleRow title="Terms of service" onClick={() => setActivePage("terms")} />
            </Section>

        </div>
    );
}

/* ---------- Reusable UI ---------- */

function Section({ title, children }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            {title && (
                <h3 className="text-sm font-semibold text-gray-700">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}

function SecurityCard({ title, desc, action, onClick }) {
    return (
        <div className="bg-[#F7F7F7] border border-gray-200 rounded-3xl px-8 py-8 flex flex-col sm:flex-row items-start gap-2 sm:gap-0 sm:items-center justify-between">

            <div>
                <p className="text-xl font-semibold text-gray-900">
                    {title}
                </p>
                <p className="text-base text-gray-500 mt-2">
                    {desc}
                </p>
            </div>

            <button
                className="mt-3 sm:mt-0 px-8 py-3 cursor-pointer rounded-full bg-black text-white text-base font-medium hover:opacity-90 transition"
                onClick={onClick}
            >
                {action}
            </button>
        </div>
    );
}

function ExportRow({ title, desc, onClick, loading }) {
    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-6">
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <button
                onClick={onClick}
                disabled={loading}
                className="text-sm text-gray-500 flex flex-col justify-center items-center cursor-pointer disabled:opacity-50"
            >
                {loading ? (
                    <svg className="animate-spin h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4v6h6" /><path d="M20 20v-6h-6" /><path d="M5 15a7 7 0 0011 2l4-4" /><path d="M19 9a7 7 0 00-11-2L4 11" />
                    </svg>
                ) : (
                    <Image src="/icons/export.svg" width={25} height={25} alt="export" />
                )}
                <p>CSV</p>
            </button>
        </div>
    );
}

function SimpleRow({ title, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-gray-50 rounded-2xl p-4 font-medium text-gray-900 cursor-pointer">
            {title}
        </div>
    );
}

function Divider() {
    return <div className="border-t" />;
}

function TwoFactorCard({ enabled, onEnable, onDisable }) {
    return (
        <div className="bg-[#F7F7F7] border border-gray-200 rounded-3xl px-8  pr-2 sm:pr-8 py-8 space-y-6">

            {/* Top Row */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xl font-semibold text-gray-900">
                        Two-factor authentication (2FA) {enabled ? "enabled." : ""}
                    </p>
                    <p className="text-base text-gray-500 mt-2">
                        {enabled
                            ? "Your account is protected with Authenticator App."
                            : "Add an extra layer of security to your account."}
                    </p>
                </div>

                {/* Toggle (Visual Only) */}
                <div
                    className=" w-20h-auto rounded-xl p-1 transition ">
                    {enabled ? <Image src="/icons/2fa-enabled.png" alt="check" width={60} height={60} className="w-25 sm:w-20" />
                        :
                     <Image src="/icons/2fa-disabled.png" alt="check" width={60} height={60} className="w-25 sm:w-20" />
                    }
                </div>
            </div>

            {/* Bottom Action */}
            <div className="flex sm:justify-end">
                {enabled ? (
                    <button
                        onClick={onDisable}
                        className="px-8 py-3 cursor-pointer rounded-full border border-red-500 text-red-500 text-base font-medium hover:bg-red-50 transition"
                    >
                        Disable 2FA
                    </button>
                ) : (
                    <button
                        className="px-8 py-3 cursor-pointer rounded-full bg-black text-white text-base font-medium hover:opacity-90 transition"
                        onClick={onEnable}
                    >
                        Enable two-factor authentication
                    </button>
                )}
            </div>
        </div>
    );
}

