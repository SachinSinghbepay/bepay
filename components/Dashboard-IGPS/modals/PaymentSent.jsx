import ModalFrame from "./ModalFrame";
import Image from "next/image";

export default function PaymentSent({
    onClose,
    onSendAnother,
}) {
    return (
        <ModalFrame size="lg">
            {/* CLOSE */}
            <button
                onClick={onClose}
                className="absolute right-8 top-6 text-xl text-gray-400 cursor-pointer"
            >
                <Image src="/icons/close.png" alt="close" width={16} height={16} />
            </button>

            {/* CONTENT */}
            <div className="flex flex-col h-full px-10 text-center">

                {/* ===== MIDDLE (ICON + TEXT) ===== */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* CHECK ICON */}
                    <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center mb-6 mt-16">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-[32px] font-semibold mb-3">
                        Payment sent!
                    </h2>

                    {/* SUBTITLE */}
                    <p className="">
                        10 USDC (POL) has been sent to chahatsoni19@gmail.com.
                    </p>
                    <br />
                    <p className="text-[#6A6A6A] max-w-full">
                        Your payment is being processed. We’ll notify you & the recepient via email once it’s successful.
                    </p>
                </div>

                {/* ===== BOTTOM ACTIONS ===== */}
                <div className="pb-8 space-y-4">
                    <button
                        onClick={onSendAnother}
                        className="w-full h-14 rounded-2xl border text-base font-medium"
                    >
                        Send another payment
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium"
                    >
                        Done
                    </button>
                </div>

            </div>

        </ModalFrame>
    );
}
