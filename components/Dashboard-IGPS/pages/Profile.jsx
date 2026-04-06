import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { useState } from "react";
import { IgpsService } from "../../../services/igpsService";


export default function Profile({ onOpenModal, setActivePage }) {
    const { igpsService } = useAuth();
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
        <div className="px-4 sm:px-8 space-y-8 py-2 max-w-full">

            <button
                className="  text-xl text-gray-500 cursor-pointer"
                onClick={() => setActivePage("dashboard")}
            >
                <Image
                    src="/icons/back.svg"
                    alt=""
                    width={24}
                    height={24}
                />
            </button>
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

function ExportRow({ title, desc }) {
    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-6">
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <div className="text-sm text-gray-500 flex flex-col justify-center  items-center cursor-pointer">
                <Image
                    src="/icons/export.svg"
                    width={25}
                    height={25}
                    alt="export"
                />
                <p>CSV</p>
            </div>
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

