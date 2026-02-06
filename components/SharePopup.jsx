"use client"

import { useState } from "react"
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa6"

export default function SharePopup({ url, title }) {
    const [open, setOpen] = useState(false)

    const shareLinks = [
        {
            name: "Twitter",
            icon: <FaXTwitter className="text-black" />,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: "Facebook",
            icon: <FaFacebookF className="text-blue-600" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn className="text-blue-700" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        {
            name: "WhatsApp",
            icon: <FaWhatsapp className="text-green-500" />,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
        },
    ]

    const copyLink = async () => {
        await navigator.clipboard.writeText(url)
        alert("Link copied!")
    }

    return (
        <div className="relative">
            {/* Share Button */}
            <button onClick={() => setOpen(!open)}>
                <img src="/icons/share.svg" alt="Share" className="w-10 h-10" />
            </button>

            {/* Popup */}
            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl p-4 space-y-4 z-50">
                    {shareLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg"
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>Share on {item.name}</span>
                        </a>
                    ))}

                    <button
                        onClick={copyLink}
                        className="flex items-center gap-3 w-full text-left hover:bg-gray-100 p-2 rounded-lg"
                    >
                        <FaLink />
                        Copy link
                    </button>
                </div>
            )}
        </div>
    )
}
