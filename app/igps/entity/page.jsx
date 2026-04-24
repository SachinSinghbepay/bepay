"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EntitySelectPage() {
    const router = useRouter();

    const handleSelect = (type) => {
        if (type === "indian") {
            window.location.href = "https://igps.bepay.money";
        } else {
            router.push("/igps/login");
        }
    };

    return (
        <div className="min-h-screen w-full font-sans bg-[#F6F6F6] flex">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-70"
                    >
                        <source src="https://assets.bepay.money/website_assets/bg-video2.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="relative z-10 py-6 max-w-2xl text-white px-6 h-full">
                    <div className="flex flex-col justify-between h-full py-12">
                        <div>
                            <h1 className="text-[31px] leading-tight tracking-tight">
                                MOVE MONEY GLOBALLY. <br />
                            </h1>
                            <h1 className="font-bold text-[31px] leading-tight tracking-tight -mt-3">
                                INSTANTLY.
                            </h1>
                        </div>
                        <p className="mt-6 text-sm text-gray-200">
                            Accept crypto or fiat payments, get USD & EUR business accounts,
                            off-ramp stablecoins to your local bank, and send instant global
                            payouts — all from one simple dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col justify-evenly items-center px-6 py-4">
                <div className="flex items-center justify-center">
                    <Image src="/bepay_business_logo.png" alt="Logo" className="mr-2" width={180} height={180} />
                </div>

                <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="text-center text-xl font-bold mb-2">
                        Select Entity Type
                    </h2>
                    <p className="text-center text-sm text-[#6A6A6A] mb-8">
                        Please select the type of entity you are operating as.
                    </p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => handleSelect("international")}
                            className="w-full h-16 rounded-2xl border-2 border-gray-200 hover:border-black transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                        >
                            <span className="font-semibold text-gray-900">Global Entity</span>
                            <span className="text-xs text-[#6A6A6A]">Outside India</span>
                        </button>

                        <button
                            onClick={() => handleSelect("indian")}
                            className="w-full h-16 rounded-2xl border-2 border-gray-200 hover:border-black transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                        >
                            <span className="font-semibold text-gray-900">Indian Entity</span>
                            <span className="text-xs text-[#6A6A6A]">Based in India</span>
                        </button>
                    </div>
                </div>

                <div className="text-sm text-center text-transparent select-none">placeholder</div>
            </div>
        </div>
    );
}
