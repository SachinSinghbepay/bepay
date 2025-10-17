"use client" // This component uses client-side hooks for animation

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { QRCodePopup } from "@/components/popups/qr-code-popup" // Import popups
import { OSSelectionPopup } from "@/components/popups/os-selection-popup" // Import popups
import { Button } from "@/components/ui/button" // Import Button for the new CTA
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import WaitlistTriggerButton from "./waitlist-trigger-button";


const STEPS = [
  { number: "1", imageSrc: "/m1.png" },
  { number: "2", imageSrc: "/m2.png" },
  { number: "3", imageSrc: "/m3.png" },
  { number: "4", imageSrc: "/m4.png" },
  { number: "Total", imageSrc: "/m5.png" },
]

const SavingSection = () => {
  const containerRef = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // --- Main Content Steps Logic ---
  // The main content steps will occupy the full scroll height
  const inputRange = STEPS.map((_, i) => i / (STEPS.length - 1))
  const outputRange = STEPS.map((_, i) => i)
  const stepIndexMotionValue = useTransform(scrollYProgress, inputRange, outputRange)

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useMotionValueEvent(stepIndexMotionValue, "change", (latest) => {
    const newIndex = Math.round(latest)
    if (newIndex !== currentStepIndex) {
      setCurrentStepIndex(newIndex)
    }
  })

  const currentStep = STEPS[currentStepIndex]

  // --- Popup Visibility State ---
  const [showOSPopup, setShowOSPopup] = useState(false)
  const [showQrPopup, setShowQrPopup] = useState(false)

  const handleOpenOSPopup = () => {
    setShowOSPopup(true)
  }

  const handleCloseOSPopup = () => {
    setShowOSPopup(false)
  }

  const handleOSSelected = () => {
    setShowOSPopup(false) // Close OS popup
    setShowQrPopup(true) // Open QR popup
  }

  const handleCloseQrPopup = () => {
    setShowQrPopup(false)
  }

  // Variants for the number and image *within* the right section
  const contentItemVariants = {
    enter: { opacity: 0, y: 100 }, // Start slightly below, invisible
    center: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: customDelay, // Use custom delay passed from component
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: "easeIn" },
    }, // Exit slightly above, invisible
  }

  // Variants for the left content's text lines
  const textLineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Container variants for staggering the left content's text
  const leftContentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the animation of direct children
      },
    },
  }

  // Variants for the "Start your savings journey" button
  const ctaButtonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.5 }, // Appear smoothly
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI saving-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleStartClick = () => {
    AnalyticsService.sendEvent("HowItWorks CTA Clicked: Join 50,000+");
  };

  return (
    <div ref={containerRef} className="min-h-[900vh] relative">
      <div className="sticky top-0 grid grid-cols-1 lg:grid-cols-5 items-center w-full h-screen">
        {/* Left Content - Animates on scroll */}
        <motion.div
          className="bg-[#F4F4F4] flex justify-center items-center lg:col-span-3 h-full p-6 sm:p-8 md:p-12 lg:p-16 order-2 lg:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} // Animate in and out
          variants={leftContentContainerVariants}
        >
          <div className="space-y-3 sm:space-y-4">
            <motion.h1
              className="text-[100px] font-[400] text-[#C0C0C0] tracking-[-0.08em] leading-[10px]"
              variants={textLineVariants}
            >
              Real <span className="text-[#333333] font-normal">use.</span>
            </motion.h1>
            <motion.h2
              className="text-[100px] font-[400] text-[#C0C0C0] tracking-[-0.08em]"
              variants={textLineVariants}
            >
              Real <span className="text-[#333333] font-normal">savings.</span>
            </motion.h2>
            <motion.div className="pt-4 sm:pt-6 space-y-1 sm:space-y-2" variants={leftContentContainerVariants}>
              <motion.p
                className="text-[32px] tracking-[-0.02em] text-[#6A6A6A] font-regular font-[400] leading-[10px]"
                variants={textLineVariants}
              >
                Your Life Already Costs Money.
              </motion.p>
              <motion.p
                className="text-[32px] tracking-[-0.02em] text-[#6A6A6A] font-regular font-[400]"
                variants={textLineVariants}
              >
                We Just <span className="font-semibold text-[#333333]">Pay You Back.</span>
              </motion.p>
            </motion.div>
            {/* "Start your savings journey" Button */}
            <AnimatePresence>
              {currentStepIndex === STEPS.length - 1 && ( // Show button only on the "Total" step
                <motion.div
                  className="pt-8"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={ctaButtonVariants}
                >

                   <WaitlistTriggerButton triggerSource="UPI Saving section button">
                       <Button
                    className="bg-black cursor-pointer text-white rounded-full px-5 py-8 text-base font-medium flex items-center gap-2 hover:bg-black/90 transition-colors"
                    onClick={handleStartClick}
                  >
                    <Image
                      src="/wal.png" // Placeholder for the icon
                      alt="Savings icon"
                      width={20}
                      height={20}
                      className=""
                    />
                    Start your savings journey
                  </Button>
                   </WaitlistTriggerButton>
                 
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        {/* Right Content - Dynamic with Animations */}
        {/* MODIFIED: This outer div is now a regular div, not a motion.div with AnimatePresence */}
        <div
          className={cn(
            "relative h-full lg:col-span-2 order-1 lg:order-2 overflow-hidden",
            // --- CHANGE IS HERE ---
            // This now specifically checks for the 2nd (index 1) and 4th (index 3) steps
            currentStepIndex === 1 || currentStepIndex === 3 ? "bg-[#F4F4F4]" : "bg-white",
          )}
        >
          <AnimatePresence mode="wait">
            {/* Dynamic Number */}
            <motion.div
              key={currentStep.number + "-number"} // Key changes to trigger animation
              className="absolute -top-2/3 inset-0 flex items-center justify-center pointer-events-none"
              variants={contentItemVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={0} // Custom prop for contentItemVariants to indicate no delay for number
            >
              <span
                className="font-[400] bg-gradient-to-b from-gray-300 to-gray-100 text-transparent bg-clip-text select-none leading-none"
                style={{
                  fontSize: "clamp(120px, 25vw, 200px)",
                }}
              >
                {currentStep.number}
              </span>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {/* Dynamic Phone Mockup */}
            <motion.div
              key={currentStep.imageSrc + "-image"} // Key changes to trigger animation
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 sm:w-3/4 md:w-2/3 lg:w-2/3 h-auto z-10"
              variants={contentItemVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={0.2} // Custom prop for contentItemVariants to indicate 0.2 second delay for mockup
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentStep.imageSrc || "/placeholder.svg"}
                  alt={`Phone mockup showing step ${currentStep.number}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-top object-contain"
                  priority={currentStepIndex === 0} // Only prioritize the first image for initial load
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Popups rendered on top of the sticky section */}
      <OSSelectionPopup isVisible={showOSPopup} onClose={handleCloseOSPopup} onOSSelected={handleOSSelected} />
      <QRCodePopup isVisible={showQrPopup} onClose={handleCloseQrPopup} />
    </div>
  )
}

export default SavingSection