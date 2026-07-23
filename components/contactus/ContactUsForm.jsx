"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, Phone, Send, Paperclip, CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Zod validation schema
const contactFormSchema = z.object({
  subject: z.string().min(1, "Please select a subject"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Please select a country"),
  phoneNumber: z.string().min(6, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactForm() {
  const [countries, setCountries] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState("success") // 'success' or 'error'
  const [popupMessage, setPopupMessage] = useState("")
  const [countryOpen, setCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  const selectedCountryCode = watch("countryCode")

  // Memoized filtered countries for search optimization
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries.slice(0, 50)

    return countries
      .filter(
        (country) =>
          country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.dialCode.includes(countrySearch),
      )
      .slice(0, 20)
  }, [countries, countrySearch])

  // Find selected country for display
  const selectedCountry = countries.find((country) => country.dialCode === selectedCountryCode)

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag")
        const data = await response.json()

        const formattedCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            dialCode: `${country.idd.root}${country.idd.suffixes[0]}`,
            flag: country.flag,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)
      } catch (error) {
        console.error("Error fetching countries:", error)
        // Fallback countries
        setCountries([
          { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
          { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
          { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
          { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
          { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
          { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
          { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
          { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
        ])
      }
    }

    fetchCountries()
  }, [])

  // Check if email already exists
  // const checkEmailExists = async (email) => {
  //   try {
  //     const q = query(collection(db, "contact-submissions"), where("email", "==", email))
  //     const querySnapshot = await getDocs(q)
  //     return !querySnapshot.empty
  //   } catch (error) {
  //     console.error("Error checking email:", error)
  //     return false
  //   }
  // }

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      const [{ db }, { collection, addDoc }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/firestore"),
      ])
      await addDoc(collection(db, "contact-submissions"), {
        ...data,
        timestamp: new Date(),
        submittedAt: new Date().toISOString(),
        status: "new",
        source: "contact-us",
      })

      setPopupType("success")
      setPopupMessage("Thank you! Your message has been sent successfully. We'll get back to you soon.")
      setShowPopup(true)
      reset({
        subject: "",
        name: "",
        email: "",
        countryCode: "",
        phoneNumber: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)

      setPopupType("error")
      setPopupMessage("There was an error submitting your message. Please try again.")
      setShowPopup(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const subjectOptions = [
    { value: "personal", label: "Personal user" },
    { value: "business", label: "Business/merchant" },
    { value: "partnership", label: "Partnership" },
    { value: "media", label: "Media & press" },
  ]

  return (
    <>
      <motion.div
        className="w-full max-w-[768px] -mt-20 h-auto  mx-auto p-6 mb-16 lg:p-12"
        style={{
          background: "#FFFFFF99",
          backdropFilter: "blur(30px)",
          boxShadow: "50px 50px 100px 0px #0000000D",
          borderRadius: "40px",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#080808] mb-2">Fill out this form</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Subject */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#080808]">Subject</label>
            <Select
              value={watch("subject")}
              onValueChange={(value) => setValue("subject", value)}
            >
              <SelectTrigger
                className="w-full bg-white/50 h-[60px] border border-gray-200 rounded-lg flex items-center justify-between px-3"
                style={{ minHeight: "60px" }}
              >
                <SelectValue
                  placeholder="Select a subject"
                  className="text-base text-gray-900 flex items-center h-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {subjectOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="h-12 px-3 text-base hover:bg-gray-50 cursor-pointer flex items-center"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}
          </div>

          {/* Name */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#080808]">Name</label>
            <Input
              {...register("name")}
              placeholder="Enter your name"
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                setValue("name", value)
              }}
              className="w-full h-[60px] bg-white/50 border border-gray-200 rounded-lg px-3 text-base"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#080808]">Email</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full h-[60px] bg-white/50 border border-gray-200 rounded-lg px-3 text-base"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#080808]">Phone number</label>
            <div className="flex gap-3">
              {/* Country Code Selector with Search */}
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="w-40 h-[60px] bg-white/50 border border-gray-200 rounded-lg justify-between px-3"
                  >
                    {selectedCountry ? (
                      <div className="flex items-center gap-2">
                        <span>{selectedCountry.flag}</span>
                        <span className="text-sm">{selectedCountry.dialCode}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm text-gray-500">Select</span>
                      </div>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search countries..."
                      value={countrySearch}
                      onValueChange={setCountrySearch}
                    />
                    <CommandList className="max-h-60">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {filteredCountries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={`${country.name} ${country.dialCode}`}
                            onSelect={() => {
                              setValue("countryCode", country.dialCode)
                              setCountryOpen(false)
                              setCountrySearch("")
                            }}
                          >
                            <div className="flex items-center gap-3 w-full">
                              <span className="text-lg">{country.flag}</span>
                              <span className="font-medium">{country.dialCode}</span>
                              <span className="text-sm text-gray-600 truncate flex-1">{country.name}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                {...register("phoneNumber")}
                placeholder="Enter phone number"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  setValue("phoneNumber", value)
                }}
                inputMode="numeric"
                className="flex-1 h-[60px] bg-white/50 border border-gray-200 rounded-lg px-3 text-base"
              />
            </div>
            {errors.countryCode && <p className="text-sm text-red-600">{errors.countryCode.message}</p>}
            {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>}
          </div>

          {/* Message */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#080808]">Message</label>
            <div className="relative">
              <Textarea
                {...register("message")}
                placeholder="Write your message here..."
                className="w-full min-h-[120px] bg-white/50 border border-gray-200 rounded-lg resize-none pr-12 px-3 py-3 text-base"
              />
              {/* <button
                type="button"
                className="absolute bottom-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button> */}
            </div>
            {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 cursor-pointer bg-black text-white rounded-full font-medium text-base hover:bg-black/90 transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Send message"}
            </div>
          </Button>
        </form>
      </motion.div>

      {/* Modern Glass Effect Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
            />

            {/* Popup Content */}
            <motion.div
              className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(40px)",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="p-8 text-center">
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="mb-6">
                  {popupType === "success" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center"
                    >
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </motion.div>
                  )}
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-gray-900 mb-4"
                >
                  {popupType === "success" ? "Message Sent!" : "Submission Error"}
                </motion.h3>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-8 leading-relaxed"
                >
                  {popupMessage}
                </motion.p>

                {/* Action Button */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Button
                    onClick={closePopup}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${popupType === "success"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                  >
                    {popupType === "success" ? "Great!" : "Try Again"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
