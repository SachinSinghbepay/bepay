"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import service

gsap.registerPlugin(ScrollTrigger);

// Utility function for debouncing (unchanged)
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};

// Hook to detect mobile vs. desktop (unchanged)
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
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
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



  // ANALYTICS: Track when the main section is actually viewed
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasTrackedView) {
            AnalyticsService.sendEvent("One wallet section viewed");
            setHasTrackedView(true);
            observer.unobserve(entry.target); // Stop observing after first view
          }
        },
        { threshold: 0.1 } // Trigger when 30% of the component is visible
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => observer.disconnect();
    }, [hasTrackedView]);
    
  useEffect(() => {
  const refs = [
    { ref: cardRef, id: "card1", eventNamme: "Self-Custody Wallet" },
    { ref: card2Ref, id: "card2", eventNamme: "Virtual Crypto Debit Card" },
    { ref: card3Ref, id: "card3", eventNamme: "Swiss IBAN Account" },
    { ref: card4Ref, id: "card4", eventNamme: "P2P Transactions" },
    { ref: card5Ref, id: "card5", eventNamme: "QR Code Payments" },
    { ref: card6Ref, id: "card6", eventNamme: "AI Personalization" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.getAttribute("data-card-id");
          AnalyticsService.sendEvent( refs.find(obj => obj.id == cardId)?.eventNamme );
          observer.unobserve(entry.target); // ✅ stop observing after first trigger
        }
      });
    },
    { threshold: 0.3 } // triggers when 30% of card is visible
  );

  refs.forEach(({ ref, id }) => {
    if (ref.current) {
      ref.current.setAttribute("data-card-id", id);
      observer.observe(ref.current);
    }
  });

  return () => observer.disconnect(); // cleanup on unmount
}, []);


  // ANALYTICS: Handlers for button clicks
  const handleCreateWalletClick = () => AnalyticsService.sendEvent("Create your wallet button clicked");
  const handleGetDebitCardClick = () => AnalyticsService.sendEvent("Get your crypto debit card now button clicked");
  const handleGetSwissAccountClick = () => AnalyticsService.sendEvent("Get a Swiss bank account button clicked");
  const handleStartPayingClick = () => AnalyticsService.sendEvent("Start paying with crypto button clicked");
  const handleStartSpendingClick = () => AnalyticsService.sendEvent("Start spending your crypto button clicked");
  const handleDownloadAndStartClick = () => AnalyticsService.sendEvent("Download app and get started button clicked");

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

        tl.to(textLine1Ref.current, { y: 0, opacity: 1, duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }) .to( textLine2Ref.current, { y: 0, opacity: 1, duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.5" ) .to( textLine3Ref.current, { y: 0, opacity: 1, duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.5" ) .to( textLine4Ref.current, { y: 0, opacity: 1, duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.5" ) .to(cardRef.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }) .to( mockupImageRef.current, { y: getResponsiveValue("5%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( cardRef.current, { scale: 0, duration: getResponsiveValue(0.8, 1, 1.2), ease: "power2.inOut", }, "+=1" ) .to( card2Ref.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }, "-=1" ) .to( mockupImage2_1Ref.current, { y: getResponsiveValue("7%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( mockupImage2_2Ref.current, { y: getResponsiveValue("17%", "17.5%", "20%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( mockupImage2_3Ref.current, { y: getResponsiveValue("27%", "27.5%", "30%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( card2Ref.current, { scale: 0, duration: getResponsiveValue(0.8, 1, 1.2), ease: "power2.inOut", }, "+=1" ) .to( card3Ref.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }, "-=1" ) .to( mockupImage3Ref.current, { y: getResponsiveValue("5%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( card3Ref.current, { scale: 0, duration: getResponsiveValue(0.8, 1, 1.2), ease: "power2.inOut", }, "+=1" ) .to( card4Ref.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }, "-=1" ) .to( mockupImage4Ref.current, { y: getResponsiveValue("5%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( card4Ref.current, { scale: 0, duration: getResponsiveValue(0.8, 1, 1.2), ease: "power2.inOut", }, "+=1" ) .to( card5Ref.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }, "-=1" ) .to( mockupImage5Ref.current, { y: getResponsiveValue("5%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( card5Ref.current, { scale: 0, duration: getResponsiveValue(0.8, 1, 1.2), ease: "power2.inOut", }, "+=1" ) .to( card6Ref.current, { x: getResponsiveValue("0%", "0%", "0%"), y: 0, duration: getResponsiveValue(1, 1.25, 1.5), ease: "power2.inOut", }, "-=1" ) .to( mockupImage6_1Ref.current, { y: getResponsiveValue("7%", "7.5%", "10%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" ) .to( mockupImage6_2Ref.current, { y: getResponsiveValue("17%", "17.5%", "20%"), duration: getResponsiveValue(0.6, 0.8, 1), ease: "power3.out", }, "-=0.3" );

        // ANALYTICS: Create separate ScrollTriggers just for tracking views
        // ScrollTrigger.create({ trigger: cardRef.current, start: "top center", onEnter: () => trackCardView("Self-Custody Wallet"), once: true });
        // ScrollTrigger.create({ trigger: card2Ref.current, start: "top center", onEnter: () => trackCardView("Virtual Crypto Debit Card"), once: true });
        // ScrollTrigger.create({ trigger: card3Ref.current, start: "top center", onEnter: () => trackCardView("Swiss IBAN Account"), once: true });
        // ScrollTrigger.create({ trigger: card4Ref.current, start: "top center", onEnter: () => trackCardView("P2P Transactions"), once: true });
        // ScrollTrigger.create({ trigger: card5Ref.current, start: "top center", onEnter: () => trackCardView("QR Code Payments"), once: true });
        // ScrollTrigger.create({ trigger: card6Ref.current, start: "top center", onEnter: () => trackCardView("AI Personalization"), once: true });
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
                    src="/businessnew/Self1.svg"
                    alt="Private key icon"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-sm font-medium text-black">
                    100% Private Key Ownership.
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
              <WaitlistTriggerButton triggerSource="' self custody wallet' button">
                <button onClick={handleCreateWalletClick} className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
                  <Image
                    src="/businessnew/buttonIcon.png"
                    alt="Create wallet icon"
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
              <WaitlistTriggerButton triggerSource="'virtual crypto debit card' button">
                {/* FIX: onClick handler added */}
                <button onClick={handleGetDebitCardClick} className="flex items-center space-x-2 cursor-pointer sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
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
              <WaitlistTriggerButton triggerSource="'Swiss IBAN account' button">
                 {/* FIX: onClick handler added */}
                <button onClick={handleGetSwissAccountClick} className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
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
              <WaitlistTriggerButton triggerSource="'P2P transaction' button">
                <button onClick={handleStartPayingClick} className="flex items-center space-x-2 cursor-pointer sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
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
              <WaitlistTriggerButton triggerSource="'QR code payments' button">
                <button onClick={handleStartSpendingClick} className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
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

              <div className="flex items-center space-x-3 sm:space-y-4">
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
              <WaitlistTriggerButton triggerSource="'AI personalization' button">
                <button onClick={handleDownloadAndStartClick} className="flex items-center cursor-pointer space-x-2 sm:space-x-3 bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-medium hover:bg-black/90 transition-colors w-fit mt-2 sm:mt-4">
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
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event

  const stickyContainerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsWrapperRef = useRef(null);
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

  // ANALYTICS: Handlers for button clicks in mobile view
  const handleCreateWalletClick = () => AnalyticsService.sendEvent("Create your wallet button clicked");
  const handleGetDebitCardClick = () => AnalyticsService.sendEvent("Get your crypto debit card now button clicked");
  const handleGetSwissAccountClick = () => AnalyticsService.sendEvent("Get a Swiss bank account button clicked");
  const handleStartPayingClick = () => AnalyticsService.sendEvent("Start paying with crypto button clicked");
  const handleStartSpendingClick = () => AnalyticsService.sendEvent("Start spending your crypto button clicked");
  const handleDownloadAndStartClick = () => AnalyticsService.sendEvent("Download app and get started button clicked");

  useEffect(() => {
    // ANALYTICS: Ref to track which mobile cards have been viewed
    const viewedCardsRef = new Set();
    const trackMobileCardView = (cardName) => {
        if (!viewedCardsRef.has(cardName)) {
            AnalyticsService.sendEvent(`${cardName} viewed`);
            viewedCardsRef.add(cardName);
        }
    };

    // ANALYTICS: Track when the main section is actually viewed
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasTrackedView) {
              AnalyticsService.sendEvent("One wallet section viewed");
              setHasTrackedView(true);
              observer.unobserve(entry.target); // Stop observing after first view
            }
          },
          { threshold: 0.1 } // Trigger when 30% of the component is visible
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => observer.disconnect();
      }, [hasTrackedView]);

    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray(".mobile-card");
      const numCards = cards.length;

      if (sectionRef.current) {
        sectionRef.current.style.height = `${(numCards + 1) * 100}vh`;
      }

      let ctx = gsap.context(() => {
        gsap.set(headerRef.current, { y: "50vh", opacity: 0 });
        gsap.set(cardsWrapperRef.current, { x: "100vw" });
        gsap.set([mobileImg1_1Ref.current, mobileImg3Ref.current, mobileImg4Ref.current, mobileImg5Ref.current, mobileImg6_1Ref.current, mobileImg6_2Ref.current,], { yPercent: 100, scale: 1.1, opacity: 0 });
        gsap.set([mobileImg2_1Ref.current, mobileImg2_2Ref.current, mobileImg2_3Ref.current,], { yPercent: 100, scale: 1.1 });
        gsap.set(mobileImg1_2Ref.current, { yPercent: -100, scale: 1.1, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: stickyContainerRef.current,
            scrub: 1,
            end: () => `+=${sectionRef.current.offsetHeight - window.innerHeight}`,
            snap: { snapTo: "labels", duration: 0.4, ease: "power2.inOut", },
            // ANALYTICS: Use onUpdate to check the current label and fire view events
            onUpdate: () => {
              const currentLabel = tl.currentLabel();
              if (currentLabel === 'card1') trackMobileCardView('Self-Custody Wallet');
              if (currentLabel === 'card2') trackMobileCardView('Virtual Crypto Debit Card');
              if (currentLabel === 'card3') trackMobileCardView('Swiss IBAN Account');
              if (currentLabel === 'card4') trackMobileCardView('P2P Transactions');
              if (currentLabel === 'card5') trackMobileCardView('QR Code Payments');
              if (currentLabel === 'card6') trackMobileCardView('AI Personalization');
            }
          },
        });

        tl.addLabel("header"); tl.to(headerRef.current, { y: 0, opacity: 1 }); tl.addLabel("card1"); tl.to(cardsWrapperRef.current, { x: 0 }); tl.to(headerRef.current, { opacity: 0, scale: 0.9 }, "<"); tl.to( mobileImg1_1Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.to( mobileImg1_2Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<+=0.2" ); tl.addLabel("card2"); tl.to(cardsWrapperRef.current, { x: -cards[1].offsetLeft }); tl.to( mobileImg1_1Ref.current, { yPercent: 100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg1_2Ref.current, { yPercent: -100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg2_1Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.to( mobileImg2_2Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<+=0.1" ); tl.to( mobileImg2_3Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<+=0.1" ); tl.addLabel("card3"); tl.to(cardsWrapperRef.current, { x: -cards[2].offsetLeft }); tl.to( [ mobileImg2_1Ref.current, mobileImg2_2Ref.current, mobileImg2_3Ref.current, ], { yPercent: 100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg3Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.addLabel("card4"); tl.to(cardsWrapperRef.current, { x: -cards[3].offsetLeft }); tl.to( mobileImg3Ref.current, { yPercent: 100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg4Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.addLabel("card5"); tl.to(cardsWrapperRef.current, { x: -cards[4].offsetLeft }); tl.to( mobileImg4Ref.current, { yPercent: 100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg5Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.addLabel("card6"); tl.to(cardsWrapperRef.current, { x: -cards[5].offsetLeft }); tl.to( mobileImg5Ref.current, { yPercent: 100, scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in", }, "<" ); tl.to( mobileImg6_1Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<" ); tl.to( mobileImg6_2Ref.current, { yPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", }, "<+=0.1" );

      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#f9f9f9] font-montserrat">
      <div ref={stickyContainerRef} className="w-full h-screen overflow-hidden relative z-10">
        <div ref={headerRef} className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10 pt-16">
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter"> <span className="text-[#9e9e9e] tracking-[-0.05em]"> Everything </span> </h2>
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter"> <span className="text-[#9e9e9e] tracking-[-0.08em]"> you need in </span> </h2>
          <h2 className="text-[11vw] font-normal leading-[0.9] tracking-tighter"> <span className="text-black tracking-[-0.07em]">one platform</span> </h2>
          <p className="text-black text-[3.5vw] max-w-[90%] mt-4 font-normal"> <span className="text-[#9e9e9e]"> From earning opportunities to seamless payments,{" "} </span> bepay provides all the tools you need to manage your crypto finances. </p>
        </div>
        <div ref={cardsWrapperRef} className="absolute inset-0 flex w-max items-center gap-4 px-4 z-20">
          
          {/* Card 1 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div className="w-full h-full relative flex justify-center">
                  <div ref={mobileImg1_1Ref}> <Image src="/businessnew/mockupImage.png" alt="Wallet Mockup" width={120} height={200} className="object-contain p-0 mt-20 ml-0" /> </div>
                  <div ref={mobileImg1_2Ref}> <Image src="/businessnew/updated.svg" alt="Wallet Mockup Updated" width={120} height={200} className="object-contain p-0 mt-0 ml-4" /> </div>
                </div>
              </div>
              <div className="flex flex-col p-4 pb-8 flex-grow space-y-3">
                <div className="space-y-2 -mt-3"> <h1 className="text-xl font-semibold text-black "> Self-Custody Wallet </h1> <p className="text-sm text-gray-600 leading-snug"> Complete control over your crypto assets with military-grade security. </p> </div>
                <div className="flex items-center gap-2"> <Image width={20} height={20} src="/businessnew/Self1.svg" alt="Keys and Crypto" /> <p className="text-xs font-medium text-black"> 100% Private Key Ownership. Your keys, your Crypto. </p> </div>
                <div className="flex items-center gap-2"> <Image src="/businessnew/self4.svg" width={20} height={20} alt="Cryptocurrency icons" /> <p className="text-xs font-medium text-black"> 100+ cryptocurrencies <br /> supported! </p> <Image src="/businessnew/self2.svg" width={90} height={40} alt="Supported cryptocurrency logos" className="ml-0 mt-[-12px]" /> </div>
                <div className="flex items-center gap-2 mt-0"> <Image src="/businessnew/self5.svg" width={20} height={20} alt="Login icon" className="mt-[-5px]" /> <p className="text-xs font-medium text-black"> Social login integration </p> <Image src="/businessnew/self3.svg" width={18} height={10} alt="Google login icon" className="ml-1 mt-[-2px]" /> <Image src="/businessnew/self6.svg" width={18} height={10} alt="Apple login icon" className="ml-1 mt-[-5px]" /> </div>
                <div className="mt-8">
                  <WaitlistTriggerButton triggerSource="'create your wallet' button">
                    <button onClick={handleCreateWalletClick} className="bg-black cursor-pointer -mt-5 whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                      <Image src="/businessnew/buttonIcon.png" alt="Create Wallet" width={20} height={20} className="w-5 h-5" />
                      <span>Create your wallet</span>
                    </button>
                  </WaitlistTriggerButton>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                <div ref={mobileImg2_1Ref} className="absolute transform -translate-x-8 w-full h-full z-[2]"> <Image src="/businessnew/cardImage_single.png" alt="Card Mockup" fill className="object-contain p-4 -ml-0 mt-4" /> </div>
                <div ref={mobileImg2_2Ref} className="absolute w-full h-full z-[1]"> <Image src="/businessnew/cardImage_single.png" alt="Card Mockup" fill className="object-contain p-4 ml-1 mt-10" /> </div>
                <div ref={mobileImg2_3Ref} className="absolute transform translate-x-8 w-full h-full z-[0]"> <Image src="/businessnew/cardImage_single.png" alt="Card Mockup" fill className="object-contain p-4 mt-16 ml-1" /> </div>
              </div>
              <div className="flex flex-col p-4 pb-8 flex-grow space-y-3 mt-2">
                <div className="space-y-2 -mt-4"> <h1 className="text-xl font-semibold text-black leading-none pt-1"> Virtual Crypto Debit Card </h1> <p className="text-sm text-gray-600 leading-snug"> Spend your crypto anywhere with our instant virtual debit card. No waiting. No approval. </p> </div>
                <div className="flex items-center space-x-3 -mt-0"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image width={28} height={28} src="/businessnew/Global icon.svg" alt="Global acceptance icon" /> </div> <div> <p className="text-xs font-medium text-black"> Instant Activation & Global Acceptance. </p> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image width={28} height={28} src="/businessnew/virtual2.svg" alt="Crypto to fiat conversion icon" /> </div> <div> <p className="text-xs font-medium text-black"> Instant crypto-to-fiat conversion at competitive rates. </p> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image width={28} height={28} src="/businessnew/virtual3.svg" alt="App integration icon" /> </div> <div> <p className="text-xs font-medium text-black"> bepay App Integration & Advanced Security. </p> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image width={28} height={28} src="/businessnew/virtual4.svg" alt="Cashback rewards icon" /> </div> <div> <p className="text-xs font-medium text-black"> Cashback rewards on every purchase. </p> </div> </div>
                <div className="mt-0">
                  <WaitlistTriggerButton triggerSource="'virtual cryto debit card' button">
                    <button onClick={handleGetDebitCardClick} className="bg-black mt-2 cursor-pointer whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                      <Image src="/businessnew/virtual5.svg" alt="Get Card" width={20} height={20} className="w-5 h-5" />
                      <span>Get your crypto debit card</span>
                    </button>
                  </WaitlistTriggerButton>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden"> <div ref={mobileImg3Ref} className="relative"> <Image src="/businessnew/IBAN0.svg" alt="Swiss IBAN Mockup" width={140} height={200} className="object-contain mx-auto mt-12" /> </div> </div>
              <div className="flex flex-col p-4 pb-8 flex-grow space-y-3">
                <div className="space-y-2 -mt-3"> <h1 className="text-xl font-semibold text-black"> Swiss IBAN Account </h1> <p className="text-sm text-gray-600 leading-snug"> Multi-currency on-chain banking for seamless cross-border transfers. </p> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/IBAN1.svg" alt="currency icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> CHF, EUR, USD, CNY & more. </p> </div> <div className="h-5 rounded-full flex-shrink-0"> <Image src="/businessnew/IBAN2.svg" alt="flags icon" className="w-full h-full" width={28} height={28} /> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/IBAN3.svg" alt="fee icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> No transfer fee. </p> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/IBAN4.svg" alt="settlements icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Instant settlements. </p> </div> </div>
                <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/IBAN5.svg" alt="security icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Bank-grade security. </p> </div> </div>
                <div className="mt-8">
                  <WaitlistTriggerButton triggerSource="'swiss IBAN account' button">
                    <button onClick={handleGetSwissAccountClick} className="bg-black cursor-pointer -mt-6 whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                      <Image src="/businessnew/IBAN6.svg" alt="Get account" width={20} height={20} className="w-5 h-5" />
                      <span>Get a Swiss bank account</span>
                    </button>
                  </WaitlistTriggerButton>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden"> <div ref={mobileImg4Ref} className="relative"> <Image src="/businessnew/p2p1.svg" alt="P2P Mockup" width={155} height={117} className="object-contain mx-auto mt-16" /> </div> </div>
                <div className="flex flex-col p-4 pb-8 flex-grow space-y-3">
                    <div className="space-y-2 -mt-2"> <h1 className="text-xl font-semibold text-black"> P2P Transactions </h1> <p className="text-sm text-gray-600 leading-snug"> Send and receive money instantly with friends and family worldwide. </p> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/p2p2.svg" alt="transfer icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Instant P2P transfers. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/p2p3.svg" alt="qr icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> QR code payments. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/p2p4.svg" alt="split icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Split payment options. </p> </div> </div>
                    <div className="mt-8">
                        <WaitlistTriggerButton triggerSource="'P2P transactions' button">
                            <button onClick={handleStartPayingClick} className="bg-black cursor-pointer -mt-6 whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                                <Image src="/businessnew/buttonIcon.png" alt="Start paying" width={20} height={20} className="w-5 h-5" />
                                <span>Start paying with crypto</span>
                            </button>
                        </WaitlistTriggerButton>
                    </div>
                </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden"> <div ref={mobileImg5Ref} className="relative"> <Image src="/businessnew/qr1.svg" alt="QR Payment Mockup" width={155} height={117} className="object-contain mx-auto mt-16" /> </div> </div>
                <div className="flex flex-col p-4 pb-8 flex-grow space-y-3">
                    <div className="space-y-2 -mt-2"> <h1 className="text-xl font-semibold text-black"> QR Code Payments </h1> <p className="text-sm text-gray-600 leading-snug"> Pay with crypto or fiat using simple QR codes at any merchant. </p> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/qr2.svg" alt="qr icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Fiat & crypto QR codes. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/qr3.svg" alt="offline icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Offline payment capability. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/qr4.svg" alt="merchant icon" width={28} height={28} className="w-full h-full" /> </div> <div> <p className="text-xs font-medium text-black"> Merchant integration. </p> </div> </div>
                    <div className="mt-8">
                        <WaitlistTriggerButton triggerSource="'QR code payments' button">
                            <button onClick={handleStartSpendingClick} className="bg-black cursor-pointer -mt-6 whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                                <Image src="/businessnew/qr5.svg" alt="Start spending" width={20} height={20} className="w-5 h-5" />
                                <span>Start spending your crypto</span>
                            </button>
                        </WaitlistTriggerButton>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Card 6 */}
          <div className="mobile-card w-[90vw] h-[88vh] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="relative w-[95%] h-[40%] bg-[#f2f2f2] m-2 rounded-xl ml-2 overflow-hidden">
                    <div ref={mobileImg6_1Ref} className="absolute -top-[5%] left-[2.5%] w-[50%] h-[50%] z-[2]"> <Image src="/businessnew/ai1.png" alt="AI Mockup 1" fill quality={100} className="rounded-xl object-contain mt-5 ml-0" /> </div>
                    <div ref={mobileImg6_2Ref} className="absolute bottom-[8%] right-[2%] w-[50%] h-[50%] z-[1]"> <Image src="/businessnew/ai2.png" alt="AI Mockup 2" width={150} height={120} className="rounded-xl object-contain mt-1.5 ml-[-4px]" /> </div>
                </div>
                <div className="flex flex-col p-4 pb-8 flex-grow space-y-3">
                    <div className="space-y-2 -mt-1"> <h1 className="text-xl font-semibold text-black"> AI Personalization </h1> <p className="text-sm text-gray-600 leading-snug"> AI-powered insights and personalized financial recommendations. </p> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/ai3.svg" alt="insights icon" width={28} height={28} className="w-full h-full" /> </div> <div> <p className="text-xs font-medium text-black"> Smart spending insights. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/ai4.svg" alt="advice icon" className="w-full h-full" width={28} height={28} /> </div> <div> <p className="text-xs font-medium text-black"> Personalized investment advice. </p> </div> </div>
                    <div className="flex items-center space-x-3"> <div className="w-6 h-6 rounded-full flex-shrink-0"> <Image src="/businessnew/ai6.svg" alt="agent icon" width={28} height={28} className="w-full h-full object-contain" /> </div> <div> <p className="text-xs font-medium text-black"> AI agent assistance. </p> </div> </div>
                    <div className="mt-8">
                        <WaitlistTriggerButton triggerSource="'AI personalization' button">
                            <button onClick={handleDownloadAndStartClick} className="bg-black cursor-pointer -mt-6 whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors">
                                <Image src="/businessnew/ai5.svg" alt="Download app" width={20} height={20} className="w-5 h-5" />
                                <span>Download app and get started</span>
                            </button>
                        </WaitlistTriggerButton>
                    </div>
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