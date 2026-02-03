"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import BlogForm from "@/components/admin/BlogForm"

export default function NewBlogPage() {
  return (
    <>  
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        <p className="text-gray-600">Fill in the details to create a new blog post</p>
      </div>

      <BlogForm />
    </AdminLayout>
    </>
  )
}
