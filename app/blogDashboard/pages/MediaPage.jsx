"use client";

import { Upload, Image as ImageIcon, Film } from "lucide-react";

export default function MediaPage() {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">

      {/* Upload area */}
      <div className="border-2 border-dashed border-[#DDDBD5] rounded-2xl p-10 text-center mb-8 hover:border-[#AAAA9A] hover:bg-[#F9F8F5] transition cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-[#EFEDE8] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#E4E2DC] transition">
          <Upload className="w-5 h-5 text-[#5A5A4A]" />
        </div>
        <p className="text-sm font-medium text-[#3A3A2A]">Drop files or click to upload</p>
        <p className="text-xs text-[#AAAA9A] mt-1">Images (10MB), Videos (500MB), PDFs (25MB)</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-5">
        {["All", "Images", "Videos"].map((f) => (
          <button
            key={f}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              f === "All"
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#EFEDE8] text-[#5A5A4A] hover:bg-[#E4E2DC]"
            }`}
          >
            {f === "Images" && <ImageIcon className="w-3.5 h-3.5" />}
            {f === "Videos" && <Film className="w-3.5 h-3.5" />}
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="text-center py-16 text-[#AAAA9A]">
        <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No media uploaded yet</p>
        <p className="text-xs mt-1">Images and videos you upload will appear here</p>
      </div>
    </div>
  );
}