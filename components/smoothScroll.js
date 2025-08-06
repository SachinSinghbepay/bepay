"use client"
import { useEffect, useRef, useCallback, useState } from "react"
import Lenis from "@studio-freight/lenis"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const isInitialized = useRef(false)
  const deviceType = useRef("unknown")
  const animationFrameId = useRef(null)
  const startScroll = useRef(0)
  const targetScroll = useRef(0)
  const startTime = useRef(0)
  const animationDuration = 500 // milliseconds for the scroll animation

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

  // Easing function for smooth animation (ease-out quad)
  const easeOutQuad = (t) => t * (2 - t)

  const animateScroll = useCallback((currentTime) => {
    if (!startTime.current) startTime.current = currentTime
    const elapsed = currentTime - startTime.current
    const progress = Math.min(elapsed / animationDuration, 1)
    const easedProgress = easeOutQuad(progress)

    const currentPosition = startScroll.current + (targetScroll.current - startScroll.current) * easedProgress
    window.scrollTo(0, currentPosition)

    if (progress < 1) {
      animationFrameId.current = requestAnimationFrame(animateScroll)
    } else {
      animationFrameId.current = null
      startTime.current = 0
    }
  }, [])

  const handleWheel = useCallback((event) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      // Let browser handle scroll instantly if reduced motion is preferred
      return
    }

    event.preventDefault() // Prevent default browser scroll behavior

    const scrollAmount = event.deltaY
    const currentScroll = window.scrollY

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
      // If an animation is ongoing, start the new one from the current interpolated position
      startScroll.current = currentScroll
    } else {
      startScroll.current = currentScroll
    }

    // Calculate the new target scroll position, clamping it within document bounds
    targetScroll.current = Math.max(
      0,
      Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        startScroll.current + scrollAmount * 1.5 // Adjust multiplier for sensitivity
      )
    )

    startTime.current = 0 // Reset start time for the new animation
    animationFrameId.current = requestAnimationFrame(animateScroll)
  }, [animateScroll])

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

  // Add wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleWheel])

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

  const scrollByAmount = useCallback((amount) => {
    window.scrollBy({
      top: amount,
      behavior: "smooth",
    })
  }, [])

  const scrollToPosition = useCallback((position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
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
      // Prevent scrolling when an input, textarea, select, or contenteditable element is focused
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true" ||
        activeElement?.closest("input, textarea, select, [contenteditable]")

      if (isInputActive || pressedKeys.has(event.key)) return

      pressedKeys.add(event.key)

      if (keyTimeout) clearTimeout(keyTimeout)

      // Debounce key presses to avoid multiple scroll events for a single press
      keyTimeout = setTimeout(() => {
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault() // Prevent default browser scroll
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
  }, [scrollUp, scrollDown, pageScrollUp, pageScrollDown, scrollToPosition])

  // Scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      // Calculate scroll progress, handling cases where scrollHeight is not greater than clientHeight
      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    // Call once on mount to set initial progress
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
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

  return children
}

export default SmoothScroll