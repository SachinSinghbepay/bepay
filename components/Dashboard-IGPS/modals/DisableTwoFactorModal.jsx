"use client";

import { useState } from "react";
import ModalFrame from "./ModalFrame";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { IgpsService } from "../../../services/igpsService";



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
    <ModalFrame size="md">
      <div className="bg-white rounded-3xl p-8">
        {mode === "form" ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Disable two-factor authentication
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Enter your password to confirm.
                </p>
              </div>

              <button onClick={onClose} className="cursor-pointer">
                <FiX size={20} />
              </button>
            </div>

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
              className="w-full h-14 rounded-2xl border px-4 outline-none focus:border-black transition mb-6"
            />

            <button
              onClick={handleDisable}
              disabled={loading || !password}
              className="w-full h-14 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Disabling..." : "Disable 2FA"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-6">
              ✓
            </div>

            <h2 className="text-xl font-semibold">
              Two-factor authentication disabled
            </h2>

            <button
              onClick={onClose}
              className="mt-8 px-6 py-3 rounded-full bg-black text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </ModalFrame>
  );
}
