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

const ShopThree = async () => {
    const { featuredProducts } = await getProductsData();
    return (
        <main>
            <PageHeader pageTitle='Shop-3' currentPage='Shop-3' />
            <ProductsView
                isCategoryShow={false}
                isSortingProductTop={true}
                isGridDefaultView={false}
                isSidebarCategoryHide={false}
                data={featuredProducts.slice(0, 10)}
            />
            <Newsletter />
            <InstagramGallery />
        </main>

    )
}

export default ShopThree