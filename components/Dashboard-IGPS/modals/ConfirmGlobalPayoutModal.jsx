// ConfimrGlobalPayoutModal.jsx

import ModalFrame from "./ModalFrame";
import { useState, useRef, useEffect } from "react";
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
    senderWallet,
    paymentDetails
}) {
    console.log(quote)
    const { igpsService, twoFactorEnabled, user, organization } = useAuth();
    const senderName = organization?.name || user?.organizationName || (user?.firstName ? `${user.firstName} ${user.lastName}` : "");
    const senderInitials = senderName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [digits, setDigits] = useState(["", "", "", "", "", ""]);
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const inputsRef = useRef([]);
    const twoFactorCode = digits.join("");

    const handleDigitChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const updated = [...digits];
        updated[index] = value;
        setDigits(updated);
        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleDigitKeyDown = (e, index) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleDigitPaste = (e) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const updated = ["", "", "", "", "", ""];
        pasted.split("").forEach((char, i) => { updated[i] = char; });
        setDigits(updated);
        inputsRef.current[Math.min(pasted.length, 5)]?.focus();
        e.preventDefault();
    };

    useEffect(() => {
        if (twoFactorCode.length === 6 && showTwoFactor && twoFactorEnabled && !loading) {
            handleConfirmPayment();
        }
    }, [twoFactorCode]);

    // Step 1: user clicks "Confirm payment" → guard 2FA, then show prompt
    const handleConfirmClick = () => {
        if (!twoFactorEnabled) {
            // Show the 2FA setup required screen instead
            setShowTwoFactor(true);
            return;
        }
        setError("");
        setDigits(["", "", "", "", "", ""]);
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

    if (showTwoFactor) {
        return (
            <ModalFrame key="2fa" size={twoFactorEnabled ? "lg" : "md"} height="h-auto">
                <div className="bg-white rounded-3xl flex flex-col" style={{ minHeight: twoFactorEnabled ? "560px" : "420px" }}>
                    {!twoFactorEnabled ? (
                        /* ── 2FA NOT SET UP ── */
                        <>
                            {/* Header */}
                            <div className="relative flex items-center justify-center px-8 pt-6 pb-6">
                                <button onClick={onClose} className="absolute right-8 text-gray-500 cursor-pointer">
                                    <Image src="/icons/close.png" alt="close" width={16} height={16} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex-1 px-8 pb-6 text-center space-y-5">
                                <div className="flex justify-center">
                                    <Image src="/icons/lock2.png" alt="2FA" width={40} height={40} className="h-12 w-auto" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-lg mb-2">Enable 2FA to Send Payments</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        For your security, two-factor authentication (2FA) is required to send money from your IGPS account.
                                    </p>
                                </div>
                            </div>

                            {/* CTAs pinned to bottom */}
                            <div className="px-8 pb-8 flex gap-3 mt-auto">
                                <button
                                    onClick={onClose}
                                    className="flex-1 h-14 rounded-2xl border border-gray-300 text-gray-700 text-base font-medium cursor-pointer hover:bg-gray-50 transition-all"
                                >
                                    I&apos;ll do later
                                </button>
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
                                    className="flex-1 h-14 rounded-2xl bg-black text-white text-base font-medium cursor-pointer hover:bg-gray-800 transition-all"
                                >
                                    Enable 2FA
                                </button>
                            </div>
                        </>
                    ) : (
                        /* ── ENTER 2FA CODE ── */
                        <>
                            {/* Header */}
                            <div className="relative flex items-center justify-between px-8 pt-6 pb-2 ">
                                <button onClick={() => setShowTwoFactor(false)} className="text-gray-500 cursor-pointer">
                                    <Image src="/icons/back.svg" alt="back" width={18} height={18} />
                                </button>
                                <button onClick={onClose} className="text-gray-500 cursor-pointer">
                                    <Image src="/icons/close.png" alt="close" width={16} height={16} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex-1 px-8 pt-4 pb-6 space-y-6 ">
                                <div className="py-4">
                                    <h2 className="text-xl font-semibold mb-2">Two-factor authentication (2FA)</h2>
                                    <p className="text-sm text-gray-500">
                                        Enter 6-digit code from your authenticator app to confirm your payment
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm text-[#080808] mb-3">Authentication code</label>
                                    <div className="flex gap-3">
                                        {digits.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputsRef.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleDigitChange(e.target.value, index)}
                                                onKeyDown={(e) => handleDigitKeyDown(e, index)}
                                                onPaste={handleDigitPaste}
                                                autoFocus={index === 0}
                                                className="lg:w-18 h-18 rounded-xl border text-center text-lg font-medium focus:border-black outline-none transition"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* CTAs pinned to bottom */}
                            <div className="px-8 pb-8 space-y-3 mt-auto">
                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={loading || twoFactorCode.length < 6}
                                    className={`w-full h-14 rounded-2xl bg-black text-white text-base font-medium transition-all
                                        ${(loading || twoFactorCode.length < 6) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 cursor-pointer"}`}
                                >
                                    {loading ? "Processing..." : "Verify code"}
                                </button>
                                <button onClick={() => setShowTwoFactor(false)} className="w-full text-base text-gray-500 cursor-pointer">
                                    Cancel transaction
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </ModalFrame>
        );
    }

    // Currency display helpers
    const NETWORK_LABELS = { TRX: "Tron", SOL: "Solana", ETH: "Ethereum", POL: "Polygon", MATIC: "Polygon" };
    const COIN_ICONS = {
        USDT: "/icons/USDT.png", USDC: "/icons/USDC.png",
        ETH: "/icons/eth.png", SOL: "/icons/Solana.png",
        TRON: "/icons/TRON.png", TRX: "/icons/TRON.png",
        MATIC: "/icons/Polygon.png", POL: "/icons/Polygon.png",
    };

    function formatCurrency(code) {
        if (!code) return code;
        const [base, network] = code.split("_");
        const networkLabel = network ? NETWORK_LABELS[network] || network : null;
        return networkLabel ? `${base} (${networkLabel})` : base;
    }

    function getCoinIcon(code) {
        if (!code) return null;
        const base = code.split("_")[0];
        return COIN_ICONS[base] || COIN_ICONS[code] || null;
    }

    const srcIcon = getCoinIcon(quote.sourceCurrency);

    return (
        <ModalFrame key="confirm" size="lg" height=''>
            <div className="bg-white rounded-3xl h-[85vh] flex flex-col">
                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500 cursor-pointer">
                        <Image src="/icons/back.svg" alt="" width={18} height={18} />
                    </button>
                    <h2 className="text-lg font-medium">Confirm payment</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500 cursor-pointer">
                        <Image src="/icons/close.png" alt="close" width={16} height={16} />
                    </button>
                </div>

                {/* SCROLLABLE BODY */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
                  

                    {/* FLOW */}
                    <div className="flex flex-col items-center text-center space-y-3 py-2">
                          {/* SENDER */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl">
                        <div
                            className="w-10 h-10 rounded-[10px] bg-[#FFD4B8] flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0"
                            style={{ border: "1.59px solid #B6B6B6", boxShadow: "3.18px 3.18px 7.94px 0px rgba(0,0,0,0.15)" }}
                        >
                            {senderInitials}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-sm text-gray-900 leading-tight">{senderName}</p>
                            {senderWallet?.address && (
                                <p className="text-xs text-gray-400 truncate">
                                    {senderWallet.address.slice(0, 6)}........{senderWallet.address.slice(-6)}
                                </p>
                            )}
                        </div>
                    </div>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2.5">
                            {srcIcon && <Image src={srcIcon} alt="" width={20} height={20} className="rounded-full" />}
                            <span className="font-semibold">{parseFloat(quote.sourceAmount || 0).toFixed(2)} {formatCurrency(quote.sourceCurrency)}</span>
                        </div>

                        <Image src="/icons/transfer.png" alt="transfer" width={30} height={30} className="" />

                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2.5">
                            {beneficiary.countryFlagUrl
                                ? <img src={beneficiary.countryFlagUrl} alt="" className="w-5 h-4 rounded-full object-cover" />
                                : <Image src="/icons/usa.svg" alt="" width={20} height={14} className="rounded-sm" />
                            }
                            <span className="font-semibold">{parseFloat(quote.targetAmount || 0).toFixed(2)} {quote.targetCurrency}</span>
                        </div>

                        <div className="pt-1">
                            <p className="text-sm text-[#6A6A6A] mb-0.5">To</p>
                            <p className="font-semibold text-gray-900 text-[16px]">
                                {beneficiary.type === 'business' ? beneficiary.fullName : `${beneficiary.firstName} ${beneficiary.lastName}`}
                            </p>
                            <p className="text-sm text-[#6A6A6A]">
                                {beneficiary.paymentInfo?.bankName ? `${beneficiary.paymentInfo.bankName} - ` : ""}
                                {beneficiary.paymentInfo?.paymentType === 'bank_account' || beneficiary.paymentInfo?.paymentType === 'pix'
                                    ? beneficiary.paymentInfo.accountNumber
                                    : beneficiary.paymentInfo?.address}
                            </p>
                        </div>
                    </div>
                    <hr />
                    {/* DETAILS */}
                    <div className="space-y-4 text-sm px-4 sm:px-16 lg:px-24 xl:px-28">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Exchange rate</span>
                            <span className="font-medium">1 {formatCurrency(quote.sourceCurrency)} = {parseFloat(quote.exchangeRate || 0).toFixed(4)} {quote.targetCurrency}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">You send</span>
                            <div className="flex items-center gap-1.5">
                                {srcIcon && <Image src={srcIcon} alt="" width={18} height={18} className="rounded-full" />}
                                <span className="font-medium">{parseFloat(quote.sourceAmount || 0).toFixed(2)} {formatCurrency(quote.sourceCurrency)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Processing fee</span>
                            <span className="font-medium">{formatCurrency(quote.sourceCurrency)} {parseFloat(quote.totalFee || 0).toFixed(2)}</span>
                        </div>
                        {paymentDetails?.customerReferenceId && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Reference</span>
                                <span className="font-medium">{paymentDetails.customerReferenceId}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">Recipient will receive</span>
                            <div className="flex items-center gap-1.5">
                                {beneficiary.countryFlagUrl
                                    ? <img src={beneficiary.countryFlagUrl} alt="" className="w-4 h-3 rounded-full object-cover" />
                                    : <Image src="/icons/flag-placeholder.png" alt="" width={18} height={14} className="rounded-sm" />
                                }
                                <span className="font-semibold text-gray-900">{quote.targetCurrency} {parseFloat(quote.targetAmount || 0).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Processing time</span>
                            <span className="font-semibold">1-3 business days</span>
                        </div>
                    </div>

                    {/* CONFIRMATION TEXT */}
                    <div className="pt-4">
                        <p className="text-xs text-center text-gray-400">
                            By clicking confirm, you authorize the transfer of {quote.sourceAmount} {formatCurrency(quote.sourceCurrency)} from your {sourceType === 'fiat' ? 'account' : 'wallet'}.
                        </p>
                    </div>
                    {/* FOOTER */}
                    <div className="px-8 py-  bg-white rounded-b-3xl">
                        <button
                            onClick={handleConfirmClick}
                            className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-800 transition-all cursor-pointer"
                        >
                            Confirm payment
                        </button>
                        <button onClick={onClose} className="w-full text-center text-base mt-3 text-gray-500 cursor-pointer">
                            Cancel
                        </button>
                    </div>
                </div>



            </div>
        </ModalFrame>
    );
}



