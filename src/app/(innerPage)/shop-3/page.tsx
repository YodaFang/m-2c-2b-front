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

const ShopThree = async () => {
    const { products: featuredProducts } = await listProducts({});
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