"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Save, Eye, Send, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("../components/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-64 text-[#CCCCBC] text-sm italic">Loading editor...</div>
  ),
});

const AUTOSAVE_DELAY = 2500;

export default function NewPostPage({ onBack }) {
  // Content
  const [title, setTitle]       = useState("");
  const [excerpt, setExcerpt]   = useState("");
  const [body, setBody]         = useState(null);

  // Sidebar
  const [slug, setSlug]         = useState("");
  const [tags, setTags]         = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc]   = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Save state
  const [savedId, setSavedId]       = useState(null);
  const [saving, setSaving]         = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState(null); // null | "saving" | "saved at HH:MM" | "error"
  const [toast, setToast]           = useState(null);

  const autosaveTimer = useRef(null);
  const savedIdRef    = useRef(null); // mirror of savedId for use inside callbacks
  const bodyRef       = useRef(null);
  const titleRef      = useRef("");
  const excerptRef    = useRef("");
  const slugRef       = useRef("");
  const tagsRef       = useRef([]);
  const categoryRef   = useRef("");
  const fileInputRef  = useRef(null);

  // Keep refs in sync so autosave always has latest values
  const syncRefs = (patch) => {
    if (patch.title     !== undefined) titleRef.current    = patch.title;
    if (patch.excerpt   !== undefined) excerptRef.current  = patch.excerpt;
    if (patch.slug      !== undefined) slugRef.current     = patch.slug;
    if (patch.tags      !== undefined) tagsRef.current     = patch.tags;
    if (patch.category  !== undefined) categoryRef.current = patch.category;
    if (patch.body      !== undefined) bodyRef.current     = patch.body;
  };

  const buildPayload = (status) => ({
    title:      titleRef.current,
    slug:       slugRef.current,
    content:    bodyRef.current ?? { type: "doc", content: [] },
    excerpt:    excerptRef.current,
    coverImage,
    tags:       tagsRef.current,
    categories: categoryRef.current ? [categoryRef.current] : [],
    status,
    metaTitle:  metaTitle || titleRef.current,
    metaDesc:   metaDesc  || excerptRef.current,
  });

  const persist = useCallback(async (status = "draft") => {
    if (!titleRef.current.trim()) return null;
    const isUpdate = !!savedIdRef.current;
    const res = await fetch(
      isUpdate ? `/api/blogPosts/${savedIdRef.current}` : "/api/blogPosts",
      {
        method: isUpdate ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(status)),
      }
    );
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    // Store returned _id for future PATCH calls
    if (!savedIdRef.current) {
      savedIdRef.current = data.data._id;
      setSavedId(data.data._id);
    }
    return data.data;
  }, [metaTitle, metaDesc, coverImage]);

  // ── Autosave (debounced) ──────────────────────────────────────────────────
  const scheduleAutosave = useCallback(() => {
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      if (!titleRef.current.trim()) return;
      setAutoSaveStatus("saving");
      try {
        await persist("draft");
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setAutoSaveStatus(`Saved at ${time}`);
      } catch {
        setAutoSaveStatus("error");
      }
    }, AUTOSAVE_DELAY);
  }, [persist]);

  // ── Field change handlers ─────────────────────────────────────────────────
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    syncRefs({ title: val });
    if (!slugRef.current) {
      const auto = val.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      setSlug(auto);
      syncRefs({ slug: auto });
    }
    scheduleAutosave();
  };

  const handleExcerptChange = (e) => {
    setExcerpt(e.target.value);
    syncRefs({ excerpt: e.target.value });
    scheduleAutosave();
  };

  const handleBodyChange = (json) => {
    setBody(json);
    syncRefs({ body: json });
    scheduleAutosave();
  };

  const handleTagKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,$/, "");
      if (tag && !tags.includes(tag)) {
        const next = [...tags, tag];
        setTags(next);
        syncRefs({ tags: next });
        scheduleAutosave();
      }
      setTagInput("");
    }
  };
  const removeTag = (t) => {
    const next = tags.filter((x) => x !== t);
    setTags(next);
    syncRefs({ tags: next });
    scheduleAutosave();
  };

  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (re) => setCoverImage(re.target.result);
    reader.readAsDataURL(file);
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Manual Save Draft ─────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!title.trim()) return showToast("error", "Title is required");
    setSaving(true);
    try {
      await persist("draft");
      showToast("success", "Draft saved!");
    } catch (err) {
      showToast("error", err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ── Publish ───────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!title.trim()) return showToast("error", "Title is required");
    if (!body) return showToast("error", "Write some content first");
    setPublishing(true);
    try {
      await persist("published");
      showToast("success", "Post published! 🎉");
    } catch (err) {
      showToast("error", err.message || "Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg ${
          toast.type === "success"
            ? "bg-[#D1F5E0] text-[#1A6B3A] border border-[#A8E6C0]"
            : "bg-[#FFE8E8] text-[#B91C1C] border border-[#FCA5A5]"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-b border-[#ECEAE4] bg-white">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#5A5A4A] hover:text-[#1A1A1A] transition">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium text-[#5A5A4A] hover:bg-[#EFEDE8] transition border border-[#E4E2DC]">
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium text-[#5A5A4A] hover:bg-[#EFEDE8] transition border border-[#E4E2DC] disabled:opacity-50">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
          </button>
          <button onClick={handlePublish} disabled={publishing} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition disabled:opacity-50">
            {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Publish
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 max-w-3xl mx-auto w-full">

          {/* Cover image */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mb-6 border-2 border-dashed border-[#DDDBD5] rounded-2xl overflow-hidden cursor-pointer hover:border-[#AAAA9A] hover:bg-[#F9F8F5] transition group"
            style={{ minHeight: "160px" }}
          >
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="w-full h-48 object-cover rounded-2xl" />
            ) : (
              <div className="flex items-center justify-center h-40 text-center">
                <div>
                  <p className="text-sm text-[#AAAA9A] group-hover:text-[#5A5A4A] transition">+ Add cover image</p>
                  <p className="text-xs text-[#CCCCBC] mt-1">JPG, PNG, WebP — Max 10MB</p>
                </div>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverImage} />

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Post title..."
            className="w-full text-3xl lg:text-4xl font-bold text-[#1A1A1A] placeholder:text-[#DDDBD5] bg-transparent outline-none leading-tight mb-3"
          />

          {/* Excerpt */}
          <input
            type="text"
            value={excerpt}
            onChange={handleExcerptChange}
            placeholder="Short excerpt for post cards and meta description..."
            className="w-full text-base text-[#6A6A5A] placeholder:text-[#CCCCBC] bg-transparent outline-none leading-relaxed mb-6 pb-6 border-b border-[#ECEAE4]"
          />

          {/* Editor — pass autosave status for footer */}
          <TiptapEditor
            postId={savedId}
            onChange={handleBodyChange}
            autoSaveStatus={autoSaveStatus}
          />
        </div>

        {/* Right sidebar */}
        <aside className="hidden lg:flex w-[280px] flex-col border-l border-[#ECEAE4] bg-[#FAFAF8] overflow-y-auto">
          <div className="p-5 flex flex-col gap-6">

            <SidebarSection title="URL Slug">
              <div className="flex items-center border border-[#E4E2DC] rounded-lg overflow-hidden focus-within:border-[#1A1A1A] transition">
                <span className="px-2.5 py-2 text-xs text-[#AAAA9A] bg-[#F4F3EF] border-r border-[#E4E2DC]">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); syncRefs({ slug: e.target.value }); scheduleAutosave(); }}
                  placeholder="post-slug"
                  className="flex-1 px-2.5 py-2 text-sm text-[#3A3A2A] bg-white outline-none"
                />
              </div>
            </SidebarSection>

            <SidebarSection title="Category">
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); syncRefs({ category: e.target.value }); scheduleAutosave(); }}
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#3A3A2A] outline-none focus:border-[#1A1A1A] transition"
              >
                <option value="">Select a category...</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
              </select>
            </SidebarSection>

            <SidebarSection title="Tags">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-[#EFEDE8] text-[#3A3A2A] text-xs rounded-md">
                    {t}
                    <button onClick={() => removeTag(t)} className="text-[#AAAA9A] hover:text-red-400 ml-0.5">×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                placeholder="Type tag and press Enter..."
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#3A3A2A] placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition"
              />
            </SidebarSection>

            <SidebarSection title="SEO">
              <div className="flex flex-col gap-2.5">
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Meta title (defaults to post title)"
                  className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition"
                />
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Meta description (defaults to excerpt)"
                  className="w-full px-3 py-2 rounded-lg border border-[#E4E2DC] bg-white text-sm placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition resize-none"
                />
              </div>
            </SidebarSection>

            {savedId && (
              <div className="pt-2 border-t border-[#ECEAE4]">
                <button className="text-xs text-red-400 hover:text-red-600 transition">Delete this post</button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}