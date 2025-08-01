"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addToWaitlist } from "@/lib/firebase"
import { useWaitlistPopup } from "@/hooks/use-waitlist-popup"
import Image from "next/image"

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

  // Use external props if provided, otherwise use hook
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : hookIsOpen
  const onClose = externalOnClose || closePopup
  const onSubmit = externalOnSubmit || markAsSubmitted

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
        onSubmit() // Move this inside setTimeout
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-black/60 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl bg-[#f9f9f9] border border-black/20 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Header with Logo */}
            <div className="relative  p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-4"
              >
                <Image
                  src="/bepaymoney.svg"
                  alt="BePayMoney"
                  width={200}
                  height={80}
                  className="mx-auto rounded-xl bg-white/10 p-2"
                />
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-black/75 mb-2">Join the Waitlist</h2>
                <p className="text-gray-500 text-sm">Be the first to experience the future of payments</p>
              </motion.div>

             
            </div>

            {/* Form Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-center py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome aboard! </h3>
                    <p className="text-gray-600">
                      {"You're"} now on our exclusive waitlist. {"We'll"} notify you when {"we're"} ready!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 flex flex-col items-center justify-center gap-2 lg:flex-row"
                  >
                    <div className="w-full lg:w-auto">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative w-full">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-1 border-gray-500 rounded-full focus:border-gray-800 "
                          required
                        />
                      </div>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className=" w-full lg:w-auto h-12 bg-black rounded-full cursor-pointer hover:bg-black/90 text-white font-semibold  transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
