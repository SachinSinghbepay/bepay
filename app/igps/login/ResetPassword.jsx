"use client";

import { useRef, useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";


export default function ResetPassword({
    data,
    setData,
    onNext,
    onBack,
    loading,
    success
}) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const password = data.newPassword || "";

    const isOtpValid = otp.every((digit) => digit !== "");
    const isPasswordValid = password.length >= 8;
    const isValid = isOtpValid && isPasswordValid;

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        const fullOtp = otp.join("");

        onNext({
            otp: fullOtp,
            newPassword: password
        });
    };


    return (
        <div className="w-full max-w-xl flex flex-col justify-between">
            <div className="rounded-3xl px-10 py-4">

                <h2 className="text-center text-xl font-medium mb-6">
                    Reset <span className="font-semibold">Password</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* OTP SECTION */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-3">
                            Enter 6-digit code
                        </label>

                        <div className="flex justify-between gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    autoComplete="one-time-code"
                                    name={`otp-${index}`}
                                    value={digit}
                                    onChange={(e) =>
                                        handleOtpChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, index)
                                    }
                                    className="w-14 h-14 rounded-xl border text-center text-lg font-medium focus:border-black outline-none transition"
                                />
                            ))}
                        </div>
                    </div>

                    {/* PASSWORD SECTION */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                name="new-password"
                                value={password}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                placeholder="Enter new password"
                                className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black transition pr-10"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-400"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`w-full h-14 rounded-xl font-medium transition
    ${success
                                ? "bg-green-600 text-white"
                                : isValid
                                    ? "bg-black hover:bg-gray-800 text-white"
                                    : "bg-gray-300 text-white cursor-not-allowed"
                            }
  `}
                    >
                        {success
                            ? "Password changed, login"
                            : loading
                                ? "Resetting password..."
                                : "Reset Password"}
                    </button>
                </form>

                <div
                    onClick={onBack}
                    className="flex items-center justify-center gap-1 text-sm font-semibold hover:text-black transition mt-6 cursor-pointer"
                >
                    <FiChevronLeft size={16} />
                    Back to login
                </div>

            </div>
        </div>
    );
}