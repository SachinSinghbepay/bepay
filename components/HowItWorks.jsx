"use client"
import { useState, useEffect, useRef, forwardRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
// UPDATED ICONS: Use all lucide-react icons for consistency
import { Smartphone, Users } from "lucide-react" // ONLY KEEP Smartphone for Step 1
// We need an Image component for the image sources, assuming it's from next/image or equivalent.
// I'll assume a standard <img> tag for simplicity in this example, but you should adjust based on your environment.
// If using Next.js, you'd need: import Image from "next/image"

import WaitlistTriggerButton from "./waitlist-trigger-button"
import { AnalyticsService } from "@/services/analyticsService"
import Image from "next/image"

// --- Placeholder for Image Component (if you use Next.js, uncomment this) ---
// const Image = ({ src, alt, className, style, 'aria-hidden': ariaHidden }) => (
//     <img src={src} alt={alt} className={className} style={style} aria-hidden={ariaHidden} />
// );
// ----------------------------------------------------------------------------


// 1. UPDATED STEPS: Keep Step 1 as Smartphone icon, but use imageSrc string for others.
const steps = [
    {
        number: 1,
        icon: Smartphone, // KEEP: Lucide Icon Component
        text: "Download bepay App",
    },
    {
        number: 2,
        icon: "/icons/solar.png", // CHANGE: Placeholder image path string
        text: "Quick KYC, instant approval",
    },
    {
        number: 3,
        icon: "/icons/card.png", // CHANGE: Placeholder image path string
        text: "Make your first payment — rent, groceries, anything",
    },
    {
        number: 4,
        icon: "/icons/shopping.png", // CHANGE: Placeholder image path string
        text: "Earn up to 7% instant cashback & rewards",
    },
    {
        number: 5,
        icon: "/icons/face.png", // CHANGE: Placeholder image path string
        text: "Unlock financial freedom while you live your life",
    },
]

// FIX: Wrapped component in forwardRef
const HowItWorksSection = forwardRef(function HowItWorksSection(props, ref) {
    const [currentStep, setCurrentStep] = useState(1)
    const [totalScrollHeight, setTotalScrollHeight] = useState(0)

    // ✅ HOOKS FIX: Call useRef unconditionally
    const localRef = useRef(null)

    // Use the forwarded ref (ref) if passed, otherwise use the local one.
    // This maintains the correct hook order.
    const sectionRef = ref || localRef

    const [hasTrackedView, setHasTrackedView] = useState(false)

    const handleJoinUsersClick = () => {
        // Updated analytics event to match the reference's CTA event
        AnalyticsService.sendEvent("HowItWorks CTA Clicked: Join 50,000+")
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTrackedView) {
                    // Updated analytics event to match the reference's view event
                    AnalyticsService.sendEvent("UPI HowItWorks-section viewed")
                    setHasTrackedView(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )

        const currentRef = sectionRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [hasTrackedView, sectionRef])

    // PERFORMANCE FIX: Memoize handleScroll with useCallback
    const handleScroll = useCallback(() => {
        if (!sectionRef.current || typeof window === "undefined") return

        const sectionTop = sectionRef.current.offsetTop
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight

        const scrollProgress = scrollY - sectionTop + viewportHeight / 2
        const scrollPerStep = viewportHeight
        let newStep = Math.floor(scrollProgress / scrollPerStep) + 1
        newStep = Math.max(1, Math.min(steps.length, newStep))

        // Use functional update for currentStep
        setCurrentStep((prevStep) => (newStep !== prevStep ? newStep : prevStep))
    }, [sectionRef])

    useEffect(() => {
        const updateScrollHeight = () => {
            if (typeof window !== "undefined") {
                setTotalScrollHeight(steps.length * window.innerHeight)
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
    }, [handleScroll])

    const activeStepContent =
        steps.find((step) => step.number === currentStep) || steps[0]

    // DYNAMIC ICON/IMAGE RESOLUTION:
    // IconComponent will be the Lucide component ONLY for step 1
    const IconComponent = currentStep === 1 ? activeStepContent.icon : null
    // imageSrc will be the string path ONLY for steps 2-5
    const imageSrc = currentStep !== 1 ? activeStepContent.icon : null

    const contentBoxStyle = {
        border: "1px #ffffff transparent",
        borderImage:
            "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%) 1",
        boxShadow:
            "10px 10px 20px 0px #0000001A inset, -10px -10px 30px 0px #FFFFFF inset, -10px -10px 15px 0px #FFFFFF inset",
    }

    // Class for no-wrap on step 3 for mobile only (Step 3 text is "Make your first payment...")
    const step4NoWrapClass = (currentStep === 3) ? "whitespace-nowrap" : "whitespace-normal"
    
    // Removed NEW Mobile-specific styles for the text (mobileTextStyle) as they are now inline/tailwind

    return (
        <section
            // Pass the resolved ref to the DOM element
            ref={sectionRef}
            className="relative py-20 w-full"
            style={{ height: `${totalScrollHeight}px` }}
        >
            <div
                // RESTORED ORIGINAL STICKY CONTAINER CLASSES, using md: for desktop centering
                // The 'justify-center' ensures vertical centering for all content on all screens.
                className="sticky top-0 flex flex-col items-center justify-center h-screen px-4 py-12 "
            >
                <div className="text-center mb-8"> {/* UPDATED MARGIN: mb-8 instead of mb-0 */}
                   <h1 className="text-5xl md:text-[140px] font-[400] tracking-[-0.08em] mb-10 md:leading-[130px] leading-[1.2]">
    {/* Desktop: "How " (grey) */}
    <span style={{ color: "#C0C0C0" }}>How </span>
    
    {/* Desktop: "bepay " (black) - Note the trailing space inside the span */}
    <span className="text-[#333333]">bepay </span>
    
    {/* Mobile Only: The word "money" and a line break (md:hidden) */}
    <span className="text-[#333333] md:hidden">money</span>
    <br className="md:hidden" />
    
    {/* Desktop: "works" (black) */}
    <span className="text-[#333333]">works</span>
</h1>
                    <p
                        className="text-[20px] tracking-[0.01%] font-medium mt-0" // mt-0 instead of mt-25
                        style={{ color: "#6A6A6A" }}
                    >
                        Start in 30 Seconds. Earn Forever.
                    </p>
                </div>
                <div
                    // MODIFIED: Added a larger top margin for mobile (mt-12) to push the number down
                    // relative to the text/title above it, while keeping desktop margin at mt-0.
                    className="relative flex flex-col items-center justify-center w-full max-w-7xl mt-12 md:mt-0"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            // UPDATED CLASS: Matches reference component's desktop size/style
                            className="text-[220px] md:text-[220px] font-bold -mb-25 md:mb-0" // mb-8 added
                            style={{
                                background:
                                    "linear-gradient(167.94deg, #E8E8E8 13.86%, rgba(232, 232, 232, 0.1) 101.57%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                // Removed redundant 'Montserrat' font family style from here
                            }}
                        >
                            {currentStep}
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Box Section */}
                    <div
                        // UPDATED CLASS: Matches reference component
                        className="relative flex items-center justify-center p-6 md:p-10 bg-white rounded-full w-full max-w-7xl mx-auto"
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
                                {/* CONDITIONAL RENDERING: Icon (Step 1) OR Image (Steps 2-5) */}
                                {IconComponent && (
                                    <IconComponent
                                        // MODIFIED: Reduced size for mobile (w-6 h-6) while keeping desktop size (md:w-10 md:h-10)
                                        className="w-6 h-6 md:w-10 md:h-10 mr-4"
                                        style={{ color: "#333333" }}
                                        aria-hidden="true"
                                    />
                                )}
                                {imageSrc && (
                                    <Image
                                        // Mandatory props for Next.js Image component
                                        src={imageSrc}
                                        alt={`Step ${currentStep} icon`}
                                        width={40} // Set to the max size (md:w-10, which is 40px)
                                        height={40} // Set to the max size (md:h-10, which is 40px)
                                        // The size classes w-6/h-6 and md:w-10/md:h-10 will override
                                        // the fixed width/height for visual sizing but provide the necessary intrinsic size for the component.
                                        className="w-6 h-6 md:w-10 md:h-10 mr-4"
                                        // The 'style' prop for color is not valid on an image element, 
                                        // and icon images are usually colored within the image file itself. 
                                        // I've removed the redundant style prop.
                                        aria-hidden="true"
                                    />
                                )}
                                <span
                                    // MOBILE STYLES: Applied to span. Desktop styles are applied with md: prefix or inline style
                                    className={`font-semibold text-[12.31px] md:text-[40px] md:font-normal ${step4NoWrapClass}`} // Added step4NoWrapClass
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        letterSpacing: "-0.02em", // Common/Mobile
                                        textAlign: "center", // Common
                                        color: "#333333", // Common
                                        // Dynamic line height for step 5 (the long text) for better mobile display
                                        lineHeight: currentStep === 5 ? '1.5' : '40.02px', 
                                    }}
                                >
                                    {activeStepContent.text}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* CTA Button Section */}
                    <AnimatePresence>
                        {currentStep === 5 && (
                            // 4. REPLACED: Placeholder motion.button with WaitlistTriggerButton
                            <WaitlistTriggerButton
                                triggerSource="'Join 50,000+ smart earners' button"
                                buttonLocation="how_it_works_section" // Added buttonLocation as good practice
                            >
                                <motion.button
                                    onClick={handleJoinUsersClick}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    // UPDATED CLASS: Added mt-12 (from reference) and removed max-w-full
                                    className="mt-12 bg-black cursor-pointer whitespace-nowrap text-white w-[300px] h-[56px] rounded-full flex items-center justify-center gap-2 text-[14px] font-medium px-6 py-4 hover:bg-gray-800 transition-colors"
                                >
                                    {/* Users icon kept as it's part of the button, not the steps array */}
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
})

// FINAL EXPORT: Export the forwardRef-wrapped component
export default HowItWorksSection