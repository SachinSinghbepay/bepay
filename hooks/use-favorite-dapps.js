"use client"

import { useState, useEffect, useCallback } from 'react'

/**
 * A client-side hook to manage favorite dapps with cookie consent and session validation.
 * 
 * Flow:
 * 1. Check if cookie consent exists (tracking cookies allowed)
 * 2. Validate session ID from sessionStorage
 * 3. Retrieve user's favorite dapps from localStorage or API
 * 4. Provide functions to add/remove favorites
 * 
 * @returns {Object} An object containing favorites list and functions to manage favorites
 */
export function useFavoriteDapps() {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)

  // Initialize on component mount
  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        setIsLoading(true)
        
        // Step 1: Check cookie consent
        const cookieConsent = getCookieConsent()
        if (!cookieConsent) {
          console.log('[Favorites] No cookie consent found')
          setIsLoading(false)
          setError('Cookie consent required to use favorites')
          return
        }
        
        setHasConsent(true)
        
        // Step 2: Check session ID
        const sid = getSessionId()
        if (!sid) {
          console.log('[Favorites] No session ID found')
          setIsLoading(false)
          setError('Session ID not found')
          return
        }
        
        setSessionId(sid)
        
        // Step 3: Retrieve user's favorites from localStorage or API
        const cachedFavorites = getLocalFavorites()
        if (cachedFavorites && cachedFavorites.length > 0) {
          setFavorites(cachedFavorites)
          console.log('[Favorites] Loaded from localStorage:', cachedFavorites)
        } else {
          // Try to fetch from API if no cache
          await fetchFavoritesFromAPI(sid)
        }
        
        setIsLoading(false)
      } catch (err) {
        console.error('[Favorites] Initialization error:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    initializeFavorites()
  }, [])

  /**
   * Get cookie consent from document.cookie
   */
  const getCookieConsent = () => {
    if (typeof document === 'undefined') return null
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {})

    const consentCookie = cookies['cookie_consent']
    if (!consentCookie) return null

    try {
      const consent = JSON.parse(decodeURIComponent(consentCookie))
      return consent.essential ? consent : null
    } catch (e) {
      console.error('[Favorites] Error parsing cookie consent:', e)
      return null
    }
  }

  /**
   * Get session ID from sessionStorage
   */
  const getSessionId = () => {
    if (typeof sessionStorage === 'undefined') return null
    return sessionStorage.getItem('sessionId')
  }

  /**
   * Get favorites from localStorage
   */
  const getLocalFavorites = () => {
    if (typeof localStorage === 'undefined') return []
    
    try {
      const stored = localStorage.getItem('favorited_dapps')
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error('[Favorites] Error reading localStorage:', e)
      return []
    }
  }

  /**
   * Save favorites to localStorage
   */
  const saveLocalFavorites = (favsList) => {
    if (typeof localStorage === 'undefined') return
    
    try {
      localStorage.setItem('favorited_dapps', JSON.stringify(favsList))
      console.log('[Favorites] Saved to localStorage:', favsList)
    } catch (e) {
      console.error('[Favorites] Error saving to localStorage:', e)
    }
  }

  /**
   * Fetch favorites from API
   */
  const fetchFavoritesFromAPI = async (sid) => {
    try {
      const response = await fetch(`/api/dapps/favorites?sessionId=${sid}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch favorites: ${response.statusText}`)
      }
      
      const data = await response.json()
      const favoritesList = data.favorites || []
      setFavorites(favoritesList)
      saveLocalFavorites(favoritesList)
      console.log('[Favorites] Fetched from API:', favoritesList)
    } catch (err) {
      console.error('[Favorites] API fetch error:', err)
      // Don't throw, just log - favorites are optional
    }
  }

  /**
   * Add a dapp to favorites
   */
  const addFavorite = useCallback(async (dapp) => {
    if (!hasConsent || !sessionId) {
      setError('Cannot add favorite without consent and session')
      return false
    }

    try {
      const updated = [...favorites, dapp]
      setFavorites(updated)
      saveLocalFavorites(updated)

      // Optional: Sync with API
      await fetch('/api/dapps/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          dapp,
          action: 'add',
        }),
      })

      console.log('[Favorites] Added:', dapp.name)
      return true
    } catch (err) {
      console.error('[Favorites] Error adding favorite:', err)
      setError(err.message)
      return false
    }
  }, [favorites, hasConsent, sessionId])

  /**
   * Remove a dapp from favorites
   */
  const removeFavorite = useCallback(async (dappName) => {
    if (!hasConsent || !sessionId) {
      setError('Cannot remove favorite without consent and session')
      return false
    }

    try {
      const updated = favorites.filter(fav => fav.name !== dappName)
      setFavorites(updated)
      saveLocalFavorites(updated)

      // Optional: Sync with API
      await fetch('/api/dapps/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          dappName,
          action: 'remove',
        }),
      })

      console.log('[Favorites] Removed:', dappName)
      return true
    } catch (err) {
      console.error('[Favorites] Error removing favorite:', err)
      setError(err.message)
      return false
    }
  }, [favorites, hasConsent, sessionId])

  /**
   * Check if a dapp is in favorites
   */
  const isFavorited = useCallback((dappName) => {
    return favorites.some(fav => fav.name === dappName)
  }, [favorites])

  /**
   * Toggle favorite status for a dapp
   */
  const toggleFavorite = useCallback(async (dapp) => {
    if (isFavorited(dapp.name)) {
      return await removeFavorite(dapp.name)
    } else {
      return await addFavorite(dapp)
    }
  }, [isFavorited, addFavorite, removeFavorite])

  return {
    favorites,
    isLoading,
    hasConsent,
    sessionId,
    error,
    addFavorite,
    removeFavorite,
    isFavorited,
    toggleFavorite,
  }
}
