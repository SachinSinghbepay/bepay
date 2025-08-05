"use client";

import { useState, useEffect } from "react";
import { getAllSubscribers, deleteSubscriber } from "@/lib/newsletter";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatDate } from "@/lib/utils";
import { Trash2, Download } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const data = await getAllSubscribers();
      setSubscribers(data);
      setLoading(false);
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    const result = await deleteSubscriber(deleteId);
    if (result.success) {
      setSubscribers(
        subscribers.filter((subscriber) => subscriber.id !== deleteId)
      );
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const exportToCSV = () => {
    if (subscribers.length === 0) return;

    // Create CSV content
    const headers = [ "Email",  "Subscribed At"];
    const csvRows = [headers.join(",")];

    subscribers.forEach((subscriber) => {
      const row = [
        `"${subscriber.fullName || ""}"`,
        `"${subscriber.email || ""}"`,
        `"${subscriber.country || ""}"`,
        `"${formatDate(subscriber.subscribedAt) || ""}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
   
      <AdminLayout>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
          <button
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
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
        ) : subscribers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium">No subscribers yet</h3>
            <p className="text-gray-500 mt-2">
              Subscribers will appear here when people sign up for your
              newsletter
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                 
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Subscribed At
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                     
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {subscriber.email}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1">
                          {formatDate(subscriber.subscribedAt)}
                        </div>
                      </td>
                     
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-900">
                          {formatDate(subscriber.subscribedAt)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => confirmDelete(subscriber.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Delete</span>
                        </button>
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
                Are you sure you want to delete this subscriber? This action
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
