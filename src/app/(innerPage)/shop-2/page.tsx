import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/sections/pageHeader'
import ProductsView from '@/components/sections/shopDetails/productView'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { getProductsData } from '@/lib/data'

export const metadata: Metadata = {
    title: "Shop",
    description: "Browse our products."
}

const ShopTwo = async () => {
     const { featuredProducts } = await getProductsData();
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