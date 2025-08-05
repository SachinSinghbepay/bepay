"use client"
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: false,
      wheelMultiplier: 1,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,
      orientation: 'vertical',
      smoothWheel: true,
      wheelEventsTarget: document,
      // Add this line to ignore elements with the 'data-lenis-prevent' attribute
      ignoredElements: (el) => el.hasAttribute('data-lenis-prevent'),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup Lenis on unmount
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

