import ModalFrame from "./ModalFrame";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";



export default function ConfirmGlobalPayoutModal({
    onClose,
    onBack,
    onConfirm,
    quote,
    beneficiary,
    paymentDetails
}) {
    const { igpsService } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConfirmPayment = async () => {
        if (!quote || !beneficiary) return;
        setLoading(true);
        setError("");

        try {
            // Need sender ID. Usually we get it from profile or context. 
            // For now, let's assume we need to fetch it or pass it.
            // But let's check profile first if we don't have it.
            const profileRes = await igpsService.getSenderProfile();
            let senderId;
            if (profileRes.success) {
                senderId = profileRes.data.id;
            } else {
                // If profile fetch fails, we can't create order.
                // In a real app we might redirect to login or show error.
                throw new Error("Could not fetch sender profile. Please try again.");
            }

            const orderPayload = {
                acceptedQuoteId: quote.id,
                senderId: senderId,
                beneficiaryId: beneficiary.id,
                purpose: paymentDetails?.purpose || "Gift",
                sourceOfFunds: paymentDetails?.sourceOfFunds || "Savings",
                beneficiaryRelationship: paymentDetails?.beneficiaryRelationship || "Partner",
                documents: paymentDetails?.documents // Pass documents if any
            };

            const res = await igpsService.createOrder(orderPayload);
            if (res.success) {
                onConfirm(); // Trigger success modal/transition
            } else {
                setError(res.error || "Payment failed");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (!quote || !beneficiary) {
        return (
            <ModalFrame size="lg">
                <div className="p-8 text-center flex flex-col items-center justify-center h-[50vh]">
                    <p className="text-red-500 mb-4">Missing transaction details.</p>
                    <button onClick={onBack} className="text-black underline font-medium">Go Back</button>
                </div>
            </ModalFrame>
        );
    }

    return (
        <ModalFrame size="lg">
            <div className="bg-white rounded-3xl h-[85vh] flex flex-col">
                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500 cursor-pointer">
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={18}
                            height={18}
                        />
                    </button>
                    <h2 className="text-lg font-medium">Review & Confirm</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500 cursor-pointer"><Image src="/icons/close.png" alt="close" width={16} height={16} /></button>
                </div>

                {/* SCROLLABLE BODY */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* FROM / TO CARDS */}
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">From</p>
                                <p className="font-medium text-gray-900">My USDC Wallet</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-900 font-bold text-lg">{quote.sourceAmount} {quote.sourceCurrency}</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200"></div>

                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">To</p>
                                <p className="font-medium text-gray-900">{beneficiary.type === 'business' ? beneficiary.fullName : `${beneficiary.firstName} ${beneficiary.lastName}`}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {beneficiary.paymentInfo?.paymentType === 'bank_account' ? beneficiary.paymentInfo.accountNumber : beneficiary.paymentInfo?.address}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-900 font-bold text-lg">{quote.targetAmount} {quote.targetCurrency}</p>
                            </div>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Exchange Rate</span>
                            <span className="font-medium">1 {quote.sourceCurrency} = {quote.exchangeRate} {quote.targetCurrency}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Fees</span>
                            <span className="font-medium">{quote.fee} {quote.sourceCurrency}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Arrival Time</span>
                            <span className="font-medium">1-3 Business Days</span>
                        </div>
                    </div>

                    {/* CONFIRMATION TEXT */}
                    <div className="pt-4">
                        <p className="text-xs text-center text-gray-400">
                            By clicking confirm, you authorize the transfer of {quote.sourceAmount} {quote.sourceCurrency} from your wallet.
                        </p>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="px-8 py-6 border-t bg-white">
                    <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className={`w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-800 transition-all ${loading ? "opacity-70 cursor-wait" : ""}`}
                    >
                        {loading ? "Processing..." : "Confirm payment"}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full text-center text-base mt-3 text-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ModalFrame>
    );
}
