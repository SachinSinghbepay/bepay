"use client";

import { useState } from "react";
import ModalFrame from "./ModalFrame";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";



export default function DisableTwoFactorModal({ onClose }) {
  const { igpsService } = useAuth();
  const { refreshUser } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("form");

  const handleDisable = async () => {
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await igpsService.disableTwoFactor(password);

      if (res.success) {
        await refreshUser();   // 🔥 important
        setMode("success");
      } else {
        setError(res.message || "Failed to disable 2FA");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalFrame size="md" height="h-auto">
      <div className="bg-white rounded-3xl flex flex-col" style={{ minHeight: "380px" }}>
        {mode === "form" ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-start px-8 pt-8 pb-4">
              <div>
                <h2 className="text-xl font-semibold">Disable two-factor authentication</h2>
                <p className="text-sm text-gray-500 mt-2">Enter your password to confirm.</p>
              </div>
              <button onClick={onClose} className="cursor-pointer ml-4 shrink-0">
                <Image src="/icons/close.png" alt="close" width={16} height={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 px-8 pb-4">
              {error && (
                <div className="p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition"
              />
            </div>

            {/* CTA pinned to bottom */}
            <div className="px-8 pb-8 mt-auto">
              <button
                onClick={handleDisable}
                disabled={loading || !password}
                className="w-full h-14 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Disabling..." : "Disable 2FA"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="relative flex items-center justify-center px-8 pt-8 pb-4">
              <h2 className="text-lg font-medium">2FA Disabled</h2>
              <button onClick={onClose} className="absolute right-8 cursor-pointer">
                <Image src="/icons/close.png" alt="close" width={16} height={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">✓</div>
              <p className="text-xl font-semibold">Two-factor authentication disabled</p>
            </div>

            {/* CTA pinned to bottom */}
            <div className="px-8 pb-8 mt-auto">
              <button
                onClick={onClose}
                className="w-full h-14 rounded-2xl bg-black text-white font-medium cursor-pointer hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </ModalFrame>
  );
}
