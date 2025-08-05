"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const isInitialized = useRef(false)
  const wheelTimeout = useRef(null)
  const lastWheelTime = useRef(0)
  const wheelDeltaHistory = useRef([])

  // Better trackpad detection
  const detectInputType = useCallback((e) => {
    const now = Date.now()
    const timeDelta = now - lastWheelTime.current
    lastWheelTime.current = now

    // Store recent wheel deltas for analysis
    wheelDeltaHistory.current.push({
      delta: Math.abs(e.deltaY),
      time: now,
      deltaMode: e.deltaMode
    })

    // Keep only recent history
    wheelDeltaHistory.current = wheelDeltaHistory.current.filter(
      entry => now - entry.time < 200
    )

    // Trackpad characteristics:
    // - Smaller delta values
    // - Higher frequency
    // - deltaMode is usually 0
    const avgDelta = wheelDeltaHistory.current.reduce((sum, entry) => sum + entry.delta, 0) / wheelDeltaHistory.current.length
    const isHighFrequency = wheelDeltaHistory.current.length > 3 && timeDelta < 16
    const hasSmallDeltas = avgDelta < 50
    const isDeltaModePixel = e.deltaMode === 0

    return {
      isTrackpad: hasSmallDeltas && isDeltaModePixel && (isHighFrequency || timeDelta < 50),
      isMouse: !hasSmallDeltas || e.deltaMode === 1 || timeDelta > 100
    }
  }, [])

  useEffect(() => {
    if (isInitialized.current) return

    // Create Lenis instance with stable settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false, // Disable to prevent conflicts
      touchMultiplier: 1,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      wheelMultiplier: 1,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,
      orientation: "vertical",
      smoothWheel: true,

      // Improved prevent function
      prevent: (node) => {
        if (!node) return false
        
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("no-smooth-scroll") ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.contentEditable === "true" ||
          node.closest("input, textarea, select, [contenteditable]") ||
          node.closest('[data-lenis-prevent]')
        )
      },
    })

    // Handle wheel events with proper debouncing
    const handleWheel = (e) => {
      if (!lenisRef.current || lenisRef.current.isDestroyed) return

      // Clear existing timeout
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }

      const inputType = detectInputType(e)
      
      // Apply different settings based on input type
      if (inputType.isTrackpad) {
        lenisRef.current.options.lerp = 0.15
        lenisRef.current.options.duration = 0.8
        lenisRef.current.options.wheelMultiplier = 0.8
      } else {
        lenisRef.current.options.lerp = 0.1
        lenisRef.current.options.duration = 1.2
        lenisRef.current.options.wheelMultiplier = 1
      }

      // Reset to default after inactivity
      wheelTimeout.current = setTimeout(() => {
        if (lenisRef.current && !lenisRef.current.isDestroyed) {
          lenisRef.current.options.lerp = 0.1
          lenisRef.current.options.duration = 1.2
          lenisRef.current.options.wheelMultiplier = 1
        }
      }, 150)
    }

    // Add wheel event listener
    document.addEventListener('wheel', handleWheel, { passive: true })

    // Optimized RAF loop with better error handling
    const raf = (time) => {
      try {
        if (lenisRef.current && !lenisRef.current.isDestroyed) {
          lenisRef.current.raf(time)
        }
      } catch (error) {
        console.warn('Lenis RAF error:', error)
      }
      
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Device optimization
    const optimizeForDevice = () => {
      if (!lenisRef.current) return
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (isMobile || isLowEnd || hasReducedMotion) {
        lenisRef.current.options.lerp = 0.2
        lenisRef.current.options.duration = 0.6
      }
    }

    optimizeForDevice()
    isInitialized.current = true

    // Cleanup function
    return () => {
      document.removeEventListener('wheel', handleWheel)
      
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      if (lenisRef.current && !lenisRef.current.isDestroyed) {
        lenisRef.current.destroy()
      }
      
      isInitialized.current = false
    }
  }, [detectInputType])

  // Expose Lenis instance
  useEffect(() => {
    if (typeof window !== "undefined" && lenisRef.current) {
      window.lenis = lenisRef.current
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.lenis
      }
    }
  }, [])

  // Scroll functions with safety checks
  const scrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    
    const scrollAmount = window.innerHeight * 0.8
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [])

  const scrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    
    const scrollAmount = window.innerHeight * 0.8
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [])

  // Enhanced keyboard navigation
  useEffect(() => {
    let keyTimeout = null
    const keyPressedKeys = new Set()

    const handleKeyDown = (event) => {
      // Prevent handling if user is in an input
      const activeElement = document.activeElement
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true" ||
        activeElement?.closest("input, textarea, select, [contenteditable]")

      if (isInputActive || !lenisRef.current) return

      // Prevent rapid firing
      if (keyPressedKeys.has(event.key)) return
      keyPressedKeys.add(event.key)

      if (keyTimeout) clearTimeout(keyTimeout)

      const executeScroll = () => {
        if (!lenisRef.current || lenisRef.current.isDestroyed) return

        switch (event.key) {
          case "ArrowUp":
          case "PageUp":
            event.preventDefault()
            scrollUp()
            break
          case "ArrowDown":
          case "PageDown":
            event.preventDefault()
            scrollDown()
            break
          case "Home":
            event.preventDefault()
            lenisRef.current.scrollTo(0, { duration: 1.5 })
            break
          case "End":
            event.preventDefault()
            lenisRef.current.scrollTo(document.documentElement.scrollHeight, { duration: 1.5 })
            break
        }
      }

      keyTimeout = setTimeout(executeScroll, 16)
    }

    const handleKeyUp = (event) => {
      keyPressedKeys.delete(event.key)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      if (keyTimeout) clearTimeout(keyTimeout)
    }
  }, [scrollUp, scrollDown])

  // Scroll progress with throttling
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!ticking && lenisRef.current) {
        requestAnimationFrame(() => {
          const progress = lenisRef.current.progress || 0
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
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

  // Handle visibility change to prevent issues when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      } else if (!document.hidden && lenisRef.current && !lenisRef.current.isDestroyed) {
        const raf = (time) => {
          try {
            if (lenisRef.current && !lenisRef.current.isDestroyed) {
              lenisRef.current.raf(time)
            }
          } catch (error) {
            console.warn('Lenis RAF error:', error)
          }
          rafRef.current = requestAnimationFrame(raf)
        }
        rafRef.current = requestAnimationFrame(raf)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return (
    <>
      {children}

      {/* Fixed Scroll Buttons */}
      <div className="fixed bottom-8 right-8 flex-col gap-3 z-50 lg:flex hidden">
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

    
    </>
  )
}

export default SmoothScroll