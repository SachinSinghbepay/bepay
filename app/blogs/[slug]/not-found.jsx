import Link from "next/link"

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The blog post you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/blogs" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
        View All Blogs
      </Link>
    </div>
  )
}
