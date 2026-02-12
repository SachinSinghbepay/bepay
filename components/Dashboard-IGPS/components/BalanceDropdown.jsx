/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function BalanceDropdown({ wallets = [], onClose }) {

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
        <div className="balance-wrapper absolute -right-5 top-[72px] z-50">
            <div className="w-[630px] rounded-[28px] bg-white shadow-xl p-6">

                {/* HEADERS */}
                <div className="grid grid-cols-2 gap-x-16 mb-4">
                    <span className="text-sm text-gray-500">Fiat</span>
                    <span className="text-sm text-gray-500">Cryptocurrencies</span>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-2 gap-x-16 ">

                    {/* FIAT COLUMN */}
                    <div className="space-y-8">
                        <FiatRow img="/icons/usa.png" label="USD" value="0.00" />
                    </div>

                    {/* CRYPTO COLUMN */}
                    <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
        <div className="grid grid-cols-[auto_80px] items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2">
                <img src={img} className="h-6 w-6 rounded-full" alt="" />
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
        <div className="grid grid-cols-[auto_100px] items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img src={main} className="h-[28px] w-[28px] rounded-full" alt="" />
                    {chain && (
                        <img
                            src={chain}
                            className="h-[16px] w-[16px] rounded-full absolute bottom-0 right-0 border border-white"
                            alt=""
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


