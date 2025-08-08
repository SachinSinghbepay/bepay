"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent({
  isOpen,
  onClose,
  onAcceptAll,
  onRejectNonEssentials,
  onSavePreferences,
}) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    tracking: false,
    functionality: false,
    marketing: false,
  });

  const handleToggle = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      tracking: true,
      functionality: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    onAcceptAll();
    onClose();
  };

  const handleRejectNonEssentials = () => {
    const essentialOnly = {
      essential: true,
      tracking: false,
      functionality: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    onRejectNonEssentials();
    onClose();
  };

  const handleSavePreferences = () => {
    onSavePreferences(preferences);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-md"
        >
          <div className="bg-black text-white rounded-lg p-6 shadow-2xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and 
                  personalize content. By clicking "Accept All Cookies", you consent to our use of 
                  cookies as described in our Cookies Policy. You can manage your preferences or 
                  withdraw consent at any time.
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!showPreferences ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleRejectNonEssentials}
                    variant="outline"
                    className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800"
                  >
                    Reject non-essentials
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    Accept all cookies
                  </Button>
                </div>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Manage preferences
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <CookieToggle
                    label="Essential cookies"
                    checked={preferences.essential}
                    disabled={true}
                    onChange={() => handleToggle('essential')}
                  />
                  <CookieToggle
                    label="Tracking cookies"
                    checked={preferences.tracking}
                    onChange={() => handleToggle('tracking')}
                  />
                  <CookieToggle
                    label="Functionality cookies"
                    checked={preferences.functionality}
                    onChange={() => handleToggle('functionality')}
                  />
                  <CookieToggle
                    label="Marketing cookies"
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => setShowPreferences(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    Save preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



function CookieToggle({ label, checked, disabled = false, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-white' : 'bg-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
            checked ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'
          }`}
        />
      </button>
    </div>
  );
}
