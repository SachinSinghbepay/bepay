import { getAllBlogs } from "@/lib/blogs";
import { DAPPS_DATA } from "@/lib/dappsData";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function sitemap() {
  const baseUrl = "https://www.bepay.money";

  const staticRoutes = [
    { path: "",                      priority: 1.0, changeFrequency: "daily" },
    { path: "/personal",             priority: 0.9, changeFrequency: "weekly" },
    { path: "/business",             priority: 0.9, changeFrequency: "weekly" },
    { path: "/upi",                  priority: 0.9, changeFrequency: "weekly" },
    { path: "/blogs",                priority: 0.8, changeFrequency: "daily" },
    { path: "/blog",                 priority: 0.8, changeFrequency: "daily" },
    { path: "/about-us",             priority: 0.8, changeFrequency: "monthly" },
    { path: "/dapps",                priority: 0.8, changeFrequency: "weekly" },
    { path: "/airdrops",             priority: 0.7, changeFrequency: "daily" },
    { path: "/bepay-foundations",    priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact-us",           priority: 0.7, changeFrequency: "monthly" },
    { path: "/allNetworks",          priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy",       priority: 0.4, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.4, changeFrequency: "yearly" },
    { path: "/cookie-policy",        priority: 0.4, changeFrequency: "yearly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Old blog routes (Firebase/Medium)
  const blogs = await getAllBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt.seconds * 1000) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // CMS blog posts from MongoDB
  let cmsRoutes = [];
  try {
    await connectDB();
    const posts = await Post.find({ status: "published" }, { slug: 1, updatedAt: 1 }).lean();
    cmsRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {};

  // Dynamic dApp routes
  const dappRoutes = DAPPS_DATA.map((dapp) => ({
    url: `${baseUrl}/dapps/${encodeURIComponent(dapp.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...cmsRoutes, ...dappRoutes];
}
