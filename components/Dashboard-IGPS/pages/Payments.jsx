"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useSWR from 'swr';


const STATUS_LABELS = {
  failed:                 { label: "Failed",           cls: "bg-red-100 text-red-600" },
  completed:              { label: "Received",         cls: "bg-green-100 text-green-600" },
  received:               { label: "Received",         cls: "bg-green-100 text-green-600" },
  cancelled:              { label: "Cancelled",        cls: "bg-gray-200 text-gray-600" },
  pending:                { label: "Pending",          cls: "bg-blue-100 text-blue-600" },
  created:                { label: "Created",          cls: "bg-blue-100 text-blue-600" },
  awaiting_funds_timeout: { label: "Awaiting Timeout", cls: "bg-yellow-100 text-yellow-700" },
  awaiting_funds:         { label: "Awaiting",         cls: "bg-yellow-100 text-yellow-700" },
  processing:             { label: "Processing",       cls: "bg-blue-100 text-blue-600" },
};

export default function Payments({ onOpenModal }) {
  const { igpsService } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { data, isValidating } = useSWR(
    ['igps-payments', currentPage, rowsPerPage],
    async () => {
      const res = await igpsService.getTransactions({ page: currentPage, limit: rowsPerPage });
      if (res.success && res.data) {
        return {
          orders: res.data.transactions || [],
          pagination: res.data.pagination || null,
          byStatus: res.data.summary?.byStatus || {},
        };
      }
      return { orders: [], pagination: null, byStatus: {} };
    }
  );

  const orders = data?.orders ?? [];
  const pagination = data?.pagination ?? null;
  const byStatus = data?.byStatus ?? {};
  const loading = !data && isValidating;
  const updating = !!data && isValidating;

  // Build filters from summary — only statuses with count > 0
  const filters = [
    { key: "All", label: "All" },
    ...Object.entries(byStatus)
      .filter(([, count]) => count > 0)
      .map(([key]) => ({
        key,
        label: STATUS_LABELS[key]?.label ?? (key.charAt(0).toUpperCase() + key.slice(1)),
      })),
  ];

  const TOKEN_ICON_SIZE = 40;
  const FIAT_ICON_SIZE = 28;

  const tokenIcons = {
    USDC: "/icons/USDC.svg",
    USDT: "/icons/USDT.svg",
    DAI: "/icons/dai.svg",
    BTC: "/icons/btc.svg",
    ETH: "/icons/Eth.png",
  };

  const fiatIcons = {
    USD: "/icons/usa.svg",
    INR: "/icons/india.svg",
    EUR: "/icons/europe.png",
    GBP: "/icons/uk.svg"
  };

  // Returns { src, isFiat } so renderConversion can pick the right size
  const getSourceIcon = (sourceCurrency) => {
    if (!sourceCurrency) return { src: "/icons/default-token.svg", isFiat: false };
    const token = sourceCurrency.split("_")[0];
    if (tokenIcons[token]) return { src: tokenIcons[token], isFiat: false };
    if (fiatIcons[token]) return { src: fiatIcons[token], isFiat: true };
    return { src: "/icons/default-token.svg", isFiat: false };
  };

  const getFiatIcon = (currency) => {
    return fiatIcons[currency] || "/icons/default-flag.svg";
  };

  const totalItems = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const getPayerName = (order) => {
    return order.to?.name || order.from?.name || order.beneficiary?.fullName
      || (order.beneficiary?.firstName ? `${order.beneficiary.firstName} ${order.beneficiary.lastName}` : null)
      || "-";
  };

  const renderConversion = (order) => {
    // getTransactions: amount + currency = source, targetAmount + targetCurrency = dest
    const sourceAmount = Number(order.amount ?? order.sourceAmount ?? 0).toLocaleString();
    const sourceCurrency = order.currency ?? order.sourceCurrency ?? "";
    const targetAmount = Number(order.targetAmount || 0).toLocaleString();
    const { src: sourceSrc, isFiat: sourceIsFiat } = getSourceIcon(sourceCurrency);
    const sourceSize = sourceIsFiat ? FIAT_ICON_SIZE : TOKEN_ICON_SIZE;
    return (
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Image src={sourceSrc} width={sourceSize} height={sourceSize} alt={sourceCurrency} className="shrink-0" style={{ width: sourceSize, height: sourceSize }} />
          <div>
            <div className="font-semibold text-gray-900 leading-tight">{sourceAmount}</div>
            <div className="text-xs text-gray-500">{sourceCurrency}</div>
          </div>
        </div>
        <div className="text-gray-400 text-lg">→</div>
        <div className="flex items-center gap-3">
          <Image src={getFiatIcon(order.targetCurrency)} width={FIAT_ICON_SIZE} height={FIAT_ICON_SIZE} alt={order.targetCurrency} className="shrink-0" style={{ width: FIAT_ICON_SIZE, height: FIAT_ICON_SIZE }} />
          <div>
            <div className="font-semibold text-gray-900 leading-tight">{targetAmount}</div>
            <div className="text-xs text-gray-500">{order.targetCurrency}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatus = (status) => {
    const key = status?.toLowerCase();
    const base = "inline-flex items-center justify-center rounded-full text-xs font-medium px-3 py-1 whitespace-nowrap";
    const { label, cls } = STATUS_LABELS[key] ?? { label: status, cls: "bg-gray-200 text-gray-600" };
    return <span className={`${base} ${cls}`}>{label}</span>;
  };

  const filteredOrders = activeFilter === "All"
    ? orders
    : orders.filter(order => order.status === activeFilter);

  // Reset filter if it's no longer valid (e.g. page change)


  return (
    <div className="w-full px-2 py-4 sm:p-8">

      {/* Filters */}
      <div className="flex items-center justify-between gap-6 mb-8">
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => { setActiveFilter(filter.key); setCurrentPage(1); }}
                className={`px-5 h-10 rounded-full text-sm whitespace-nowrap transition-colors cursor-pointer
                  ${activeFilter === filter.key ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {updating && (
          <svg className="shrink-0 animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4v6h6" /><path d="M20 20v-6h-6" /><path d="M5 15a7 7 0 0011 2l4-4" /><path d="M19 9a7 7 0 00-11-2L4 11" />
          </svg>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <div className="min-w-[900px]">

          {/* Header */}
          <div className="grid grid-cols-[1fr_2.5fr_1fr_1.6fr_0.8fr] text-sm text-gray-500 px-6 pb-4 border-b">
            <div>Payer</div>
            <div>Conversion</div>
            <div>Status</div>
            <div>Requested on (Date)</div>
            <div>Details</div>
          </div>

          {/* Rows */}
          <div className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No payments found.</div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[1fr_2.5fr_1fr_1.6fr_0.8fr] items-center bg-gray-100 rounded-2xl px-6 py-6 text-[16px]"
                >
                  <div className="font-semibold text-gray-900">{getPayerName(order)}</div>
                  <div className="flex items-center">{renderConversion(order)}</div>
                  <div>{renderStatus(order.statusRaw ?? order.status)}</div>
                  <div className="text-gray-600 font-medium">{formatDate(order.createdAt ?? order.timestamp ?? order.quote?.createdAt)}</div>
                  <div>
                    <button
                      onClick={() => {
                        const subType = order.subType ?? "";
                        const isSent = order.from?.type === "user";
                        const KIND_LABELS = {
                          crypto_to_fiat: "Crypto → Fiat",
                          fiat_to_fiat:   "Fiat Transfer",
                          fiat_to_crypto: "Fiat → Crypto",
                          deposit:        "Deposit",
                        };
                        const tx = {
                          id: order.id,
                          amount: order.amount,
                          currency: order.currency,
                          sourceCurrency: order.currency,
                          status: STATUS_LABELS[order.status]?.label ?? order.status,
                          statusRaw: order.statusRaw ?? order.status,
                          isSent,
                          kind: subType,
                          type: KIND_LABELS[subType] ?? "Transfer",
                          email: order.to?.name || order.to?.email || "—",
                          destination: order.to?.name || "—",
                          source: order.from?.name || order.from?.address || "—",
                          createdAt: order.createdAt,
                          depositChain: order.network,
                          exchangeRate: order.exchangeRate
                            ? `1 ${order.currency?.split("_")[0]} = ${order.exchangeRate} ${order.targetCurrency}`
                            : null,
                          recipientAmount: `${order.targetCurrency} ${order.targetAmount}`,
                          networkFee: `${order.fees?.total ?? 0} ${order.currency?.split("_")[0]}`,
                          hash: order.hash,
                          raw: order,
                        };
                        onOpenModal("txn-details", { transaction: tx });
                      }}
                      className="underline text-gray-800 cursor-pointer"
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
      {totalItems > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 text-sm text-gray-600">
          <div>Showing {startItem}–{endItem} of {totalItems}</div>
          <div className="flex items-center gap-3">
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border rounded-full px-4 py-2 bg-white cursor-pointer"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage <= 1 || isValidating}
                className="w-9 h-9 flex items-center justify-center rounded-full border bg-white disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
              >
                ‹
              </button>

              {/* Page numbers */}
              {(() => {
                const pages = [];
                const delta = 2;
                const left = Math.max(2, currentPage - delta);
                const right = Math.min(totalPages - 1, currentPage + delta);

                pages.push(1);
                if (left > 2) pages.push("...");
                for (let i = left; i <= right; i++) pages.push(i);
                if (right < totalPages - 1) pages.push("...");
                if (totalPages > 1) pages.push(totalPages);

                return pages.map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      disabled={isValidating}
                      className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm cursor-pointer transition-colors
                        ${p === currentPage ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50"}`}
                    >
                      {p}
                    </button>
                  )
                );
              })()}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages || isValidating}
                className="w-9 h-9 flex items-center justify-center rounded-full border bg-white disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
