"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { createCategory, getCategories, deleteCategory } from "@/lib/categories"
import { Trash2, Plus } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data)
    setLoading(false)
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setSubmitting(true)
    const result = await createCategory(newCategory.trim())
    
    if (result.success) {
      setNewCategory("")
      fetchCategories()
    } else {
      alert("Failed to create category")
    }
    setSubmitting(false)
  }

  const handleDeleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    const result = await deleteCategory(id)
    if (result.success) {
      setCategories(categories.filter(c => c.id !== id))
    } else {
      alert("Failed to delete category")
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <p className="text-gray-600">Add or remove blog categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-lg font-bold mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="flex-1 p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-bold">Existing Categories</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No categories found</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <span className="font-medium">{category.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Delete Category"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
