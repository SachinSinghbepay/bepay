import Link from "next/link";

const BASE = process.env.SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Blog | BePay",
  description: "Insights, updates and stories from the BePay team.",
};

async function getPosts() {
  const res = await fetch(`${BASE}/api/blogPosts?status=published`, { cache: "no-store" });
  const data = await res.json();
  return data.success ? data.data : [];
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#F9F8F5]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-5 pt-20 pb-12">
        <p className="text-xs font-semibold text-[#9A9A8A] uppercase tracking-widest mb-3">Blog</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight">
          Stories from BePay
        </h1>
        <p className="mt-4 text-lg text-[#6A6A5A] max-w-xl">
          Insights, product updates, and ideas from our team.
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-4xl mx-auto px-5 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-[#AAAA9A] py-20 text-sm">No posts published yet.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <PostCard key={String(post._id)} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function PostCard({ post }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row gap-6 items-start">
      {/* Cover thumbnail */}
      {post.coverImage && (
        <div className="w-full sm:w-52 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-[#ECEAE4]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        {post.categories?.[0] && (
          <span className="text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">
            {post.categories[0]}
          </span>
        )}
        <h2 className="mt-1 text-xl font-bold text-[#1A1A1A] leading-snug group-hover:text-[#3A3A2A] transition line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 text-sm text-[#6A6A5A] line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          {date && <span className="text-xs text-[#AAAA9A]">{date}</span>}
          {post.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-[#EFEDE8] text-[#6A6A5A] text-[11px] rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
