"use client";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
export default function StepEmail({ data, setData, onNext, onGoogleSuccess }) {
    const isValid = data.email?.trim().length > 3;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onNext();
    };

    return (
        <>
            <div className="w-full max-w-xl   flex flex-col justify-between">

                <div className="rounded-3xl  px-10 py-4">


                    <h2 className="text-center text-xl font-medium mb-6">
                        Create a <span className="font-semibold">new account</span>
                    </h2>

                    {/* Google Button */}
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={() => console.log("Google signup failed")}
                        theme="outline"
                        size="large"
                        text="continue_with"
                    />

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
                                className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={` w-full h-10 md:h-16 rounded-xl text-white font-medium transition  mt-12 md:mt-22
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


            </div>
        </>
    );
}
