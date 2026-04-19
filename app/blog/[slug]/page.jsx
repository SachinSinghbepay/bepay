import { notFound } from "next/navigation";
import { tiptapToHtml } from "@/lib/tiptapToHtml";
import TableOfContents from "@/components/TableOfContents";
import SharePopup from "@/components/SharePopup";

const BASE = process.env.SITE_URL || "http://localhost:3000";

async function getPost(slug) {
  console.log("🚀 getPost slug:", slug);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogPosts?slug=${slug}`);

  console.log("📡 status:", res.status);

  const data = await res.json();
  console.log("📦 response:", data);

  if (!data.success) return null;

  return data.data;
}

export async function generateMetadata({ params }) {
const { slug } = await params;
const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDesc || post.excerpt;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE}/blog/${post.slug}`,
      type: "article",
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

function addIdsToHeadings(html) {
  let index = 0;
  return html.replace(/<(h2|h3)>(.*?)<\/\1>/g, (_, tag, text) => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    const id =
      cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + `-${index++}`;
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
}

function extractHeadings(html) {
  const regex = /<(h2|h3) id="(.*?)">(.*?)<\/\1>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({ id: match[2], text: match[3].replace(/<[^>]*>/g, ""), level: match[1] });
  }
  return headings;
}

function calculateReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const rawHtml = tiptapToHtml(post.content);
  const contentWithIds = addIdsToHeadings(rawHtml);
  const headings = extractHeadings(contentWithIds);
  const readingTime = calculateReadingTime(rawHtml);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 flex gap-12 scroll-smooth">

      {/* LEFT SIDEBAR (TABLE OF CONTENTS) */}
      <aside className="hidden lg:block w-64 sticky top-24 self-start">
        <TableOfContents headings={headings} />
      </aside>

      {/* BLOG CONTENT */}
      <div className="flex-1 max-w-3xl lg:max-w-4xl">

        {post.status !== "published" && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFF3D6] border border-[#FFE08A] rounded-xl text-sm text-[#8A6000] mb-6">
            <span className="font-semibold">Draft preview</span>
            <span className="text-[#B38600]">— this post is not publicly visible yet</span>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        {/* DATE + READING TIME + SHARE */}
        <div className="flex items-center gap-4 mt-6">
          <p className="text-gray-500 text-sm">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}&emsp;|&emsp;{readingTime} min read
          </p>
          <SharePopup
            slug={post.slug}
            title={post.title}
          />
        </div>

        {/* AUTHOR */}
        <p className="text-sm text-gray-500 mt-8 mb-2">Written By</p>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold">{post.author || "bepay money"}</p>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>

        {/* BLOG BODY */}
        <article
          className="
    max-w-none blog-content
    [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-20 [&_h2]:mb-8 [&_h2]:leading-snug [&_h2]:scroll-mt-32
    [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-14 [&_h3]:mb-6 [&_h3]:leading-snug [&_h3]:scroll-mt-32
    [&_p]:text-[17px] [&_p]:leading-8 [&_p]:mb-6 [&_p]:text-gray-700
    [&_ul]:my-6 [&_ul]:pl-6 [&_ul]:list-disc
    [&_ol]:my-6 [&_ol]:pl-6 [&_ol]:list-decimal
    [&_li]:my-2 [&_li]:text-[17px] [&_li]:leading-8 [&_li]:text-gray-700
    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-5 [&_blockquote]:py-1 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-500
    [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-12
    [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:cursor-pointer
  "
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />
      </div>
    </main>
  );
}
