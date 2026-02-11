import { useState, useRef } from "react";
import BalanceDropdown from "./BalanceDropdown";

export default function BalanceBreakdown() {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    return (
        <div className="relative  w-full" ref={wrapperRef}>
            <div className="rounded-[28px] bg-[#FAFAFA]  ">
 
                <div className="grid grid-cols-[1fr_1fr_auto] gap-x-16 items-start">

                    {/* FIAT COLUMN */}
                    <div className="px-6 py-5">
                        <p className="text-sm text-gray-500 mb-5">Fiat</p>
                        <div className="space-y-5">
                            <FiatRow img="/icons/usa.png" label="USD" value="80.00" />
                            <FiatRow img="/icons/india.png" label="INR" value="1000.00" />
                            <FiatRow img="/icons/europe.png" label="EUR" value="2.50" />
                        </div>
                    </div>

                    {/* CRYPTO COLUMN */}
                    <div className="px-6 py-5">
                        <p className="text-sm text-gray-500 mb-5">Cryptocurrencies</p>
                        <div className="space-y-5">
                            <CryptoRow
                                main="/icons/usdc.svg"
                                chain="/icons/polygon.png"
                                label="USDC (POL)"
                                value="2.00"
                            />
                            <CryptoRow
                                main="/icons/usdt.svg"
                                chain="/icons/solana.svg"
                                label="USDT (SOL)"
                                value="4.00"
                            />
                            <CryptoRow
                                main="/icons/usdt.svg"
                                chain="/icons/tron.svg"
                                label="USDT (TRX)"
                                value="1.50"
                            />
                        </div>
                    </div>

                    {/* DROPDOWN BUTTON COLUMN */}
                    <div className="flex justify-end pt-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(prev => !prev);
                            }}
                            className="h-10 w-10 rounded-lg bg-[#EBEBEB] flex items-center justify-center"
                        >
                            <svg
                                className={`h-6 w-6 text-gray-600 transition-transform ${open ? "rotate-180" : ""
                                    }`}
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
                    </div>

                </div>


            </div>

            {open && <BalanceDropdown onClose={() => setOpen(false)} />}
        </div>
    );
}

function FiatRow({ img, label, value }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={img} alt={label} className="h-6 w-6 rounded-full" />
                <span className="text-sm text-gray-700">{label}</span>
            </div>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}


function CryptoRow({ main, chain, label, value }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-6 w-6">
                    <img
                        src={main}
                        className="h-6 w-6 rounded-full"
                        alt=""
                    />
                    <img
                        src={chain}
                        className="h-3 w-3 rounded-full absolute -bottom-0 -right-0 border border-white"
                        alt=""
                    />
                </div>
                <span className="text-sm text-gray-700">{label}</span>
            </div>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}