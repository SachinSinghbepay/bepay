"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
  const logoRef = useRef(null);
  const frameRef = useRef(null);
  const cardSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI - Hero section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const container = containerRef.current;
    const logo = logoRef.current;
    const frame = frameRef.current;
    const cardSection = cardSectionRef.current;

    // Clean up previous animations and triggers on resize or component re-render
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf([logo, frame]);

    if (container && logo && frame && cardSection) {
      // Set initial states
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
          end: isMobile ? "+=1500" : "+=1500",
          scrub: true,
          pin: true,
          // markers: true,
        },
      });

      // Animation Sequence
      tl.to(logo, {
        y: isMobile ? "-80%" : "-120%",
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
        ) // Start at the same time as the previous tween

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
          y: isMobile ? "-150" : "-200",
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
            y: isMobile ? "20" : "40",
            stagger: 0.2,
          },
          "<"
        )
        .to(".cardsection .stagger", {
          x: isMobile ? "40" : "80",
          stagger: 0.2,
        })
        .to(".cardsection .cards", {
          y: isMobile ? "-150" : "-200",
          scale: isMobile ? 0.9 : 1,
        })
        .to(".cardsection .cards .card-1", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cards .card-2", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cards .card-3", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cards .card-4", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cards .card-5", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cards .card-6", {
          y: isMobile ? "-100" : "-200",
          rotate: 45,
        })
        .to(".cardsection .cardbutton", {
          y: isMobile ? "-100" : "-200",
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([logo, frame]);
    };
  }, [isMobile]);

  return (
    <div>
      <section
        data-scroll-section
        ref={containerRef}
        className=" container mx-auto max-w-full relative h-[120vh] md:h-[180vh] bg-[#F9F9F9] "
      >
        {/* ADJUSTED: Changed pt-20 to pt-8 to move heading up */}
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-start pt-8">
          <div className="relative">
            <h1 className="font-bold leading-none font-montserrat text-center main-title">
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
                {/* EDITED: Changed vw to % for consistent positioning */}
                <Image
                  src="/floating_1.png"
                  width={450}
                  height={350}
                  alt="Floating UI element 1"
                  className="absolute z-2 top-1/2 scale-[0.5] sm:scale-[1] right-[65%] -mt-59 "
                />
                {/* EDITED: Changed vw to % for consistent positioning */}
                <Image
                  src="/floating_2.png"
                  width={450}
                  height={350}
                  alt="Floating UI element 2"
                  className="absolute z-2 top-[22vh] left-[85%] scale-[0.5] sm:scale-[1] "
                />
                <div className="download absolute top-[38vh] left-[36vw] scale-[0.8] sm:scale-[1] transform -translate-x-1/2 z-2 flex flex-col sm:flex-row gap-3 text-left text-[0.4rem] sm:text-[0.6rem] items-center">
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                    <Image
                      src="/apple.png"
                      alt=""
                      width={20}
                      height={20}
                      className="h-3 sm:h-5 w-auto"
                    />
                    <div className="text-left">
                      <div>Download on the</div>
                      <div>App Store</div>
                    </div>
                  </button>
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw]  lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                    <Image
                      src="/playstore.png"
                      alt=""
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
                <div
                  data-scroll
                  data-scroll-speed="0.2"
                  className="absolute inset-0 bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[50px] overflow-hidden shadow-2xl"
                >
                  <div
                    ref={frameRef}
                    className="absolute inset-0 w-full h-full"
                  >
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
    </div>
  );
}