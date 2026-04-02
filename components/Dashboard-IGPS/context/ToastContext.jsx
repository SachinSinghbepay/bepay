"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((toastId) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  const addToast = useCallback((message, type) => {
    const toastId = ++idCounter;
    setToasts(prev => [...prev.slice(-2), { id: toastId, message, type }]);
    setTimeout(() => dismiss(toastId), type === "error" ? 5000 : 3000);
  }, [dismiss]);

  const toast = useMemo(() => ({
    success: (msg) => addToast(msg, "success"),
    error:   (msg) => addToast(msg, "error"),
    info:    (msg) => addToast(msg, "info"),
  }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

/* ─────────────────────────────────────────
   Toast Container + Item
───────────────────────────────────────── */

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .toast-in { animation: toast-in 0.25s ease-out; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </div>
    </>
  );
}

const TYPE_STYLES = {
  success: { bar: "bg-green-500", iconColor: "text-green-600", icon: "✓" },
  error:   { bar: "bg-red-500",   iconColor: "text-red-600",   icon: "✕" },
  info:    { bar: "bg-gray-400",  iconColor: "text-gray-500",  icon: "ℹ" },
};

function ToastItem({ toast, onDismiss }) {
  const s = TYPE_STYLES[toast.type];

  return (
    <div className="toast-in pointer-events-auto flex items-center gap-3 bg-white rounded-2xl shadow-xl pr-4 overflow-hidden min-w-[280px] max-w-[380px]">
      <div className={`w-1 self-stretch shrink-0 ${s.bar}`} />
      <span className={`text-base font-bold shrink-0 ${s.iconColor}`}>{s.icon}</span>
      <p className="text-sm text-gray-800 flex-1 py-4 leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-gray-600 shrink-0 ml-1"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
