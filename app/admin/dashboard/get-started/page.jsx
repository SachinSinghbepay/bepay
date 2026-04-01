"use client"

import { useState, useEffect } from "react"
import { getAllContactSubmissions, deleteContactSubmission, updateContactStatus } from "@/lib/contact"
import AdminLayout from "@/components/admin/AdminLayout"
import { formatDate } from "@/lib/utils"
import { Trash2, Download, Eye, X } from "lucide-react"

export default function GetStartedPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [viewContact, setViewContact] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getAllContactSubmissions()
      // Filter for get-started submissions
      const filteredData = data.filter(contact => contact.source === "get-started")
      setContacts(filteredData)
      setLoading(false)
    }

    fetchContacts()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return

    const result = await deleteContactSubmission(deleteId)
    if (result.success) {
      setContacts(contacts.filter((contact) => contact.id !== deleteId))
    }

    setShowDeleteModal(false)
    setDeleteId(null)
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const viewContactDetails = (contact) => {
    setViewContact(contact)
    setShowViewModal(true)
  }

  const updateStatus = async (id, status) => {
    const result = await updateContactStatus(id, status)
    if (result.success) {
      setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, status } : contact)))
    }
  }

  const exportToCSV = () => {
    if (contacts.length === 0) return

    // Create CSV content
    const headers = ["Name", "Email", "Phone Number", "Company", "Message", "Submitted At", "Status"]
    const csvRows = [headers.join(",")]

    contacts.forEach((contact) => {
      const row = [
        `"${contact.name || ""}"`,
        `"${contact.email || ""}"`,
        `"${contact.phone || ""}"`,
        `"${contact.company || ""}"`,
        `"${contact.message?.replace(/"/g, '""') || ""}"`,
        `"${formatDate(contact.timestamp || contact.submittedAt) || ""}"`,
        `"${contact.status || "new"}"`,
      ]
      csvRows.push(row.join(","))
    })

    const csvContent = csvRows.join("\n")

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `get-started-submissions-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    if (link.parentNode) link.parentNode.removeChild(link)
    try {
      URL.revokeObjectURL(url)
    } catch (e) {
      // ignore
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
      case "in-progress":
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">In Progress</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">New</span>
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Get Started Submissions</h1>
        <button
          onClick={exportToCSV}
          disabled={contacts.length === 0}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium">No submissions yet</h3>
          <p className="text-gray-500 mt-2">Get Started submissions will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Phone
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Company
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Submitted At
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-xs text-gray-500 sm:hidden mt-1">{contact.email}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{contact.email}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">
                        {contact.phone || '-'}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">{contact.company || '-'}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{formatDate(contact.timestamp || contact.submittedAt)}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(contact.status)}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => viewContactDetails(contact)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(contact.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Contact Modal */}
      {showViewModal && viewContact && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Submission Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="text-base">{viewContact.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-base break-words">{viewContact.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                <p className="text-base">
                  {viewContact.phone || '-'}
                </p>
              </div>
              {viewContact.company && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Company</h4>
                  <p className="text-base">{viewContact.company}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <p className="text-base whitespace-pre-wrap">{viewContact.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Submitted At</h4>
                <p className="text-base">{formatDate(viewContact.timestamp || viewContact.submittedAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <div className="mt-1">{getStatusBadge(viewContact.status)}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    updateStatus(viewContact.id, "new")
                    setViewContact({ ...viewContact, status: "new" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewContact.status === "new"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => {
                    updateStatus(viewContact.id, "in-progress")
                    setViewContact({ ...viewContact, status: "in-progress" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewContact.status === "in-progress"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => {
                    updateStatus(viewContact.id, "completed")
                    setViewContact({ ...viewContact, status: "completed" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewContact.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
