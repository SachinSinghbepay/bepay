"use client"
import { useEffect, useRef, useCallback, useState, useMemo } from "react"
import Lenis from "@studio-freight/lenis"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const isInitialized = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const keyTimeoutRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Optimized device detection with memoization
  const deviceConfig = useMemo(() => {
    if (typeof window === 'undefined') return { type: 'desktop', config: {} }
    
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isTablet = /ipad|tablet|playbook|silk/i.test(userAgent)
    const isMac = /mac|macintosh/i.test(userAgent)
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    const hasTouchscreen = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Base configuration optimized for performance
    const baseConfig = {
      duration: hasReducedMotion ? 0.3 : 1,
      easing: (t) => hasReducedMotion ? t : Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: !hasReducedMotion,
      smoothTouch: false, // Disabled by default to prevent conflicts
      touchMultiplier: 1,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      orientation: "vertical",
      smoothWheel: !hasReducedMotion,
    }

    let deviceType = 'desktop'
    let config = { ...baseConfig }

    if (isMobile && !isTablet) {
      deviceType = 'mobile'
      config = {
        ...baseConfig,
        lerp: hasReducedMotion ? 0.3 : 0.12, // Slightly slower for better performance
        wheelMultiplier: 0.6,
        duration: hasReducedMotion ? 0.2 : 0.6,
        smoothTouch: false, // Keep disabled to prevent conflicts with native scrolling
        touchMultiplier: 1,
      }
    } else if (isTablet) {
      deviceType = 'tablet'
      config = {
        ...baseConfig,
        lerp: hasReducedMotion ? 0.25 : 0.1,
        wheelMultiplier: 0.8,
        duration: hasReducedMotion ? 0.3 : 0.8,
        smoothTouch: false,
      }
    } else if (isMac) {
      deviceType = 'mac'
      config = {
        ...baseConfig,
        lerp: hasReducedMotion ? 0.25 : 0.08, // Slower for precision trackpads
        wheelMultiplier: 0.6,
        duration: hasReducedMotion ? 0.3 : 1,
      }
    } else {
      // Desktop/Windows
      config = {
        ...baseConfig,
        lerp: hasReducedMotion ? 0.25 : 0.06, // Even slower for mouse wheels
        wheelMultiplier: 1,
        duration: hasReducedMotion ? 0.3 : 1.2,
      }
    }

    return { type: deviceType, config, hasReducedMotion }
  }, [])

  // Initialize Lenis with optimized settings
  useEffect(() => {
    if (isInitialized.current || typeof window === 'undefined') return

    // Create Lenis instance
    lenisRef.current = new Lenis({
      ...deviceConfig.config,
      prevent: (node) => {
        if (!node) return false
        
        // More comprehensive prevention logic
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("no-smooth-scroll") ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.contentEditable === "true" ||
          node.getAttribute("role") === "button" ||
          node.getAttribute("role") === "link" ||
          !!node.closest("input, textarea, select, [contenteditable], [data-lenis-prevent], [role='button'], [role='link']")
        )
      },
    })

    // Optimized RAF loop with frame skipping for performance
    let lastTime = 0
    const targetFPS = deviceConfig.type === 'mobile' ? 30 : 60 // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS

    const raf = (time) => {
      if (!lenisRef.current?.isDestroyed) {
        // Frame skipping for performance
        if (time - lastTime >= frameInterval) {
          lenisRef.current?.raf(time)
          lastTime = time
        }
        rafRef.current = requestAnimationFrame(raf)
      }
    }
    
    rafRef.current = requestAnimationFrame(raf)
    isInitialized.current = true

    // Expose globally but with safety checks
    if (typeof window !== "undefined") {
      window.lenis = lenisRef.current
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current && !lenisRef.current.isDestroyed) {
        lenisRef.current.destroy()
      }
      if (typeof window !== "undefined") {
        delete window.lenis
      }
      isInitialized.current = false
    }
  }, [deviceConfig])

  // Optimized scroll functions with device-aware performance
  const getScrollSettings = useCallback((amount) => {
    const baseDuration = deviceConfig.hasReducedMotion ? 0.2 : 
                        deviceConfig.type === 'mobile' ? 0.4 : 0.6
    
    return {
      duration: amount > 0.5 ? baseDuration * 1.2 : baseDuration,
      easing: deviceConfig.hasReducedMotion ? (t) => t : (t) => 1 - Math.pow(1 - t, 2.5)
    }
  }, [deviceConfig])

  const scrollUp = useCallback(() => {
    if (!lenisRef.current?.isDestroyed) {
      const scrollAmount = Math.min(window.innerHeight * 0.3, 400) // Cap scroll amount
      const targetScroll = Math.max(0, (lenisRef.current?.scroll || 0) - scrollAmount)
      const settings = getScrollSettings(0.3)
      lenisRef.current?.scrollTo(targetScroll, settings)
    }
  }, [getScrollSettings])

  const scrollDown = useCallback(() => {
    if (!lenisRef.current?.isDestroyed) {
      const scrollAmount = Math.min(window.innerHeight * 0.3, 400)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const targetScroll = Math.min(maxScroll, (lenisRef.current?.scroll || 0) + scrollAmount)
      const settings = getScrollSettings(0.3)
      lenisRef.current?.scrollTo(targetScroll, settings)
    }
  }, [getScrollSettings])

  // Debounced keyboard handling to prevent conflicts with GSAP/Framer Motion
  useEffect(() => {
    const pressedKeys = new Set()

    const handleKeyDown = (event) => {
      // Enhanced input detection
      const activeElement = document.activeElement
      const isInputActive = 
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT" ||
        activeElement?.contentEditable === "true" ||
        activeElement?.closest("input, textarea, select, [contenteditable], .ProseMirror")

      if (isInputActive || !lenisRef.current || pressedKeys.has(event.key)) return

      pressedKeys.add(event.key)

      // Clear previous timeout
      if (keyTimeoutRef.current) {
        clearTimeout(keyTimeoutRef.current)
      }

      // Longer debounce to prevent conflicts with other animations
      keyTimeoutRef.current = setTimeout(() => {
        if (!lenisRef.current?.isDestroyed) {
          const settings = getScrollSettings(0.3)
          
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
              const pageUpAmount = window.innerHeight * 0.8
              const pageUpTarget = Math.max(0, (lenisRef.current?.scroll || 0) - pageUpAmount)
              lenisRef.current?.scrollTo(pageUpTarget, { ...settings, duration: settings.duration * 1.5 })
              break
            case "PageDown":
              event.preventDefault()
              const pageDownAmount = window.innerHeight * 0.8
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight
              const pageDownTarget = Math.min(maxScroll, (lenisRef.current?.scroll || 0) + pageDownAmount)
              lenisRef.current?.scrollTo(pageDownTarget, { ...settings, duration: settings.duration * 1.5 })
              break
            case "Home":
              event.preventDefault()
              lenisRef.current?.scrollTo(0, { ...settings, duration: settings.duration * 2 })
              break
            case "End":
              event.preventDefault()
              lenisRef.current?.scrollTo(document.documentElement.scrollHeight, { ...settings, duration: settings.duration * 2 })
              break
          }
        }
      }, 80) // Increased debounce time
    }

    const handleKeyUp = (event) => {
      pressedKeys.delete(event.key)
    }

    document.addEventListener("keydown", handleKeyDown, { passive: false })
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      if (keyTimeoutRef.current) {
        clearTimeout(keyTimeoutRef.current)
      }
    }
  }, [scrollUp, scrollDown, getScrollSettings])

  // Throttled scroll progress tracking
  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lenisRef.current && !lenisRef.current.isDestroyed) {
            const progress = lenisRef.current.progress || 0
            setScrollProgress(progress)
          }
          ticking = false
        })
        ticking = true
      }
    }

    if (lenisRef.current) {
      lenisRef.current.on("scroll", updateScrollProgress)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off("scroll", updateScrollProgress)
      }
    }
  }, [])

  // Optimized visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      } else if (lenisRef.current && !lenisRef.current.isDestroyed) {
        let lastTime = 0
        const targetFPS = deviceConfig.type === 'mobile' ? 30 : 60
        const frameInterval = 1000 / targetFPS

        const raf = (time) => {
          if (lenisRef.current && !lenisRef.current.isDestroyed) {
            if (time - lastTime >= frameInterval) {
              lenisRef.current.raf(time)
              lastTime = time
            }
            rafRef.current = requestAnimationFrame(raf)
          }
        }
        rafRef.current = requestAnimationFrame(raf)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [deviceConfig.type])

  return (
    <>
      {children}
      {/* Scroll buttons - only show on desktop and when not using reduced motion */}
      {/* {deviceConfig.type === 'desktop' && !deviceConfig.hasReducedMotion && (
        <div className="fixed bottom-8 right-8 flex-col gap-3 z-50 lg:flex hidden">
          <button
            onClick={scrollUp}
            className="group relative w-12 h-12 bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Scroll up"
            disabled={scrollProgress === 0}
          >
            <ArrowUp
              size={16}
              className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
              strokeWidth={2}
            />
          </button>
          <button
            onClick={scrollDown}
            className="group relative w-12 h-12 bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Scroll down"
            disabled={scrollProgress === 1}
          >
            <ArrowDown
              size={16}
              className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
              strokeWidth={2}
            />
          </button>
        </div>
      )} */}
    </>
  )
}

export default SmoothScroll