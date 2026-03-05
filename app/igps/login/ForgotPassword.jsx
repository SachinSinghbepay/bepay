"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ForgotPassword({ data, setData, onNext }) {

  const email = data.email || "";


  const isValid =
    email.trim().length > 3 ;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onNext(); 
  };

  return (
    <div className="w-full max-w-xl flex flex-col justify-between">
      <div className="rounded-3xl px-10 py-4">

        <h2 className="text-center text-xl font-medium mb-6">
          Get a <span className="font-semibold">Code</span>
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  email: e.target.value
                }))
              }
              placeholder="Enter your email"
              className="w-full h-14 rounded-xl border px-4 outline-none focus:border-black transition"
              required
            />
          </div>

  
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full h-14 rounded-xl text-white font-medium transition mt-6
              ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            Get a Code
          </button>
        </form>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            href="/igps/login"
            className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-black transition"
          >
            <FiChevronLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}