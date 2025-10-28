"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
// CHANGED: Removed unused icons and imported Image
import { Smartphone, Bitcoin, Users } from "lucide-react"
import Image from "next/image"
import WaitlistTriggerButton from "./waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// CHANGED: Updated the steps data structure
const steps = [
  {
    number: 1,
    icon: Smartphone, // Kept as icon
    text: "Download bepay App",
  },
  {
    number: 2,
    imageSrc: "/icons/solar.png", // CHANGED: Replaced icon with imageSrc
    text: "Quick KYC, instant approval",
  },
  {
    number: 3,
    icon: Bitcoin, // Kept as icon
    text: "Receive Bitcoin",
  },
  {
    number: 4,
    imageSrc: "/icons/card.png", // CHANGED: Replaced icon with imageSrc
    text: "Make your first payment — rent, groceries, anything",
  },
  {
    number: 5,
    imageSrc: "/icons/shopping.png", // CHANGED: Replaced icon with imageSrc
    text: "Earn up to 7% instant cashback & rewards",
  },
  {
    number: 6,
    imageSrc: "/icons/face.png", // CHANGED: Replaced icon with imageSrc
    text: "Unlock financial freedom while you live your life",
  },
]

export default function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [totalScrollHeight, setTotalScrollHeight] = useState(0)
  const sectionRef = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // ANALYTICS: Handler for the CTA button click
  const handleJoinUsersClick = () => {
    AnalyticsService.sendEvent("join_smart_earners_button_clicked");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI - How BePay Works section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    const updateScrollHeight = () => {
      setTotalScrollHeight(steps.length * window.innerHeight)
    }

    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const scrollProgress = scrollY - sectionTop + viewportHeight / 2
      const scrollPerStep = viewportHeight
      let newStep = Math.floor(scrollProgress / scrollPerStep) + 1
      newStep = Math.max(1, Math.min(steps.length, newStep))

      if (newStep !== currentStep) {
        setCurrentStep(newStep)
      }
    }

    updateScrollHeight()
    window.addEventListener("resize", updateScrollHeight)
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("resize", updateScrollHeight)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentStep])

  const activeStepContent = steps.find((step) => step.number === currentStep) || steps[0]
  
  // CHANGED: Get both icon and imageSrc from the active step
  const IconComponent = activeStepContent.icon
  const imageSrc = activeStepContent.imageSrc

  const contentBoxStyle = {
    border: "1px #ffffff transparent",
    borderImage: "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%) 1",
    boxShadow:
      "10px 10px 20px 0px #0000001A inset, -10px -10px 30px 0px #FFFFFF inset, -10px -10px 15px 0px #FFFFFF inset",
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full"
      style={{ height: `${totalScrollHeight}px` }}
    >
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen px-4 py-12">
        <div className="text-center mb-8">
          {/* === FIX APPLIED HERE: Removed 'leading-tight' class === */}
            <h1 className="text-5xl md:text-[140px] font-[400] tracking-[-0.08em] mb-10 leading-[1.2]">
            <span style={{ color: "#C0C0C0" }}>How </span>
            <span className="text-[#6A6A6A]">bepay</span>
            <span className="text-[#6A6A6A]"> works</span>
          </h1>
          <p className="text-[20px] tracking-[0.01%] font-medium" style={{ color: "#6A6A6A" }}>
            Start in 30 Seconds. Earn Forever.
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center w-full max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="text-8xl md:text-[200px] font-bold mb-8"
              style={{
                background: "linear-gradient(167.94deg, #E8E8E8 13.86%, rgba(232, 232, 232, 0.1) 101.57%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {currentStep}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <div
              key={currentStep + "-content-box"}
             // AFTER:
className="relative flex items-center justify-center px-6 md:px-10 py-4 md:py-6 rounded-full w-full max-w-7xl mx-auto text-center"
              style={contentBoxStyle}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep + "-inner-content"}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center justify-center"
                >
                  {/* CHANGED: Conditionally render Icon or Image */}
                  {IconComponent ? (
                    <IconComponent
                      className="w-8 h-8 md:w-10 md:h-10 mr-4"
                      style={{ color: "#333333" }}
                      aria-hidden="true"
                    />
                  ) : (
                    imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={activeStepContent.text} // Use text for alt
                        width={40} // Corresponds to md:w-10 (10 * 4 = 40px)
                        height={40} // Corresponds to md:h-10
                        className="w-8 h-8 md:w-10 md:h-10 mr-4" // Keep classes for sizing
                        aria-hidden="true"
                      />
                    )
                  )}
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: "40px",
                      letterSpacing: "-0.02em",
                      textAlign: "center",
                      color: "#333333",
                    }}
                  >
                    {activeStepContent.text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatePresence>
          <AnimatePresence>
            {currentStep === 6 && (
              <WaitlistTriggerButton triggerSource="“Join Smart Earners” button" buttonLocation="how_it_works_section">
                <motion.button
                  onClick={handleJoinUsersClick}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-12 bg-black cursor-pointer whitespace-nowrap text-white w-[300px] h-[56px] rounded-full flex items-center justify-center gap-2 text-[14px] font-medium px-6 py-4 hover:bg-gray-800 transition-colors"
                >
                  <Users className="w-6 h-6" aria-hidden="true" />
                  <span>Join 50,000+ smart earners</span>
                </motion.button>
              </WaitlistTriggerButton>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}