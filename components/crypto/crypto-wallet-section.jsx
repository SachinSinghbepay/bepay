"use client";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wallet, CreditCard, ScanLine, Globe, Plus } from "lucide-react";
import { DebitCardView } from "./mocup-views/debit-card-view";
import { BankAccountView } from "./mocup-views/bank-account-view";
import { CryptoWalletView } from "./mocup-views/crypto-wallet-view";
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
      title: (
        <>
          A VIRTUAL <span className="text-[#333333]">CRYPTO DEBIT CARD</span>{" "}
        </>
      ),
      mobileTitle: (
        <>
          VIRTUAL <span className="text-[#333333]">CRYPTO</span>
          <br />
          <span className="text-[#333333]">DEBIT CARD</span>
        </>
      ),
      component: (
        <DebitCardView
          setActiveView={setActiveView}
          scrollYProgress={scrollYProgress}
        />
      ),
    },
    {
      id: "bank-account",
      title: (
        <>
          A <span className="text-[#333333]">SWISS BANK</span> ACCOUNT
        </>
      ),
      mobileTitle: (
        <>
          <span className="text-[#333333]">SWISS BANK</span>
          <br />
          ACCOUNT
        </>
      ),
      component: <BankAccountView setActiveView={setActiveView} />,
    },
    {
      id: "crypto-wallet",
      title: (
        <>
          A SECURE <span className="text-[#333333]">SELF CUSTODY CRYPTO</span>{" "}
          WALLET
        </>
      ),
      mobileTitle: (
        <>
          SECURE <span className="text-[#333333]">SELF CUSTODY</span>
          <br />
          <span className="text-[#333333]">CRYPTO</span> WALLET
        </>
      ),
      component: <CryptoWalletView />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
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
        setActiveView("crypto-wallet");
      } else if (latest < 0.4) {
        setActiveView("debit-card");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15],
    [1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100%"]);

  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.2]);
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, -90]);
  const cardX = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [isMobile ? "-50%" : "-20%", isMobile ? "-50%" : "-37%"]
  );
  const cardY = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["0%", isMobile ? "-20%" : "-65%"]
  );
  const flyingCardOpacity = useTransform(scrollYProgress, [0.39, 0.4], [1, 0]);

  const mockupOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const mockupScale = useTransform(scrollYProgress, [0.15, 0.3], [0.8, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.5], ["20px", "0px"]);

  const mobileTitleOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const mobileTitleY = useTransform(
    scrollYProgress,
    [0.15, 0.3],
    ["20px", "0px"]
  );

  const currentView = featureData.find((f) => f.id === activeView);

  return (
    <section id="crypto-card" className="relative mt-0 md:mt-0 bg-[#F9F9F9]">
      <div
        ref={sectionRef}
        className="relative mx-auto min-h-[500vh] max-w-7xl"
      >
        <div className="sticky -top-36 lg:top-0 flex h-[130vh] md:h-[110vh] w-full flex-col items-start justify-start md:justify-center overflow-hidden">
          {/* Heading */}
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="absolute top-4 md:top-0 px-4 text-start z-10 w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal"
              style={{ letterSpacing: "-0.04em" }}
            >
              The only <span className="font-normal text-black">card</span>{" "}
              you&apos;ll
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal -mt-2 lg:-mt-18"
              style={{ letterSpacing: "-0.04em" }}
            >
              ever need!
            </motion.h2>
          </motion.div>

          <div className="relative lg:mb-32 flex h-full w-full flex-col items-center md:items-start justify-center md:flex-row md:justify-start pt-32 md:pt-8">
            {/* Left Mockup */}
            <div className="relative flex h-auto md:h-full w-full items-start md:items-center justify-center md:w-1/2 md:justify-end md:pr-8">
              <div className="flex flex-col items-center">
                {/* Mobile Title */}
                <AnimatePresence mode="wait">
                  {isMobile && (
                    <motion.div
                      key={activeView}
                      style={{
                        opacity: mobileTitleOpacity,
                        y: mobileTitleY,
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="md:hidden mb-6 px-4 text-center"
                    >
                      <h3 className="text-xl font-semibold text-[#6A6A6A] leading-tight">
                        {currentView?.mobileTitle}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Phone Mockup Container - Using only your custom phone mockup */}
                <motion.div
                  style={{
                    opacity: mockupOpacity,
                    scale: mockupScale,
                  }}
                  className="z-10 mt-0 md:mt-10 relative flex-shrink-0"
                >
                  {/* Your Phone Mockup - Let it determine its own size */}
                  <div className="relative">
                    <Image
                      src="/phone-mockup.png"
                      alt="Phone Mockup"
                      width={320}
                      height={640}
                      priority
                      className="object-contain md:w-[330px] md:h-[660px]"
                    />
                    
                    {/* Screen Content Overlay - positioned to match your phone's screen */}
                    {/* <div className="absolute top-[12%] left-[12%] right-[12%] bottom-[20%] z-30">
                      <div className="relative h-full w-full overflow-hidden rounded-[16px] md:rounded-[20px] bg-white">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeView}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{
                              duration: 0.6,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="absolute h-full w-full"
                          >
                            {currentView?.component}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div> */}
                  </div>
                  
                  {/* Bottom Navigation - positioned below the phone */}
                  {/* <div className="absolute -bottom-12 left-0 right-0 z-40 flex justify-around px-8">
                    <BottomNavItem
                      icon={
                        <Wallet strokeWidth={1} size={isMobile ? 18 : 20} />
                      }
                      label="Wallet"
                      active={activeView === "crypto-wallet"}
                      onClick={() => setActiveView("crypto-wallet")}
                    />
                    <BottomNavItem
                      icon={
                        <CreditCard strokeWidth={1} size={isMobile ? 18 : 20} />
                      }
                      label="Card"
                      active={activeView === "debit-card"}
                      onClick={() => setActiveView("debit-card")}
                    />
                    <BottomNavItem
                      icon={
                        <ScanLine strokeWidth={1} size={isMobile ? 18 : 20} />
                      }
                      label="Scan & Pay"
                    />
                    <BottomNavItem
                      icon={<Globe strokeWidth={1} size={isMobile ? 18 : 20} />}
                      label="Explore"
                    />
                    <BottomNavItem
                      icon={<Plus strokeWidth={1} size={isMobile ? 18 : 20} />}
                      label="SWISS"
                      active={activeView === "bank-account"}
                      onClick={() => setActiveView("bank-account")}
                    />
                  </div> */}
                </motion.div>

                {/* Subtitle */}
                <motion.div
                  style={{ opacity: mockupOpacity }}
                  className="block mt-4"
                >
                  <p className="text-xs md:text-sm text-center">
                    <span className="font-medium text-gray-500">
                      FIRST OF IT'S KIND
                    </span>
                    <span className="font-bold text-[#333333] ml-1">
                      ON-CHAIN BANKING APP
                    </span>
                  </p>
                </motion.div>
              </div>

              {/* Flying Card */}
              <AnimatePresence>
                {activeView === "debit-card" && (
                  <motion.div
                    className="z-50 top-[10%] md:top-1/2 left-1/2 absolute"
                    style={{
                      rotate: cardRotate,
                      scale: cardScale,
                      x: cardX,
                      y: cardY,
                      opacity: flyingCardOpacity,
                      width: "clamp(600px, 68vw, 960px)",
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

            {/* Right Content Panel */}
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="w-full hidden md:flex flex-col items-start justify-start md:w-1/2 md:pl-8 mt-4 md:mt-0 md:pt-24"
            >
              <div className="flex w-full flex-col items-start justify-center space-y-4 md:space-y-11 p-4 md:p-8">
                {featureData.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveView(feature.id)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <div className="flex h-6 w-6 items-center justify-center">
                      <motion.div
                        className="h-2 w-2 bg-black"
                        style={{
                          clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                        }}
                        animate={{
                          opacity: activeView === feature.id ? 1 : 0,
                          scale: activeView === feature.id ? 1.5 : 0.5,
                          x: activeView === feature.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                    <span
                      className={`text-base md:text-lg lg:tracking-tighter text-[#6A6A6A] font-semibold max-w-[400px] lg:text-[32px] transition-all duration-500 ${
                        activeView === feature.id ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </button>
                ))}
              </div>
              <WaitlistTriggerButton>
                <button className="flex drop-shadow-2xl items-center lg:ml-16 gap-2 lg:h-[56px] text-[12px] whitespace-nowrap rounded-full bg-black px-6 py-3 text-white transition-transform hover:scale-105 active:scale-100 mt-4 md:mt-0">
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