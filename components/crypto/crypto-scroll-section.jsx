"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Create your Wallet",
    description:
      "Create your wallet within in one tap.  Complete your KYC to get your virtual crypto debit card and Swiss IBAN. (Takes 5 min or less)",
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
  },
];

export default function CryptoScrollSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

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

      // Determine which step should be active
      let newActiveStep = 0;
      if (progress > 0.33 && progress <= 0.66) {
        newActiveStep = 1;
      } else if (progress > 0.66) {
        newActiveStep = 2;
      }

      setActiveStep(newActiveStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky content */}
      <div className="sticky top-0 h-[140vh] lg:h-[120vh] flex items-start justify-start bg-gray-50 overflow-hidden">
        <div className="w-full max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-400 mb-4">
              Get <span className="text-black font-normal">started</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
              Start your journey with bepay money in 3 simple steps!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Mockups */}
            <div className="relative -mt-40 md:mt-0 h-[450px] sm:h-[550px] md:h-[650px] lg:h-[600px] w-full order-2 lg:order-1">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPrev = index < activeStep;
                const isNext = index > activeStep;

                let transform = "translateX(0%) scale(1)";
                let zIndex = 1;
                let opacity = 0.3;

                if (isActive) {
                  transform = "translateX(0%) scale(1)";
                  zIndex = 10;
                  opacity = 1;
                } else if (isPrev) {
                  transform = "translateX(-30%) scale(0.8)";
                  zIndex = 5;
                  opacity = 1;
                } else if (isNext) {
                  transform = "translateX(30%) scale(0.8)";
                  zIndex = 2;
                  opacity = 1;
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                      <div className="relative w-full h-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-none">
                        <Image
                          src={step.mockup || "/placeholder.svg"}
                          alt={`${step.title} mockup`}
                          fill
                          className="object-contain"
                          priority={index === 0}
                          sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, (max-width: 1024px) 400px, 500px"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side - Content with background numbers */}
            <div className="relative order-1 lg:order-2 min-h-[400px]">
              {/* Background Numbers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {steps.map((step, index) => (
                  <div
                    key={`bg-${index}`}
                    className={`absolute transition-all duration-700 ease-out font-bold leading-none select-none ${
                      index === activeStep
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-8"
                    }`}
                    style={{
                      fontSize: "clamp(200px, 25vw, 800px)",
                      background:
                        "linear-gradient(180deg, #ECECEC 0%, rgba(236, 236, 236, 0.02) 112.87%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.number}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-lg">
                {steps.map((step, index) => (
                  <div
                    key={`content-${index}`}
                    className={`transition-all duration-700 ease-out ${
                      index === activeStep
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12 absolute inset-0"
                    }`}
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-[48px] font-[500] text-gray-600 mb-4 lg:mb-6">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-[20px] text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
