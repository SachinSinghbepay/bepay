"use client";

import { Plus } from "lucide-react";

const titleMap = {
  posts: "All Posts",
  "new-post": "New Post",
  topics: "Topics",
  media: "Media Library",
  settings: "Settings",
};

export default function BlogTopHeader({ activePage, onMenuClick, onNewPost }) {
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
            {activePage === "posts" && "Manage your blog content"}
            {activePage === "new-post" && "Write something great"}
            {activePage === "topics" && "Organise content by topic"}
            {activePage === "media" && "Images, videos, and files"}
            {activePage === "settings" && "Site and SEO configuration"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* New Post button — shown everywhere except on the editor itself */}
        {activePage !== "new-post" && (
          <button
            onClick={onNewPost}
            className="flex items-center gap-1.5 bg-[#1A1A1A] text-white text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-[#2A2A2A] transition"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        )}

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#D4C9B8] flex items-center justify-center text-xs font-semibold text-[#5A4A3A]">
          A
        </div>
      </div>
    </div>
  );
}