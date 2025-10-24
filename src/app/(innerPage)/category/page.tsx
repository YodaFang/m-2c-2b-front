import React from 'react'
import { Metadata } from 'next'
import InstagramGallery from '@/app/sections/instagramGallery'
import Newsletter from '@/app/sections/newsletter'
import PageHeader from '@/app/sections/pageHeader'
import ProductsView from '@/app/sections/shopDetails/productView'
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