"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createBlog, updateBlog } from "@/lib/blogs"
import { slugify } from "@/lib/utils"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import the TipTap editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full p-2 border border-black rounded h-64 flex items-center justify-center bg-gray-50">
      Loading editor...
    </div>
  ),
})

export default function BlogForm({ blog = null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState(blog?.featuredImage || "")
  const fileInputRef = useRef(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    author: blog?.author || "",
    metaTitle: blog?.metaTitle || "",
    metaDescription: blog?.metaDescription || "",
    readTime: blog?.readTime || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // Auto-generate slug from title
    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: slugify(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setUploadProgress(0)

    try {
      const featuredImage = fileInputRef.current.files[0]

      if (!blog && !featuredImage) {
        setError("Featured image is required")
        setLoading(false)
        return
      }

      // Show upload progress
      if (featuredImage) {
        setUploadProgress(30)
        setTimeout(() => setUploadProgress(60), 500)
      }

      let result

      if (blog) {
        // Update existing blog
        result = await updateBlog(blog.id, formData, featuredImage || null)
      } else {
        // Create new blog
        result = await createBlog(formData, featuredImage)
      }

      setUploadProgress(100)

      if (result.success) {
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "An error occurred")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span>{uploadProgress}%</span>
          </div>
          <p className="mt-1 text-sm">Uploading image and saving post...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-lg font-bold text-black mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-lg font-bold text-black mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-lg font-bold text-black mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={3}
          className="w-full p-2 border border-black rounded"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-lg font-bold text-black mb-1">
          Content
        </label>
        <RichTextEditor content={formData.content} onChange={handleContentChange} />
        <p className="text-lg text-gray-500 mt-1">
          Use the toolbar to format your content. The editor preserves your formatting exactly as you create it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-lg font-bold text-black mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>

        <div>
          <label htmlFor="readTime" className="block text-lg font-bold text-black mb-1">
            Read Time (e.g., &quot;7 MIN READ&quot;)
          </label>
          <input
            type="text"
            id="readTime"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>
      </div>

      <div>
        <label htmlFor="featuredImage" className="block text-lg font-bold text-black mb-1">
          Featured Image
        </label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          onChange={handleImageChange}
          ref={fileInputRef}
          accept="image/*"
          className="w-full p-2 border border-black rounded"
          required={!blog}
        />

        {imagePreview && (
          <div className="mt-2 relative h-48 w-full md:w-1/2">
            <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover rounded" />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">SEO Settings</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="metaTitle" className="block text-lg font-bold text-black mb-1">
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded"
            />
            <p className="text-lg text-gray-500 mt-1">Leave blank to use the post title</p>
          </div>

          <div>
            <label htmlFor="metaDescription" className="block text-lg font-bold text-black mb-1">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-black rounded"
            />
            <p className="text-lg text-gray-500 mt-1">Leave blank to use the post excerpt</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="px-4 py-2 border border-black rounded mr-2"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded" disabled={loading}>
          {loading ? "Saving..." : blog ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  )
}
