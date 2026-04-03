import ModalFrame from "./ModalFrame";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";



export default function ConfirmGlobalPayoutModal({
    onClose,
    onBack,
    onConfirm,
    onOpenModal,
    quote,
    beneficiary,
    sourceType = 'crypto',
    transferType,
    paymentDetails
}) {
    const { igpsService, twoFactorEnabled } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    // Step 1: user clicks "Confirm payment" → guard 2FA, then show prompt
    const handleConfirmClick = () => {
        if (!twoFactorEnabled) {
            // Show the 2FA setup required screen instead
            setShowTwoFactor(true);
            return;
        }
        setError("");
        setTwoFactorCode("");
        setShowTwoFactor(true);
    };

    // Step 2: user submits 2FA code → create order
    const handleConfirmPayment = async () => {
        if (!quote || !beneficiary) return;
        if (!twoFactorCode || twoFactorCode.trim().length < 6) {
            setError("Enter your 6-digit authenticator code.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const profileRes = await igpsService.getSenderProfile();
            let senderId;
            if (profileRes.success) {
                senderId = profileRes.data.id;
            } else {
                throw new Error("Could not fetch sender profile. Please try again.");
            }

            const orderPayload = {
                acceptedQuoteId: quote.id,
                senderId: senderId,
                beneficiaryId: beneficiary.id,
                purpose: paymentDetails?.purpose || "Gift",
                sourceOfFunds: paymentDetails?.sourceOfFunds || "Savings",
                beneficiaryRelationship: paymentDetails?.beneficiaryRelationship || "Partner",
                customerReferenceId: paymentDetails?.customerReferenceId || undefined,
                documents: paymentDetails?.documents,
                twoFactorCode: twoFactorCode.trim(),
            };

            const res = await igpsService.createOrder(orderPayload);
            if (res.success) {
                onConfirm();
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
                    <button onClick={onBack} className="text-black underline font-medium cursor-pointer">Go Back</button>
                </div>
            </ModalFrame>
        );
    }

    return (
        <ModalFrame size="lg">
            <div className="bg-white rounded-3xl h-[85vh] flex flex-col">
                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button
                        onClick={showTwoFactor ? () => setShowTwoFactor(false) : onBack}
                        className="absolute left-8 text-xl text-gray-500 cursor-pointer"
                    >
                        <Image src="/icons/back.svg" alt="" width={18} height={18} />
                    </button>
                    <h2 className="text-lg font-medium">
                        {showTwoFactor ? "Verify Identity" : "Review & Confirm"}
                    </h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500 cursor-pointer">
                        <Image src="/icons/close.png" alt="close" width={16} height={16} />
                    </button>
                </div>

                {showTwoFactor ? (
                    <div className="flex-1 flex flex-col px-8 pb-8">
                        {!twoFactorEnabled ? (
                            /* ── 2FA NOT SET UP ── */
                            <>
                                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl">⚠️</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-base mb-1">2FA required to send payments</p>
                                        <p className="text-sm text-gray-500 max-w-xs">
                                            Two-factor authentication must be enabled on your account before you can create a payment order.
                                        </p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            const res = await igpsService.setupTwoFactor();
                                            if (res.success) {
                                                onOpenModal("enable-two-factor", {
                                                    qrCode: res.data.qrCode,
                                                    secret: res.data.secret,
                                                    backupCodes: res.data.backupCodes,
                                                });
                                            }
                                        }}
                                        className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-800 transition-all"
                                    >
                                        Set up 2FA
                                    </button>
                                </div>
                                <div className="border-t pt-6">
                                    <button onClick={onClose} className="w-full text-center text-base text-gray-500">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* ── ENTER 2FA CODE ── */
                            <>
                                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl">🔐</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-base mb-1">Two-factor authentication</p>
                                        <p className="text-sm text-gray-500">
                                            Enter the 6-digit code from your authenticator app to authorise this payment.
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="w-full p-4 bg-red-50 text-red-600 rounded-xl text-sm text-left">
                                            {error}
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={twoFactorCode}
                                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
                                        placeholder="000000"
                                        className="w-48 h-14 text-center text-2xl tracking-[0.4em] font-mono rounded-2xl border border-gray-300 focus:border-black focus:outline-none bg-gray-50"
                                        autoFocus
                                    />

                                    <p className="text-xs text-gray-400">
                                        You are authorising a transfer of{" "}
                                        <span className="font-medium text-gray-700">
                                            {quote.sourceAmount} {quote.sourceCurrency}
                                        </span>
                                    </p>
                                </div>

                                <div className="border-t pt-6 space-y-3">
                                    <button
                                        onClick={handleConfirmPayment}
                                        disabled={loading || twoFactorCode.length < 6}
                                        className={`w-full h-14 rounded-2xl bg-black text-white text-base font-medium transition-all
                                            ${(loading || twoFactorCode.length < 6) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                    >
                                        {loading ? "Processing..." : "Confirm payment"}
                                    </button>
                                    <button onClick={onClose} className="w-full text-center text-base text-gray-500">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <>
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
                                        <p className="font-medium text-gray-900">
                                            {sourceType === 'fiat' ? `My ${quote.sourceCurrency} Balance` : `My ${quote.sourceCurrency} Wallet`}
                                        </p>
                                        {sourceType === 'fiat' && transferType && (
                                            <p className="text-xs text-gray-400 mt-0.5">via {transferType}</p>
                                        )}
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
                                    <span className="font-medium">1 {quote.sourceCurrency} = {parseFloat(quote.exchangeRate || 0).toFixed(4)} {quote.targetCurrency}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Fees</span>
                                    <span className="font-medium">{parseFloat(quote.totalFee || 0).toFixed(2)} {quote.sourceCurrency}</span>
                                </div>
                                {paymentDetails?.customerReferenceId && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Reference</span>
                                        <span className="font-medium">{paymentDetails.customerReferenceId}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Arrival Time</span>
                                    <span className="font-medium">1-3 Business Days</span>
                                </div>
                            </div>

                            {/* CONFIRMATION TEXT */}
                            <div className="pt-4">
                                <p className="text-xs text-center text-gray-400">
                                    By clicking confirm, you authorize the transfer of {quote.sourceAmount} {quote.sourceCurrency} from your {sourceType === 'fiat' ? 'account' : 'wallet'}.
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="px-8 py-6 border-t bg-white">
                            <button
                                onClick={handleConfirmClick}
                                className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-800 transition-all"
                            >
                                Confirm payment
                            </button>
                            <button onClick={onClose} className="w-full text-center text-base mt-3 text-gray-500">
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </ModalFrame>
    );
}
