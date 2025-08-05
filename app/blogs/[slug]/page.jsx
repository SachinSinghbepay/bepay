import { getBlogBySlug, getLatestBlogs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import Image from "next/image"

import { formatDate } from "@/lib/utils"
import BlogList from "@/components/BlogList"
import MaxWidthWrapper from "@/components/global/max-width-wrapper"
import { Clock, Clock1, User } from "lucide-react"
import { IconCalendarEvent } from "@tabler/icons-react"

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: "Blog Not Found | Invest Digital Asset Forum",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  }
}

export default async function BlogPage({ params }) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  // Get related blogs (excluding current blog)
  const relatedBlogs = (await getLatestBlogs(4)).filter((relatedBlog) => relatedBlog.id !== blog.id).slice(0, 3)

  return (
    <main className="bg-[#f9f9f9]">
      {/* Blog Header */}
      <div className=" text-black py-36">
        <MaxWidthWrapper>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
                <User size={20}/>
              <span className="uppercase">{blog.author}</span>
            </div>

            <div className="flex items-center gap-2">
                <IconCalendarEvent  size={20}/>
              <span>{formatDate(blog.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
                <Clock1 size={20}/>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Featured Image */}
      <div className="relative max-w-7xl mx-auto w-full h-[300px] grayscale md:h-[500px]">
        <Image
          src={blog.featuredImage || "/placeholder.svg?height=500&width=1200&query=blog"}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Blog Content */}
      <MaxWidthWrapper className="py-12 ">
        <div className=" mx-auto max-w-6xl">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-800 prose-a:text-blue-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </MaxWidthWrapper>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className=" py-12">
          <MaxWidthWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Posts</h2>
            <BlogList blogs={relatedBlogs} />
          </MaxWidthWrapper>
        </div>
      )}
    </main>
  )
}
