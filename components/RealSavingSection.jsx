"use client";

import { useRef, useLayoutEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function RealSavingSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const numberRef = useRef(null);
  const mockupRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [currentImage, setCurrentImage] = useState("m1.png");

  // ✅ CORRECTED: Memoize the steps array to prevent it from changing on every render.
  const steps = useMemo(() => [
    { number: "1", image: "m1.png" },
    { number: "2", image: "m2.png" },
    { number: "3", image: "m3.png" },
    { number: "4", image: "m4.png" },
    { number: "TOTAL", image: "m5.png" },
  ], []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Ensure all elements exist before animating
      const elements = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
        numberRef.current,
        mockupRef.current,
      ];
      if (elements.some((el) => !el)) {
        console.warn("Some animation elements not found");
        return;
      }

      // Set initial states to hidden for all elements
      gsap.set(
        [
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          line4Ref.current,
        ],
        {
          opacity: 0,
          y: 100,
          visibility: "hidden",
        }
      );
      gsap.set(numberRef.current, {
        opacity: 0,
        y: -200,
        visibility: "hidden",
      });
      gsap.set(mockupRef.current, {
        opacity: 0,
        y: 200,
        visibility: "hidden",
      });

      // 1. Left Content Animation: Animates once when the section enters the viewport
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
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
          "-=0.4"
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
          "-=0.4"
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
          "-=0.4"
        );

      // 2. Main ScrollTrigger for Pinning and Right Content Entrance
      const mainPinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      mainPinTimeline
        .to(numberRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          visibility: "visible",
        })
        .to(
          mockupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            visibility: "visible",
          },
          "<"
        );

      // 3. Step Progression
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalSteps = steps.length;
          const stepSegment = 1 / totalSteps;
          const currentStepIndex = Math.min(
            Math.floor(progress / stepSegment),
            totalSteps - 1
          );

          if (currentStepIndex + 1 !== currentStep) {
            setCurrentStep(currentStepIndex + 1);
            setCurrentImage(steps[currentStepIndex].image);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [currentStep, steps]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-start justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
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
                <p
                  ref={line3Ref}
                  className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium"
                >
                  Your Life Already Costs Money.
                </p>
                <p
                  ref={line4Ref}
                  className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-medium"
                >
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
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}