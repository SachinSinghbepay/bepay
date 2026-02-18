"use client";

import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function StepPersonalDetails({ data, setData, onNext, onBack }) {
    const [agree, setAgree] = useState(false);

    const password = data.password || "";

    // 🔐 Password rule checks
    const hasMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    const passwordsMatch =
        data.confirmPassword &&
        data.confirmPassword === password;

    const isPasswordValid =
        hasMinLength &&
        hasNumber &&
        hasSpecial &&
        hasUpper &&
        hasLower;

    const isValid =
        data.firstName?.trim().length > 0 &&
        isPasswordValid &&
        passwordsMatch &&
        agree;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onNext();
    };

    const Rule = ({ condition, text }) => (
        <p className={`flex items-center gap-2 ${condition ? "text-green-600" : "text-gray-500"}`}>
            <span className={`text-lg ${condition ? "text-green-600" : "text-gray-400"}`}>
                ✓
            </span>
            {text}
        </p>
    );

    return (
        <div className="flex flex-col h-[630px] p-10 pr-0">

            <div className="flex-1 overflow-y-auto pr-2">

                <h2 className="text-2xl font-semibold mb-2">
                    Create your account
                </h2>

                <p className="text-gray-500 mb-8">
                    Enter your details to set up your IGPS account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* First Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            First name
                        </label>
                        <input
                            value={data.firstName || ""}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    firstName: e.target.value
                                }))
                            }
                            placeholder="Enter your first name"
                            className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            Last name (Optional)
                        </label>
                        <input
                            value={data.lastName || ""}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    lastName: e.target.value
                                }))
                            }
                            placeholder="Enter your last name"
                            className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-2">
                            Create a password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }
                            placeholder="Enter a new password"
                            className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Password Rules */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <Rule condition={hasMinLength} text="At least 8 characters long" />
                        <Rule condition={hasNumber} text="At least one number" />
                        <Rule condition={hasSpecial} text="At least one special character" />
                        <Rule condition={hasUpper} text="At least one uppercase letter" />
                        <Rule condition={hasLower} text="At least one lowercase letter" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-2">
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            value={data.confirmPassword || ""}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))
                            }
                            placeholder="Confirm new password"
                            className={`w-full h-14 rounded-2xl border px-4 outline-none transition
                                ${passwordsMatch ? "focus:border-black" : "border-red-300 focus:border-red-400"}
                            `}
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={() => setAgree(!agree)}
                            className="mt-1 w-5 h-5 accent-black"
                        />
                        <p className="text-sm text-gray-600">
                            I agree to the{" "}
                            <span className="underline cursor-pointer">
                                terms and conditions
                            </span>{" "}
                            and{" "}
                            <span className="underline cursor-pointer">
                                privacy policy
                            </span>
                        </p>
                    </div>

                </form>

                <div className="pt-6">

                    <button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`w-full h-14 rounded-full text-white font-medium transition
                            ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}
                        `}
                    >
                        Create account
                    </button>

                    <div
                        onClick={onBack}
                        className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-black transition mt-6 cursor-pointer"
                    >
                        <FiChevronLeft size={16} />
                        Change email
                    </div>

                </div>
            </div>
        </div>
    );
}
