
'use client';
import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const SmoothScroll = ({ children }) => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let lenis;
    let animationFrameId;
    let handleKeyDown;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      // 🚫 Prevent browser auto-restoring scroll
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
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
        ignoredElements: (el) => el.hasAttribute('data-lenis-prevent'),
      });

      // Animation loop
      function raf(time) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);

      // Keyboard scroll support
      handleKeyDown = (e) => {
        const scrollAmount = 500; // px per key press (adjust if you want faster/slower)
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          lenis.scrollTo(window.scrollY + scrollAmount);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          lenis.scrollTo(window.scrollY - scrollAmount);
        }
        if (e.key === 'PageDown') {
          e.preventDefault();
          lenis.scrollTo(window.scrollY + window.innerHeight * 0.9);
        }
        if (e.key === 'PageUp') {
          e.preventDefault();
          lenis.scrollTo(window.scrollY - window.innerHeight * 0.9);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      cancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleKeyDown) window.removeEventListener('keydown', handleKeyDown);
      if (lenis) lenis.destroy();
    };
  }, [pathname]);

  return <div key={pathname}>{children}</div>;
};

export default SmoothScroll;
