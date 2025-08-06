"use client"
import { useEffect, useRef, useCallback, useState } from "react"
import Lenis from "@studio-freight/lenis"

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

    // Device-specific configurations optimized for responsiveness
    const getDeviceConfig = () => {
      const baseConfig = {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: "vertical",
        normalizeWheel: true,
        autoResize: true,
        wrapper: window,
        content: document.documentElement,
        orientation: "vertical",
        smoothWheel: true,
      }

      // Optimized settings for immediate responsiveness
      switch (deviceType.current) {
        case "mobile":
          return {
            ...baseConfig,
            lerp: 0.12, // Increased for faster response
            wheelMultiplier: 1.0,
            duration: 0.8,
            smoothTouch: true,
            touchMultiplier: 2,
          }
        case "mac":
          return {
            ...baseConfig,
            lerp: 0.1, // Optimized for Mac trackpad
            wheelMultiplier: 0.8,
            duration: 0.9,
            smoothTouch: false,
            // Better easing for trackpad
            easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          }
        case "windows":
          return {
            ...baseConfig,
            lerp: 0.1, // Increased for better response
            wheelMultiplier: 1.0,
            duration: 1.0,
            smoothTouch: false,
          }
        default: // Desktop with regular mouse wheel
          return {
            ...baseConfig,
            lerp: 0.1, // Increased for immediate response
            wheelMultiplier: 1.2,
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

    // Optimized RAF loop
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
        lenisRef.current.options.lerp = 1 // Instant scroll for reduced motion
        lenisRef.current.options.duration = 0.1
        lenisRef.current.options.smooth = false
      } else if (lenisRef.current) {
        // Revert to original config
        const originalConfig = getDeviceConfig()
        lenisRef.current.options.lerp = originalConfig.lerp
        lenisRef.current.options.duration = originalConfig.duration
        lenisRef.current.options.smooth = originalConfig.smooth
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
    const baseDuration = deviceType.current === "mobile" ? 0.5 : 0.6
    return amount > 0.4 ? baseDuration * 1.2 : baseDuration
  }, [])

  const scrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.3
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.3),
      easing: (t) => 1 - Math.pow(1 - t, 2),
    })
  }, [getScrollDuration])

  const scrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.3
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.3),
      easing: (t) => 1 - Math.pow(1 - t, 2),
    })
  }, [getScrollDuration])

  const pageScrollUp = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.8
    const targetScroll = Math.max(0, lenisRef.current.scroll - scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.8),
      easing: (t) => 1 - Math.pow(1 - t, 2),
    })
  }, [getScrollDuration])

  const pageScrollDown = useCallback(() => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    const scrollAmount = window.innerHeight * 0.8
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, lenisRef.current.scroll + scrollAmount)
    lenisRef.current.scrollTo(targetScroll, {
      duration: getScrollDuration(0.8),
      easing: (t) => 1 - Math.pow(1 - t, 2),
    })
  }, [getScrollDuration])

  const scrollToPosition = useCallback((position) => {
    if (!lenisRef.current || lenisRef.current.isDestroyed) return
    lenisRef.current.scrollTo(position, {
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 2),
    })
  }, [])

  // Keyboard navigation with improved responsiveness
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

      if (isInputActive || pressedKeys.has(event.key)) return

      pressedKeys.add(event.key)

      if (keyTimeout) clearTimeout(keyTimeout)

      // Reduced debounce time for better responsiveness
      keyTimeout = setTimeout(() => {
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault()
            scrollUp()
            break
          case "ArrowDown":
            event.preventDefault()
            scrollDown()
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
            scrollToPosition(0)
            break
          case "End":
            event.preventDefault()
            scrollToPosition(document.documentElement.scrollHeight)
            break
        }
      }, 25) // Reduced from 50ms to 25ms for faster response
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
  }, [scrollUp, scrollDown, pageScrollUp, pageScrollDown, scrollToPosition])

  // Optimized scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement
          const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle visibility change for performance
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

  return children
}

export default SmoothScroll