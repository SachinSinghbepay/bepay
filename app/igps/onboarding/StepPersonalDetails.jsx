"use client";

import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function StepPersonalDetails({ data, setData, onNext, onBack, loading }) {
    const [agree, setAgree] = useState(false);

    const password = data.password || "";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div className="w-full max-w-xl flex flex-col justify-between px-10 py-4">
            <div className="flex-1 overflow-y-auto pr-2  ">

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

                    {/* Organization Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            Organization Name
                        </label>
                        <input
                            value={data.organizationName || ""}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    organizationName: e.target.value
                                }))
                            }
                            placeholder="Enter your organization name"
                            className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-2">
                            Create a password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    {/* Password Rules */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-sm">
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
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
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
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-4 text-gray-400"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex justify-center items-center gap-3 pt-2">
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
                        disabled={!isValid || loading}
                        className={`mt-6 w-full h-10 md:h-16 rounded-xl text-white font-medium transition
    ${isValid && !loading
                                ? "bg-black hover:bg-gray-800"
                                : "bg-gray-300 cursor-not-allowed"}
  `}
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                    {/* <div
                        onClick={onBack}
                        className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-black transition mt-6 cursor-pointer"
                    >
                        <FiChevronLeft size={16} />
                        Change email
                    </div> */}

                </div>
            </div>
        </div>
    );
}
