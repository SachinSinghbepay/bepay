'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LocomotiveProvider({ children }) {
  useEffect(() => {
    let loco;
    let handleResize;

    import('locomotive-scroll').then((mod) => {
      const L = mod.default;
      gsap.registerPlugin(ScrollTrigger);

      loco = new L({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: false,
      });

      loco.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length
            ? loco.scrollTo(value, 0, 0)
            : loco.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.querySelector('[data-scroll-container]').style
          .transform
          ? 'transform'
          : 'fixed',
      });

      ScrollTrigger.addEventListener('refresh', () => loco.update());
      ScrollTrigger.refresh();

      // set up resize handler that we can remove later
      handleResize = () => loco?.update();
      window.addEventListener('resize', handleResize);
    });

    return () => {
      try {
        ScrollTrigger.killAll();
      } catch (e) {
        console.warn('ScrollTrigger.killAll failed during cleanup', e);
      }
      try {
        if (typeof handleResize === 'function') window.removeEventListener('resize', handleResize);
      } catch (e) {
        console.warn('removeEventListener failed', e);
      }
      try {
        loco?.destroy();
      } catch (err) {
        console.warn('loco.destroy() failed during cleanup', err);
      }
    };
  }, []);

  return <div data-scroll-container>{children}</div>;
}