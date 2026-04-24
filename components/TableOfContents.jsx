"use client"
import { useEffect, useState } from "react"

export default function TableOfContents({ headings }) {
    const [activeId, setActiveId] = useState(headings?.[0]?.id || "")
    const [manualScrolling, setManualScrolling] = useState(false)

    // ✅ Set first heading active on load
    useEffect(() => {
        if (headings.length > 0) {
            setActiveId(headings[0].id)
        }
    }, [headings])

    useEffect(() => {
        const elements = headings.map(h => document.getElementById(h.id))

        const observer = new IntersectionObserver(
            (entries) => {
                if (manualScrolling) return

                const visibleHeadings = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

                if (visibleHeadings.length > 0) {
                    setActiveId(visibleHeadings[0].target.id)
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        )

        elements.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [headings, manualScrolling])


    const handleClick = (id) => {
        const el = document.getElementById(id)
        if (!el) return

        setManualScrolling(true)
        setActiveId(id)

        const yOffset = -120
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })

        setTimeout(() => setManualScrolling(false), 800) 
    }

    return (
        <div className="bg-gray-50 p-5 rounded-xl border">
            <h3 className="font-semibold mb-4">Contents</h3>
            <hr />
            <ul className="space-y-2 text-sm mt-6">
                {headings.map((item) => {
                    const isActive = activeId === item.id
                    return (
                        <li
                            key={item.id}
                            className={`${item.level === "h3" ? "ml-4" : ""}`}
                        >
                            <button
                                onClick={() => handleClick(item.id)}
                                className={`flex items-start gap-2 text-left transition cursor-pointer ${activeId === item.id ? "text-black font-semibold" : "text-gray-500"
                                    }`}
                            >
                                {/* Arrow */}
                                <span
                                    className={` transition ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    ▶
                                </span>

                                {item.text}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
