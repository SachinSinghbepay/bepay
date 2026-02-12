import ModalFrame from "./ModalFrame";
import { useState, useEffect, useRef } from "react";
import CustomSelect from "../components/CustomSelect";

export default function SendGlobalPayoutModal({
    onClose,
    onBack,
    beneficiary,
    onOpenModal
}) {
    const scrollRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [sourceOfFunds, setSourceOfFunds] = useState("Business income");
    const [purposeCode, setPurposeCode] = useState("Gift");

    const sourceOptions = [
        "Business income",
        "Salary",
        "Investment returns",
        "Savings",
        "Gift",
        "Loan",
    ];
    const purposeOptions = [
        "Self",
        "Salary",
        "Gift",
        "Income",
        "Savings",
        "Educational support",
        "Payment",
    ];
    // we can use the data it is getting passed, for example:
    // beneficiary = {
    //   name: "Nordek Fintech INC",
    //   bank: "Cross River bank - 9755",
    //   countryIcon: "/icons/usa.svg",
    //   verified: true,
    // or
    {/* <p>{beneficiary?.name}</p> */ }


    // same scroll lock pattern
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

    return (
        <ModalFrame size="lg">
            {/* HEADER */}
            <div className="relative flex items-center justify-center p-6 mb-6">
                <button
                    onClick={onBack}
                    className="absolute left-6 text-xl text-gray-500"
                >
                    <img src="/icons/back.svg" alt="" />
                </button>

                <h2 className="text-lg font-semibold">Global payout</h2>

                <button
                    onClick={onClose}
                    className="absolute right-6 text-2xl text-gray-400"
                >
                    ✕
                </button>
            </div>

            {/* SCROLL BODY */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-8 pb-10 space-y-8"
            >
                {/* BENEFICIARY */}
                <Section
                    title="Beneficiary"
                    right={<button className="text-sm underline">Change</button>}
                >
                    <div className="flex items-center gap-4 bg-[#F7F7F7] rounded-2xl p-4">
                        <div className="p-[1.5px] rounded-xl bg-[#CECECE]">
                            <div className="bg-[#F5F5F5] rounded-xl p-2">
                                <img
                                    src="/icons/usa.svg"
                                    className="h-7 w-7 rounded-full"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">Nordek Fintech INC</p>
                            <p className="text-sm text-gray-500">
                                Cross River bank - 9755
                            </p>
                        </div>
                    </div>
                </Section>

                {/* AMOUNT */}
                <Section
                    title="Amount"
                    right={
                        <p className="text-sm text-gray-500">
                            Available balance: <b>$100.00</b>
                        </p>
                    }
                >
                    <AmountBox />
                </Section>

                {/* PURPOSE */}
                <label className="text-sm text-gray-500">Purpose code</label>
                <CustomSelect
                    options={purposeOptions}
                    value={purposeCode}
                    onChange={setPurposeCode}
                    placeholder="Select purpose code"
                />

                {/* SOURCE OF FUNDS */}
                <Section title="Source of funds">
                    <CustomSelect
                        options={sourceOptions}
                        value={sourceOfFunds}
                        onChange={setSourceOfFunds}
                        placeholder="Select source of funds"
                    />
                </Section>

                {/* DOCUMENT */}
                {/* <div className="rounded-2xl bg-[#F7F7F7] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span>📎</span>
                        <span className="text-sm font-medium">
                            Bank statement 2025-26
                        </span>
                    </div>
                    <button className="text-xl text-gray-400">✕</button>
                </div> */}
                {/* SOURCE OF FUNDS DOCUMENT */}
                <Section title="Upload invoice or proof of funds">

                    {!uploadedFile ? (
                        /* ===== Upload Box ===== */
                        <label className="w-full h-14 rounded-2xl bg-[#F7F7F7] flex items-center justify-center gap-3 cursor-pointer border">
                            <img src="/icons/upload.svg" className="h-5 w-5" alt="" />
                            <span className="text-sm font-medium">
                                Upload invoice or proof of funds
                            </span>

                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setUploadedFile(file);
                                }}
                            />
                        </label>
                    ) : (
                        /* ===== Uploaded File Row ===== */
                        <div className="rounded-2xl bg-[#F7F7F7] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/icons/file.svg" className="h-5 w-5" alt="" />
                                <span className="text-sm font-medium">
                                    {uploadedFile.name}
                                </span>
                            </div>

                            <button
                                onClick={() => setUploadedFile(null)}
                                className="text-xl text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Warning text (show only if file uploaded OR always, your choice) */}
                    {uploadedFile && (
                        <p className="text-xs text-[#BC4242] mt-2">
                            Source of funds document is required for business-to-business transfers
                            to comply with regulatory requirements.
                        </p>
                    )}

                </Section>


                <hr />
                {/* SUMMARY */}
                <div className="grid grid-cols-2 gap-y-4 text-sm pt-4 p-20">

                    <SummaryRow
                        label="Exchange rate"
                        value="USDC 1 ≈ 1 USD"
                    />

                    <SummaryRow
                        label="Processing fee"
                        value="USD 10.50"
                        info={<FeeInfo />}
                    />

                    <SummaryRow
                        label="Total receivable"
                        value="≈ USD 79.50"
                        bold
                    />
                    <SummaryRow
                        label="Processing time"
                        value="1–3 business days"
                    />
                </div>

                {/* CTA */}
                <button
                    onClick={() =>
                        onOpenModal("confirm-globalpayout", {
                            onBack: () =>
                                onOpenModal("send-globalpayout", {
                                    beneficiary,
                                    onBack,
                                }),
                            onConfirm: () =>
                                onOpenModal("transfer-request-submitted")
                        })
                    }
                    className="w-full h-14 rounded-xl bg-black text-white text-base"
                >
                    Send payment
                </button>

                <p className="text-sm text-gray-500 text-center">
                    We’ll notify you via email once the payment is successful
                </p>
            </div>
        </ModalFrame>
    );
}

function Section({ title, right, children }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{title}</p>
                {right}
            </div>
            {children}
        </div>
    );
}

function AmountBox() {
    const [amount, setAmount] = useState("90");

    return (
        <div className=" rounded-2xl space-y-6">
            {/* TOP: Amount */}
            <div className="flex justify-between items-start bg-[#F7F7F7] p-5 rounded-xl pl-6">
                <div className="flex-1">
                    <div className="flex justify-start gap-8 items-center">
                        <p className="text-sm text-gray-500 mb-2 font-medium">
                            Amount you want to send
                        </p>
                        {/* Percentage shortcuts */}
                        <div className="flex gap-4 text-sm text-gray-400 pb-1 font-medium">
                            <button>10%</button>
                            <button>25%</button>
                            <button>50%</button>
                            <button className="font-medium">MAX</button>
                        </div>
                    </div>
                    <div className="flex items-end gap-4">
                        {/* Editable amount */}
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="
                                w-[140px]
                                bg-transparent
                                text-[32px]
                                font-semibold
                                outline-none
                            "
                        />
                    </div>
                </div>

                <CurrencyDropdown
                    label="USDC"
                    icon="/icons/usdc.svg"
                />
            </div>

            {/* CENTER ARROW */}
            <div className="flex justify-center ">
                <div className="h-14 w-14 -mt-12 rounded-full bg-white shadow-md flex items-center justify-center text-lg">
                    <img src="icons/back.svg" alt="" className="rotate-270" />
                </div>
            </div>

            {/* BOTTOM: Recipient */}
            <div className="flex justify-between items-end bg-[#F7F7F7] px-5 py-6 rounded-xl pl-6  -mt-10">
                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Recipient receives
                    </p>
                    <p className="text-3xl font-semibold">89.50</p>
                </div>

                <CurrencyPill label="USD" icon="/icons/usa.svg" />
            </div>
        </div>
    );
}

function CurrencyDropdown({ label, icon }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* BUTTON */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="
                flex items-center gap-2
                rounded-xl bg-[#EBEBEB] px-3 py-3
                border shadow-sm w-[160px]
                "
            >
                <img src={icon} alt="" className="h-8 w-8 flex justify-center items-center pt-1" />
                <span className="text-[20px] font-bold ">{label}</span>
                <span className="text-gray-400 ">
                    <svg

                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
            absolute right-0 mt-2 w-36
            rounded-xl bg-white border shadow-lg
            overflow-hidden z-50
          "
                >
                    <DropdownItem label="USDC" icon="/icons/usdc.png" />
                    <DropdownItem label="USDT" icon="/icons/usdt.png" />
                    <DropdownItem label="DAI" icon="/icons/dai.png" />
                </div>
            )}
        </div>
    );
}

function DropdownItem({ label, icon }) {
    return (
        <button
            className="
        w-full flex items-center gap-2
        px-4 py-2 text-sm
        hover:bg-gray-100
      "
        >
            <img src={icon} alt="" className="h-4 w-4" />
            {label}
        </button>
    );
}
function CurrencyPill({ label, icon }) {
    return (
        <div className="flex justify-center items-center gap-2 bg-[#EBEBEB] border rounded-xl px-3 py-3 w-[160px]">
            <img src={icon} className="h-5 w-5 rounded-full" alt="" />
            <span className="text-[20px] font-bold">{label}</span>
        </div>
    );
}

function Select({ value }) {
    return (
        <select className="w-full h-12 rounded-xl border px-4 text-sm">
            <option>{value}</option>
        </select>
    );
}

function SummaryRow({ label, value, bold, info }) {
    return (
        <>
            <span className="text-gray-500 text-[16px]">{label}</span>

            <span
                className={`text-right flex items-center justify-end gap-2
        ${bold ? "font-semibold" : "font-medium"}`}
            >
                {value}
                {info && info}
            </span>
        </>
    );
}


const OPTIONS = [
    "Self",
    "Salary",
    "Gift",
    "Income",
    "Savings",
    "Educational support",
    "Payment",
];

function PurposeCodeSelect() {
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState("down");
    const [value, setValue] = useState("Gift");
    const wrapperRef = useRef(null);

    const toggle = () => {
        const rect = wrapperRef.current.getBoundingClientRect();
        setDirection(rect.top > window.innerHeight / 2 ? "up" : "down");
        setOpen(v => !v);
    };

    useEffect(() => {
        const handler = (e) => {
            if (!wrapperRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            {/* INPUT */}
            <button
                onClick={toggle}
                className="w-full h-12 rounded-xl border px-4 flex justify-between items-center"
            >
                <span className="text-gray-700">{value}</span>
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" />
                </svg>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className={`absolute left-0 w-full bg-white rounded-xl shadow-lg border
          ${direction === "down" ? "top-[110%]" : "bottom-[110%]"}`}
                >
                    {OPTIONS.map(opt => (
                        <div
                            key={opt}
                            className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setValue(opt);     // ✅ set value
                                setOpen(false);    // ✅ close dropdown
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function FeeInfo() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative inline-block ">
            {/* i BUTTON */}
            <button onClick={() => setOpen(v => !v)}>
                <img src="/icons/i.svg" alt="info" />
            </button>

            {/* POPUP */}
            {open && (
                <div className="w-[320px] absolute  top-10 right-full  -translate-y-1/2 ml-4 bg-white rounded-2xl shadow-xl p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fixed cost per transaction</span>
                        <span className="font-medium">USD 10</span>
                    </div>

                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-500">Payout fee (0.50%)</span>
                        <span className="font-medium">USD 0.45</span>
                    </div>
                </div>
            )}
        </div>
    );
}