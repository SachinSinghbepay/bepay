import { getAllBlogs } from "@/lib/blogs";
import { DAPPS_DATA } from "@/lib/dappsData";

export default async function sitemap() {
  const baseUrl = "https://www.bepay.money";

  // Static routes
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/personal", priority: 0.9, changeFrequency: "weekly" },
    { path: "/business", priority: 0.9, changeFrequency: "weekly" },
    { path: "/upi", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
    { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
    { path: "/airdrops", priority: 0.7, changeFrequency: "daily" },
    { path: "/bepay-foundations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/dapps", priority: 0.8, changeFrequency: "weekly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Dynamic blog routes
  const blogs = await getAllBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt.seconds * 1000) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic dApp routes
  const dappRoutes = DAPPS_DATA.map((dapp) => ({
    url: `${baseUrl}/dapps/${encodeURIComponent(dapp.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...dappRoutes];
}
