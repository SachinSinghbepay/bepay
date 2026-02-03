"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Trash2, Download, Eye, X } from "lucide-react" // Re-import necessary icons
import { getAllDeleteRequests, deleteDeleteRequest } from "@/lib/delete-requests" // Import delete function
import { formatDate } from "@/lib/utils" 


export default function DeleteRequestsPage() {
  const [deleteRequests, setDeleteRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [viewRequest, setViewRequest] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      const data = await getAllDeleteRequests()
      setDeleteRequests(data)
      setLoading(false)
    }
    fetchRequests()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    const result = await deleteDeleteRequest(deleteId)
    if (result.success) {
      setDeleteRequests(deleteRequests.filter((request) => request.id !== deleteId))
    }
    setShowDeleteModal(false)
    setDeleteId(null)
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const viewRequestDetails = (request) => {
    setViewRequest(request)
    setShowViewModal(true)
  }

  const exportToCSV = () => {
    if (deleteRequests.length === 0) return

    const headers = ["ID", "Created At", "Email", "Password", "Reason", "Status", "Timestamp"]
    const csvRows = [headers.join(",")]

    deleteRequests.forEach((request) => {
      const row = [
        `"${request.id}"`,
        `"${request.createdAt || ""}"`,
        `"${request.email || ""}"`,
        `"${request.password || ""}"`,
        `"${request.reason?.replace(/"/g, '""') || ""}"`,
        `"${request.status || "pending"}"`,
        `"${formatDate(request.timestamp.toDate()) || ""}"`,
      ]
      csvRows.push(row.join(","))
    })

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `delete-requests-${new Date().toISOString().split("T")[0]}.csv`)
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
      case "rejected":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Rejected</span>
      default: // pending
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Delete Requests</h1>
        <button
          onClick={exportToCSV}
          disabled={deleteRequests.length === 0}
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
      ) : deleteRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium">No delete requests yet</h3>
          <p className="text-gray-500 mt-2">Delete requests will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Reason
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
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
                {deleteRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.id}</div>
                      <div className="text-xs text-gray-500 sm:hidden mt-1">{request.email}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{request.email}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{request.reason || "-"}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">{formatDate(request.timestamp.toDate())}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => viewRequestDetails(request)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(request.id)}
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
              Are you sure you want to delete this request? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Request Modal */}
      {showViewModal && viewRequest && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Request Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">ID</h4>
                <p className="text-base break-words">{viewRequest.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                <p className="text-base">{viewRequest.createdAt}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-base break-words">{viewRequest.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Password</h4>
                <p className="text-base">{viewRequest.password}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Reason</h4>
                <p className="text-base whitespace-pre-wrap">{viewRequest.reason}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Submitted At (Timestamp)</h4>
                <p className="text-base">{formatDate(viewRequest.timestamp.toDate())}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <div className="mt-1">{getStatusBadge(viewRequest.status)}</div>
              </div>
            </div>
            {/* Status update section (optional, similar to ContactsPage) */}
            {/* <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    // updateStatus(viewRequest.id, "pending")
                    // setViewRequest({ ...viewRequest, status: "pending" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewRequest.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    // updateStatus(viewRequest.id, "completed")
                    // setViewRequest({ ...viewRequest, status: "completed" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewRequest.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => {
                    // updateStatus(viewRequest.id, "rejected")
                    // setViewRequest({ ...viewRequest, status: "rejected" })
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewRequest.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}