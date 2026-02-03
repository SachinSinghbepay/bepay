"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppDownloadPopupWrapper({ children, onClose, isVisible }) {
  const popupVariants = {
    hidden: { y: "100vh", opacity: 0 }, // Start from bottom of viewport
    visible: {
      y: "-50%", // Move to center (relative to its own height)
      x: "-50%", // Center horizontally
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
    exit: {
      y: "-100vh", // Exit to top of viewport
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full lg:w-auto pointer-events-none"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }} // Ensure initial positioning is correct
        >
          <div className="bg-white rounded-3xl flex justify-center items-center shadow-xl p-6 sm:p-8 w-full max-w-[960px] h-auto lg:h-[600px] relative pointer-events-auto">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
