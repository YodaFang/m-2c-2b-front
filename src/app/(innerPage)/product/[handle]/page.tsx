import { Metadata } from "next";
import { notFound } from "next/navigation"
import InstagramGallery from "@/app/sections/instagramGallery";
import Newsletter from "@/app/sections/newsletter";
import ProductDetailsTabView from "@/app/sections/shopDetails/productDetailsTabView";
import ProductPreview from "@/app/sections/shopDetails/productPreview";
import ProductShortInfo from "@/app/sections/shopDetails/productShortInfo";
import RelatedProducts from "@/app/sections/shopDetails/relatedProducts";
import { getProductByHandle, listProducts } from "@/api/products";


export const dynamicParams = true

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  try {
    const { products } = await listProducts({});
    return products.map((product) => ({
      handle: product?.handle,
    })).flat()
      .filter((param) => param.handle);
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params

  const product = await getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

const ProductDetail = async (props: Props) => {
  const params = await props.params
  const product = await getProductByHandle(params.handle)
  if (!product) {
    notFound()
  }
  return (
    <main className="container">
      <div >
        <div className="grid lg:grid-cols-[40.9%_auto] md:grid-cols-2 grid-cols-1 xl:gap-15 gap-10 mt-8">
          <ProductPreview product={product} />
          <ProductShortInfo product={product} />
        </div>
        <ProductDetailsTabView product={product} />
      </div>
      <RelatedProducts />
      <InstagramGallery />
    </main>
  );
};

export default ProductDetail;
