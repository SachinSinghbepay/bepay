"use client"

import { useState, useEffect, useRef, useCallback } from "react"
// import { getAllBlogs } from "@/lib/blogs"
// import { getCategories } from "@/lib/categories"
import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import { ChevronRight } from "lucide-react"
import HorizontalBlogSection from "./blogWidget/HorizontalBlogSection"
import Link from "next/link"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  // const [categories, setCategories] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("All")

  // Infinite Scroll State
  const [displayedBlogs, setDisplayedBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const BLOGS_PER_PAGE = 9
  const isAllView = selectedFilter === "All"

  const BLOGS_DATA = [
    {
      id: "1",
      title: "How to Receive International Payments in India: A 2025 Guide for Freelancers & Businesses",
      slug: "receive-international-payments-india-2025",
      featuredImage: "/blog1.png",
      category: "Latest",
      tags: ["Payments"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "2",
      title: "Cross-Border Payments for Marketplaces: Challenges and Solutions",
      slug: "cross-border-payments-marketplaces",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["Payments"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "3",
      title: "How Long Do International Money Transfers Take?",
      slug: "international-money-transfers-time",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["Payments"],
      isFeatured: true,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "4",
      title: "Stablecoin vs Traditional FX for Cross-Border Payments",
      slug: "stablecoin-vs-traditional-fx",
      featuredImage: "/blog1.png",
      category: "Crypto & Stablecoins",
      tags: ["Crypto"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "5",
      title: "Best Payment Methods for Global Freelancers in 2025",
      slug: "best-payment-methods-freelancers-2025",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["Payments"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "6",
      title: "How Startups Can Accept International Payments Easily",
      slug: "startups-accept-international-payments",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["Payments"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "7",
      title: "Multi-Currency Accounts: What They Are and Why You Need One",
      slug: "multi-currency-accounts-explained",
      featuredImage: "/blog1.png",
      category: "Multi-currency accounts",
      tags: ["Accounts"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "8",
      title: "Reducing FX Fees in International Transfers",
      slug: "reducing-fx-fees-international-transfers",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["FX"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "9",
      title: "International Payments Compliance: What Businesses Must Know",
      slug: "international-payments-compliance-guide",
      featuredImage: "/blog1.png",
      category: "Compliance",
      tags: ["Compliance"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
    {
      id: "10",
      title: "Future of Cross-Border Payments in Asia",
      slug: "future-cross-border-payments-asia",
      featuredImage: "/blog1.png",
      category: "Payments",
      tags: ["Payments"],
      isFeatured: false,
      createdAt: "2025-11-01",
      content: "Dummy content for reading time calculation.",
    },
  ];


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

  const normalizedBlogs = blogsSource.map(blog => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug || blog.link.split("/").pop(),
    featuredImage: blog.thumbnail,
    category: "Latest",
    isFeatured: false,
    createdAt: blog.publishedAt,
    content: blog.content || "",
  }))


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     const [blogsData, categoriesData] = await Promise.all([
  //       getAllBlogs(),
  //       getCategories()
  //     ])
  //     setBlogs(blogsData)
  //     setCategories(categoriesData)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)

  //     const blogsData = await getAllBlogs()
  //     console.log("BLOGS FROM DB:", blogsData)

  //     setBlogs(blogsData)
  //     setLoading(false)
  //   }

  //   fetchData()
  // }, [])

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

  // Reset infinite scroll when filter changes
  // useEffect(() => {
  //   if (selectedFilter !== "All") {
  //     setPage(1)
  //     setHasMore(true)
  //     const filtered = blogs.filter(blog =>
  //       selectedFilter === "Latest" ? true :
  //         selectedFilter === "Featured" ? blog.isFeatured :
  //           selectedFilter === "Crypto & stablecoins" ? blog.category === "Crypto & stablecoins" :
  //             selectedFilter === "Payments" ? blog.category === "Payments" :
  //               selectedFilter === "Multi-currency accounts" ? blog.category === "Multi-currency accounts" :
  //                 selectedFilter === "Discussion" ? blog.category === "Discussion" :
  //                   selectedFilter === "Tech" ? blog.category === "Tech" :
  //                     selectedFilter === "Product updates" ? blog.category === "Product updates" :
  //                       selectedFilter === "Compliance/tax" ? blog.category === "Compliance/tax" :
  //                         blog.category === selectedFilter
  //     )
  //     setDisplayedBlogs(filtered.slice(0, BLOGS_PER_PAGE))
  //   }
  // }, [selectedFilter, blogs])

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
  }, [page, selectedFilter])

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
  // const getBlogsByCategory = (categoryName) => {
  //   if (categoryName === "Latest") return blogs.slice(0, 10)
  //   if (categoryName === "Featured") return blogs.filter(b => b.isFeatured).slice(0, 10)
  //   if (categoryName === "Crypto & stablecoins") return blogs.filter(b => b.category === "Crypto & stablecoins").slice(0, 10)
  //   if (categoryName === "Payments") return blogs.filter(b => b.category === "Payments").slice(0, 10)
  //   if (categoryName === "Multi-currency accounts") return blogs.filter(b => b.category === "Multi-currency accounts").slice(0, 10)
  //   if (categoryName === "Discussion") return blogs.filter(b => b.category === "Discussion").slice(0, 10)
  //   if (categoryName === "Tech") return blogs.filter(b => b.category === "Tech").slice(0, 10)
  //   if (categoryName === "Product updates") return blogs.filter(b => b.category === "Product updates").slice(0, 10)
  //   if (categoryName === "Compliance/tax") return blogs.filter(b => b.category === "Compliance/tax").slice(0, 10)
  //   return blogs.filter(b => b.category === categoryName).slice(0, 10)
  // }

  const sections = [
    { name: "Latest", title: "Latest" },
    { name: "Featured", title: "Featured" },
    { name: "Crypto & stablecoins", title: "Crypto & stablecoins" },
    { name: "Payments", title: "Payments" },
    { name: "Multi-currency accounts", title: "Multi-currency accounts" },
    { name: "Discussion", title: "Discussion" },
    { name: "Tech", title: "Tech" },
    { name: "Product updates", title: "Product updates" },
    { name: "Compliance/tax", title: "Compliance/tax" },
    // ...categories.map(c => ({ name: c.name, title: c.name }))
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
