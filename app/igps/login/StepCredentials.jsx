"use client";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function StepCredentials({
  email,
  password,
  setEmail,
  setPassword,
  loading,
  error,
  success,
  onSubmit,
  onForgot
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-xl   flex flex-col justify-between">
      <div className="rounded-3xl  p-6 py-3">
        <h2 className="text-center text-xl font-bold mb-4">
          Login <span className="font-medium text-[#6A6A6A]"> to your bepay IGPS account</span>
        </h2>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 mb-4">
            {error}
          </div>
        )}

        {/* Google Button */}
        <button
          type="button"
          className="mt-1 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative flex py-4 items-center mt-0">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4  text-sm">Or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black pr-10 transition"
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
          <div className="flex gap-2 justify-between items-center ">
            <div className="flex gap-2 items-center text-[#080808]">
              <input type="checkbox" className="w-5 h-5 border border-[#C0C0C080]" />
              <p className="text-sm">Remember me</p>
            </div>
            <div>
              <p
                onClick={onForgot}
                className="underline text-sm cursor-pointer"
              >
                Forgot password?
              </p>
            </div>
          </div>
          <button
            onClick={onSubmit}
            disabled={loading || success}
            className={`mt-2 w-full h-10 md:h-16 rounded-xl font-medium transition
    ${success
                ? "bg-green-600 text-white"
                : "bg-black hover:bg-gray-800 text-white"}
  `}
          >
            {success
              ? "Logged in, redirecting..."
              : loading
                ? "Logging in..."
                : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}