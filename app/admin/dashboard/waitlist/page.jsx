"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatDate } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";

export default function WaitlistPage() {
  const [waitlistEntries, setWaitlistEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const collections = ["waitlistPersonal", "waitlistBusiness", "waitlistUpi"];
        let allEntries = [];

        for (const colName of collections) {
          const q = query(collection(db, colName), orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            allEntries.push({
              id: doc.id,
              ...data,
              collection: colName,
              // Normalize timestamp
              timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp)
            });
          });
        }

        // Sort by timestamp desc
        allEntries.sort((a, b) => b.timestamp - a.timestamp);

        setWaitlistEntries(allEntries);
      } catch (error) {
        console.error("Error fetching waitlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  const exportToCSV = () => {
    if (waitlistEntries.length === 0) return;

    const headers = ["Email", "Source", "Collection", "Campaign ID", "Date"];
    const csvRows = [headers.join(",")];

    waitlistEntries.forEach((entry) => {
      const row = [
        `"${entry.email || ""}"`,
        `"${entry.source || ""}"`,
        `"${entry.collection || ""}"`,
        `"${entry.campaignId || ""}"`,
        `"${formatDate(entry.timestamp) || ""}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `waitlist-entries-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Waitlist Entries</h1>
        <button
          onClick={exportToCSV}
          disabled={waitlistEntries.length === 0}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : waitlistEntries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium">No waitlist entries yet</h3>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waitlistEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.source === 'business' ? 'bg-blue-100 text-blue-800' : 
                        entry.source === 'upi' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {entry.source || 'personal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(entry.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
