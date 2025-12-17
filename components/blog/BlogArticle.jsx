"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Clock1, User } from "lucide-react"
import { IconCalendarEvent } from "@tabler/icons-react"
import TableOfContents from "./TableOfContents"
import ShareDropdown from "./ShareDropdown"
import MaxWidthWrapper from "@/components/global/max-width-wrapper"

export default function BlogArticle({ blog }) {
  const [headings, setHeadings] = useState([])
  const [processedContent, setProcessedContent] = useState(blog.content)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    // Process content to add IDs to headings and extract TOC data
    // We do this to ensure IDs are part of the HTML string React renders, 
    // preventing them from being lost on re-renders.
    if (typeof window !== "undefined") {
      const parser = new DOMParser()
      const doc = parser.parseFromString(blog.content, "text/html")
      const elements = doc.querySelectorAll("h2, h3")
      
      const headingData = Array.from(elements).map((elem, index) => {
        const id = elem.id || `heading-${index}`
        elem.id = id
        return {
          id,
          text: elem.innerText,
          level: parseInt(elem.tagName.substring(1)),
        }
      })

      setHeadings(headingData)
      setProcessedContent(doc.body.innerHTML)
    }
  }, [blog.content])

  return (
    <div className="bg-[#f9f9f9] py-10">
      <MaxWidthWrapper>
        {/* Breadcrumbs / Category */}
        <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wide font-medium mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>&gt;</span>
          <Link href="/blogs" className="hover:text-black transition-colors">Blogs</Link>
          <span>&gt;</span>
          <span className="text-black font-bold">{blog.category || "Latest"}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          {/* Left Sidebar: TOC */}
          <TableOfContents headings={headings} />

          {/* Right Column: Title, Meta, Image, Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta & Share */}
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-[#6A6A6A]">{formatDate(blog.createdAt)}</span>
                <span className="text-[#6A6A6A]">|</span>
                <span className="text-[#6A6A6A]">{blog.readTime || "5 min read"}</span>
              </div>
              
              <ShareDropdown title={blog.title} url={currentUrl} />
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                 {/* Placeholder for author image if available, else initials */}
                 <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600 font-bold">
                    {blog.author ? blog.author.charAt(0) : "A"}
                 </div>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs text-gray-500">Written by</span>
                 <span className="font-bold text-sm text-[#1A1A1A]">{blog.author}</span>
              </div>
            </div>

             {/* Featured Image */}
            <div className="relative w-full aspect-[20/7] rounded-2xl overflow-hidden mb-12 shadow-sm">
                <Image
                src={blog.featuredImage || "/placeholder.svg?height=500&width=1200&query=blog"}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl prose-strong:text-[#1A1A1A]">
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
