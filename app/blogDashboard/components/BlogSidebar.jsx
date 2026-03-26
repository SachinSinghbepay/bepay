"use client";

import {
  FileText,
  PenSquare,
  Image,
  Tag,
  Settings,
  BookOpen,
} from "lucide-react";

const menuItems = [
  { id: "posts", label: "All Posts", icon: FileText },
  { id: "new-post", label: "New Post", icon: PenSquare },
  { id: "topics", label: "Topics", icon: Tag },
  { id: "media", label: "Media", icon: Image },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function BlogSidebar({ active, onChange, isOpen }) {
  return (
    <aside
      className={`
        fixed lg:relative
        z-50 lg:z-auto
        top-0 left-0 h-screen lg:h-auto
        w-[240px] max-w-[80vw] lg:w-[260px]
        bg-white lg:bg-[#EFEDE826]
        p-4 lg:p-6
        flex flex-col gap-8
        rounded-none lg:rounded-3xl
        border-r border-[#E8E6E0] lg:border-0
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 my-4">
        <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A1A] leading-none">Blog CMS</p>
          <p className="text-[11px] text-[#9A9A8A] mt-0.5">Content Studio</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            Icon={item.icon}
            active={active === item.id}
            onClick={() => onChange(item.id)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="px-3 py-3 rounded-xl bg-[#F4F3EF] border border-[#E8E6E0]">
          <p className="text-[11px] text-[#9A9A8A] font-medium uppercase tracking-wider mb-1">
            Storage
          </p>
          <div className="w-full bg-[#E8E6E0] rounded-full h-1.5 mt-2">
            <div className="bg-[#1A1A1A] h-1.5 rounded-full" style={{ width: "28%" }} />
          </div>
          <p className="text-[11px] text-[#6A6A5A] mt-1.5">1.4 GB of 5 GB used</p>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ label, Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left
        ${active
          ? "bg-[#1A1A1A] text-white shadow-sm"
          : "text-[#5A5A4A] hover:bg-[#EFEDE8] hover:text-[#1A1A1A]"
        }
      `}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {label}
    </button>
  );
}