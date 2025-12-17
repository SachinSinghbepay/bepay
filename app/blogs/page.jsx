"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getAllBlogs } from "@/lib/blogs"
import { getCategories } from "@/lib/categories"
import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import { ChevronRight } from "lucide-react"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  
  // Infinite Scroll State
  const [displayedBlogs, setDisplayedBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const BLOGS_PER_PAGE = 9

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [blogsData, categoriesData] = await Promise.all([
        getAllBlogs(),
        getCategories()
      ])
      setBlogs(blogsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Reset infinite scroll when filter changes
  useEffect(() => {
    if (selectedFilter !== "All") {
      setPage(1)
      setHasMore(true)
      const filtered = blogs.filter(blog => 
        selectedFilter === "Latest" ? true :
        selectedFilter === "Featured" ? blog.isFeatured :
        blog.category === selectedFilter
      )
      setDisplayedBlogs(filtered.slice(0, BLOGS_PER_PAGE))
    }
  }, [selectedFilter, blogs])

  // Load more blogs for infinite scroll
  const loadMoreBlogs = useCallback(() => {
    if (selectedFilter === "All") return

    const filtered = blogs.filter(blog => 
      selectedFilter === "Latest" ? true :
      selectedFilter === "Featured" ? blog.isFeatured :
      blog.category === selectedFilter
    )

    const nextBlogs = filtered.slice(0, (page + 1) * BLOGS_PER_PAGE)
    setDisplayedBlogs(nextBlogs)
    setPage(prev => prev + 1)
    
    if (nextBlogs.length >= filtered.length) {
      setHasMore(false)
    }
  }, [blogs, page, selectedFilter])

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

  // Helper to get blogs by category for "All" view
  const getBlogsByCategory = (categoryName) => {
    if (categoryName === "Latest") return blogs.slice(0, 10) // Show top 10 latest
    if (categoryName === "Featured") return blogs.filter(b => b.isFeatured).slice(0, 10)
    return blogs.filter(b => b.category === categoryName).slice(0, 10)
  }

  // Render "All" View (Horizontal Scroll Sections)
  const renderAllView = () => {
    const sections = [
      { name: "Latest", title: "Latest" },
      { name: "Featured", title: "Featured" },
      ...categories.map(c => ({ name: c.name, title: c.name }))
    ]

    return (
      <div className="space-y-12">
        {sections.map((section) => {
          const sectionBlogs = getBlogsByCategory(section.name)
          if (sectionBlogs.length === 0) return null

          return (
            <div key={section.name} className="flex flex-col">
              <div className="flex justify-between gap-9 items-center mb-6 px-1">
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
               <div className="h-[1px] max-w-[1167px] w-full bg-[#C0C0C080]"/>
                <button 
                  onClick={() => setSelectedFilter(section.name)}
                  className="flex items-center whitespace-nowrap cursor-pointer underline text-sm font-medium text-[#080808] hover:text-black/70 transition-colors"
                >
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              {/* Horizontal Scroll Container */}
              <div className="relative w-full">
                <div className="flex overflow-x-auto gap-6 pb-4 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                  {sectionBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                  {/* Spacer for right padding in scroll */}
                  <div className="w-1 flex-shrink-0" />
                </div>
              </div>
            </div>
          )
        })}
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
          if (displayedBlogs.length === index + 1) {
            return (
              <div ref={lastBlogElementRef} key={blog.id} className="w-full flex justify-center">
                <BlogCard blog={blog} />
              </div>
            )
          } else {
            return (
              <div key={blog.id} className="w-full flex justify-center">
                <BlogCard blog={blog} />
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
          {loading && categories.length === 0 ? (
             // Skeleton for filters
             Array(5).fill(0).map((_, i) => (
               <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
             ))
          ) : (
            <>
              <button
                onClick={() => setSelectedFilter("All")}
                className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
                  selectedFilter === "All"
                    ? "bg-black text-white"
                    : "text-[#6A6A6A] hover:bg-gray-100 border-[1px] border-[#C0C0C0]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("Latest")}
                className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
                  selectedFilter === "Latest"
                    ? "bg-black text-white"
                    : "text-[#6A6A6A] hover:bg-gray-100 border-[1px] border-[#C0C0C0]"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSelectedFilter("Featured")}
                className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
                  selectedFilter === "Featured"
                    ? "bg-black text-white"
                    : "text-[#6A6A6A] hover:bg-gray-100 border-[1px] border-[#C0C0C0]"
                }`}
              >
                Featured
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedFilter(category.name)}
                  className={`px-[30px] py-[10px] rounded-full text-sm font-medium transition-all ${
                    selectedFilter === category.name
                      ? "bg-black text-white"
                      : "text-[#6A6A6A] hover:bg-gray-100 border-[1px] border-[#C0C0C0]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {loading && blogs.length === 0 ? (
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
