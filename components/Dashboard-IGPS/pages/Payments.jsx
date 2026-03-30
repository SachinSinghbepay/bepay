"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IgpsService } from "@/services/igpsService";
import { useAuth } from "../context/AuthContext";



export default function Payments({ onOpenModal }) {
  const { igpsService } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");

  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const filters = [
    "All",
    ...Array.from(new Set(orders.map(o => o.status).filter(Boolean)))
      .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()),
  ];


  const tokenIcons = {
    USDC: "/icons/USDC.svg",
    USDT: "/icons/USDT.svg",
    DAI: "/icons/dai.svg",
    BTC: "/icons/btc.svg",
    ETH: "/icons/Eth.png",
    USD: "/icons/usa.svg",
    EUR: "/icons/europe.png",
    GBP: "/icons/usa.svg",
  };

  const fiatIcons = {
    USD: "/icons/usa.svg",
    INR: "/icons/india.svg",
    EUR: "/icons/europe.png",
    GBP: "/icons/uk.svg"
  };
  const getTokenIcon = (sourceCurrency) => {
    if (!sourceCurrency) return "/icons/default-token.svg";

    const token = sourceCurrency.split("_")[0]; // USDC_POL -> USDC

    return tokenIcons[token] || "/icons/default-token.svg";
  };

  const getFiatIcon = (currency) => {
    return fiatIcons[currency] || "/icons/default-flag.svg";
  };

  /* =========================
     FETCH ORDERS
  ========================== */

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await igpsService.listOrders({
          page: currentPage,
          limit: rowsPerPage,
        });

        if (res.success) {
          if (res.success && res.data) {
            setOrders(res.data.orders || []);
            setPagination(res.data.pagination || null);
          }
          console.log("API RESPONSE:", res);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, rowsPerPage]);

  /* =========================
     PAGINATION VALUES
  ========================== */

  const totalItems = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  /* =========================
     HELPERS
  ========================== */

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    const d = new Date(dateStr);

    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPayerName = (order) => {
    const b = order.beneficiary;
    if (!b) return "-";

    if (b.firstName && b.lastName) {
      return `${b.firstName} ${b.lastName}`;
    }

    return b.fullName || "-";
  };

  const renderConversion = (order) => {
    const sourceAmount = Number(order.sourceAmount || 0).toLocaleString();
    const targetAmount = Number(order.targetAmount || 0).toLocaleString();

    return (
      <div className="flex items-center gap-8">

        <div className="flex items-center gap-3">
          <Image
            src={getTokenIcon(order.sourceCurrency)}
            width={32}
            height={32}
            alt={order.sourceCurrency}
          />
          <div>
            <div className="font-semibold text-gray-900 leading-tight">
              {sourceAmount}
            </div>
            <div className="text-xs text-gray-500">
              {order.sourceCurrency}
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-lg">
          →
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={getFiatIcon(order.targetCurrency)}
            width={28}
            height={28}
            alt={order.targetCurrency}
          />
          <div>
            <div className="font-semibold text-gray-900 leading-tight">
              {targetAmount}
            </div>
            <div className="text-xs text-gray-500">
              {order.targetCurrency}
            </div>
          </div>
        </div>

      </div>
    );
  };

  const renderStatus = (status) => {
    const s = status?.toLowerCase();

    const base =
      "inline-flex items-center justify-center rounded-full text-xs font-medium px-3 py-1";

    if (s === "failed") {
      return <span className={`${base} bg-red-100 text-red-600`}>Failed</span>;
    }

    if (s === "completed" || s === "received") {
      return <span className={`${base} bg-green-100 text-green-600`}>Received</span>;
    }

    if (s === "cancelled") {
      return <span className={`${base} bg-gray-200 text-gray-600`}>Cancelled</span>;
    }

    return (
      <span className={`${base} bg-gray-200 text-gray-600`}>
        {status}
      </span>
    );
  };
  /* =========================
     UI
  ========================== */
  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(order =>
          order.status?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="w-full p-8">

      {/* Filters + Button */}
      <div className="flex items-center justify-between gap-6 mb-8">

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {filters.map((filter, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1); // reset pagination
                }}
                className={`px-5 h-10 rounded-full text-sm whitespace-nowrap transition-colors
      ${activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* <button className="shrink-0 bg-black text-white h-12 px-7 rounded-full text-sm font-medium">
          Request payment
        </button> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <div className="min-w-[900px]">

          {/* Header */}
          <div className="grid grid-cols-[1.2fr_2.8fr_0.8fr_1.4fr_0.8fr] text-sm text-gray-500 px-6 pb-4 border-b">
            <div>Payer</div>
            <div>Conversion</div>
            <div>Status</div>
            <div>Requested on (Date)</div>
            <div>Details</div>
          </div>

          {/* Rows */}
          <div className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No payments found.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[1.2fr_2.8fr_0.8fr_1.4fr_0.8fr] items-center bg-gray-100 rounded-2xl px-6 py-6 text-[16px]" >
                  <div className="font-semibold text-gray-900">
                    {getPayerName(order)}
                  </div>

                  <div className="flex items-center">
                    {renderConversion(order)}
                  </div>

                  <div className="pr-6">
                    {renderStatus(order.status)}
                  </div>

                  <div className="text-gray-600 font-medium">
                    {formatDate(order.quote?.createdAt)}
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        onOpenModal("payment-details", {
                          order
                        })
                      }
                      className="underline font-semibold text-gray-800"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 text-sm text-gray-600">

        <div>
          Showing {startItem}–{endItem} of {totalItems}
        </div>

        <div className="flex items-center gap-4">

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

          <div className="border rounded-full px-4 py-2 bg-white">
            {startItem}–{endItem} of {totalItems}
          </div>

          <div className="flex border rounded-full overflow-hidden bg-white">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage <= 1 || loading}
              className="px-4 py-2 disabled:opacity-40"
            >
              ‹
            </button>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= totalPages || loading}
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