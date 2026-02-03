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

export async function GET() {
  try {
    const feed = await parser.parseURL("https://medium.com/feed/@bepaymoney");

    const blogs = feed.items.map((item) => {
      const fullContentEncoded =
        item["content:encoded"] || item.content || "<p>No content found.</p>";

      // 🔓 Decode HTML entities (turn \u003C into <)
      const fullContent = fullContentEncoded
        .replace(/\\u003C/g, "<")
        .replace(/\\u003E/g, ">")
        .replace(/\\u002F/g, "/");

      // 🖼 Extract first image
      const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
      const firstImage = imgMatch ? imgMatch[1] : null;

      // ❌ Remove the FIRST image (usually wrapped in <figure>)
      let cleanedContent = fullContent;

      if (firstImage) {
        cleanedContent = cleanedContent
          // remove figure wrapper with image
          .replace(/<figure>.*?<img[^>]+>.*?<\/figure>/i, "")
          // fallback: remove standalone first img if no figure
          .replace(/<img[^>]+>/i, "");
      }

      return {
        id: item.guid || item.link,
        title: item.title,
        slug: item.link.split("/").pop().split("?")[0],
        link: item.link,
        publishedAt: item.pubDate,
        thumbnail: firstImage,
        content: cleanedContent, // ✅ image removed from body
        author: item.creator || "bepay team",

      };
    });

    return Response.json(blogs);
  } catch (error) {
    console.error("Medium fetch error:", error);
    return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
