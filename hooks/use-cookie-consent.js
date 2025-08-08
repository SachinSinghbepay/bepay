"use client"

import { useState, useEffect, useCallback } from 'react'
import { setCookieConsent, getCookieConsent } from '@/app/actions'

/**
 * A client-side hook to manage cookie consent state and interact with server actions.
 * @param initialConsent The initial cookie preferences fetched from the server.
 * @returns An object containing consent state, functions to update consent, and banner visibility.
 */
export function useCookieConsent(initialConsent) {
  const [consent, setConsent] = useState(initialConsent)
  const [showBanner, setShowBanner] = useState(false)

  // Initialize banner visibility based on initial server-fetched consent
  useEffect(() => {
    if (!initialConsent) {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  }, [initialConsent])

  // Function to update consent via server action
  const updateConsent = useCallback(async (preferences) => {
    await setCookieConsent(preferences)
    setConsent(preferences) // Update local state immediately
    setShowBanner(false) // Hide banner after consent is given
  }, [])

  // Function to handle accepting all cookies
  const acceptAllCookies = useCallback(() => {
    const preferences = {
      essential: true,
      tracking: true,
      functionality: true,
      marketing: true,
    }
    updateConsent(preferences)
  }, [updateConsent])

  // Function to handle rejecting non-essential cookies
  const rejectNonEssentials = useCallback(() => {
    const preferences = {
      essential: true,
      tracking: false,
      functionality: false,
      marketing: false,
    }
    updateConsent(preferences)
  }, [updateConsent])

  // Function to handle saving custom preferences
  const saveCustomPreferences = useCallback((
    tracking,
    functionality,
    marketing
  ) => {
    const preferences = {
      essential: true,
      tracking,
      functionality,
      marketing,
    }
    updateConsent(preferences)
  }, [updateConsent])

  // Function to hide the banner without explicitly setting consent (e.g., if user closes)
  const dismissBanner = useCallback(() => {
    // If no consent was given yet, treat dismissal as rejecting non-essentials
    if (!consent) {
      rejectNonEssentials();
    } else {
      setShowBanner(false);
    }
  }, [consent, rejectNonEssentials]);


  return {
    consent,
    showBanner,
    acceptAllCookies,
    rejectNonEssentials,
    saveCustomPreferences,
    dismissBanner,
  }
}
