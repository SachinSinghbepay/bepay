import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  Type,
} from "lucide-react"
import { FontSize } from "./extensions/FontSize"
import { FontWeight } from "./extensions/FontWeight"

const MenuBar = ({ editor }) => {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const fileInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  // Force re-render to sync UI with editor state
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
        forceUpdate((prev) => prev + 1)
    }

    editor.on("transaction", handleUpdate)
    editor.on("selectionUpdate", handleUpdate)

    return () => {
      editor.off("transaction", handleUpdate)
      editor.off("selectionUpdate", handleUpdate)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const addImage = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed: ${response.status} ${errorText}`)
      }

      const result = await response.json()
      if (result.success) {
        editor.chain().focus().setImage({ src: result.filePath }).run()
      } else {
        throw new Error(result.error || "Unknown error during upload")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image: " + error.message)
    } finally {
      setIsUploading(false)
      // Clear the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const setLink = () => {
    if (linkUrl) {
      // Check if the URL has a protocol, if not add https://
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`
      editor.chain().focus().setLink({ href: url }).run()
      setLinkUrl("")
      setShowLinkInput(false)
    }
  }

  return (
    <div className="sticky top-16 lg:top-20 z-10 flex flex-wrap gap-1 rounded-t border-b border-black bg-gray-50 p-2 items-center">
      {/* Font Size Dropdown */}
      <select
        onChange={(e) => {
            if (e.target.value) {
                editor.chain().focus().setFontSize(e.target.value).run()
            } else {
                editor.chain().focus().unsetFontSize().run()
            }
        }}
        className="h-8 rounded border border-gray-300 bg-white px-2 text-sm"
        value={editor.getAttributes('fontSize').size || ""}
      >
        <option value="">Size</option>
        <option value="12px">Small</option>
        <option value="16px">Normal</option>
        <option value="20px">Large</option>
        <option value="24px">Extra Large</option>
        <option value="32px">Huge</option>
      </select>

      {/* Font Weight Dropdown */}
      <select
        onChange={(e) => {
            if (e.target.value) {
                editor.chain().focus().setFontWeight(e.target.value).run()
            } else {
                editor.chain().focus().unsetFontWeight().run()
            }
        }}
        className="h-8 rounded border border-gray-300 bg-white px-2 text-sm"
        value={editor.getAttributes('fontWeight').weight || ""}
      >
        <option value="">Weight</option>
        <option value="400">Normal</option>
        <option value="500">Medium</option>
        <option value="600">SemiBold</option>
        <option value="700">Bold</option>
        <option value="800">ExtraBold</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => {
            const isBold = editor.isActive('fontWeight', { weight: '700' })
            if (isBold) {
                editor.chain().focus().unsetFontWeight().run()
            } else {
                editor.chain().focus().setFontWeight('700').run()
            }
        }}
        className={`rounded p-1 ${editor.isActive('fontWeight', { weight: '700' }) ? "bg-gray-200" : ""}`}
        title="Bold"
      >
        <Bold className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded p-1 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        title="Italic"
      >
        <Italic className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`rounded p-1 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
        title="Heading 1"
      >
        <Heading1 className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded p-1 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
        title="Heading 2"
      >
        <Heading2 className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded p-1 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
        title="Heading 3"
      >
        <Heading3 className="h-5 w-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded p-1 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
        title="Bullet List"
      >
        <List className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded p-1 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
        title="Ordered List"
      >
        <ListOrdered className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded p-1 ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
        title="Blockquote"
      >
        <Quote className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="rounded p-1"
        title="Horizontal Rule"
      >
        <Minus className="h-5 w-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => setShowLinkInput(!showLinkInput)}
        className={`rounded p-1 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
        title="Link"
      >
        <LinkIcon className="h-5 w-5" />
      </button>
      <button type="button" onClick={addImage} className="rounded p-1" title="Image" disabled={isUploading}>
        {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`rounded p-1 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
        title="Align Left"
      >
        <AlignLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`rounded p-1 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
        title="Align Center"
      >
        <AlignCenter className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`rounded p-1 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
        title="Align Right"
      >
        <AlignRight className="h-5 w-5" />
      </button>
      {showLinkInput && (
        <div className="ml-2 flex items-center">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button type="button" onClick={setLink} className="ml-1 rounded bg-black px-2 py-1 text-sm text-white">
            Set
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl("")
            }}
            className="ml-1 rounded bg-gray-200 px-2 py-1 text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bold: false,
      }),
      Placeholder.configure({
        placeholder: "Write your content here...",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSize,
      FontWeight,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[300px]",
      },
    },
    immediatelyRender: false, // Fix for SSR hydration mismatch
  })

  // Set initial content when the editor is ready
  useEffect(() => {
    if (editor && content && editor.isEmpty) {
      // Only set content if editor is empty
      editor.commands.setContent(content)
    }
  }, [editor, content])

  return (
    <div className="rounded border border-black bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-2 min-h-[300px]" />
    </div>
  )
}
