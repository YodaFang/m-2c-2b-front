import React from 'react'
import { Metadata } from 'next'
import InstagramGallery from '@/components/sections/instagramGallery'
import Newsletter from '@/components/sections/newsletter'
import PageHeader from '@/components/sections/pageHeader'
import ProductsView from '@/components/sections/shopDetails/productView'
import { getProductsData } from '@/lib/data'
import { ProductType } from '@/types/productType'

export const metadata: Metadata = {
  title: "Category",
  description: "Browse products by category."
}

const page = async () => {
  const { featuredProducts }: { featuredProducts: ProductType[] } = await getProductsData();
  return (
    <main>
      <PageHeader pageTitle='' currentPage='Category' />
      <ProductsView
        isCategoryShow={false}
        isSortingProductTop={true}
        isGridDefaultView={true}
        isSidebarCategoryHide={true}
        data={featuredProducts.slice(0, 3)}
      />
      <Newsletter />
      <InstagramGallery />
    </main>
  )
}

export default page