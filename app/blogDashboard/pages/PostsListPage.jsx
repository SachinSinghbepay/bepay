"use client";

import { useEffect, useState } from "react";
import { PenSquare, Eye, Trash2, Loader2, Link2, Check } from "lucide-react";

const STATUS_STYLES = {
  published: "bg-[#D1F5E0] text-[#1A6B3A]",
  draft: "bg-[#F0EFEA] text-[#6A6A5A]",
  scheduled: "bg-[#FFF3D6] text-[#8A6000]",
};

export default function PostsListPage({ onNewPost, onEditPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null); // post object | null
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = filter !== "all" ? `?status=${filter}` : "";
        const res = await fetch(`/api/blogPosts${query}`);
        const data = await res.json();
        if (data.success) setPosts(data.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filter]);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/blogPosts/${confirmDelete._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p._id !== confirmDelete._id));
      }
    } catch (err) {
      console.error("Failed to delete post", err);
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-1">Delete post?</h3>
            <p className="text-sm text-[#6A6A5A] mb-5">
              <span className="font-medium text-[#1A1A1A]">
                &quot;{confirmDelete.title}&quot;
              </span> will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-[#E4E2DC] text-sm font-medium text-[#5A5A4A] hover:bg-[#F4F3EF] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {["all", "published", "draft"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium capitalize transition ${filter === f
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#EFEDE8] text-[#5A5A4A] hover:bg-[#E4E2DC]"
              }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="ml-auto px-3.5 py-1.5 rounded-lg border border-[#E4E2DC] bg-white text-sm text-[#1A1A1A] placeholder:text-[#AAAA9A] outline-none focus:border-[#1A1A1A] transition w-48"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-[#AAAA9A] gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading posts...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-[#AAAA9A]">
          <p className="text-sm">No posts found</p>
          <button onClick={onNewPost} className="text-xs underline mt-1 hover:text-[#1A1A1A]">
            Write your first post
          </button>
        </div>
      )}

      {/* Posts table */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#ECEAE4] bg-[#F9F8F5]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden lg:table-cell">Tags</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post._id}
                  className={`border-b border-[#ECEAE4] hover:bg-[#F9F8F5] transition group ${i === filtered.length - 1 ? "border-0" : ""
                    }`}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1A1A1A] leading-snug">{post.title}</p>
                    <p className="text-[#9A9A8A] text-xs mt-0.5 hidden sm:block line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[#5A5A4A] text-xs">{post.categories?.[0] || "—"}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {post.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#F0EFEA] text-[#6A6A5A] text-[11px] rounded-md">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold capitalize ${STATUS_STYLES[post.status] ?? STATUS_STYLES.draft}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-[#5A5A4A] text-xs">{formatDate(post.createdAt)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => onEditPost(post)}
                        className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition"
                        title="Edit post"
                      >
                        <PenSquare className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition"
                        title={post.status === "published" ? "View live post" : "Preview draft"}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <CopyLinkButton slug={post.slug} />
                      <button
                        onClick={() => setConfirmDelete(post)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#AAAA9A] hover:text-red-500 transition"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && (
        <p className="text-center text-[#AAAA9A] text-xs mt-6">
          Showing {filtered.length} post{filtered.length !== 1 ? "s" : ""} ·{" "}
          <button onClick={onNewPost} className="underline hover:text-[#1A1A1A]">Write a new one</button>
        </p>
      )}
    </div>
  );
}

function CopyLinkButton({ slug }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg transition ${copied ? "text-green-500 bg-green-50" : "hover:bg-[#EFEDE8] text-[#5A5A4A]"}`}
      title="Copy link"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
    </button>
  );
}
