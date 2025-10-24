import InstagramGallery from "@/app/sections/instagramGallery";
import Newsletter from "@/app/sections/newsletter";
import PageHeader from "@/app/sections/pageHeader";
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
