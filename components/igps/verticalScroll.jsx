"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { AnalyticsService } from "@/services/analyticsService"
import GetStartedPopup from "@/components/popups/getStartedPopup"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"

// Reusable component for the scrolling photo item (Desktop)
const PhotoCardItem = ({ imageSrc, altText, index, progress, totalImages, cardContent, onOpenPopup }) => {
  const segmentDuration = 1 / totalImages
  const start = index * segmentDuration
  const end = start + segmentDuration

  // Use viewport height for smooth scrolling
  const [travelDistance, setTravelDistance] = useState(900)

  useEffect(() => {
    const updateHeight = () => {
      setTravelDistance(window.innerHeight)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  const fixedTransformDistance = 0.4

  let inputRange = []
  let outputRange = []

  const isFirst = index === 0
  const isLast = index === totalImages - 1

  if (isFirst) {
    inputRange = [0, end - segmentDuration * fixedTransformDistance, end + segmentDuration * fixedTransformDistance]
    outputRange = [0, 0, -travelDistance]
  } else if (isLast) {
    inputRange = [start - segmentDuration * fixedTransformDistance, start + segmentDuration * fixedTransformDistance, 1]
    outputRange = [travelDistance, 0, 0]
  } else {
    inputRange = [
      start - segmentDuration * fixedTransformDistance,
      start + segmentDuration * fixedTransformDistance,
      end - segmentDuration * fixedTransformDistance,
      end + segmentDuration * fixedTransformDistance,
    ]
    outputRange = [travelDistance, 0, 0, -travelDistance]
  }

  const y = useTransform(progress, inputRange, outputRange, {
    clamp: false,
  })

  return (
    <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-end pr-0">
      <div className="relative block h-full w-[90%]">
        <Image src={imageSrc || "/placeholder.svg"} alt={altText} fill className="h-full w-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        {cardContent && (
          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <h2 className="text-white leading-[42px] text-[40px] font-semibold mb-3">
              {Array.isArray(cardContent.title?.lines)
                ? cardContent.title.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < cardContent.title.lines.length - 1 && <br />}
                  </span>
                ))
                : cardContent.title?.text || cardContent.title}
            </h2>
            <p className="text-[#F6F6F6] text-[16px] font-medium mb-6 max-w-sm">
              {Array.isArray(cardContent.description?.lines)
                ? cardContent.description.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < cardContent.description.lines.length - 1 && <br />}
                  </span>
                ))
                : cardContent.description?.text || cardContent.description}
            </p>
            {cardContent.cta && (
              <button
                onClick={() => {
                  try {
                    AnalyticsService.sendEvent("VerticalScrolling Get Started Clicked")
                  } catch (e) { }
                  if (onOpenPopup) onOpenPopup()
                }}
                className="flex items-center justify-center whitespace-nowrap gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full text-xs font-medium md:w-[180px] md:text-[14px] "
              >
                {cardContent.cta}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
                  <path d="M7 17l10-10M7 7h10v10" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Mobile horizontal card component with overlay
const MobileCard = ({ imageSrc, altText, cardContent, onOpenPopup, isActive }) => {
  return (
    <div className="flex-shrink-0 w-full h-[500px] relative">
      <Image src={imageSrc || "/placeholder.svg"} alt={altText} fill className="absolute inset-0 w-full h-full object-cover" sizes="100vw" />
      {cardContent && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={`content-${imageSrc}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 className="text-white text-2xl font-bold mb-2">
                  {Array.isArray(cardContent.title?.lines)
                    ? cardContent.title.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < cardContent.title.lines.length - 1 && <br />}
                      </span>
                    ))
                    : cardContent.title?.text || cardContent.title}
                </h2>
                <p className="text-gray-200 text-sm mb-4">
                  {Array.isArray(cardContent.description?.lines)
                    ? cardContent.description.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < cardContent.description.lines.length - 1 && <br />}
                      </span>
                    ))
                    : cardContent.description?.text || cardContent.description}
                </p>
                {cardContent.cta && (
                  <button
                    onClick={() => {
                      try {
                        AnalyticsService.sendEvent("VerticalScrolling Get Started Clicked")
                      } catch (e) { }
                      if (onOpenPopup) onOpenPopup()
                    }}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full  text-xs font-medium md:w-[180px] md:text-[14px] "
                  >
                    {cardContent.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
                      <path d="M7 17l10-10M7 7h10v10" />
                    </svg>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

const VerticalScrollingSection = () => {
  const containerRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const isMobile = useIsMobile()
  const viewRef = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const autoPlayRef = useRef(null)
  const isScrollingRef = useRef(false)

  React.useEffect(() => {
    const target = viewRef.current || containerRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent("Vertical Scrolling viewed")
          } catch (e) { }
          setHasTrackedView(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [hasTrackedView])

  const { scrollYProgress } = useScroll({
    target: isMobile === false ? containerRef : undefined,
    offset: ["start start", "end end"],
  })

  // Use the six images from the public/scrollPage folder
  const scrollFilenames = ["sp1.webp", "sp2.webp", "sp3.webp", "sp4.webp", "sp5.webp", "sp6.webp"]

  const cardContents = [
    {
      title: { lines: ["Exporters & Importers"] },
      description: {
        lines: [
          "Get paid faster for your international trade. Receive payments from global buyers without long settlement delays or extra charges.",

        ],
      },
    },
    {
      title: { lines: ["SMEs & Enterprises"] },
      description: {
        lines: [
          "Collect payments from clients across borders easily. Manage all your international receivables from one dashboard."
        ],
      },
    },
    {
      title: { lines: ["Service Providers"] },
      description: {
        lines: [
          "Receive overseas client payments in any currency quickly, securely, and without heavy bank fees.",
        ],
      },
    },
    {
      title: { lines: ["Marketplace Sellers"] },
      description: {
        lines: [
          "Collect payouts from platforms like Amazon or Shopify directly into your account. Withdraw anytime with full visibility."
        ],
      },
    },
    {
      title: { lines: ["Global Payroll & Workforce Payments"] },
      description: {
        lines: [
          "Pay your international employees, contractors, and remote teams with faster, compliant settlements"
        ],
      },
    },
    {
      title: { lines: ["Freelancers & Agencies"] },
      description: {
        lines: [

          "Get paid from clients on platforms like Upwork, Fiverr, and global marketplaces with faster settlements and no hidden deductions.",
        ],
      },
    },
  ]

  const cardData = scrollFilenames.map((name, index) => ({
    imageSrc: `/scrollPage/${encodeURIComponent(name)}`,
    altText: name,
    content: {
      ...(cardContents[index] || {}),
      cta: index === scrollFilenames.length - 1 ? "Find your solution" : null,
    },
  }))

  // Desktop styles
  const staticTextStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    fontSize: "50px",
    lineHeight: "45px",
    letterSpacing: "-0.02em",
    wordSpacing: "0em",
    textTransform: "capitalize",
  }

  const builtForStyle = {
    ...staticTextStyle,
    color: "#C0C0C0",
    display: "inline",
    padding: 0,
    wordSpacing: "-0.12em",
  }

  const titleStyle = {
    ...staticTextStyle,
    color: "#333333",
    display: "block",
    maxWidth: "480px",
  }

  // Mobile heading styles
  const mobileHeadingStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    wordSpacing: "0em",
    textAlign: "center",
    textTransform: "capitalize",
  }

  const mobileBuiltForStyle = {
    ...mobileHeadingStyle,
    color: "#C0C0C0",
    padding: 0,
    wordSpacing: "-0.06em",
  }

  const mobileTitleStyle = {
    ...mobileHeadingStyle,
    color: "#333333",
    lineHeight: "35px",
  }

  // Calculate the total scroll height: base height + extra scroll for animations
  const scrollHeight = `${(cardData.length + 2) * 100}vh`

  const resolvedIsMobile = isMobile === null ? false : isMobile

  // Easing function for smooth animation
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  // Mobile scroll functions with custom smooth animation
  const scrollToSlide = (index) => {
    if (mobileScrollRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true
      const scrollWidth = mobileScrollRef.current.scrollWidth
      const targetPosition = (scrollWidth / cardData.length) * index
      const startPosition = mobileScrollRef.current.scrollLeft
      const distance = targetPosition - startPosition
      const duration = 800 // ms
      const startTime = performance.now()

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        mobileScrollRef.current.scrollLeft = startPosition + distance * easedProgress

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          isScrollingRef.current = false
          setCurrentSlide(index)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const handlePrevSlide = () => {
    resetAutoPlay()
    const newIndex = currentSlide > 0 ? currentSlide - 1 : cardData.length - 1
    scrollToSlide(newIndex)
  }

  const handleNextSlide = () => {
    resetAutoPlay()
    const newIndex = currentSlide < cardData.length - 1 ? currentSlide + 1 : 0
    scrollToSlide(newIndex)
  }

  // Auto-play functionality
  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    if (isMobile) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextIndex = prev < cardData.length - 1 ? prev + 1 : 0
          scrollToSlide(nextIndex)
          return nextIndex
        })
      }, 4000)
    }
  }

  // Start auto-play on mount for mobile
  useEffect(() => {
    if (isMobile) {
      resetAutoPlay()
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isMobile, cardData.length])

  // Update active slide when scrolling manually
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current
    if (!scrollContainer || !isMobile) return

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        const scrollLeft = scrollContainer.scrollLeft
        const cardWidth = scrollContainer.clientWidth
        const newIndex = Math.round(scrollLeft / cardWidth)
        if (newIndex !== currentSlide) {
          setCurrentSlide(newIndex)
        }
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [isMobile, currentSlide])

  const openGetStartedPopup = () => {
    try {
      AnalyticsService.sendEvent("VerticalScrolling Get Started Clicked")
    } catch (e) { }
    setIsPopupOpen(true)
  }

  const closeGetStartedPopup = () => setIsPopupOpen(false)

  return (
    <>
      {/* Desktop View */}
      {!isMobile && (
        <div ref={containerRef} style={{ height: scrollHeight }} className="block bg-[#F9F9F9]">
          <div ref={viewRef} className="sticky top-0 h-screen grid grid-cols-2 bg-[#F9F9F9]">
            {/* 1. Left Side: Static Content */}
            <div className="p-16 flex items-center justify-start bg-[#F9F9F9]">
              <div className="max-w-lg">
                <p className="mb-2" style={builtForStyle}>
                  Built For
                </p>
                <h1
                  className="leading-tight mt-0 desktop-heading"
                  style={{ ...titleStyle, lineClamp: 3, WebkitLineClamp: 3 }}
                >
                  Global Businesses & Merchants
                </h1>
              </div>
            </div>

            {/* 2. Right Side: Animated Content */}
            <div className="relative overflow-hidden">
              {cardData.map((card, index) => (
                <PhotoCardItem
                  key={index}
                  imageSrc={card.imageSrc}
                  altText={card.altText}
                  index={index}
                  progress={scrollYProgress}
                  totalImages={cardData.length}
                  cardContent={card.content}
                  onOpenPopup={openGetStartedPopup}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div ref={viewRef} className="block bg-[#F9F9F9]">
          {/* Heading Section (mobile) */}
          <div className="px-6 py-6 text-center">
            <p className="mb-2" style={mobileBuiltForStyle}>
              Built For
            </p>
            <h1 className="mt-0" style={mobileTitleStyle}>
              Global Businesses & Merchants
            </h1>
          </div>

          {/* Horizontal Scrolling Cards Section */}
          <div className="relative">
            {/* Scrollable Container */}
            <div
              ref={mobileScrollRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {cardData.map((card, index) => (
                <MobileCard
                  key={index}
                  imageSrc={card.imageSrc}
                  altText={card.altText}
                  cardContent={card.content}
                  onOpenPopup={openGetStartedPopup}
                  isActive={index === currentSlide}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-4 top-6">
              <div className="flex flex-row gap-1">
                <button
                  onClick={handlePrevSlide}
                  className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-100" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-gray-100" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Get Started popup (reuse same popup as BepayLanding) */}
      {typeof window !== "undefined" && (
        <GetStartedPopup isOpen={isPopupOpen} onClose={closeGetStartedPopup} />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .desktop-heading {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          max-height: 135px;
          line-height: 45px !important;
          word-break: normal;
          hyphens: none;
        }
      `}</style>
    </>
  )
}

export default VerticalScrollingSection
