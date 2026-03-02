"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function DummyProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const displayName = "Chahat";
  const email = "chahat@example.com";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* TRIGGER */}
      <div className="flex justify-around items-center bg-[#EBEBEB] py-2 rounded-2xl shadow-sm w-[170px] md:w-[342px]">

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#D1D1D1] p-[2px]">
            <div className="h-full w-full rounded-lg overflow-hidden bg-[#B6B6B6]">
              <Image
                src="/profile.png"
                alt="profile"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <span className="text-sm font-semibold text-[#414141] truncate max-w-[140px] sm:max-w-[200px]">
            {displayName}
          </span>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-3 flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 transition"
          aria-label="Open profile menu"
        >
          <svg
            className={`h-4 w-4 text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-4 w-[200px] md:w-[342px] rounded-3xl bg-white shadow-xl px-4 py-8 z-50">

          <div className="mb-4">
            <p className="font-medium text-[18px] text-[#080808] mb-2 truncate">
              {displayName}
            </p>
            <p className="text-[16px] text-[#6A6A6A] truncate">
              {email}
            </p>
          </div>

          <div className="border-t my-6" />

          <div className="space-y-2">
            <MenuItem label="Profile" />
            <MenuItem label="Logout" />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ label }) {
  return (
    <button
      className="w-full text-left px-4 py-5 rounded-2xl text-[16px] font-medium transition text-gray-700 hover:bg-gray-50"
    >
      {label}
    </button>
  );
}