"use client";
import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Users } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";
import Image from "next/image";
import WaitlistTriggerButton from "./waitlist-trigger-button";

const steps = [
  {
    number: 1,
    icon: Smartphone,
    text: "Download bepay App",
  },
  {
    number: 2,
    icon: "/icons/solar.png",
    text: "Quick KYC, instant approval",
  },
  {
    number: 3,
    icon: "/icons/card.png",
    text: "Make your 1st payment - rent, groceries etc.",
  },
  {
    number: 4,
    icon: "/icons/shopping.png",
    text: "Earn up to 7% instant cashback & rewards",
  },
  {
    number: 5,
    icon: "/icons/face.png",
    text: "Unlock financial freedom while you live your life",
  },
];

const HowItWorksSection = forwardRef(function HowItWorksSection(props, ref) {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalScrollHeight, setTotalScrollHeight] = useState(0);
  const localRef = useRef(null);
  const sectionRef = ref || localRef;
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const handleJoinUsersClick = () => {
    AnalyticsService.sendEvent("HowItWorks CTA Clicked: Join 50,000+");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI HowItWorks-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasTrackedView, sectionRef]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const sectionTop = sectionRef.current.offsetTop;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const scrollProgress = scrollY - sectionTop + viewportHeight / 2;
    const scrollPerStep = viewportHeight;
    let newStep = Math.floor(scrollProgress / scrollPerStep) + 1;
    newStep = Math.max(1, Math.min(steps.length, newStep));

    setCurrentStep((prevStep) => (newStep !== prevStep ? newStep : prevStep));
  }, [sectionRef]);

  useEffect(() => {
    const updateScrollHeight = () => {
      if (typeof window !== "undefined") {
        setTotalScrollHeight(steps.length * window.innerHeight);
      }
    };

    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", updateScrollHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const activeStepContent =
    steps.find((step) => step.number === currentStep) || steps[0];

  const IconComponent = currentStep === 1 ? activeStepContent.icon : null;
  const imageSrc = currentStep !== 1 ? activeStepContent.icon : null;

  const contentBoxStyle = {
    border: "1px #ffffff transparent",
    borderImage:
      "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%) 1",
    boxShadow:
      "10px 10px 20px 0px #0000001A inset, -10px -10px 30px 0px #FFFFFF inset, -10px -10px 15px 0px #FFFFFF inset",
  };

  const step4NoWrapClass =
    currentStep === 3 || currentStep === 5 ? "whitespace-nowrap" : "whitespace-normal";

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full"
      style={{ height: `${totalScrollHeight}px` }}
    >
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen px-4 py-12">
        {/* Header section with title and subheading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-[140px] font-[400] tracking-[-0.08em] mb-10 md:leading-[130px] leading-[1.2]">
            <span style={{ color: "#C0C0C0" }}>How </span>
            <span className="text-[#333333]">bepay </span>
            <span className="md:hidden block">
              <span className="text-[#333333]">money works</span>
            </span>
            <span className="hidden md:inline text-[#333333]">works</span>
          </h1>
          {/* MOBILE: mb-24 pushes this down, DESKTOP: md:mb-0 removes margin */}
          <p
            className="text-[20px] tracking-[0.01%] font-medium mt-29 mb-2 md:mb-0"
            style={{ color: "#6A6A6A" }}
          >
            Start in 30 Seconds. Earn Forever.
          </p>
        </div>
        
        {/* MOBILE: -mt-16 pulls content up, DESKTOP: md:mt-0 resets to normal */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-7xl -mt-16 md:mt-0">
          {/* Animated step number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="text-[220px] md:text-[220px] font-bold -mb-25 md:mb-0"
              style={{
                background:
                  "linear-gradient(167.94deg, #E8E8E8 13.86%, rgba(232, 232, 232, 0.1) 101.57%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {currentStep}
            </motion.div>
          </AnimatePresence>

          {/* Content box with icon and text */}
          <div
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
                {/* MOBILE: mr-2 reduces gap, DESKTOP: md:mr-4 keeps original gap */}
                {IconComponent && (
                  <IconComponent
                    className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-4"
                    style={{ color: "#333333" }}
                    aria-hidden="true"
                  />
                )}
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={`Step ${currentStep} icon`}
                    width={40}
                    height={40}
                    className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-4"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`font-semibold text-[12.31px] md:text-[40px] md:font-normal ${step4NoWrapClass}`}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                    color: "#333333",
                    lineHeight: currentStep === 5 ? "1.5" : "40.02px",
                  }}
                >
                  {activeStepContent.text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Button - appears on step 5 */}
          <AnimatePresence>
            {currentStep === 5 && (
             <WaitlistTriggerButton
  triggerSource="'Join 50,000+ smart earners' button"
  buttonLocation="how_it_works_section"
>
  <motion.button
    onClick={handleJoinUsersClick}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="
      mt-12 bg-black cursor-pointer whitespace-nowrap text-white 
      flex items-center justify-center gap-2 rounded-full 
      text-[12px] font-medium px-6 h-[48px] hover:bg-gray-800 transition-colors
      sm:text-[14px] sm:w-[270px] sm:h-[56px] sm:px-6 sm:py-4
    "
  >
    <Users className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
    <span>Join 50,000+ smart earners</span>
  </motion.button>
</WaitlistTriggerButton>

            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

export default HowItWorksSection;