import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ blog }) {
  // Calculate reading time (mock calculation: 200 words per minute)
  // If content is not available, default to 5 min
  const words = blog.content ? blog.content.split(/\s+/).length : 1000;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="flex flex-col w-full max-w-[400px] h-[379px] bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 snap-center">
      {/* Featured Image */}
      <div className="w-full h-[200px] relative">
        <Link href={`/blogs/${blog.slug}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={
                blog.featuredImage ||
                "/placeholder.svg?height=400&width=600&query=blog"
              }
              alt={blog.title}
              fill
              className="object-cover rounded-[24px] p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>

      {/* Blog Details */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-[#FDF4E3] text-[#9A7B4F] text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category || "Latest"}
          </span>
          <span className="text-gray-500 text-xs font-medium">
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`} className="block mb-auto">
          <h2 className="text-[18px] leading-[1.4] font-bold text-[#1A1A1A] line-clamp-3 hover:text-gray-700 transition-colors">
            {blog.title}
          </h2>
        </Link>

        {/* Date */}
        <div className="mt-4 flex justify-end">
          <p className="text-xs text-gray-400 font-medium">
            {formatDate(blog.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
