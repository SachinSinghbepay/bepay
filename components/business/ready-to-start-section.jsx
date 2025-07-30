"use client";
import { useRef, useEffect, useState } from "react";
import { DollarSign, Clock, Headphones, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: "/images/business/icon1.png",
    title: "No",
    subtitle: "setup or monthly fees",
  },
  {
    id: 2,
    icon: "/images/business/icon2.png",
    title: "30-sec",
    subtitle: "settlements",
  },
  {
    id: 3,
    icon: "/images/business/icon3.png",
    title: "24/7",
    subtitle: "merchant support",
  },
];

export default function AnimatedCardsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered appearance: title, description, then cards
          setTimeout(() => setCardsVisible([true, false, false]), 800);
          setTimeout(() => setCardsVisible([true, true, false]), 1000);
          setTimeout(() => setCardsVisible([true, true, true]), 1200);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setScrollProgress(clampedProgress);

        // Different thresholds for mobile vs desktop
        if (isMobile) {
          // Mobile: Show new content when reaching the last card
          setShowNewContent(clampedProgress > 0.7);
        } else {
          // Desktop: Show new content after cards have merged
          setShowNewContent(clampedProgress > 0.6);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const getCardTransform = (index) => {
    const startThreshold = isMobile ? 0.3 : 0.2;
    const endThreshold = isMobile ? 0.8 : 0.5;

    if (scrollProgress < startThreshold) {
      return "translateX(0) translateY(0) scale(1)";
    }

    // Calculate merge progress
    const mergeProgress = Math.min(
      (scrollProgress - startThreshold) / (endThreshold - startThreshold),
      1
    );

    if (isMobile) {
      // Mobile: cards stay in place, no merging
      return "translateX(0) translateY(0) scale(1)";
    } else {
      // Desktop: cards merge to center
      if (index === 0) {
        // Left card moves right to center
        const moveX = mergeProgress * 100;
        return `translateX(${moveX}%) translateY(0) scale(1)`;
      } else if (index === 2) {
        // Right card moves left to center
        const moveX = mergeProgress * -100;
        return `translateX(${moveX}%) translateY(0) scale(1)`;
      } else {
        // Center card stays in place
        return "translateX(0) translateY(0) scale(1)";
      }
    }
  };

  const getCardZIndex = (index) => {
    const startThreshold = isMobile ? 0.3 : 0.2;
    if (scrollProgress > startThreshold) {
      // Center card on top during merge, others behind
      if (index === 1) return 30;
      return 10;
    }
    return 10;
  };

  const getCardOpacity = (index) => {
    const startThreshold = isMobile ? 0.3 : 0.2;
    const fadeThreshold = isMobile ? 0.7 : 0.45;

    if (scrollProgress < startThreshold) return 1;

    if (isMobile) {
      // Mobile: all cards stay visible
      return 1;
    } else {
      // Desktop: during merge, fade out side cards but keep center card visible
      if (scrollProgress > fadeThreshold) {
        return index === 1 ? 1 : 0;
      }
      return 1;
    }
  };

  // Get original content opacity for center card
  const getOriginalContentOpacity = (index) => {
    if (isMobile) {
      // Mobile: hide original content when new content appears
      return index === 2 && showNewContent ? 0 : 1;
    } else {
      // Desktop: hide center card original content when new content appears
      return index === 1 && showNewContent ? 0 : 1;
    }
  };

  // Get new content opacity
  const getNewContentOpacity = () => {
    return showNewContent ? 1 : 0;
  };

  return (
    <div ref={containerRef} className="min-h-[200vh] py-11 bg-gray-50">
      <section className="sticky top-0 lg:h-screen flex items-center justify-center py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Title - appears first */}
          <div className="mb-16">
            <h2
              className={`text-3xl md:text-4xl  lg:text-[70px] font-[400] transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <span className="text-gray-400">Ready to </span>
              <span className="text-gray-900">Start?</span>
            </h2>
            {/* Description - appears second */}
            <p
              className={`text-base md:text-lg lg:text-xl text-[#333333] font-medium transition-all duration-1000 delay-300 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Join{" "}
              <span className="bg-[#F9F9F9] text-[#333333] font-medium drop-shadow-lg rounded-full px-3 py-1">
                1,000+ businesses
              </span>{" "}
              already growing with crypto payments.
            </p>
          </div>

          {/* Cards Container */}
          <div className="relative max-w-7xl pb-10 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 h-full relative">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`relative transition-all duration-1000 ease-out ${
                    cardsVisible[index]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }`}
                  style={{
                    transform: getCardTransform(index),
                    zIndex: getCardZIndex(index),
                    opacity: getCardOpacity(index),
                    transitionDuration: "800ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div
                    className="w-full lg:w-[399px] max-w-[399px] h-[200px] md:h-[500px] p-4 md:p-6 lg:p-8 border border-white/10 flex flex-col justify-center mx-auto relative overflow-hidden rounded-3xl"
                    style={{
                      boxShadow: "50px 50px 60px 0px #0000000F",
                      background: "#FFFFFF",
                    }}
                  >
                    {/* Background Icon - positioned at top right */}
                    <div
                      className="absolute top-0 right-0 w-36 h-36 text-gray-300 z-0 transition-all duration-700 ease-in-out"
                      style={{
                        opacity: getOriginalContentOpacity(index) * 0.8,
                        transform: `scale(${
                          getOriginalContentOpacity(index) === 0 ? 0.75 : 1
                        })`,
                      }}
                    >
                      <Image
                        src={feature.icon}
                        height={200}
                        width={200}
                        alt="icon"
                        className="object-cover"
                      />
                    </div>

                    {/* Original Content - positioned at bottom left */}
                    <div
                      className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 text-left z-10 transition-all duration-700 ease-in-out"
                      style={{
                        opacity: getOriginalContentOpacity(index),
                        transform: `scale(${
                          getOriginalContentOpacity(index) === 0 ? 0.95 : 1
                        }) translateY(${
                          getOriginalContentOpacity(index) === 0 ? "4px" : "0px"
                        })`,
                      }}
                    >
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight"
                        style={{ color: "#333333" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-lg md:text-xl lg:text-2xl leading-relaxed"
                        style={{ color: "#333333" }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* New Content - Show on last card (index 2) in mobile, center card (index 1) in desktop */}
                    {((isMobile && index === 2) ||
                      (!isMobile && index === 1)) && (
                      <div
                        className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-center text-center z-20 transition-all duration-700 ease-in-out"
                        style={{
                          opacity: getNewContentOpacity(),
                          transform: `scale(${
                            getNewContentOpacity() === 0 ? 0.95 : 1
                          }) translateY(${
                            getNewContentOpacity() === 0 ? "4px" : "0px"
                          })`,
                        }}
                      >
                        <h3
                          className="text-md md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4"
                          style={{ color: "#333333" }}
                        >
                          The future of payments is here!
                        </h3>
                        <p
                          className="text-[12px] md:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed"
                          style={{ color: "#333333" }}
                        >
                          Start accepting crypto payments in minutes. Reach
                          global customers, boost your revenue, and manage your
                          store — all in one powerful dashboard.
                        </p>
                        <button className="bg-black cursor-pointer text-[12px]  whitespace-nowrap text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-xs  lg:text-[12px] hover:bg-black/90 transition-colors duration-300 flex items-center gap-2 mx-auto">
                          Become a merchant on bepay
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
