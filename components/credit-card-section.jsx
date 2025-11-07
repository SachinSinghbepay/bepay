"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Eye, Snowflake, Clock, Settings } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";
import WaitlistTriggerButton from "./waitlist-trigger-button";
import { Button } from "./ui/button";

// --- 1. Mobile View Component (Fixed closing tags) ---

/**
 * Renders the mobile-specific layout and animations.
 */
const MobileCreditCardView = ({
  containerRef,
  handleStartClick,
  scrollYProgress,
}) => {
  const mobileMockupY = useTransform(scrollYProgress, [0, 0.5], [0, -1200]);
  const mobileContentY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0.8, 1]
  );

  return (
    <>
      {/* Sticky Container for Title and Mockup (initial screen) */}
      <div>
        <div className="relative h-[200vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <section className="bg-[#F9F9F9] h-full flex flex-col justify-start pt-6 md:pt-0">
              {/* Title - Fades Out */}
              <div className="text-center pt-8">
                <p>
                  Meet the{" "}
                  <span className="font-semibold text-[#333333]">
                    bepay RuPay Credit
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-[#333333]">
                    Card — designed for rewards,
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-[#333333]">
                    lifestyle, zero
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#333333]">
                    compromise.
                  </span>
                </p>
              </div>

              {/* Mobile Mockup - Scrolls Up and Fades Out */}
              <motion.div
                className="absolute top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ y: mobileMockupY }}
              >
                <div className="relative w-[85vw] max-w-[380px]">
                  <Image
                    src="/phone_c.png"
                    alt="Bepay video mockup frame"
                    width={380}
                    height={211}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              {/* Scrollable content below - Animates in */}
            </section>
          </div>
        </div>
        <motion.div
          className="w-full h-full bg-[#F9F9F9] px-4 py-8 -mt-[800px] relative z-30"
          style={{ y: mobileContentY, opacity: mobileContentOpacity }}
        >
          <div className="w-full max-w-[340px] mx-auto space-y-4">
            {/* Card 1 - UPI */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi.png"
                alt="Seamless UPI payments"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Card 2 - Cashback */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi2.png"
                alt="7% cashback & rewards"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Card 3 - EMI */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi3.png"
                alt="Cashback on EMI payments"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Card 4 - Airport Lounge */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi4.png"
                alt="Airport lounge access"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Card 5 - Forex */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi5.png"
                alt="No forex fees"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Card 6 - Premium Subscriptions */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/cardupi6.png"
                alt="Free Bumble & Tinder Gold subscriptions"
                width={340}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Mobile CTA - Placed directly after the cards */}
            <div className="mt-8 pb-12">
              <WaitlistTriggerButton
                    triggerSource="'Get Your BePay Card' button"
                    buttonLocation="UPI_credit_card_section"
                  >
                    <Button
                      className="bg-black cursor-pointer text-white rounded-full px-6 py-6 text-sm font-medium flex items-center gap-2 hover:bg-black/90 transition-colors w-full justify-center"
                      onClick={handleStartClick}
                    >
                      <Image
                        src="/wal2.png"
                        alt="Wallet icon"
                        width={18}
                        height={18}
                        className="opacity-70"
                      />
                      Get your bepay card now
                    </Button>
                  </WaitlistTriggerButton>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// --- 2. Desktop View Component ---

/**
 * Renders the desktop-specific layout and scroll-based animations.
 */
const DesktopCreditCardView = ({ scrollYProgress, handleStartClick }) => {
  // Desktop Animations
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, -90]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.4]);
  const cardX = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "41%"]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-35%"]);
  const mockupOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const mockupY = useTransform(scrollYProgress, [0.2, 0.6], ["-100%", "0%"]);
  const mockupX = useTransform(scrollYProgress, [0.2, 0.6], ["-100%", "0%"]);
  const line1X = useTransform(scrollYProgress, [0.6, 0.65], ["0%", "-100%"]);
  const line1Opacity = useTransform(scrollYProgress, [0.6, 0.65], [1, 0]);
  const line2X = useTransform(scrollYProgress, [0.62, 0.67], ["0%", "-100%"]);
  const line2Opacity = useTransform(scrollYProgress, [0.62, 0.67], [1, 0]);
  const line3X = useTransform(scrollYProgress, [0.64, 0.69], ["0%", "-100%"]);
  const line3Opacity = useTransform(scrollYProgress, [0.64, 0.69], [1, 0]);
  const line4X = useTransform(scrollYProgress, [0.66, 0.71], ["0%", "-100%"]);
  const line4Opacity = useTransform(scrollYProgress, [0.66, 0.71], [1, 0]);

  const desktopStackOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75],
    [0, 1]
  );
  const desktopCard1Y = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    ["0%", "-200%"]
  );
  const desktopCard1Rotate = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    [0, 15]
  );
  const desktopCard1Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    [1, 0]
  );
  const desktopCard2Y = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    ["0%", "-200%"]
  );
  const desktopCard2Rotate = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    [0, -10]
  );
  const desktopCard2Opacity = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    [1, 0]
  );
  const desktopCard3Y = useTransform(
    scrollYProgress,
    [0.85, 0.9],
    ["0%", "-200%"]
  );
  const desktopCard3Rotate = useTransform(
    scrollYProgress,
    [0.85, 0.9],
    [0, 20]
  );
  const desktopCard3Opacity = useTransform(
    scrollYProgress,
    [0.85, 0.9],
    [1, 0]
  );
  const desktopCard4Y = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    ["0%", "-200%"]
  );
  const desktopCard4Rotate = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    [0, -15]
  );
  const desktopCard4Opacity = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    [1, 0]
  );
  const desktopCard5Scale = useTransform(
    scrollYProgress,
    [0.95, 1.0],
    [1, 1.1]
  );

  const ctaOpacity = useTransform(scrollYProgress, [0.95, 1.0], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.95, 1.0], [0.8, 1]);

  return (
    <div className="sticky top-0 h-[100vh] w-full flex flex-col overflow-hidden">
      <motion.div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex flex-col items-start justify-center px-4 text-start md:px-6 w-full">
          <h1 className="relative z-10 font-[400] leading-none tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              className="block font-regular text-[60px] text-[#C0C0C0] tracking-[-0.08em] sm:text-[80px] md:text-[120px] 3xl:text-[160px]"
            >
              The only <span className="text-[#333333]">card</span> you&apos;ll
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="block text-[60px] text-[#C0C0C0] text-regular tracking-[-0.08em] sm:text-[80px] md:text-[120px] 3xl:text-[160px]"
            >
              ever need!
            </motion.span>
          </h1>
        </div>
      </motion.div>

      <div className="absolute top-48 left-0 mt-28 right-0 z-20 flex flex-col md:flex-row items-center md:items-center justify-between w-full px-4 md:px-6 h-1/2">
        <div className="relative md:w-1/2 lg:w-2/5 text-lg text-[#666666] space-y-0 h-full">
          <div className="hidden md:block">
            <motion.p style={{ x: line1X, opacity: line1Opacity }}>
              Meet the{" "}
              <span className="font-semibold text-[#333333]">
                bepay RuPay Credit
              </span>
            </motion.p>
            <motion.p style={{ x: line2X, opacity: line2Opacity }}>
              <span className="font-semibold text-[#333333]">
                Card — designed for rewards,
              </span>
            </motion.p>
            <motion.p style={{ x: line3X, opacity: line3Opacity }}>
              <span className="font-semibold text-[#333333]">
                lifestyle, zero
              </span>{" "}
              and
            </motion.p>
            <motion.p style={{ x: line4X, opacity: line4Opacity }}>
              <span className="font-semibold text-[#333333]">compromise.</span>
            </motion.p>
          </div>

          <motion.div
            style={{ opacity: desktopStackOpacity }}
            className="hidden md:flex absolute inset-0 flex-col items-center justify-center md:-mt-2"
          >
            <div className="relative w-full max-w-[400px] aspect-square">
              <motion.div
                style={{
                  y: desktopCard1Y,
                  rotate: desktopCard1Rotate,
                  opacity: desktopCard1Opacity,
                  zIndex: 5,
                }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi.png"
                  alt="Card 1"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
              <motion.div
                style={{
                  y: desktopCard2Y,
                  rotate: desktopCard2Rotate,
                  opacity: desktopCard2Opacity,
                  zIndex: 4,
                }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi2.png"
                  alt="Card 2"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
              <motion.div
                style={{
                  y: desktopCard3Y,
                  rotate: desktopCard3Rotate,
                  opacity: desktopCard3Opacity,
                  zIndex: 3,
                }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi3.png"
                  alt="Card 3"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
              <motion.div
                style={{
                  y: desktopCard4Y,
                  rotate: desktopCard4Rotate,
                  opacity: desktopCard4Opacity,
                  zIndex: 2,
                }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi4.png"
                  alt="Card 4"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
              <motion.div
                style={{ scale: desktopCard5Scale, zIndex: 1 }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi5.png"
                  alt="Card 5"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
              <motion.div
                style={{ scale: desktopCard5Scale, zIndex: 1 }}
                className="absolute inset-0 transform"
              >
                <Image
                  src="/cardupi6.png"
                  alt="Card 6"
                  fill
                  priority
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </div>

            <motion.div
              style={{ opacity: ctaOpacity, scale: ctaScale }}
              className="mt-8"
            >
              <WaitlistTriggerButton
                triggerSource="'Get Your BePay Card' button"
                buttonLocation="UPI_credit_card_section"
              >
                <Button
                  onClick={handleStartClick}
                  className="relative z-20 bg-black cursor-pointer whitespace-nowrap text-white 
               w-[258px] h-[56px] rounded-full flex items-center justify-center gap-2 
               text-[14px] font-medium px-6 py-4 -mt-12
               hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src="/wal2.png"
                    alt="Wallet icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  Get your BePay card now
                </Button>
              </WaitlistTriggerButton>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative md:w-1/2 lg:w-1/2 flex items-center justify-center">
          <motion.div
            style={{ opacity: mockupOpacity, y: mockupY, x: mockupX }}
            className="max-w-[360px] w-full h-[660px] border-[7px] border-gray-200 rounded-[40px] bg-white shadow-xl flex flex-col items-center p-4 overflow-hidden"
          >
            <div className="flex max-w-[250px] w-full border-2 border-gray-200 rounded-full p-0.5 mb-6 items-center bg-white mt-12">
              <div className="w-1/2 bg-black text-white rounded-full text-center py-3 text-[12px] font-medium cursor-pointer">
                Card
              </div>
              <div className="w-1/2 text-gray-500 text-center py-3 text-[12px] font-medium cursor-pointer">
                Bank account
              </div>
            </div>

            <div className="relative w-full h-[180px] bg-white rounded-xl mt-4"></div>

            <div className="flex items-start justify-between w-full mt-4 px-2">
              <div className="flex flex-col items-center text-gray-500 text-xs space-y-1">
                <div className="p-3 rounded-xl bg-gray-100">
                  <Eye className="w-5 h-5 text-black" />
                </div>
                <span>View</span>
              </div>

              <div className="flex flex-col items-center text-gray-500 text-xs space-y-1">
                <div className="p-3 rounded-xl bg-gray-100">
                  <Snowflake className="w-5 h-5 text-black" />
                </div>
                <span>Freeze</span>
              </div>

              <div className="flex flex-col items-center text-gray-500 text-xs space-y-1">
                <div className="p-3 rounded-xl bg-gray-100">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <span>Limit</span>
              </div>

              <div className="flex flex-col items-center text-gray-500 text-xs space-y-1">
                <div className="p-3 rounded-xl bg-gray-100">
                  <Settings className="w-5 h-5 text-black" />
                </div>
                <span>Settings</span>
              </div>
            </div>

            <div className="mt-auto w-full space-y-3">
              <button className="w-full py-3 bg-gray-100 rounded-full text-gray-800 font-medium">
                Apply virtual card
              </button>
              <button className="w-full py-3 bg-white rounded-full border-2 border-gray-200 text-gray-800 font-medium">
                Apply physical card
              </button>
            </div>
          </motion.div>

          <motion.div
            style={{
              rotate: cardRotate,
              scale: cardScale,
              x: cardX,
              y: cardY,
              position: "absolute",
              top: "20%",
              right: "40%",
              width: "clamp(500px, 50vw, 900px)",
              aspectRatio: "1/1",
            }}
            className="z-50 hidden md:block"
          >
            <Image
              src="/creditcard.png"
              alt="Credit card mockup"
              fill
              className="absolute z-50 p-2"
              priority
              sizes="(max-width: 768px) 40vw, 60vw"
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Export Component ---

export default function CreditCardSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // View Tracking Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI - Credit Card section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleStartClick = () => {
    AnalyticsService.sendEvent("Get_Your_Bepay_card_clicked");
  };

  // Resize/Mobile Detection Logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative bg-[#F9F9F9]">
      <section
        ref={sectionRef}
        className="relative md:min-h-[800vh] max-w-[1500px] mx-auto"
      >
        {isMobile ? (
          <MobileCreditCardView
            scrollYProgress={scrollYProgress}
            handleStartClick={handleStartClick}
            containerRef={sectionRef}
          />
        ) : (
          <DesktopCreditCardView
            scrollYProgress={scrollYProgress}
            handleStartClick={handleStartClick}
          />
        )}
      </section>
    </div>
  );
}