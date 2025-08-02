"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Create Lenis instance with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2, // Reduced from 5
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      wheelMultiplier: 0.8,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.08,
      orientation: "vertical",
      smoothWheel: true,
      wheelEventsTarget: document,

      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("no-smooth-scroll") ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT"
        )
      },
    })

    // Optimized RAF loop
    const raf = (time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time)
      }
      rafRef.current = requestAnimationFrame(raf)
    }

    // Start the animation loop
    rafRef.current = requestAnimationFrame(raf)

    // Optional: Add performance monitoring
    let frameCount = 0
    let lastTime = performance.now()

    const performanceCheck = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

        // If FPS drops below 30, reduce smoothness
        if (fps < 30 && lenisRef.current) {
          lenisRef.current.options.lerp = Math.max(0.05, lenisRef.current.options.lerp - 0.01)
        }

        frameCount = 0
        lastTime = currentTime
      }

      setTimeout(performanceCheck, 1000)
    }

    // Start performance monitoring (optional - remove if not needed)
    // performanceCheck();

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  // Expose Lenis instance for external control if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.lenis = lenisRef.current
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.lenis
      }
    }
  }, [])

  // Scroll functions for buttons and keyboard
  const scrollUp = () => {
    if (lenisRef.current) {
      const currentScroll = lenisRef.current.scroll
      lenisRef.current.scrollTo(currentScroll - window.innerHeight * 0.8, {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    }
  }

  const scrollDown = () => {
    if (lenisRef.current) {
      const currentScroll = lenisRef.current.scroll
      lenisRef.current.scrollTo(currentScroll + window.innerHeight * 0.8, {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if user is not typing in an input field
      const activeElement = document.activeElement
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true"

      if (isInputActive) return

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault()
          scrollUp()
          break
        case "ArrowDown":
          event.preventDefault()
          scrollDown()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      {children}

      {/* Fixed Scroll Buttons with Modern Glass Effect */}
      <div className="fixed bottom-8 hidden right-8  flex-col gap-6 lg:gap-3 z-50">
        <button
          onClick={scrollUp}
          className="group relative w-14 h-14 bg-gray-200/20 hover:bg-gray-300/30 backdrop-blur-xl border border-gray-300/20 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-gray-500/25"
          aria-label="Scroll up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
          <ArrowUp
            size={22}
            className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 relative z-10"
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={scrollDown}
          className="group relative w-14 h-14 bg-gray-200/20 hover:bg-gray-300/30 backdrop-blur-xl border border-gray-300/20 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:translate-y-1 shadow-2xl hover:shadow-gray-500/25"
          aria-label="Scroll down"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
          <ArrowDown
            size={22}
            className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 relative z-10"
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="fixed bottom-8 hidden  left-8 z-50">
        <div className="bg-gray-200/20 backdrop-blur-xl border border-gray-300/20 rounded-xl px-4 py-2 shadow-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-300/30 rounded text-xs font-mono">↑</kbd>
              <kbd className="px-2 py-1 bg-gray-300/30 rounded text-xs font-mono">↓</kbd>
            </div>
            <span>to scroll</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmoothScroll
