"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";
import GetStartedPopup from "@/components/popups/getStartedPopup";

// --- Card Component (Optimized with Smooth Animations) ---
const Card = ({ title, description, visual, index, isActive }) => {
  const isClient = typeof window !== "undefined";
  const isMobile = isClient ? window.innerWidth < 768 : false;

  const titleStyle = isMobile
    ? {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 600,
        fontSize: "28.25px",
        lineHeight: "26.83px",
        letterSpacing: "-0.04em",
        color: "#333333",
        textAlign: "left",
      }
    : {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 600,
        fontSize: "30px",
        lineHeight: "32px",
        letterSpacing: "-0.04em",
        color: "#333333",
        textAlign: "left",
      };

  const descriptionStyle = isMobile
    ? {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "14.12px",
        lineHeight: "16.95px",
        letterSpacing: "-0.02em",
        color: "#6A6A6A",
        textAlign: "left",
      }
    : {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        letterSpacing: "-0.02em",
        color: "#6A6A6A",
        textAlign: "left",
      };

  return (
    <div
      className="flex-shrink-0 w-[90vw] md:w-[400px] h-[450px] bg-white p-6 flex flex-col justify-end relative overflow-visible transition-all duration-700 ease-out cursor-default card-container"
      style={{
        borderRadius: "40px",
        boxShadow:
          "60px 20px 30px -20px rgba(0, 0, 0, 0.05), 80px 30px 120px -90px rgba(0, 0, 0, 0.02)",
        zIndex: isClient && window.innerWidth < 768 ? "auto" : 100 - index,
        scrollSnapAlign: "start",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        opacity: isActive ? 1 : 0.85,
      }}
    >
      <div className="absolute top-6 left-6  opacity-75 w-[200px] h-[200px] flex items-center justify-center card-visual">
        {visual}
      </div>
      <div className="z-10 card-content">
        <h3 className="mb-1 card-title" style={titleStyle}>
          {title}
        </h3>
        <p className="mt-5 card-description" style={descriptionStyle}>
          {description}
        </p>
      </div>
    </div>
  );
};

const PaymentSystemUI = () => {
  const scrollerRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollIntervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageProps = {
    width: 200,
    height: 200,
    className: "max-w-full h-auto card-image",
    priority: true,
  };

  const cardsData = [
    {
      title: (
        <>
          Multi-currency
          <br />
          Bank Accounts
        </>
      ),
      description:
        "Look like a local business, anywhere across US, EU, UAE, CHINA, UK & more",
      visual: (
        <Image src="/p1.png" alt="Multi-currency visual" {...imageProps} />
      ),
    },
    {
      title: (
        <>
          Free
          <br />
          settlement
        </>
      ),
      description:
        "Send and receive money worldwide without paying any settlement fees.",
      visual: <Image src="/p2.png" alt="FX Rate visual" {...imageProps} />,
    },
    {
      title: (
        <>
          Near Real-time
          <br />
          Settlement
        </>
      ),
      description: "Achieve near real-time payment in key markets.",
      visual: <Image src="/p3.png" alt="Settlement visual" {...imageProps} />,
    },
    {
      title: (
        <>
          Automated
          <br />
          Compliance
        </>
      ),
      description:
        "Get instant FIRA/FIRC or digital compliance certificates automatically upon settlement.",
      visual: <Image src="/p4.png" alt="Compliance visual" {...imageProps} />,
    },
    {
      title: (
        <>
          Smart Global
          <br />
          Dashboard
        </>
      ),
      description:
        "Track payments, invoices, payouts, FX, treasury, and analytics—all from one powerful interface.",
      visual: <Image src="/p5.png" alt="Dashboard visual" {...imageProps} />,
    },
  ];

  const updateActiveCard = () => {
    if (!scrollerRef.current) return;

    const scrollLeft = scrollerRef.current.scrollLeft;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardWidth = isMobile ? scrollerRef.current.offsetWidth * 0.9 : 400;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, cardsData.length - 1));
  };

  const handleScroll = (direction) => {
    if (!scrollerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    let scrollAmount;

    if (isMobile) {
      const cardWidth = scrollerRef.current.offsetWidth * 0.9;
      const gap = 16;
      const totalScroll = cardWidth + gap;
      scrollAmount = totalScroll * (direction === "left" ? -1 : 1);
    } else {
      const cardWidth = 400;
      const gap = 16;
      scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    }

    // Use smooth scrolling with better performance
    const start = scrollerRef.current.scrollLeft;
    const target = start + scrollAmount;
    const duration = 600; // ms
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      
      scrollerRef.current.scrollLeft = start + (scrollAmount * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      startAutoScroll();
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (!isPaused && scrollerRef.current) {
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        let scrollAmount;

        if (isMobile) {
          const cardWidth = scrollerRef.current.offsetWidth * 0.9;
          const gap = 16;
          scrollAmount = cardWidth + gap;
        } else {
          const cardWidth = 400;
          const gap = 16;
          scrollAmount = cardWidth + gap;
        }

        const maxScroll =
          scrollerRef.current.scrollWidth - scrollerRef.current.clientWidth;
        const currentScroll = scrollerRef.current.scrollLeft;
        
        let targetScroll;
        if (currentScroll >= maxScroll - 10) {
            targetScroll = 0;
        } else {
            targetScroll = currentScroll + scrollAmount;
        }

        // Custom smooth scroll
        const start = currentScroll;
        const change = targetScroll - start;
        const duration = 800; // Slightly slower for auto-scroll to feel more premium
        const startTime = performance.now();
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            
            if (scrollerRef.current) {
                scrollerRef.current.scrollLeft = start + (change * eased);
            }

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        requestAnimationFrame(animateScroll);
      }
    }, 4000);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
            
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            
            @media (max-height: 1000px) {
                .PaymentSystemUI {
                    min-height: 100vh;
                }
            }
            
            /* Smooth card animations */
            .card-container {
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .card-visual {
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .card-container:hover .card-visual,
            .card-container.active .card-visual {
                transform: translateY(-8px) scale(1.05);
            }
            
            .card-image {
                transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .card-container:hover .card-image,
            .card-container.active .card-image {
                transform: rotate(3deg) scale(1.08);
            }
            
            .card-title {
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .card-container:hover .card-title,
            .card-container.active .card-title {
                transform: translateX(4px);
                color: #000000;
            }
            
            .card-description {
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .card-container:hover .card-description,
            .card-container.active .card-description {
                transform: translateX(4px);
                color: #333333;
            }
            
            .card-content {
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            /* Smooth scroll behavior */
            .hide-scrollbar {
                scroll-behavior: smooth;
            }
            
            /* Entry animations */
            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-in {
                animation-fill-mode: both;
            }
            
            .fade-in {
                animation: fadeIn 0.8s ease-out;
            }
            
            .slide-in-from-bottom-4 {
                animation: slideInFromBottom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .slide-in-from-top-4 {
                animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .slide-in-from-left-4 {
                animation: slideInFromLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .scale-in {
                animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .duration-500 {
                animation-duration: 0.5s;
            }
            
            .duration-700 {
                animation-duration: 0.7s;
            }
            
            .delay-100 {
                animation-delay: 0.1s;
            }
            
            .delay-200 {
                animation-delay: 0.2s;
            }
            
            .delay-300 {
                animation-delay: 0.3s;
            }
        `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isPaused, startAutoScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener("scroll", updateActiveCard);
      return () => scroller.removeEventListener("scroll", updateActiveCard);
    }
  }, [updateActiveCard]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent("Payment System IGPS viewed");
          } catch (e) {}
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasTrackedView]);

  return (
    <div
      ref={sectionRef}
      className="font-sans py-12 bg-gray-50 text-center flex flex-col justify-center PaymentSystemUI"
    >
      <h1
        className="
                    text-gray-900 mb-3 capitalize font-montserrat font-semibold text-center
                    text-[30px] leading-[30px] tracking-[-0.04em]
                    md:text-[54px] md:leading-[100%] md:tracking-[-0.06em]
                "
      >
        The Intelligent{" "}
        <span className="text-[#6A6A6A]">Global Payment System</span>
      </h1>

      <h2
        className="text-gray-600 my-3 inline-block md:text-[24px]  text-[14px] "
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "-2%",
          color: "#080808",
        }}
      >
        Zero Fees. Global Infrastructure. Local Experience.
      </h2>

      <div className="w-full px-4 md:px-14">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
          <div
            className="text-gray-600 lg:whitespace-nowrap mt-7 flex md:flex-row flex-col md:items-center items-center gap-2.5 max-w-2xl mx-auto md:mx-0 text-center md:text-left flex-1"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "13px"
                  : "20px",
              lineHeight: "20px",
              letterSpacing: "-2%",
            }}
          >
            <span className="hidden md:block w-2.5 h-2.5 bg-[#0E7630] rounded-full flex-shrink-0 self-center"></span>
            <span className="max-w-3xl">
              Connecting your business to the world&apos;s most important
              corridors through a single, Intelligent Payment Network.
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 mt-0 md:mt-7 self-end md:self-auto">
            <button
              onClick={() => handleScroll("left")}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                activeIndex === 0
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-40"
                  : "border-gray-300 hover:bg-gray-100 active:bg-gray-200"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-5 h-5 ${activeIndex === 0 ? "text-gray-400" : "text-gray-600"}`} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={activeIndex === cardsData.length - 1}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                activeIndex === cardsData.length - 1
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-40"
                  : "border-gray-300 hover:bg-gray-100 active:bg-gray-200"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className={`w-5 h-5 ${activeIndex === cardsData.length - 1 ? "text-gray-400" : "text-gray-600"}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center py-5 overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex flex-row gap-4 overflow-x-auto hide-scrollbar py-5 px-5 items-center w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "md:ml-11"
                  : index === cardsData.length - 1
                  ? "md:mr-11"
                  : ""
              }
            >
              <Card
                index={index}
                title={card.title}
                description={card.description}
                visual={card.visual}
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="md:text-xl text-[16px] font-semibold md:font-semibold text-[#080808] mt-8 px-5">
        No more delays. No borders. Just intelligent payments!
      </p>

      <button
        type="button"
        onClick={() => {
          setIsPopupOpen(true);
          try {
            AnalyticsService.sendEvent("PaymentSystem Explore IGPS Clicked");
          } catch (e) {}
        }}
        className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 text-xs font-medium md:w-[180px] md:text-[14px] mx-auto transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span>Explore IGPS</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-7 flex-shrink-0"
        >
          <path d="M7 17l10-10M7 7h10v10" />
        </svg>
      </button>

      <GetStartedPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default PaymentSystemUI;
