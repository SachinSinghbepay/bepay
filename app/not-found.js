'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { APP_DOWNLOAD_LINKS } from '@/lib/appDownloadLinks'
import { useAppDownload } from '@/hooks/useAppDownload'
import { AppDownloadPopups } from '@/components/AppDownloadPopups'

export default function NotFound() {
  const [device, setDevice] = useState(null) // 'android', 'ios', 'desktop', or null

  const {
    setIsQRPopupOpen,
    setSelectedOS,
    isQRPopupOpen,
    setIsOSPopupOpen,
    selectedOS,
  } = useAppDownload()

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isMac = /macintosh|mac os x/.test(userAgent)
    const hasTouch = 'ontouchend' in document

    if (/android/.test(userAgent)) {
      setDevice('android')
    } else if (/iphone|ipod/.test(userAgent) || (isMac && hasTouch)) {
      setDevice('ios')
    } else {
      setDevice('desktop')
    }
  }, [])

  const openSmartDownload = (targetOS) => {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
    const isAndroid = /android/i.test(ua)

    if (isAndroid && targetOS === 'android') {
      window.location.href = APP_DOWNLOAD_LINKS.android
      return
    }
    if (isIOS && targetOS === 'ios') {
      window.location.href = APP_DOWNLOAD_LINKS.ios
      return
    }

    // desktop or cross-device — show QR
    setSelectedOS(targetOS)
    setIsOSPopupOpen(false)
    setIsQRPopupOpen(true)
  }

  const getStoreButton = () => {
    if (device === null) {
      return <div className="h-[52px]" />
    }

    if (device === 'android') {
      return (
        <a
          href={APP_DOWNLOAD_LINKS.android}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/playstore.png" alt="Get it on Google Play" width={24} height={24} className="mr-2" />
          Download on Play Store
        </a>
      )
    }

    if (device === 'ios') {
      return (
        <a
          href={APP_DOWNLOAD_LINKS.ios}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/apple.png" alt="Download on App Store" width={24} height={24} className="mr-2" />
          Download on App Store
        </a>
      )
    }

    // desktop — both buttons use openSmartDownload (redirects on mobile, QR on desktop)
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => openSmartDownload('android')}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Image src="/playstore.png" alt="Get it on Google Play" width={24} height={24} className="mr-2" />
          Download on Play Store
        </button>
        <button
          onClick={() => openSmartDownload('ios')}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Image src="/apple.png" alt="Download on App Store" width={24} height={24} className="mr-2" />
          Download on App Store
        </button>
      </div>
    )
  }

  return (
    <>
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

      <AppDownloadPopups
        isOSPopupOpen={false}
        setIsOSPopupOpen={() => {}}
        isQRPopupOpen={isQRPopupOpen}
        setIsQRPopupOpen={setIsQRPopupOpen}
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
      />
    </>
  )
}
