"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Link2, Twitter, Facebook, Linkedin, MessageCircle, X, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconBrandWhatsapp, IconBrandX } from "@tabler/icons-react"

export default function ShareDropdown({ title, url }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleShare = (platform) => {
    let shareUrl = ""
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
      setIsOpen(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      // Could add a toast here
      setIsOpen(false)
    } catch (err) {
      console.error("Failed to copy link", err)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="bg-gray-100 hover:bg-gray-200 rounded-lg h-10 w-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="h-5 w-5 text-gray-600" />
      </Button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-3xl border border-gray-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
            >
              <IconBrandX className="h-4 w-4" />
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
            >
              <Facebook className="h-4 w-4" />
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
            >
              <Linkedin className="h-4 w-4" />
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
            >
              <IconBrandWhatsapp className="h-4 w-4" />
              Share on WhatsApp
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <button
              onClick={copyLink}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
            >
              <Copy className="h-4 w-4" />
              Copy link
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
