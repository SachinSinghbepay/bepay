"use client";

import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import {
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from "react";
import {
  Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Image as ImageIcon,
  Youtube, Minus, Type,
} from "lucide-react";

const COMMANDS = [
  { title: "Paragraph", description: "Plain text", icon: Type,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run() },
  { title: "Heading 1", description: "Big section title", icon: Heading1,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run() },
  { title: "Heading 2", description: "Sub-section title", icon: Heading2,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run() },
  { title: "Heading 3", description: "Smaller heading", icon: Heading3,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run() },
  { title: "Heading 4", description: "Small heading", icon: Heading4,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 4 }).run() },
  { title: "Bullet List", description: "Unordered list", icon: List,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
  { title: "Numbered List", description: "Ordered list", icon: ListOrdered,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
  { title: "Blockquote", description: "Indented quote", icon: Quote,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
  { title: "Divider", description: "Horizontal rule", icon: Minus,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() },
  { title: "Image", description: "Upload from device", icon: ImageIcon,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const input = document.createElement("input");
      input.type = "file"; input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (re) => editor.chain().focus().insertContent({ type: 'imageWithAlt', attrs: { src: re.target.result, alt: '' } }).run();
        reader.readAsDataURL(file);
      };
      input.click();
    }
  },
  { title: "YouTube / Vimeo", description: "Embed by URL", icon: Youtube,
    command: ({ editor, range }) => {
      const url = prompt("Paste YouTube or Vimeo URL:"); if (!url) return;
      editor.chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).run();
    }
  },
];

const SlashMenuList = forwardRef(({ items, command, clientRect }, ref) => {
  const [selected, setSelected] = useState(0);
  const menuRef = useRef(null);

  // Position the menu directly from clientRect
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu || !clientRect) return;

    const rect = clientRect();
    if (!rect) return;

    const menuHeight = 320;
    const menuWidth = 240;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Place below cursor by default, flip above if not enough room
    let top = rect.bottom + 4;
    if (top + menuHeight > viewportHeight) {
      top = rect.top - menuHeight - 4;
    }

    // Clamp left to viewport
    let left = rect.left;
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - 8;
    }
    left = Math.max(8, left);

    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
  }, [clientRect, items]);

  useEffect(() => setSelected(0), [items]);

  const selectItem = (index) => {
    const item = items[index];
    if (item) command(item);
  };

  useImperativeHandle(ref, () => ({
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") { setSelected((i) => (i + items.length - 1) % items.length); return true; }
      if (event.key === "ArrowDown") { setSelected((i) => (i + 1) % items.length); return true; }
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
          <button key={item.title} onClick={() => selectItem(i)}
            className={`slash-menu__item ${i === selected ? "slash-menu__item--active" : ""}`}>
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

const SlashMenu = Extension.create({
  name: "slashMenu",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => props.command({ editor, range }),
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }) =>
          COMMANDS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
        render: () => {
          let component;
          let container;
          return {
            onStart(props) {
              container = document.createElement("div");
              document.body.appendChild(container);
              component = new ReactRenderer(SlashMenuList, { props, editor: props.editor });
              container.appendChild(component.element);
            },
            onUpdate(props) { component.updateProps(props); },
            onKeyDown(props) {
              if (props.event.key === "Escape") { container?.remove(); return true; }
              return component.ref?.onKeyDown(props) ?? false;
            },
            onExit() { container?.remove(); component?.destroy(); },
          };
        },
      }),
    ];
  },
});

export default SlashMenu;