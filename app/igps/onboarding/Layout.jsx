"use client";

import Image from "next/image";
import ScrollableCard from "../login/ScrollableCard";
import Link from "next/link";

export default function CreateAccountLayout({ children }) {
  return (
    <div className="min-h-screen w-full font-sans bg-[#F6F6F6] flex">

      {/* LEFT SIDE (STATIC) */}
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
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 py-6 max-w-2xl text-white px-6 h-full">
          <div className="flex flex-col justify-between h-full py-12">
            <div>
              <h1 className="text-[31px] leading-tight tracking-tight">
                MOVE MONEY GLOBALLY. <br />
              </h1>
              <h1 className="font-bold  text-[31px] leading-tight tracking-tight -mt-3">
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

        {/* Logo */}
        <div>
          <div className="flex items-center justify-center">
            <Image src="/bepay_business_logo.png" alt="Logo" className="mr-2" width={180} height={180} />
            {/* <div className="font-bold text-xl tracking-tight">
                            bepay <span className="font-light">IGPS</span>
                        </div> */}
          </div>
        </div>

        {/* Card Wrapper (THIS CONTROLS HEIGHT) */}
        <div className="w-full max-w-xl">
          <ScrollableCard>{children}</ScrollableCard>
        </div>

        {/* Bottom Link */}
        <div className="text-sm text-center">
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
