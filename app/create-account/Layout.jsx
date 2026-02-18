"use client";

import Image from "next/image";

export default function CreateAccountLayout({ children, stepKey }) {
    return (
        <div className="flex h-screen w-full font-sans bg-[#F6F6F6] overflow-hidden">

            {/* LEFT SIDE (STATIC) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/signup.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                    />
                </div>

                <div className="relative z-10 py-12 max-w-lg h-full text-white">
                    <div className="flex flex-col justify-between h-full py-20">
                        <h1 className="text-[31px] leading-tight tracking-tight">
                            MOVE MONEY GLOBALLY. <br />
                            <span className="font-bold">INSTANTLY.</span>
                        </h1>

                        <p className="mt-6 text-sm text-gray-200">
                            Accept crypto or fiat payments, get USD & EUR business accounts,
                            off-ramp stablecoins to your local bank, and send instant global payouts —
                            all from one simple dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col items-center h-[830px] overflow-hidden -pb-12">

                {/* Logo */}
                <div className="flex justify-center items-center mb-12 mt-12 shrink-0">
                    <img src="/bepayicon.png" alt="Logo" className="w-10 h-10 mr-2" />
                    <div className="font-bold text-xl tracking-tight">
                        bepay <span className="font-light">IGPS</span>
                    </div>
                </div>

                {/* Card Wrapper (THIS CONTROLS HEIGHT) */}
                <div className="flex-1 w-full flex justify-center px-8 overflow-hidden">

                    <div
                        key={stepKey}
                        className="bg-white rounded-3xl shadow-sm w-full max-w-xl h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
                    >
                        {children}
                    </div>

                </div>

                {/* Bottom Link */}
                <div className="text-center mt-8 text-sm text-gray-500 shrink-0">
                    Already have an account?{" "}
                    <span className="font-semibold text-black cursor-pointer">
                        Login
                    </span>
                </div>
            </div>

        </div>
    );
}
