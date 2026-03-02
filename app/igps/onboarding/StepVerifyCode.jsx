"use client";

import { useRef, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function StepVerifyCode({ data, setData, onNext, onBack }) {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const isValid = code.every((digit) => digit !== "");

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...code];
        updated[index] = value;
        setCode(updated);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        // Pass code directly instead of relying on state sync
        const fullCode = code.join("");
        
        // Update parent state first
        setData((prev) => ({
            ...prev,
            verificationCode: fullCode
        }));

        // Then call parent handler with the code
        onNext(fullCode);
    };

    return (
        <div className="flex flex-col h-[500px] p-10">

            <div className="flex-1">

                <h2 className="text-xl font-medium mb-3">
                    Verify your <span className="font-semibold">email</span>
                </h2>

                <p className="text-sm text-gray-500 mb-8">
                    We've sent a 6-digit authentication code to{" "}
                    <span className="font-medium text-black">
                        {data.email?.replace(/(.{2}).+(@.+)/, "$1*****$2")}
                    </span>.
                    <br />
                    Enter the code below to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm text-gray-600 mb-3">
                            Authentication code
                        </label>

                        <div className="flex justify-between gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, index)
                                    }
                                    className="w-14 h-14 rounded-xl border text-center text-lg font-medium focus:border-black outline-none transition"
                                />
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">
                        Code expires in 10 minutes.
                    </p>

                    <p className="text-sm text-gray-500">
                        Didn't receive the code?{" "}
                        <span className="text-black font-medium cursor-pointer">
                            Resend in 59 s
                        </span>
                    </p>

                </form>

            </div>

            {/* Bottom Section */}
            <div>

                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={` w-full h-10 md:h-16 rounded-xl text-white font-medium transition mt-20 md:mt-30
                        ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}
                    `}
                >
                    Verify code
                </button>

                <div
                    onClick={onBack}
                    className="flex items-center justify-center gap-1 text-sm font-semibold hover:text-black transition mt-6 cursor-pointer"
                >
                    <FiChevronLeft size={16} />
                    Change email
                </div>

            </div>

        </div>
    );
}
