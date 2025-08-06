"use client"
import { useEffect, useRef, useCallback, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

const SmoothScroll = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef(null)

  // Apply CSS smooth scrolling globally and handle mouse wheel
  useEffect(() => {
    // Set CSS smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    document.body.style.scrollBehavior = 'smooth'

    // Optional: Add custom CSS for enhanced smooth scrolling
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y proximity;
      }
      
      body {
        scroll-behavior: smooth;
      }
      
      /* Enhanced smooth scrolling for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
      
      /* Respect user's motion preferences */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `
    document.head.appendChild(style)

    // Enhanced mouse wheel handling for smooth scrolling
    let isWheelScrolling = false
    let wheelTimeout = null

    const handleWheel = (e) => {
      e.preventDefault()
      
      if (isWheelScrolling) return
      
      const delta = e.deltaY
      const scrollAmount = Math.abs(delta) > 100 ? window.innerHeight * 0.15 : window.innerHeight * 0.08
      const direction = delta > 0 ? 1 : -1
      const currentScroll = window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      let targetScroll
      if (direction > 0) {
        targetScroll = Math.min(maxScroll, currentScroll + scrollAmount)
      } else {
        targetScroll = Math.max(0, currentScroll - scrollAmount)
      }
      
      isWheelScrolling = true
      scrollWithEasing(targetScroll, 400)
      
      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        isWheelScrolling = false
      }, 100)
    }

    // Add wheel event listener
    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.head.removeChild(style)
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'
      document.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [])

  // Enhanced scroll functions with smooth behavior
  const scrollWithEasing = useCallback((targetY, duration = 800) => {
    const startY = window.pageYOffset
    const difference = targetY - startY
    const startTime = performance.now()

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)
      
      window.scrollTo(0, startY + difference * easedProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        isScrolling.current = false
      }
    }

    isScrolling.current = true
    requestAnimationFrame(animateScroll)
  }, [])

  const scrollUp = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.25
    const targetScroll = Math.max(0, window.pageYOffset - scrollAmount)
    scrollWithEasing(targetScroll, 600)
  }, [scrollWithEasing])

  const scrollDown = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.25
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, window.pageYOffset + scrollAmount)
    scrollWithEasing(targetScroll, 600)
  }, [scrollWithEasing])

  const keyboardScrollUp = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.25
    const targetScroll = Math.max(0, window.pageYOffset - scrollAmount)
    scrollWithEasing(targetScroll, 500)
  }, [scrollWithEasing])

  const keyboardScrollDown = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.25
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, window.pageYOffset + scrollAmount)
    scrollWithEasing(targetScroll, 500)
  }, [scrollWithEasing])

  const pageScrollUp = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.8
    const targetScroll = Math.max(0, window.pageYOffset - scrollAmount)
    scrollWithEasing(targetScroll, 800)
  }, [scrollWithEasing])

  const pageScrollDown = useCallback(() => {
    if (isScrolling.current) return
    const scrollAmount = window.innerHeight * 0.8
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = Math.min(maxScroll, window.pageYOffset + scrollAmount)
    scrollWithEasing(targetScroll, 800)
  }, [scrollWithEasing])

  // Keyboard navigation with debouncing
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

      keyTimeout = setTimeout(() => {
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
            scrollWithEasing(0, 800)
            break
          case "End":
            event.preventDefault()
            scrollWithEasing(document.documentElement.scrollHeight, 800)
            break
        }
      }, 50)
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
  }, [keyboardScrollUp, keyboardScrollDown, pageScrollUp, pageScrollDown, scrollWithEasing])

  // Scroll progress tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        const scrollTop = window.pageYOffset
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollTop / docHeight : 0
        setScrollProgress(Math.min(Math.max(progress, 0), 1))
      }, 10)
    }

    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
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