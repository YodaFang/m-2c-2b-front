import React from 'react'
import { Metadata } from 'next'
import InstagramGallery from '@/app/sections/instagramGallery'
import Newsletter from '@/app/sections/newsletter'
import PageHeader from '@/app/sections/pageHeader'
import ProductsView from '@/app/sections/shopDetails/productView'
import { listProducts } from '@/api/products'

export const metadata: Metadata = {
  title: "Category",
  description: "Browse products by category."
}

const page = async () => {
  const { products: featuredProducts } = await listProducts({});
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