import { getLatestBlogs } from "@/lib/blogs";
import BlogList from "@/components/BlogList";

import PageHeader from "@/components/global/page-header";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";

export const metadata = {
  title: "Latest Blogs | bepay money",
  description:
    "Stay updated with the latest news and insights from the bepay money",
};

export default async function BlogsPage() {
  const blogs = await getLatestBlogs(10);

  return (
    <main className="bg-[#f9f9f9]">
      {/* <PageHeader title="BLOGS" /> */}
      <MaxWidthWrapper className={"py-16"}>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-[900] mb-12 leading-tight">
          LATEST BLOGS
        </h1>

        <BlogList blogs={blogs} />
      </MaxWidthWrapper>
    </main>
  );
}
