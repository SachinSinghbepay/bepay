"use client"
import { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Your existing SmoothScroll component (unchanged)
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Create Lenis instance with optimized settings
    lenisRef.current = new (class Lenis {
      constructor(options) {
        this.options = { ...options };
        this.velocity = 0;
        this.direction = 0;
        this.animate = this.animate.bind(this);
        this.targetScroll = window.scrollY;
        this.currentScroll = window.scrollY;
        this.isScrolling = false;
        this.setupEventListeners();
      }

      setupEventListeners() {
        window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
        window.addEventListener('resize', this.onResize.bind(this));
      }

      onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY * (this.options.wheelMultiplier || 0.8);
        this.targetScroll = Math.max(0, Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          this.targetScroll + delta
        ));
        this.isScrolling = true;
      }

      onResize() {
        this.targetScroll = Math.min(this.targetScroll, 
          document.documentElement.scrollHeight - window.innerHeight);
      }

      scrollTo(target, options = {}) {
        this.targetScroll = Math.max(0, Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          target
        ));
        this.isScrolling = true;
      }

      raf(time) {
        this.animate();
      }

      animate() {
        const lerp = this.options.lerp || 0.08;
        const diff = this.targetScroll - this.currentScroll;
        
        if (Math.abs(diff) > 0.1) {
          this.currentScroll += diff * lerp;
          window.scrollTo(0, this.currentScroll);
          this.isScrolling = true;
        } else {
          this.currentScroll = this.targetScroll;
          this.isScrolling = false;
        }
      }

      destroy() {
        window.removeEventListener('wheel', this.onWheel);
        window.removeEventListener('resize', this.onResize);
      }
    })({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
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

// Fixed Scroll Controls Component
const ScrollControls = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollUp = () => {
    if (window.lenis) {
      const currentScroll = window.scrollY;
      const scrollAmount = window.innerHeight * 0.8; // Scroll up by 80% of viewport height
      window.lenis.scrollTo(currentScroll - scrollAmount);
    }
  };

  const scrollDown = () => {
    if (window.lenis) {
      const currentScroll = window.scrollY;
      const scrollAmount = window.innerHeight * 0.8; // Scroll down by 80% of viewport height
      window.lenis.scrollTo(currentScroll + scrollAmount);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-2 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <button
        onClick={scrollUp}
        className="bg-black/80 hover:bg-black text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl"
        aria-label="Scroll up"
      >
        <ChevronUp size={20} />
      </button>
      <button
        onClick={scrollDown}
        className="bg-black/80 hover:bg-black text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};

// Main Layout Component to be used in layout.js
const SmoothScrollLayout = ({ children }) => {
  return (
    <SmoothScroll>
      {children}
      <ScrollControls />
    </SmoothScroll>
  );
};

export default SmoothScrollLayout;