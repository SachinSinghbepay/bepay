"use client";

import { PenSquare, Eye, Clock, Tag } from "lucide-react";

const MOCK_POSTS = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "A comprehensive guide to building modern web apps with the App Router.",
    status: "published",
    topic: "Engineering",
    tags: ["Next.js", "React"],
    date: "Mar 10, 2026",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Why We Moved Away from Medium",
    excerpt: "How we took back control of our content and what we learned along the way.",
    status: "draft",
    topic: "Product",
    tags: ["Content", "Strategy"],
    date: "Mar 12, 2026",
    readTime: "3 min",
  },
  {
    id: 3,
    title: "Designing for Accessibility First",
    excerpt: "Alt text, contrast ratios, and keyboard navigation aren't optional.",
    status: "scheduled",
    topic: "Design",
    tags: ["Accessibility", "UX"],
    date: "Mar 15, 2026",
    readTime: "7 min",
  },
];

const STATUS_STYLES = {
  published: "bg-[#D1F5E0] text-[#1A6B3A]",
  draft: "bg-[#F0EFEA] text-[#6A6A5A]",
  scheduled: "bg-[#FFF3D6] text-[#8A6000]",
};

export default function PostsListPage({ onNewPost }) {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {["All", "Published", "Draft", "Scheduled"].map((f) => (
          <button
            key={f}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
              f === "All"
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#EFEDE8] text-[#5A5A4A] hover:bg-[#E4E2DC]"
            }`}
          >
            {f}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search posts..."
          className="ml-auto px-3.5 py-1.5 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#1A1A1A] placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition w-48"
        />
      </div>

      {/* Posts table */}
      <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#ECEAE4] bg-[#F9F8F5]">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">Title</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden md:table-cell">Topic</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden lg:table-cell">Tags</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden sm:table-cell">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {MOCK_POSTS.map((post, i) => (
              <tr
                key={post.id}
                className={`border-b border-[#ECEAE4] hover:bg-[#F9F8F5] transition group ${
                  i === MOCK_POSTS.length - 1 ? "border-0" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-[#1A1A1A] leading-snug">{post.title}</p>
                  <p className="text-[#9A9A8A] text-xs mt-0.5 hidden sm:block line-clamp-1">{post.excerpt}</p>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-[#5A5A4A] text-xs">{post.topic}</span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#F0EFEA] text-[#6A6A5A] text-[11px] rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold capitalize ${STATUS_STYLES[post.status]}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#5A5A4A] text-xs">{post.date}</span>
                    <span className="text-[#AAAA9A] text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                    <button className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition">
                      <PenSquare className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty nudge */}
      <p className="text-center text-[#AAAA9A] text-xs mt-6">
        Showing {MOCK_POSTS.length} posts · <button onClick={onNewPost} className="underline hover:text-[#1A1A1A]">Write a new one</button>
      </p>
    </div>
  );
}