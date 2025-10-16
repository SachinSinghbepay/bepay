"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, ScanLine, Bitcoin, MessageSquare, ShoppingBag, Smile, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// Define the steps data
const steps = [
  {
    number: 1,
    icon: Smartphone,
    text: "Download bepay App",
  },
  {
    number: 2,
    icon: ScanLine,
    text: "Quick KYC, instant approval",
  },
  {
    number: 3,
    icon: Bitcoin,
    text: "Receive Bitcoin",
  },
  {
    number: 4,
    icon: MessageSquare,
    text: "Make your first payment — rent, groceries, anything",
  },
  {
    number: 5,
    icon: ShoppingBag,
    text: "Earn up to 7% instant cashback & rewards",
  },
  {
    number: 6,
    icon: Smile,
    text: "Unlock financial freedom while you live your life",
  },
]

export default function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [totalScrollHeight, setTotalScrollHeight] = useState(0)
  const sectionRef = useRef(null) // Explicitly type useRef
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event

  useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasTrackedView) {
              AnalyticsService.sendEvent("UPI HowItWorks-section viewed");
              setHasTrackedView(true);
              observer.unobserve(entry.target); // Stop observing after first view
            }
          },
          { threshold: 0.1 } // Trigger when 10% of the component is visible
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => observer.disconnect();
      }, [hasTrackedView]);
  useEffect(() => {
    const updateScrollHeight = () => {
      // Set the total scroll height to allow for each step to be visible
      // Each step effectively occupies one full viewport height of scroll space.
      // We add an extra viewport height to ensure the last step is fully visible
      // and the user can scroll past it slightly to trigger the final state.
      setTotalScrollHeight(steps.length * window.innerHeight)
    }

    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Calculate scroll progress relative to the start of the section
      // Adding viewportHeight / 2 helps center the activation point for each step
      const scrollProgress = scrollY - sectionTop + viewportHeight / 2

      // Each step occupies a full viewport height of scroll space
      const scrollPerStep = viewportHeight

      // Determine the current step based on scroll progress
      let newStep = Math.floor(scrollProgress / scrollPerStep) + 1

      // Ensure newStep is within bounds [1, steps.length]
      newStep = Math.max(1, Math.min(steps.length, newStep))

      if (newStep !== currentStep) {
        setCurrentStep(newStep)
      }
    }

    updateScrollHeight() // Set initial height
    window.addEventListener("resize", updateScrollHeight) // Update on resize
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check on mount

    return () => {
      window.removeEventListener("resize", updateScrollHeight)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentStep]) // currentStep is a dependency because handleScroll uses it.

  const activeStepContent = steps.find((step) => step.number === currentStep) || steps[0]
  const IconComponent = activeStepContent.icon

  // Custom CSS for the content box border-image and box-shadows
  const contentBoxStyle = {
    border: "1px #ffffff transparent", // Use transparent border as border-image will overlay

    borderImage: "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%) 1",
    boxShadow:
      "10px 10px 20px 0px #0000001A inset, -10px -10px 30px 0px #FFFFFF inset, -10px -10px 15px 0px #FFFFFF inset",
  }

  // Custom CSS for the "bepay" gradient text
  const bepayGradientStyle = {
    background: "linear-gradient(90deg, #333333 30.99%, rgba(51, 51, 51, 0.2) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent", // Fallback for browsers that don't support text-fill-color
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full"
      style={{ height: `${totalScrollHeight}px` }} // Apply the calculated scroll height
    >
      {/* Sticky content container */}
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-[140px] font-[400] leading-none tracking-wider mb-10">
            <span style={{ color: "#C0C0C0" }}>How </span>
            <span style={bepayGradientStyle}>bepay</span>
            <span style={{ color: "#C0C0C0" }}> works</span>
          </h1>
          <p className="text-base md:text-xl font-medium" style={{ color: "#6A6A6A" }}>
            Start in 30 Seconds. Earn Forever.
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center w-full max-w-7xl">
          {/* Step Number */}
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
                color: "transparent", // Fallback
              }}
            >
              {currentStep}
            </motion.div>
          </AnimatePresence>
          {/* Content Box */}
          <AnimatePresence mode="wait">
            <div
              key={currentStep + "-content-box"} // Changed key for clarity
             
              className="relative flex items-center justify-center p-6 md:p-10 rounded-full w-full max-w-7xl mx-auto"
              style={contentBoxStyle}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep + "-inner-content"} // Key for inner content animation
                  initial={{ opacity: 0, y: 50 }} // Animate inner content
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: 0.1 }} // Keep a slight delay for inner content
                  className="flex items-center justify-center" // Ensure content stays centered
                >
                  <IconComponent
                    className="w-8 h-8 md:w-10 md:h-10 mr-4"
                    style={{ color: "#333333" }}
                    aria-hidden="true"
                  />
                  <span className="text-xl md:text-[40px] font-medium text-center" style={{ color: "#333333" }}>
                    {activeStepContent.text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatePresence>
          {/* Button for step 6 */}
          <AnimatePresence>
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-12"
              >
                <Button className="rounded-full px-5 cursor-pointer py-8 text-lg bg-black text-white hover:bg-black/90 transition-colors flex items-center space-x-2">
                  <Users className="w-5 h-5" aria-hidden="true" />
                  <span>Join 50,000+ smart earners</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
