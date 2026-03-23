import { notFound } from "next/navigation";
import Link from "next/link";
import { tiptapToHtml } from "@/lib/tiptapToHtml";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

async function getPost(slug) {
  await connectDB();
  // Allow any status — drafts are viewable as previews
  const post = await Post.findOne({ slug }).lean();
  return post;
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const html = tiptapToHtml(post.content);

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-5 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[#9A9A8A] hover:text-[#1A1A1A] transition"
        >
          ← All posts
        </Link>
      </div>

      {/* Draft banner */}
      {post.status !== "published" && (
        <div className="max-w-3xl mx-auto px-5 mt-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFF3D6] border border-[#FFE08A] rounded-xl text-sm text-[#8A6000]">
            <span className="font-semibold">Draft preview</span>
            <span className="text-[#B38600]">— this post is not publicly visible yet</span>
          </div>
        </div>
      )}

      {/* Hero */}
      <article className="max-w-3xl mx-auto px-5 pt-8 pb-24">
        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap mb-4">
          {post.categories?.[0] && (
            <span className="text-[11px] font-semibold text-[#9A9A8A] uppercase tracking-wider">
              {post.categories[0]}
            </span>
          )}
          {date && <span className="text-xs text-[#AAAA9A]">{date}</span>}
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-[#6A6A5A] leading-relaxed mb-8">{post.excerpt}</p>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 bg-[#EFEDE8] text-[#6A6A5A] text-xs rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-10 rounded-2xl overflow-hidden bg-[#ECEAE4]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover max-h-[480px]"
            />
          </div>
        )}

        {/* Body */}
        <div
          className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-p:text-[#3A3A2A] prose-p:leading-relaxed prose-a:text-[#1A1A1A] prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-[#1A1A1A] prose-code:bg-[#F4F3EF] prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}

