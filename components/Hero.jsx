"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useTransform, useScroll } from "framer-motion"; // ADD useScroll;
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

gsap.registerPlugin(ScrollTrigger);

// --- 1. Mobile Hero Component (Simplified/Different Layout) ---
const MobileHero = ({ containerRef, frameRef }) => {
  // Define Framer Motion scroll hook inside the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Customize your scroll range here if needed
  });

  const mobileMockupY = useTransform(scrollYProgress, [0, 0.5], [0, -1200]);
  const mobileContentY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0, 1]
  );
  useEffect(() => {
    // Since we are separating, we can add a simpler entrance animation here for mobile
    gsap.fromTo(
      frameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      ".mobile-title > div",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power1.out",
        delay: 0.3,
      }
    );
  }, [frameRef]);

  return (
    // Fixed: The root div needs a closing tag.
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <section className="bg-[#F9F9F9] h-full flex flex-col justify-start pt-6 md:pt-0">
          <div className="text-center pt-8">
           <h1 className="font-montserrat text-center leading-none">
  {/* MOVE */}
  <div
    className="text-[#B7B7B7]"
    style={{
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "100%",
      letterSpacing: "-0.12em", // -12%
      textAlign: "center",
    }}
  >
    MOVE
  </div>

  {/* MONEY */}
  <div
    className="text-[#6F6F6F] -mt-2"
    style={{
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "56px",
      lineHeight: "100%",
      letterSpacing: "-0.13em", // -13%
      textAlign: "center",
    }}
  >
    MONEY
  </div>

  {/* FREELY */}
  <div
    className="text-[#404040] -mt-4"
    style={{
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "90px",
      lineHeight: "100%",
      letterSpacing: "-0.11em", // -11%
      textAlign: "center",
    }}
  >
    FREELY
  </div>
</h1>


            {/* Simplified Mobile Mockup */}
            <motion.div
              className="absolute inset-x-0 top-60 flex justify-center"
              style={{ y: mobileMockupY }}
            >
              <div className="relative w-[85vw] max-w-[380px]">
                <Image
                  src="/phone_h.png"
                  alt="Bepay video mockup frame"
                  width={380}
                  height={211}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

     <motion.div
  style={{ y: mobileContentY, opacity: mobileContentOpacity }}
  className="mt-11 flex flex-col gap-3 text-sm items-center opacity-0"
>
  {/* 1. PAY. 2. EARN. 3. REPEAT. */}
  <div className="flex justify-center items-center gap-4 px-4 mb-10">
    
  {/* 1 PAY. */}
  <div className="flex items-baseline gap-2">
    <span
      style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 400,
        fontSize: "42.77px",
        lineHeight: "2.11px",
        color: "rgba(194, 193, 193, 0.5)", // #C2C1C1 at 10% opacity
      }}
    >
      1
    </span>
    <span
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "28.51px",
        lineHeight: "17.11px",
        letterSpacing: "-0.09em",
        textTransform: "uppercase",
        color: "#6A6A6A",
      }}
    >
      PAY.
    </span>
  </div>

  {/* 2 EARN. */}
  <div className="flex items-baseline gap-2">
    <span
      style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 400,
        fontSize: "42.77px",
        lineHeight: "2.11px",
        color: "rgba(194, 193, 193, 0.5)",
      }}
    >
      2
    </span>
    <span
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "28.51px",
        lineHeight: "17.11px",
        letterSpacing: "-0.09em",
        textTransform: "uppercase",
        color: "#6A6A6A",
      }}
    >
      EARN.
    </span>
  </div>

  {/* 3 REPEAT. */}
  <div className="flex items-baseline gap-2">
    <span
      style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 400,
        fontSize: "42.77px",
        lineHeight: "2.11px",
        color: "rgba(194, 193, 193, 0.5)",
      }}
    >
      3
    </span>
    <span
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "28.51px",
        lineHeight: "17.11px",
        letterSpacing: "-0.09em",
        textTransform: "uppercase",
        color: "#6A6A6A",
      }}
    >
      REPEAT.
    </span>
  </div>
</div>


  {/* 9%* returns on FDs! - MODIFIED BLOCK 1 */}
 <div className="flex flex-col gap-0">
  {/* 1️⃣ Returns Section */}
  <div className="flex items-center text-[18px]">
    <div className="p-3 rounded-xl mr-4 flex-shrink-0">
      <Image
        src="/a1.png"
        alt="High returns icon"
        width={64}
        height={64}
        className="h-11 w-auto"
      />
    </div>
    <div className="text-sm sm:text-lg">
      <span className="font-bold text-black">9%* returns</span>
      <span className="text-[#6A6A6A]"> on FDs!</span>
    </div>
  </div>

  {/* 2️⃣ Cashback & Rewards Section */}
  <div className="flex items-center text-[18px]">
    <div className=" p-3 rounded-xl mr-4 flex-shrink-0">
      <Image
        src="/a2.png"
        alt="Cashback and rewards icon"
        width={64}
        height={64}
        className="h-11 w-auto"
      />
    </div>
    <div className="text-sm sm:text-lg text-left">
      <span className="text-[#6A6A6A]">Up to </span>
      <span className="font-bold text-black">7% cashback & <br/> rewards</span>
      <span className="text-[#6A6A6A]"> on every spend!</span>
    </div>
  </div>
</div>

  {/* Up to 7% cashback & rewards on every spend! - MODIFIED BLOCK 2 */}
 
  {/* END: Image Content Block */}

  {/* Existing Buttons - MODIFIED DIMENSIONS */}
  <button
    className="bg-black text-white rounded-full flex items-center justify-center mt-2"
    style={{
      width: '265px',
      height: '83px',
      borderRadius: '61px',
      opacity: 1,
      gap: '10px',
      paddingTop: '20px',
      paddingRight: '60px',
      paddingBottom: '20px',
      paddingLeft: '60px',
    }}
  >
    <Image
      src="/apple.png"
      alt="Apple App Store"
      width={30}
      height={30}
      className="h-6 w-6"
    />
    <div className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
          style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div>Download on</div>
      <div>App Store</div>
    </div>
  </button>
  <button
    className="bg-black text-white rounded-full flex items-center justify-center"
    style={{
      width: '265px',
      height: '83px',
      borderRadius: '61px',
      opacity: 1,
      gap: '10px',
      paddingTop: '20px',
      paddingRight: '60px',
      paddingBottom: '20px',
      paddingLeft: '60px',
    }}
  >
    <Image
      src="/playstore.png"
      alt="Google Play Store"
      width={20}
      height={20}
      className="h-6 w-6"
    />
    <div className="font-semibold text-sm leading-5 tracking-[0.02em] text-left"
          style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div>Get the App on</div>
      <div>Google Play</div>
    </div>
  </button>
</motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- 2. Desktop Hero Component (Original Complex Scroll-Pinning) ---
const DesktopHero = ({ containerRef, logoRef, frameRef, cardSectionRef }) => {
  // --- GSAP Animation Logic for Desktop/Tablet Only ---
  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const frame = frameRef.current;
    const cardSection = cardSectionRef.current;

    // Ensure all previous triggers are killed before re-initializing
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf([logo, frame]);

    if (container && logo && frame && cardSection) {
      // Set initial states (using desktop/default values)
      gsap.set(frame, {
        y: "100%",
        scale: 0.95,
        transformOrigin: "center bottom",
      });
      gsap.set(
        ".payearnrepeat, .return-box, .download, .mockup, .account-frame, .stagger, .card",
        {
          opacity: 0,
        }
      );
      gsap.set(
        ".cardsection .cards .card-1, .cardsection .cards .card-2, .cardsection .cards .card-3, .cardsection .cards .card-4, .cardsection .cards .card-5, .cardsection .cards .card-6",
        {
          rotate: 0,
          y: 0,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1500", // Desktop end value
          scrub: true,
          pin: true,
          // markers: true,
        },
      });

      // Animation Sequence (Original Logic)
      tl.to(logo, {
        y: "-120%", // Desktop value
        opacity: 0,
        scale: 0.8,
      })
        .to(
          frame,
          {
            y: "0%",
            scale: 1,
          },
          "<"
        ) // Start at the same time

        // ---
        .to(".return-box", {
          y: 0,
          opacity: 1,
        })
        .to(
          ".payearnrepeat",
          {
            y: 0,
            opacity: 1,
          },
          "<"
        )
        .to(
          ".download",
          {
            y: 0,
            opacity: 1,
          },
          "<"
        )

        // ---
        .to(container, {
          y: "-200", // Desktop value
        })
        .to(".cardsection .mockup", {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
        })
        .to(
          ".cardsection .account-frame",
          {
            top: "0%",
            opacity: 1,
            scale: 1,
          },
          "<"
        )
        .to(
          ".cardsection .card",
          {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
          },
          "<"
        )
        .from(
          ".cardsection .stagger",
          {
            opacity: 0,
            y: "40", // Desktop value
            stagger: 0.2,
          },
          "<"
        )
        .to(".cardsection .stagger", {
          x: "80", // Desktop value
          stagger: 0.2,
        })
        .to(".cardsection .cards", {
          y: "-200", // Desktop value
          scale: 1, // Desktop value
        })
        .to(".cardsection .cards .card-1", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cards .card-2", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cards .card-3", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cards .card-4", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cards .card-5", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cards .card-6", {
          y: "-200", // Desktop value
          rotate: 45,
        })
        .to(".cardsection .cardbutton", {
          y: "-200", // Desktop value
          opacity: 1,
        })
        .to(".trusted .stagger", {
          opacity: 1,
          y: 0,
          stagger: 0.2,
        })
        .to(".footer .stagger", {
          opacity: 1,
          y: 0,
          stagger: 0.2,
        });
    }

    // Cleanup function for DesktopHero's effects
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([logo, frame]);
    };
  }, [containerRef, logoRef, frameRef, cardSectionRef]); // Dependencies are the refs

  // --- JSX for Desktop/Tablet View ---
  return (
    <section
      data-scroll-section
      ref={containerRef}
      className=" container mx-auto max-w-full relative h-[120vh] md:h-[180vh] bg-[#F9F9F9] "
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-start pt-8">
        <div className="relative">
          <h1
            ref={logoRef}
            className="font-bold leading-none font-montserrat text-center main-title"
          >
            <div className="text-[#B7B7B7] text-2xl sm:text-5xl md:text-5xl lg:text-[90px] font-[600] text-center tracking-[-0.12em]">
              MO<span className="tracking-[-0.08em]">V</span>E
            </div>
            <div className="text-[#6F6F6F] -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 text-6xl sm:text-9xl md:text-[140px] lg:text-[160px] font-[600] text-center tracking-[-0.13em]">
              MO<span className="tracking-[-0.18em]">N</span>EY
            </div>
            <div className="text-[#404040] -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-14 text-7xl sm:text-[180px] md:text-[220px] lg:text-[260px] font-[600] text-center leading-none tracking-[-0.11em]">
              FREELY
            </div>
          </h1>

          {/* All other desktop-specific JSX (floating elements, mockup, etc.) */}
          <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[320px] h-[600px] sm:max-w-[360px] sm:h-[700px] md:max-w-[400px] md:h-[800px] lg:max-w-[400px] lg:h-[820px] mx-auto">
              {/* Floating Images (Desktop Only) */}
              <Image
                src="/floating_1.png"
                width={450}
                height={350}
                alt="Floating UI element 1"
                style={{
                  filter: "drop-shadow(60px 60px 70px rgba(0, 0, 0, 0.1))",
                }}
                className="absolute z-2 top-1/2 scale-[0.5] sm:scale-[1] right-[90%] -mt-59"
              />
              <Image
                src="/floating_2.png"
                width={450}
                height={350}
                alt="Floating UI element 2"
                style={{
                  filter: "drop-shadow(60px 60px 70px rgba(0, 0, 0, 0.1))",
                }}
                className="absolute z-2 top-[22vh] left-[85%] scale-[0.5] sm:scale-[1]"
              />

              {/* Download Buttons (Styled for Desktop) */}
              <div className="download absolute top-[38vh] left-[36vw] scale-[0.8] sm:scale-[1] transform -translate-x-1/2 z-2 flex flex-col sm:flex-row gap-3 text-left text-[0.4rem] sm:text-[0.6rem] items-center">
                <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                  <Image
                    src="/apple.png"
                    alt="Apple App Store"
                    width={20}
                    height={20}
                    className="h-3 sm:h-5 w-auto"
                  />
                  <div className="text-left">
                    <div>Download on the</div>
                    <div>App Store</div>
                  </div>
                </button>
                <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                  <Image
                    src="/playstore.png"
                    alt="Google Play Store"
                    width={20}
                    height={20}
                    className="h-3 sm:h-5 w-auto"
                  />
                  <div className="text-left">
                    <div>Get the App on</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>

              {/* App Mockup */}
              <div
                data-scroll
                data-scroll-speed="0.2"
                className="absolute inset-0 bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[50px] overflow-hidden shadow-2xl"
              >
                <div ref={frameRef} className="absolute inset-0 w-full h-full">
                  <Image
                    src="/mobileframer.png"
                    alt="App Interface"
                    fill
                    className="object-contain p-2 sm:p-3 py-5 w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="mockup absolute inset-0 border-[4px] sm:border-[6px] md:border-8 z-1 border-black/10 rounded-[24px] sm:rounded-[36px] md:rounded-[46px] overflow-hidden pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. Main Hero Component (State and Conditional Rendering) ---
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const logoRef = useRef(null);
  const frameRef = useRef(null);
  const cardSectionRef = useRef(null);

  // Mobile Check useEffect (Runs on mount and resize)
  useEffect(() => {
    const checkMobile = () => {
      // Using 768px (Tailwind 'md' breakpoint) to differentiate desktop/mobile
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cleanup for resize listener
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Analytics Tracking (remains the same)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI - Hero section viewed");
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

  return (
    <div>
      {/* Conditional Rendering */}
      {isMobile ? (
        <MobileHero containerRef={containerRef} frameRef={frameRef} />
      ) : (
        <DesktopHero
          containerRef={containerRef}
          logoRef={logoRef}
          frameRef={frameRef}
          cardSectionRef={cardSectionRef}
        />
      )}
    </div>
  );
}
