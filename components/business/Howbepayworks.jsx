"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CryptoPaymentFlowSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const containerRef = useRef(null)

  // Refs for mockups and titles
  const mockup1Ref = useRef(null)
  const mockup2Ref = useRef(null)
  const mockup3Ref = useRef(null)
  const mockup4Ref = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const title3Ref = useRef(null)
  const title4Ref = useRef(null)
  const merchantButtonRef = useRef(null)
  const callButtonRef = useRef(null)
  const hassleRef = useRef(null)
  const volatilityRef = useRef(null)
  const delaysRef = useRef(null)

  useEffect(() => {
    // Ensure all elements are loaded before starting animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Helper function to get responsive values
    const getResponsiveValues = () => {
      const width = window.innerWidth

      if (width < 640) {
        // Mobile
        return {
          mockup: { scale: 0.6, yOffset: 100 },
          text: { scale: 0.8, yOffset: 60 },
          benefits: { yStart: 60, scale: 0.7, spacing: 15 },
          buttons: { yStart: 30, scale: 0.8 },
          scrollEnd: "+=250%",
        }
      } else if (width < 768) {
        // Small tablet
        return {
          mockup: { scale: 0.75, yOffset: 110 },
          text: { scale: 0.85, yOffset: 70 },
          benefits: { yStart: 200, scale: 0.8, spacing: 25 },
          buttons: { yStart: 100, scale: 0.85 },
          scrollEnd: "+=300%",
        }
      } else if (width < 1024) {
        // Tablet
        return {
          mockup: { scale: 0.85, yOffset: 120 },
          text: { scale: 0.9, yOffset: 80 },
          benefits: { yStart: 250, scale: 0.9, spacing: 35 },
          buttons: { yStart: 125, scale: 0.9 },
          scrollEnd: "+=350%",
        }
      } else {
        // Desktop
        return {
          mockup: { scale: 1, yOffset: 150 },
          text: { scale: 1, yOffset: 100 },
          benefits: { yStart: 400, scale: 1, spacing: 50 },
          buttons: { yStart: 200, scale: 1 },
          scrollEnd: "+=400%",
        }
      }
    }

    const initializeElements = () => {
      const values = getResponsiveValues()

      // Ensure title and description are always visible initially
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      })

      // Set initial states for mockups
      gsap.set(mockup1Ref.current, {
        y: `${values.mockup.yOffset}%`,
        scale: values.mockup.scale,
        opacity: 0,
      })

      gsap.set([mockup2Ref.current, mockup3Ref.current, mockup4Ref.current], {
        y: `${values.mockup.yOffset}%`,
        scale: values.mockup.scale,
        opacity: 0,
      })

      // Set initial states for titles
      gsap.set(title1Ref.current, {
        y: values.text.yOffset,
        opacity: 0,
        scale: values.text.scale,
      })

      gsap.set([title2Ref.current, title3Ref.current, title4Ref.current], {
        opacity: 0,
        y: values.text.yOffset,
        scale: values.text.scale,
      })

      // Set initial states for benefit texts
      gsap.set([hassleRef.current, volatilityRef.current, delaysRef.current], {
        y: values.benefits.yStart,
        opacity: 1,
        scale: values.benefits.scale,
      })

      // Set initial states for buttons
      gsap.set([merchantButtonRef.current, callButtonRef.current], {
        y: values.buttons.yStart,
        opacity: 1,
        scale: values.buttons.scale,
      })
    }

    const createAnimation = () => {
      const values = getResponsiveValues()

      // Initialize all elements first
      initializeElements()

      // Create master timeline
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: values.scrollEnd,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false,
          refreshPriority: -1,
          onRefresh: () => {
            // Ensure title stays visible on refresh
            gsap.set([titleRef.current, descriptionRef.current], {
              opacity: 1,
              y: 0,
            })
          },
        },
      })

      // Build animation sequence
      masterTimeline
        // Step 1: Show first mockup
        .to(mockup1Ref.current, {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          title1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "<0.2",
        )

        // Step 2: Transition to second mockup
        .to(mockup1Ref.current, {
          y: `-${values.mockup.yOffset}%`,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          title1Ref.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          [mockup2Ref.current, title2Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.3",
        )

        // Step 3: Transition to third mockup
        .to(mockup2Ref.current, {
          y: `-${values.mockup.yOffset}%`,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          title2Ref.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          [mockup3Ref.current, title3Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.3",
        )

        // Step 4: Transition to fourth mockup
        .to(mockup3Ref.current, {
          y: `-${values.mockup.yOffset}%`,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          title3Ref.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          [mockup4Ref.current, title4Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.3",
        )

        // Final animations: Benefits and buttons
        .to(hassleRef.current, {
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
        .to(
          volatilityRef.current,
          {
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .to(
          delaysRef.current,
          {
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .to(
          [merchantButtonRef.current, callButtonRef.current],
          {
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )

      return masterTimeline
    }

    let animation = createAnimation()

    // Improved resize handler
    const handleResize = () => {
      if (animation) {
        animation.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      // Small delay to ensure resize is complete
      setTimeout(() => {
        animation = createAnimation()
      }, 150)
    }

    // Debounced resize handler
    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 300)
    }

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
      if (animation) {
        animation.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoaded])

  return (
    <div ref={sectionRef} className="min-h-screen bg-white pb-[60vh] sm:pb-[40vh] lg:pb-[20vh]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Always visible */}
        <div className="text-center relative top-0 max-w-[1000px] mx-auto mb-16 sm:mb-24 lg:mb-32">
          <h2
            ref={titleRef}
            className="font-light text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] leading-[1.1] tracking-tight opacity-100"
          >
            <div className="inline-block mb-2 sm:mb-4">
              <span className="text-gray-300 font-light">How </span>
              <span className="text-gray-900">crypto payments</span>
            </div>
            <br />
            <div className="inline-block">
              <span className="text-gray-300 font-light">work with </span>
              <span className="text-gray-900">bepay</span>
            </div>
          </h2>
          <p
            ref={descriptionRef}
            className="mt-6 sm:mt-8 lg:mt-10 text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-100"
          >
            Seamless cryptocurrency payments in four simple steps — from checkout to settlement
          </p>
        </div>

        {/* Mockups Section */}
        <div ref={containerRef} className="relative -mt-[20%] sm:-mt-[15%] lg:-mt-[20%] min-h-[70vh] sm:min-h-[80vh]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mockup 1 */}
            <div className="mockup absolute w-full flex items-center justify-center">
              <div className="relative">
                <div
                  ref={mockup1Ref}
                  className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[560px] sm:h-[640px] md:h-[680px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border-[6px] sm:border-[8px] border-[#d7d7d7]/70 overflow-hidden"
                >
                  <div className="absolute inset-2 rounded-[24px] sm:rounded-[32px] overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=680&width=340"
                      alt="Step 1"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div
                  ref={title1Ref}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-6 md:-left-[90%] md:top-[70%] md:-translate-y-1/2 md:translate-x-0 w-full max-w-[280px] sm:max-w-[300px] text-center md:text-left mt-4 md:mt-0"
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                    Customer selects crypto at checkout
                  </h3>
                </div>
              </div>
            </div>

            {/* Mockup 2 */}
            <div className="mockup absolute w-full flex items-center justify-center">
              <div className="relative">
                <div
                  ref={mockup2Ref}
                  className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[560px] sm:h-[640px] md:h-[680px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border-[6px] sm:border-[8px] border-[#d7d7d7]/70 overflow-hidden"
                >
                  <div className="absolute inset-2 rounded-[24px] sm:rounded-[32px] overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=680&width=340"
                      alt="Step 2"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div
                  ref={title2Ref}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-6 md:left-[110%] md:top-[70%] md:-translate-y-1/2 md:translate-x-0 w-full max-w-[280px] sm:max-w-[300px] text-center md:text-left mt-4 md:mt-0"
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                    bepay generates QR code or token address
                  </h3>
                </div>
              </div>
            </div>

            {/* Mockup 3 */}
            <div className="mockup absolute w-full flex items-center justify-center">
              <div className="relative">
                <div
                  ref={mockup3Ref}
                  className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[560px] sm:h-[640px] md:h-[680px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border-[6px] sm:border-[8px] border-[#d7d7d7]/70 overflow-hidden"
                >
                  <div className="absolute inset-2 rounded-[24px] sm:rounded-[32px] overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=680&width=340"
                      alt="Step 3"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div
                  ref={title3Ref}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-6 md:-left-[100%] md:top-[70%] md:-translate-y-1/2 md:translate-x-0 w-full max-w-[280px] sm:max-w-[300px] text-center md:text-left mt-4 md:mt-0"
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                    Customer pays in BTC, ETH, USDT & more
                  </h3>
                </div>
              </div>
            </div>

            {/* Mockup 4 */}
            <div className="mockup absolute w-full flex items-center justify-center">
              <div className="relative">
                <div
                  ref={mockup4Ref}
                  className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[560px] sm:h-[640px] md:h-[680px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border-[6px] sm:border-[8px] border-[#d7d7d7]/70 overflow-hidden"
                >
                  <div className="absolute inset-2 rounded-[24px] sm:rounded-[32px] overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=680&width=340"
                      alt="Step 4"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div
                  ref={title4Ref}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-6 md:left-[110%] md:top-[70%] md:-translate-y-1/2 md:translate-x-0 w-full max-w-[280px] sm:max-w-[300px] text-center md:text-left mt-4 md:mt-0"
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                    Crypto is auto-credited to your bepay account
                  </h3>
                </div>

                {/* Benefits Text Elements */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[20rem] sm:-bottom-[16rem] md:left-[85%] md:top-[10%] md:translate-x-0 md:bottom-auto flex flex-col gap-3 sm:gap-4 md:gap-6 w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px]">
                  <div
                    ref={hassleRef}
                    className="text-black text-center font-bold text-xs sm:text-sm md:text-base lg:text-lg bg-white/90 backdrop-blur-md border border-gray-200 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-lg"
                  >
                    <h1 className="whitespace-nowrap">NO HASSLE!</h1>
                  </div>
                  <div
                    ref={volatilityRef}
                    className="text-black text-center font-bold text-xs sm:text-sm md:text-base lg:text-lg bg-white/90 backdrop-blur-md border border-gray-200 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-lg md:-translate-x-[35vw]"
                  >
                    <h1 className="whitespace-nowrap">NO VOLATILITY!</h1>
                  </div>
                  <div
                    ref={delaysRef}
                    className="text-black text-center font-bold text-xs sm:text-sm md:text-base lg:text-lg bg-white/90 backdrop-blur-md border border-gray-200 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-lg md:-translate-x-[33vw] md:mt-32 lg:mt-44"
                  >
                    <h1 className="whitespace-nowrap">NO DELAYS!</h1>
                  </div>
                </div>

                {/* Button Container */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[8rem] sm:-bottom-[4rem] md:left-[120%] md:top-[60%] md:translate-x-0 md:bottom-auto flex flex-col gap-2 w-full max-w-[200px] sm:max-w-[220px]">
                  {/* Merchant Button */}
                  <div ref={merchantButtonRef}>
                    <button className="bg-black text-white px-3 sm:px-4 py-3 sm:py-3.5 rounded-full flex items-center gap-2 justify-center hover:bg-gray-900 transition-colors w-full">
                      <span className="text-xs sm:text-sm font-medium leading-tight">Become a merchant on bepay</span>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-black">
                          <path
                            d="M1 4h6m0 0L4 1m3 3L4 7"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                  {/* Call Button */}
                  <div ref={callButtonRef}>
                    <button className="bg-white text-black px-3 sm:px-4 py-3 sm:py-3.5 rounded-full flex items-center gap-2 justify-center hover:bg-gray-100 transition-colors w-full border border-gray-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
                          <path
                            d="M2 1.5C2 1.22386 2.22386 1 2.5 1H3.5C3.77614 1 4 1.22386 4 1.5V2.5C4 2.77614 3.77614 3 3.5 3H2.5C2.22386 3 2 2.77614 2 2.5V1.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M4.5 4.5C4.5 4.22386 4.72386 4 5 4H6C6.27614 4 6.5 4.22386 6.5 4.5V5.5C6.5 5.77614 6.27614 6 6 6H5C4.72386 6 4.5 5.77614 4.5 5.5V4.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-tight">Quick chat with sales</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
