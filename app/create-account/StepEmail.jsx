"use client";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function StepEmail({ data, setData, onNext }) {
    const isValid = data.email?.trim().length > 3;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onNext();
    };

    return (
        <>
            <div className="w-full max-w-xl   flex flex-col justify-between">

                <div className="rounded-3xl  p-10">


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
                                className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black transition"
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
               

            </div>
        </>
    );
}
