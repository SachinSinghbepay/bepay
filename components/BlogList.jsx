import BlogCard from "./BlogCard"

export default function BlogList({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No blog posts found</h3>
        <p className="text-gray-500 mt-2">Check back soon for new content</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
