import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { useState } from "react";
import { IgpsService } from "../../../services/igpsService";

const igpsService = new IgpsService();
export default function Profile({ onOpenModal, setActivePage }) {

    const { user, organization, loading } = useAuth();
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
        <div className="px-8 space-y-8 max-w-full">

            {/* USER CARD */}
            <div className="bg-white rounded-3xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-[88px] w-[88px] rounded-3xl bg-[#D1D1D1] p-[2px]">
                        <div className="h-full w-full rounded-3xl overflow-hidden bg-[#B6B6B6]">
                            <Image
                                src="/profile.png"
                                alt="profile"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                            {displayName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-green-100  px-4 py-2 rounded-full text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600">
                        <svg
                            className="h-3 w-3 text-white font-semibold"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>

                    {status}
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
                <ExportRow title="Export transactions" desc="Download your transaction history" />
                <ExportRow title="Export payees" desc="Download your saved payees" />
                <ExportRow title="Export bank accounts" desc="Download your saved bank accounts" />
            </Section>

            {/* LEGAL */}
            <Section title="Legal">
                <SimpleRow
                    title="Privacy policy"
                    onClick={() => setActivePage("privacy-policies")}
                />
                <SimpleRow title="Terms of service" />
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
        <div className="bg-[#F7F7F7] border border-gray-200 rounded-3xl px-8 py-8 flex items-center justify-between">

            <div>
                <p className="text-xl font-semibold text-gray-900">
                    {title}
                </p>
                <p className="text-base text-gray-500 mt-2">
                    {desc}
                </p>
            </div>

            <button
                className="px-8 py-3 rounded-full bg-black text-white text-base font-medium hover:opacity-90 transition"
                onClick={onClick}
            >
                {action}
            </button>
        </div>
    );
}

function ExportRow({ title, desc }) {
    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <span className="text-sm text-gray-500">CSV</span>
        </div>
    );
}

function SimpleRow({ title, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-gray-50 rounded-2xl p-4 font-medium text-gray-900">
            {title}
        </div>
    );
}

function Divider() {
    return <div className="border-t" />;
}

function TwoFactorCard({ enabled, onEnable, onDisable }) {
    return (
        <div className="bg-[#F7F7F7] border border-gray-200 rounded-3xl px-8 py-8 space-y-6">

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
                    className={`relative w-[62px] h-[34px] rounded-xl p-1 transition ${enabled ? "bg-green-600" : "bg-gray-300"
                        }`}
                >
                    <div
                        className={`h-[26px] w-[26px] rounded-lg bg-white shadow-md transition-all duration-300 ${enabled ? "translate-x-[28px]" : "translate-x-0"
                            }`}
                    />
                </div>
            </div>

            {/* Bottom Action */}
            <div className="flex justify-end">
                {enabled ? (
                    <button
                        onClick={onDisable}
                        className="px-8 py-3 rounded-full border border-red-500 text-red-500 text-base font-medium hover:bg-red-50 transition"
                    >
                        Disable 2FA
                    </button>
                ) : (
                    <button
                        className="px-8 py-3 rounded-full bg-black text-white text-base font-medium hover:opacity-90 transition"
                        onClick={onEnable}
                    >
                        Enable two-factor authentication
                    </button>
                )}
            </div>
        </div>
    );
}

