import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/app/sections/pageHeader'
import ProductsView from '@/app/sections/shopDetails/productView'
import Newsletter from '@/app/sections/newsletter'
import InstagramGallery from '@/app/sections/instagramGallery'
import { listProducts } from '@/api/products'

export const metadata: Metadata = {
    title: "Shop",
    description: "Browse our products."
}

const ShopTwo = async () => {
    const { products: featuredProducts } = await listProducts({});
    return (
        <main>
            <PageHeader pageTitle='Shop-2' currentPage='Shop-2' />
            <ProductsView
                isCategoryShow={true}
                isSortingProductTop={false}
                isGridDefaultView={true}
                isSidebarCategoryHide={false}
                data={featuredProducts.slice(0, 15)}
            />
            <Newsletter />
            <InstagramGallery />
        </main>

    )
}

export default ShopTwo