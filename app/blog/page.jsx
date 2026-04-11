"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import Link from "next/link"

export default function BlogListPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState("All")

  const [displayedPosts, setDisplayedPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const POSTS_PER_PAGE = 9

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blogPosts?status=published")
        const data = await res.json()
        setPosts(data.success ? data.data : [])
      } catch (err) {
        console.error("Failed to load posts", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const normalizedPosts = useMemo(() => {
    return posts.map(post => ({
      id: String(post._id),
      title: post.title,
      slug: post.slug,
      featuredImage: post.coverImage,
      category: post.categories?.[0] || "",
      isFeatured: false,
      createdAt: post.publishedAt,
      content: post.excerpt || "",
    }))
  }, [posts])

  const sections = useMemo(() => {
    const cats = new Set(normalizedPosts.map(p => p.category).filter(Boolean))
    return Array.from(cats).map(c => ({ name: c, title: c }))
  }, [normalizedPosts])

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    const filtered = normalizedPosts.filter(post => {
      if (selectedFilter === "All") return true
      return post.category?.toLowerCase() === selectedFilter.toLowerCase()
    })
    setDisplayedPosts(filtered.slice(0, POSTS_PER_PAGE))
  }, [selectedFilter, normalizedPosts])

  const loadMore = useCallback(() => {
    const filtered = normalizedPosts.filter(post => {
      if (selectedFilter === "All") return true
      return post.category?.toLowerCase() === selectedFilter.toLowerCase()
    })
    const next = filtered.slice(0, (page + 1) * POSTS_PER_PAGE)
    setDisplayedPosts(next)
    setPage(p => p + 1)
    if (next.length >= filtered.length) setHasMore(false)
  }, [page, selectedFilter, normalizedPosts])

  const lastPostRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore()
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, loadMore])

  return (
    <main className="bg-[#f9f9f9] min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-[100px] font-extrabold mb-8 leading-tight tracking-tighter text-[#333333] text-center">
          Blogs
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12 justify-start sticky top-0 z-30 bg-[#f9f9f9]/80 backdrop-blur-sm py-4">
          <button
            onClick={() => setSelectedFilter("All")}
            className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
              selectedFilter === "All"
                ? "bg-black text-white"
                : "text-[#6A6A6A] hover:bg-gray-100 border border-[#C0C0C0]"
            }`}
          >
            All
          </button>
          {sections.map(section => (
            <button
              key={section.name}
              onClick={() => setSelectedFilter(section.name)}
              className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
                selectedFilter === section.name
                  ? "bg-black text-white"
                  : "text-[#6A6A6A] hover:bg-gray-100 border border-[#C0C0C0]"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {loading && normalizedPosts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {Array(6).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          ) : displayedPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-medium text-gray-600">No posts published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {displayedPosts.map((post, index) => {
                const card = (
                  <Link href={`/blog/${post.slug}`} className="w-full flex justify-center cursor-pointer">
                    <BlogCard blog={post} />
                  </Link>
                )
                if (displayedPosts.length === index + 1) {
                  return (
                    <div ref={lastPostRef} key={post.id} className="w-full flex justify-center">
                      {card}
                    </div>
                  )
                }
                return (
                  <div key={post.id} className="w-full flex justify-center">
                    {card}
                  </div>
                )
              })}
              {loading && Array(3).fill(0).map((_, i) => (
                <div key={i} className="w-full flex justify-center">
                  <BlogCardSkeleton />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
