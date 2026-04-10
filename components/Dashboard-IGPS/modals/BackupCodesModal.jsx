"use client";

import { useState, useRef, useEffect } from "react";
import ModalFrame from "./ModalFrame";
import { FiCopy, FiDownload, FiPrinter } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function BackupCodesModal({ onClose, codes = [], onContinue }) {
    const { refreshUser } = useAuth();
    const [confirmed, setConfirmed] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [allCopied, setAllCopied] = useState(false);
    const [mode, setMode] = useState("codes");

    console.log(codes)
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

    // Example codes (normally from backend)
    // const codes = [
    //     "KZJNOK1V",
    //     "PLM8XZ2Q",
    //     "WERT90AS",
    //     "TYUI23GH",
    //     "BNM45KLP",
    //     "ZXCV78RT",
    //     "QWER56YU",
    //     "ASDF12JK",
    //     "GHJK90PL",
    //     "UIOP34ZX",
    // ];

    // Copy single code
    const copySingle = async (code, index) => {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    // Copy all codes
    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(codes.join("\n"));
            setAllCopied(true);

            setTimeout(() => {
                setAllCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Copy all failed", err);
        }
    };

    // Download codes as txt
    const downloadCodes = () => {
        const blob = new Blob([codes.join("\n")], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-codes.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Print codes
    const printCodes = () => {
        const printWindow = window.open("", "", "width=600,height=600");
        printWindow.document.write(
            `<pre>${codes.join("\n")}</pre>`
        );
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <ModalFrame size={mode === "success" ? "sm" : "lg"} height={mode === "success" ? "h-auto" : ""}>
            <div className="flex flex-col bg-white rounded-3xl p-8 max-h-[80vh] min-h-0">
                {mode === "codes" ? (
                    <>
                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Save your backup codes
                                </h2>
                                <p className="text-sm text-gray-500 mt-4">
                                    These backup codes can be used to access your account if you lose your authenticator device.
                                    Each code can only be used once, so store them safely.
                                </p>
                            </div>

                            <button onClick={onClose} className="cursor-pointer">
                                <Image src="/icons/close.png" alt="close" width={16} height={16} />
                            </button>
                        </div>

                        {/* IMPORTANT BOX */}
                        <div className="bg-[#C0741733]/80 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6 text-sm">
                            <strong>Important:</strong> These codes will not be shown again.
                            Make sure to save them now.
                        </div>

                        {/* SCROLLABLE CODE LIST */}
                        <div
                            ref={scrollRef}
                            className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 mb-6"
                        >
                            {codes.map((code, index) => (
                                <div
                                    key={index}
                                    onClick={() => copySingle(code, index)}
                                    className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-200 transition"
                                >
                                    <span className="text-gray-500 font-medium">
                                        #{index + 1}
                                    </span>
                                    <span className="font-semibold tracking-widest">
                                        {code}
                                    </span>

                                    {copiedIndex === index && (
                                        <span className="text-green-600 text-sm ml-3">
                                            Copied
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3 flex-wrap mb-6">
                            <button
                                onClick={copyAll}
                                className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 cursor-pointer"
                            >
                                <FiCopy size={16} />
                                Copy all codes
                            </button>

                            <button
                                onClick={downloadCodes}
                                className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 cursor-pointer"
                            >
                                <FiDownload size={16} />
                                Download codes
                            </button>

                            <button
                                onClick={printCodes}
                                className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 cursor-pointer"
                            >
                                <FiPrinter size={16} />
                                Print
                            </button>
                            {allCopied && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✓ All backup codes copied to clipboard
                                </p>
                            )}
                        </div>

                        {/* CONFIRMATION CHECKBOX */}
                        <div className="flex justify-start items-center gap-3 mb-6 ">
                            <input
                                type="checkbox"
                                checked={confirmed}
                                onChange={() => setConfirmed(!confirmed)}
                                className=" w-5 h-5 accent-black cursor-pointer"
                            />
                            <p className="text-sm text-gray-600">
                                I have saved these backup codes in a safe place and understand
                                that they will not be shown again.
                            </p>
                        </div>

                        {/* CONTINUE */}
                        <button
                            disabled={!confirmed}
                            onClick={async () => {
                                await refreshUser();
                                setMode("success");
                            }}
                            className={`w-full h-14 rounded-2xl text-white text-base font-medium transition
                        ${confirmed ? "bg-black hover:bg-gray-800 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}
                    `}
                        >
                            Continue
                        </button>
                    </>
                ) : (
                    <>
                        {/* Header */}
                        <div className="relative flex items-center justify-center mb-8">
                            <h2 className="text-lg font-medium">2FA Enabled</h2>
                            <button
                                onClick={async () => { await refreshUser(); onClose(); }}
                                className="absolute right-0 cursor-pointer"
                            >
                                <Image src="/icons/close.png" alt="close" width={16} height={16} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-6 py-8">
                            <div className="w-20 h-20 rounded-full  flex items-center justify-center">
                                <Image src="/icons/check.png" alt="check" width={50} height={50} className="w-16 "/>
                            </div>
                            <p className="text-xl font-semibold">
                                Two-factor authentication (2FA) has been enabled successfully!
                            </p>
                        </div>

                        <button
                            onClick={async () => { await refreshUser(); onClose(); }}
                            className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium cursor-pointer hover:bg-gray-800 transition mt-auto"
                        >
                            Done
                        </button>
                    </>
                )}


            </div>
        </ModalFrame>
    );
}
