import InstagramGallery from "@/app/sections/instagramGallery";
import Newsletter from "@/app/sections/newsletter";
import ProductDetailsTabView from "@/app/sections/shopDetails/productDetailsTabView";
import ProductPreview from "@/app/sections/shopDetails/productPreview";
import ProductShortInfo from "@/app/sections/shopDetails/productShortInfo";
import RelatedProducts from "@/app/sections/shopDetails/relatedProducts";
import { Metadata } from "next";
import { Product } from "@/lib/data";

export const metadata: Metadata = {
  title: "Product Details",
  description: "View product details.",
};

const ProductDetailsOne = ({ product }: { product: Product }) => {
  return (
    <main>
      <div className="container">
        <div className="grid lg:grid-cols-[40.9%_auto] md:grid-cols-2 grid-cols-1 xl:gap-15 gap-10 lg:mt-25 mt-15">
          <ProductPreview />
          <ProductShortInfo
            product={product}
          />
        </div>
        <ProductDetailsTabView />
      </div>
      <RelatedProducts />
      <Newsletter />
      <InstagramGallery />
    </main>
  );
};

export default ProductDetailsOne;
