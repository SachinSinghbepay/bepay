"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useTransform, useScroll } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnalyticsService } from "@/services/analyticsService";
import { useAppDownload } from "@/hooks/useAppDownload"
import { AppDownloadPopups } from "@/components/AppDownloadPopups"

// --- Font Optimization: The BEST way to improve LCP for text elements ---
import { Montserrat, Open_Sans } from "next/font/google";

// Define the fonts once (Montserrat for headings, Open Sans for body text)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat", // Use CSS variable for easier application
  display: "swap", // Ensures text is visible during load (good for LCP)
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans", // Use CSS variable for easier application
  display: "swap",
});
// ----------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

// --- 1. Mobile Hero Component (Optimized) ---
const MobileHero = ({ containerRef, frameRef, openSmartDownload  }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mobileMockupY = useTransform(scrollYProgress, [0, 0.5], [0, -1200]);
  const mobileContentY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0, 1]
  );

  // Minimal initial GSAP animation for quick LCP
  useEffect(() => {
    gsap.fromTo(
      frameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    // Optimized: Use the CSS variable for the initial text stagger
    gsap.fromTo(
      ".mobile-title-word",
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
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <section className="bg-[#F9F9F9] h-full flex flex-col justify-start pt-6 md:pt-0">
          <div className="text-center pt-8">
            <h1 className={`${montserrat.className} text-center leading-none mobile-title`}>
              {/* LCP Text: Applied Next.js font and class for GSAP */}
              <div
                className="text-[#B7B7B7] mobile-title-word"
                style={{
                  fontWeight: 600,
                  fontSize: "32px",
                  lineHeight: "100%",
                  letterSpacing: "-0.12em",
                }}
              >
                MOVE
              </div>
              <div
                className="text-[#6F6F6F] -mt-2 mobile-title-word"
                style={{
                  fontWeight: 600,
                  fontSize: "56px",
                  lineHeight: "100%",
                  letterSpacing: "-0.13em",
                }}
              >
                MONEY
              </div>
              <div
                className="text-[#404040] -mt-4 mobile-title-word"
                style={{
                  fontWeight: 600,
                  fontSize: "90px",
                  lineHeight: "100%",
                  letterSpacing: "-0.11em",
                }}
              >
                FREELY
              </div>
            </h1>

            {/* LCP Image Optimization: Added 'priority' and using next/image */}
            <motion.div
              className="absolute inset-x-0 top-60 flex justify-center"
              style={{
                y: mobileMockupY,
                filter: "drop-shadow(50px 50px 100px rgba(0, 0, 0, 0.07))", // Added shadow
              }}
            >
              <div className="relative w-[85vw] max-w-[380px]">
                <Image
                  src="/phone_h.png"
                  alt="Bepay video mockup frame"
                  width={380}
                  height={211}
                  className="w-full h-auto"
                  priority // <--- CRITICAL FOR LCP
                />
              </div>
            </motion.div>

            {/* Content using optimized fonts */}
            <motion.div
              style={{ y: mobileContentY, opacity: mobileContentOpacity }}
              className={`mt-11 flex flex-col gap-3 text-sm items-center opacity-0 ${montserrat.variable} ${openSans.variable} font-sans`}
            >
              {/* 1. PAY. 2. EARN. 3. REPEAT. (Using Open Sans and Montserrat classes) */}
              <div className="flex justify-center items-center gap-4 px-4 mb-10">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${openSans.className}`}
                    style={{
                      fontWeight: 400,
                      fontSize: "42.77px",
                      lineHeight: "2.11px",
                      color: "rgba(194, 193, 193, 0.5)",
                    }}
                  >
                    1
                  </span>
                  <span
                    className={`${montserrat.className}`}
                    style={{
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
                {/* ... (Other PAY/EARN/REPEAT blocks use the same font structure) ... */}
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${openSans.className}`}
                    style={{
                      fontWeight: 400,
                      fontSize: "42.77px",
                      lineHeight: "2.11px",
                      color: "rgba(194, 193, 193, 0.5)",
                    }}
                  >
                    2
                  </span>
                  <span
                    className={`${montserrat.className}`}
                    style={{
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
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${openSans.className}`}
                    style={{
                      fontWeight: 400,
                      fontSize: "42.77px",
                      lineHeight: "2.11px",
                      color: "rgba(194, 193, 193, 0.5)",
                    }}
                  >
                    3
                  </span>
                  <span
                    className={`${montserrat.className}`}
                    style={{
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

              {/* Icon blocks (Lazy loading for smaller icons is fine) */}
              <div className="flex flex-col gap-0">
                <div className="flex items-center text-[18px] -mb-2">
                  <div className="p-3 rounded-xl mr-1 flex-shrink-0">
                    <Image
                      src="/a1.png"
                      alt="High returns icon"
                      width={64}
                      height={64}
                      className="h-12 w-auto"
                      loading="lazy" // Added: Not critical for LCP
                    />
                  </div>
                  <div className="text-sm sm:text-lg">
                    <span className="font-bold text-black">9%* returns</span>
                    <span className="text-[#6A6A6A]"> on FDs!</span>
                  </div>
                </div>

                <div className="flex items-center text-[18px]">
                  <div className=" p-3 rounded-xl mr-1 flex-shrink-0">
                    <Image
                      src="/a2.png"
                      alt="Cashback and rewards icon"
                      width={64}
                      height={64}
                      className="h-12 w-auto"
                      loading="lazy" // Added: Not critical for LCP
                    />
                  </div>
                  <div className="text-sm sm:text-lg text-left">
                    <span className="text-[#6A6A6A]">Up to </span>
                    <span className="font-bold text-black">7% cashback & <br /> rewards</span>
                    <span className="text-[#6A6A6A]"> on every spend!</span>
                  </div>
                </div>
              </div>

              {/* Buttons (Using optimized Open Sans) */}
              <button
                onClick={() => openSmartDownload("ios")}
                className={`bg-black text-white rounded-full flex items-center justify-center mt-2 ${openSans.className}`}
                style={{
                  width: '260px',
                  height: '80px',
                  borderRadius: '61px',
                  gap: '15px',
                  padding: '20px 50px',
                }}
              >
                <Image
                  src="/apple.png"
                  alt="Apple App Store"
                  width={24}
                  height={24}
                  className="object-contain"
                  loading="lazy" // Added: Not critical for LCP
                />
                <div
                  className="font-semibold text-[14px] leading-5 tracking-[0.02em] text-left"
                >
                  <div>Download on</div>
                  <div>App Store</div>
                </div>
              </button>

              <button
                onClick={() => openSmartDownload("android")}
                className={`bg-black text-white rounded-full flex items-center justify-center ${openSans.className}`}
                style={{
                  width: '260px',
                  height: '80px',
                  borderRadius: '61px',
                  gap: '15px',
                  padding: '20px 50px',
                }}
              >
                <Image
                  src="/playstore.png"
                  alt="Google Play Store"
                  width={24}
                  height={24}
                  className="object-contain"
                  loading="lazy" // Added: Not critical for LCP
                />
                <div
                  className="font-semibold text-[14px] leading-5 tracking-[0.02em] text-left"
                >
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

// --- 2. Desktop Hero Component (Optimized) ---
const DesktopHero = ({ containerRef, logoRef, frameRef, cardSectionRef,   openSmartDownload, }) => {
  // --- GSAP Animation Logic for Desktop/Tablet Only ---
  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const frame = frameRef.current;
    const cardSection = cardSectionRef.current;

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
      // ... (Initial card set logic remains the same)
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
          end: "+=1500",
          scrub: true,
          pin: true,
        },
      });

      // Animation Sequence (LCP elements revealed first)
      tl.to(logo, {
        y: "-120%",
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
        ) // App Mockup (LCP candidate) is revealed quickly
        // ... (Rest of the animation sequence is the same)
        .to(".return-box", { y: 0, opacity: 1 })
        .to(".payearnrepeat", { y: 0, opacity: 1 }, "<")
        .to(".download", { y: 0, opacity: 1 }, "<")
        .to(container, { y: "-200" })
        .to(".cardsection .mockup", { y: 0, x: 0, opacity: 1, scale: 1 })
        .to(".cardsection .account-frame", { top: "0%", opacity: 1, scale: 1 }, "<")
        .to(".cardsection .card", { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }, "<")
        .from(".cardsection .stagger", { opacity: 0, y: "40", stagger: 0.2 }, "<")
        .to(".cardsection .stagger", { x: "80", stagger: 0.2 })
        .to(".cardsection .cards", { y: "-200", scale: 1 })
        .to(".cardsection .cards .card-1", { y: "-200", rotate: 45 })
        .to(".cardsection .cards .card-2", { y: "-200", rotate: 45 })
        .to(".cardsection .cards .card-3", { y: "-200", rotate: 45 })
        .to(".cardsection .cards .card-4", { y: "-200", rotate: 45 })
        .to(".cardsection .cards .card-5", { y: "-200", rotate: 45 })
        .to(".cardsection .cards .card-6", { y: "-200", rotate: 45 })
        .to(".cardsection .cardbutton", { y: "-200", opacity: 1 })
        .to(".trusted .stagger", { opacity: 1, y: 0, stagger: 0.2 })
        .to(".footer .stagger", { opacity: 1, y: 0, stagger: 0.2 });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([logo, frame]);
    };
  }, [containerRef, logoRef, frameRef, cardSectionRef]);

  // --- JSX for Desktop/Tablet View (Optimized) ---
  return (
    <section
      data-scroll-section
      ref={containerRef}
      className=" container mx-auto max-w-full relative h-[120vh] md:h-[180vh] bg-[#F9F9F9] "
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-start pt-8">
        <div className="relative">
          {/* LCP Text: Applied Next.js font class */}
          <h1
            ref={logoRef}
            className={`${montserrat.className} font-bold leading-none text-center main-title`}
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

          <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[320px] h-[600px] sm:max-w-[360px] sm:h-[700px] md:max-w-[400px] md:h-[800px] lg:max-w-[400px] lg:h-[820px] mx-auto">
              {/* Floating Images: Using lazy loading and smaller dimensions, as they are not LCP */}
              <Image
                src="/floating_1.png"
                width={300} // Reduced initial size for faster load
                height={233}
                alt="Floating UI element 1"
                loading="lazy"
                style={{
                  filter: "drop-shadow(60px 60px 70px rgba(0, 0, 0, 0.1))",
                }}
                className="absolute z-2 top-1/2 scale-[0.5] sm:scale-[1] right-[90%] -mt-59"
              />
              <Image
                src="/floating_2.png"
                width={300} // Reduced initial size for faster load
                height={233}
                alt="Floating UI element 2"
                loading="lazy"
                style={{
                  filter: "drop-shadow(60px 60px 70px rgba(0, 0, 0, 0.1))",
                }}
                className="absolute z-2 top-[22vh] left-[85%] scale-[0.5] sm:scale-[1]"
              />

              {/* Download Buttons: Applied optimized Open Sans font class */}
              <div className={`download absolute top-[38vh] left-[36vw] scale-[0.8] sm:scale-[1] transform -translate-x-1/2 z-2 flex flex-col sm:flex-row gap-3 text-left text-[0.4rem] sm:text-[0.6rem] items-center ${openSans.className}`}>
                <button
                  onClick={() => openSmartDownload("ios")}
                  className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                  <Image
                    src="/apple.png"
                    alt="Apple App Store"
                    width={20}
                    height={20}
                    className="h-3 sm:h-5 w-auto"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div>Download on the</div>
                    <div>App Store</div>
                  </div>
                </button>
                <button
                  onClick={() => openSmartDownload("android")}
                  className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                  <Image
                    src="/playstore.png"
                    alt="Google Play Store"
                    width={20}
                    height={20}
                    className="h-3 sm:h-5 w-auto"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div>Get the App on</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>

              {/* App Mockup (LCP Candidate) */}
              <div ref={frameRef} className="absolute inset-0 w-full h-full">
                <Image
                  src="/phone_h.png"
                  alt="App Interface"
                  fill
                  className="object-contain w-full h-full"
                  priority // <--- CRITICAL FOR LCP
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. Main Hero Component (FIXED) ---
export default function Hero() {

  const {
    setIsQRPopupOpen,
    setSelectedOS,
    isQRPopupOpen,
    setIsOSPopupOpen,
    isOSPopupOpen,
    selectedOS,
  } = useAppDownload()

  const openSmartDownload = (targetOS) => {
    const ua = navigator.userAgent || navigator.vendor || window.opera

    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
    const isAndroid = /android/i.test(ua)
    const isMobile = isIOS || isAndroid

    const links = {
      ios: process.env.NEXT_PUBLIC_IOS_APP_URL,
      android: process.env.NEXT_PUBLIC_ANDROID_APP_URL,
    }

    // If mobile & OS matches → redirect
    if (isMobile) {
      if ((isIOS && targetOS === "ios") || (isAndroid && targetOS === "android")) {
        window.location.href = links[targetOS]
        return
      }
    }

    // Otherwise show QR
    setSelectedOS(targetOS)
    setIsOSPopupOpen(false)
    setIsQRPopupOpen(true)
  }

  // ** FIX **: Add hasMounted state to prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const logoRef = useRef(null);
  const frameRef = useRef(null);
  const cardSectionRef = useRef(null);

  useEffect(() => {
    // 1. Mark as mounted (client-side execution started)
    setHasMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []); // Run once on client mount

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

  // ** FIX **: Render a placeholder until the client environment is known
  if (!hasMounted) {
    return (
      // Render a simple div that takes up the expected space to avoid layout shift
      <div className="h-[120vh] md:h-[180vh] w-full bg-[#F9F9F9]" />
    );
  }

  // Once mounted, render the correct component based on isMobile
  return (
    <>
      <div className={`${montserrat.variable} ${openSans.variable}`}> {/* Apply font variables to the root */}
        {isMobile ? (
          <MobileHero
            containerRef={containerRef}
            frameRef={frameRef}
            openSmartDownload={openSmartDownload}
          />
        ) : (
          <DesktopHero
            containerRef={containerRef}
            logoRef={logoRef}
            frameRef={frameRef}
            cardSectionRef={cardSectionRef}
            openSmartDownload={openSmartDownload}
          />
        )}


      </div>
      <AppDownloadPopups
        isOSPopupOpen={false}
        setIsOSPopupOpen={() => { }}
        isQRPopupOpen={isQRPopupOpen}
        setIsQRPopupOpen={setIsQRPopupOpen}
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
      />
    </>
  );
}