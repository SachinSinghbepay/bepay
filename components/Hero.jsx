"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const payearnrepeatRef = useRef(null);
  const cardSectionRef = useRef(null);
  // const titleRef = useRef(null)
  const frameRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const container = containerRef.current;
    const logo = logoRef.current;
    const cardSection = cardSectionRef.current;
    // const payearnrepeat = payearnrepeatRef.current
    const payearnrepeat = containerRef.current?.querySelector(".payearnrepeat");
    const returnbox = containerRef.current?.querySelector(".return-box");
    const download = containerRef.current?.querySelector(".download");
    // const mockup = containerRef.current?.querySelector('.cardsection .mockup')
    const accountframe = containerRef.current?.querySelector(".account-frame");
    const card = cardSectionRef.current?.querySelector(".card");

    // const title = titleRef.current
    const frame = frameRef.current;
    const content = contentRef.current;

    if (container && logo && frame && content) {
      // Set initial states
      gsap.set(frame, {
        y: "100%",
        // opacity: 0,
        scale: 0.95,
        transformOrigin: "center bottom",
      });

      // Create scroll trigger for the entire animation sequence
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: isMobile ? "+=150vh" : "+=100vh",
        scrub: true,
        pin: true,
        // markers:true,
        onUpdate: (self) => {
          const progress = self.progress;

          const yOffset = isMobile ? -80 : -120;
          // Logo and title move up and fade out
          gsap.to(logo, {
            y: yOffset * progress * 3,
            // opacity: 1 - (progress * 1.5),
            // scale: 1 - (progress * 0.3),
            duration: 2,
            ease: "power3.Out",
          });

          // gsap.to(title, {
          //   y: yOffset * progress * 3,
          //   // opacity: 1 - (progress * 2),
          //   // delay:0.2,
          //   duration: 2.5,
          //   ease: "power2.inOut"
          // })

          // Frame slides up from bottom
          gsap.to(frame, {
            y: `${100 - progress * 100}%`,
            // opacity: progress * 1.2,
            scale: 0.95 + progress * 0.1,
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(payearnrepeat, {
            y: isMobile
              ? `${100 - progress * 100 * 2.5}%`
              : `${100 - progress * 100 * 4}%`,
            opacity: 1,
            // scale: 0.95 + (progress * 0.1),
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(returnbox, {
            y: isMobile
              ? `${100 - progress * 100 * 2}%`
              : `${100 - progress * 100 * 2.6}%`,
            opacity: 1,
            // scale: 0.95 + (progress * 0.1),
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(download, {
            y: isMobile
              ? `${100 - progress * 100 * 2}%`
              : `${100 - progress * 100 * 3.8}%`,
            opacity: 1,
            // scale: 0.95 + (progress * 0.1),
            duration: 2,
            ease: "power3.Out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: "top top",
        end: isMobile ? "+=150vh" : "+=100vh",
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .mockup", {
            y: isMobile
              ? `${-yOffset * progress * 16.4}`
              : `${-yOffset * progress * 9.7}`,
            x: isMobile
              ? `${-xOffset * progress * 0.2}`
              : `${-xOffset * progress * 2.7}`,

            opacity: progress,
            scale: 1 - progress * 0.2,
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(".cardsection .account-frame", {
            top: "0%",

            opacity: 1 * progress,
            scale: 1 + progress * 0.1,
            delay: 1,
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(card, {
            y: isMobile
              ? `${yOffset * progress * 1}`
              : `${yOffset * progress * 4.2}`,
            x: isMobile
              ? `${-xOffset * progress * 0.2}`
              : `${-xOffset * progress * 2.7}`,
            rotate: -90 * progress,
            // opacity: 1 - (progress * 1.5),
            scale: isMobile
              ? `${1 - progress * 0.6}`
              : `${1 - progress * 0.75}`,
            delay: 1,
            duration: 2,
            ease: "power3.Out",
          });
          gsap.to(".cardsection .stagger", {
            opacity: 1,
            y: yOffset * progress * 1.3,
            delay: 1,
            duration: 2,
            stagger: 0.5, // stagger between each element
            ease: "power3.out",
          });
          // gsap.to(".stagger", {
          //   x: yOffset*progress*2.3,
          //   duration: 2,
          //   stagger: 0.3, // stagger between each element
          //   ease: "power3.out",
          // })
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=75vh" : "+=25vh",
        end: isMobile ? "+=125vh" : "+=75vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .stagger", {
            x: yOffset * progress * 5,
            duration: 2,

            stagger: 0.5, // stagger between each element
            ease: "power3.out",
          });

          gsap.to(".cardsection .cards", {
            y: yOffset * progress * 3,
            duration: 2,
            delay: 0.5,
            scale: isMobile ? 1 - progress * 0.1 : 1,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=125vh" : "+=100vh",
        end: isMobile ? "+=150vh" : "+=125vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-1", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=150vh" : "+=125vh",
        end: isMobile ? "+=175vh" : "+=150vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-2", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=175vh" : "+=150vh",
        end: isMobile ? "+=200vh" : "+=175vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-3", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=200vh" : "+=175vh",
        end: isMobile ? "+=225vh" : "+=200vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-4", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=225vh" : "+=200vh",
        end: isMobile ? "+=250vh" : "+=225vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-5", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: cardSection,
        start: isMobile ? "+=250vh" : "+=225vh",
        end: isMobile ? "+=275vh" : "+=250vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // card animation
          gsap.to(".cardsection .cards .card-6", {
            y: yOffset * progress * 12,
            duration: 2,
            rotate: 45 * progress,
            // stagger: 0.3, // stagger between each element
            ease: "power3.out",
          });
          gsap.to(".cardsection .cardbutton", {
            y: isMobile ? yOffset * progress * 4 : yOffset * progress * 5,
            delay: 1,
            duration: 2,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".trustedtested",
        start: "-10% top",
        end: isMobile ? "+=150vh" : "+=100vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // console.log("progress",progress);
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // console.log("progress",progress);

          // footer animation
          gsap.to(".trusted .stagger", {
            opacity: 1,
            y: yOffset * progress * 5,
            duration: 2,
            stagger: 0.3,
            ease: "power3.out",
          });
        },
      });
      ScrollTrigger.create({
        trigger: ".footer",
        start: "top top",
        end: isMobile ? "+=150vh" : "+=100vh",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // console.log("progress",progress);
          const yOffset = isMobile ? -80 : -120;
          const xOffset = isMobile ? -80 : -120;
          // console.log("progress",progress);

          // footer animation
          gsap.to(".footer .stagger", {
            opacity: 1,
            y: yOffset * progress * 5,
            duration: 2,
            stagger: 0.3,
            ease: "power3.out",
          });
        },
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
          <h1 className="font-bold leading-none font-montserrat tracking-[-0.1em] text-center pt-4 md:pt-10">
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
            ref={contentRef}
            className="relative w-full h-full flex justify-center items-center "
          >
            {/* Mobile Frame Container */}
            <div className="absolute inset-0 top-0 lg:top-40 sm:-mt-[30vh]  w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-[320px] h-[600px] sm:max-w-[360px] sm:h-[700px] md:max-w-[400px] md:h-[800px] lg:max-w-[440px] lg:h-[900px] mx-auto">
                <div className="return-box absolute z-2 top-1/2 left-[-20vw] lg:left-[-10vw] scale-[0.5] sm:scale-[1] sm:left-[-17vw] flex flex-col p-2 bg-white backdrop-blur-md  rounded-xl 	rounded-br-none shadow-[0_40px_100px_rgba(0,0,0,0.15)]  border border-white/20 opacity-0">
                  {/* 99% returns element */}
                  <div className=" px-3 py-2 flex items-center gap-2 bg-[#f2f2f2] rounded-xl rounded-br-none rounded-bl-none ">
                    <div className="bg-black text-white rounded-xl">
                      <Image src="/cash.png" alt="" className="h-16" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">9% returns</div>
                      <div className="text-gray-300">on FDs!</div>
                    </div>
                  </div>

                  {/* 7% cashback element */}
                  <div className=" px-3 py-2 flex items-center gap-2 bg-white">
                    <div className="bg-black text-white rounded-xl">
                      <Image src="/wallet.png" alt="" className="h-16" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">
                        Up to 7% cashback & rewards
                      </div>
                      <div className="text-gray-300">on every spend!</div>
                    </div>
                  </div>
                </div>

                {/* PAY. EARN. REPEAT. Text */}
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

                {/* Download Buttons */}
                <div className="download absolute top-[80%] md:top-[60%] lg:top-1/2 left-[64vw] md:left-[30vw] lg:left-[30vw] scale-[0.8] sm:scale-[1] sm:left-[38.5vw] transform -translate-x-1/2 z-2 flex flex-col sm:flex-row gap-3 text-left text-[0.4rem] sm:text-[0.6rem] items-center">
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw] lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                    <Image src="apple.png" alt="" className="h-3 sm:h-5" />
                    <div className="text-left">
                      <div>Download on the</div>
                      <div>App Store</div>
                    </div>
                  </button>
                  <button className="bg-black w-[42vw] sm:w-[40vw] md:w-[40vw]  lg:w-[13vw] text-white px-5 py-4 sm:px-7 sm:py-5 rounded-full flex items-center gap-2 justify-center">
                    <Image src="playstore.png" alt="" className="h-3 sm:h-5" />
                    <div className="text-left">
                      <div>Get the App on</div>
                      <div>Google Play</div>
                    </div>
                  </button>
                </div>

                {/* Phone Mockup */}
                <div
                  data-scroll
                  data-scroll-speed="0.2"
                  className="absolute inset-0 bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[50px] overflow-hidden shadow-2xl"
                >
                  {/* Logo + Text */}
                  <div
                    ref={logoRef}
                    className="relative top-24 sm:top-28 md:top-32 z-1 text-center"
                  >
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

                  {/* Screen Content */}
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
