import { getAllBlogs } from "@/lib/blogs";

export default async function sitemap() {
  const baseUrl = "https://www.bepay.money";

  // Static routes
  const routes = [
    "",
    "/personal",
    "/business",
    "/upi",
    "/blogs",
    "/contact-us",
    "/about-us",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic blog routes
  const blogs = await getAllBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt.seconds * 1000) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
