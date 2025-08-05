"use client";

import { useState, useEffect } from "react";
import { getAllBlogs, deleteBlog } from "@/lib/blogs";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getAllBlogs();
      setBlogs(data);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    const result = await deleteBlog(deleteId);
    if (result.success) {
      setBlogs(blogs.filter((blog) => blog.id !== deleteId));
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
   
      <AdminLayout>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <Link
            href="/admin/dashboard/new"
            className="flex items-center gap-2 hover:bg-transparent hover:text-black border border-black bg-black text-white px-4 py-2 rounded  transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium">No blog posts yet</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Create your first blog post to get started
            </p>
            <Link
              href="/admin/dashboard/new"
            className="flex items-center  gap-3 hover:bg-transparent hover:text-black border border-black bg-black text-white px-4 py-2 rounded  transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Post</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Author
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={
                                blog.featuredImage ||
                                "/placeholder.svg?height=40&width=40&query=blog"
                              }
                              alt={blog.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-xs text-gray-500 hidden sm:block">
                              /blogs/{blog.slug}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden mt-1">
                              {blog.author} • {formatDate(blog.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-900">
                          {blog.author}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {formatDate(blog.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/dashboard/edit/${blog.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-5 w-5" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => confirmDelete(blog.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog post? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
