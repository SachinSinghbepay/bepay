"use client"

import { useRef, useLayoutEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function RealSavingSection() {
  const sectionRef = useRef(null)
  const leftContentRef = useRef(null)
  const rightContentRef = useRef(null)
  const numberRef = useRef(null)
  const mockupRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const line4Ref = useRef(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [currentImage, setCurrentImage] = useState("m1.png")

  const steps = [
    { number: "1", image: "m1.png" },
    { number: "2", image: "m2.png" },
    { number: "3", image: "m3.png" },
    { number: "4", image: "m4.png" },
    { number: "TOTAL", image: "m5.png" },
  ]

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Ensure all elements exist before animating
      const elements = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
        numberRef.current,
        mockupRef.current,
      ]
      if (elements.some((el) => !el)) {
        console.warn("Some animation elements not found")
        return
      }

      // Set initial states to hidden for all elements
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
        opacity: 0,
        y: 100,
        visibility: "hidden",
      })
      gsap.set(numberRef.current, {
        opacity: 0,
        y: -200,
        visibility: "hidden",
      })
      gsap.set(mockupRef.current, {
        opacity: 0,
        y: 200,
        visibility: "hidden",
      })

      // 1. Left Content Animation: Animates once when the section enters the viewport
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // When the top of the section hits 80% from the top of the viewport
            toggleActions: "play none none none", // Play once when entering, then do nothing
          },
        })
        .to(line1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          visibility: "visible",
        })
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            visibility: "visible",
          },
          "-=0.4", // Overlap slightly with the previous animation
        )
        .to(
          line3Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            visibility: "visible",
          },
          "-=0.4",
        )
        .to(
          line4Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            visibility: "visible",
          },
          "-=0.4",
        )

      // 2. Main ScrollTrigger for Pinning and Right Content Entrance
      // This timeline handles the initial animation of the number and mockup into view
      const mainPinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin the section when its top hits the top of the viewport
          end: "bottom top", // Unpin when the bottom of the section hits the top of the viewport
          pin: true, // Keep the section fixed in the viewport
          pinSpacing: true, // Add spacing to prevent content from jumping
          scrub: 1, // Smoothly scrub the entrance animation of number/mockup
          invalidateOnRefresh: true, // Recalculate on refresh
        },
      })

      mainPinTimeline
        // Animate number into view from top
        .to(numberRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5, // Duration for entrance animation
          ease: "power3.out",
          visibility: "visible",
        })
        // Animate mockup into view from bottom
        .to(
          mockupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            visibility: "visible",
          },
          "<", // Start at the same time as the number animation
        )

      // 3. Step Progression: Updates the current step and image based on scroll progress
      // This ScrollTrigger is separate and only responsible for updating the React state.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", // Start tracking progress when the section pins
        end: "bottom top", // End tracking when the section unpins
        scrub: true, // Smoothly update progress
        onUpdate: (self) => {
          const progress = self.progress // Progress from 0 to 1 over the pinned duration
          const totalSteps = steps.length
          const stepSegment = 1 / totalSteps
          // Calculate the current step index based on scroll progress
          const currentStepIndex = Math.min(Math.floor(progress / stepSegment), totalSteps - 1)

          // Update state only if the step has changed to avoid unnecessary re-renders [^3]
          if (currentStepIndex + 1 !== currentStep) {
            setCurrentStep(currentStepIndex + 1)
            setCurrentImage(steps[currentStepIndex].image)
          }
        },
      })
    }, sectionRef) // GSAP Context scope [^1]

    // Comprehensive cleanup function for GSAP animations and ScrollTriggers [^2]
    return () => {
      ctx.revert() // Reverts all GSAP animations and ScrollTriggers created within this context
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()) // Ensure all ScrollTriggers are killed
      ScrollTrigger.refresh() // Refresh ScrollTrigger to ensure a clean state
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  return (
    <section ref={sectionRef} className="min-h-screen flex items-start justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center w-full">
          {/* Left Content */}
          <div
            ref={leftContentRef}
            className="bg-[#F4F4F4] flex justify-center items-center lg:col-span-3 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] p-6 sm:p-8 md:p-12 lg:p-16 order-2 lg:order-1"
          >
            <div className="space-y-3 sm:space-y-4">
              <h1
                ref={line1Ref}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-400 leading-tight"
              >
                Real <span className="text-gray-800 font-normal">use.</span>
              </h1>
              <h2
                ref={line2Ref}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-400 leading-tight"
              >
                Real <span className="text-gray-800 font-normal">savings.</span>
              </h2>
              <div className="pt-4 sm:pt-6 space-y-1 sm:space-y-2">
                <p ref={line3Ref} className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium">
                  Your Life Already Costs Money.
                </p>
                <p ref={line4Ref} className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-medium">
                  We Just <span className="font-semibold">Pay You Back.</span>
                </p>
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div
            ref={rightContentRef}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] lg:col-span-2 order-1 lg:order-2 overflow-hidden"
          >
            {/* Dynamic Number */}
            <div
              ref={numberRef}
              className="absolute -top-2/3 inset-0 flex items-center justify-center pointer-events-none"
            >
              <span
                className="font-[400] bg-gradient-to-b from-[#EDEDED] to-[#EDEDED1A] text-transparent bg-clip-text select-none leading-none"
                style={{
                  fontSize: "clamp(120px, 25vw, 200px)",
                }}
              >
                {steps[currentStep - 1]?.number}
              </span>
            </div>
            {/* Dynamic Phone Mockup */}
            <div
              ref={mockupRef}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 sm:w-3/4 md:w-2/3 lg:w-2/3 h-auto z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/${currentImage}`}
                  alt={`Phone mockup showing payment interface step ${currentStep}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority // Keep priority for the initial load
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
