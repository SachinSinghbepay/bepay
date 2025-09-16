"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service


const steps = [
  {
    number: "1",
    title: "Create your Wallet",
    description: (
      <>
        Create your wallet within in{" "}
        <span className="text-black font-semibold">one tap</span>. Your wallet
        is ready to receive and send! Complete your KYC to get your virtual
        crypto debit card and Swiss IBAN. (Takes 5 min or less)
      </>
    ),
    mockup: "/images/crypto/mocup1.png",
    lineImage: { src: "/images/crypto/line.png", width: 5, height: 3 },
    additionalImage: {
      src: "/first_card_button.png",
      width: 350,
      height: 30,
      offsetX: 17,
      offsetY: 6,
    },
    headingOffsetMobile: -6,
  },
  {
    number: "2",
    title: "Fund your wallet",
    description:
      "Add crypto or fiat to your self-custody wallet. Your keys, your crypto!",
    mockup: "/images/crypto/mocup3.png",
    lineImage: { src: "/images/crypto/line.png", width: 7, height: 3 },
    additionalImage: {
      src: "/receive.png",
      width: 290,
      height: 50,
      offsetX: 15,
      offsetY: 10,
    },
    headingOffsetMobile: -1,
  },
  {
    number: "3",
    title: "Start Earning & Spending",
    description:
      "Use your virtual crypto debit card, earn yield, and access all platform features. Start earning and spending immediately!",
    mockup: "/images/crypto/mocup2.png",
    hasCTA: true,
    lineImage: { src: "/images/crypto/line.png", width: 3, height: 5 },
    additionalImage: {
      src: "/third_card_bepay_card.png",
      width: 260,
      height: 100,
      offsetX: 10,
      offsetY: 0,
    },
    headingOffsetMobile: -2,
  },
];

export default function CryptoScrollSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const prevActiveStepRef = useRef(0);
  //const cryptoScrollSectionViewedRef = useRef(false); // ANALYTICS: Ref to track if the section has been viewed
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Crypto Scroll section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.1 } // Trigger when 30% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleStartEarningClick = () => {
    AnalyticsService.sendEvent("'Get Started' button clicked");
  };

  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

    

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const inView =
        rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsInView(inView);

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

      const progress = scrolled / totalScrollDistance;
      let newActiveStep = 0;
      if (progress > 0.25 && progress <= 0.65) {
        newActiveStep = 1;
      } else if (progress > 0.65) {
        newActiveStep = 2;
      }
      prevActiveStepRef.current = activeStep;
      setActiveStep(newActiveStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStep]);

  const getImagePosition = (imageIndex, activeIndex) => {
    let relativePosition = imageIndex - activeIndex;

    if (relativePosition < -1) {
      relativePosition += 3;
    } else if (relativePosition > 1) {
      relativePosition -= 3;
    }

    switch (relativePosition) {
      case 0:
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 10,
          rotateY: 0,
        };
      case -1:
        return {
          x: -150,
          scale: 0.8,
          opacity: 1,
          zIndex: 5,
          rotateY: -10,
        };
      case 1:
        return {
          x: 150,
          scale: 0.8,
          opacity: 1,
          zIndex: 5,
          rotateY: 10,
        };
      default:
        return {
          x: 0,
          scale: 0.8,
          opacity: 0,
          zIndex: 1,
          rotateY: 0,
        };
    }
  };

  // Mobile version JSX
  if (isMobile) {
    const isScrollingDown = activeStep > prevActiveStepRef.current;

    return (
      <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
        {/* Mobile Sticky content */}
        <div className="sticky top-0 h-screen flex items-start justify-center pt-8 bg-gray-50 overflow-hidden">
          <div className="w-full max-w-sm mx-auto px-4">
            {/* Mobile Header */}
            <motion.div
              className="flex flex-col items-start text-left mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              <motion.h2
                className="text-3xl font-medium text-gray-400 mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.3,
                }}
              >
                Get <span className="text-black font-medium">started</span>
              </motion.h2>
              <motion.p
                className="text-base text-[#6A6A6A] mt-1"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.4,
                }}
              >
                Start your journey with bepay money in 3 simple steps!
              </motion.p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.5,
                }}
              >
                <WaitlistTriggerButton triggerSource="'Crypto scroll section' button">
                  <button onClick={handleStartEarningClick}  className="bg-black cursor-pointer whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                    <Image
                      src="/vector.svg"
                      alt="Get Started Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span>Get Started</span>
                  </button>
                </WaitlistTriggerButton>
              </motion.div>
            </motion.div>

            {/* Mobile Content Card */}
            <motion.div
              className="relative flex flex-col justify-center min-h-[400px]"
              initial={{ opacity: 0, y: 100 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
              }
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.5,
              }}
            >
              {/* Mobile Background Numbers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  {steps.map(
                    (step, index) =>
                      index === activeStep && (
                        <motion.div
                          key={`bg-${index}`}
                          className="absolute font-bold leading-none select-none"
                          initial={{ opacity: 0, scale: 0.8, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 50 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          style={{
                            fontSize: "clamp(500px, 40vw, 400px)",
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

              {/* Mobile Content */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {steps.map(
                    (step, index) =>
                      index === activeStep && (
                        <motion.div
                          key={`content-${index}`}
                          className="text-center pt-8"
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.05,
                          }}
                        >
                          <motion.h3
                            className="text-xl font-bold text-black mb-4"
                            style={{
                              transform: `translateY(${
                                step.headingOffsetMobile || 0
                              }px)`,
                            }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.1,
                            }}
                          >
                            {step.title}
                          </motion.h3>

                          <motion.p
                            className="text-sm font-medium text-[#6A6A6A] leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.15,
                            }}
                          >
                            {step.description}
                          </motion.p>

                          {step.lineImage && (
                            <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.2,
                              }}
                              className="mb-6 flex justify-center"
                            >
                              <Image
                                src={step.lineImage.src}
                                alt="Line separator"
                                width={step.lineImage.width}
                                height={step.lineImage.height}
                                className="object-contain"
                              />
                            </motion.div>
                          )}

                          {step.additionalImage && (
                            <AnimatePresence>
                              {index === activeStep && (
                                <motion.div
                                  key={`additional-image-${index}`}
                                  initial={
                                    isScrollingDown
                                      ? { opacity: 0, x: 300 }
                                      : { opacity: 0, x: -300 }
                                  }
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={
                                    isScrollingDown
                                      ? { opacity: 0, x: -300 }
                                      : { opacity: 0, x: 300 }
                                  }
                                  transition={{
                                    duration: 0.4,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    delay: 0.1,
                                  }}
                                  className="relative flex justify-center"
                                >
                                  <div
                                    className="absolute"
                                    style={{
                                      transform: `translate(${
                                        step.additionalImage.offsetX || 0
                                      }px, ${
                                        step.additionalImage.offsetY || 0
                                      }px)`,
                                    }}
                                  >
                                    <Image
                                      src={step.additionalImage.src}
                                      alt={`${step.title} additional icon`}
                                      width={step.additionalImage.width}
                                      height={step.additionalImage.height}
                                      className="object-contain"
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
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
    );
  }

  // Desktop version JSX
  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-[140vh] lg:h-[120vh] flex items-start justify-start bg-gray-50 overflow-hidden">
        <div className="w-full max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-left md:text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:tracking-tighter lg:text-7xl font-[400] text-gray-400 mb-4"
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
              className="text-sm sm:text-base text-[#6A6A6A] max-w-4xl mx-auto"
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

            <motion.div
              className="relative order-1 lg:order-2 min-h-[400px] flex items-center justify-center"
              initial={{ opacity: 0, x: 100 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
              }
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.5,
              }}
            >
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

              <div className="relative z-10 max-w-lg">
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

                          <div className="flex items-start gap-4 mb-6">
                            <span className="text-black text-4xl font-bold font-sans"></span>
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

                          {step.hasCTA && (
                            <WaitlistTriggerButton triggerSource="'Crypto scroll section' button">
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
                                <button  
                                onClick={handleStartEarningClick} 
                                className="group relative inline-flex items-center cursor-pointer text-[12px] gap-2 bg-black text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-black/90 hover:scale-105 hover:shadow-lg active:scale-95">
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