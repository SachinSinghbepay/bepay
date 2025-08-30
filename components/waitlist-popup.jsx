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
  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 2147483647,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "0.5rem" : "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    isolation: "isolate",
  };

  const modalStyle = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "22rem" : "38rem",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: isMobile ? "1rem" : "1.5rem",
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    zIndex: 2147483647,
    isolation: "isolate",
    minHeight: isMobile ? "20rem" : "24rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: isMobile ? "0.5rem" : "0",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: isMobile ? "0.75rem" : "1.25rem",
    right: isMobile ? "0.75rem" : "1.25rem",
    zIndex: 2147483647,
    padding: "0.4rem",
    borderRadius: "9999px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <X
                style={{
                  width: isMobile ? "18px" : "20px",
                  height: isMobile ? "18px" : "20px",
                  color: "rgb(107, 114, 128)",
                }}
              />
            </button>

            {/* Header with Logo */}
            <div
              style={{
                padding: isMobile ? "1.5rem 1rem 1rem" : "2rem 2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ marginBottom: isMobile ? "1rem" : "1.5rem" }}
              >
                <Image
                  src="/bepaymoney.svg"
                  alt="BePayMoney"
                  width={isMobile ? 140 : 180}
                  height={isMobile ? 50 : 70}
                  style={{
                    margin: "0 auto",
                    borderRadius: "0.75rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "0.4rem",
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
                      fontSize: isMobile ? "1.25rem" : "1.75rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      lineHeight: "1.3",
                      backgroundImage:
                        "linear-gradient(to bottom, #4a4a4a, #9c9c9c)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Every business starts with a spark!
                  </h2>
                </motion.div>
              )}
            </div>

            {/* Form Content */}
            <div style={{ padding: isMobile ? "0 1rem 1rem" : "0 2rem 2rem" }}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{
                      textAlign: "center",
                      padding: isMobile ? "0.5rem 0" : "1rem 0",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={isMobile ? "-mt-6 mb-4" : "-mt-9 mb-6"}>
                      <h2
                        style={{
                          fontSize: isMobile ? "1.25rem" : "1.5rem",
                          fontWeight: 600,
                          marginBottom: "0.5rem",
                          backgroundImage:
                            "linear-gradient(to bottom, #4a4a4a, #9c9c9c)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        Yay! You’re on the waitlist.
                      </h2>
                      <p
                        style={{
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          color: "#4b5563",
                          marginTop: isMobile ? "0.5rem" : "1.5rem",
                        }}
                      >
                        We’ll email you as soon as we launch!
                      </p>
                    </div>

                    <button
                      onClick={onClose}
                      style={{
                        padding: isMobile ? "0.6rem 1.5rem" : "0.75rem 2rem",
                        borderRadius: "9999px",
                        backgroundColor: "#111827",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                        marginTop: "0.2rem",
                        width: isMobile ? "100%" : "auto",
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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: isMobile ? "1rem" : "1.5rem",
                      maxWidth: "32rem",
                      margin: "0 auto",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: isMobile ? "13px" : "14px",
                        lineHeight: "1.4",
                        color: "#333333",
                        textAlign: "center",
                        marginTop: isMobile ? "-0.5rem" : "0",
                        padding: isMobile ? "0 0.5rem" : "0",
                      }}
                    >
                      We&apos;re launching soon! Join the waitlist and stay
                      ahead of other businesses!
                    </p>

                    {/* Input + Button (Mobile vs Desktop) */}
                    {isMobile ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                        }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={{
                            width: "100%",
                            height: "3.2rem",
                            padding: "0 1rem",
                            border: "1px solid rgb(209, 213, 219)",
                            borderRadius: "9999px",
                            fontSize: "1rem",
                            outline: "none",
                            backgroundColor: "rgb(249, 250, 251)",
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                          }}
                        />

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email}
                          style={{
                            width: "100%",
                            height: "3.2rem",
                            borderRadius: "9999px",
                            backgroundColor: "#000000",
                            color: "white",
                            fontWeight: "600",
                            border: "none",
                            cursor:
                              isSubmitting || !email
                                ? "not-allowed"
                                : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1rem",
                          }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                border: "2px solid white",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            "Join the waitlist"
                          )}
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgb(209, 213, 219)",
                          borderRadius: "9999px",
                          overflow: "hidden",
                          backgroundColor: "rgb(249, 250, 251)",
                        }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={{
                            flex: 1,
                            height: "3.5rem",
                            padding: "0 1.5rem",
                            border: "none",
                            outline: "none",
                            fontSize: "1rem",
                            backgroundColor: "transparent",
                            color: "rgb(17, 24, 39)",
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                          }}
                        />

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email}
                          style={{
                            height: "3.5rem",
                            padding: "0 1.5rem",
                            backgroundColor: "#000000",
                            color: "white",
                            border: "none",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor:
                              isSubmitting || !email
                                ? "not-allowed"
                                : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                            margin: "0.3rem",
                          }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                border: "2px solid white",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            "Join the waitlist"
                          )}
                        </button>
                      </div>
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginTop: "0.5rem",
                          color: "rgb(239, 68, 68)",
                          fontSize: "0.8rem",
                          textAlign: "center",
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
  const campaignId = searchParams.get("campaignId");

  const finalIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const onClose = externalOnClose || (() => setIsOpen(false));
  const onSubmit = externalOnSubmit || (() => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (finalIsOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
        document.documentElement.style.overflow = "unset";
      };
    }
  }, [finalIsOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { campaignId: newCampaignId } = await addToWaitlist(
        email,
        campaignId
      );
      const link = `${window.location.origin}/?campaignId=${newCampaignId}`;
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
