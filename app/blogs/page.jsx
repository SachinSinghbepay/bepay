"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"

import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import HorizontalBlogSection from "./blogWidget/HorizontalBlogSection"
import Link from "next/link"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedFilter, setSelectedFilter] = useState("Latest")
  const [topics, setTopics] = useState([])

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then((data) => { if (data.success) setTopics(data.data); })
      .catch(() => {})
  }, [])

  // Infinite Scroll State
  const [displayedBlogs, setDisplayedBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const BLOGS_PER_PAGE = 9
  const isAllView = selectedFilter === "All"



  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs")
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        console.error("Failed to load blogs", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const blogsSource = blogs

  const normalizedBlogs = useMemo(() => {
    return blogsSource.map(blog => {
      const slug = blog.slug || blog.link?.split("/").pop()
      return {
        id: blog.id,
        title: blog.title,
        slug,
        featuredImage: blog.thumbnail,
        category: "Latest",
        isFeatured: false,
        createdAt: blog.publishedAt,
        content: blog.content || "",
      }
    })
  }, [blogsSource])



  useEffect(() => {
    if (selectedFilter === "All") return

    setPage(1)
    setHasMore(true)

    const filtered = normalizedBlogs.filter(blog => {
      const blogCat = blog.category?.toLowerCase().trim()
      const selectedCat = selectedFilter.toLowerCase().trim()

      if (selectedCat === "latest") return true
      if (selectedCat === "featured") return blog.isFeatured
      return blogCat === selectedCat
    })

    setDisplayedBlogs(filtered.slice(0, BLOGS_PER_PAGE))
  }, [selectedFilter, normalizedBlogs])

 

  // Load more blogs for infinite scroll
  const loadMoreBlogs = useCallback(() => {
    if (selectedFilter === "All") return

    const filtered = normalizedBlogs.filter(blog => {
      const blogCat = blog.category?.toLowerCase().trim()
      const selectedCat = selectedFilter.toLowerCase().trim()

      if (selectedCat === "latest") return true
      if (selectedCat === "featured") return blog.isFeatured
      return blogCat === selectedCat
    })

    const next = filtered.slice(0, (page + 1) * BLOGS_PER_PAGE)
    setDisplayedBlogs(next)
    setPage(p => p + 1)

    if (next.length >= filtered.length) {
      setHasMore(false)
    }
  }, [page, selectedFilter, normalizedBlogs])

  // Intersection Observer for Infinite Scroll
  const lastBlogElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && selectedFilter !== "All") {
        loadMoreBlogs()
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore, selectedFilter, loadMoreBlogs])


  const sections = [
    { name: "Latest", title: "Latest" },
    ...topics.map((t) => ({ name: t.name, title: t.name })),
  ]

  // Render "All" View (Horizontal Scroll Sections)
  const renderAllView = () => {
    console.log("RENDERING ALL VIEW")


    return (
      <div className="space-y-16">
        <HorizontalBlogSection
          title="Latest"
          blogs={normalizedBlogs}
          onViewAll={() => setSelectedFilter("Latest")}
        />

        <HorizontalBlogSection
          title="Featured"
          blogs={normalizedBlogs}
          onViewAll={() => setSelectedFilter("Featured")}
        />

        <HorizontalBlogSection
          title="Payments"
          blogs={normalizedBlogs}
          onViewAll={() => setSelectedFilter("Payments")}
        />

        <HorizontalBlogSection
          title="Crypto & stablecoins"
          blogs={normalizedBlogs}
          onViewAll={() => setSelectedFilter("Crypto & stablecoins")}
        />

      </div>
    )
  }

  // Render Category View (Grid with Infinite Scroll)
  const renderCategoryView = () => {
    if (displayedBlogs.length === 0 && !loading) {
      return (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-gray-600">No blogs found in this category.</h3>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayedBlogs.map((blog, index) => {
          const card = (
            <Link href={`/blogs/${blog.slug}`} className="w-full flex justify-center cursor-pointer">
              <BlogCard blog={blog} />
            </Link>
          )

          if (displayedBlogs.length === index + 1) {
            return (
              <div ref={lastBlogElementRef} key={blog.id} className="w-full flex justify-center">
                {card}
              </div>
            )
          } else {
            return (
              <div key={blog.id} className="w-full flex justify-center">
                {card}
              </div>
            )
          }
        })}

        {loading && Array(3).fill(0).map((_, i) => (
          <div key={i} className="w-full flex justify-center">
            <BlogCardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="bg-[#f9f9f9] min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl lg:text-[100px] font-extrabold mb-8 leading-tight tracking-tighter text-[#333333] text-center">
          Blogs
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12 justify-start sticky top-0 z-30 bg-[#f9f9f9]/80 backdrop-blur-sm py-4">
          {loading && sections.length === 0 ? (
            // Skeleton pills
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
                />
              ))
          ) : (
            <>
              {/* All */}
              <button
                onClick={() => setSelectedFilter("All")}
                className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${selectedFilter === "All"
                  ? "bg-black text-white"
                  : "text-[#6A6A6A] hover:bg-gray-100 border border-[#C0C0C0]"
                  }`}
              >
                All
              </button>

              {/* Sections */}
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => setSelectedFilter(section.name)}
                  className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${selectedFilter === section.name
                    ? "bg-black text-white"
                    : "text-[#6A6A6A] hover:bg-gray-100 border border-[#C0C0C0]"
                    }`}
                >
                  {section.title}
                </button>
              ))}
            </>
          )}
        </div>


        {/* Content Area */}
        <div className="min-h-[500px]">
          {loading && normalizedBlogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {Array(6).fill(0).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            selectedFilter === "All" ? renderAllView() : renderCategoryView()
          )}
        </div>
      </div>
    </main>
  )
}
