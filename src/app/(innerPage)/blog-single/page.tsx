import InstagramGallery from "@/app/sections/instagramGallery";
import Newsletter from "@/app/sections/newsletter";
import PageHeader from "@/app/sections/pageHeader";
import { Metadata } from "next";
import BlogArtical from "./blogArtical";
import RelatedBlogs from "./RelatedBlogs";

export const metadata: Metadata = {
  title: "Blog Single",
  description: "Detailed view of a single blog post.",
};

const BlogSingle = () => {
  return (
    <main>
      <PageHeader
        pageTitle="Blog"
        currentPage="The Ultimate Guide to Choosing a Perfect Furniture for Your Home."
        breadcrumbLabel="Blog"
        breadcrumbLink="/blog"
      />
      <BlogArtical />
      <RelatedBlogs />
      <Newsletter />
      <InstagramGallery />
    </main>
  );
};

export default BlogSingle;
