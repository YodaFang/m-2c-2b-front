import InstagramGallery from "@/components/sections/instagramGallery";
import Newsletter from "@/components/sections/newsletter";
import PageHeader from "@/components/sections/pageHeader";
import { Metadata } from "next";
import CompareTable from "./compareTable";

export const metadata: Metadata = {
  title: "Compare Products",
  description: "Compare products side-by-side.",
};

const Compare = () => {
  return (
    <main>
      <PageHeader
        currentPage="Compare"
        pageTitle="Compare"
        breadcrumbLink="/shop"
        breadcrumbLabel="Shop"
      />
      <CompareTable />
      <Newsletter />
      <InstagramGallery />
    </main>
  );
};

export default Compare;
