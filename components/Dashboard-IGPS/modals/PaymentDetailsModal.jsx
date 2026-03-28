"use client";

import Image from "next/image";
import { useState } from "react";
import ModalFrame from "../modals/ModalFrame";

const TOKEN_ICONS = {
    USDC: "/icons/USDC.png",
    USDT: "/icons/USDT.png",
    ETH: "/icons/eth.png",
};

const FIAT_ICONS = {
    USD: "/icons/usa.svg",
    INR: "/icons/india.svg",
    EUR: "/icons/europe.png",
};

function getCurrencyIcon(currency) {
    if (!currency) return "/icons/USDC.png";
    const token = currency.split("_")[0]; // USDC_POL → USDC
    return TOKEN_ICONS[token] || FIAT_ICONS[currency] || "/icons/USDC.png";
}

const AWAITING_STATUSES = [
    "awaiting_funds",
    "in_progress",
    "sent_to_beneficiary",
    "funds_received",
    "need_review",
];


function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

function formatDateTime(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <button onClick={handleCopy}>
            <Image
                src={copied ? "/icons/check.svg" : "/icons/copy.svg"}
                width={18}
                height={18}
                alt={copied ? "copied" : "copy"}
            />
        </button>
    );
}

export default function PaymentDetailsModal({ order, onClose }) {
    if (!order) return null;

    const raw = order.statusRaw || order.status;

    const isReceived = raw === "success";
    const isAwaiting = AWAITING_STATUSES.includes(raw);
    const isRequested = raw === "created";
    const isFailed = ["failed", "cancelled", "awaiting_funds_timeout"].includes(raw);

    const statusColor = isReceived
        ? "text-[#0E7630]"
        : isFailed
        ? "text-red-600"
        : "text-[#C07417]";

    const b = order.beneficiary;
    const payer = b
        ? b.fullName || `${b.firstName || ""} ${b.lastName || ""}`.trim() || "—"
        : order.to?.name || "—";

    const srcCurrency = order.sourceCurrency || order.currency;
    const srcAmount = order.sourceAmount ?? order.amount;
    const currencyIcon = getCurrencyIcon(srcCurrency);
    const requestedAmount = `${srcCurrency} ${srcAmount}`;
    const destination = `bepay IGPS ${order.targetCurrency} account`;
    const dateTimeStr = formatDateTime(order.createdAt);

    // Determine direction: if there's a beneficiary/to, money went TO them (send)
    const isSend = !!(order.beneficiary || order.to?.name);
    const summaryLine = isSend
        ? <p className="text-center text-[#6A6A6A] text-md mb-1">You sent <b className="text-black">{requestedAmount}</b> to <b className="text-black">{payer}</b></p>
        : <p className="text-center text-[#6A6A6A] text-md mb-1">You requested <b  className="text-black">{requestedAmount}</b> from <b  className="text-black">{payer}</b></p>;

    return (
        <ModalFrame size="md" height="h-auto max-h-[90vh]">
            <div className="overflow-y-auto flex-1">
                <div className="px-8 py-8">

                    {/* HEADER */}
                    <div className="relative flex items-center justify-center mb-6">
                        <h2 className="text-sm text-[#6A6A6A]">Requested payment details</h2>
                        {onClose && (
                            <button onClick={onClose} className="absolute right-0 top-0 p-1 cursor-pointer">
                                <Image src="/icons/close.png" width={16} height={16} alt="close" />
                            </button>
                        )}
                    </div>

                    {/* AMOUNT */}
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-3 bg-[#F7F7F7] rounded-2xl px-6 py-4">
                            <Image src={currencyIcon} width={36} height={36} alt={srcCurrency || "currency"} />
                            <span className="text-2xl font-bold">{srcAmount}</span>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    {summaryLine}
                    {dateTimeStr && (
                        <p className="text-center text-[#6A6A6A] text-xs mb-6">on {dateTimeStr}</p>
                    )}

                    {/* STATUS */}
                    <div className="bg-[#F7F7F7] rounded-xl px-5 py-4 flex justify-between items-center mb-3">
                        <span className="text-[#6A6A6A] text-sm">Status</span>
                        <span className={`font-medium text-sm flex items-center gap-1.5 ${statusColor}`}>
                            {raw}
                            {(isAwaiting || isRequested) && (
                                <Image src="/icons/timer.png" width={16} height={16} alt="" />
                            )}
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="bg-[#F7F7F7] rounded-xl ">
                        <div className="bg-[#F7F7F7] rounded-xl  px-5 py-5 space-y-4 mb-3">

                            <Row
                                label="Payer"
                                value={payer}
                                suffix={<Image src="/icons/users.png" width={14} height={14} alt="" />}
                            />

                            <Row
                                label="Requested Amount"
                                value={requestedAmount}
                                prefix={<Image src={currencyIcon} width={16} height={16} alt="" />}
                            />

                            <Row
                                label="Destination"
                                value={destination}
                                suffix={<Image src="/icons/bank.svg" width={14} height={14} alt="" />}
                            />

                            {order.dueDate && (
                                <Row label="Due date" value={formatDate(order.dueDate)} bold />
                            )}

                            {order.invoiceNo && (
                                <Row
                                    label="Invoice no."
                                    value={order.invoiceNo}
                                    underline
                                    suffix={<Image src="/icons/export.svg" width={14} height={14} alt="" />}
                                />
                            )}

                            {order.purposeCode && (
                                <Row
                                    label="Purpose code"
                                    value={order.purposeCode}
                                    suffix={<CopyButton text={order.purposeCode} />}
                                />
                            )}

                            {order.description && (
                                <div className="space-y-1.5">
                                    <span className="text-[#6A6A6A] text-sm block">Description</span>
                                    <div className="bg-white rounded-xl px-4 py-3 text-sm text-[#6A6A6A]">
                                        {order.description}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* AWAITING: Transaction details */}
                        {isAwaiting && (
                            <div className="bg-[#F7F7F7] rounded-xl px-5 pt-3 pb-5 space-y-3 mb-3">
                                <p className="text-sm text-[#6A6A6A]">Transaction details</p>
                                <div className="bg-white rounded-xl px-4 py-4 space-y-4">
                                    <Row
                                        label="Payment initiated by payer"
                                        value={`${srcCurrency} ${srcAmount}`}
                                        bold
                                    />
                                    <Row
                                        label="Initiated on"
                                        value={formatDate(order.updatedAt)}
                                        bold
                                    />
                                    <Row
                                        label="Estimated receive date"
                                        value={order.estimatedReceiveDate ? formatDate(order.estimatedReceiveDate) : "—"}
                                        bold
                                    />
                                </div>
                            </div>
                        )}

                        {/* RECEIVED: Transaction details + Conversion in ONE gray card, rows in white */}
                        {isReceived && (
                            <div className="bg-[#F7F7F7] rounded-xl px-5 pt-3 pb-5 space-y-3 mb-3">
                                <p className="text-sm text-[#6A6A6A]">Transaction details</p>
                                <div className="bg-white rounded-xl px-4 py-4 space-y-4">
                                    <Row
                                        label="Credited amount"
                                        value={`${order.targetCurrency} ${order.targetAmount}`}
                                        bold
                                    />
                                    <Row
                                        label="Credited on"
                                        value={formatDate(order.completedAt)}
                                        bold
                                    />
                                    <Row
                                        label="Reference no."
                                        value={order.referenceNo || order.mestaOrderId || "—"}
                                        bold
                                        suffix={<CopyButton text={order.referenceNo || order.mestaOrderId || ""} />}
                                    />

                                    <div className="border-t border-gray-200" />

                                    <p className="text-sm font-semibold text-gray-900">Conversion & fees details</p>
                                    <Row
                                        label="Payer sent"
                                        value={`${srcCurrency} ${srcAmount}`}
                                        bold
                                    />
                                    <Row
                                        label="FX rate"
                                        value={`1 ${srcCurrency} = ${order.exchangeRate} ${order.targetCurrency}`}
                                        bold
                                    />
                                    <Row
                                        label="Platform fee"
                                        value={`${order.fees?.total ?? 0} ${order.targetCurrency}`}
                                        bold
                                    />
                                    <Row
                                        label="You received"
                                        value={`${order.targetCurrency} ${order.targetAmount}`}
                                        boldLarge
                                    />
                                </div>

                            </div>
                        )}

                    </div>
                    {/* BUTTON */}
                    <div className="mt-4">
                        {isReceived && (
                            <button className="w-full bg-black text-white rounded-2xl py-4 text-sm font-medium">
                                Download e-FIRA
                            </button>
                        )}
                        {isAwaiting && (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-[#6A6A6A] rounded-2xl py-4 text-sm font-medium cursor-not-allowed"
                            >
                                Download e-FIRA
                            </button>
                        )}
                        {isRequested && (
                            <button className="w-full bg-black text-white rounded-2xl py-4 text-sm font-medium">
                                Send reminder email
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </ModalFrame>
    );
}

function Row({ label, value, bold, boldLarge, prefix, suffix, underline }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-[#6A6A6A]">{label}</span>
            <span className={`flex items-center gap-1.5 ${boldLarge ? "font-bold text-base" : bold ? "font-semibold" : "font-medium"} ${underline ? "underline" : ""}`}>
                {prefix}
                {value}
                {suffix}
            </span>
        </div>
    );
}
