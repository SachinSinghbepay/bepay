"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppDownloadPopupWrapper({ children, onClose, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
          />

          {/* Popup container — bottom sheet on mobile, centered on desktop */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              className="bg-white rounded-t-3xl sm:rounded-3xl flex justify-center items-center shadow-xl p-6 sm:p-8 w-full max-w-[960px] h-auto sm:h-[600px] relative pointer-events-auto"
              initial={{ y: 80, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", damping: 28, stiffness: 260 },
              }}
              exit={{
                y: 80,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </Button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
