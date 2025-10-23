import React from 'react'
import Link from 'next/link'
import ProductDetailsTabView from '@/components/sections/shopDetails/productDetailsTabView'
import ProductInfo from '@/components/sections/shopDetails/productShortInfo'
import ProductPreviewThree from './productPreviewThree'
import { ChevronRight } from '@/lib/icon'
import RelatedProducts from '@/components/sections/shopDetails/relatedProducts'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Product Details",
    description: "View product details."
}

const ProductDetailsFour = () => {
  return (
    <main>
      <div className='container lg:mt-25 mt-15'>
        <div className='flex items-center flex-wrap gap-0.5 mb-7.5'>
          <Link href={"#"} className='text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500'>Home</Link>
          <span className='text-gray-3-foreground'><ChevronRight className='size-4' /></span>
          <Link href={"#"} className='text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500'>Shop</Link>
          <span className='text-gray-3-foreground'><ChevronRight className='size-4' /></span>
          <Link href={"#"} className='text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500'>Furniture</Link>
          <span className='text-gray-3-foreground'><ChevronRight className='size-4' /></span>
          <span className='text-gray-1-foreground font-medium'>Baxter Colette Chair</span>
        </div>
        <div className='grid lg:grid-cols-[49.296%_auto] md:grid-cols-2 grid-cols-1 items-start gap-10'>
          <ProductPreviewThree />
          <div className='md:mt-[73px] sticky top-0'>
            <ProductInfo
              id={1}
              price={219}
              title='modern dark wood chair'
              thumbnail='/images/product-details/img-1.webp'
              stock={99}
              discountPercentage={0}
            />
          </div>
        </div>
        <ProductDetailsTabView className='justify-center border-b-0' />
      </div>
      <RelatedProducts />
      <Newsletter />
      <InstagramGallery />
    </main>
  )
}

export default ProductDetailsFour