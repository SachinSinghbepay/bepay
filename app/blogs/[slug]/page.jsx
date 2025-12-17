import { getBlogBySlug, getLatestBlogs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import BlogList from "@/components/BlogList"
import MaxWidthWrapper from "@/components/global/max-width-wrapper"
import BlogArticle from "@/components/blog/BlogArticle"

// Helper to serialize Firestore timestamps
const serializeBlog = (blog) => {
  if (!blog) return null
  return {
    ...blog,
    createdAt: blog.createdAt?.toDate ? blog.createdAt.toDate().toISOString() : blog.createdAt,
    updatedAt: blog.updatedAt?.toDate ? blog.updatedAt.toDate().toISOString() : blog.updatedAt,
  }
}

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
  const rawBlog = await getBlogBySlug(params.slug)

  if (!rawBlog) {
    notFound()
  }

  const blog = serializeBlog(rawBlog)

  // Get related blogs (excluding current blog)
  const rawRelatedBlogs = await getLatestBlogs(4)
  const relatedBlogs = rawRelatedBlogs
    .filter((relatedBlog) => relatedBlog.id !== blog.id)
    .slice(0, 3)
    .map(serializeBlog)

  return (
    <main className="bg-[#f9f9f9]">
      <BlogArticle blog={blog} />

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="py-12 border-t border-gray-200">
          <MaxWidthWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#1A1A1A]">Related Posts</h2>
            <BlogList blogs={relatedBlogs} />
          </MaxWidthWrapper>
        </div>
      )}
    </main>
  )
}
