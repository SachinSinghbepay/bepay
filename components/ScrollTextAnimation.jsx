"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const ScrollTextAnimation = () => {
  const containerRef = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
  const firstLineRef = useRef(null)
  const secondLineRef = useRef(null)
  const thirdLineRef = useRef(null)
  const fourthLineRef = useRef(null)
  const fifthLineRef = useRef(null)
  const cardSectionRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const lastCardLeftRef = useRef(null)
  const lastCardRightRef = useRef(null)
  const lastCardContentRef = useRef(null)
  const lastCardNumberRef = useRef(null)
  const downloadButton1Ref = useRef(null)
  const downloadButton2Ref = useRef(null)
  const downloadButton3Ref = useRef(null)
  const [windowWidth, setWindowWidth] = useState(0)

  // Card data
  const cardSets = [
    {
      id: 1,
      leftCard: {
        number: "1",
        title: "UPI Credit Card with",
        highlight: "unlimited 7% cashback & rewards",
        description: "on every bill payment, mobile recharge, travel & ticket booking",
      },
      rightCard: {
        image: "/s1.png",
        alt: "Credit Cards",
      },
    },
    {
      id: 2,
      leftCard: {
        number: "2",
        title: "",
        highlight: "9%* returns ",
        description: "on Fixed Deposits (FDs)",
      },
      rightCard: {
        image: "/s2.png",
        alt: "Crypto Trading",
      },
    },
    {
      id: 3,
      leftCard: {
        number: "3",
        title: "",
        highlight: "Invest in Gold ",
        description: "& global real estate",
      },
      rightCard: {
        image: "/s3.png",
        alt: "Investment Platform",
      },
    },
    {
      id: 4,
      leftCard: {
        number: "4",
        title: "",
        highlight: "Withdraw money from ",
        description: "credit card to debit card",
      },
      rightCard: {
        image: "/s4.png",
        alt: "Digital Banking",
      },
    },
    {
      id: 5,
      leftCard: {
        number: "5",
        title: "",
        highlight: "Crypto UPI – ",
        description: "send via QR, phone, email, or bepay ID",
      },
      rightCard: {
        image: "/s5.png",
        alt: "Digital Banking",
      },
    },
    {
      id: 6,
      leftCard: {
        number: "6",
        title: "Get instant ",
        highlight: "Bitcoin backed loans",
        description: "",
      },
      rightCard: {
        image: "/s6.png",
        alt: "Digital Banking",
      },
    },
    {
      id: 7,
      leftCard: {
        number: "7",
        title: "Insurance that covers your ",
        highlight: "life, health, car, home & more",
        description: "",
      },
      rightCard: {
        image: "/s7.png",
        alt: "Digital Banking",
      },
    },
    {
      id: 8,
      leftCard: {
        number: "8",
        title: "",
        highlight: " DeFi Marketplace ",
        description: " — Swap. Stake. Earn. All in one app.",
      },
      rightCard: {
        image: "/s8.png",
        alt: "Digital Banking",
      },
    },
  ]

   useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasTrackedView) {
            AnalyticsService.sendEvent("UPI scroll-text-animation-section viewed");
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const firstLine = firstLineRef.current
    const secondLine = secondLineRef.current
    const thirdLine = thirdLineRef.current
    const fourthLine = fourthLineRef.current
    const fifthLine = fifthLineRef.current
    const cardSection = cardSectionRef.current
    const cardsContainer = cardsContainerRef.current
    const lastCardLeft = lastCardLeftRef.current
    const lastCardRight = lastCardRightRef.current
    const lastCardContent = lastCardContentRef.current
    const lastCardNumber = lastCardNumberRef.current
    const downloadButton1 = downloadButton1Ref.current
    const downloadButton2 = downloadButton2Ref.current
    const downloadButton3 = downloadButton3Ref.current

    if (
      !container ||
      !firstLine ||
      !secondLine ||
      !thirdLine ||
      !fourthLine ||
      !fifthLine ||
      !cardSection ||
      !cardsContainer ||
      !lastCardLeft ||
      !lastCardRight ||
      !lastCardContent ||
      !lastCardNumber ||
      !downloadButton1 ||
      !downloadButton2 ||
      !downloadButton3 ||
      windowWidth === 0
    )
      return

    // Create a GSAP context to isolate animations
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(cardSection, {
        opacity: 0,
        y: 100,
      })
      gsap.set([thirdLine, fourthLine, fifthLine], {
        opacity: 0,
        y: 50,
      })
      gsap.set([firstLine, secondLine], {
        opacity: 0,
        y: 100,
      })
      // Set cards container to start at position 0 (showing card 1)
      gsap.set(cardsContainer, {
        x: 0,
      })
      // Set download buttons initial state
      gsap.set([downloadButton1, downloadButton2, downloadButton3], {
        opacity: 0,
        y: 30,
      })

      // Create main timeline with much longer duration
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1000%", // Significantly increased for slower animation and complete finish
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true, // Uncomment to debug
        },
      })

      // Text animation sequence - slower and more gradual
      mainTl
        .to([firstLine, secondLine], {
          opacity: 1,
          y: 0,
          duration: 0.5, // Increased duration
          stagger: 0.2, // Increased stagger
          ease: "power2.out",
        })
        .to(
          thirdLine,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "+=0.3", // Increased delay
        )
        .to(
          fourthLine,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "+=0.3", // Increased delay
        )
        .to(
          fifthLine,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "+=0.3", // Increased delay
        )
        // Hold the text longer before fading out
        .to({}, { duration: 0.8 }, "+=0.5") // Added hold time
        .to(
          [thirdLine, fourthLine, fifthLine],
          {
            opacity: 0,
            y: 100,
            duration: 0.6, // Slower fade out
            stagger: 0.1,
            ease: "power2.inOut",
          },
          "+=0.2",
        )
        .to(
          cardSection,
          {
            opacity: 1,
            y: 0,
            duration: 0.8, // Slower card section entrance
            ease: "power2.out",
          },
          "-=0.2",
        )
        // Horizontal scrolling - much slower movement through cards
        .to(
          cardsContainer,
          {
            x: () => -(cardSets.length - 1) * windowWidth,
            duration: 12, // Significantly increased from 5 to 12
            ease: "none",
          },
          "+=0.5", // Added pause before cards start moving
        )
        // Hold at the last card longer before final animations
        .to({}, { duration: 1.5 }, "lastCardHold") // Use a label for clarity

        // Final animation for the last card (index 7)
        .to(
          lastCardRight,
          {
            x: () => {
              const isMobile = windowWidth < 1024
              if (isMobile) {
                return 0 // Keep centered on mobile, no horizontal movement
              }
              return "-56%" // Desktop horizontal overlap
            },
            y: () => {
              const isMobile = windowWidth < 1024
              if (isMobile) {
                return 0 // Keep centered on mobile, no vertical movement
              }
              return 0 // No vertical movement on desktop
            },
            opacity: () => {
              const isMobile = windowWidth < 1024
              if (isMobile) {
                return 1 // Fade out image on mobile
              }
              return 1 // Stay visible on desktop
            },
            zIndex: 1, // Send to back
            duration: 1.5, // Slower final animation
            ease: "power2.inOut",
          },
          "lastCardHold+=0.3", // Start slightly after the hold
        )
        .to(
          lastCardLeft,
          {
            x: () => {
              const isMobile = windowWidth < 1024
              if (isMobile) {
                return 0 // Keep centered on mobile, no horizontal movement
              }
              return "50%" // Desktop horizontal overlap
            },
            y: () => {
              const isMobile = windowWidth < 1024
              if (isMobile) {
                return 0 // Keep centered on mobile, no vertical movement
              }
              return 0 // No vertical movement on desktop
            },
            zIndex: 10, // Bring to front
            duration: 1.5, // Slower final animation
            ease: "power2.inOut",
          },
          "lastCardHold+=0.3", // Start at the same time as right card
        )
        // Move content and number up and fade out - slower
        .to(
          [lastCardContent, lastCardNumber],
          {
            y: -100,
            opacity: 0,
            duration: 0.8, // Slower fade out
            ease: "power2.inOut",
          },
          "lastCardHold+=1.0", // Start after cards have settled a bit
        )
        // Show download buttons one by one - slower
        .to(
          downloadButton1,
          {
            opacity: 1,
            y: 0,
            duration: 0.6, // Slower button animation
            ease: "power2.out",
          },
          "lastCardHold+=1.5", // Start after content fades out
        )
        .to(
          downloadButton2,
          {
            opacity: 1,
            y: 0,
            duration: 0.6, // Slower button animation
            ease: "power2.out",
          },
          "+=0.3",
        )
        .to(
          downloadButton3,
          {
            opacity: 1,
            y: 0,
            duration: 0.6, // Slower button animation
            ease: "power2.out",
          },
          "+=0.3",
        )
        // Hold the buttons visible much longer to ensure complete finish
        .to({}, { duration: 3 }, "+=0.5") // Much longer hold time at the end
    }, container) // Pass the container ref to the context to scope it
    // Cleanup function for the context
    return () => ctx.revert()
  }, [windowWidth, cardSets.length])

  return (
    <div ref={containerRef} className="relative bg-[#F9F9F9] z-20 w-full min-h-screen overflow-hidden">
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <div ref={firstLineRef} className="mb-4">
          <span className="text-4xl md:text-6xl lg:text-8xl xl:text-[140px] font-[400] text-gray-400">One </span>
          <span className="text-4xl md:text-6xl lg:text-8xl xl:text-[140px] font-[400] text-black">SuperApp.</span>
        </div>
        <div ref={secondLineRef} className="mb-8 lg:mb-12">
          <span className="text-4xl md:text-6xl lg:text-8xl xl:text-[140px] font-[400] text-gray-400">
            Full Control.
          </span>
        </div>
        <div ref={thirdLineRef} className="mb-6 lg:mb-8">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[400] text-black">Send. Spend. Earn.</span>
        </div>
        <div ref={fourthLineRef} className="mb-6 lg:mb-8">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[400] text-gray-400">
            Crypto or UPI — it just works.
          </span>
        </div>
        <div ref={fifthLineRef} className="space-y-2">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
            Stop losing money to hidden fees and wasted rewards.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-medium">
            Your ₹50,000 monthly spend could <span className="font-bold">earn you up to ₹3,500 back</span> —
            automatically.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div ref={cardSectionRef} className="absolute inset-0 opacity-0">
        <div ref={cardsContainerRef} className="flex h-full" style={{ width: `${cardSets.length * 100}vw` }}>
          {cardSets.map((cardSet, index) => (
            <div key={cardSet.id} className="flex-shrink-0 w-screen h-full flex items-center justify-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full items-center">
                  {/* Left Card - Text Content */}
                  <div
                    ref={index === 7 ? lastCardLeftRef : null}
                    className="relative h-full max-w-[600px] w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-white shadow-xl border border-gray-200 mx-auto"
                    style={{ zIndex: index === 7 ? 10 : "auto" }}
                  >
                    {/* Large Number */}
                    <div
                      ref={index === 7 ? lastCardNumberRef : null}
                      className="absolute top-4 z-30 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8"
                    >
                      <span className="text-6xl sm:text-8xl lg:text-[120px] xl:text-[140px] font-[500] bg-gradient-to-b from-[#EDEDED] to-[#EDEDED1A] text-transparent bg-clip-text">
                        {cardSet.leftCard.number}
                      </span>
                    </div>
                    {/* Content */}
                    <div
                      ref={index === 7 ? lastCardContentRef : null}
                      className="absolute bottom-4 z-10 text-left left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12"
                    >
                      <p className="text-base sm:text-lg max-w-[400px] lg:text-2xl text-gray-600 mb-3">
                        {cardSet.leftCard.title}
                        <span className="text-black font-semibold"> {cardSet.leftCard.highlight}</span>
                        {cardSet.leftCard.description}
                      </p>
                    </div>
                    {/* Download Buttons - Only for last card */}
                    {index === 7 && (
                      <div className="absolute bottom-1/3 max-w-[300px] mx-auto left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12 space-y-3">
                        <button
                          ref={downloadButton1Ref}
                          className="w-full bg-black text-white px-4 py-3 rounded-full flex items-center justify-center space-x-2 text-sm font-medium opacity-0"
                        >
                          <span>
                            {" "}
                            <Image
                              src={"/apple.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="apple logo"
                            />{" "}
                          </span>
                          <span>Download on the App Store</span>
                        </button>
                        <button
                          ref={downloadButton2Ref}
                          className="w-full bg-black text-white px-4 py-3 rounded-full flex items-center justify-center space-x-2 text-sm font-medium opacity-0"
                        >
                          <span>
                            <Image
                              src={"/playstore.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="playstore logo"
                            />{" "}
                          </span>
                          <span>Get the App on Google Play!</span>
                        </button>
                        <button
                          ref={downloadButton3Ref}
                          className="w-full bg-black text-white px-4 py-3 rounded-full flex items-center justify-center space-x-2 text-sm font-medium opacity-0"
                        >
                          <span>
                            <Image
                              src={"/gal.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="gallery logo"
                            />{" "}
                          </span>
                          <span>Get it on the App Gallery!</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Right Card - Image */}
                  <div
                    ref={index === 7 ? lastCardRightRef : null}
                    className="relative bg-[#D1D1D1] h-[350px] sm:h-[450px] max-w-[600px] mx-auto w-full lg:h-[500px] rounded-2xl lg:rounded-3xl flex items-end justify-center shadow-xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      zIndex: index === 7 ? 1 : "auto",
                    }}
                  >
                    <Image
                      src={cardSet.rightCard.image || "/placeholder.svg"}
                      alt={cardSet.rightCard.alt}
                      fill
                      className={`${
                        index === 0 ? "object-contain" : "object-cover"
                      } w-full h-full rounded-2xl lg:rounded-3xl`}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollTextAnimation
