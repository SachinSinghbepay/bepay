"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimatedTextSectionGSAP() {
  const sectionReff = useRef(null);
  const withBepayContainerReff = useRef(null); // Ref for the entire "With bepay" phrase container
  const withReff = useRef(null); // Ref for the word "With"
  const bepayReff = useRef(null); // Ref for the word "bepay"

  useLayoutEffect(() => {
    // Create a GSAP context to isolate animations for this component
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionReff.current,
          start: "top top", // Animation starts when the top of the section hits the top of the viewport
          end: "bottom top", // Animation ends when the bottom of the section hits the top of the viewport
          scrub: true, // Link animation progress to scroll progress
          pin: true, // Pin the section in place while the animation plays
          markers: false, // Set to true for debugging scroll points (remove in production)
        },
      });

      // Initial state for the entire "With bepay" phrase container:
      // It starts off-screen (100% right, 50% down), invisible, and slightly scaled down.
      gsap.set(withBepayContainerReff.current, {
        xPercent: 100, // Start 100% to the right
        yPercent: 50, // Start 50% to the bottom
        opacity: 0,
        scale: 0.8,
      });

      // Initial state for individual words within the container: they are initially invisible.
      gsap.set([withReff.current, bepayReff.current], { opacity: 0 });

      // --- Animation Sequence ---
      // 1. Animate the entire "With bepay" container from bottom-right to the center.
      // This is the main movement for the phrase.
      tl.to(
        withBepayContainerReff.current,
        {
          xPercent: 0, // Move to horizontal center
          yPercent: 0, // Move to vertical center
          opacity: 1, // Become fully visible
          scale: 1, // Scale to original size
          ease: "power1.inOut", // Smooth easing
        },
        0 // Start this animation at the very beginning of the timeline (0% scroll progress)
      );

      // 2. Stagger the individual words' opacity within the container's animation.
      // This creates the "word by word" effect as the phrase moves into place.
      tl.to(withReff.current, { opacity: 1, ease: "power1.inOut" }, 0.2); // "With" appears slightly after container starts moving
      tl.to(bepayReff.current, { opacity: 1, ease: "power1.inOut" }, 0.3); // "bepay" appears slightly after "With"
    }, sectionReff); // Pass the section ref to the context to scope it

    // Cleanup function for the context
    return () => ctx.revert();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <section ref={sectionReff} className="h-[300vh] bg-white">
      {" "}
      {/* Tall section to provide ample scroll space for the animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {" "}
        {/* Sticky container to keep the text fixed in the viewport during animation */}
        <h1 className="relative w-full text-center text-[250px] font-normal">
          {/* "With bepay" container: This div will animate from bottom-right to center */}
          <div
            ref={withBepayContainerReff}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
          >
            {/* "With" word */}
            <span ref={withReff} className="text-[#C0C0C0]">
              With{" "}
            </span>
            {/* "bepay" word with a gap */}
            <span ref={bepayReff} className="text-gray-800 ml-[0.2em]">
              bepay
            </span>
          </div>
        </h1>
      </div>
    </section>
  );
}
