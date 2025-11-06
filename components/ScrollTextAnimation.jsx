"use client";

import { useEffect, useRef, useState, useCallback } from "react"; // 👈 ADDED useCallback
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

  // Refs for the new last card (Card 7)
  const lastCardLeftRef = useRef(null);
  const lastCardRightRef = useRef(null);
  const lastCardContentRef = useRef(null);
  const lastCardNumberRef = useRef(null);

  const downloadButtonsContainerRef = useRef(null);
  const downloadButton1Ref = useRef(null);
  const downloadButton2Ref = useRef(null);
  const downloadButton3Ref = useRef(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth < 1024; // Check for desktop breakpoint (Tailwind 'lg')

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
        highlight: "UPI – ",
        description: "send via QR, phone, email, or bepay ID",
      },
      rightCard: {
        video: "/videos/crypto/gym.mp4",
        alt: "Digital Banking",
      },
    },
    {
      id: 7,
      leftCard: {
        number: "6",
        title: "Insurance that covers your ",
        highlight: "life, health, car, home & more",
        description: "",
      },
      rightCard: {
        image: "/s7.png",
        alt: "Digital Banking",
      },
    },
  ];

  const finalCardSets = cardSets;

  /**
   * Helper to determine the index of the card currently in view on mobile.
   * This is used to dynamically adjust the z-index for overlapping shadows.
   */
  const getCurrentCardIndex = useCallback(() => { // 👈 WRAPPED in useCallback
    if (!cardsContainerRef.current || !isMobile || windowWidth === 0) return 0;

    const scrollLeft = cardsContainerRef.current.scrollLeft;
    // Card width + margin = 80vw + 10vw = 90vw (0.9 * windowWidth)
    const cardWidthWithMargin = windowWidth * 0.9; 

    // Adjust for the 10vw margin on the first card
    const effectiveScrollLeft = Math.max(0, scrollLeft);

    let index = Math.round(effectiveScrollLeft / cardWidthWithMargin);

    return Math.min(Math.max(0, index), finalCardSets.length - 1);
  }, [isMobile, windowWidth, finalCardSets.length]); // 👈 Added dependencies

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Update current card index on mobile scroll
  useEffect(() => {
    if (!isMobile || !cardsContainerRef.current) return;

    const container = cardsContainerRef.current;
    let timeout;

    const handleScroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setCurrentCardIndex(getCurrentCardIndex());
        }, 100);
    };

    container.addEventListener('scroll', handleScroll);
    
    return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(timeout);
    };
  }, [isMobile, windowWidth, finalCardSets.length, getCurrentCardIndex]); // 👈 ADDED getCurrentCardIndex to fix the warning


  // Analytics Tracking
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

  // Window Width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Animation useEffect - Desktop only
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

    const downloadButtonsContainer = downloadButtonsContainerRef.current;
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
      !downloadButtonsContainer ||
      !downloadButton1 ||
      !downloadButton2 ||
      !downloadButton3 ||
      windowWidth === 0
    )
      return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");

    const ctx = gsap.context(() => {
      if (!isMobile) {
        gsap.set(cardSection, { opacity: 0, y: 100 });
        gsap.set([thirdLine, fourthLine, fifthLine], { opacity: 0, y: 50 });
        gsap.set([firstLine, secondLine], { opacity: 0, y: 100 });
        gsap.set(cardsContainer, { x: 0 });
        gsap.set(downloadButtonsContainer, { opacity: 0, y: 50 });
        gsap.set([downloadButton1, downloadButton2, downloadButton3], {
          opacity: 0,
          y: 30,
        });

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=900%",
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
              x: () => -(finalCardSets.length - 1) * windowWidth,
              duration: 8,
              ease: "none",
            },
            "+=0.5"
          )
          .to({}, { duration: 2 }, "lastCardHold")
          .to(
            lastCardRight,
            {
              x: () => {
                if (windowWidth < 1024) {
                  return 0;
                }
                return "-56%";
              },
              y: 0,
              opacity: 1,
              zIndex: 1,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "lastCardHold+=0.3"
          )
          .to(
            lastCardLeft,
            {
              x: () => {
                if (windowWidth < 1024) {
                  return 0;
                }
                return "50%";
              },
              y: 0,
              zIndex: 10,
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
            downloadButtonsContainer,
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "lastCardHold+=1.6"
          )
          .to(
            downloadButton1,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "lastCardHold+=1.8"
          )
          .to(
            downloadButton2,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "lastCardHold+=2.1"
          )
          .to(
            downloadButton3,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "lastCardHold+=2.4"
          )
          .to({}, { duration: 3 }, "+=0.5");
      }
    }, container);

    return () => ctx.revert();
  }, [windowWidth, finalCardSets.length, isMobile]);

  // Helper component for the download buttons
  const DownloadButtons = ({ buttonRef, id, src, alt, text }) => {
    return (
      <button
        ref={buttonRef}
        className={`rounded-[61px] bg-[#080808] text-white flex items-center gap-[10px] ${isMobile ? "opacity-100 justify-center" : "opacity-0 justify-start"}`}
        style={{
          borderRadius: '61px',
          width: isMobile ? '265px' : '260px',
          height: isMobile ? '83px' : '90px',
          paddingTop: isMobile ? '20px' : '30px',
          paddingRight: isMobile ? '55px' : '50px',
          paddingBottom: isMobile ? '20px' : '30px',
          paddingLeft: isMobile ? '55px' : '40px',
        }}
      >
        <span>
          <Image
            src={src}
            width={22}
            height={22}
            className="h-6 w-7"
            alt={alt}
          />
        </span>
        <span
          className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {text}
        </span>
      </button>
    );
  };

  return (
    <>
      {isMobile && (
        <style jsx global>{`
          .mobile-scroll-hide-bar::-webkit-scrollbar {
            display: none;
          }
          .mobile-scroll-hide-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      )}

      <div
        ref={containerRef}
        className={`relative z-20 w-full overflow-hidden ${isMobile ? "min-h-auto bg-[#F6F6F6]" : "min-h-screen bg-[#F9F9F9]"}`}
      >
        {/* Text Content */}
        <div className={`absolute inset-0 flex flex-col items-center text-center px-4 ${isMobile ? "relative justify-start pt-10" : "justify-center"}`}>

          {/* Main Heading: One SuperApp. Full Control. */}
          <div ref={firstLineRef} className="lg:mb-2 lg:mt-30">
            <span
              className="text-[40px] leading-[34.54px] tracking-[-0.08em] text-[#C0C0C0] lg:text-4xl md:text-6xl lg:text-8xl xl:text-[140px] lg:font-[400] "
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              One{" "}
            </span>
            <span
              className="text-[40px] leading-[34.54px] tracking-[-0.08em] text-[#080808] lg:text-4xl md:text-6xl lg:text-8xl xl:text-[140px] lg:font-[400] lg:text-black"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              SuperApp.
            </span>
          </div>
          <div ref={secondLineRef} className="mb-8 lg:mb-32">
            <span
              className="text-[40px] leading-[34.54px] tracking-[-0.08em] lg:leading-[100px] text-[#C0C0C0] lg:text-4xl md:text-6xl lg:text-8xl xl:text-[140px] lg:font-[400] lg:text-[#C0C0C0]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Full Control.
            </span>
          </div>

          {/* Subheading: Send. Spend. Earn. */}
          <div ref={thirdLineRef} className="mb-0 lg:mb-2">
            <span
              className="
                text-[#333333]
                font-[400]
                leading-[100%]
                tracking-[-0.02em]
                text-[20px]
                font-montserrat
                lg:text-[48px]
                lg:font-open-sans
              "
              style={{
                fontFamily:
                  'var(--font-montserrat, Montserrat, sans-serif)',
              }}
            >
              Send. Spend. Earn.
            </span>
          </div>

          {/* Subheading: Crypto or UPI — it just works. */}
          <div ref={fourthLineRef} className="mb-6 lg:mb-2">
            <span
              className={`font-[400] tracking-[-0.02em] lg:text-lg sm:text-xl md:text-2xl lg:text-3xl lg:text-gray-400 ${isMobile ? "hidden" : "block"}`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              UPI — it just works.
            </span>
          </div>

          {/* Subheading paragraphs */}
          <div ref={fifthLineRef} className="space-y-1 lg:space-y-1">
            <p
              className="
                text-center
                font-[400]
                text-[#080808]
                tracking-[0]
                text-[12px]
                leading-[32px]
                font-montserrat
                lg:text-[16px]
                lg:leading-[20px]
                lg:font-open-sans
              "
              style={{
                fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
              }}
            >
              Stop losing money to hidden fees and wasted rewards.
            </p>

            <p
              className="
                text-center
                text-[#080808]
                font-[400]
                text-[12px]
                leading-[13.11px]
                tracking-[0]
                font-montserrat
                lg:text-[16px]
                lg:leading-[30px]
                lg:font-open-sans
              "
            >
              Your ₹50,000 monthly spend could{" "}
              <span
                className="
                  font-[600]
                  tracking-[0]
                  font-montserrat
                  text-[12px]
                  leading-[5.11px]
                  lg:font-open-sans
                  lg:text-[16px]
                  lg:leading-[30px]
                "
              >
                earn you up to ₹3,500 back — automatically.
              </span>{" "}

            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div
          ref={cardSectionRef}
          className={`${isMobile ? "relative opacity-100 mt-0 pb-12" : "absolute inset-0 opacity-0"}`}
        >
          <div
            ref={cardsContainerRef}
            className={`flex h-full ${isMobile ? "overflow-x-scroll whitespace-nowrap pt-12 mobile-scroll-hide-bar" : ""}`}
            style={
              isMobile
                ? {
                    width: "100%",
                    transform: "none",
                    // REMOVED paddingLeft: "10vw" to fix mobile scroll view starting point
                  }
                : { width: `${finalCardSets.length * 100}vw` }
            }
          >
            {finalCardSets.map((cardSet, index) => {
              let currentZIndex = 1;  
              if (isMobile) {
                  // Logic to keep the active card on top for mobile shadow overlap
                  if (index === currentCardIndex) {
                      currentZIndex = 20;
                  } else if (index === currentCardIndex + 1) {
                      currentZIndex = 10;
                  } else {
                      currentZIndex = 1;
                  }
              }

              return (
                <div
                  key={cardSet.id}
                  // ADDED ml-[10vw] for the first card to inset it, making the subsequent card's 10vw visible
                  className={`flex-shrink-0 h-full flex items-center ${isMobile ? "w-[80vw] mr-[5vw] justify-start" : "w-screen justify-center"} ${isMobile && index === 0 ? "ml-[5vw]" : ""}`} 
                >
                  <div className={`w-full mx-auto ${isMobile ? "px-0" : "max-w-7xl px-4 sm:px-6 lg:px-8"}`}>
                    <div className="grid h-full items-center grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                      {/* Left Card - Text Content */}
                      <div
                        ref={cardSet.id === 7 ? lastCardLeftRef : null}
                        className={`flex justify-center item-center relative h-full max-w-[600px] w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-white mx-auto 
                          ${isMobile ? "" : "shadow-xl border border-gray-200"}`}
                        style={{ 
                            zIndex: isMobile ? currentZIndex : (cardSet.id === 7 ? 10 : "auto"),
                            ...(isMobile ? {
                              borderRadius: '26.4px',
                              borderWidth: '1.2px',
                              borderColor: '#EFEFEF',
                              boxShadow: '60px 20px 30px -20px rgba(0, 0, 0, 0.05), 80px 30px 120px -90px rgba(0, 0, 0, 0.02)'
                            } : {})
                        }}
                      >
                        <div>
                          <div
                          ref={cardSet.id === 7 ? lastCardNumberRef : null}
                          className="absolute top-4 z-30 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8"
                          >
                            <span
                              className="text-6xl sm:text-8xl lg:text-[120px] xl:text-[140px] font-[500] bg-gradient-to-b from-[#EDEDED] to-[#EDEDED1A] text-transparent bg-clip-text"
                              style={isMobile ? { fontFamily: "'Open Sans', sans-serif" } : { fontFamily: 'Montserrat, sans-serif' }}
                            >
                              {cardSet.leftCard.number}
                            </span>
                          </div>
                          <div
                            ref={cardSet.id === 7 ? lastCardContentRef : null}
                            className="absolute bottom-4 z-10 text-left left-6 sm:left-8 lg:left-12 right-6 lg:right-12"
                          >
                            <p
                              className={`text-[20px] whitespace-normal mb-3 ${isMobile ? "text-[#6A6A6A]" : "text-base sm:text-lg max-w-[400px] lg:text-2xl text-gray-600"}`}
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
                          {cardSet.id === 7 && !isMobile && (
                            <div
                              ref={downloadButtonsContainerRef}
                              className="absolute  bottom-12 left-[26%] space-y-3 z-50"
                              style={{ opacity: 0 }}
                            >
                              <DownloadButtons
                                buttonRef={downloadButton1Ref}
                                id="downloadButton1"
                                src="/apple.png"
                                alt="apple logo"
                                text="Download on the App Store"
                              />
                              <DownloadButtons
                                buttonRef={downloadButton2Ref}
                                id="downloadButton2"
                                src="/playstore.png"
                                alt="playstore logo"
                                text="Get the App on Google Play!"
                              />
                              <DownloadButtons
                                buttonRef={downloadButton3Ref}
                                id="downloadButton3"
                                src="/gal.png"
                                alt="gallery logo"
                                text="Get it on the App Gallery!"
                              />
                            </div>
                          )}
                        </div>
                      </div>


                      {/* Right Card - Image / Video (Hidden on Mobile) */}
                      <div
                        ref={cardSet.id === 7 ? lastCardRightRef : null}
                        className={`relative bg-[#D1D1D1] h-[350px] sm:h-[450px] max-w-[600px] mx-auto w-full lg:h-[500px] rounded-2xl lg:rounded-3xl items-end justify-center overflow-hidden ${isMobile ? "hidden" : "flex shadow-xl"}`}
                        style={{
                          border: isMobile ? "none" : "1px solid rgba(255,255,255,0.2)",
                          zIndex: cardSet.id === 7 && !isMobile ? 1 : "auto",
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
                          <div className={`${index === 0 ? "w-[90%] h-[90%] mb-0" : "w-full h-full"} relative`}>
                            <Image
                              src={cardSet.rightCard.image || "/placeholder.svg"}
                              alt={cardSet.rightCard.alt}
                              fill
                              className={`${
                                index === 0 ? "object-contain" : "object-cover"
                              } w-full h-full rounded-2xl lg:rounded-3xl`}
                              priority={index === 0}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Download Buttons Section - Mobile Only */}
      {isMobile && (
        <div className="bg-[#F6F6F6] flex flex-col items-center space-y-3 px-4 w-full mt-0 pb-12">
          <DownloadButtons
            buttonRef={downloadButton1Ref}
            id="downloadButton1-mobile"
            src="/apple.png"
            alt="apple logo"
            text="Download on the App Store"
          />
          <DownloadButtons
            buttonRef={downloadButton2Ref}
            id="downloadButton2-mobile"
            src="/playstore.png"
            alt="playstore logo"
            text="Get the App on Google Play!"
          />
          <DownloadButtons
            buttonRef={downloadButton3Ref}
            id="downloadButton3-mobile"
            src="/gal.png"
            alt="gallery logo"
            text="Get it on the App Gallery!"
          />
        </div>
      )}
    </>
  );
};

export default ScrollTextAnimation;