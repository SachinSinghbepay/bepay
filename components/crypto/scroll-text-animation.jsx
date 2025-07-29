"use client"
import { useEffect, useRef, useState } from "react"
import { US } from "country-flag-icons/react/3x2"
import { GB } from "country-flag-icons/react/3x2"
import { EU } from "country-flag-icons/react/3x2"
import { CA } from "country-flag-icons/react/3x2"
import { JP } from "country-flag-icons/react/3x2"

const currencies = [
  { code: "USD", flag: US, name: "US Dollar" },
  { code: "EUR", flag: EU, name: "Euro" },
  { code: "GBP", flag: GB, name: "British Pound" },
  { code: "CAD", flag: CA, name: "Canadian Dollar" },
  { code: "JPY", flag: JP, name: "Japanese Yen" },
]

export default function ScrollTextAnimation() {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrollStart = rect.top + window.scrollY - windowHeight
      const scrollEnd = rect.top + window.scrollY + containerHeight
      const currentScroll = window.scrollY

      const progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / (scrollEnd - scrollStart)))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Individual word animations for first phase
  const getWordAnimation = (wordIndex, totalWords, phaseStart, phaseEnd) => {
    if (scrollProgress < phaseStart) {
      return {
        transform: `translate(100%, 50%)`,
        opacity: 0,
      }
    }

    if (scrollProgress > phaseEnd) {
      return {
        transform: `translate(-200%, 0%)`,
        opacity: 0,
      }
    }

    const phaseProgress = (scrollProgress - phaseStart) / (phaseEnd - phaseStart)
    const wordDelay = wordIndex * 0.13
    const wordDuration = 0.3

    if (phaseProgress < wordDelay) {
      return {
        transform: `translate(100%, 50%)`,
        opacity: 0,
      }
    }

    if (phaseProgress < wordDelay + wordDuration) {
      const wordProgress = (phaseProgress - wordDelay) / wordDuration
      const x = 100 - wordProgress * 100
      const y = 50 - wordProgress * 50
      return {
        transform: `translate(${x}%, ${y}%)`,
        opacity: wordProgress,
      }
    }

    if (phaseProgress < 0.7) {
      return {
        transform: `translate(0%, 0%)`,
        opacity: 1,
      }
    }

    const exitProgress = (phaseProgress - 0.7) / 0.3
    const x = -(exitProgress * 200)
    return {
      transform: `translate(${x}%, 0%)`,
      opacity: Math.max(0, 1 - exitProgress),
    }
  }

  // "earning potential" animation - appears, stays fixed, then disappears
  const getFixedTextAnimation = (wordIndex, phaseStart, phaseEnd) => {
    // Final exit phase - everything disappears after 85% scroll
    if (scrollProgress > 0.85) {
      const exitProgress = (scrollProgress - 0.85) / 0.15
      return {
        transform: `translate(0%, ${-exitProgress * 100}px)`,
        opacity: Math.max(0, 1 - exitProgress * 2),
      }
    }

    if (scrollProgress < phaseStart) {
      return {
        transform: `translate(100%, 50%)`,
        opacity: 0,
      }
    }

    if (scrollProgress >= phaseEnd) {
      return {
        transform: `translate(0%, 0%)`,
        opacity: 1,
      }
    }

    const phaseProgress = (scrollProgress - phaseStart) / (phaseEnd - phaseStart)
    const wordDelay = wordIndex * 0.15
    const wordDuration = 0.3

    if (phaseProgress < wordDelay) {
      return {
        transform: `translate(100%, 50%)`,
        opacity: 0,
      }
    }

    if (phaseProgress < wordDelay + wordDuration) {
      const wordProgress = (phaseProgress - wordDelay) / wordDuration
      const x = 100 - wordProgress * 100
      const y = 50 - wordProgress * 50
      return {
        transform: `translate(${x}%, ${y}%)`,
        opacity: wordProgress,
      }
    }

    return {
      transform: `translate(0%, 0%)`,
      opacity: 1,
    }
  }

  // Sub-description animation - appears after main text, then disappears
  const getSubDescriptionAnimation = () => {
    // Final exit phase - disappears after 85% scroll
    if (scrollProgress > 0.85) {
      const exitProgress = (scrollProgress - 0.85) / 0.15
      return {
        transform: `translateY(${exitProgress * 50}px)`,
        opacity: Math.max(0, 1 - exitProgress * 2),
      }
    }

    const subPhaseStart = 0.35 // Starts after main text is settled

    if (scrollProgress < subPhaseStart) {
      return {
        transform: `translateY(30px)`,
        opacity: 0,
      }
    }

    const subProgress = (scrollProgress - subPhaseStart) / 0.25
    const animProgress = Math.min(1, subProgress)

    return {
      transform: `translateY(${30 - animProgress * 30}px)`,
      opacity: animProgress,
    }
  }

  // "Your money" phase (0% - 40% scroll)
  const yourAnimation = getWordAnimation(1, 2, 0, 0.4)
  const moneyAnimation = getWordAnimation(2, 2, 0, 0.4)

  // "earning potential" phase (40% - 70% scroll) - then stays fixed until exit
  const onAnimation = getFixedTextAnimation(0, 0.4, 0.7)
  const yourSecondAnimation = getFixedTextAnimation(1, 0.4, 0.7)
  const termsAnimation = getFixedTextAnimation(2, 0.4, 0.7)

  // Sub-description animation
  const subDescriptionAnimation = getSubDescriptionAnimation()

  return (
    <div className="bg-gray-50">
      {/* Animation container */}
      <div ref={containerRef} className="relative h-[200vh] md:h-[400vh] overflow-hidden">
        <div className="min-h-screen sticky inset-0">
          {/* First phase: "Maximize Your" */}
          <div className="fixed z-10 inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-4">
              <span
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[180px] font-[500] text-[#C0C0C0] inline-block"
                style={{
                  transform: yourAnimation.transform,
                  opacity: yourAnimation.opacity,
                  transition: "none",
                }}
              >
                Maximize
              </span>
              <span
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[180px] font-[500] text-[#333333] inline-block"
                style={{
                  transform: moneyAnimation.transform,
                  opacity: moneyAnimation.opacity,
                  transition: "none",
                }}
              >
                Your
              </span>
            </div>
          </div>

          {/* Second phase: "earning potential" - stays fixed after appearing, then exits */}
          <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="flex items-center gap-2 sm:gap-4 mb-8">
              <span
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[160px] font-500 bg-gradient-to-r from-[#333333] to-[#999999] bg-clip-text text-transparent inline-block"
                style={{
                  transform: onAnimation.transform,
                  opacity: onAnimation.opacity,
                  transition: "none",
                }}
              >
                earning
              </span>
              <span
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[160px] font-[500] bg-gradient-to-r from-[#333333] to-[#999999] bg-clip-text text-transparent inline-block"
                style={{
                  transform: yourSecondAnimation.transform,
                  opacity: yourSecondAnimation.opacity,
                  transition: "none",
                }}
              >
                potential
              </span>
            </div>

            {/* Sub-description */}
            <div
              className="max-w-4xl text-center px-4"
              style={{
                transform: subDescriptionAnimation.transform,
                opacity: subDescriptionAnimation.opacity,
                transition: "none",
              }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-[#666666] font-light leading-relaxed">
                Multiple ways to grow your wealth with{" "}
                <span className="font-medium text-[#333333]">industry-leading returns</span> and{" "}
                <span className="font-medium text-[#333333]">innovative earning opportunities</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
