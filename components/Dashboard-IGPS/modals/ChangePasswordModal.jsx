"use client";

import { useState, useRef, useEffect } from "react";
import ModalFrame from "./ModalFrame";
import { FiX, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
export default function ChangePasswordModal({ onClose, onSubmit }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mode, setMode] = useState("form");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { igpsService } = useAuth();
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    // 🔐 Password rules
    const rules = {
        length: newPassword.length >= 8,
        number: /[0-9]/.test(newPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
    };

    const allRulesValid = Object.values(rules).every(Boolean);
    const passwordsMatch = confirmPassword === newPassword && confirmPassword !== "";
    const showMismatch =
        confirmPassword.length > 0 && confirmPassword !== newPassword;

    const isValid =
        currentPassword.length > 0 &&
        allRulesValid &&
        passwordsMatch;


    const handleSubmit = async () => {
        if (!isValid || loading) return;

        setLoading(true);
        setError("");

        try {
            const res = await igpsService.changePassword({
                currentPassword,
                newPassword,
            });

            if (res.success) {
                setMode("success");

                // Optional auto close
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setError(res.error || "Failed to update password");
            }

        } catch (err) {
            setError("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <ModalFrame size="">
            <div className="flex flex-col h-full bg-white rounded-3xl p-8 max-h-[90vh] overflow-hidden">

                {mode === "form" ? (
                    <>
                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Change password
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Update your password to keep your account secure
                                </p>
                            </div>

                            <button onClick={onClose} className="cursor-pointer">
                                <FiX size={20} />
                            </button>
                        </div>
                        {/* BODY */}
                        <div
                            ref={scrollRef}
                            className="space-y-6 overflow-y-auto flex-1 pr-2"
                            style={{ scrollbarGutter: "stable" }}>

                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    placeholder="Current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full h-14 rounded-2xl border px-4 pr-12 outline-none focus:border-black transition"
                                />
                                <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                    {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-14 rounded-2xl border px-4 pr-12 outline-none focus:border-black transition"
                                />
                                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                    {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 text-sm">
                                <RuleItem valid={rules.length} label="At least 8 characters long" />
                                <RuleItem valid={rules.number} label="At least one number" />
                                <RuleItem valid={rules.special} label="At least one special character" />
                                <RuleItem valid={rules.uppercase} label="At least one uppercase letter" />
                                <RuleItem valid={rules.lowercase} label="At least one lowercase letter" />
                            </div>

                            <div>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full h-14 rounded-2xl border px-4 pr-12 outline-none transition
                        ${showMismatch ? "border-red-500 focus:border-red-500" : "focus:border-black"}
                    `}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                        {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>

                                {showMismatch && (
                                    <p className="text-sm text-red-500 mt-2">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>
                            {error && (
                                <p className="text-sm text-red-500 mt-2">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* FOOTER — outside scroll, always at bottom */}
                        <div className="flex gap-4 pt-6">
                            <button
                                onClick={onClose}
                                className="flex-1 h-14 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={!isValid || loading}
                                className={`flex-1 h-14 rounded-lg text-white font-medium transition
                                ${isValid && !loading
                                        ? "bg-black hover:bg-gray-800"
                                        : "bg-gray-300 cursor-not-allowed"}
                                `}
                            >
                                {loading ? "Updating..." : "Update password"}
                            </button>
                        </div>


                    </>
                ) : (
                    /* ================= SUCCESS SCREEN ================= */
                    <div className="flex flex-col items-center justify-center py-16 text-center">

                        <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-6">
                            <FiCheck className="text-white" size={32} />
                        </div>

                        <h2 className="text-2xl font-semibold mb-2">
                            Password updated!
                        </h2>

                        <p className="text-gray-500">
                            Your password has been successfully updated.
                        </p>

                        {/* <button
                            onClick={onClose}
                            className="mt-8 px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                        >
                            Close
                        </button> */}
                    </div>
                )}


            </div>

        </ModalFrame>
    );
}

/* Rule Component */
function RuleItem({ valid, label }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition
                    ${valid ? "bg-green-500" : "bg-gray-200"}
                `}
            >
                <FiCheck
                    size={12}
                    className={valid ? "text-white" : "text-gray-400"}
                />
            </div>
            <span className={valid ? "text-green-600" : "text-gray-500"}>
                {label}
            </span>
        </div>
    );
}
