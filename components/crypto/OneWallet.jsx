"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import WaitlistTriggerButton from "../waitlist-trigger-button";

gsap.registerPlugin(ScrollTrigger);

// Utility function for debouncing
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};

// Hook to detect mobile vs. desktop
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// Component for the original Desktop/Tablet animation
const DesktopView = () => {
  const sectionRef = useRef(null);
  const textLine1Ref = useRef(null);
  const textLine2Ref = useRef(null);
  const textLine3Ref = useRef(null);
  const textLine4Ref = useRef(null);
  const cardRef = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);
  const mockupImageRef = useRef(null);
  const mockupImage2_1Ref = useRef(null);
  const mockupImage2_2Ref = useRef(null);
  const mockupImage2_3Ref = useRef(null);
  const mockupImage3Ref = useRef(null);
  const mockupImage4Ref = useRef(null);
  const mockupImage5Ref = useRef(null);
  const mockupImage6_1Ref = useRef(null);
  const mockupImage6_2Ref = useRef(null);

  useEffect(() => {
    const getResponsiveValue = (mobile, tablet, desktop) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 640 || height < 700) return mobile;
      if (width < 1000 || height < 800) return tablet;
      return desktop;
    };

    let ctx = gsap.context(() => {
      const updateAnimations = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        gsap.set(
          [
            textLine1Ref.current,
            textLine2Ref.current,
            textLine3Ref.current,
            textLine4Ref.current,
          ],
          {
            y: getResponsiveValue(50, 75, 100),
            opacity: 0,
          }
        );

        gsap.set(
          [
            cardRef.current,
            card2Ref.current,
            card3Ref.current,
            card4Ref.current,
            card5Ref.current,
            card6Ref.current,
          ],
          {
            x: getResponsiveValue("150%", "0", "0"),
            y: getResponsiveValue("0", "100vh", "100vh"),
          }
        );

        gsap.set(
          [
            mockupImageRef.current,
            mockupImage2_1Ref.current,
            mockupImage2_2Ref.current,
            mockupImage2_3Ref.current,
            mockupImage3Ref.current,
            mockupImage4Ref.current,
            mockupImage5Ref.current,
          ],
          {
            y: "100%",
          }
        );
        gsap.set([mockupImage6_1Ref.current, mockupImage6_2Ref.current], {
          y: "200%",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => {
              const width = window.innerWidth;
              if (width < 640) return "+=500%";
              if (width < 1000) return "+=475%";
              if (width < 1200) return "+=450%";
              return "+=425%";
            },
            pin: true,
            pinSpacing: true,
            scrub: getResponsiveValue(0.8, 1, 1.2),
            markers: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(textLine1Ref.current, {
          y: 0,
          opacity: 1,
          duration: getResponsiveValue(0.6, 0.8, 1),
          ease: "power3.out",
        })
          .to(
            textLine2Ref.current,
            {
              y: 0,
              opacity: 1,
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            textLine3Ref.current,
            {
              y: 0,
              opacity: 1,
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            textLine4Ref.current,
            {
              y: 0,
              opacity: 1,
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(cardRef.current, {
            x: getResponsiveValue("0%", "0%", "0%"),
            y: 0,
            duration: getResponsiveValue(1, 1.25, 1.5),
            ease: "power2.inOut",
          })
          .to(
            mockupImageRef.current,
            {
              y: getResponsiveValue("5%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            cardRef.current,
            {
              scale: 0,
              duration: getResponsiveValue(0.8, 1, 1.2),
              ease: "power2.inOut",
            },
            "+=1"
          )
          .to(
            card2Ref.current,
            {
              x: getResponsiveValue("0%", "0%", "0%"),
              y: 0,
              duration: getResponsiveValue(1, 1.25, 1.5),
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mockupImage2_1Ref.current,
            {
              y: getResponsiveValue("7%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            mockupImage2_2Ref.current,
            {
              y: getResponsiveValue("17%", "17.5%", "20%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            mockupImage2_3Ref.current,
            {
              y: getResponsiveValue("27%", "27.5%", "30%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            card2Ref.current,
            {
              scale: 0,
              duration: getResponsiveValue(0.8, 1, 1.2),
              ease: "power2.inOut",
            },
            "+=1"
          )
          .to(
            card3Ref.current,
            {
              x: getResponsiveValue("0%", "0%", "0%"),
              y: 0,
              duration: getResponsiveValue(1, 1.25, 1.5),
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mockupImage3Ref.current,
            {
              y: getResponsiveValue("5%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            card3Ref.current,
            {
              scale: 0,
              duration: getResponsiveValue(0.8, 1, 1.2),
              ease: "power2.inOut",
            },
            "+=1"
          )
          .to(
            card4Ref.current,
            {
              x: getResponsiveValue("0%", "0%", "0%"),
              y: 0,
              duration: getResponsiveValue(1, 1.25, 1.5),
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mockupImage4Ref.current,
            {
              y: getResponsiveValue("5%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            card4Ref.current,
            {
              scale: 0,
              duration: getResponsiveValue(0.8, 1, 1.2),
              ease: "power2.inOut",
            },
            "+=1"
          )
          .to(
            card5Ref.current,
            {
              x: getResponsiveValue("0%", "0%", "0%"),
              y: 0,
              duration: getResponsiveValue(1, 1.25, 1.5),
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mockupImage5Ref.current,
            {
              y: getResponsiveValue("5%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            card5Ref.current,
            {
              scale: 0,
              duration: getResponsiveValue(0.8, 1, 1.2),
              ease: "power2.inOut",
            },
            "+=1"
          )
          .to(
            card6Ref.current,
            {
              x: getResponsiveValue("0%", "0%", "0%"),
              y: 0,
              duration: getResponsiveValue(1, 1.25, 1.5),
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mockupImage6_1Ref.current,
            {
              y: getResponsiveValue("7%", "7.5%", "10%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            mockupImage6_2Ref.current,
            {
              y: getResponsiveValue("17%", "17.5%", "20%"),
              duration: getResponsiveValue(0.6, 0.8, 1),
              ease: "power3.out",
            },
            "-=0.3"
          );
      };

      updateAnimations();
      const debouncedUpdate = debounce(updateAnimations, 250);
      window.addEventListener("resize", debouncedUpdate);

      return () => {
        window.removeEventListener("resize", debouncedUpdate);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-[#f9f9f9] font-montserrat overflow-hidden"
    >
      <div className="relative w-full lg:max-w-[1229px] pb-8 sm:pb-12 lg:pb-16 mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-[95vw] sm:max-w-[90vw] mx-auto ">
          <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h2
              ref={textLine1Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[9vw] xl:text-[140px] font-montserrat font-normal leading-[0.9] tracking-tight mb-2 sm:mb-3"
            >
              <span className="text-[#9e9e9e] tracking-[-0.05em]">
                Everything
              </span>{" "}
            </h2>
            <h2
              ref={textLine2Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[9vw] xl:text-[140px] font-montserrat font-normal leading-[0.9] tracking-tight mb-2 sm:mb-3"
            >
              <span className="text-[#9e9e9e] tracking-[-0.08em]">
                you need in
              </span>{" "}
            </h2>

            <h2
              ref={textLine3Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[9vw]xl:text-[140px] font-montserrat font-normal leading-[0.9] tracking-tight"
            >
              <span className="text-black tracking-[-0.07em]">
                one platform
              </span>
            </h2>
            <p
              ref={textLine4Ref}
              className="text-black text-[3vw] w-[70%] mt-8 sm:text-[1vw] md:text-[1vw] lg:text-[1vw] xl:text-[20px] font-montserrat font-normal "
            >
              <span className="text-[#9e9e9e]">
                From earning opportunities to seamless payments,{" "}
              </span>
              bepay provides all the tools you need to manage your crypto
              finances.
            </p>
          </div>
        </div>

        {/*first card*/}
        <div
          ref={cardRef}
          className="absolute top-[48%] lg:top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[65vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full h-[20vh] md:aspect-[300/100] lg:aspect-auto lg:h-full bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImageRef} className="relative w-full h-full">
                <Image
                  src="/businessnew/mockupImage.png"
                  alt="Wallet Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  Self-Custody Wallet
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Complete control over your crypto assets with military-grade
                  security and multi-signature protection.
                </p>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className=" w-5 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/Self1.svg"
                    alt="Keys and Crypto"
                  />
                </div>
                <div>
                  <h3 className=" text-[10px] sm:text-sm font-medium text-black">
                    100% Private Key Ownership.Your keys, your Crypto.
                  </h3>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] sm:text-sm font-medium text-black">
                    100+ cryptocurrencies supported!
                  </span>
                  <div className="flex items-center space-x-1">
                    <Image
                      src="/businessnew/self2.svg"
                      width={200}
                      height={30}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] sm:text-sm font-medium text-black">
                    Social login integration
                  </span>
                  <div className="flex items-center space-x-1">
                    <Image
                      width={100}
                      height={20}
                      src="/businessnew/self3.svg"
                      alt="login"
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>

              <WaitlistTriggerButton>
                <button className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/buttonIcon.png"
                    alt="Create Wallet"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span>Create your wallet</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>

        {/*second card*/}
        <div
          ref={card2Ref}
          className="absolute top-[48%] lg:top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full h-[18vh] md:aspect-[300/100]  lg:aspect-auto lg:h-full bg-[#f8f8f8] rounded-xl sm:rounded-2xl overflow-hidden">
              <div
                ref={mockupImage2_1Ref}
                className="absolute transform -translate-x-8 sm:-translate-x-20 w-full h-full z-[2]"
              >
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Card Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
              <div
                ref={mockupImage2_2Ref}
                className="absolute w-full h-full z-[1]"
              >
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Card Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
              <div
                ref={mockupImage2_3Ref}
                className="absolute transform translate-x-8 sm:translate-x-20 w-full h-full z-[0]"
              >
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Card Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-2 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl lg:whitespace-nowrap md:text-3xl lg:text-4xl font-semibold text-black">
                  Virtual Crypto Debit Card
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Spend your crypto anywhere with our instant virtual debit
                  card. No waiting. No approvals.
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/Global icon.svg"
                    alt="virtual5"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Instant Activation & Global Acceptance.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/virtual2.svg"
                    alt="virutal3"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] lg:whitespace-nowrap sm:text-sm font-medium text-black">
                    Instant crypto-to-fiat conversion at competitive rates.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/virtual3.svg"
                    alt="virtualicon2"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    bepay App Integration & Advanced Security.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/virtual4.svg"
                    alt="virtual icon"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Cashback rewards on every purchase.
                  </h3>
                </div>
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center space-x-2 cursor-pointer sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/virtual5.svg"
                    alt="Get Card"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 "
                  />
                  <span>Get your crypto debit card now</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>

        {/*third card - Swiss IBAN Account*/}
        <div
          ref={card3Ref}
          className="absolute top-[48%] lg:top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full h-[22vh] md:aspect-[300/100]  lg:aspect-auto lg:h-full bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage3Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/IBAN0.svg"
                  alt="Swiss IBAN Account Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  Swiss IBAN Account
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Multi-currency on-chain banking for seamless cross-border
                  transfers.
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/IBAN1.svg"
                    alt="No transfer fee icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    CHF, EUR, USD, CNY & more.
                  </h3>
                </div>
                <div className="h-6 sm:h-5 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/IBAN2.svg"
                    alt="No transfer fee icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/IBAN3.svg"
                    alt="No transfer fee icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    No transfer fee.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/IBAN4.svg"
                    alt="Instant settlements icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Instant settlements.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/IBAN5.svg"
                    alt="Bank-grade security icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Bank-grade security.
                  </h3>
                </div>
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/IBAN6.svg"
                    alt="Get Swiss bank account"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span>Get a Swiss bank account</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>

        {/* fourth card */}
        <div
          ref={card4Ref}
          className="absolute top-[48%] lg:top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full h-[30vh] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage4Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/p2p1.svg"
                  alt="P2P Transactions Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  P2P Transactions
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Send and receive money instantly with friends and family
                  worldwide
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/p2p2.svg"
                    alt="No transfer fee icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Instant P2P transfers.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/p2p3.svg"
                    alt="Instant settlements icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    QR code payments.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/p2p4.svg"
                    alt="Bank-grade security icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Split payment options.
                  </h3>
                </div>
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center space-x-2 cursor-pointer sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/buttonIcon.png"
                    alt="Get Swiss bank account"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span>Start paying with crypto</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>

        {/* fifth card */}
        <div
          ref={card5Ref}
          className="absolute top-[48%] lg:top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full h-[29vh] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage5Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/qr1.svg"
                  alt="P2P Transactions Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  QR Code Payments
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Pay with crypto or fiat using simple QR codes at any merchant
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/qr2.svg"
                    alt="No transfer fee icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Fiat & crypto QR codes.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/qr3.svg"
                    alt="Instant settlements icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Offline payment capability.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/qr4.svg"
                    alt="Bank-grade security icon"
                    width={28}
                    height={28}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Merchant integration.
                  </h3>
                </div>
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/qr5.svg"
                    alt="Get Swiss bank account"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span>Start spending your crypto</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>

        {/* sixth card */}
        <div
          ref={card6Ref}
          className="absolute top-[48%] lg:top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2 w-[89vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            <div className="relative w-full aspect-[5/3] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div
                ref={mockupImage6_1Ref}
                className="absolute -top-[5%] left-[2.5%] w-[55%] h-[55%] z-[2]"
              >
                <Image
                  src="/businessnew/ai1.png"
                  alt="Card Mockup"
                  fill
                  quality={100}
                  className="rounded-xl object-contain"
                />
              </div>
              <div
                ref={mockupImage6_2Ref}
                className="absolute bottom-[12%] right-[2%] w-[55%] h-[55%] z-[1]"
              >
                <Image
                  src="/businessnew/ai2.png"
                  alt="Card Mockup"
                  fill
                  quality={100}
                  className="rounded-xl object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  AI Personalization
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  AI-powered insights and personalized financial recommendations
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/ai3.svg"
                    alt="No transfer fee icon"
                    width={28}
                    height={28}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Smart spending insights.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/ai4.svg"
                    alt="Instant settlements icon"
                    className="w-full h-full"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    Personalized investment advice.
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    src="/businessnew/ai6.svg"
                    alt="Bank-grade security icon"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    AI agent assistance.
                  </h3>
                </div>
              </div>
              <WaitlistTriggerButton>
                <button className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/ai5.svg"
                    alt="Get Swiss bank account"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span>Download app and get started</span>
                </button>
              </WaitlistTriggerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for the new Mobile horizontal scroll animation
const MobileView = () => {
  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  // MODIFICATION: Created separate refs for card 1 images
  const mobileImg1_1Ref = useRef(null);
  const mobileImg1_2Ref = useRef(null);

  const mobileImg2_1Ref = useRef(null);
  const mobileImg2_2Ref = useRef(null);
  const mobileImg2_3Ref = useRef(null);
  const mobileImg3Ref = useRef(null);
  const mobileImg4Ref = useRef(null);
  const mobileImg5Ref = useRef(null);
  const mobileImg6_1Ref = useRef(null);
  const mobileImg6_2Ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray(".mobile-card");
      const numCards = cards.length;

      if (sectionRef.current) {
        sectionRef.current.style.height = `${(numCards + 1) * 100}vh`;
      }

      let ctx = gsap.context(() => {
        gsap.set(headerRef.current, { y: "50vh", opacity: 0 });
        gsap.set(cardsWrapperRef.current, { x: "100vw" });

        // MODIFICATION: Set initial state for the first image (from bottom)
        gsap.set(
          [
            mobileImg1_1Ref.current,
            mobileImg2_1Ref.current,
            mobileImg2_2Ref.current,
            mobileImg2_3Ref.current,
            mobileImg3Ref.current,
            mobileImg4Ref.current,
            mobileImg5Ref.current,
            mobileImg6_1Ref.current,
            mobileImg6_2Ref.current,
          ],
          { yPercent: 100, scale: 1.1, opacity: 0 }
        );

        // MODIFICATION: Set initial state for the second image (from top)
        gsap.set(mobileImg1_2Ref.current, {
          yPercent: -100,
          scale: 1.1,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: stickyContainerRef.current,
            scrub: 1,
            end: () =>
              `+=${sectionRef.current.offsetHeight - window.innerHeight}`,
            snap: {
              snapTo: "labels",
              duration: 0.4,
              ease: "power2.inOut",
            },
          },
        });

        tl.addLabel("header");
        tl.to(headerRef.current, { y: 0, opacity: 1 });

        tl.addLabel("card1");
        tl.to(cardsWrapperRef.current, { x: 0 });
        tl.to(headerRef.current, { opacity: 0, scale: 0.9 }, "<");

        // MODIFICATION: Animate first image in (from bottom)
        tl.to(
          mobileImg1_1Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );

        // MODIFICATION: Animate second image in (from top)
        tl.to(
          mobileImg1_2Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<+=0.2" // Stagger the start time slightly
        );

        tl.addLabel("card2");
        tl.to(cardsWrapperRef.current, { x: -cards[1].offsetLeft });

        // MODIFICATION: Animate both images out
        tl.to(
          mobileImg1_1Ref.current,
          {
            yPercent: 100, // Goes back down
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );
        tl.to(
          mobileImg1_2Ref.current,
          {
            yPercent: -100, // Goes back up
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );

        // Animate in Card 2 images
        tl.to(
          mobileImg2_1Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );
        tl.to(
          mobileImg2_2Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<+=0.1"
        );
        tl.to(
          mobileImg2_3Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<+=0.1"
        );

        tl.addLabel("card3");
        tl.to(cardsWrapperRef.current, { x: -cards[2].offsetLeft });
        // Animate out Card 2 images
        tl.to(
          [
            mobileImg2_1Ref.current,
            mobileImg2_2Ref.current,
            mobileImg2_3Ref.current,
          ],
          {
            yPercent: 100,
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );
        tl.to(
          mobileImg3Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );

        tl.addLabel("card4");
        tl.to(cardsWrapperRef.current, { x: -cards[3].offsetLeft });
        tl.to(
          mobileImg3Ref.current,
          {
            yPercent: 100,
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );
        tl.to(
          mobileImg4Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );

        tl.addLabel("card5");
        tl.to(cardsWrapperRef.current, { x: -cards[4].offsetLeft });
        tl.to(
          mobileImg4Ref.current,
          {
            yPercent: 100,
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );
        tl.to(
          mobileImg5Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );

        tl.addLabel("card6");
        tl.to(cardsWrapperRef.current, { x: -cards[5].offsetLeft });
        tl.to(
          mobileImg5Ref.current,
          {
            yPercent: 100,
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "<"
        );
        // Animate in Card 6 images
        tl.to(
          mobileImg6_1Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );
        tl.to(
          mobileImg6_2Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<+=0.1"
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#f9f9f9] font-montserrat">
      <div
        ref={stickyContainerRef}
        className="w-full h-screen overflow-hidden relative z-10"
      >
        <div
          ref={headerRef}
          className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10"
        >
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter">
            <span className="text-[#9e9e9e] tracking-[-0.05em]">
              Everything
            </span>
          </h2>
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter">
            <span className="text-[#9e9e9e] tracking-[-0.08em]">
              you need in
            </span>
          </h2>
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter">
            <span className="text-black tracking-[-0.07em]">one platform</span>
          </h2>
          <p className="text-black text-[3.5vw] max-w-[90%] mt-4 font-normal">
            <span className="text-[#9e9e9e]">
              From earning opportunities to seamless payments,{" "}
            </span>
            bepay provides all the tools you need to manage your crypto
            finances.
          </p>
        </div>

        <div
          ref={cardsWrapperRef}
          className="absolute inset-0 flex w-max items-center gap-4 px-4 z-20"
        >
          {/* Card 1 */}
          <div className="mobile-card w-[90vw] h-[93vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                {/* MODIFICATION: Wrapped each image in a div with its own ref */}
                <div className="w-full h-full relative flex justify-center">
                  <div ref={mobileImg1_1Ref}>
                    <Image
                      src="/businessnew/mockupImage.png"
                      alt="Wallet Mockup"
                      width={120}
                      height={200}
                      className="object-contain p-0 mt-12 ml-3"
                    />
                  </div>
                  <div ref={mobileImg1_2Ref}>
                    <Image
                      src="/businessnew/updated.svg"
                      alt="Wallet Mockup Updated"
                      width={120}
                      height={200}
                      className="object-contain p-0 mt-0 ml-4"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-4 flex-grow space-y-3">
  <div className="space-y-2 -mt-13">
    <h1 className="text-xl font-semibold text-black ">
      Self-Custody Wallet
    </h1>
    <p className="text-sm text-gray-600 leading-snug">
      Complete control over your crypto assets with
      military-grade security.
    </p>
  </div>

  {/* Pointers Container */}
  <div className="flex flex-col space-y-3">
    {/* Pointer 1 */}
    <div className="flex items-center gap-2">
      <Image
        width={20}
        height={20}
        src="/businessnew/Self1.svg"
        alt="Keys and Crypto"
      />
      <p className="text-[10px] font-medium text-black">
        100% Private Key Ownership. Your keys, your Crypto.
      </p>
    </div>

    {/* Pointer 2 */}
    <div className="flex items-center gap-2">
      <Image
        src="/businessnew/self4.svg"
        width={20}
        height={20}
        alt=""
      />
      <p className="text-[10px] font-medium text-black">
        100+ cryptocurrencies <br/> supported!
      </p>
      <Image
        src="/businessnew/self2.svg"
        width={90}   // increased from 60
  height={40}
        alt=""
        className="ml-0 mt-[-12px]"
      />
    </div>

    {/* Pointer 3 */}
    <div className="flex items-center gap-2 mt-0">
      <Image
        src="/businessnew/self5.svg"
        width={20}
        height={20}
        alt=""
        className="mt-[-5px]"
      />
      <p className="text-[10px] font-medium text-black">
        Social login integration
      </p>
      <Image
        src="/businessnew/self3.svg"
        width={18}
        height={10}
        alt="login"
        className="ml-1 mt-[-2px]"
      />
      <Image
        src="/businessnew/self6.svg"
        width={18}
        height={10}
        alt="login"
        className="ml-1 mt-[-5px]"
      />

    </div>
  </div>

  {/* Button */}
  <WaitlistTriggerButton>
    <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors mt-4">
      <Image
        src="/businessnew/buttonIcon.png"
        alt="Create Wallet"
        width={24}
        height={24}
        className="w-5 h-5"
      />
      <span>Create your wallet</span>
    </button>
  </WaitlistTriggerButton>
</div>

            </div>
          </div>
          {/* Card 2 */}
          <div className="mobile-card w-[90vw] h-[93vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div
                  ref={mobileImg2_1Ref}
                  className="absolute transform -translate-x-8 w-full h-full z-[2]"
                >
                  <Image
                    src="/businessnew/cardImage_single.png"
                    alt="Card Mockup"
                    fill
                    className="object-contain p-4 -ml-10 mt-5"
                  />
                </div>
                <div
                  ref={mobileImg2_2Ref}
                  className="absolute w-full h-full z-[1]"
                >
                  <Image
                    src="/businessnew/cardImage_single.png"
                    alt="Card Mockup"
                    fill
                    className="object-contain p-4 mt-9"
                  />
                </div>
                <div
                  ref={mobileImg2_3Ref}
                  className="absolute transform translate-x-8 w-full h-full z-[0]"
                >
                  <Image
                    src="/businessnew/cardImage_single.png"
                    alt="Card Mockup"
                    fill
                    className="object-contain p-4 mt-12 ml-8"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-3 p-4 flex-grow">
                <div className="space-y-2 -mt-4">
                  <h1 className="text-xl font-semibold text-black leading-none">
                    Virtual Crypto Debit Card
                  </h1>
                  <p className="text-sm text-gray-600 leading-snug">
                    Spend your crypto anywhere with our instant virtual debit
                    card.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      width={28}
                      height={28}
                      src="/businessnew/Global icon.svg"
                      alt="virtual5"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Instant Activation & Global Acceptance.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      width={28}
                      height={28}
                      src="/businessnew/virtual2.svg"
                      alt="virutal3"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Instant crypto-to-fiat conversion at competitive rates.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      width={28}
                      height={28}
                      src="/businessnew/virtual3.svg"
                      alt="virtualicon2"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      bepay App Integration & Advanced Security.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      width={28}
                      height={28}
                      src="/businessnew/virtual4.svg"
                      alt="virtual icon"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Cashback rewards on every purchase.
                    </h3>
                  </div>
                </div>
                <WaitlistTriggerButton>
                  <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors">
                    <Image
                      src="/businessnew/virtual5.svg"
                      alt="Get Card"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                    <span>Get your crypto debit card</span>
                  </button>
                </WaitlistTriggerButton>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="mobile-card w-[90vw] h-[93vh]  flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div ref={mobileImg3Ref} className="w-full h-full relative">
                  <Image
                    src="/businessnew/IBAN0.svg"
                    alt="Swiss IBAN Mockup"
                    width={140}
                    height={200}
                    className="object-contain p-0 mt-4 ml-16 "
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-3 p-4 flex-grow">
                <div className="space-y-2 -mt-10">
                  <h1 className="text-xl font-semibold text-black">
                    Swiss IBAN Account
                  </h1>
                  <p className="text-sm text-gray-600 leading-snug">
                    Multi-currency on-chain banking for seamless cross-border
                    transfers.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/IBAN1.svg"
                      alt="currency icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      CHF, EUR, USD, CNY & more.
                    </h3>
                  </div>
                  <div className="h-5 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/IBAN2.svg"
                      alt="flags icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/IBAN3.svg"
                      alt="fee icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      No transfer fee.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/IBAN4.svg"
                      alt="settlements icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Instant settlements.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/IBAN5.svg"
                      alt="security icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Bank-grade security.
                    </h3>
                  </div>
                </div>
                <WaitlistTriggerButton>
                  <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors">
                    <Image
                      src="/businessnew/IBAN6.svg"
                      alt="Get account"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                    <span>Get a Swiss bank account</span>
                  </button>
                </WaitlistTriggerButton>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="mobile-card w-[90vw] h-[93vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div ref={mobileImg4Ref} className="w-full h-full relative">
                  <Image
                    src="/businessnew/p2p1.svg"
                    alt="P2P Mockup"
                    width={155}
                    height={117}
                    className="object-contain p-0 mt-7 ml-14 "
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-3 p-4 flex-grow">
                <div className="space-y-2 -mt-17">
                  <h1 className="text-xl font-semibold text-black">
                    P2P Transactions
                  </h1>
                  <p className="text-sm text-gray-600 leading-snug">
                    Send and receive money instantly with friends and family
                    worldwide.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/p2p2.svg"
                      alt="transfer icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Instant P2P transfers.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/p2p3.svg"
                      alt="qr icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      QR code payments.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/p2p4.svg"
                      alt="split icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Split payment options.
                    </h3>
                  </div>
                </div>
                <WaitlistTriggerButton>
                  <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors mt-4">
                    <Image
                      src="/businessnew/buttonIcon.png"
                      alt="Start paying"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                    <span>Start paying with crypto</span>
                  </button>
                </WaitlistTriggerButton>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="mobile-card w-[90vw] h-[93vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div ref={mobileImg5Ref} className="w-full h-full relative">
                  <Image
                    src="/businessnew/qr1.svg"
                    alt="QR Payment Mockup"
                    width={155}
                    height={117}
                    className="object-contain p-0 mt-7 ml-14"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-3 p-4 flex-grow">
                <div className="space-y-2 -mt-13">
                  <h1 className="text-xl font-semibold text-black">
                    QR Code Payments
                  </h1>
                  <p className="text-sm text-gray-600 leading-snug">
                    Pay with crypto or fiat using simple QR codes at any
                    merchant.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/qr2.svg"
                      alt="qr icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Fiat & crypto QR codes.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/qr3.svg"
                      alt="offline icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Offline payment capability.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/qr4.svg"
                      alt="merchant icon"
                      width={28}
                      height={28}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Merchant integration.
                    </h3>
                  </div>
                </div>
                <WaitlistTriggerButton>
                  <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors mt-5">
                    <Image
                      src="/businessnew/qr5.svg"
                      alt="Start spending"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                    <span>Start spending your crypto</span>
                  </button>
                </WaitlistTriggerButton>
              </div>
            </div>
          </div>
          {/* Card 6 */}
          <div className="mobile-card w-[90vw] h-[93vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%]  h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div
                  ref={mobileImg6_1Ref}
                  className="absolute -top-[5%] left-[2.5%] w-[50%] h-[50%] z-[2]"
                >
                  <Image
                    src="/businessnew/ai1.png"
                    alt="AI Mockup 1"
                    fill
                    quality={100}
                    className="rounded-xl object-contain mt-5 ml-0"
                  />
                </div>
                <div
                  ref={mobileImg6_2Ref}
                  className="absolute bottom-[12%] right-[2%] w-[50%] h-[50%] z-[1]"
                >
                  <Image
                    src="/businessnew/ai2.png"
                    alt="AI Mockup 2"
                    width={150}
                    height={120}
                    className="rounded-xl object-contain mt-0 ml-[-10px]"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-3 p-4 flex-grow">
                <div className="space-y-2 -mt-15">
                  <h1 className="text-xl font-semibold text-black">
                    AI Personalization
                  </h1>
                  <p className="text-sm text-gray-600 leading-snug">
                    AI-powered insights and personalized financial
                    recommendations.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/ai3.svg"
                      alt="insights icon"
                      width={28}
                      height={28}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Smart spending insights.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/ai4.svg"
                      alt="advice icon"
                      className="w-full h-full"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      Personalized investment advice.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0">
                    <Image
                      src="/businessnew/ai6.svg"
                      alt="agent icon"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-medium text-black">
                      AI agent assistance.
                    </h3>
                  </div>
                </div>
                <WaitlistTriggerButton>
                  <button className="bg-black cursor-pointer whitespace-nowrap text-white
      w-[221px] h-[56px] rounded-full flex items-center
      justify-center gap-2 text-xs font-normal
      hover:bg-gray-800 transition-colors">
                    <Image
                      src="/businessnew/ai5.svg"
                      alt="Download app"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                    <span>Download app and get started</span>
                  </button>
                </WaitlistTriggerButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Main component that switches between Mobile and Desktop views
export default function OneWallet() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}