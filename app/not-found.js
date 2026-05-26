'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { APP_DOWNLOAD_LINKS } from '@/lib/appDownloadLinks'

export default function NotFound() {
  // 1. Start with 'null' to indicate we haven't checked yet.
  const [device, setDevice] = useState(null) // 'android', 'ios', 'desktop', or null

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    
    // Check for iPadOS (Mac user agent with touch capability)
    const isMac = /macintosh|mac os x/.test(userAgent)
    const hasTouch = 'ontouchend' in document

    if (/android/.test(userAgent)) {
      setDevice('android')
    } else if (/iphone|ipod/.test(userAgent) || (isMac && hasTouch)) {
      // Check for iPhone/iPod OR a Mac with touch (which is an iPad)
      setDevice('ios')
    } else {
      setDevice('desktop')
    }
  }, [])

  const playStoreUrl = APP_DOWNLOAD_LINKS.android
  const appStoreUrl = APP_DOWNLOAD_LINKS.ios

  const getStoreButton = () => {
    // 2. Don't render any button until the check is complete
    if (device === null) {
      return (
         <div className="h-[52px]"></div> // Placeholder to prevent layout jump
      )
    }

    if (device === 'android') {
      return (
        <a
          href={playStoreUrl}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/playstore.png"
            alt="Get it on Google Play"
            width={24}
            height={24}
            className="mr-2"
          />
          Download on Play Store
        </a>
      )
    } else if (device === 'ios') {
      return (
        <a
          href={appStoreUrl}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/apple.png"
            alt="Download on App Store"
            width={24}
            height={24}
            className="mr-2"
          />
          Download on App Store
        </a>
      )
    } else {
      // 'desktop'
      return (
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={playStoreUrl}
            // ... (rest of props)
          >
            {/* ... (content) */}
            Download on Play Store
          </a>
          <a
            href={appStoreUrl}
            // ... (rest of props)
          >
            {/* ... (content) */}
            Download on App Store
          </a>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="text-center p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <Image
            src="/bepayicon.png"
            alt="bepay Logo"
            width={150}
            height={40}
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist, but our app has everything you need!
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Download bepay money
        </h2>
        {getStoreButton()}
      </div>
    </div>
  )
}
