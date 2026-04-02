"use client";
import { useEffect } from "react";

export default function ModalRoot({ children, onClose }) {
useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 ">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {children}
      </div>
    </div>
  );
}