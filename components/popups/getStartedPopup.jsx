"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { addContactSubmission } from "@/lib/contact";
import { countries } from "@/lib/countries";
import { AnalyticsService } from "@/services/analyticsService";

export default function GetStartedPopup({ isOpen: externalIsOpen, onClose: externalOnClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const finalIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;

  useEffect(() => {
    if (externalIsOpen !== undefined) setIsOpen(externalIsOpen);
  }, [externalIsOpen]);

  useEffect(() => {
    if (finalIsOpen) {
      document.body.style.overflow = "hidden";
      AnalyticsService.sendEvent("get_started_popup_viewed");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [finalIsOpen]);

  const handleClose = () => {
    AnalyticsService.sendEvent("get_started_popup_closed");
    if (externalOnClose) externalOnClose();
    else setIsOpen(false);
  };

  if (!finalIsOpen) return null;

  return createPortal(
    <PortalContent onClose={handleClose} />,
    document.body
  );
}

function PortalContent({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState(() => countries.find(c => c.iso2 === "in") || countries[0]);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const overlayStyle = {
    position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 2147483647, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
  };

  const modalStyle = {
    width: "100%", maxWidth: "46rem", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)", overflow: "visible", zIndex: 2147483647, padding: "1.5rem",
    position: "relative",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;
    if (!name || !email) {
      setError("Please fill in name and email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    
    // Validate phone number: must be between 7 and 15 digits
    if (!phone || phone.length < 7 || phone.length > 15) {
      setError("Please enter a valid phone number (7-15 digits).");
      return;
    }

    setIsSubmitting(true);
    setError("");
    AnalyticsService.sendEvent("get_started_submit_clicked");
    try {
      const payload = {
        name,
        email,
        phone: `${country.dial_code} ${phone}`,
        company,
        message,
        source: "get-started",
      };
      const res = await addContactSubmission(payload);
      if (res && res.success) {
        setIsSuccess(true);
        AnalyticsService.sendEvent("get_started_submission_success", { id: res.id, email });
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        setError(res.message || "Submission failed. Please try again.");
        AnalyticsService.sendEvent("get_started_submission_failed", { error: res && res.error });
      }
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
      AnalyticsService.sendEvent("get_started_submission_failed", { error: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={overlayStyle}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", duration: 0.3 }}
          style={modalStyle}
          className="gs-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button aria-label="Close" onClick={onClose} style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", cursor: "pointer" }}>
            <X color="#6B7280" />
          </button>

          <div className="gs-modal-inner">
            <div className="gs-modal-body">
              <div style={{ textAlign: "left", padding: "0 0 0.5rem" }}>
                <h2 className="gs-title" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "24px", margin: 0 }}>Leave us a message</h2>
                <p className="gs-subtitle" style={{ fontSize: "14px", color: "#6B7280", marginTop: "6px" }}>Share your details, and our team will get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                  <div>
                    <label htmlFor="gs-name" className="gs-field-label">Name*</label>
                    <input id="gs-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={{ width: '100%', height: 44, padding: "0 1rem", borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  </div>

                  <div>
                    <label htmlFor="gs-email" className="gs-field-label">Email*</label>
                    <input id="gs-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{ width: '100%', height: 44, padding: "0 1rem", borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  </div>

                  <div>
                    <label htmlFor="gs-phone" className="gs-field-label">Phone number*</label>
                    <div className="gs-phone-control" role="group" aria-label="Phone input">
                      <div className="gs-phone-left">
                        <span className="gs-dial-code-display">{country.dial_code}</span>
                        <select 
                          className="gs-country-select"
                          value={country.iso2} 
                          onChange={(e) => setCountry(countries.find(c => c.iso2 === e.target.value))} 
                          aria-label="Country code"
                        >
                          {countries.map((c) => (
                            <option key={c.iso2} value={c.iso2}>{`${c.name} (${c.dial_code})`}</option>
                          ))}
                        </select>
                      </div>
                      <div className="gs-phone-divider" aria-hidden="true" />
                      <input 
                        id="gs-phone" 
                        value={phone} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 15) setPhone(val);
                        }} 
                        placeholder="Enter phone number" 
                        className="gs-phone-input" 
                        type="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gs-company" className="gs-field-label">Company name*</label>
                    <input id="gs-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Tell us your company's name" style={{ width: '100%', height: 44, padding: "0 1rem", borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  </div>

                  <div>
                    <label htmlFor="gs-message" className="gs-field-label">Message*</label>
                    <textarea id="gs-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here...." rows={5} style={{ width: '100%', padding: "0.75rem 1rem", borderRadius: 8, border: "1px solid #E5E7EB", resize: "vertical" }} />
                  </div>

                  <div style={{ fontSize: 11, color: "#6B7280" }}>
                  By submitting this form, you agree to be contacted by our team. We respect your privacy; please read our Privacy Policy. If you wish to opt-out of future communications, please let us know via email.              </div>

                  {error && <div style={{ color: "#ef4444", fontSize: 13 }}>{error}</div>}

                  <button type="submit" disabled={isSubmitting} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", background: "#000", color: "#fff", height: 48, borderRadius: 999, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    <span>{isSubmitting ? "Sending..." : "Send message"}</span>
                  </button>
                </div>
              </form>

              {isSuccess && (
                <div style={{ marginTop: 12, textAlign: "center", color: "#10B981" }}>Thanks — we will get back to you soon.</div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>

    <style jsx>{`
      @media (min-width: 1024px) {
        .gs-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-style: normal;
          font-size: 56px;
          leading-trim: cap-height;
          line-height: 100%;
          letter-spacing: -0.04em;
          margin: 0;
          text-align: left;
        }
        .gs-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 16px;
          leading-trim: cap-height;
          line-height: 100%;
          letter-spacing: -0.02em;
          color: #333333;
          margin-top: 6px;
          text-align: left;
        }
        .gs-field-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-style: normal;
          font-size: 14px;
          leading-trim: cap-height;
          line-height: 100%;
          letter-spacing: -0.04em;
          margin-bottom: 8px;
          color: #000000;
          text-align: left;
        }
      }
      
      .gs-phone-control {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        border: 1px solid #E6E6E6;
        border-radius: 10px;
        padding: 8px 12px;
        box-sizing: border-box;
        background: #fff;
      }
      
      .gs-phone-left {
        display: flex;
        align-items: center;
        position: relative;
        min-width: 60px;
      }
      
      .gs-dial-code-display {
        font-size: 14px;
        color: #333333;
        pointer-events: none;
        padding-right: 18px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right center;
      }
      
      .gs-country-select {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      
      .gs-phone-divider { 
        width: 1px; 
        height: 32px; 
        background: #E6E6E6; 
      }
      
      .gs-phone-input { 
        flex: 1; 
        border: none; 
        outline: none; 
        padding: 8px 0; 
        font-size: 14px; 
      }
      
      .gs-phone-input::placeholder { 
        color: #BDBDBD;
      }

      /* Modal responsive scrolling helpers */
      .gs-modal {
        width: 100%;
        max-width: 46rem;
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2);
        z-index: 2147483647;
        padding: 1.5rem;
        position: relative;
        overflow: visible;
      }

      .gs-modal-inner {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .gs-modal-body {
        width: 100%;
      }

      @media (max-width: 1023px) {
        .gs-modal { max-height: 80vh; }
        .gs-modal-inner { max-height: 80vh; overflow: hidden; }
        .gs-modal-body { overflow-y: auto; -webkit-overflow-scrolling: touch; padding-right: 8px; }
      }
    `}</style>
    </>
  );
}