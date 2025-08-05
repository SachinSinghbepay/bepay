import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ blog }) {
  return (
    <div className="flex flex-col md:flex-row mb-12 relative">
      {/* Blog content container */}
      <div className="flex flex-col gap-8 md:flex-row relative z-10 ">
        {/* Featured image with diagonal patterns */}
        <div className="w-full md:w-1/4 aspect-video h-[200px] md:h-auto relative">
          <Link href={`/blogs/${blog.slug}`}>
            <div className="relative grayscale w-full h-full">
              <Image
                src={
                  blog.featuredImage ||
                  "/placeholder.svg?height=400&width=600&query=blog"
                }
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

         
            </div>
          </Link>
        </div>

        {/* Blog details */}
        <div className="w-full md:w-2/3 p-4 md:p-6">
          <Link href={`/blogs/${blog.slug}`}>
            <h2 className="text-xl md:text-2xl font-bold mb-3 hover:underline">
              {blog.title}
            </h2>
          </Link>

          <p className="text-gray-700 mb-4 line-clamp-3">{blog.excerpt}</p>

          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="font-medium">{blog.author}</p>
              <p className="text-sm text-gray-500">
                {formatDate(blog.createdAt)}
              </p>
            </div>

            <Link href={`/blogs/${blog.slug}`} className="flex items-center">
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
