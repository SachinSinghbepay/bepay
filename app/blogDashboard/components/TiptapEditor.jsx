"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Node, mergeAttributes, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { useRef, useState, forwardRef, useEffect, useImperativeHandle } from "react";
import FloatingToolbar from "./FloatingToolbar";
import Link from "@tiptap/extension-link";
import "./Editor.css";

// ─── ImageWithAlt node ───────────────────────────────────────────────────────

function ImageNodeView({ node, updateAttributes, selected }) {
  const [editingAlt, setEditingAlt] = useState(false);
  const inputRef = useRef(null);
  const alt = node.attrs.alt || "";

  const handleAltClick = () => {
    setEditingAlt(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleAltBlur = (e) => { updateAttributes({ alt: e.target.value }); setEditingAlt(false); };
  const handleAltKey = (e) => {
    if (e.key === "Enter" || e.key === "Escape") { updateAttributes({ alt: e.target.value }); setEditingAlt(false); }
  };

  return (
    <NodeViewWrapper className="image-block" contentEditable={false}>
      <img src={node.attrs.src} alt={alt} className={`editor-image ${selected ? "editor-image--selected" : ""}`} />
      <div className="image-alt-row">
        {editingAlt ? (
          <input ref={inputRef} defaultValue={alt} onBlur={handleAltBlur} onKeyDown={handleAltKey}
            placeholder="Describe this image..." className="image-alt-input" />
        ) : (
          <button onClick={handleAltClick} className="image-alt-btn">
            {alt ? <><span className="image-alt-label">Alt:</span><span className="image-alt-value">{alt}</span></> :
              <span className="image-alt-missing">⚠ Add alt text</span>}
          </button>
        )}
      </div>
    </NodeViewWrapper>
  );
}

const ImageWithAlt = Node.create({
  name: "imageWithAlt", group: "block", atom: true, draggable: true,
  addAttributes() { return { src: { default: null }, alt: { default: "" }, title: { default: null } }; },
  parseHTML() { return [{ tag: "img[src]" }]; },
  renderHTML({ HTMLAttributes }) { return ["img", mergeAttributes(HTMLAttributes)]; },
  addNodeView() { return ReactNodeViewRenderer(ImageNodeView); },
});

// ─── SlashMenu ────────────────────────────────────────────────────────────────

import {
  Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Image as ImageIcon, Youtube, Minus, Type,
} from "lucide-react";

const COMMANDS = [
  { title: "Paragraph", description: "Plain text", icon: Type, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run() },
  { title: "Heading 1", description: "Big title", icon: Heading1, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run() },
  { title: "Heading 2", description: "Sub-section", icon: Heading2, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run() },
  { title: "Heading 3", description: "Smaller heading", icon: Heading3, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run() },
  { title: "Heading 4", description: "Small heading", icon: Heading4, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 4 }).run() },
  { title: "Bullet List", description: "Unordered list", icon: List, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
  { title: "Numbered List", description: "Ordered list", icon: ListOrdered, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
  { title: "Blockquote", description: "Indented quote", icon: Quote, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
  { title: "Divider", description: "Horizontal rule", icon: Minus, command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() },
  {
    title: "Image", description: "Upload from device", icon: ImageIcon, command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const input = document.createElement("input"); input.type = "file"; input.accept = "image/*";
      input.onchange = async (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        // Optimistic local preview
        const localUrl = URL.createObjectURL(file);
        editor.chain().focus().insertContent({ type: "imageWithAlt", attrs: { src: localUrl, alt: "" } }).run();
        // Upload to S3
        try {
          const form = new FormData();
          form.append("file", file);
          form.append("type", "inline");
          const res = await fetch("/api/upload", { method: "POST", body: form });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          // Swap local blob URL with permanent S3/CDN URL in the editor
          const { state, dispatch } = editor.view;
          state.doc.descendants((node, pos) => {
            if (node.type.name === "imageWithAlt" && node.attrs.src === localUrl) {
              const tr = state.tr.setNodeMarkup(pos, null, { ...node.attrs, src: data.url });
              dispatch(tr);
            }
          });
        } catch (err) {
          console.error("Inline image upload failed:", err);
        }
      }; input.click();
    }
  },
];

const SlashMenuList = forwardRef(({ items, command, clientRect }, ref) => {
  const [selected, setSelected] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current; if (!menu || !clientRect) return;
    const rect = clientRect(); if (!rect) return;
    let top = rect.bottom + 4;
    if (top + 320 > window.innerHeight) top = rect.top - 320 - 4;
    let left = Math.max(8, Math.min(rect.left, window.innerWidth - 240 - 8));
    menu.style.top = `${top}px`; menu.style.left = `${left}px`;
  }, [clientRect, items]);

  useEffect(() => setSelected(0), [items]);

  const selectItem = (i) => { const item = items[i]; if (item) command(item); };

  useImperativeHandle(ref, () => ({
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") { setSelected(i => (i + items.length - 1) % items.length); return true; }
      if (event.key === "ArrowDown") { setSelected(i => (i + 1) % items.length); return true; }
      if (event.key === "Enter") { selectItem(selected); return true; }
      return false;
    },
  }));

  if (!items.length) return null;
  return (
    <div ref={menuRef} className="slash-menu" style={{ position: "fixed", zIndex: 9999 }}>
      <p className="slash-menu__label">Blocks</p>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <button key={item.title} onClick={() => selectItem(i)} className={`slash-menu__item ${i === selected ? "slash-menu__item--active" : ""}`}>
            <div className="slash-menu__icon"><Icon className="w-3.5 h-3.5" /></div>
            <div className="slash-menu__text">
              <span className="slash-menu__title">{item.title}</span>
              <span className="slash-menu__desc">{item.description}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
});
SlashMenuList.displayName = "SlashMenuList";

// ─── TiptapEditor ─────────────────────────────────────────────────────────────

export default function TiptapEditor({ onChange, autoSaveStatus, initialContent }) {
  const editor = useEditor({
    immediatelyRender: false,
    content: initialContent ?? undefined,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] }, image: false }),
      ImageWithAlt,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Extension.create({
        name: "slashMenu",
        addOptions() { return { suggestion: { char: "/", command: ({ editor, range, props }) => props.command({ editor, range }) } }; },
        addProseMirrorPlugins() {
          return [Suggestion({
            editor: this.editor, ...this.options.suggestion,
            items: ({ query }) => COMMANDS.filter(i => i.title.toLowerCase().includes(query.toLowerCase())),
            render: () => {
              let component, container;
              const { ReactRenderer } = require("@tiptap/react");
              return {
                onStart(props) { container = document.createElement("div"); document.body.appendChild(container); component = new ReactRenderer(SlashMenuList, { props, editor: props.editor }); container.appendChild(component.element); },
                onUpdate(props) { component.updateProps(props); },
                onKeyDown(props) { if (props.event.key === "Escape") { container?.remove(); return true; } return component.ref?.onKeyDown(props) ?? false; },
                onExit() { container?.remove(); component?.destroy(); },
              };
            },
          })];
        },
      }),
    ],
    editorProps: { attributes: { class: "tiptap-editor-content", spellcheck: "true" } },
    onUpdate({ editor }) { onChange?.(editor.getJSON()); },
  });

  const wordCount = editor?.storage?.characterCount?.words() ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="relative tiptap-wrapper">
      {editor && <FloatingToolbar editor={editor} />}
      <EditorContent editor={editor} />
      <div className="editor-footer">
        <span>{wordCount} words</span>
        <span>·</span>
        <span>~{readTime} min read</span>
        <span>·</span>
        <AutoSaveLabel status={autoSaveStatus} />
      </div>
    </div>
  );
}

function AutoSaveLabel({ status }) {
  if (!status) return <span className="text-[#CCCCBC]">Not saved yet</span>;
  if (status === "saving") return <span className="text-[#AAAA9A] animate-pulse">Saving...</span>;
  if (status === "error") return <span className="text-red-400">Autosave failed</span>;
  return <span className="text-[#AAAA9A]">{status}</span>;
}