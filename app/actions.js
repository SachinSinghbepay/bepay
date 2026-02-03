'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'



const COOKIE_NAME = 'cookie_consent'
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365


export async function getCookieConsent() {
  const cookieStore = cookies()
  const consentCookie = cookieStore.get(COOKIE_NAME)
  if (consentCookie) {
    try {
      return JSON.parse(consentCookie.value) 
    } catch (error) {
      console.error('Failed to parse cookie consent:', error)
      // If parsing fails, treat as no consent to prompt user again
      return null
    }
  }
  return null
}

export async function setCookieConsent(preferences) {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, JSON.stringify(preferences), {
    httpOnly: true, // Prevents client-side JavaScript access for security
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    maxAge: ONE_YEAR_IN_SECONDS, // Cookie expires in 1 year
    path: '/', // Available across the entire site
    sameSite: 'lax', // Protects against CSRF attacks
  })
  console.log('Cookie consent set:', preferences)
  // Revalidate the path to ensure the server component re-renders with the new cookie state
  revalidatePath('/')
}

/**
 * Deletes the cookie consent cookie.
 * This function runs on the server.
 */
export async function deleteCookieConsent() {
  const cookieStore = cookies()
  cookieStore.delete(COOKIE_NAME)
  console.log('Cookie consent deleted.')
  revalidatePath('/')
}
