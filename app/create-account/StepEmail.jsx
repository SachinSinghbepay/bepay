"use client";

import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FiChevronLeft } from "react-icons/fi";

export default function StepEmail({ data, setData, onNext }) {
    const isValid = data.email?.trim().length > 3;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onNext();
    };

    return (
        <div className="flex h-screen w-full font-sans bg-[#F6F6F6]  overflow-hidden">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/signup.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                    />
                </div>

                <div className="relative z-10 p-12 max-w-lg text-white">
                    <div className="flex flex-col h-full">
                        <h1 className="text-[31px] leading-tight tracking-tight">
                            MOVE MONEY GLOBALLY. <br />
                            <span className="text-white font-bold">INSTANTLY.</span>
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
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8">

                <div className="w-full max-w-xl   flex flex-col justify-between">

                    <div className="bg-white rounded-3xl  shadow-sm p-10">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="font-bold text-xl tracking-tight">
                                bepay <span className="font-light">IGPS</span>
                            </div>
                        </div>

                        <h2 className="text-center text-xl font-medium mb-6">
                            Create a <span className="font-semibold">new account</span>
                        </h2>

                        {/* Google Button */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="relative flex py-6 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4  text-sm">Or</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email || ""}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }
                                    placeholder="Enter your email"
                                    className="w-full h-12 rounded-xl border px-4 outline-none focus:border-black transition"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`w-full h-12 rounded-xl text-white font-medium transition mt-25
                ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}
              `}
                            >
                                Send code
                            </button>
                        </form>

                        {/* Back */}
                        <div className="text-center mt-6">
                            <Link
                                href="/igps/login"
                                className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-black transition"
                            >
                                <FiChevronLeft size={16} />
                                Back to login
                            </Link>
                        </div>
                    </div>
                    {/* Bottom Link */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        New to bepay IGPS?{" "}
                        <span className="font-semibold text-black cursor-pointer">
                            Create account
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
}
