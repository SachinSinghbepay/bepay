"use client";

import { useState } from "react";
import { ArrowLeft, Save, Eye, Send } from "lucide-react";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("../components/TiptapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-64 text-[#CCCCBC] text-sm italic">
        Loading editor...
      </div>
    ),
  }
);

export default function NewPostPage({ onBack }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState(null);

  return (
    <div className="flex flex-col h-full">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-b border-[#ECEAE4] bg-white">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#5A5A4A] hover:text-[#1A1A1A] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          All Posts
        </button>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium text-[#5A5A4A] hover:bg-[#EFEDE8] transition border border-[#E4E2DC]">
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium text-[#5A5A4A] hover:bg-[#EFEDE8] transition border border-[#E4E2DC]">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition">
            <Send className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editor canvas */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 max-w-3xl mx-auto w-full">

          {/* Cover image upload */}
          <div className="mb-6 border-2 border-dashed border-[#DDDBD5] rounded-2xl h-40 flex items-center justify-center cursor-pointer hover:border-[#AAAA9A] hover:bg-[#F9F8F5] transition group">
            <div className="text-center">
              <p className="text-sm text-[#AAAA9A] group-hover:text-[#5A5A4A] transition">
                + Add cover image
              </p>
              <p className="text-xs text-[#CCCCBC] mt-1">JPG, PNG, WebP - Max 10MB</p>
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full text-3xl lg:text-4xl font-bold text-[#1A1A1A] placeholder:text-[#DDDBD5] bg-transparent outline-none leading-tight mb-3"
          />

          {/* Excerpt */}
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt for post cards and meta description..."
            className="w-full text-base text-[#6A6A5A] placeholder:text-[#CCCCBC] bg-transparent outline-none leading-relaxed mb-6 pb-6 border-b border-[#ECEAE4]"
          />

          {/* Tiptap editor */}
          <TiptapEditor onChange={setBody} />

        </div>

        {/* Right sidebar */}
        <aside className="hidden lg:flex w-[280px] flex-col border-l border-[#ECEAE4] bg-[#FAFAF8] overflow-y-auto">
          <div className="p-5 flex flex-col gap-6">

            <SidebarSection title="Status">
              <div className="flex flex-col gap-1.5">
                {["Draft", "Published", "Scheduled"].map((s) => (
                  <label key={s} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="status" className="accent-[#1A1A1A]" defaultChecked={s === "Draft"} />
                    <span className="text-sm text-[#3A3A2A]">{s}</span>
                  </label>
                ))}
              </div>
            </SidebarSection>

            <SidebarSection title="Topic">
              <select className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#3A3A2A] outline-none focus:border-[#1A1A1A] transition">
                <option value="">Select a topic...</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
              </select>
            </SidebarSection>

            <SidebarSection title="Tags">
              <input
                type="text"
                placeholder="Type tag and press Enter..."
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#3A3A2A] placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition"
              />
            </SidebarSection>

            <SidebarSection title="URL Slug">
              <div className="flex items-center border border-[#E4E2DC] rounded-lg overflow-hidden focus-within:border-[#1A1A1A] transition">
                <span className="px-2.5 py-2 text-xs text-[#AAAA9A] bg-[#F4F3EF] border-r border-[#E4E2DC]">/blog/</span>
                <input
                  type="text"
                  placeholder="post-slug"
                  className="flex-1 px-2.5 py-2 text-sm text-[#3A3A2A] bg-white outline-none"
                />
              </div>
            </SidebarSection>

            <SidebarSection title="SEO">
              <div className="flex flex-col gap-2.5">
                <input
                  type="text"
                  placeholder="Focus keyword"
                  className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition"
                />
                <input
                  type="text"
                  placeholder="Meta title (defaults to post title)"
                  className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition"
                />
                <textarea
                  rows={3}
                  placeholder="Meta description (defaults to excerpt)"
                  className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition resize-none"
                />
              </div>
            </SidebarSection>

            <div className="pt-2 border-t border-[#ECEAE4]">
              <button className="text-xs text-red-400 hover:text-red-600 transition">
                Delete this post
              </button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider mb-2">
        {title}
      </p>
      {children}
    </div>
  );
}