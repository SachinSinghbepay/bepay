"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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

  const cardRef = useRef(null);
  const mockupImage1Ref = useRef(null);
  const mockupImage2Ref = useRef(null);
  const mockupImage3Ref = useRef(null);

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
        [textLine1Ref.current, textLine2Ref.current, textLine3Ref.current],
        {
          y: getResponsiveValue(50, 75, 100),
          opacity: 0,
        }
      );

      gsap.set(cardRef.current, {
        y: "100vh",
      });

      gsap.set(
        [
          mockupImage1Ref.current,
          mockupImage2Ref.current,
          mockupImage3Ref.current,
        ],
        {
          y: "100%",
        }
      );

      // Create the main timeline with responsive scrub and duration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => {
            // Adjust end point based on screen size to ensure complete animation
            const width = window.innerWidth;
            if (width < 640) return "+=250%"; // More scroll space for mobile
            if (width < 1000) return "+=225%"; // Extra space for small tablets
            if (width < 1200) return "+=200%"; // Standard space for larger screens
            return "+=175%"; // Less space needed for very large screens
          },
          pin: true,
          pinSpacing: true,
          scrub: getResponsiveValue(0.8, 1, 1.2), // Slower scrub for smaller screens
          //   markers: true,
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
        // Then animate the card with responsive timing
        .to(cardRef.current, {
          y: 0,
          duration: getResponsiveValue(1, 1.25, 1.5),
          ease: "power2.inOut",
        })
        // Animate the mockup image with responsive offset and timing
        .to(
          mockupImage1Ref.current,
          {
            y: getResponsiveValue("7%", "7.5%", "10%"),
            duration: getResponsiveValue(0.6, 0.8, 1),
            ease: "power3.out",
            // Stagger the animations for each mockup image
          },
          "-=0.3"
        )
        .to(
          mockupImage2Ref.current,
          {
            y: getResponsiveValue("17%", "17.5%", "20%"),
            duration: getResponsiveValue(0.6, 0.8, 1),
            ease: "power3.out",
            // Stagger the animations for each mockup image
          },
          "-=0.3"
        )
        .to(
          mockupImage3Ref.current,
          {
            y: getResponsiveValue("27%", "27.5%", "30%"),
            duration: getResponsiveValue(0.6, 0.8, 1),
            ease: "power3.out",
            // Stagger the animations for each mockup image
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
      className="w-full min-h-screen bg-[#F9F9F9] font-montserrat overflow-hidden"
    >
      <div className="relative w-full lg:max-w-[1229px] py-8 sm:py-12 lg:py-16 mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-[95vw] sm:max-w-[90vw] mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h2
              ref={textLine1Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] font-montserrat font-normal leading-[0.9] tracking-tight mb-2 sm:mb-3"
            >
              <span className="text-[#9e9e9e]">Crypto</span>{" "}
              <span className="text-black">debit</span>
            </h2>

            <h2
              ref={textLine2Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] font-montserrat font-normal leading-[0.9] tracking-tight"
            >
              <span className="text-[#9e9e9e]">Card</span>{" "}
              <span className="text-black">that just</span>
            </h2>

            <h2
              ref={textLine3Ref}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] font-montserrat font-normal leading-[0.9] tracking-tight"
            >
              <span className="text-black">Works</span>
            </h2>
          </div>
        </div>
        {/*card*/}
        {/*card*/}
        <div
          ref={cardRef}
          className="absolute top-1/2 xl:top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:max-w-[1200px] bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 ">
            {/* Left Side - Mockup Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full bg-[#f8f8f8] rounded-xl sm:rounded-2xl overflow-hidden text-left">
              <div
                ref={mockupImage1Ref}
                className="absolute transform -translate-x-8 sm:-translate-x-20 w-full h-full z-2"
              >
                {/*card animation*/}
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Wallet Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
              <div ref={mockupImage2Ref} className="absolute w-full h-full z-1">
                {/*card animation*/}
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Wallet Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
              <div
                ref={mockupImage3Ref}
                className="absolute transform translate-x-8 sm:translate-x-20 w-full h-full z-0"
              >
                {/*card animation*/}
                <Image
                  src="/businessnew/cardImage_single.png"
                  alt="Wallet Mockup"
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-6 sm:space-y-7 lg:space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black">
                  Instantly linked to your self custody wallet
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  No waiting, no approval process. Ready in seconds.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black">
                  Spend crypto at any Visa/Mastercard merchant
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Instant virtual card that works with 240M+ merchants
                  worldwide.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black">
                  Real-time transaction alerts
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Zero FX markup on international spending.
                </p>
              </div>

              <button className="flex items-center space-x-2 sm:space-x-3 bg-black text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-800 transition-colors w-fit mt-2 sm:mt-4">
                <Image
                  src="/businessnew/cardIcon.png"
                  alt="Get Card"
                  width={24}
                  height={24}
                  className="w-7 h- sm:w-9 sm:h-6"
                />
                <span>Get your bepay money card now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
