"use client"
import { useEffect, useRef, useCallback, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const isInitialized = useRef(false)
  const deviceType = useRef("unknown")

  // Simplified and more reliable device detection
  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isMac = /mac|macintosh/i.test(userAgent)
    const isWindows = /win/i.test(userAgent)
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    const hasTouchscreen = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isMobile || hasCoarsePointer || hasTouchscreen) {
      return "mobile"
    } else if (isMac) {
      return "mac"
    } else if (isWindows) {
      return "windows"
    }
    return "desktop"
  }, [])

  useEffect(() => {
    if (isInitialized.current) return

    deviceType.current = detectDevice()

    // Device-specific configurations
    const getDeviceConfig = () => {
      const baseConfig = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false, // Default to false, adjusted for mobile
        touchMultiplier: 1,
        infinite: false,
        gestureOrientation: "vertical",
        normalizeWheel: true,
        autoResize: true,
        wrapper: window,
        content: document.documentElement,
        orientation: "vertical",
        smoothWheel: true,
      }

      // Adjust settings based on device type
      switch (deviceType.current) {
        case "mobile":
          return {
            ...baseConfig,
            lerp: 0.15,
            wheelMultiplier: 0.8,
            duration: 0.8,
            smoothTouch: true, // Enable smooth touch for mobile
            touchMultiplier: 1.5,
          }
        case "mac":
          return {
            ...baseConfig,
            lerp: 0.1,
            wheelMultiplier: 0.7,
            duration: 1.0,
            smoothTouch: false, // Mac trackpads often behave like precise wheels
          }
        case "windows":
          return {
            ...baseConfig,
            lerp: 0.08,
            wheelMultiplier: 1.2,
            duration: 1.2,
            smoothTouch: false, // Windows touchpads often behave like precise wheels
          }
        default: // Desktop with regular mouse wheel
          return {
            ...baseConfig,
            lerp: 0.08,
            wheelMultiplier: 1,
            smoothTouch: false,
          }
      }
    }

    // Create Lenis instance with device-optimized settings
    const config = getDeviceConfig()
    lenisRef.current = new Lenis({
      ...config,
      prevent: (node) => {
        if (!node) return false

        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("no-smooth-scroll") ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.contentEditable === "true" ||
          !!node.closest("input, textarea, select, [contenteditable], [data-lenis-prevent]")
        )
      },
    })

    // Simplified RAF loop without dynamic changes
    const raf = (time) => {
      if (lenisRef.current && !lenisRef.current.isDestroyed) {
        lenisRef.current.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
    }
    rafRef.current = requestAnimationFrame(raf)

    // Handle reduced motion preference
    const handleReducedMotion = () => {
      const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (hasReducedMotion && lenisRef.current) {
        // Adjust Lenis options for reduced motion
        lenisRef.current.options.lerp = 0.25
        lenisRef.current.options.duration = 0.5
        // Potentially disable smooth scrolling entirely for reduced motion
        // lenisRef.current.options.smooth = false;
        // lenisRef.current.options.smoothTouch = false;
      } else if (lenisRef.current) {
        // Revert to original config if reduced motion is off
        const originalConfig = getDeviceConfig()
        lenisRef.current.options.lerp = originalConfig.lerp
        lenisRef.current.options.duration = originalConfig.duration
        lenisRef.current.options.smooth = originalConfig.smooth
        lenisRef.current.options.smoothTouch = originalConfig.smoothTouch
      }
    }
    handleReducedMotion()

    // Listen for changes in motion preference
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    motionMediaQuery.addEventListener("change", handleReducedMotion)

    isInitialized.current = true

    // Cleanup function
    return () => {
      motionMediaQuery.removeEventListener("change", handleReducedMotion)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current && !lenisRef.current.isDestroyed) {
        lenisRef.current.destroy()
      }
      isInitialized.current = false
    }
  }, [detectDevice])

  // Expose Lenis instance globally
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

  // Scroll functions with device-aware durations
  const getScrollDuration = useCallback((amount) => {
    const baseDuration = deviceType.current === "mobile" ? 0.6 : 0.8
    return amount > 0.4 ? baseDuration * 1.5 : baseDuration
  }, [])

  const scrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.25
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.25),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  const scrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.25
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.25),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  const keyboardScrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.25
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.25),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  const keyboardScrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.25
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.25),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  const pageScrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.8
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.8),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  const pageScrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.8
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.8),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [getScrollDuration])

  // Improved keyboard navigation with debouncing
  useEffect(() => {
    let keyTimeout = null
    const pressedKeys = new Set()

    const handleKeyDown = (event) => {
      const activeElement = document.activeElement
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true" ||
        activeElement?.closest("input, textarea, select, [contenteditable]")

      if (isInputActive || !lenisRef.current || pressedKeys.has(event.key)) return

      pressedKeys.add(event.key)

      if (keyTimeout) clearTimeout(keyTimeout)

      // Debounce key presses
      keyTimeout = setTimeout(() => {
        if (!lenisRef.current || lenisRef.current.isDestroyed) return

        switch (event.key) {
          case "ArrowUp":
            event.preventDefault()
            keyboardScrollUp()
            break
          case "ArrowDown":
            event.preventDefault()
            keyboardScrollDown()
            break
          case "PageUp":
            event.preventDefault()
            pageScrollUp()
            break
          case "PageDown":
            event.preventDefault()
            pageScrollDown()
            break
          case "Home":
            event.preventDefault()
            lenisRef.current.scrollTo(0, {
              duration: getScrollDuration(1),
              easing: (t) => 1 - Math.pow(1 - t, 3),
            })
            break
          case "End":
            event.preventDefault()
            lenisRef.current.scrollTo(document.documentElement.scrollHeight, {
              duration: getScrollDuration(1),
              easing: (t) => 1 - Math.pow(1 - t, 3),
            })
            break
        }
      }, 50) // 50ms debounce
    }

    const handleKeyUp = (event) => {
      pressedKeys.delete(event.key)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      if (keyTimeout) clearTimeout(keyTimeout)
    }
  }, [keyboardScrollUp, keyboardScrollDown, pageScrollUp, pageScrollDown, getScrollDuration])

  // Scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let animationFrame = null
    const updateScrollProgress = () => {
      if (animationFrame) return

      animationFrame = requestAnimationFrame(() => {
        if (lenisRef.current && !lenisRef.current.isDestroyed) {
          const progress = lenisRef.current.progress || 0
          setScrollProgress(progress)
        }
        animationFrame = null
      })
    }

    if (lenisRef.current) {
      lenisRef.current.on("scroll", updateScrollProgress)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off("scroll", updateScrollProgress)
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      } else if (!document.hidden && lenisRef.current && !lenisRef.current.isDestroyed) {
        const raf = (time) => {
          if (lenisRef.current && !lenisRef.current.isDestroyed) {
            lenisRef.current.raf(time)
            rafRef.current = requestAnimationFrame(raf)
          }
        }
        rafRef.current = requestAnimationFrame(raf)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  return (
    <>
      {children}
      {/* Fixed Scroll Buttons - Only show on desktop */}
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
