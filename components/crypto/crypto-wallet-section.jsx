"use client";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { IconDeviceMobile } from "@tabler/icons-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";

export default function CryptoWalletSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState("debit-card");

  const featureData = [
    {
      id: "debit-card",
      title: (activeView) => (
        <>
          A VIRTUAL{" "}
          <span
            className={
              activeView === "debit-card" ? "text-black" : "text-[#333333]"
            }
          >
            CRYPTO
          </span>
          <br />
          <span
            className={
              activeView === "debit-card" ? "text-black" : "text-[#333333]"
            }
          >
            DEBIT CARD
          </span>
        </>
      ),
      mobileTitle: (activeView) => (
        <>
          A VIRTUAL{" "}
          <span
            className={`${
              activeView === "debit-card" ? "text-black font-semibold" : "text-[#333333] font-medium"
            }`}
          >
            CRYPTO
          </span>{" "}
          <span
            className={`${
              activeView === "debit-card" ? "text-black font-semibold" : "text-[#333333] font-medium"
            }`}
          >
            DEBIT CARD
          </span>
        </>
      ),
      imageSrc: "/phone-mockup.png",
    },
    {
      id: "bank-account",
      title: (activeView) => (
        <>
          A{" "}
          <span
            className={
              activeView === "bank-account" ? "text-black" : "text-[#333333]"
            }
          >
            SWISS BANK
          </span>
          <br />
          ACCOUNT
        </>
      ),
      mobileTitle: (activeView) => (
        <>
          A{" "}
          <span
            className={
              activeView === "bank-account" ? "text-black" : "text-[#333333]"
            }
          >
            SWISS BANK
          </span>
          ACCOUNT
        </>
      ),
      imageSrc: "/second-image.png",
    },
    {
      id: "crypto-wallet",
      title: (activeView) => (
        <>
          A SECURE
          <span
            className={
              activeView === "crypto-wallet" ? "text-black" : "text-[#333333]"
            }
          >
            {" "}SELF CUSTODY
          </span>{" "}
          <span
            className={
              activeView === "crypto-wallet" ? "text-black" : "text-[#333333]"
            }
          >
            CRYPTO
          </span>{" "}
          WALLET
        </>
      ),
      mobileTitle: (activeView) => (
        <>
          A{" "}
          <span
            className={activeView === "crypto-wallet" ? "text-black" : "text-[#333333]"}
          >
             SELF CUSTODY
          </span>{" "}
          <span
            className={activeView === "crypto-wallet" ? "text-black" : "text-[#333333]"}
          >
          </span>{" "}
          WALLET
        </>
      ),
      imageSrc: "/third-image.png",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.4 && latest < 0.6) {
        setActiveView("debit-card");
      } else if (latest >= 0.6 && latest < 0.8) {
        setActiveView("bank-account");
      } else if (latest >= 0.8) {
        // Show the complete third phone component (with extras) when we reach 0.8
        setActiveView("crypto-wallet");
      } else {
        setActiveView("debit-card");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const headingOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100%"]);
  const flyingCardOpacity = useTransform(scrollYProgress, [0, 1], [1, 2]);

  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.2]);
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, -90]);
  const cardX = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [isMobile ? "-50%" : "-20%", isMobile ? "-50%" : "-37%"]
  );
  const cardY = useTransform(
    scrollYProgress,
    isMobile ? [0.0, 0.08, 0.18, 0.28] : [0.0, 0.12, 0.3, 0.4],
    isMobile ? ["66vh", "15vh", "0%", "-10%"] : ["14vh", "10vh", "-30%", "-50%"]
  );

  const cardWidth = useTransform(scrollYProgress, [0.1, 0.3, 0.4], [
    isMobile ? "clamp(430px, 45vw, 458px)" : "clamp(700px, 80vw, 800px)",
    isMobile ? "clamp(300px, 60vw, 360px)" : "clamp(700px, 80vw, 800px)",
    isMobile ? "clamp(1000px, 90vw, 1050px)" : "clamp(800px, 90vw, 1300px)",
  ]);

  const mockupOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const mockupScale = useTransform(scrollYProgress, [0.15, 0.3], [0.8, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.5], ["20px", "0px"]);

  const currentView = featureData.find((f) => f.id === activeView);

  // Third Phone with Extras Component - combined as one unit
  const ThirdPhoneWithExtras = () => {
    return (
      <motion.div
        key="crypto-wallet-complete"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col items-center"
      >
        {/* Phone Image */}
        <Image
          src="/third-image.png"
          alt="crypto-wallet view"
          width={260}
          height={520}
          priority
          className="object-contain w-[260px] h-[520px] md:w-[330px] md:h-[660px] mt-19 md:mt-0"
        />
        
        {/* Mobile Extras - always included as part of this component */}
        {isMobile && (
          <>
            {/* Subtitle */}
            <motion.div 
              className="mt-8 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xs md:text-sm text-center">
                <span className="font-medium text-gray-500">FIRST OF IT&apos;S KIND</span>
                <span className="font-bold text-[#333333] ml-1">ON-CHAIN BANKING APP</span>
              </p>
            </motion.div>

            {/* Mobile Button */}
            <motion.div
              className="mt-8 px-4 z-20 relative mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <WaitlistTriggerButton>
                <button className="flex drop-shadow-2xl items-center gap-2 text-[12px] whitespace-nowrap rounded-full bg-black px-6 py-3 text-white transition-transform hover:scale-105 active:scale-100 relative z-30">
                  <IconDeviceMobile className="h-5 w-5" />
                  <span>Download App & Get Bitcoin Reward</span>
                </button>
              </WaitlistTriggerButton>
            </motion.div>
          </>
        )}
      </motion.div>
    );
  };

  // Regular Phone Component for first two screens
  const RegularPhone = ({ view, imageSrc }) => {
    return (
      <motion.div
        key={view}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col items-center"
      >
        <Image
          src={imageSrc}
          alt={`${view} view`}
          width={260}
          height={520}
          priority
          className="object-contain w-[260px] h-[520px] md:w-[330px] md:h-[660px] mt-19 md:mt-0"
        />
      </motion.div>
    );
  };

  return (
    <section id="crypto-card" className="relative mt-0 md:mt-0 bg-[#F9F9F9]">
      <div ref={sectionRef} className="relative mx-auto min-h-[600vh] max-w-7xl">
        <div className="sticky top-0 lg:top-0 flex h-[100vh] md:h-[110vh] w-full flex-col items-start justify-center md:justify-center overflow-visible">
          {/* Heading */}
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="relative md:absolute top-auto md:top-0 px-4 text-start z-10 w-full mt-20 md:mt-0"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal"
              style={{ letterSpacing: "-0.08em" }}
            >
              The only <span className="font-normal text-black">card</span> you&apos;ll
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal -mt-2 lg:-mt-18"
              style={{ letterSpacing: "-0.0em" }}
            >
              ever need!
            </motion.h2>
          </motion.div>

          <div className="relative lg:mb-32 flex h-full w-full flex-col items-center md:items-start justify-center md:flex-row md:justify-start pt-0 md:pt-2">
            {/* Left Mockup */}
            <div className="relative flex h-auto md:h-full w-full items-start md:items-center justify-center md:w-1/2 md:justify-end md:pr-8">
              <div className="flex flex-col items-center pb-24 md:pb-24"> 
                
                {/* Mobile Title ABOVE phone */}
                {isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: -19 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                    className="mb-6 text-center px-4"
                    key={activeView}
                  >
                    <h3 className="text-[14px] leading-[22px] tracking-wide uppercase text-[#333333] font-semibold">
                      {currentView?.mobileTitle(activeView)}
                    </h3>
                  </motion.div>
                )}

                {/* Main Image Container with integrated extras */}
                <motion.div
                  style={{ opacity: mockupOpacity, scale: mockupScale }}
                  className="z-10 -mt-25 md:mt-10 relative flex-shrink-0"
                >
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {activeView === "crypto-wallet" ? (
                        <ThirdPhoneWithExtras />
                      ) : (
                        <RegularPhone 
                          view={activeView}
                          imageSrc={currentView?.imageSrc || "/phone-mockup.png"}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Flying Card */}
              <AnimatePresence>
                {activeView === "debit-card" && (
                  <motion.div
                    className="z-50 top-[-35%] left-[50%] md:top-[33%] md:left-[43.5%] absolute "
                    style={{
                      rotate: cardRotate,
                      scale: cardScale,
                      x: cardX,
                      y: cardY,
                      opacity: flyingCardOpacity,
                      width: cardWidth,
                      aspectRatio: "1 / 1",
                      transform: "translate(-50%, -50%)",
                      transformOrigin: "center",
                    }}
                  >
                    <Image
                      src="/cryptocard.png"
                      alt="Black Crypto Card"
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 100vw"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Content Panel (desktop only) */}
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="w-full hidden md:flex flex-col items-start justify-start md:w-1/2 md:pl-16 lg:pl-20 xl:pl-24 mt-4 md:mt-0 md:pt-24"
            >
              <div className="flex w-full flex-col items-start justify-center space-y-6 md:space-y-15 p-4 md:p-8">
                {featureData.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveView(feature.id)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <div className="flex h-6 w-6 items-center justify-center">
                      <motion.div
                        className="h-4 w-4 bg-black"
                        style={{
                          borderRadius: "20%",
                          clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                        }}
                        animate={{
                          opacity: activeView === feature.id ? 1 : 0,
                          scale: activeView === feature.id ? 1.2 : 0.8,
                          x: activeView === feature.id ? 3 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                    <span
                      className={`text-base md:text-lg lg:tracking-tighter text-[#6A6A6A] font-semibold max-w-[400px] lg:text-[32px] leading-tight transition-all duration-500 ${
                        activeView === feature.id ? "opacity-100" : "opacity-40"
                      }`}
                      style={{ lineHeight: "1.1" }}
                    >
                      {typeof feature.title === "function"
                        ? feature.title(activeView)
                        : feature.title}
                    </span>
                  </button>
                ))}
              </div>
              <WaitlistTriggerButton>
                <button className="flex drop-shadow-2xl items-center lg:ml-16 gap-2 lg:h-[56px] text-[12px] whitespace-nowrap rounded-full bg-black px-6 py-3 text-white transition-transform hover:scale-105 active:scale-100 mt-8 md:mt-6">
                  <IconDeviceMobile className="h-5 w-5" />
                  <span>Download App & Get Bitcoin Reward</span>
                </button>
              </WaitlistTriggerButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BottomNavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 text-[7px] md:text-[8px] transition-colors hover:text-black ${
      active ? "text-black" : "text-gray-400"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);