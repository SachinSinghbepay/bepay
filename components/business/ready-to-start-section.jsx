"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";

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

const finalCardData = {
  id: 4,
  title: "The future of payments is here!",
  subtitle:
    "Start accepting crypto payments in minutes. Reach global customers, boost your revenue, and manage your store — all from one powerful dashboard.",
};

const mobileCards = [...features, finalCardData];

// ✅ COMPONENT UPDATED HERE
const MobileCard = ({ cardData }) => (
  <div
    className="h-[391px] w-[305px] bg-white rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden flex-shrink-0 border-[0.76px] border-black/5"
    style={{
      boxShadow:
        "60px 20px 30px -20px rgba(0, 0, 0, 0.04), 80px 30px 120px -90px rgba(0, 0, 0, 0.02)",
    }}
  >
    <div
      className="absolute top-0 right-0 z-0" // ✅ Alignment reverted to top-right
      style={{
        width: "114.11px",
        height: "114.11px",
        opacity: 1,
      }}
    >
      <Image
        src={cardData.icon}
        height={114}
        width={114}
        alt={cardData.title}
        className="object-contain w-full h-full"
      />
    </div>
    <div className="z-10 mt-auto text-left relative">
      <h3 className="text-[44px] font-semibold leading-[27.52px] tracking-[-0.06em] text-[#333333] mb-2">
        {cardData.title}
      </h3>
      <p className="font-medium text-2xl leading-[27.52px] tracking-[-0.02em] text-[#6A6A6A]">
        {cardData.subtitle}
      </p>
    </div>
  </div>
);

const FinalMobileCard = ({ cardData }) => (
  <div
    className="h-[391px] w-[305px] bg-white rounded-[24px] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden flex-shrink-0 border-[0.76px] border-black/5"
    style={{
      boxShadow:
        "20px 20px 40px 0px rgba(0,0,0,0.04), 40px 40px 80px 0px rgba(0,0,0,0.02)",
    }}
  >
    <h3 className="text-base font-bold leading-none tracking-[-0.02em] text-[#333333] mb-4 whitespace-nowrap">
      {cardData.title}
    </h3>
    <p className="text-xs font-medium leading-5 tracking-normal text-[#6A6A6A]">
      {cardData.subtitle}
    </p>
  </div>
);

const MobileView = () => {
  const mobileContainerRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const x = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  const easeOutCubic = (val) => 1 - Math.pow(1 - val, 3);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardWrapper = cardWrapperRef.current;
      if (!cardWrapper) return;
      const scrollWidth = cardWrapper.scrollWidth;
      const containerWidth = cardWrapper.parentElement.offsetWidth;
      const maxScroll = scrollWidth - containerWidth;
      const easedProgress = easeOutCubic(latest);
      x.set(-easedProgress * maxScroll);
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  const handleStartEarningClick = () => {
    AnalyticsService.sendEvent("'Become a merchant on bepay' button clicked");
  };

  return (
    <div
      ref={mobileContainerRef}
      className="md:hidden relative h-[300vh] bg-[#F6F6F6] font-montserrat"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex flex-col h-full justify-start pt-[8vh] pb-[8vh]">
          <div className="px-6 mb-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-2xl font-medium leading-[26px] tracking-[-0.04em]"
            >
              <span className="text-gray-400">Ready to </span>
              <span className="text-gray-900">Start?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-[14px] font-medium leading-4 tracking-normal text-[#6A6A6A] mt-4"
            >
              Join{" "}
              <span className="font-semibold text-gray-800">
                1,000+ businesses
              </span>{" "}
              already growing with crypto payments.
            </motion.p>
          </div>

          <div className="w-full flex-1 flex items-center">
            <motion.div
              ref={cardWrapperRef}
              className="flex gap-4 px-4"
              style={{ x }}
            >
              {mobileCards.map((card, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ zIndex: mobileCards.length - i }}
                >
                  {card.id === 4 ? (
                    <FinalMobileCard cardData={card} />
                  ) : (
                    <MobileCard cardData={card} />
                  )}
                </div>
              ))}
              <div className="flex-shrink-0 w-4" />
            </motion.div>
          </div>

          <div className="flex items-center justify-center mt-6 px-4">
            <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="ready_to_start_business_section">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                onClick={handleStartEarningClick}
                className="flex items-center justify-center gap-2 bg-black text-white px-6 h-[56px] rounded-full hover:bg-gray-800 transition-colors text-xs font-medium"
              >
                <span>Become a merchant on bepay</span>
                <ArrowUpRight size={20} />
              </motion.button>
            </WaitlistTriggerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AnimatedCardsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStartEarningClick = () => {
    AnalyticsService.sendEvent("'Become a merchant on bepay' button clicked");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Ready to start section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasTrackedView]);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCardsVisible([true, false, false]), 800);
          setTimeout(() => setCardsVisible([true, true, false]), 1000);
          setTimeout(() => setCardsVisible([true, true, true]), 1200);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setScrollProgress(clampedProgress);
        setShowNewContent(clampedProgress > 0.6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const getCardTransform = (index) => {
    const startThreshold = 0.2;
    const endThreshold = 0.5;
    if (scrollProgress < startThreshold) {
      return "translateX(0) translateY(0) scale(1)";
    }
    const mergeProgress = Math.min(
      (scrollProgress - startThreshold) / (endThreshold - startThreshold),
      1
    );
    if (index === 0) {
      const moveX = mergeProgress * 100;
      return `translateX(${moveX}%) translateY(0) scale(1)`;
    } else if (index === 2) {
      const moveX = mergeProgress * -100;
      return `translateX(${moveX}%) translateY(0) scale(1)`;
    } else {
      return "translateX(0) translateY(0) scale(1)";
    }
  };

  const getCardZIndex = (index) => {
    if (scrollProgress > 0.2) {
      return index === 1 ? 30 : 10;
    }
    return 100 - index;
  };

  const getCardOpacity = (index) => {
    if (scrollProgress > 0.45) {
      return index === 1 ? 1 : 0;
    }
    return 1;
  };

  const getOriginalContentOpacity = (index) => {
    return index === 1 && showNewContent ? 0 : 1;
  };

  const getNewContentOpacity = () => {
    return showNewContent ? 1 : 0;
  };

  const getCardShadow = (index) => {
    return "60px 20px 30px -20px rgba(0, 0, 0, 0.08), 80px 30px 120px -90px rgba(0, 0, 0, 0.04)";
  };

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[200vh] py-11 bg-gray-50 font-montserrat"
    >
      <section className="sticky top-0 h-screen flex items-center justify-center py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2
              className={`text-3xl md:text-4xl lg:text-[80px] font-[400] lg:leading-[140px] lg:tracking-[-0.1em] lg:-mb-[10px] transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <span className="text-gray-400">Ready to </span>
              <span className="text-gray-900">Start?</span>
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl text-[#333333] font-medium lg:leading-6 lg:tracking-[-0.02em] transition-all duration-1000 delay-300 ease-out ${
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
          <div className="relative max-w-7xl pb-10 mx-auto">
            {/* ✅ MODIFICATION: Reduced lg:gap-8 to lg:gap-4 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 h-full relative">
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
                      boxShadow: getCardShadow(index),
                      background: "#FFFFFF",
                      zIndex: getCardZIndex(index),
                    }}
                  >
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
                      {/* ✅ MODIFICATION: Applied requested subtitle styles */}
                      <p
                        className="font-medium text-[32px] leading-[36px] tracking-[-.06em]"
                        style={{ color: "#6A6A6A" }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                    {index === 1 && (
                      <div
                        className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center text-center z-20 transition-all duration-700 ease-in-out"
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
                          className="font-semibold text-[16px] leading-none tracking-normal mb-3 md:mb-4"
                          style={{ color: "#080808" }}
                        >
                          The future of payments is here!
                        </h3>
                        <p
                          className="font-medium text-xs leading-5 tracking-normal mb-4 md:mb-6"
                          style={{ color: "#333333" }}
                        >
                          Start accepting crypto payments in minutes. Reach
                          global customers, boost your revenue, and manage your
                          store — all in one powerful dashboard.
                        </p>
                        <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="ready_to_start_business_section">
  <button
    onClick={handleStartEarningClick}
    className="bg-black w-[285px] h-[56px] text-white text-[14px] font-medium rounded-full flex items-center justify-center gap-2 py-4 px-6 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors"
  >
    Become a merchant on bepay
    <ArrowUpRight
      className="w-5 h-7 flex-shrink-0"
      strokeWidth={1.5}
    />
  </button>
</WaitlistTriggerButton>
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