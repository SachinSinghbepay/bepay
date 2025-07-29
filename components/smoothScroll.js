"use client"
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Create Lenis instance with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.0, 
      easing: (t) => 1 - Math.pow(1 - t, 3), 
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2, // Reduced from 5
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: true, 
      wheelMultiplier: 0.8, 
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.08, 
      orientation: 'vertical',
      smoothWheel: true,
      wheelEventsTarget: document,
     
      prevent: (node) => {
        return node.hasAttribute('data-lenis-prevent') || 
               node.classList.contains('no-smooth-scroll') ||
               node.tagName === 'INPUT' ||
               node.tagName === 'TEXTAREA' ||
               node.tagName === 'SELECT';
      },
    });

    // Optimized RAF loop
    const raf = (time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    // Start the animation loop
    rafRef.current = requestAnimationFrame(raf);

    // Optional: Add performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    
    const performanceCheck = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, reduce smoothness
        if (fps < 30 && lenisRef.current) {
          lenisRef.current.options.lerp = Math.max(0.05, lenisRef.current.options.lerp - 0.01);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      setTimeout(performanceCheck, 1000);
    };
    
    // Start performance monitoring (optional - remove if not needed)
    // performanceCheck();

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Expose Lenis instance for external control if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.lenis = lenisRef.current;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;