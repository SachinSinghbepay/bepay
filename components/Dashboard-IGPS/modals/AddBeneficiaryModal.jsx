import ModalFrame from "./ModalFrame";
import { useState, useEffect, useRef } from "react";

export default function AddBeneficiaryModal({ onClose, onBack }) {
    const [addBank, setAddBank] = useState(false);
    const [addWallet, setAddWallet] = useState(false);
    const [wallets, setWallets] = useState([{ id: 1 }]);
    const scrollRef = useRef(null);


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

    const removeWallet = (id) => {
        setWallets((prev) => {
            if (prev.length === 1) return prev; //  cannot remove last one
            return prev.filter((w) => w.id !== id);
        });
    };

    return (
        <ModalFrame size="lg">
            {/* HEADER */}
            <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                <button
                    onClick={onBack}
                    className="absolute left-8 text-xl text-gray-500"
                >
                    <img src="/icons/back.svg" alt="" />
                </button>

                <h2 className="text-lg font-medium">Add beneficiary</h2>

                <button
                    onClick={onClose}
                    className="absolute right-8 text-xl text-gray-500"
                >
                    ✕
                </button>
            </div>

            {/* BODY */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-8 py-6 space-y-6"
            >
                {/* NAME */}
                <div className="space-y-2">
                    <label className="text-sm text-[#6A6A6A]">Name</label>
                    <input
                        placeholder="Enter beneficiary name"
                        className="w-full mt-2 h-12 rounded-xl border px-4 outline-none text-[#C0C0C0]"
                    />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                    <label className="text-sm text-[#6A6A6A]">Email</label>
                    <input
                        placeholder="Enter beneficiary email"
                        className="w-full mt-2 h-12 rounded-xl border px-4 outline-none text-[#C0C0C0]"
                    />
                </div>

                {/* INFO */}
                <p className="text-[12px] text-gray-500 flex gap-2 -mt-2">
                    <span><img src="/icons/i.svg" alt="" /></span>
                    Funds will be sent to the selected email address. Please double-check
                    to avoid losing funds.
                </p>

                {/* OPTIONS */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <OptionCard
                        title="Add bank account"
                        desc="Add bank account details to send payments directly to a bank."
                        checked={addBank}
                        onChange={() => setAddBank(v => !v)}
                    />

                    <OptionCard
                        title="Add wallet address"
                        desc="Add cryptocurrency wallet addresses for direct Stablecoin payments via blockchain."
                        checked={addWallet}
                        onChange={() => setAddWallet(v => !v)}
                    />
                </div>
                {addBank && (
                    <div className="pt-8 space-y-6">

                        <Section title="Beneficiary type">
                            <Select placeholder="Select beneficiary type" />
                            <Select placeholder="Select beneficiary country" />
                        </Section>

                        <Section title="Beneficiary address">
                            <Input placeholder="Address line 1" />
                            <Input placeholder="Address line 2" />
                            <Grid3>
                                <Input placeholder="City" />
                                <Select placeholder="State" />
                                <Input placeholder="Zip / Pin code" />
                            </Grid3>
                            <PhoneInput />
                        </Section>

                        <Section title="Bank details">
                            <Input placeholder="Bank name" />
                            <Input placeholder="Address line 1" />
                            <Input placeholder="Address line 2" />
                            <Grid3>
                                <Input placeholder="City" />
                                <Select placeholder="State" />
                                <Input placeholder="Zip / Pin code" />
                            </Grid3>
                            <Select placeholder="Bank country" />
                        </Section>

                        <Section title="Account details">
                            <Input placeholder="Account holder name" />
                        </Section>
                        <Section title="Account type">
                            <Select placeholder="Account type" />
                        </Section>
                        <Section title="IBAN">
                            <Input placeholder="IBAN" />
                        </Section>
                        <Section title="Confirm IBAN">
                            <Input placeholder="Confirm IBAN" />
                        </Section>

                    </div>
                )}

                {addWallet && (
                    <div className="pt-8 space-y-6">
                        {wallets.map((w, i) => (
                            <WalletAddressBlock
                                key={w.id}
                                index={i + 1}
                                canRemove={wallets.length > 1}
                                onRemove={() => removeWallet(w.id)}
                            />
                        ))}
                        <button
                            onClick={() =>
                                setWallets(w => [...w, { id: Date.now() }])
                            }
                            className="w-full rounded-xl border border-dashed py-3 text-sm"
                        >
                            + Add another wallet address
                        </button>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="px-8 pb-8 pt-4 space-y-4">
                <button
                    disabled
                    className="w-full h-14 rounded-full bg-gray-400 text-white text-base"
                >
                    Add beneficiary
                </button>

                <button
                    onClick={onClose}
                    className="w-full text-center text-base"
                >
                    Cancel
                </button>
            </div>
        </ModalFrame>
    );
}

function OptionCard({ title, desc, checked, onChange }) {
    return (
        <label
            className={`cursor-pointer rounded-2xl p-5 border transition
        ${checked ? "border-black bg-white" : "bg-[#FAFAFA]"}`}
        >
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="mt-1 h-4 w-4 accent-black"
                />

                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>
            </div>
        </label>
    );
}

function WalletAddressBlock({ index, canRemove, onRemove }) {
    return (
        <div className="relative rounded-2xl bg-[#FAFAFA] px-4 py-7 space-y-4  ">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <p className="font-medium">Wallet address {index}</p>

                {canRemove && (
                    <button
                        onClick={onRemove}
                        className="text-gray-400 hover:text-gray-700 text-lg"
                        title="Remove wallet"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* NETWORK */}
            <select className="w-full rounded-xl border px-3 py-5 text-sm">
                <option>Select network</option>
            </select>

            {/* ADDRESS */}
            <div className="relative">
                <input
                    className="w-full rounded-xl border px-3 py-5 pr-16 text-sm"
                    placeholder="Enter wallet address"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    Paste
                </button>
            </div>

            <div className="text-[12px] text-orange-600 flex items-start gap-1">
                <img src="/icons/i.svg" alt="" className="w-4" />
                Please verify the wallet address and network carefully before sending funds to ensure a successful transfer. bepay IGPS will not be responsible for any errors or loss of funds.
            </div>
        </div>
    );
}


function Section({ title, children }) {
    return (
        <div className="space-y-3">
            {title && (
                <p className="text-sm font-medium text-gray-700">
                    {title}
                </p>
            )}
            {children}
        </div>
    );
}

function Select({ label, placeholder }) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm text-gray-600">
                    {label}
                </label>
            )}

            <select
                className="
          w-full
          h-12
          rounded-xl
          border
          px-4
          text-sm
          text-gray-700
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-black/10
        "
            >
                <option value="">{placeholder}</option>
            </select>
        </div>
    );
}

function Input({ label, placeholder, type = "text" }) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm text-gray-600">
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                className="
                    w-full
                    h-14
                    rounded-xl
                    border
                    px-4
                    text-sm
                    text-gray-700
                    outline-none
                    focus:ring-2
                    focus:ring-black/10
                "
            />
        </div>
    );
}

function Grid3({ children }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {children}
        </div>
    );
}

function PhoneInput({ label = "Phone number" }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-600">
                {label}
            </label>

            <div className="flex gap-3">
                {/* Country code */}
                <select
                    className="
                        h-12
                        rounded-xl
                        border
                        px-3
                        text-sm
                        bg-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-black/10
                    "
                >
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                    <option>+61</option>
                </select>

                {/* Phone number */}
                <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="
                        flex-1
                        h-12
                        rounded-xl
                        border
                        px-4
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-black/10
                    "
                />
            </div>
        </div>
    );
}

