"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { addToWaitlist } from "@/lib/firebase";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function PortalContent({ 
  isOpen, 
  onClose, 
  onSubmit, 
  email, 
  setEmail, 
  isSubmitting, 
  isSuccess, 
  error, 
  handleSubmit,
  referralLink
}) {
  const [buttonText, setButtonText] = useState('Join the waitlist');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileBreakpoint = 640;
      setIsMobile(window.innerWidth < mobileBreakpoint);
      if (window.innerWidth < mobileBreakpoint) {
        setButtonText('Join');
      } else {
        setButtonText('Join the waitlist');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const overlayStyle = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    width: '100vw',
    height: '100vh',
    zIndex: '2147483647',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    isolation: 'isolate'
  };

  const modalStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '38rem',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '1.5rem',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    zIndex: '2147483647',
    isolation: 'isolate',
    minHeight: '24rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '1.25rem',
    right: '1.25rem',
    zIndex: '2147483647',
    padding: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={closeButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <X style={{ width: '20px', height: '20px', color: 'rgb(107, 114, 128)' }} />
            </button>

            {/* Header with Logo */}
            <div style={{ position: 'relative', padding: '2rem 2rem 1.5rem', textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ marginBottom: '1.5rem' }}
              >
                <Image
                  src="/bepaymoney.svg"
                  alt="BePayMoney"
                  width={180}
                  height={70}
                  style={{ 
                    margin: '0 auto', 
                    borderRadius: '0.75rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    padding: '0.5rem' 
                  }}
                />
              </motion.div>

              {!isSuccess && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                >
                  <h2
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      color: 'rgb(55, 65, 81)',
                      // Increased marginBottom for more gap
                      marginBottom: '2.5rem', 
                      textAlign: 'center',
                      lineHeight: '1.3',
                      backgroundImage: 'linear-gradient(to bottom, #4a4a4a, #9c9c9c)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Every business starts with a spark!
                  </h2>
                </motion.div>
              )}
            </div>

            {/* Form Content */}
            <div style={{ padding: '0 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{ textAlign: 'center', padding: '1rem 0' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Heading */}
                    <div className="-mt-9 mb-6">
                      <h2 
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          marginBottom: '0.5rem',
                          backgroundImage: 'linear-gradient(to bottom, #4a4a4a, #9c9c9c)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        Yay! You’re on the waitlist.
                      </h2>
                      <p className="text-sm text-gray-600 mt-6 ">
                        We’ll email you as soon as we launch!
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      onClick={onClose}
                      style={{
                        padding: '0.75rem 2rem',
                        borderRadius: '9999px',
                        backgroundColor: '#111827',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: 'none',
                        marginTop: '0.2rem' 
                      }}
                    >
                      Awesome!
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // Changed gap here to control spacing
                      gap: '1.5rem',
                      maxWidth: '32rem',
                      margin: '0 auto'
                    }}
                  >
                    {/* New container for subtext and input/button */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                      {/* Subtext */}
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#333333',
                        textAlign: 'center',
                        whiteSpace: isMobile ? 'normal' : 'nowrap',
                        // Margin adjustment to space it from the input container
                        marginBottom: '1rem',
                      }}>
                        We&apos;re launching soon! Join the waitlist and stay ahead of other businesses!
                      </p>

                      {/* Input + Button Container */}
                      <div style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        border: isMobile ? 'none' : '1px solid rgb(209, 213, 219)', 
                        borderRadius: '9999px', 
                        overflow: 'hidden', 
                        backgroundColor: isMobile ? 'transparent' : 'rgb(249, 250, 251)',
                        // Removed margin here and added it to the paragraph above
                        marginTop: '0',
                        // Responsive flex direction and gap
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '0.5rem' : '0',
                        padding: isMobile ? '0' : '0',
                      }}>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={{
                            flex: 1,
                            height: '3.5rem',
                            padding: '0 1.5rem',
                            border: isMobile ? '1px solid rgb(209, 213, 219)' : 'none',
                            outline: 'none',
                            fontSize: '1rem',
                            backgroundColor: 'rgb(249, 250, 251)',
                            color: 'rgb(17, 24, 39)',
                            width: '100%',
                            borderRadius: '9999px',
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit(e);
                            }
                          }}
                        />
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email}
                          style={{
                            height: '3.5rem',
                            padding: '0 1.5rem',
                            backgroundColor: '#000000',
                            color: 'white',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '400',
                            cursor: isSubmitting || !email ? 'not-allowed' : 'pointer',
                            opacity: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            borderRadius: '9999px',
                            margin: isMobile ? '0' : '0.5rem',
                            width: isMobile ? '100%' : 'auto',
                          }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              style={{
                                width: "1rem",
                                height: "1rem",
                                border: "2px solid white",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                                margin: "auto",
                              }}
                            />
                          ) : (
                            <span>{buttonText}</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ 
                          marginTop: '0.5rem',
                          color: 'rgb(239, 68, 68)', 
                          fontSize: '0.875rem',
                          textAlign: 'center'
                        }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WaitlistPopup({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onSubmit: externalOnSubmit,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  const searchParams = useSearchParams();
  const referredBy = searchParams.get("referralId") || searchParams.get("referalId");

  const finalIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const onClose = externalOnClose || (() => setIsOpen(false));
  const onSubmit = externalOnSubmit || (() => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (finalIsOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
        document.documentElement.style.overflow = 'unset';
      };
    }
  }, [finalIsOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { referralId } = await addToWaitlist(email, referredBy);
      const link = `${window.location.origin}/?referralId=${referralId}`;
      setReferralLink(link);

      setIsSuccess(true);

      setTimeout(() => {
        onSubmit();
        onClose();
        setIsSuccess(false);
        setEmail("");
      }, 12000);
    } catch (error) {
      setError(error.message || "Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <PortalContent
      isOpen={finalIsOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      error={error}
      handleSubmit={handleSubmit}
      referralLink={referralLink}
    />,
    document.body
  );
}