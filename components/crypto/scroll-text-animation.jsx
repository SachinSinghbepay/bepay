"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollTextAnimation() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollStart = rect.top + window.scrollY - windowHeight;
      const scrollEnd = rect.top + window.scrollY + containerHeight;
      const currentScroll = window.scrollY;

      const progress = Math.max(
        0,
        Math.min(1, (currentScroll - scrollStart) / (scrollEnd - scrollStart))
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // "Maximize Your" animation - comes from bottom-right, exits instantly to right
  const getMaximizeYourAnimation = () => {
    // Phase 1: Entry (0% - 20% scroll)
    if (scrollProgress < 0.2) {
      const entryProgress = scrollProgress / 0.2;
      const x = 50 - entryProgress * 50; // From right (50%) to center (0%)
      const y = 50 - entryProgress * 50; // From bottom (50%) to center (0%)
      
      return {
        transform: `translate(${x}%, ${y}%)`,
        opacity: entryProgress,
      };
    }

    // Phase 2: Hold position (20% - 35% scroll)
    if (scrollProgress < 0.35) {
      return {
        transform: `translate(0%, 0%)`,
        opacity: 1,
      };
    }

    // Phase 3: Instant exit to right (35% - 40% scroll)
    if (scrollProgress < 0.4) {
      const exitStart = 0.35;
      const exitProgress = (scrollProgress - exitStart) / 0.05;
      
      return {
        transform: `translate(${exitProgress * -100}%, 0%)`, // Instant move to right
        opacity: Math.max(1, 1 - exitProgress * 3), // Quick fade
      };
    }

    // Completely hidden after 40%
    return {
      transform: `translate(200%, 0%)`,
      opacity: 0,
    };
  };

  // "earning potential" animation - appears smoothly from bottom-right after "Maximize Your" exits
  const getEarningPotentialAnimation = () => {
    // Final exit phase - everything disappears after 85% scroll
    if (scrollProgress > 0.85) {
      const exitProgress = (scrollProgress - 0.85) / 0.15;
      return {
        transform: `translate(0%, ${-exitProgress * 100}px)`,
        opacity: Math.max(0, 1 - exitProgress * 2),
      };
    }

    // Start appearing after "Maximize Your" starts exiting
    const phaseStart = 0.38; // Slightly overlap with previous exit
    const phaseEnd = 0.7;

    if (scrollProgress < phaseStart) {
      return {
        transform: `translate(60%, 60%)`, // Start from bottom-right
        opacity: 0,
      };
    }

    if (scrollProgress < phaseEnd) {
      const phaseProgress = (scrollProgress - phaseStart) / (phaseEnd - phaseStart);
      const smoothProgress = 1 - Math.pow(1 - phaseProgress, 3); // Ease-out cubic
      
      const x = 60 - smoothProgress * 60; // From right (60%) to center (0%)
      const y = 60 - smoothProgress * 60; // From bottom (60%) to center (0%)
      
      return {
        transform: `translate(${x}%, ${y}%)`,
        opacity: smoothProgress,
      };
    }

    // Hold position until final exit
    return {
      transform: `translate(0%, 0%)`,
      opacity: 1,
    };
  };

  // Sub-description animation - appears after "earning potential" is settled
  const getSubDescriptionAnimation = () => {
    // Final exit phase - disappears after 85% scroll
    if (scrollProgress > 0.85) {
      const exitProgress = (scrollProgress - 0.85) / 0.15;
      return {
        transform: `translateY(${exitProgress * 50}px)`,
        opacity: Math.max(0, 1 - exitProgress * 2),
      };
    }

    const subPhaseStart = 0.6; // Starts after earning potential is mostly settled

    if (scrollProgress < subPhaseStart) {
      return {
        transform: `translateY(30px)`,
        opacity: 0,
      };
    }

    const subProgress = (scrollProgress - subPhaseStart) / 0.2;
    const animProgress = Math.min(1, subProgress);

    return {
      transform: `translateY(${30 - animProgress * 30}px)`,
      opacity: animProgress,
    };
  };

  // Get animation states
  const maximizeYourAnimation = getMaximizeYourAnimation();
  const earningPotentialAnimation = getEarningPotentialAnimation();
  const subDescriptionAnimation = getSubDescriptionAnimation();

  return (
    <div className="bg-gray-50 hidden md:block">
      {/* Animation container */}
      <div
        ref={containerRef}
        className="relative h-[200vh] md:h-[400vh] overflow-hidden"
      >
        <div className="min-h-screen sticky inset-0">
          {/* First phase: "Maximize Your" - from bottom-right */}
          <div className="fixed z-10 inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-4">
              <span
                className="text-4xl sm:text-6xl md:text-8xl whitespace-nowrap lg:text-[180px] font-[400] text-[#C0C0C0] inline-block"
                style={{
                  transform: maximizeYourAnimation.transform,
                  opacity: maximizeYourAnimation.opacity,
                  transition: "none",
                }}
              >
                Maximize Your
              </span>
            </div>
          </div>

          {/* Second phase: "earning potential" - smooth entry from bottom-right */}
          <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="flex items-center gap-2 sm:gap-4 mb-8">
              <span
                className="text-4xl sm:text-6xl pb-5 md:text-8xl lg:text-[160px] font-500 bg-gradient-to-r from-[#333333] via-[#999999] to-[#333333] bg-clip-text text-transparent inline-block"
                style={{
                  transform: earningPotentialAnimation.transform,
                  opacity: earningPotentialAnimation.opacity,
                  transition: "none",
                }}
              >
                earning potential
              </span>
            </div>

            {/* Sub-description */}
            <div
              className="max-w-7xl text-center px-4"
              style={{
                transform: subDescriptionAnimation.transform,
                opacity: subDescriptionAnimation.opacity,
                transition: "none",
              }}
            >
              <p className="text-lg sm:text-xl md:text-[20px] font-[500] text-[#666666]  leading-relaxed">
                Multiple ways to grow your wealth with{" "}
                <span className=" text-[#333333]">
                  industry-leading returns
                </span>{" "}
                and{" "}
                <span className=" text-[#333333]">
                  innovative earning opportunities
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}