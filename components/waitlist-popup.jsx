"use client";

import { useState, useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { addToWaitlist } from "@/lib/firebase";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnalyticsService } from "@/services/analyticsService";
import {usePathname} from "next/navigation"; 

function PortalContent({
  isOpen,
  onClose,
  onCloseButtonClick,
  onEmailFocus,
  handleSubmit,
  email,
  setEmail,
  isSubmitting,
  isSuccess,
  error,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "47px",
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    zIndex: 2147483647,
    isolation: "isolate",
    minHeight: isMobile ? "20rem" : "24rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: isMobile ? "0.5rem" : "0",
    color:  "#111827",
  };
  const closeButtonStyle = {
    position: "absolute",
    top: isMobile ? "1rem" : "1.6rem",
    right: isMobile ? "1.3rem" : "2rem",
    zIndex: 2147483647,
    padding: "0.4rem",
    borderRadius: "9999px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  };
  const inputStyle = {
    width: "100%",
    height: "42px",
    padding: "0 1rem",
    border: "1px solid rgb(209,213,219)", // 👈 UPDATED
    borderRadius: "9999px",
    fontSize: "13px",
    outline: "none",
    backgroundColor: "rgb(249,250,251)", // 👈 UPDATED (Corrected from 211 to 251 for consistency)
    color: "#111827", // 👈 UPDATED
  };
  const buttonStyle = {
    width: "100%",
    height: "42px",
    borderRadius: "9999px",
    backgroundColor: "#000000", // 👈 UPDATED
    color: "#ffffff", // 👈 UPDATED
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
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
            <button
              onClick={onCloseButtonClick}
              style={closeButtonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0,0,0,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <X
                style={{
                  width: isMobile ? "18px" : "22px",
                  height: isMobile ? "18px" : "22px",
                  color: "rgb(107,114,128)",
                }}
              />
            </button>
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
                    backgroundColor:  "transparent",
                    padding: "0.4rem",
                    filter: "none", // make it white
                  }}
                />
              </motion.div>
              {!isSuccess && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {" "}
                  <h2
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: isMobile ? "17px" : "20px",
                      lineHeight: "22px",
                      letterSpacing: "-2%",
                      textAlign: "center",
                      marginBottom: "0.5rem",
                      color:  "#000000",
                    }}
                  >
                    Be the first to experience the future of payments.
                  </h2>{" "}
                </motion.div>
              )}
            </div>
            <div
              style={{
                padding: isMobile ? "0 1rem 1rem" : "0 2rem 2rem",
                marginTop: isMobile ? "1rem" : "0.9rem",
              }}
            >
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
                      {" "}
                      <h2
                        style={{
                          fontSize: isMobile ? "1rem" : "1.5rem",
                          fontWeight: 600,
                          marginBottom: isMobile ? "1.5rem" : "0.5rem",
                          color:  "#000000",
                        }}
                      >
                        Yay! You&apos;re on the waitlist.
                      </h2>{" "}
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          fontSize: isMobile ? "12px" : "14px",
                          lineHeight: isMobile ? "18px" : "24.992px",
                          textAlign: "center",
                          marginTop: isMobile ? "-0.5rem" : "0",
                          padding: isMobile ? "0 0.5rem" : "0",
                          color: "#6A6A6A",
                        }}
                      >
                        {" "}
                        Keep an eye on your inbox. We&apos;ll email <br /> you as
                        soon as we launch!{" "}
                      </p>{" "}
                    </div>
                    <button
                      onClick={onClose}
                      style={{
                        padding: isMobile ? "0.6rem 1.5rem" : "1rem 1.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "#111827",
                        color:"#ffffff",
                        fontWeight: "400",
                        cursor: "pointer",
                        marginTop: isMobile ? "4.5rem" : "0.2rem",
                        width: isMobile ? "100%" : "auto",
                        fontSize: isMobile ? "14px" : "12px",
                      }}
                    >
                      {" "}
                      Awesome!{" "}
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
                        fontWeight: 400,
                        fontSize: isMobile ? "12px" : "11.5px",
                        lineHeight: "1.4",
                        textAlign: "center",
                        marginTop: isMobile ? "-0.5rem" : "0",
                        padding: isMobile ? "0 0.5rem" : "0",
                        marginBottom: isMobile ? "1.5rem" : "-0.4rem",
                        color:  "#333333",
                      }}
                    >
                      We’re launching soon! Join the waitlist and stay ahead of
                      others!
                    </p>
                    {isMobile ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.55rem",
                        }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={inputStyle}
                          onFocus={onEmailFocus}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                          }}
                        />
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email}
                          style={buttonStyle}
                        >
                          {" "}
                          {isSubmitting
                            ? "Submitting..."
                            : "Join the waitlist"}{" "}
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "85%",
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgb(209,213,219)", // 👈 UPDATED
                          borderRadius: "9999px",
                          overflow: "hidden",
                          backgroundColor: "rgb(249,250,251)", // 👈 UPDATED
                        }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={{
                            flex: 1,
                            height: "1.8rem",
                            padding: "0 1rem",
                            border: "none",
                            outline: "none",
                            fontSize: "0.9rem",
                            backgroundColor: "transparent",
                            color:  "#111827",
                          }}
                          onFocus={onEmailFocus}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                          }}
                        />
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email}
                          style={{
                            height: "2.8rem",
                            padding: "0 1.8rem",
                            backgroundColor: "#000000",
                            color:"#ffffff",
                            border: "none",
                            fontSize: "0.8rem",
                            fontWeight: "250",
                            cursor:
                              isSubmitting || !email
                                ? "not-allowed"
                                : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                            margin: "0.2rem",
                          }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                border: "2px solid",
                                borderColor:  "white",
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
                        {" "}
                        {error}{" "}
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
  triggerSource: triggerSource,
}) {
  return (
    <Suspense fallback={<div></div>}>
      <WaitlistPopupContent
        isOpen={externalIsOpen}
        onClose={externalOnClose}
        onSubmit={externalOnSubmit}
        triggerSource={triggerSource}
      />
    </Suspense>
  );
}

function WaitlistPopupContent({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onSubmit: externalOnSubmit,
  triggerSource = "auto_waitlist_popup", // 👈 set default
  
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const finalIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const pathname = usePathname();

 // ⏳ Delay popup open by 4–5 seconds
 useEffect(() => {
    history.scrollRestoration = "manual";
    if (externalIsOpen === undefined) { 
     const timer = setTimeout(() => {
       setIsOpen(true);
     }, 2000); 
     return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  useEffect(() => {
  const submittedEmail = localStorage.getItem("waitlist_submitted_email" + pathname);

  if (finalIsOpen && !submittedEmail) {
    let popupType;

    if (triggerSource === "auto_waitlist_popup") {
      if (pathname === "/") {
        popupType = "auto_waitlist_popup_viewed_personal";
      } else if (pathname === "/business") {
        popupType = "auto_waitlist_popup_viewed_business";
      } else {
        popupType = "auto_waitlist_popup_viewed_other";
      }
    } else {
      if (pathname === "/") {
        popupType = "waitlist_popup_viewed_personal";
      } else if (pathname === "/business") {
        popupType = "waitlist_popup_viewed_business";
      } else {
        popupType = "waitlist_popup_viewed_other";
      }
    }

    AnalyticsService.sendEvent(popupType, {
      screen_name: "waitlist_popup",
      triggerSource,
      pathname,
    });
  }
}, [finalIsOpen, triggerSource, pathname]);




  const handleOverlayClose = () => {
    AnalyticsService.sendEvent("user_clicked_on_screen_to_close_popup");
    if (externalOnClose) {
      externalOnClose();
    } else {
      setIsOpen(false);
    }
    
  };

  const handleCloseButtonClick = () => {
    AnalyticsService.sendEvent("on_waitlist_close_button_clicked", {
    triggerSource,

     });
    if (externalOnClose) {
      externalOnClose();
    } else {
      setIsOpen(false);
    }
    
  };

const [hasFocusedEmail, setHasFocusedEmail] = useState(false);

const handleEmailFocus = () => {
  if (!hasFocusedEmail) {
    AnalyticsService.sendEvent("on_email_field_focused");
    setHasFocusedEmail(true); // mark as triggered
  }
};


  const onSubmit = externalOnSubmit || (() => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
    const submittedEmail = localStorage.getItem("waitlist_submitted_email" + pathname);
    
    if (externalIsOpen === undefined && submittedEmail) {
      setIsOpen(false);
    }
    if (finalIsOpen && submittedEmail) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [finalIsOpen, externalIsOpen]);

  const [hasViewedSuccessPopup, setHasViewedSuccessPopup] = useState(false);

  useEffect(() => {
    if (finalIsOpen && isSuccess && !hasViewedSuccessPopup) {
      AnalyticsService.sendEvent("joined_waitlist_popup_viewed" , {
        triggerSource,
        email,
      });
      
      setHasViewedSuccessPopup(true);
    }
  }, [finalIsOpen, isSuccess, hasViewedSuccessPopup, triggerSource, email]);



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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onSubmit();
        if (externalOnClose) externalOnClose();
        else setIsOpen(false);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, externalOnClose, onSubmit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting || isSuccess) return;

    // check valid email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    AnalyticsService.sendEvent("on_join_the_waitlist_button_clicked", {
      triggerSource, // ✅ include trigger source
    });

    setIsSubmitting(true);
    setError("");

    try {
      const { campaignId: newCampaignId } = await addToWaitlist(
        email,
        pathname
      );
      // update or add campaignId
      localStorage.setItem("campaignId", newCampaignId);

      localStorage.setItem("waitlist_submitted_email" + pathname, email);
      AnalyticsService.createWaitlistUser(email, {
        triggerSource,
        joined_via: "waitlist_form",
      });

      setIsSuccess(true);

      AnalyticsService.sendEvent("pop-up_waitlist_submission_successful", {
        status: "success",
        triggerSource,
        email,
      });
    } catch (error) {
      setError(error.message || "Failed to join waitlist. Please try again.");
      AnalyticsService.sendEvent("waitlist_submission_failed", {
        status: "failure",
        error_reason: error.message || "Unknown error",
        triggerSource,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!mounted) return null;

  return createPortal(
    <PortalContent
      isOpen={finalIsOpen}
      onClose={handleOverlayClose}
      onCloseButtonClick={handleCloseButtonClick}
      onEmailFocus={handleEmailFocus}
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      error={error}
      handleSubmit={handleSubmit}
    />,
    document.body
  );
}

