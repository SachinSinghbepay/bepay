"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

const MOCK_TOPICS = [
  { id: 1, name: "Engineering", slug: "engineering", color: "#3B82F6", posts: 12 },
  { id: 2, name: "Product", slug: "product", color: "#10B981", posts: 8 },
  { id: 3, name: "Design", slug: "design", color: "#F59E0B", posts: 5 },
];

export default function TopicsPage() {
  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#9A9A8A]">{MOCK_TOPICS.length} topics</p>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition">
          <Plus className="w-4 h-4" /> New Topic
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E8E6E0] hover:border-[#DDDBD5] transition group"
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: topic.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1A1A1A] text-sm">{topic.name}</p>
              <p className="text-[#AAAA9A] text-xs">/blog/topic/{topic.slug} · {topic.posts} posts</p>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
              <button className="p-1.5 rounded-lg hover:bg-[#EFEDE8] text-[#5A5A4A] transition">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}