"use client";

import { useState, useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";
import { FiX, FiCopy } from "react-icons/fi";
import { IgpsService } from "../../../services/igpsService";
import Image from "next/image";

const igpsService = new IgpsService();

export default function EnableTwoFactorModal({
    onClose,
    qrCode,
    secret,
    backupCodes,
    onConfirm
}) {

    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);


    const [code, setCode] = useState("");

    const [copied, setCopied] = useState(false);
    const isValid = code.length === 6;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(secret);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEnable = async () => {
        if (!isValid || loading) return;

        setLoading(true);
        setError("");

        const res = await igpsService.verifyTwoFactorSetup(code);

        if (res.success) {
            onConfirm(backupCodes);
        } else {
            setError(res.error || "Invalid verification code");
        }

        setLoading(false);
    };
    return (
        <ModalFrame size="lg">
            <div className="bg-white rounded-3xl max-h-[90vh] flex flex-col p">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-6 px-8 py-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Enable two-factor authentication
                        </h2>
                        <p className="text-sm text-gray-500 mt-2 max-w-lg">
                            Add an extra layer of security to your account with two-factor authentication using an authenticator app.
                        </p>
                    </div>

                    <button onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="px-8 pb-8 overflow-y-auto">
                    {/* INFO BOX */}
                    <div className="bg-[#F4EDE4] border border-[#E5D4BE] rounded-2xl p-5 text-sm text-gray-700 mb-8">
                        Use an authenticator app like <span className="font-semibold">Google Authenticator</span> or <span className="font-semibold">Authy</span> to scan the QR code or enter manual key in the app.
                    </div>

                    {/* STEP 1 */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-4">
                            1. Scan QR or enter manual key
                        </h3>

                        <div className="flex gap-6">

                            {/* QR PLACEHOLDER */}
                            <div className="w-54 h-54 rounded-2xl bg-gray-100 shadow-sm relative">
                                <Image
                                    src={qrCode}
                                    alt="QR Code"
                                    width={216}
                                    height={216}
                                    className="rounded-2xl shadow-sm"
                                />
                            </div>

                            {/* MANUAL KEY BOX */}
                            <div className="flex-1 border rounded-2xl p-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    Manual key (Enter in Authenticator app):
                                </p>

                                <p className="font-medium break-all mb-6">
                                    {secret}
                                </p>

                                <button
                                    onClick={handleCopy}
                                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center"
                                >
                                    <Image
                                        src="/icons/copy.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                </button>
                                {copied && (
                                    <p className="text-sm text-green-600 mt-3">
                                        Copied to clipboard
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-3">
                            2. Enter verification code
                        </h3>

                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                            className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleEnable}
                        disabled={!isValid}
                        className={`w-full h-14 rounded-xl text-white font-medium transition
                        ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}
                    `}
                    >
                        Enable two-factor authentication
                    </button>
                    {error && (
                        <p className="text-sm text-red-600 mt-2">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </ModalFrame>
    );
}
