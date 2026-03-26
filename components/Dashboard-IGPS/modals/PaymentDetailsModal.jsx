"use client";

import ModalFrame from "../modals/ModalFrame";
import Image from "next/image";

export default function PaymentDetailsModal({ order, onClose }) {

    if (!order) return null;
    const currencyIcons = {
        USDC_POL: "/icons/usdc.svg",
        USD: "/icons/usd.svg",
        EUR: "/icons/euro.svg"
    };

    const currencyIcon = currencyIcons[order.sourceCurrency] || "/icons/usdc.svg";
    const status = order.status?.toLowerCase();

    const isReceived = status === "completed";
    const isAwaiting = status === "pending";
    const isFailed = status === "failed";

    const payer =
        order?.beneficiary?.fullName ||
        `${order?.beneficiary?.firstName || ""} ${order?.beneficiary?.lastName || ""}`;

    const requestedAmount = `${order.sourceCurrency} ${order.sourceAmount}`;

    const destination = `bepay IGPS ${order.targetCurrency} account`;

    return (
        <ModalFrame size="md">

            <div className="px-8 py-10">

                {/* TITLE */}
                <h2 className="text-center text-sm text-gray-500 mb-6">
                    Requested payment details
                </h2>

                {/* AMOUNT */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-6 py-4">
                        <Image src={currencyIcon} width={10} height={10} alt={order.sourceCurrency}/>
                        <div className="text-2xl font-bold">
                            ${order.sourceAmount}
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                <p className="text-center text-gray-600 mb-6">
                    You requested <b>{requestedAmount}</b> from <b>{payer}</b>
                </p>

                {/* STATUS */}
                <div className="bg-gray-100 rounded-xl px-6 py-4 flex justify-between mb-4">
                    <span className="text-gray-500">Status</span>

                    {isReceived && (
                        <span className="text-green-600 font-medium">Received ✓</span>
                    )}

                    {isAwaiting && (
                        <span className="text-orange-500 font-medium">Awaiting ⏳</span>
                    )}

                    {isFailed && (
                        <span className="text-red-500 font-medium">Failed</span>
                    )}

                </div>

                {/* DETAILS */}
                <div className="bg-gray-100 rounded-xl px-6 py-6 space-y-4">

                    <Row label="Payer" value={payer} />

                    <Row label="Requested Amount" value={requestedAmount} />

                    <Row label="Destination" value={destination} />

                    <Row label="Due date" value="-" />

                </div>

                {/* RECEIVED EXTRA SECTION */}
                {isReceived && (
                    <div className="bg-gray-100 rounded-xl px-6 py-6 mt-6 space-y-3">
                        <Row
                            label="Credited amount"
                            value={`${order.targetCurrency} ${order.targetAmount}`}
                        />

                        <Row
                            label="Credited on"
                            value={new Date(order.completedAt).toLocaleDateString()}
                        />
                    </div>
                )}

                {/* BUTTON */}
                <div className="mt-8">

                    {isReceived && (
                        <button className="w-full bg-black text-white rounded-full py-4">
                            Download e-FIRA
                        </button>
                    )}

                    {isAwaiting && (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-white rounded-full py-4"
                        >
                            Download e-FIRA
                        </button>
                    )}

                    {isFailed && (
                        <button className="w-full bg-black text-white rounded-full py-4">
                            Send reminder email
                        </button>
                    )}

                </div>

            </div>

        </ModalFrame>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}