import { useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";

export default function TransactionDetails({ onClose }) {
    const scrollRef = useRef(null);

    const status = "pending";

    const details = [
        { label: "Amount", value: "10 USDC" },
        { label: "Recipient get", value: "9.50 USDC" },
        { label: "Exchange rate", value: "1 USDC = 1.00 USDC" },
        { label: "Network fees", value: "0.50 USDC" },
        { label: "Destination", value: "0xce40...j6gf270", copy: true },
        { label: "Type", value: "Transfer" },
        { label: "Hash", value: "0x7hgt40...j6gf40i", copy: true, share: true },
        { label: "ID", value: "d46798...4448", copy: true },
    ];



    //  stop scroll chaining
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault(); // block background
            } else {
                e.stopPropagation(); // keep scroll here
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <ModalFrame size="lg">
            {/* FIXED HEADER */}
            <div className="relative text-center px-10 pt-8">
                <h2 className="text-lg font-semibold text-gray-900">
                    Transaction details
                </h2>

                <button
                    onClick={onClose}
                    className="absolute right-10 top-8 text-gray-400 hover:text-gray-600 text-xl"
                >
                    ✕
                </button>
            </div>



            {/* 🔑 SAME SCROLL AREA — NOW WORKS */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-10 pb-10"
            >

                {/* FIXED ICON + SUMMARY */}
                <div className=" mt-6">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">
                                $
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-1 mb-6">
                        <p className="text-gray-700">
                            You’ve sent <b>10 USDC (POL)</b> to <b>0xce40...j6gf270</b>
                        </p>
                        <p className="text-sm text-gray-500">
                            Jan 31, 2026, 09:35 PM
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-[720px] space-y-4">
                    <div className="bg-gray-50 rounded-2xl px-6 py-4 flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span
                            className={`font-medium ${status === "successful"
                                ? "text-green-600"
                                : status === "pending"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        {status === "pending" && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 text-sm text-red-600">
                                This transaction is currently pending. You may cancel it before it is confirmed on the network.
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 rounded-2xl px-6 py-6 space-y-6">
                        {details.map((item, i) => (
                            <DetailRow key={i} {...item} />
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-2xl px-6 py-6 space-y-6">
                        {details.map((item, i) => (
                            <DetailRow key={i} {...item} />
                        ))}
                    </div>
                    {/* Button stays part of scroll */}
                    {status === "pending" ? (
                        <button className="w-full h-14 rounded-2xl bg-red-600 text-white text-base font-medium mt-8">
                            Cancel transaction
                        </button>
                    ) : (
                        <button className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium mt-8">
                            Send again
                        </button>
                    )}
                </div>
            </div>
        </ModalFrame>
    );
}

function DetailRow({ label, value, copy, share }) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            console.log("Copied:", value);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const handleShare = () => {
        const link = `https://etherscan.io/tx/${value}`;

        if (navigator.share) {
            navigator.share({
                title: label,
                text: value,
                url: link,
            });
        } else {
            window.open(link, "_blank");
        }
    };

    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{label}</span>

            <div className="flex items-center gap-3 font-medium text-gray-900">
                <span>{value}</span>

                {copy && (
                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-gray-700"
                        title="Copy"
                    >
                        <img
                            src="/icons/copy.svg"
                            alt="Copy"
                            className="h-9 w-9"
                        />
                    </button>
                )}

                {share && (
                    <button
                        onClick={handleShare}
                        className="text-gray-400 hover:text-gray-700"
                        title="Share"
                    >
                        <img
                            src="/icons/share.svg"
                            alt="Copy"
                            className="h-9 w-9"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
