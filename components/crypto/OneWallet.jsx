"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { IconSquareKey } from "@tabler/icons-react";
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

export default function OneWallet() {
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
  const mockupImage2Ref = useRef(null);
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

      // Adjust values based on both screen width and height
      if (width < 640 || height < 700) return mobile;
      if (width < 1000 || height < 800) return tablet;
      return desktop;
    };

    const updateAnimations = () => {
      // Set initial states with responsive values
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
          y: "100vh",
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

      // Create the main timeline with responsive scrub and duration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => {
            // Adjust end point based on screen size to ensure complete animation
            const width = window.innerWidth;
            if (width < 640) return "+=500%"; // More scroll space for mobile
            if (width < 1000) return "+=475%"; // Extra space for small tablets
            if (width < 1200) return "+=450%"; // Standard space for larger screens
            return "+=425%"; // Less space needed for very large screens
          },
          pin: true,
          pinSpacing: true,
          scrub: getResponsiveValue(0.8, 1, 1.2), // Slower scrub for smaller screens
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      // Add animations to timeline with responsive values
      tl
        // First animate the text lines
        .to(textLine1Ref.current, {
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
        // Then animate the first card
        .to(cardRef.current, {
          y: 0,
          duration: getResponsiveValue(1, 1.25, 1.5),
          ease: "power2.inOut",
        })
        // Animate the first mockup image
        .to(
          mockupImageRef.current,
          {
            y: getResponsiveValue("5%", "7.5%", "10%"),
            duration: getResponsiveValue(0.6, 0.8, 1),
            ease: "power3.out",
          },
          "-=0.3"
        )

        // Second card sequence - scale down first card and bring up second card
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

        // Third card sequence - scale down second card and bring up third card
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

        // Fourth card sequence - scale down third card and bring up fourth card
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

        // Fifth card sequence - scale down fourth card and bring up fifth card
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
        // sixth card sequence - scale down fourth card and bring up fifth card
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

    // Initial setup
    updateAnimations();

    // Update on resize
    const debouncedUpdate = debounce(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      updateAnimations();
    }, 250);

    window.addEventListener("resize", debouncedUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
              <span className="text-[#9e9e9e]">Everything</span>{" "}
            </h2>
            <h2
              ref={textLine2Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[9vw] xl:text-[140px] font-montserrat font-normal leading-[0.9] tracking-tight mb-2 sm:mb-3"
            >
              <span className="text-[#9e9e9e]">you need in</span>{" "}
            </h2>

            <h2
              ref={textLine3Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[9vw]xl:text-[140px] font-montserrat font-normal leading-[0.9] tracking-tight"
            >
              <span className="text-black">one platform</span>
            </h2>
            <p
              ref={textLine4Ref}
              className="text-[3vw] w-[70%] mt-8 sm:text-[1vw] md:text-[1vw] lg:text-[1vw] xl:text-[20px] font-montserrat font-normal "
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
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100] lg:aspect-auto lg:h-full bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImageRef} className="relative w-full h-full">
                <Image
                  src="/businessnew/mockupImage.png"
                  alt="Wallet Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Self-Custody Wallet Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  Self-Custody Wallet
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Complete control over your crypto assets with military-grade
                  security and multi-signature protection.
                </p>
              </div>

              {/* Private Key Ownership */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className=" w-5 sm:w-7 sm:h-7 rounded-full flex-shrink-0">
                  <Image
                    width={28}
                    height={28}
                    src="/businessnew/self1.svg"
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
                  {/* Cryptocurrency icons placeholder */}
                  <div className="flex   items-center space-x-1">
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

              {/* Cryptocurrency Support */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] sm:text-sm font-medium text-black">
                    Social login integration
                  </span>
                  {/* Cryptocurrency icons placeholder */}
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
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Stacked Cards Animation */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100]  lg:aspect-auto lg:h-full bg-[#f8f8f8] rounded-xl sm:rounded-2xl overflow-hidden">
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

            {/* Right Side - Updated Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Virtual Crypto Debit Card Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl lg:whitespace-nowrap md:text-3xl lg:text-4xl font-semibold text-black">
                  Virtual Crypto Debit Card
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Spend your crypto anywhere with our instant virtual debit
                  card. No waiting. No approvals.
                </p>
              </div>

              {/* Instant Activation & Global Acceptance */}
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

              {/* Instant crypto-to-fiat conversion */}
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

              {/* bepay App Integration */}
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

              {/* Cashback rewards */}
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
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100]  lg:aspect-auto lg:h-full bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage3Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/IBAN0.svg"
                  alt="Swiss IBAN Account Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            {/* Right Side - Swiss IBAN Account Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Swiss IBAN Account Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  Swiss IBAN Account
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Multi-currency on-chain banking for seamless cross-border
                  transfers.
                </p>
              </div>

              {/* Multi-currency support */}
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
              {/* No transfer fee */}
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

              {/* Instant settlements */}
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

              {/* Bank-grade security */}
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
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage4Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/p2p1.svg"
                  alt="P2P Transactions Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            {/* Right Side - P2P Transactions Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* P2P Transactions Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  P2P Transactions
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Send and receive money instantly with friends and family
                  worldwide
                </p>
              </div>

              {/* Instant P2P transfers */}
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

              {/* QR code payments */}
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

              {/* Split payment options */}
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
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div ref={mockupImage5Ref} className="relative w-full h-full">
                <Image
                  src="/businessnew/qr1.svg"
                  alt="P2P Transactions Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            {/* Right Side - P2P Transactions Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* P2P Transactions Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  QR Code Payments
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  Pay with crypto or fiat using simple QR codes at any merchant
                </p>
              </div>

              {/* Instant P2P transfers */}
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

              {/* QR code payments */}
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

              {/* Split payment options */}
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
          className="absolute top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1100px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-2">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[300/100] lg:aspect-auto lg:h-[500px] bg-[#f2f2f2] rounded-xl sm:rounded-2xl overflow-hidden">
              <div
                ref={mockupImage6_1Ref}
                className="absolute top-[5%] left-[2.5%] w-1/2 h-1/2 z-[2]"
              >
                <Image src="/businessnew/ai1.png" alt="Card Mockup" fill />
              </div>
              <div
                ref={mockupImage6_2Ref}
                className="absolute bottom-[10%] right-[5%] w-1/2 h-1/2 z-[1]"
              >
                <Image src="/businessnew/ai2.png" alt="Card Mockup" fill />
              </div>
            </div>

            {/* Right Side - P2P Transactions Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* P2P Transactions Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
                  AI Personalization
                </h1>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 leading-relaxed">
                  AI-powered insights and personalized financial recommendations
                </p>
              </div>

              {/* Instant P2P transfers */}
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

              {/* QR code payments */}
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

              {/* Split payment options */}
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
}
