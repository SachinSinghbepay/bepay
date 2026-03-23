"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const titleMap = {
  posts:      "All Posts",
  "new-post": "New Post",
  topics:     "Topics",
  media:      "Media Library",
  settings:   "Settings",
};

export default function BlogTopHeader({ activePage, onMenuClick, onNewPost }) {
  const [open, setOpen]       = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef           = useRef(null);
  const router                = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/blog-auth/logout", { method: "POST" });
    } finally {
      router.push("/blogDashboard/login");
    }
  };

  return (
    <div className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-[#ECEAE4] bg-[#FAFAF8] sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition"
        >
          <span className="text-lg">☰</span>
        </button>

        <div>
          <h2 className="text-base font-semibold text-[#1A1A1A]">
            {titleMap[activePage] || "Blog CMS"}
          </h2>
          <p className="text-[11px] text-[#9A9A8A] hidden sm:block">
            {activePage === "posts"    && "Manage your blog content"}
            {activePage === "new-post" && "Write something great"}
            {activePage === "topics"   && "Organise content by topic"}
            {activePage === "media"    && "Images, videos, and files"}
            {activePage === "settings" && "Site and SEO configuration"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* New Post button */}
        {activePage !== "new-post" && (
          <button
            onClick={onNewPost}
            className="flex items-center gap-1.5 bg-[#1A1A1A] text-white text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-[#2A2A2A] transition"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        )}

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-1.5 pl-0.5 pr-2 py-0.5 rounded-xl hover:bg-[#EFEDE8] transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#D4C9B8] flex items-center justify-center text-xs font-semibold text-[#5A4A3A]">
              A
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#9A9A8A] transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-[#E8E6E0] shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-[#ECEAE4]">
                <p className="text-xs font-semibold text-[#1A1A1A]">Admin</p>
                <p className="text-[11px] text-[#9A9A8A] truncate">admin@bepay.money</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
