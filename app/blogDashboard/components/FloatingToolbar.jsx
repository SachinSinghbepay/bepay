"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from "lucide-react";

export default function FloatingToolbar({ editor }) {
  const toolbarRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

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
      let top = rect.top - toolbarHeight - 8 + window.scrollY;

      // Clamp to viewport
      left = Math.max(8, Math.min(left, window.innerWidth - toolbarWidth - 8));

      setPos({ top, left });
      setVisible(true);
    };

    editor.on("selectionUpdate", updateToolbar);
    editor.on("blur", () => setVisible(false));

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
    </div>
  );
}