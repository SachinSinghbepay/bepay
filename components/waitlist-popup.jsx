"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addToWaitlist } from "@/lib/firebase"
import { useWaitlistPopup } from "@/hooks/use-waitlist-popup"
import Image from "next/image"

function PortalContent({ 
  isOpen, 
  onClose, 
  onSubmit, 
  email, 
  setEmail, 
  isSubmitting, 
  isSuccess, 
  error, 
  handleSubmit 
}) {
  const overlayStyle = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    width: '100vw',
    height: '100vh',
    zIndex: '2147483647', // Maximum safe integer for z-index
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    isolation: 'isolate'
  }

  const modalStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '30rem',
    backgroundColor: '#f9f9f9',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    zIndex: '2147483647',
    isolation: 'isolate'
  }

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: '2147483647',
    padding: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: 'rgb(243, 244, 246)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

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
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(229, 231, 235)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(243, 244, 246)'}
            >
              <X style={{ width: '16px', height: '16px', color: 'rgb(75, 85, 99)' }} />
            </button>

            {/* Header with Logo */}
            <div style={{ position: 'relative', padding: '2rem', textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ marginBottom: '1rem' }}
              >
                <Image
                  src="/bepaymoney.svg"
                  alt="BePayMoney"
                  width={200}
                  height={80}
                  style={{ 
                    margin: '0 auto', 
                    borderRadius: '0.75rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    padding: '0.5rem' 
                  }}
                />
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.3 }}
              >
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: 'rgba(0, 0, 0, 0.75)', 
                  marginBottom: '0.5rem' 
                }}>
                  Join the Waitlist
                </h2>
                <p style={{ 
                  color: 'rgb(107, 114, 128)', 
                  fontSize: '0.875rem' 
                }}>
                  Be the first to experience the future of payments
                </p>
              </motion.div>
            </div>

            {/* Form Content */}
            <div style={{ padding: '2rem' }}>
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
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: '4rem',
                        height: '4rem',
                        margin: '0 auto 1rem',
                        backgroundColor: 'rgb(220, 252, 231)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CheckCircle2 style={{ width: '2rem', height: '2rem', color: 'rgb(22, 163, 74)' }} />
                    </motion.div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      color: 'rgb(17, 24, 39)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Welcome aboard!
                    </h3>
                    <p style={{ color: 'rgb(75, 85, 99)' }}>
                      You're now on our exclusive waitlist. We'll notify you when we're ready!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem' 
                    }}
                    className="lg:flex-row"
                  >
                    <div style={{ width: '100%' }} className="lg:w-auto">
                      <label 
                        htmlFor="email" 
                        style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: '500', 
                          color: 'rgb(55, 65, 81)', 
                          marginBottom: '0.5rem' 
                        }}
                      >
                        Email Address
                      </label>
                      <div style={{ position: 'relative', width: '100%' }}>
                        <Mail style={{ 
                          position: 'absolute', 
                          left: '0.75rem', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          width: '1.25rem', 
                          height: '1.25rem', 
                          color: 'rgb(156, 163, 175)' 
                        }} />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-1 border-gray-500 rounded-full focus:border-gray-800"
                          required
                        />
                      </div>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{ 
                            color: 'rgb(239, 68, 68)', 
                            fontSize: '0.875rem', 
                            marginTop: '0.5rem' 
                          }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full  h-12 bg-black rounded-full cursor-pointer hover:bg-black/90 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            border: '2px solid white',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%'
                          }}
                        />
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function WaitlistPopup({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onSubmit: externalOnSubmit,
}) {
  const { isOpen: hookIsOpen, closePopup, markAsSubmitted } = useWaitlistPopup()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Use external props if provided, otherwise use hook
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : hookIsOpen
  const onClose = externalOnClose || closePopup
  const onSubmit = externalOnSubmit || markAsSubmitted

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalStyle
        document.documentElement.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setError("")

    try {
      await addToWaitlist(email)
      setIsSuccess(true)

      // Close popup after success animation and call onSubmit
      setTimeout(() => {
        onSubmit()
        onClose()
        setIsSuccess(false)
        setEmail("")
      }, 12000)
    } catch (error) {
      setError(error.message || "Failed to join waitlist. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render anything on server-side
  if (!mounted) return null

  // Use createPortal to render directly in document.body
  return createPortal(
    <PortalContent
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      error={error}
      handleSubmit={handleSubmit}
    />,
    document.body
  )
}