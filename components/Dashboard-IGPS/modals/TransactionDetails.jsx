import { useEffect, useRef } from "react";
import ModalFrame from "./ModalFrame";
import Image from "next/image";

// Main coin icons
const COIN_ICONS = {
    USDC:    "/icons/USDC.png",
    USDT:    "/icons/USDT.png",
    ETH:     "/icons/Eth.png",
    SOL:     "/icons/Sol.png",
    TRX:     "/icons/TRON.png",
    MATIC:   "/icons/Polygon.png",
    POL:     "/icons/Polygon.png",
};

// Network/chain icons (small overlay)
const NETWORK_ICONS = {
    POL:     "/icons/Polygon.png",
    POLYGON: "/icons/Polygon.png",
    SOL:     "/icons/Sol.png",
    SOLANA:  "/icons/Sol.png",
    TRX:     "/icons/TRON.png",
    TRON:    "/icons/TRON.png",
    ETH:     "/icons/Eth.png",
};

// Supports "USDC_POL", "USDC (POL)", "USDC" + optional chain string like "polygon"
function parseCurrencyIcons(currency, chain) {
    if (!currency) return { coin: null, network: null };
    const upper = currency.toUpperCase();

    // Split on _ or space/paren to get [coinPart, networkPart]
    // e.g. "USDC_POL" → ["USDC", "POL"], "USDC (POL)" → ["USDC", "POL"]
    const parts = upper.replace(/[()]/g, "").split(/[_\s]+/);
    const coinPart = parts[0];
    const networkPart = parts[1] ?? chain?.toUpperCase() ?? null;

    const coinKey = Object.keys(COIN_ICONS).find((k) => k === coinPart);
    const coin = coinKey ? COIN_ICONS[coinKey] : null;

    const networkKey = networkPart
        ? Object.keys(NETWORK_ICONS).find((k) => networkPart.includes(k))
        : null;
    const network = networkKey ? NETWORK_ICONS[networkKey] : null;

    return { coin, network };
}

export default function TransactionDetails({ transaction, onClose, onBack }) {
    const scrollRef = useRef(null);

    const status = transaction?.status?.toLowerCase() || "pending";
    const { coin: coinIcon, network: networkIcon } = parseCurrencyIcons(
        transaction?.sourceCurrency ?? transaction?.currency,
        transaction?.depositChain
    );

    // "USDC_POL" → "USDC (POL)", "USDT_SOL" → "USDT (SOL)", "USDC" → "USDC"
    const rawCurrency = transaction?.sourceCurrency ?? transaction?.currency ?? "";
    const [coinLabel, networkLabel] = rawCurrency.split("_");
    const currencyLabel = networkLabel ? `${coinLabel} (${networkLabel})` : coinLabel;

    const amount = transaction?.sourceAmount ?? transaction?.amount ?? "";

    const walletAddr = transaction?.depositWalletAddress;
    const truncatedWallet = walletAddr
        ? `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}`
        : null;
    const destination =
        transaction?.beneficiary?.fullName ||
        transaction?.beneficiary?.email ||
        transaction?.email ||
        truncatedWallet ||
        "—";

    const dateStr = transaction?.createdAt
        ? new Date(transaction.createdAt).toLocaleString("en-US", {
              month: "short", day: "numeric", year: "numeric",
              hour: "numeric", minute: "2-digit", hour12: true,
          })
        : null;

    // Dummy data if transaction prop is missing
    const dummyDetails = [
        { label: "Amount", value: "10 USDC" },
        { label: "Recipient get", value: "9.50 USDC" },
        { label: "Exchange rate", value: "1 USDC = 1.00 USDC" },
        { label: "Network fees", value: "0.50 USDC" },
        { label: "Destination", value: "0xce40...j6gf270", copy: true },
        { label: "Type", value: "Transfer" },
        { label: "Hash", value: "0x7hgt40...j6gf40i", copy: true, share: true },
        { label: "ID", value: "d46798...4448", copy: true },
    ];

    // from props 
    const dynamicDetails = transaction
        ? [
            {
                label: "Amount",
                value: `${transaction?.amount} ${transaction?.currency}`,
            },
            {
                label: "Recipient get",
                value: transaction?.recipientAmount || "9.50 USDC",
            },
            {
                label: "Exchange rate",
                value: transaction?.exchangeRate || "1 USDC = 1.00 USDC",
            },
            {
                label: "Network fees",
                value: transaction?.networkFee || "0.50 USDC",
            },
            {
                label: "Destination",
                value: transaction?.destination || transaction?.email || "0xce40...j6gf270",
                copy: true,
            },
            {
                label: "Type",
                value: transaction?.type || "Transfer",
            },
            {
                label: "Hash",
                value: transaction?.hash || "0x7hgt40...j6gf40i",
                copy: true,
                share: true,
            },
            {
                label: "ID",
                value: transaction?.id || "d46798...4448",
                copy: true,
            },
        ]
        : null;

    // from props or fallback to dummy data
    const details = dynamicDetails || dummyDetails;

    // examples of how to use the transaction prop:
    // transaction?.amount
    // transaction?.date
    // transaction?.email
    // transaction?.status
    // transaction?.currency
    // Example:


    // <p>{transaction?.amount} {transaction?.currency}</p>
    // <p>{transaction?.date}</p>
    // <p>{transaction?.email}</p>

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
                    className="absolute right-10 top-8 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
                >
                    <Image src="/icons/close.png" alt="close" width={16} height={16} />
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
                        <div className="relative h-16 w-16">
                            {coinIcon ? (
                                <Image src={coinIcon} alt={transaction?.currency ?? "coin"} width={64} height={64} className="h-16 w-16 object-contain" />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">$</div>
                                </div>
                            )}
                            {networkIcon && (
                                <Image src={networkIcon} alt="network" width={22} height={22} className="absolute bottom-0 right-0 h-5 w-5 object-contain rounded-full bg-white" />
                            )}
                        </div>
                    </div>

                    <div className="text-center space-y-1 mb-6">
                        <p className="text-gray-700">
                            You’ve sent <b>{amount} {currencyLabel}</b> to <b>{destination}</b>
                        </p>
                        {dateStr && (
                            <p className="text-sm text-gray-500">{dateStr}</p>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-[720px] space-y-4">
                    <div className="px-20 space-y-4">
                        <div className="bg-gray-50 rounded-2xl px-6 py-4 flex justify-between ">
                            <span className="text-gray-500">Status</span>
                            <span
                                className={`font-medium ${
                                    status === "successful" || status === "completed"
                                        ? "text-[#0E7630]"
                                        : status === "pending" || status === "waiting"
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
                        <Image
                            src="/icons/copy.svg"
                            alt="Copy"
                            width={36}
                            height={36}
                        />
                    </button>
                )}

                {share && (
                    <button
                        onClick={handleShare}
                        className="text-gray-400 hover:text-gray-700"
                        title="Share"
                    >
                        <Image
                            src="/icons/share.svg"
                            alt="Share"
                            width={36}
                            height={36}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
