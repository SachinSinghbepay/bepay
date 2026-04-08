"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import ModalFrame from "./ModalFrame";

const PERIODS = [
    { label: "This month", value: "this_month" },
    { label: "Last month", value: "last_month" },
    { label: "Last 3 months", value: "last_3_months" },
    { label: "Last 6 months", value: "last_6_months" },
    { label: "Last year", value: "last_year" },
    { label: "Custom", value: "custom" },
];

function getRangeForPeriod(period) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    switch (period) {
        case "this_month":
            start.setDate(1);
            return { start, end: today };
        case "last_month": {
            const s = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0, 0);
            const e = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
            return { start: s, end: e };
        }
        case "last_3_months":
            start.setMonth(start.getMonth() - 3);
            return { start, end: today };
        case "last_6_months":
            start.setMonth(start.getMonth() - 6);
            return { start, end: today };
        case "last_year":
            start.setFullYear(start.getFullYear() - 1);
            return { start, end: today };
        default:
            return null;
    }
}

function filterTxns(transactions, period, customStart, customEnd) {
    let range = period === "custom"
        ? (customStart && customEnd ? { start: customStart, end: new Date(customEnd.getFullYear(), customEnd.getMonth(), customEnd.getDate(), 23, 59, 59, 999) } : null)
        : getRangeForPeriod(period);

    if (!range) return transactions;
    return transactions.filter(tx => {
        const d = new Date(tx.raw?.createdAt || tx.date);
        return !isNaN(d) && d >= range.start && d <= range.end;
    });
}

function fmt(date) {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MiniCalendar({ rangeStart, rangeEnd, onSelect }) {
    const today = new Date();
    const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const prevMonth = () => setView(v => new Date(v.getFullYear(), v.getMonth() - 1, 1));
    const nextMonth = () => setView(v => new Date(v.getFullYear(), v.getMonth() + 1, 1));

    const firstDay = view.getDay();
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));

    const isSame = (a, b) => a && b && a.toDateString() === b.toDateString();
    const inRange = (d) => {
        if (!rangeStart || !rangeEnd || !d) return false;
        return d > rangeStart && d < rangeEnd;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 w-[280px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <span className="font-semibold text-sm">
                    {MONTHS[view.getMonth()].toUpperCase()}, {view.getFullYear()}
                </span>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                    <span key={d} className="text-center text-[11px] text-gray-400 font-medium">{d}</span>
                ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
                {cells.map((d, i) => {
                    if (!d) return <span key={i} />;
                    const isStart = isSame(d, rangeStart);
                    const isEnd = isSame(d, rangeEnd);
                    const between = inRange(d);
                    return (
                        <button
                            key={i}
                            onClick={() => onSelect(d)}
                            className={`h-8 w-8 mx-auto rounded-xl text-sm flex items-center justify-center transition cursor-pointer
                                ${isStart || isEnd ? "bg-black text-white font-semibold" : ""}
                                ${between ? "bg-gray-200 text-gray-800" : ""}
                                ${!isStart && !isEnd && !between ? "hover:bg-gray-100 text-gray-700" : ""}
                            `}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function DownloadStatementModal({ onClose, transactions = [], onFilterChange, initialPeriod = "this_month", initialCustomStart = null, initialCustomEnd = null }) {
    const [period, setPeriod] = useState(initialPeriod);
    const [customStart, setCustomStart] = useState(initialCustomStart);
    const [customEnd, setCustomEnd] = useState(initialCustomEnd);
    const [pickingSecond, setPickingSecond] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        if (!calendarOpen) return;
        const handler = (e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                setCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [calendarOpen]);

    const handleCalendarSelect = (date) => {
        if (!customStart || (!pickingSecond && customStart && customEnd)) {
            // Start fresh
            setCustomStart(date);
            setCustomEnd(null);
            setPickingSecond(true);
        } else {
            // Second pick
            if (date < customStart) {
                setCustomEnd(customStart);
                setCustomStart(date);
            } else {
                setCustomEnd(date);
            }
            setPickingSecond(false);
            setCalendarOpen(false);
        }
    };

    const filtered = filterTxns(transactions, period, customStart, customEnd);

    useEffect(() => {
        onFilterChange?.(filtered, period, customStart, customEnd);
    }, [period, customStart, customEnd]);

    const txCount = filtered.length;
    const countLabel = txCount === 0 ? "(No transactions found)" : `(${txCount} transaction${txCount > 1 ? "s" : ""} found)`;

    const handleDownload = () => {
        if (txCount === 0) return;
        setDownloading(true);

        try {
            const doc = new jsPDF();
            const pageW = doc.internal.pageSize.getWidth();

            // Title
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("Transaction Statement", pageW / 2, 20, { align: "center" });

            // Period subtitle
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100);
            let periodLabel = PERIODS.find(p => p.value === period)?.label || "Custom";
            if (period === "custom" && customStart && customEnd) {
                periodLabel = `${fmt(customStart)} – ${fmt(customEnd)}`;
            }
            doc.text(`Period: ${periodLabel}`, pageW / 2, 28, { align: "center" });
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageW / 2, 34, { align: "center" });

            // Table header
            doc.setTextColor(0);
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            const cols = [14, 55, 105, 135, 170];
            const headers = ["Amount", "Date", "Status", "To/From", "Type"];
            let y = 46;

            doc.setFillColor(240, 240, 240);
            doc.rect(14, y - 5, pageW - 28, 8, "F");
            headers.forEach((h, i) => doc.text(h, cols[i], y));
            y += 8;

            // Table rows
            doc.setFont("helvetica", "normal");
            filtered.forEach((tx, idx) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                if (idx % 2 === 0) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(14, y - 4, pageW - 28, 7, "F");
                }
                const sign = tx.type === "sent" ? "-" : "+";
                doc.text(`${sign}${tx.amount} ${tx.currency}`, cols[0], y);
                doc.text(tx.date || "-", cols[1], y);
                doc.text(tx.status || "-", cols[2], y);
                doc.text((tx.email || "-").substring(0, 18), cols[3], y);
                doc.text(tx.kind || tx.type || "-", cols[4], y);
                y += 7;
            });

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`BePay — ${txCount} transaction(s)`, pageW / 2, 285, { align: "center" });

            doc.save(`bepay-statement-${periodLabel.replace(/\s/g, "-").toLowerCase()}.pdf`);
        } catch (e) {
            console.error("PDF error", e);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <ModalFrame size="sm" height="h-auto">
                   {/* HEADER */}
                <div className="relative flex items-center justify-center p-4 sm:px-8 pt-6 mb-5">
                  

                    <h2 className="text-lg font-semibold text-gray-900">
                       Download statement
                    </h2>

                    {/* Close */}
                    <button
                        className="absolute right-8 text-xl text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <Image src="/icons/close.png" alt="close" width={16} height={16} />
                    </button>
                </div>
            <div className="bg-white rounded-3xl px-8  relative h-[60vh] flex flex-col gap-6">

         

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-4">Select period</p>
                    <div className="space-y-4">
                        {PERIODS.map(p => {
                            const active = period === p.value;
                            const isThisPeriod = p.value !== "custom";
                            const count = isThisPeriod
                                ? filterTxns(transactions, p.value, null, null).length
                                : null;

                            return (
                                <label key={p.value} className="flex items-center gap-3 cursor-pointer select-none">
                                    {/* Checkbox */}
                                    <div
                                        onClick={() => setPeriod(active ? null : p.value)}
                                        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition
                                            ${active ? "bg-black border-black" : "border-gray-300"}`}
                                    >
                                        {active && (
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>

                                    <span
                                        onClick={() => setPeriod(active ? null : p.value)}
                                        className="text-sm text-gray-800"
                                    >
                                        {p.label}
                                        {active && isThisPeriod && (
                                            <span className="text-gray-400 ml-2">
                                                {count === 0 ? "(No transactions found)" : `(${count} transaction${count !== 1 ? "s" : ""} found)`}
                                            </span>
                                        )}
                                        {active && p.value === "custom" && customStart && customEnd && (
                                            <span className="text-gray-400 ml-2">{countLabel}</span>
                                        )}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Custom date range */}
                {period === "custom" && (
                    <div className="space-y-3 ">
                        {/* Date range display */}
                        <div className="relative">
                            <button
                                onClick={() => setCalendarOpen(v => !v)}
                                className="w-full flex items-center gap-2 px-4 py-3 cursor-pointer rounded-xl border border-[#B7B7B7] text-sm text-gray-700 bg-[#F6F6F6] hover:border-gray-400 transition text-left"
                            >
                             <Image 
                             alt="calender"
                             width={20}
                             height={20}
                             className=""
                             src="/icons/calendar.png"
                             />
                                <span className={customStart ? "text-gray-800" : "text-gray-400"}>
                                    {customStart ? fmt(customStart) : "Start date"}
                                </span>
                                <span className="text-gray-300">–</span>
                                <span className={customEnd ? "text-gray-800" : "text-gray-400"}>
                                    {customEnd ? fmt(customEnd) : "End date"}
                                </span>
                                {pickingSecond && customStart && (
                                    <span className="ml-auto text-xs text-gray-400">Pick end date</span>
                                )}
                            </button>

                            {/* Floating calendar */}
                            {calendarOpen && (
                                <div ref={calendarRef} className="absolute bottom-full mb-2 left-0 z-50">
                                    <MiniCalendar
                                        rangeStart={customStart}
                                        rangeEnd={customEnd}
                                        onSelect={handleCalendarSelect}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Download button */}
                <div className="mt-auto">
                    <button
                        onClick={handleDownload}
                        disabled={txCount === 0 || downloading || (period === "custom" && (!customStart || !customEnd))}
                        className={`mb-2 w-full h-14 rounded-2xl text-white font-medium transition cursor-pointer
                            ${txCount === 0 || (period === "custom" && (!customStart || !customEnd))
                                ? "bg-black/50 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {downloading ? "Generating..." : "Download PDF"}
                    </button>
                </div>
            </div>
        </ModalFrame>
    );
}
