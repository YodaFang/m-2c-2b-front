import InstagramGallery from "@/components/sections/instagramGallery";
import Newsletter from "@/components/sections/newsletter";
import PageHeader from "@/components/sections/pageHeader";
import { Metadata } from "next";
import WishlistProductsTable from "./wishlistProductsTable";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View your wishlist.",
};

const Wishlist = () => {
  return (
    <main>
      <PageHeader
        currentPage="Wishlist"
        pageTitle="Wishlist"
        breadcrumbLink="/shop"
        breadcrumbLabel="Shop"
      />
      <WishlistProductsTable />
      <Newsletter />
      <InstagramGallery />
    </main>
  );
};

export default Wishlist;
