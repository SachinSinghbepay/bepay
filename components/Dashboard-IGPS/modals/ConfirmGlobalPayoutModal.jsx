import ModalFrame from "./ModalFrame";
import Image from "next/image";
import { useEffect, useRef } from "react";
export default function ConfirmGlobalPayoutModal({
    onClose,
    onBack,
    onConfirm,
}) {

    const scrollRef = useRef(null);
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
            <div className="relative flex items-center justify-center px-8 pt-6">
                <button
                    onClick={onBack}
                    className="absolute left-8 text-xl text-gray-500"
                >
                    <img src="/icons/back.svg" alt="Back" />
                </button>

                <h2 className="text-lg font-medium">Confirm payment</h2>

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
                className=" flex-1 overflow-y-auto px-8 py-10 space-y-10 text-center">
                {/* FROM */}
                <div className="space-y-2">
                    <div className="flex justify-center items-center w-fit mx-auto gap-4">
                        <div className="h-10 w-10 rounded-xl bg-[#D1D1D1] p-[2px]">
                            <div className="h-full w-full rounded-lg overflow-hidden bg-[#B6B6B6]">
                                <Image
                                    src="/profile.png"
                                    alt="profile"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="font-semibold">bepay money europe S.R.L</p>
                            <p className="text-sm text-gray-500">
                                0xjcb38......7jhT49
                            </p>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mt-4">
                        <div className="relative">
                            <img
                                src='/icons/usdc.svg'
                                className="h-10 w-10 rounded-full"
                                alt=""
                            />
                            <img
                                src='/icons/polygon.png'
                                className="h-5 w-5 rounded-full absolute -bottom-0 -right-0 border p-0"
                                alt=""
                            />
                        </div>
                        <span className="font-semibold ">90.00 USDC</span>
                    </div>
                </div>

                {/* FLOW ICON */}
                <div className="flex justify-center">
                    <img src="/icons/connection.svg" alt="" />
                </div>

                {/* TO */}
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mt-2">
                    <div className="relative">
                        <img
                            src='/icons/usa.svg'
                            className="h-8 w-8 rounded-full"
                            alt=""
                        />
                    </div>
                    <span className="font-semibold ">79.50 USD</span>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <div className="flex items-center justify-center p-0 -mt-2">
                        <p className="text-[16px] text-gray-500 mt-4">
                            To
                        </p>
                    </div>
                    <div className="text-left ">
                        <p className="font-semibold">Nordek Fintech INC</p>
                        <p className="text-[#6A6A6A]">Cross river bank- <span className="font-semibold"> 7629849755</span>
                        </p>
                    </div>
                </div>
                {/* SUMMARY */}
                <div className="border-t pt-8 grid grid-cols-2 gap-y-4 text-sm">
                    <span className="text-gray-500">Exchange rate</span>
                    <span className="text-right font-semibold">
                        1 USDC = 1.00 USD
                    </span>

                    <span className="text-gray-500">You send</span>
                    <span className="text-right font-semibold flex items-center gap-2 justify-end ">
                       <div className="relative">
                            <img
                                src='/icons/usdc.svg'
                                className="h-6 w-6 rounded-full"
                                alt=""
                            />
                            <img
                                src='/icons/polygon.png'
                                className="h-4 w-4 rounded-full absolute -bottom-0 -right-0 border p-0"
                                alt=""
                            />
                        </div>
                        90.00 USDC
                    </span>

                    <span className="text-gray-500">Processing fee</span>
                    <span className="text-right font-semibold">USD 10.50</span>

                    <span className="font-medium">Recipient will receive</span>
                    <span className="text-right font-semibold flex items-center gap-2 justify-end">
                        <img src="/icons/usa.svg" className="h-4 w-4" />
                        USD 79.50
                    </span>

                    <span className="text-gray-500">Processing time</span>
                    <span className="text-right font-semibold">
                        1–3 business days
                    </span>
                </div>
                {/* FOOTER */}
                <div className="px-8 pb-8 space-y-4">
                    <button
                        onClick={onConfirm}
                        className="w-full h-14 rounded-2xl bg-black text-white text-base"
                    >
                        Confirm payment
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-center text-base"
                    >
                        Cancel
                    </button>
                </div>
            </div>


        </ModalFrame >
    );
}
