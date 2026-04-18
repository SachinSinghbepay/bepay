"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";

export default function FloatingToolbar({ editor }) {
  
  const applyLink = () => {
    const { from, to } = editor.state.selection;
    let url = linkValue.trim();

    if (!url) {
      editor.chain().focus().setTextSelection({ from, to }).unsetLink().run();
      setShowLinkInput(false);
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    const isValidUrl = (url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.includes("."); // must have domain like google.com
      } catch {
        return false;
      }
    };

    if (!isValidUrl(url)) {
      alert("Enter a valid URL (e.g. https://bepay.money)");
      return;
    }

    editor
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .setLink({ href: url })
      .run();

    setShowLinkInput(false);
  };

  const toolbarRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputOpenRef = useRef(false);

  useEffect(() => {
    linkInputOpenRef.current = showLinkInput;
  }, [showLinkInput]);

  useEffect(() => {
    if (!editor) return;

    const updateToolbar = () => {
      const { from, to } = editor.state.selection;
      const isTextSelected = from !== to && !editor.state.selection.empty;

      if (!isTextSelected) {
        setVisible(false);
        return;
      }

      // Get the selection coords from the editor DOM
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setVisible(false);
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const toolbar = toolbarRef.current;
      if (!toolbar) return;

      const toolbarWidth = toolbar.offsetWidth || 280;
      const toolbarHeight = toolbar.offsetHeight || 40;

      // Position above the selection, centred
      let left = rect.left + rect.width / 2 - toolbarWidth / 2;
      let top = rect.top - toolbarHeight - 8;

      // Clamp to viewport
      left = Math.max(8, Math.min(left, window.innerWidth - toolbarWidth - 8));

      if (top < 8) {
        top = rect.bottom + 8;
      }
      setPos({ top, left });
      setVisible(true);
    };

    editor.on("selectionUpdate", updateToolbar);
    editor.on("blur", () => {
      setTimeout(() => {
        if (!linkInputOpenRef.current) {
          setVisible(false);
        }
      }, 150);
    });
    return () => {
      editor.off("selectionUpdate", updateToolbar);
    };
  }, [editor]);

  if (!editor) return null;

  const tools = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline"), label: "Underline" },
    null, // divider
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), label: "H1" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "H2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), label: "H3" },
    null, // divider
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Numbered" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Quote" },
    {
      icon: LinkIcon,
      action: () => {
        const previousUrl = editor.getAttributes("link").href || "";
        setLinkValue(previousUrl);
        setShowLinkInput(true);
      },
      active: editor.isActive("link"),
      label: "Link",
    }
  ];

  return (
    <div
      ref={toolbarRef}
      className="floating-toolbar"
      style={{
        position: "fixed",
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.1s ease",
      }}
      // Prevent toolbar click from collapsing selection
      onMouseDown={(e) => e.preventDefault()}
    >
      {tools.map((tool, i) =>
        tool === null ? (
          <div key={`div-${i}`} className="toolbar-divider" />
        ) : (
          <button
            key={tool.label}
            onClick={tool.action}
            title={tool.label}
            className={`toolbar-btn ${tool.active ? "toolbar-btn--active" : ""}`}
          >
            <tool.icon className="w-3.5 h-3.5" />
          </button>
        )
      )}

      {showLinkInput && (
        <div
          className="absolute top-full mt-2 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-md"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <input
            autoFocus
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="Paste link"
            className="text-sm px-2 py-1 outline-none w-40"
            onKeyDown={(e) => {
              if (e.key === "Enter") applyLink();
              if (e.key === "Escape") setShowLinkInput(false);
            }}
          />

          <button
            onClick={applyLink}
            className="text-xs px-2 py-1 bg-black text-white rounded"
          >
            ✓
          </button>

          <button
            onClick={() => {
              editor.chain().focus().unsetLink().run();
              setShowLinkInput(false);
            }}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}

