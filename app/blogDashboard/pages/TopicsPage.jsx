"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
  "#6366F1", "#84CC16",
];

function TopicModal({ initial, onSave, onClose, saving }) {
  const [name, setName] = useState(initial?.name || "");
  const [color, setColor] = useState(initial?.color || COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), color });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-[#1A1A1A]">{initial ? "Edit Topic" : "New Topic"}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F0EFEA] text-[#9A9A8A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#6A6A5A] mb-1.5 block">Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Engineering"
              className="w-full border border-[#E4E2DC] rounded-xl px-3 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#6A6A5A] mb-1.5 block">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full border-2 transition"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? "#1A1A1A" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || saving}
            className="w-full py-2 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {initial ? "Save changes" : "Create topic"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "new" | topic object (edit)
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();
      if (data.success) setTopics(data.data);
    } catch {
      setError("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTopics(); }, []);

  const handleSave = async ({ name, color }) => {
    setSaving(true);
    setError("");
    try {
      const isEdit = modal && modal !== "new";
      const url = isEdit ? `/api/topics/${modal._id}` : "/api/topics";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      setModal(null);
      fetchTopics();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/topics/${confirmDelete._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setConfirmDelete(null);
        fetchTopics();
      }
    } catch {
      setError("Failed to delete topic");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#9A9A8A]">{topics.length} topics</p>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition"
        >
          <Plus className="w-4 h-4" /> New Topic
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-5 h-5 animate-spin text-[#AAAA9A]" />
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-16 text-[#AAAA9A] text-sm">
          No topics yet. Create your first one.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E8E6E0] hover:border-[#DDDBD5] transition group"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: topic.color }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1A1A1A] text-sm">{topic.name}</p>
                <p className="text-[#AAAA9A] text-xs">/blog/topic/{topic.slug}</p>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => setModal(topic)}
                  className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setConfirmDelete(topic)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New / Edit modal */}
      {modal && (
        <TopicModal
          initial={modal === "new" ? null : modal}
          onSave={handleSave}
          onClose={() => { setModal(null); setError(""); }}
          saving={saving}
        />
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-[#1A1A1A] mb-2">Delete topic?</h3>
            <p className="text-sm text-[#6A6A5A] mb-5">
              &quot;{confirmDelete.name}&quot; will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 rounded-xl border border-[#E4E2DC] text-sm text-[#1A1A1A] hover:bg-[#F4F3EF] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
