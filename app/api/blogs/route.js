import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ["content:encoded"],
  },
  headers: {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/rss+xml, application/xml",
  },
  timeout: 10000,
});

// ✅ Cache variables
let cachedBlogs = null;
let cacheTime = 0;

// Optional helper to parse RSS feed
async function parseRSS() {
  const feed = await parser.parseURL("https://medium.com/feed/@bepaymoney");

  return feed.items.map((item) => {
    const fullContentEncoded =
      item["content:encoded"] || item.content || "<p>No content found.</p>";

    // 🔓 Decode HTML entities
    const fullContent = fullContentEncoded
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/\\u002F/g, "/");

    // 🖼 Extract first image
    const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
    const firstImage = imgMatch ? imgMatch[1] : null;

    // ❌ Remove the first image from content
    let cleanedContent = fullContent;
    if (firstImage) {
      cleanedContent = cleanedContent
        .replace(/<figure>.*?<img[^>]+>.*?<\/figure>/i, "")
        .replace(/<img[^>]+>/i, "");
    }

    return {
      id: item.guid || item.link,
      title: item.title,
      slug: item.link.split("/").pop().split("?")[0],
      link: item.link,
      publishedAt: item.pubDate,
      thumbnail: firstImage,
      content: cleanedContent,
      author: item.creator || "bepay team",
    };
  });
}

export async function GET() {
  try {
    const now = Date.now();

    // ✅ Return cached blogs if cache is valid (10 min)
    if (cachedBlogs && now - cacheTime < 1000 * 60 * 10) {
      return new Response(JSON.stringify(cachedBlogs), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse fresh RSS feed
    const blogs = await parseRSS();

    cachedBlogs = blogs;
    cacheTime = now;

    return new Response(JSON.stringify(blogs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Medium fetch error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blogs" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
