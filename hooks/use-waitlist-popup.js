"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "waitlist_popup_state"
const CLOSE_DURATION = 24 * 60 * 60 * 1000 // 1 day in milliseconds
 


export const useWaitlistPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [popupState, setPopupState] = useState({
    isSubmitted: false,
    lastClosedAt: null,
  })

  // Load state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setPopupState(parsed)
      } catch (error) {
        console.error("Error parsing popup state:", error)
      }
    }
  }, [])

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  // Show popup after scroll if conditions are met
  useEffect(() => {
    if (hasScrolled && !isOpen && shouldShowPopup()) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000) // Delay for smooth experience

      return () => clearTimeout(timer)
    }
  }, [hasScrolled, popupState])

  const shouldShowPopup = () => {
    // Don't show if already submitted
    if (popupState.isSubmitted) return false

    // Don't show if closed within last 24 hours
    if (popupState.lastClosedAt) {
      const timeSinceClose = Date.now() - popupState.lastClosedAt
      if (timeSinceClose < CLOSE_DURATION) return false
    }

    return true
  }

  const openPopup = () => {
    if (shouldShowPopup()) {
      setIsOpen(true)
    }
  }

  const closePopup = () => {
    setIsOpen(false)
    const newState = {
      ...popupState,
      lastClosedAt: Date.now(),
    }
    setPopupState(newState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  }

  const markAsSubmitted = () => {
    const newState = {
      ...popupState,
      isSubmitted: true,
    }
    setPopupState(newState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    setIsOpen(false)
  }

  return {
    isOpen,
    openPopup,
    closePopup,
    markAsSubmitted,
    canShow: shouldShowPopup(),
  }
}
