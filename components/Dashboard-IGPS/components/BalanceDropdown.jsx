import React from "react";
import { useRef, useEffect } from "react";
import Image from "next/image";
export default function BalanceDropdown({ wallets = [], onClose }) {

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

    // Helper to get icons
    const getTokenIcon = (currency) => {
        const c = currency?.toLowerCase();
        if (c === 'usdc') return "/icons/usdc.svg";
        if (c === 'usdt') return "/icons/usdt.svg";
        return "/icons/usdc.svg"; // default
    }

    const getChainIcon = (chain) => {
        const c = chain?.toLowerCase();
        if (c === 'polygon') return "/icons/polygon.png";
        if (c === 'solana') return "/icons/solana.svg";
        if (c === 'tron') return "/icons/tron.svg";
        if (c === 'ethereum') return "/icons/ethereum.png";
        return "/icons/polygon.png";
    }

    return (
        <div className="absolute right-0 top-[72px] z-50 w-full px-4 sm:px-0 sm:w-auto">
            <div className="w-full sm:w-[630px] max-w-full rounded-[28px] bg-white shadow-xl p-4 sm:p-6">

                {/* HEADERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-16 mb-4">
                    <span className="text-sm text-gray-500">Fiat</span>
                    <span className="text-sm text-gray-500">Cryptocurrencies</span>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-16">

                    {/* FIAT COLUMN */}
                    <div className="space-y-8">
                        <FiatRow img="/icons/usa.png" label="USD" value="0.00" />
                    </div>

                    {/* CRYPTO COLUMN */}

                    <div
                        ref={scrollRef}
                        className="h-[30vh] flex-1 overflow-y-auto px-10 py-8 space-y-8 max-h-[400px]  pr-2"
                    >

                        {wallets.length === 0 ? (
                            <p className="text-sm text-gray-400">No wallets found</p>
                        ) : (
                            wallets.map((w, i) => (
                                <CryptoRow
                                    key={i}
                                    main={getTokenIcon(w.currency)}
                                    chain={getChainIcon(w.chain)}
                                    label={w.currency}
                                    subLabel={` (${w.chain?.substring(0, 3).toUpperCase()})`}
                                    value={w.balance || "0.00"}
                                />
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
function FiatRow({ img, label, value }) {
    return (
        <div className="grid grid-cols-[1fr_auto] items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2">
                <Image
                    src={img}
                    alt={label}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                />

                <span className="text-[16px] text-[#6A6A6A] font-medium">
                    {label}
                </span>
            </div>

            {/* RIGHT (aligned column) */}
            <span className="text-right font-bold text-gray-900">
                {value}
            </span>
        </div>
    );
}

function CryptoRow({ main, chain, label, value, action, subLabel }) {
    return (
        <div className="grid grid-cols-[1fr_auto] items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Image
                        src={main}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full"
                    />

                    {chain && (
                        <Image
                            src={chain}
                            alt=""
                            width={16}
                            height={16}
                            className="rounded-full absolute bottom-0 right-0 border border-white"
                        />
                    )}
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-[16px] text-[#6A6A6A] font-medium">
                        {label}
                    </span>
                    {subLabel && (
                        <span className="text-[14px] text-gray-400">
                            {subLabel}
                        </span>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            {action ? (
                <button className="text-sm underline text-gray-600 text-right">
                    {action}
                </button>
            ) : (
                <span className="text-right font-medium text-gray-900">
                    {value}
                </span>
            )}
        </div>
    );
}


