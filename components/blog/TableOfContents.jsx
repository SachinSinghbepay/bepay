"use client"

import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -66% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  // If no headings, we still might want to show the container to maintain layout, or just return null.
  // But if the user says "no sticky topic section", it might be because the headings aren't being detected.
  // Let's debug by ensuring we have headings.
  if (!headings || headings.length === 0) {
    return (
       <nav className="hidden lg:block sticky top-32 self-start w-64 flex-shrink-0">
          <p className="text-sm text-gray-400">No table of contents</p>
       </nav>
    )
  }

  return (
    <nav className="hidden lg:block sticky top-32 py-10 px-4 bg-[#C0C0C033] rounded-[25px] self-start w-64 flex-shrink-0">
      <h4 className="font-bold text-lg mb-4 text-gray-900">Contents</h4>
      <ul className="space-y-1 relative border-l-2 border-gray-100">
        {headings.map(({ id, text, level }) => (
          <li key={id} className="relative space-y-4">
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(id)
                if (element) {
                  const headerOffset = 100 // Adjust based on your fixed header height
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  })
                }
                setActiveId(id)
              }}
              className={`block py-2 pl-4 pr-2 text-sm transition-all duration-200 border-l-2 -ml-[2px] ${
                activeId === id
                  ? "border-black text-black font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
              style={{
                paddingLeft: level === 3 ? "1.5rem" : "1rem",
              }}
            >
              {activeId === id && (
                <ChevronRight className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 -ml-4" />
              )}
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
