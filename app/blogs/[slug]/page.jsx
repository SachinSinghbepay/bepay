import { notFound } from "next/navigation"
import SharePopup from "@/components/SharePopup"
import TableOfContents from "@/components/TableOfContents"

/* ---------------- FETCH BLOG ---------------- */
async function getBlog(slug) {
  try {
    const res = await fetch('http://bepay.money/api/blogs', {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to fetch blogs")

    const data = await res.json()
    if (!Array.isArray(data)) return null

    return data.find((blog) => blog.slug === slug) || null
  } catch (err) {
    console.error("Blog fetch error:", err)
    return null
  }
}

/* ---------------- HELPERS ---------------- */
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function calculateReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, "")
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// Add IDs to every H2 so we can scroll to them
function addIdsToHeadings(html) {
  let index = 0
  return html.replace(/<(h2|h3)>(.*?)<\/\1>/g, (_, tag, text) => {
    const cleanText = text.replace(/<[^>]*>/g, "")
    const id =
      cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + `-${index++}`

    return `<${tag} id="${id}">${text}</${tag}>`
  })
}

// Extract headings for sidebar
function extractHeadings(html) {
  const regex = /<(h2|h3) id="(.*?)">(.*?)<\/\1>/g
  const headings = []
  let match

  while ((match = regex.exec(html)) !== null) {
    headings.push({
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
      level: match[1], // h2 or h3
    })
  }

  return headings
}

/* ---------------- PAGE ---------------- */
export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) return notFound()

  const contentWithIds = addIdsToHeadings(blog.content)
  const headings = extractHeadings(contentWithIds)
  const readingTime = calculateReadingTime(blog.content)

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 flex gap-12 scroll-smooth">

      {/* ---------------- LEFT SIDEBAR (TABLE OF CONTENTS) ---------------- */}
      <aside className="hidden lg:block w-64 sticky top-24 self-start">
        <TableOfContents headings={headings} />
      </aside>

      {/* ---------------- BLOG CONTENT ---------------- */}
      <div className="flex-1 max-w-3xl lg:max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
  {blog.title}
</h1>
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        {/* DATE + READING TIME + SHARE */}
        <div className="flex items-center gap-4 mt-6">
          <p className="text-gray-500 text-sm">
            {formatDate(blog.publishedAt)} &emsp; | &emsp; {readingTime} min read
          </p>

          <SharePopup
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`}
            title={blog.title}
          />
        </div>

        {/* AUTHOR */}
        <p className="text-sm text-gray-500 mt-8 mb-2">Written By</p>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold">{blog.author || "bepay team"}</p>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>

        {/* BLOG BODY */}
   <article
  className="
    max-w-none blog-content

    /* MAIN SECTION HEADINGS (H2 — sidebar linked) */
    [&_h2]:text-3xl
    [&_h2]:font-bold
    [&_h2]:mt-20
    [&_h2]:mb-8
    [&_h2]:leading-snug
    [&_h2]:scroll-mt-32

    /* SUB-SECTIONS (H3) */
    [&_h3]:text-2xl
    [&_h3]:font-semibold
    [&_h3]:mt-14
    [&_h3]:mb-6
    [&_h3]:leading-snug
    [&_h3]:scroll-mt-32

    /* PARAGRAPHS */
    [&_p]:text-[17px]
    [&_p]:leading-8
    [&_p]:mb-6
    [&_p]:text-gray-700

    /* LISTS */
    [&_ul]:my-6
    [&_ol]:my-6
    [&_li]:my-2

    /* IMAGES */
    [&_img]:rounded-xl
    [&_img]:shadow-md
    [&_img]:my-12
  "
  dangerouslySetInnerHTML={{ __html: contentWithIds }}
/>




      </div>
    </main>
  )
}
