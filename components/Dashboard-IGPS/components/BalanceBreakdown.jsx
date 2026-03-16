/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import BalanceDropdown from "./BalanceDropdown";
import Image from "next/image";

export default function BalanceBreakdown({ wallets = [], loading }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    const visibleWallets = wallets.slice(0, 3);

    // Helper to get icons
    const getTokenIcon = (currency) => {
        const c = currency?.toLowerCase();
        if (c === 'usdc') return "/icons/USDC.svg";
        if (c === 'usdt') return "/icons/USDT.svg";
        return "/icons/USDC.svg"; // default
    }

    const getChainIcon = (chain) => {
        const c = chain?.toLowerCase();
        if (c === 'polygon') return "/icons/Polygon.png";
        if (c === 'solana') return "/icons/Solana.svg";
        if (c === 'tron') return "/icons/TRON.svg";
        if (c === 'ethereum') return "/icons/eth.svg";
        return "/icons/Polygon.png";
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="relative  w-full" ref={wrapperRef}>
            <div className="relative rounded-[28px] bg-[#FAFAFA]">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(prev => !prev);
                    }}
                    className="absolute top-3 right-3 h-10 w-10 rounded-lg bg-[#EBEBEB] flex items-center justify-center"
                >
                    <svg
                        className={`h-6 w-6 text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="
                grid
                grid-cols-1
                xl:grid-cols-[1fr_1fr_auto]
                gap-6
                xl:gap-x-16
                items-start
                ">
                    {/* FIAT COLUMN - Keeping static for now as API returns crypto wallets */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <p className="text-sm text-gray-500 mb-5">Fiat</p>
                        <div className="space-y-5 max-h-64 overflow-y-auto pr-2">
                            <FiatRow img="/icons/usa.png" label="USD" value="0.00" />
                        </div>
                    </div>

                    {/* CRYPTO COLUMN */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <p className="text-sm text-gray-500 mb-5">Cryptocurrencies</p>
                        <div className="space-y-5 max-h-64 overflow-y-auto pr-2">
                            {loading && wallets.length === 0 ? (
                                <div className="space-y-4">
                                    <WalletShimmer />
                                    <WalletShimmer />
                                    <WalletShimmer />
                                </div>
                            ) : wallets.length === 0 ? (
                                <p className="text-sm text-gray-400">No wallets found</p>
                            ) : (
                                visibleWallets.map((w, i) => (
                                    <CryptoRow
                                        key={i}
                                        main={getTokenIcon(w.currency)}
                                        chain={getChainIcon(w.chain)}
                                        label={`${w.currency} (${w.chain?.substring(0, 3).toUpperCase()})`}
                                        value={w.balance || "0.00"}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* DROPDOWN BUTTON COLUMN */}


                </div>


            </div>

            {open && <BalanceDropdown wallets={wallets} onClose={() => setOpen(false)} />}
        </div>
    );
}

function FiatRow({ img, label, value }) {
    return (
        <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3">
                <Image
                    src={img}
                    alt={label}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                />
                <span className="text-sm text-gray-700">{label}</span>
            </div>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}


function CryptoRow({ main, chain, label, value }) {
    return (
        <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3">
                <div className="relative h-6 w-6">
                    <Image
                        src={main}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                    />

                    <Image
                        src={chain}
                        alt=""
                        width={12}
                        height={12}
                        className="h-3 w-3 rounded-full absolute -bottom-0 -right-0 border border-white"
                    />
                </div>
                <span className="text-sm text-gray-700">{label}</span>
            </div>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}

function WalletShimmer() {
    return (
        <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 w-14 bg-gray-300 rounded"></div>
        </div>
    );
}