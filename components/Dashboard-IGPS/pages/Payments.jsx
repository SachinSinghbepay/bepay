"use client";
import Image from "next/image";
import React from "react";
import { IgpsService } from "@/services/igpsService";
const igpsService = new IgpsService();

export default function Payments({ onOpenModal }) {
  const payments = [
    {
      id: 1,
      payer: "Chahat pvt ltd",
      amount: "USD 1000",
      status: "Requested",
      date: "Jan 31, 2026, 09:35 PM",
    },
    {
      id: 2,
      payer: "Chahat pvt ltd",
      amount: "USD 1000",
      status: "Awaiting",
      date: "Jan 31, 2026, 09:35 PM",
    },
    {
      id: 3,
      payer: "Chahat pvt ltd",
      amount: "USD 1000",
      status: "Received",
      date: "Jan 31, 2026, 09:35 PM",
    },
  ];

  const filters = [
    "All",
    "Requested",
    "Awaiting",
    "Received",
    "Failed",
    "Cancelled",
    "Rejected",
  ];

  const totalItems = 195;

  const allPayments = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    payer: `Chahat pvt ltd ${i + 1}`,
    amount: "USD 1000",
    status:
      i % 3 === 0
        ? "Requested"
        : i % 3 === 1
          ? "Awaiting"
          : "Received",
    date: "Jan 31, 2026, 09:35 PM",
  }));

  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const totalPages = Math.ceil(allPayments.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentPayments = allPayments.slice(startIndex, endIndex);

  const [orders, setOrders] = React.useState([]);
  const [pagination, setPagination] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await igpsService.listOrders({
          page: currentPage,
          limit: rowsPerPage,
        });
        if (res.success && res.data) {
          setOrders(res.data.orders ?? []);
          setPagination(res.data.pagination ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, rowsPerPage]);


  const renderStatus = (status) => {
    if (status === "Requested") {
      return (
        <div className="flex items-center gap-2 font-semibold text-gray-600">
          Requested
          <div className="bg-gray-200 py-2 px-2 rounded-lg">
            <Image
              width={5}
              height={5}
              src='/icons/pending.svg'
              alt='status'
              className="w-4 h-4"
            />
          </div>
        </div>
      );
    }

    if (status === "Awaiting") {
      return (
        <div className="flex items-center gap-2 font-semibold text-gray-600">
          Awaiting
          <div className="bg-gray-200 py-2 px-2 rounded-lg">
            <Image
              width={5}
              height={5}
              src='/icons/pending.svg'
              alt='status'
              className="w-4 h-4"
            />
          </div>
        </div>
      );
    }

    if (status === "Received") {
      return (
        <div className="flex items-center gap-2 font-semibold text-gray-600">
          Received
          <div className="bg-gray-200 py-2 px-2 rounded-lg">
            <Image
              width={5}
              height={5}
              src='/icons/check.svg'
              alt='status'
              className="w-4 h-4"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full p-8">
      {/* Top Section: Filters + Button */}
      <div className="flex items-center justify-between gap-6 mb-8">

        {/* Filters (scrollable only this area) */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {filters.map((filter, i) => (
              <button
                key={i}
                className={`px-5 h-10 rounded-full text-sm whitespace-nowrap ${filter === "All"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Request Button (fixed, not scrollable) */}
        <button className="shrink-0 bg-black text-white h-12 px-7 rounded-full text-sm font-medium">
          Request payment
        </button>
      </div>

      {/* Horizontal Scroll for Table on small screens */}
      <div className="overflow-x-auto mt-4">
        <div className="min-w-[900px]">

          {/* Table Header */}
          <div className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(150px,1.2fr)_minmax(220px,2fr)_minmax(120px,1fr)] text-sm text-gray-500 px-6 pb-4 border-b">
            <div>Payer</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Requested on (Date)</div>
            <div>Details</div>
          </div>

          {/* Rows */}
          <div className="space-y-4 mt-6 b">
            {currentPayments.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(150px,1.2fr)_minmax(220px,2fr)_minmax(120px,1fr)] items-center bg-gray-100 rounded-2xl px-6 py-6 text-[16px]"
              >
                <div className="font-semibold text-gray-900">
                  {item.payer}
                </div>

                <div className="font-semibold text-gray-900">
                  {item.amount}
                </div>

                {renderStatus(item.status)}

                <div className=" text-gray-600 font-medium ">
                  {item.date}
                </div>

                <div>
                  <button className="underline font-semibold text-gray-800">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="flex items-center justify-between mt-8 text-sm text-gray-600">

        {/* Left: Showing text */}
        <div>
          Showing {startIndex + 1}–
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">

          {/* Rows per page */}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-full px-4 py-2 bg-white"
          >
            <option value={10}>10 rows per page</option>
            <option value={20}>20 rows per page</option>
            <option value={50}>50 rows per page</option>
          </select>

          {/* Range display */}
          <div className="border rounded-full px-4 py-2 bg-white">
            {startIndex + 1}–
            {Math.min(endIndex, totalItems)} of {totalItems}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex border rounded-full overflow-hidden bg-white">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 disabled:opacity-40"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 disabled:opacity-40"
            >
              ›
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}