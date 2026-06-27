"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function BlogLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/blog-auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Invalid credentials.");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/blogDashboard"), 800);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-[#ECEAE4] p-8">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">Blog CMS</p>
            <p className="text-[11px] text-[#9A9A8A]">Content Studio</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">Sign in</h1>
        <p className="text-sm text-[#6A6A5A] mb-7">Access the BePay content dashboard.</p>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#5A5A4A] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@bepay.money"
              className="w-full h-12 rounded-xl border border-[#E4E2DC] px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] transition placeholder:text-[#CCCCBC]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#5A5A4A] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl border border-[#E4E2DC] px-4 pr-11 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] transition placeholder:text-[#CCCCBC]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-3.5 text-[#AAAA9A] hover:text-[#5A5A4A] transition"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || success}
          className={`mt-6 w-full h-12 rounded-xl text-sm font-semibold transition ${
            success
              ? "bg-green-600 text-white"
              : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"
          } disabled:opacity-60`}
        >
          {success ? "Redirecting..." : loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  );
}
