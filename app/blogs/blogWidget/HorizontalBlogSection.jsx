import { useRef } from "react"
import BlogCard from "@/components/BlogCard"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HorizontalBlogSection({
  title,
  blogs = [],
  onViewAll,
  sectionRef,
}) {
  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  if (!blogs.length) return null

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const onMouseUp = () => {
    isDragging.current = false
  }

  const onMouseLeave = () => {
    isDragging.current = false
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX.current) * 1.2
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-6 px-1">
        <h2 className="text-lg font-medium text-[#6A6A6A] whitespace-nowrap">
          {title}
        </h2>

        <div className="flex-1 h-[1px] bg-[#E5E5E5]" />

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center text-sm font-medium underline hover:opacity-70"
          >
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className="
          flex gap-6 overflow-x-auto pb-4
          scrollbar-hide
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          cursor-grab active:cursor-grabbing
          select-none
        "
      >
        {blogs.map((blog) => (
          <div key={blog.id} className="flex-shrink-0">
            <Link href={`/blogs/${blog.slug}`} className="cursor-pointer block">
              <BlogCard blog={blog} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
