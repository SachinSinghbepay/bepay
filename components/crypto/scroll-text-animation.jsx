"use client";
import { useEffect, useRef, useState } from "react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

export default function ScrollTextAnimation() {
  const containerRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Refs for elements we animate
  const maximizeYourRef = useRef(null);
  const earningPotentialRef = useRef(null);
  const subDescriptionRef = useRef(null);
  const sectionRef = useRef(null); // For intersection observer
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // ANALYTICS: Track when the user actually views this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Scroll text animation viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  // Wait until fonts are loaded
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setTimeout(() => setFontsLoaded(true), 100);
    }
  }, []);

  // Scroll animation
  useEffect(() => {
    if (!fontsLoaded) return;
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
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

        // === Maximize Your Animation ===
        if (maximizeYourRef.current) {
          let style = {};
          if (progress < 0.2) {
            const entryProgress = progress / 0.2;
            const x = 50 - entryProgress * 50;
            const y = 50 - entryProgress * 50;
            style = {
              transform: `translate(${x}%, ${y}%)`,
              opacity: entryProgress,
            };
          } else if (progress < 0.35) {
            style = { transform: "translate(0%,0%)", opacity: 1 };
          } else if (progress < 0.42) {
            const exitStart = 0.35;
            const exitProgress = (progress - exitStart) / 0.07;
            style = {
              transform: `translate(${exitProgress * -120}%,0%)`,
              opacity: Math.max(0, 1 - exitProgress * 2),
            };
          } else {
            style = { transform: "translate(200%,0%)", opacity: 0 };
          }
          maximizeYourRef.current.style.transform = style.transform;
          maximizeYourRef.current.style.opacity = style.opacity;
        }

        // === Earning Potential Animation ===
        if (earningPotentialRef.current) {
          let style = {};
          if (progress > 0.85) {
            const exitProgress = (progress - 0.85) / 0.15;
            style = {
              transform: `translate(0%,${-exitProgress * 100}px)`,
              opacity: Math.max(0, 1 - exitProgress * 2),
            };
          } else if (progress < 0.32) {
            style = { transform: "translate(60%,60%)", opacity: 0 };
          } else if (progress < 0.45) {
            const phaseProgress = (progress - 0.32) / 0.13;
            const smoothProgress = 1 - Math.pow(1 - phaseProgress, 3);
            const x = 60 - smoothProgress * 60;
            const y = 60 - smoothProgress * 60;
            style = {
              transform: `translate(${x}%,${y}%)`,
              opacity: smoothProgress,
            };
          } else {
            style = { transform: "translate(0%,0%)", opacity: 1 };
          }
          earningPotentialRef.current.style.transform = style.transform;
          earningPotentialRef.current.style.opacity = style.opacity;
        }

        // === Sub Description Animation ===
        if (subDescriptionRef.current) {
          let style = {};
          if (progress > 0.85) {
            const exitProgress = (progress - 0.85) / 0.15;
            style = {
              transform: `translateY(${exitProgress * 50}px)`,
              opacity: Math.max(0, 1 - exitProgress * 2),
            };
          } else if (progress < 0.55) {
            style = { transform: "translateY(30px)", opacity: 0 };
          } else {
            const subProgress = (progress - 0.55) / 0.2;
            const animProgress = Math.min(1, subProgress);
            style = {
              transform: `translateY(${30 - animProgress * 30}px)`,
              opacity: animProgress,
            };
          }
          subDescriptionRef.current.style.transform = style.transform;
          subDescriptionRef.current.style.opacity = style.opacity;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fontsLoaded]);

  return (
    <div ref={sectionRef} className="bg-gray-50 hidden md:block">
      <div
        ref={containerRef}
        className="relative h-[200vh] md:h-[400vh] overflow-hidden"
      >
        <div
          className="min-h-screen sticky inset-0"
          style={{
            opacity: fontsLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {/* Maximize Your */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
            <span
              ref={maximizeYourRef}
              className="tracking-[-0.09em] text-4xl sm:text-6xl md:text-8xl whitespace-nowrap lg:text-[180px] font-normal text-[#C0C0C0]"
              style={{ visibility: fontsLoaded ? "visible" : "hidden" }}
            >
              Maximize Your
            </span>
          </div>

          {/* Earning Potential */}
          <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span
              ref={earningPotentialRef}
              className="tracking-[-0.09em] text-4xl sm:text-6xl pb-5 md:text-8xl lg:text-[160px] font-medium bg-gradient-to-r from-[#333333] via-[#999999] to-[#333333] bg-clip-text text-transparent mb-8"
              style={{ visibility: fontsLoaded ? "visible" : "hidden" }}
            >
              earning potential
            </span>

            {/* Sub-description */}
            <p
              ref={subDescriptionRef}
              className="max-w-7xl text-center px-4 text-lg sm:text-xl md:text-[20px] font-medium text-[#666666] leading-relaxed"
              style={{ visibility: fontsLoaded ? "visible" : "hidden" }}
            >
              Multiple ways to grow your wealth with{" "}
              <span className="text-[#333333]">industry-leading returns</span>{" "}
              and{" "}
              <span className="text-[#333333]">
                innovative earning opportunities
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
