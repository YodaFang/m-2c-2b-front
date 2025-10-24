import InstagramGallery from "@/app/sections/instagramGallery";
import Newsletter from "@/app/sections/newsletter";
import PageHeader from "@/app/sections/pageHeader";
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
