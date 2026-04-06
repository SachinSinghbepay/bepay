"use client";

import Image from "next/image";
import ScrollableCard from "../igps/login/ScrollableCard";
import Link from "next/link";

export default function CreateAccountLayout({ children }) {
    return (
        <div className="min-h-screen w-full font-sans bg-[#F6F6F6] flex">

            {/* LEFT SIDE (STATIC) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/signup.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                    />
                </div>

                <div className="relative z-10 py-12 max-w-xl text-white px-8 h-full">
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
            <div className="w-full lg:w-1/2 flex flex-col items-center px-6 py-12">

                {/* Logo */}
                <div className="mb-12">
                    <div className="flex items-center justify-center">
                        <img src="/bepayicon.png" alt="Logo" className="w-10 h-10 mr-2" />
                        <div className="font-bold text-xl tracking-tight">
                            bepay <span className="font-light">IGPS</span>
                        </div>
                    </div>
                </div>

                {/* Card Wrapper (THIS CONTROLS HEIGHT) */}
                <div className="w-full max-w-xl">
                    <ScrollableCard>{children}</ScrollableCard>
                </div>

                {/* Bottom Link */}
                <div className="mt-10 text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/igps/login">
                        <span className="font-semibold text-black cursor-pointer">
                            Login
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    );
}
