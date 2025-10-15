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
              AnalyticsService.sendEvent("UPI Hero-section viewed");
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
      gsap.set(".payearnrepeat, .return-box, .download, .mockup, .account-frame, .stagger, .card", {
        opacity: 0
      });
      gsap.set(".cardsection .cards .card-1, .cardsection .cards .card-2, .cardsection .cards .card-3, .cardsection .cards .card-4, .cardsection .cards .card-5, .cardsection .cards .card-6", {
        rotate: 0,
        y: 0
      });
      
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
        scale: 0.8
      })
      .to(frame, {
        y: "0%",
        scale: 1
      }, "<") // Start at the same time as the previous tween

      // ---
      .to(".return-box", {
        y: 0,
        opacity: 1
      })
      .to(".payearnrepeat", {
        y: 0,
        opacity: 1
      }, "<")
      .to(".download", {
        y: 0,
        opacity: 1
      }, "<")

      // ---
      .to(container, {
        y: isMobile ? "-150" : "-200"
      })
      .to(".cardsection .mockup", {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
      })
      .to(".cardsection .account-frame", {
        top: "0%",
        opacity: 1,
        scale: 1,
      }, "<")
      .to(".cardsection .card", {
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1
      }, "<")
      .from(".cardsection .stagger", {
        opacity: 0,
        y: isMobile ? "20" : "40",
        stagger: 0.2,
      }, "<")
      .to(".cardsection .stagger", {
        x: isMobile ? "40" : "80",
        stagger: 0.2,
      })
      .to(".cardsection .cards", {
        y: isMobile ? "-150" : "-200",
        scale: isMobile ? 0.9 : 1
      })
      .to(".cardsection .cards .card-1", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cards .card-2", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cards .card-3", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cards .card-4", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cards .card-5", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cards .card-6", {
        y: isMobile ? "-100" : "-200",
        rotate: 45
      })
      .to(".cardsection .cardbutton", {
        y: isMobile ? "-100" : "-200",
        opacity: 1
      })
      .to(".trusted .stagger", {
        opacity: 1,
        y: 0,
        stagger: 0.2
      })
      .to(".footer .stagger", {
        opacity: 1,
        y: 0,
        stagger: 0.2
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
    <div className="overflow-hidden">
      <section
        data-scroll-section
        ref={containerRef}
        className=" container mx-auto max-w-full relative h-[120vh] md:h-[180vh] bg-[#F9F9F9]  "
      >
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h1 className="font-bold leading-none font-montserrat tracking-[-0.1em] text-center pt-4 md:pt-10 main-title">
            <div className="text-[#B7B7B7] text-4xl sm:text-7xl md:text-8xl lg:text-[90px] font-[600] text-center">
              MOVE
            </div>
            <div className="text-[#6F6F6F] -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 text-6xl sm:text-9xl md:text-[140px] lg:text-[160px] font-[600] text-center">
              MONEY
            </div>
            <div className="text-[#404040] -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-14 text-7xl sm:text-[180px] md:text-[220px] lg:text-[260px] font-[600] text-center leading-none">
              FREELY
            </div>
          </h1>

          <div
            className="relative w-full h-full flex justify-center items-center "
          >
            <div className="absolute inset-0 top-0 lg:top-40 sm:-mt-[30vh]  w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-[320px] h-[600px] sm:max-w-[360px] sm:h-[700px] md:max-w-[400px] md:h-[800px] lg:max-w-[440px] lg:h-[900px] mx-auto">
                <div className="return-box absolute z-2 top-1/2 left-[-20vw] lg:left-[-10vw] scale-[0.5] sm:scale-[1] sm:left-[-17vw] flex flex-col p-2 bg-white backdrop-blur-md   rounded-xl   rounded-br-none shadow-[0_40px_100px_rgba(0,0,0,0.15)]  border border-white/20 opacity-0">
                  <div className=" px-3 py-2 flex items-center gap-2 bg-[#f2f2f2] rounded-xl rounded-br-none rounded-bl-none ">
                    <div className="bg-black text-white rounded-xl">
                      {/* Added width and height. Based on h-16 (4rem = 64px) */}
                      <Image src="/cash.png" alt="" width={64} height={64} className="h-16 w-auto" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">9% returns</div>
                      <div className="text-gray-300">on FDs!</div>
                    </div>
                  </div>
                  <div className=" px-3 py-2 flex items-center gap-2 bg-white">
                    <div className="bg-black text-white rounded-xl">
                      {/* Added width and height. Based on h-16 (4rem = 64px) */}
                      <Image src="/wallet.png" alt="" width={64} height={64} className="h-16 w-auto" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">
                        Up to 7% cashback & rewards
                      </div>
                      <div className="text-gray-300">on every spend!</div>
                    </div>
                  </div>
                </div>
                <div className="payearnrepeat absolute top-1/2 left-[72vw]  sm:left-[38vw] scale-[0.8] sm:scale-[1]  transform -translate-x-1/2 -translate-y-1/2 z-2 bg-white/30 backdrop-blur-md rounded-xl px-4 py-6 shadow-[0_40px_100px_rgba(0,0,0,0.15)]  border border-white/20 opacity-0">
                  <p className="text-gray-600 font-medium text-3xl tracking-wide flex sm:flex-row flex-col">
                    <h1>
                      <span className="text-1xl sm:text-4xl bg-gradient-to-b from-black/80 to-white/0 text-transparent bg-clip-text">
                        1
                      </span>
                      PAY.
                    </h1>
                    <h1>
                      <span className="text-1xl sm:text-4xl bg-gradient-to-b from-black/80 to-white/0 text-transparent bg-clip-text">
                        2
                      </span>
                      EARN.
                    </h1>
                    <h1>
                      <span className="text-1xl sm:text-4xl bg-gradient-to-b from-black/80 to-white/0 text-transparent bg-clip-text">
                        3
                      </span>
                      REPEAT.
                    </h1>
                  </p>
                </div>
                <div className="download absolute top-[80%] md:top-[60%] lg:top-1/2 left-[64vw] md:left-[30vw] lg:left-[30vw] scale-[0.8] sm:scale-[1] sm:left-[38.5vw] transform -translate-x-1/2 z-2 flex flex-col sm:flex-row gap-3 text-left text-[0.4rem] sm:text-[0.6rem] items-center">
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                    {/* Added width and height. Based on sm:h-5 (1.25rem = 20px) */}
                    <Image src="/apple.png" alt="" width={20} height={20} className="h-3 sm:h-5 w-auto" />
                    <div className="text-left">
                      <div>Download on the</div>
                      <div>App Store</div>
                    </div>
                  </button>
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw]  lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                     {/* Added width and height. Based on sm:h-5 (1.25rem = 20px) */}
                    <Image src="/playstore.png" alt="" width={20} height={20} className="h-3 sm:h-5 w-auto" />
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
                    ref={logoRef}
                    className="relative top-24 sm:top-28 md:top-32 z-1 text-center"
                  >
                    {/* This one was already correct! */}
                    <Image
                      src="/bepayicon.png"
                      alt="BePay Logo"
                      width={isMobile ? 100 : 159}
                      height={isMobile ? 100 : 159}
                      className="mx-auto object-cover transition-all"
                      priority
                    />
                    <p className="mt-4 text-xs sm:text-sm md:text-base font-semibold transition-opacity px-2 sm:px-0">
                      Your <strong>Web3 Powered</strong> Super App
                    </p>
                  </div>
                  <div
                    ref={frameRef}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* This one is correct because it uses the 'fill' prop */}
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