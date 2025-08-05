"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Create Lenis instance with optimized settings for all input methods
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      smooth: true,
      smoothTouch: true, // Enable smooth touch for trackpad
      touchMultiplier: 1.5, // Optimized for trackpad
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      wheelMultiplier: 1, // Normalized wheel multiplier
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1, // Increased for smoother interpolation
      orientation: "vertical",
      smoothWheel: true,
      wheelEventsTarget: document,

      // Improved prevent function
      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("no-smooth-scroll") ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.contentEditable === "true" ||
          node.closest("input") ||
          node.closest("textarea") ||
          node.closest("select")
        )
      },
    })

    // Handle different scroll events for better trackpad support
    const handleWheel = (e) => {
      // Detect trackpad vs mouse wheel
      const isTrackpad = Math.abs(e.deltaY) < 50 && e.deltaMode === 0
      
      if (isTrackpad && lenisRef.current) {
        // For trackpad, use smaller, more frequent updates
        lenisRef.current.options.lerp = 0.12
        lenisRef.current.options.duration = 0.8
      } else if (lenisRef.current) {
        // For mouse wheel, use standard settings
        lenisRef.current.options.lerp = 0.1
        lenisRef.current.options.duration = 1.2
      }
    }

    // Add wheel event listener for trackpad detection
    window.addEventListener('wheel', handleWheel, { passive: true })

    // Optimized RAF loop with error handling
    const raf = (time) => {
      try {
        if (lenisRef.current && !lenisRef.current.isDestroyed) {
          lenisRef.current.raf(time)
        }
        rafRef.current = requestAnimationFrame(raf)
      } catch (error) {
        console.warn('Lenis RAF error:', error)
        rafRef.current = requestAnimationFrame(raf)
      }
    }

    // Start the animation loop
    rafRef.current = requestAnimationFrame(raf)

    // Performance optimization - adjust based on device capabilities
    const optimizeForDevice = () => {
      if (lenisRef.current) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isLowEnd = navigator.hardwareConcurrency < 4
        
        if (isMobile || isLowEnd) {
          lenisRef.current.options.lerp = 0.15 // Faster interpolation for lower-end devices
          lenisRef.current.options.duration = 0.8
        }
      }
    }

    optimizeForDevice()

    // Cleanup function
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current && !lenisRef.current.isDestroyed) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  // Expose Lenis instance for external control
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

  // Improved scroll functions with smooth animations
  const scrollUp = useCallback(() => {
    if (lenisRef.current && !lenisRef.current.isDestroyed) {
      const scrollAmount = window.innerHeight * 0.85
      lenisRef.current.scrollTo(lenisRef.current.scroll - scrollAmount, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        immediate: false,
      })
    }
  }, [])

  const scrollDown = useCallback(() => {
    if (lenisRef.current && !lenisRef.current.isDestroyed) {
      const scrollAmount = window.innerHeight * 0.85
      lenisRef.current.scrollTo(lenisRef.current.scroll + scrollAmount, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        immediate: false,
      })
    }
  }, [])

  // Enhanced keyboard navigation with debouncing
  useEffect(() => {
    let keyTimeout = null

    const handleKeyDown = (event) => {
      // Check if user is not typing in an input field
      const activeElement = document.activeElement
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true" ||
        activeElement?.closest("input") ||
        activeElement?.closest("textarea") ||
        activeElement?.closest("select")

      if (isInputActive) return

      // Debounce rapid key presses
      if (keyTimeout) {
        clearTimeout(keyTimeout)
      }

      switch (event.key) {
        case "ArrowUp":
        case "PageUp":
          event.preventDefault()
          keyTimeout = setTimeout(scrollUp, 50)
          break
        case "ArrowDown":
        case "PageDown":
          event.preventDefault()
          keyTimeout = setTimeout(scrollDown, 50)
          break
        case "Home":
          event.preventDefault()
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { duration: 2 })
          }
          break
        case "End":
          event.preventDefault()
          if (lenisRef.current) {
            lenisRef.current.scrollTo(document.documentElement.scrollHeight, { duration: 2 })
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (keyTimeout) {
        clearTimeout(keyTimeout)
      }
    }
  }, [scrollUp, scrollDown])

  // Add scroll progress indicator
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const updateScrollProgress = () => {
      if (lenisRef.current) {
        const progress = lenisRef.current.progress || 0
        setScrollProgress(progress)
      }
    }

    if (lenisRef.current) {
      lenisRef.current.on('scroll', updateScrollProgress)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', updateScrollProgress)
      }
    }
  }, [])

  return (
    <>
      {children}

      {/* Fixed Scroll Buttons with Modern Glass Effect */}
      <div className="fixed bottom-8 right-8  flex-col gap-3 z-50 lg:flex hidden">
        <button
          onClick={scrollUp}
          className="group relative w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-black/25"
          aria-label="Scroll up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
          <ArrowUp
            size={20}
            className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10"
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={scrollDown}
          className="group relative w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:translate-y-1 shadow-2xl hover:shadow-black/25"
          aria-label="Scroll down"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
          <ArrowDown
            size={20}
            className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10"
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed hidden top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Enhanced Keyboard Hint */}
      <div className="fixed bottom-8 left-8 z-50  hidden">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono min-w-[24px] text-center">↑</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono min-w-[24px] text-center">↓</kbd>
            </div>
            <span>Scroll</span>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">Home</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">End</kbd>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmoothScroll