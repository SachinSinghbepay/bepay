"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollTextAnimation = () => {
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const firstLineRef = useRef(null);
  const secondLineRef = useRef(null);
  const thirdLineRef = useRef(null);
  const fourthLineRef = useRef(null);
  const fifthLineRef = useRef(null);
  const cardSectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const lastCardLeftRef = useRef(null);
  const lastCardRightRef = useRef(null);
  const lastCardContentRef = useRef(null);
  const lastCardNumberRef = useRef(null);
  const downloadButton1Ref = useRef(null);
  const downloadButton2Ref = useRef(null);
  const downloadButton3Ref = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Card data
  const cardSets = [
    {
      id: 1,
      leftCard: {
        number: "1",
        title: "UPI Credit Card with",
        highlight: "unlimited 7% cashback & rewards ",
        description:
          "on every bill payment, mobile recharge, travel & ticket booking",
      },
      rightCard: {
        image: "/s1.png",
        alt: "Credit Cards",
      },
    },
    {
      id: 2,
      leftCard: {
        number: "2",
        title: "",
        highlight: "9%* returns ",
        description: "on Fixed Deposits (FDs)",
      },
      rightCard: {
        image: "/s2.png",
        alt: "Crypto Trading",
      },
    },
    {
      id: 3,
      leftCard: {
        number: "3",
        title: "Invest in ",
        highlight: "Gold & global real estate",
        description: "",
      },
      rightCard: {
        video: "/videos/crypto/invest1.mp4",
        alt: "Investment Platform",
      },
    },
    {
      id: 4,
      leftCard: {
        number: "4",
        title: "Withdraw money from ",
        highlight: "credit card to debit card",
        description: "",
      },
      rightCard: {
        video: "/videos/crypto/withdraw.mp4",
        alt: "Digital Banking",
      },
    },
    {
      id: 5,
      leftCard: {
        number: "5",
        title: "",
        highlight: "Crypto UPI – ",
        description: "send via QR, phone, email, or bepay ID",
      },
      rightCard: {
        video: "/videos/crypto/gym.mp4",
        alt: "Digital Banking",
      },
    },
    {
      id: 6,
      leftCard: {
        number: "6",
        title: "Get instant ",
        highlight: "Bitcoin backed loans",
        description: "",
      },
      rightCard: {
        video: "/videos/crypto/co1.mp4",
        alt: "Digital Banking",
      },
    },
    {
      id: 7,
      leftCard: {
        number: "7",
        title: "Insurance that covers your ",
        highlight: "life, health, car, home & more",
        description: "",
      },
      rightCard: {
        image: "/s7.png",
        alt: "Digital Banking",
      },
    },
    {
      id: 8,
      leftCard: {
        number: "8",
        title: "",
        highlight: " DeFi Marketplace ",
        description: " — Swap. Stake. Earn. All in one app.",
      },
      rightCard: {
        video: "/videos/crypto/last.mp4",
        alt: "Digital Banking",
      },
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent(
            "UPI - Super App and Scroll Animation section viewed"
          );
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const firstLine = firstLineRef.current;
    const secondLine = secondLineRef.current;
    const thirdLine = thirdLineRef.current;
    const fourthLine = fourthLineRef.current;
    const fifthLine = fifthLineRef.current;
    const cardSection = cardSectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const lastCardLeft = lastCardLeftRef.current;
    const lastCardRight = lastCardRightRef.current;
    const lastCardContent = lastCardContentRef.current;
    const lastCardNumber = lastCardNumberRef.current;
    const downloadButton1 = downloadButton1Ref.current;
    const downloadButton2 = downloadButton2Ref.current;
    const downloadButton3 = downloadButton3Ref.current;

    if (
      !container ||
      !firstLine ||
      !secondLine ||
      !thirdLine ||
      !fourthLine ||
      !fifthLine ||
      !cardSection ||
      !cardsContainer ||
      !lastCardLeft ||
      !lastCardRight ||
      !lastCardContent ||
      !lastCardNumber ||
      !downloadButton1 ||
      !downloadButton2 ||
      !downloadButton3 ||
      windowWidth === 0
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(cardSection, { opacity: 0, y: 100 });
      gsap.set([thirdLine, fourthLine, fifthLine], { opacity: 0, y: 50 });
      gsap.set([firstLine, secondLine], { opacity: 0, y: 100 });
      gsap.set(cardsContainer, { x: 0 });
      gsap.set([downloadButton1, downloadButton2, downloadButton3], {
        opacity: 0,
        y: 30,
      });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1000%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      mainTl
        .to([firstLine, secondLine], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        })
        .to(thirdLine, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.3")
        .to(fourthLine, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.3")
        .to(fifthLine, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.3")
        .to({}, { duration: 0.8 }, "+=0.5")
        .to(
          [thirdLine, fourthLine, fifthLine],
          {
            opacity: 0,
            y: 100,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          "+=0.2"
        )
        .to(
          cardSection,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          cardsContainer,
          {
            x: () => -(cardSets.length - 1) * windowWidth,
            duration: 12,
            ease: "none",
          },
          "+=0.5"
        )
        .to({}, { duration: 1.5 }, "lastCardHold")
        .to(
          lastCardLeft,
          {
            x: () => {
              if (windowWidth < 1024) {
                return 0;
              }
              const leftRect = lastCardLeft.getBoundingClientRect();
              const viewportCenter = window.innerWidth / 2;
              const cardCenter = leftRect.left + leftRect.width / 2;
              return viewportCenter - cardCenter;
            },
            zIndex: 10,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "lastCardHold+=0.3"
        )
        .to(
          lastCardRight,
          {
            x: () => {
              if (windowWidth < 1024) {
                return 0;
              }
              const rightRect = lastCardRight.getBoundingClientRect();
              const viewportCenter = window.innerWidth / 2;
              const cardCenter = rightRect.left + rightRect.width / 2;
              return viewportCenter - cardCenter;
            },
            zIndex: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "lastCardHold+=0.3"
        )
        .to(
          [lastCardContent, lastCardNumber],
          { y: -100, opacity: 0, duration: 0.8, ease: "power2.inOut" },
          "lastCardHold+=1.0"
        )
        .to(
          downloadButton1,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "lastCardHold+=1.5"
        )
        .to(
          downloadButton2,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "+=0.3"
        )
        .to(
          downloadButton3,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "+=0.3"
        )
        .to({}, { duration: 3 }, "+=0.5");
    }, container);
    
    return () => ctx.revert();
  }, [windowWidth, cardSets.length]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#F9F9F9] z-20 w-full min-h-screen overflow-hidden"
    >
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <div ref={firstLineRef} className="-mb-17">
          <span className="text-[140px] font-[400] tracking-[-0.08em] text-[#C0C0C0]">
            One{" "}
          </span>
          <span className="text-[140px] font-[400] tracking-[-0.08em] text-[#080808]">
            SuperApp.
          </span>
        </div>
        <div ref={secondLineRef} className="mb-8 lg:mb-12">
          <span className="text-[140px] font-[400] tracking-[-0.08em] text-[#C0C0C0]">
            Full Control.
          </span>
        </div>
        <div ref={thirdLineRef} className="mb-6 lg:-mb-5">
          <span
            className="text-[48px] font-[400] text-[#080808] leading-[100%] tracking-[-0.02em]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Send. Spend. Earn.
          </span>
        </div>
        <div ref={fourthLineRef} className="mb-6 lg:mb-2">
          <span
            className="text-[48px] font-[400] leading-[100px] tracking-[-0.02em] bg-clip-text text-transparent"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                "linear-gradient(90deg, #222222 0%, #666666 40%, #999999 100%)",
            }}
          >
            Crypto or UPI — it just works.
          </span>
        </div>
        <div ref={fifthLineRef} className="space-y-1">
          <p
            className="text-center font-[400] text-[16px] leading-[20px] text-[#080808] tracking-[0%]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Stop losing money to hidden fees and wasted rewards.
          </p>

          <p
            className="text-center font-[400] text-[16px] leading-[30px] tracking-[0%] text-[#080808]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Your ₹50,000 monthly spend could{" "}
            <span
              className="font-[600] tracking-[0%]"
              style={{
                fontFamily:
                  "'Open Sans', sans-Vsans-serif', fontWeight: 600, lineHeight: '30px'",
              }}
            >
              earn you up to ₹3,500 back
            </span>{" "}
            — automatically.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div ref={cardSectionRef} className="absolute inset-0 opacity-0">
        <div
          ref={cardsContainerRef}
          className="flex h-full"
          style={{ width: `${cardSets.length * 100}vw` }}
        >
          {cardSets.map((cardSet, index) => (
            <div
              key={cardSet.id}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center"
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full items-center">
                  {/* Left Card - Text Content */}
                  <div
                    ref={index === 7 ? lastCardLeftRef : null}
                    className="relative h-full max-w-[600px] w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-white shadow-[140px_140px_140px_0px_rgba(0,0,0,0.05)] mx-auto" // Updated shadow here
                    style={{ zIndex: index === 7 ? 10 : "auto" }}
                  >
                    <div
                      ref={index === 7 ? lastCardNumberRef : null}
                      className="absolute top-4 z-30 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8"
                    >
                      <span className="text-6xl sm:text-8xl lg:text-[120px] xl:text-[140px] font-[500] bg-gradient-to-b from-[#EDEDED] to-[#EDEDED1A] text-transparent bg-clip-text">
                        {cardSet.leftCard.number}
                      </span>
                    </div>
                    <div
                      ref={index === 7 ? lastCardContentRef : null}
                      className="absolute bottom-4 z-10 text-left left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12"
                    >
                      <p
                        className="text-base sm:text-lg max-w-[400px] text-[#6A6A6A] mb-3 lg:text-[40px] lg:font-normal lg:leading-[48px] lg:tracking-[-0.04em]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {cardSet.leftCard.title}
                        <span className="text-black font-semibold">
                          {" "}
                          {cardSet.leftCard.highlight}
                        </span>
                        {cardSet.leftCard.description}
                      </p>
                    </div>
                    {index === 7 && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 px-6">
                        <button
                          ref={downloadButton1Ref}
                          className="w-full lg:w-[260px] lg:h-[90px] bg-[#080808] text-white rounded-full lg:rounded-[61px] flex items-center justify-start gap-[10px] opacity-0 px-4 lg:pl-[40px] lg:pr-[50px] py-3 lg:py-[30px]"
                        >
                          <span>
                            <Image
                              src={"/apple.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="apple logo"
                            />
                          </span>
                          <span
                            className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Download on the App Store
                          </span>
                        </button>
                        <button
                          ref={downloadButton2Ref}
                          className="w-full lg:w-[260px] lg:h-[90px] bg-[#080808] text-white rounded-full lg:rounded-[61px] flex items-center justify-start gap-[10px] opacity-0 px-4 lg:pl-[40px] lg:pr-[50px] py-3 lg:py-[30px]"
                        >
                          <span>
                            <Image
                              src={"/playstore.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="playstore logo"
                            />
                          </span>
                          <span
                            className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Get the App on Google Play!
                          </span>
                        </button>
                        <button
                          ref={downloadButton3Ref}
                          className="w-full lg:w-[260px] lg:h-[90px] bg-[#080808] text-white rounded-full lg:rounded-[61px] flex items-center justify-start gap-[10px] opacity-0 px-4 lg:pl-[40px] lg:pr-[50px] py-3 lg:py-[30px]"
                        >
                          <span>
                            <Image
                              src={"/gal.png"}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt="gallery logo"
                            />
                          </span>
                          <span
                            className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Get it on the App Gallery!
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Right Card - Image / Video */}
                  <div
                    ref={index === 7 ? lastCardRightRef : null}
                    className="relative bg-[#D1D1D1] h-[350px] sm:h-[450px] max-w-[600px] mx-auto w-full lg:h-[500px] rounded-2xl lg:rounded-3xl flex items-end justify-center overflow-hidden"
                    style={{
                      zIndex: index === 7 ? 1 : "auto",
                    }}
                  >
                    {cardSet.rightCard.video ? (
                      <video
                        src={cardSet.rightCard.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                      />
                    ) : (
                      <Image
                        src={cardSet.rightCard.image || "/placeholder.svg"}
                        alt={cardSet.rightCard.alt}
                        fill
                        className={`${
                          index === 0 ? "object-contain" : "object-cover"
                        } w-full h-full rounded-2xl lg:rounded-3xl`}
                        priority={index === 0}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTextAnimation;