
import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/app/sections/pageHeader'
import ProductsView from '@/app/sections/shopDetails/productView'
import Newsletter from '@/app/sections/newsletter'
import InstagramGallery from '@/app/sections/instagramGallery'
import { listProducts } from "@/data/products"

export const metadata: Metadata = {
    title: "Shop",
    description: "Browse our products."
}

const ShopOne = async () => {
    const {products} = await listProducts({});
    return (
        <main>
            <PageHeader pageTitle='Shop' currentPage='Shop' />
            <ProductsView
                isCategoryShow={false}
                isSortingProductTop={true}
                isGridDefaultView={true}
                isSidebarCategoryHide={false}
                data={products.slice(0, 15)}
            />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default ShopOne