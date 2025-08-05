"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import BlogForm from "@/components/admin/BlogForm"
import { getBlogById } from "@/lib/blogs"

export default function EditBlogPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id)
        if (data) {
          setBlog(data)
        } else {
          setError("Blog post not found")
        }
      } catch (error) {
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      </AdminLayout>
    )
  }

  return (
    <>
    
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <p className="text-gray-600">Update the details of your blog post</p>
      </div>

      <BlogForm blog={blog} />
    </AdminLayout>
    </>
  )
}
