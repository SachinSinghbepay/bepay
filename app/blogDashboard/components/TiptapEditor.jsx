"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

import FloatingToolbar from "./FloatingToolbar";
import SlashMenu from "./SlashMenu";

import "./Editor.css";

const AUTOSAVE_KEY = "blog_cms_draft";
const AUTOSAVE_INTERVAL = 30000; // 30s

export default function TiptapEditor({ postId, onChange }) {
  const autosaveTimer = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        blockquote: {},
        bulletList: {},
        orderedList: {},
        code: {},
        codeBlock: false,
      }),
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: { class: "editor-image" },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        HTMLAttributes: { class: "editor-youtube" },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") return "Heading...";
          return "Write something, or type  /  for blocks...";
        },
      }),
      CharacterCount,
      SlashMenu,
    ],
    immediatelyRender: false,
    content: loadDraft(postId),
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
        spellcheck: "true",
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onChange?.(json);
      schedulAutosave(json, postId);
    },
  });

  const schedulAutosave = useCallback((json, id) => {
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(`${AUTOSAVE_KEY}_${id || "new"}`, JSON.stringify({
          content: json,
          savedAt: new Date().toISOString(),
        }));
      } catch {}
    }, AUTOSAVE_INTERVAL);
  }, []);

  useEffect(() => {
    return () => clearTimeout(autosaveTimer.current);
  }, []);

  const wordCount = editor?.storage.characterCount.words() ?? 0;
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
        <AutosaveIndicator postId={postId} />
      </div>
    </div>
  );
}

function AutosaveIndicator({ postId }) {
  const key = `${AUTOSAVE_KEY}_${postId || "new"}`;
  let savedAt = null;
  try {
    const raw = localStorage.getItem(key);
    if (raw) savedAt = JSON.parse(raw).savedAt;
  } catch {}

  if (!savedAt) return <span className="text-[#CCCCBC]">Not saved yet</span>;

  const time = new Date(savedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return <span className="text-[#AAAA9A]">Draft saved at {time}</span>;
}

function loadDraft(postId) {
  try {
    const raw = localStorage.getItem(`${AUTOSAVE_KEY}_${postId || "new"}`);
    if (raw) return JSON.parse(raw).content;
  } catch {}
  return "";
}