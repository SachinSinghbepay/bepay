"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IgpsService } from "@/services/igpsService";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const igpsService = new IgpsService();

export default function IgpsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [step, setStep] = useState("credentials");
  const [twoFactorData, setTwoFactorData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.login({ email, password });
      if (response.success) {
        // 🔐 If 2FA required
        if (response.data.requiresTwoFactor) {
          setTwoFactorData(response.data);
          setStep("2fa");
          return;
        }

        // ✅ Normal login
        const { accessToken, refreshToken } = response.data.tokens;

        document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

        igpsService.setTokens(accessToken, refreshToken);
        
        router.push("/igps/dashboard");
        router.refresh();
      } else {
        setError(
          response.error ||
            response.message ||
            "Login failed. Please check your credentials.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = React.useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.verifyTwoFactorLogin({
        userId: twoFactorData.userId,
        token: otp.join(""),
        twoFactorToken: twoFactorData.twoFactorToken,
        isBackupCode: false,
      });

      if (response.success) {
        const { accessToken, refreshToken } = response.data.tokens;

        document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

        igpsService.setTokens(accessToken, refreshToken);

        router.push("/igps/dashboard");
        router.refresh();
      } else {
        setError(response.message || "Invalid code");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gray-900">
          {/* Replace with actual image asset when available */}
          {/* <Image src="/path/to/image.jpg" alt="Login Visual" fill className="object-cover opacity-60" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80"></div>
        </div>

        <div className="relative z-10 p-12 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
            MOVE MONEY <br />
            GLOBALLY. <br />
            <span className="text-lime-400">INSTANTLY.</span>
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-left space-y-2">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-2xl tracking-tighter">
                bepay <span className="font-light">IGPS</span>
              </div>
              {/* <Image src="/logo.png" alt="Logo" width={100} height={30} /> */}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Login to your bepay IGPS account
            </h2>
            <p className="text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Social Login */}
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              onClick={() => alert("Google login integration pending")}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          {step === "credentials" ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white bg-black hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerify2FA}>
              <div>
                <h3 className="text-lg font-semibold">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Enter the 6-digit code from your authenticator app.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-3">Authentication code</p>

                <div className="flex gap-3 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="
                        w-14 h-16
                        text-center
                        text-xl
                        font-semibold
                        rounded-2xl
                        border
                        border-gray-300
                        focus:border-black
                        focus:ring-2
                        focus:ring-black
                        outline-none
                        transition
                        "
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Code expires in 10 minutes.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="w-full py-3 rounded-lg text-white bg-black hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="text-sm text-gray-500 underline"
              >
                Back
              </button>
            </form>
          )}

          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/igps/signup"
              className="font-bold text-black hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
