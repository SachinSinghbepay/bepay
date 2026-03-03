import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useState, useEffect, useRef } from "react";
import MultiSelect from "../components/MultiSelect";
import Image from "next/image";

export default function PayToEmailModal({ onClose, onBack, beneficiary,
    onOpenModal }) {
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

    const [emails, setEmails] = useState([]);
    const [currency, setCurrency] = useState("");
    const [purpose, setPurpose] = useState("");
    const [amount, setAmount] = useState("");

    const isFormValid =
        emails.length > 0 &&
        currency.trim() &&
        purpose.trim() &&
        Number(amount) > 0;

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    {/* Back */}
                    <button
                        className="absolute left-8 text-xl text-gray-500"
                        onClick={onBack}
                    >
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </button>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Pay to email
                    </h2>

                    {/* Close */}
                    <button
                        className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* SCROLLABLE BODY */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-10 py-8 space-y-8"
                >

                    {/* EMAIL */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-[#6A6A6A]">Email</label>
                            <button className="text-sm underline">
                                Add new email contact +
                            </button>
                        </div>

                        <MultiSelect
                            options={[
                                "Adarsh Mohan (adarsh@bepay.money)",
                                "Chahat Soni (chahatsoni9@gmail.com)",
                                "Rahul Yadav (rahulyadav12@gmail.com)",
                                "Priya Dhapa (priya321@gmail.com)",
                                "Arjun (arjunsharma@gmail.com)",
                            ]}
                            placeholder="Select an email contact"
                            value={emails}
                            onChange={setEmails}
                        />



                        <p className="text-xs text-gray-500 mt-2">
                            Funds will be sent to the selected email address. Please double-check to avoid losing funds.
                        </p>
                    </div>

                    {/* CURRENCY */}
                    <div>
                        <label className="text-sm font-medium text-[#6A6A6A]">Currency</label>
                        <CustomSelect
                            options={[
                                {
                                    label: "USDC (POL)",
                                    value: "USDC",
                                    icon: "/icons/usdc.svg"
                                },
                                {
                                    label: "USDT (TRX)",
                                    value: "USDT",
                                    icon: "/icons/usdt.svg"
                                },
                                {
                                    label: "BTC",
                                    value: "BTC",
                                    icon: "/icons/btc.svg"
                                }
                            ]}
                            placeholder="Select payment currency"
                            value={currency}
                            onChange={setCurrency}
                        />
                    </div>

                    {/* AMOUNT */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-[#6A6A6A]">Amount</label>
                            <span className="text-sm">
                                Available balance: <strong>$100.00</strong>
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount you want to send"
                                className="w-full rounded-xl border px-4 py-3 pr-28 text-[#C0C0C0]"
                            />

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 text-sm text-gray-500">
                                <button type="button">10%</button>
                                <button type="button">25%</button>
                                <button type="button">50%</button>
                                <button type="button">MAX</button>
                            </div>
                        </div>
                    </div>

                    {/* PURPOSE */}
                    <div>
                        <label className="text-sm font-medium text-[#6A6A6A]">Purpose</label>
                        <CustomSelect
                            options={["Gift", "Salary", "Payment", "Transfer"]}
                            placeholder="Select purpose"
                            value={purpose}
                            onChange={setPurpose}
                        />
                    </div>

                    {/* NOTE */}
                    <div>
                        <label className="text-sm font-medium text-[#6A6A6A]">Note (Optional)</label>
                        <textarea
                            placeholder="Enter a note for this transaction"
                            className="w-full mt-2 rounded-xl border px-4 py-3 text-gray-700 resize-none"
                            rows={1}
                        />
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-2 gap-y-4 text-sm pt-4 p-20">

                        <SummaryRow
                            label="You send"
                            value="0"
                        />

                        <SummaryRow
                            label="Network fee"
                            value="Free"
                        />

                        <SummaryRow
                            label="Recipient will receive"
                            value="0"
                            bold
                        />
                        <SummaryRow
                            label="Processing time"
                            value="1–3 business days"
                        />
                    </div>
                    {/* FOOTER */}
                    <div className=" py-6 bg-white">
                        <button
                            onClick={() =>
                                onOpenModal("confirm-globalpayout", {
                                    onBack: () => onOpenModal("pay-to-email"),
                                    onConfirm: () => onOpenModal("payment-sent")
                                })
                            }
                            disabled={!isFormValid}
                            className={`w-full py-4 rounded-2xl transition-colors duration-200
                    ${isFormValid
                                    ? "bg-black text-white"
                                    : "bg-[#6A6A6A] text-white cursor-not-allowed"
                                }`}
                        >
                            Send payment
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-3">
                            Once your payment is sent, we&apos;ll automatically notify the recipient by email.
                        </p>
                    </div>
                </div>

            </div>
        </ModalFrame>
    );
}


function SummaryRow({ label, value, bold }) {
    return (
        <>
            <span className="text-gray-500 text-[16px]">{label}</span>

            <span
                className={`text-right flex items-center justify-end gap-2
        ${bold ? "font-semibold" : "font-medium"}`}
            >
                {value}
            </span>
        </>
    );
}