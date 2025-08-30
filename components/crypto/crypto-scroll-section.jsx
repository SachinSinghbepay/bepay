"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistTriggerButton from "../waitlist-trigger-button";

const steps = [
  {
    number: "1",
    title: "Create your Wallet",
    description: (
      <>
        Create your wallet within in{" "}
        <span className="text-black font-semibold">one tap</span>. Your wallet is ready to receive and send!
        Complete your KYC to get your virtual crypto debit card and Swiss IBAN.
        (Takes 5 min or less)
      </>
    ),
    mockup: "/images/crypto/mocup1.png",
  },
  {
    number: "2",
    title: "Fund your wallet",
    description:
      "Add crypto or fiat to your self-custody wallet. Your keys, your crypto!",
    mockup: "/images/crypto/mocup3.png",
  },
  {
    number: "3",
    title: "Start Earning & Spending",
    description:
      "Use your virtual crypto debit card, earn yield, and access all platform features. Start earning and spending immediately!",
    mockup: "/images/crypto/mocup2.png",
    hasCTA: true,
  },
];

export default function CryptoScrollSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if section is in view for animation
      const inView =
        rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsInView(inView);

      // Calculate how much of the container has been scrolled through
      const scrolled = -rect.top;
      const totalScrollDistance = containerHeight - windowHeight;

      if (scrolled <= 0) {
        setActiveStep(0);
        return;
      }

      if (scrolled >= totalScrollDistance) {
        setActiveStep(2);
        return;
      }

      // Calculate progress (0 to 1)
      const progress = scrolled / totalScrollDistance;

      // Determine which step should be active with smoother transitions
      let newActiveStep = 0;
      if (progress > 0.25 && progress <= 0.65) {
        newActiveStep = 1;
      } else if (progress > 0.65) {
        newActiveStep = 2;
      }

      setActiveStep(newActiveStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get image position based on current active step
  const getImagePosition = (imageIndex, activeIndex) => {
    // Calculate the relative position of this image
    let relativePosition = imageIndex - activeIndex;

    // Normalize to ensure we handle the circular nature
    if (relativePosition < -1) {
      relativePosition += 3;
    } else if (relativePosition > 1) {
      relativePosition -= 3;
    }

    switch (relativePosition) {
      case 0: // Center position
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 10,
          rotateY: 0,
        };
      case -1: // Left position
        return {
          x: -150,
          scale: 0.8,
          opacity: 1, // No opacity change for side images
          zIndex: 5,
          rotateY: -10,
        };
      case 1: // Right position
        return {
          x: 150,
          scale: 0.8,
          opacity: 1, // No opacity change for side images
          zIndex: 5,
          rotateY: 10,
        };
      default:
        return {
          x: 0,
          scale: 0.8,
          opacity: 0, // Only hide if more than 1 position away
          zIndex: 1,
          rotateY: 0,
        };
    }
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky content */}
      <div className="sticky top-0 h-[140vh] lg:h-[120vh] flex items-start justify-start bg-gray-50 overflow-hidden">
        <div className="w-full max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with entrance animation */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:tracking-tighter lg:text-[90px] font-[400] text-gray-400 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              }}
            >
              Get <span className="text-black font-normal">started</span>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-black max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.4,
              }}
            >
              Start your journey with bepay money in 3 simple steps!
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Mockups with entrance animation */}
            <motion.div
              className="relative -mt-60 md:-mt-10 h-[450px] sm:h-[550px] md:h-[650px] lg:h-[600px] w-full order-2 lg:order-1"
              initial={{ opacity: 0, x: -100 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.6,
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {steps.map((step, index) => {
                  const position = getImagePosition(index, activeStep);

                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      initial={
                        isInView
                          ? position
                          : { ...position, opacity: 0, scale: 0.5 }
                      }
                      animate={position}
                      transition={{
                        duration: isInView ? 0.8 : 1.2,
                        ease: [0.25, 0.1, 0.25, 1],
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                        delay: isInView ? 0 : 0.8 + index * 0.1,
                      }}
                      style={{
                        zIndex: position.zIndex,
                        perspective: "1000px",
                      }}
                    >
                      <motion.div
                        className="relative w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[380px] sm:h-[420px] md:h-[460px] lg:h-[500px] flex items-center justify-center"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={step.mockup || "/placeholder.svg"}
                            alt={`${step.title} mockup`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority={index === 0}
                            sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right side - Content with background numbers and entrance animation */}
            <motion.div
              className="relative order-1 lg:order-2 min-h-[400px]"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.5,
              }}
            >
              {/* Background Numbers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {steps.map(
                    (step, index) =>
                      index === activeStep && (
                        <motion.div
                          key={`bg-${index}`}
                          className="absolute top-20 md:-top-34 font-bold leading-none select-none"
                          initial={{
                            opacity: isInView ? 0 : 0,
                            scale: isInView ? 0.8 : 0.5,
                            y: isInView ? 50 : 100,
                          }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -50 }}
                          transition={{
                            duration: isInView ? 0.6 : 1,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: isInView ? 0 : 1,
                          }}
                          style={{
                            fontSize: "clamp(200px, 40vw, 800px)",
                            background:
                              "linear-gradient(180deg, #ECECEC 0%, rgba(236, 236, 236, 0.02) 112.87%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {step.number}
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-lg pt-4">
                <AnimatePresence mode="wait">
                  {steps.map(
                    (step, index) =>
                      index === activeStep && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{
                            opacity: isInView ? 0 : 0,
                            y: isInView ? 30 : 50,
                          }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{
                            duration: isInView ? 0.6 : 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: isInView ? 0.1 : 1.2,
                          }}
                        >
                          <motion.h3
                            className="text-2xl sm:text-3xl lg:text-[48px] font-[500] text-[#6A6A6A] mb-4 lg:mb-6"
                            initial={{
                              opacity: isInView ? 0 : 0,
                              x: isInView ? -20 : -40,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: isInView ? 0.7 : 0.8,
                              delay: isInView ? 0.2 : 1.3,
                            }}
                          >
                            {step.title}
                          </motion.h3>

                          {/* Corrected part: New flex container for number and description */}
                          <div className="flex items-start gap-4 mb-6">
                            <span className="text-black text-4xl font-bold font-sans">
                              {/* {step.number} */}
                            </span>
                            <motion.p
                              className="text-base sm:text-lg font-medium lg:text-[20px] text-[#6A6A6A] leading-relaxed pt-1"
                              initial={{
                                opacity: isInView ? 0 : 0,
                                x: isInView ? -20 : -40,
                              }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: isInView ? 0.7 : 0.8,
                                delay: isInView ? 0.3 : 1.4,
                              }}
                            >
                              {step.description}
                            </motion.p>
                          </div>

                          {/* CTA Button for last step */}
                          {step.hasCTA && (
                            <WaitlistTriggerButton>
                              <motion.div
                                initial={{
                                  opacity: isInView ? 0 : 0,
                                  y: isInView ? 20 : 40,
                                }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: isInView ? 0.6 : 0.8,
                                  delay: isInView ? 0.4 : 1.5,
                                }}
                              >
                                <button className="group relative inline-flex items-center cursor-pointer text-[12px] gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-black/90 hover:scale-105 hover:shadow-lg active:scale-95">
                                  <span>Get started</span>
                                  <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7 17L17 7M17 7H7M17 7V17"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </motion.div>
                            </WaitlistTriggerButton>
                          )}
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
