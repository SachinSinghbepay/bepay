"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Download,
  Wallet,
  CreditCard,
  ScanLine,
  Globe,
  Gift,
  Phone,
} from "lucide-react";
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
      // title: "A VIRTUAL CRYPTO DEBIT CARD",
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
      // title: "A SECURE SELF CUSTODY CRYPTO WALLET",
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

  // Auto-change views based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.5 && latest < 0.7) {
        setActiveView("debit-card");
      } else if (latest >= 0.7 && latest < 0.85) {
        setActiveView("bank-account");
      } else if (latest >= 0.85) {
        setActiveView("crypto-wallet");
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

  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.46]);
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, -90]);
  const cardX = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [isMobile ? "-50%" : "0%", isMobile ? "-30%" : "-35%"]
  );
  const cardY = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["0%", isMobile ? "-100%" : "-75%"]
  );
  const flyingCardOpacity = useTransform(scrollYProgress, [0.39, 0.4], [1, 0]);

  const mockupOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const mockupScale = useTransform(scrollYProgress, [0.15, 0.3], [0.8, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.5], ["20px", "0px"]);

  const currentView = featureData.find((f) => f.id === activeView);

  return (
    <section id="crypto-card" className="relative -mt-60 md:mt-0 bg-[#F9F9F9]">
      <div
        ref={sectionRef}
        className="relative mx-auto min-h-[300vh] max-w-7xl"
      >
        <div className="sticky top-0 flex h-[150vh] sm:h-[140vh] md:h-[110vh] w-full flex-col items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="absolute top-4 md:top-0 px-4 text-start"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal"
            >
              The only <span className="font-normal text-black">card</span>{" "}
              you'll
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-[400] text-[#C0C0C0] md:text-7xl xl:text-[120px] leading-tight md:leading-normal -mt-2 md:mt-0"
            >
              ever need!
            </motion.h2>
          </motion.div>

          <div className="relative flex h-full w-full flex-col items-center justify-center md:flex-row md:justify-start mt-8 md:mt-0">
            <div className="relative flex h-full w-full items-center justify-center md:w-1/2 md:justify-end md:pr-8">
              <motion.div
                style={{
                  opacity: mockupOpacity,
                  scale: mockupScale,
                }}
                className="z-10 flex h-[660px] w-[330px] flex-shrink-0 flex-col rounded-[40px] border-[10px] border-[#13131326] bg-white p-4 shadow-2xl"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gray-50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute h-full w-full"
                    >
                      {currentView?.component}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-auto flex justify-around border-t-[1px] pt-2">
                  <BottomNavItem
                    icon={<Wallet strokeWidth={1} size={20} />}
                    label="Wallet"
                    active={activeView === "crypto-wallet"}
                    onClick={() => setActiveView("crypto-wallet")}
                  />
                  <BottomNavItem
                    icon={<CreditCard strokeWidth={1} size={20} />}
                    label="Card"
                    active={activeView === "debit-card"}
                    onClick={() => setActiveView("debit-card")}
                  />
                  <BottomNavItem
                    icon={<ScanLine strokeWidth={1} size={20} />}
                    label="Scan & Pay"
                  />
                  <BottomNavItem
                    icon={<Globe strokeWidth={1} size={20} />}
                    label="Explore"
                  />
                  <BottomNavItem
                    icon={<Gift strokeWidth={1} size={20} />}
                    label="Reward"
                    active={activeView === "bank-account"}
                    onClick={() => setActiveView("bank-account")}
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {activeView === "debit-card" && (
                  <motion.div
                    style={{
                      rotate: cardRotate,
                      scale: cardScale,
                      x: cardX,
                      y: cardY,
                      opacity: flyingCardOpacity,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "clamp(350px, 40vw, 800px)",
                      aspectRatio: "1 / 1",
                      transformOrigin: "center",
                      marginLeft: "-clamp(175px, 40vw, 400px)",
                      marginTop: "-clamp(110.34px, 12.6vw, 252.2px)",
                    }}
                    className="z-50"
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.4 },
                    }}
                  >
                    <Image
                      src="/creditcard.png"
                      alt="Black Debit Card"
                      fill
                      priority
                      className="object-contain -mt-32 md:mt-0"
                      sizes="(max-width: 768px) 80vw, 90vw"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className=" md:hidden  text-sm font-medium text-gray-500">
              ALL IN ONE MOBILE APP
            </p>
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="flex w-full flex-col items-center lg:items-start justify-center  md:w-1/2 md:pl-8"
            >
              <div className="flex w-full flex-col items-start justify-center space-y-2 md:space-y-11 p-8">
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
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                    <span
                      className={`text-lg font-semibold max-w-[500px] lg:text-[32px] transition-colors ${
                        activeView === feature.id ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </button>
                ))}
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center lg:ml-16 gap-2 lg:h-[56px] text-[12px]  whitespace-nowrap rounded-full bg-black px-6 py-3 text-white transition-transform hover:scale-105 active:scale-100">
                  <IconDeviceMobile className="h-5 w-5" />
                  <span>Download App & Get Bitcoin Reward</span>
                </button>
              </WaitlistTriggerButton>
            </motion.div>
          </div>
          <p className="absolute hidden md:block -bottom-0 md:bottom-2 left-1/4 text-sm font-medium text-gray-500">
            ALL IN ONE MOBILE APP
          </p>
        </div>
      </div>
    </section>
  );
}

const BottomNavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 text-xs transition-colors hover:text-black ${
      active ? "text-black" : "text-gray-400"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
