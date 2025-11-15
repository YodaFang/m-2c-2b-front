import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom-ui/tabs"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Rating from '@/components/ui/rating'
import ReviewAddForm from '../reviewAddForm'

const ProductDetailsTabView = ({ product, className }: { product: any, className?: string }) => {
    return (
        <div className='lg:mt-25 mt-15'>
            <Tabs defaultValue="description">
                <TabsList className={cn('flex flex-wrap justify-start border-b border-b-[#D9D9D9]', className)}>
                    <TabsTrigger value="description" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl pb-1'>Description</TabsTrigger>
                    <TabsTrigger value="additional-information" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl pb-1'>Additional Information</TabsTrigger>
                    <TabsTrigger value="review" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl pb-1'>Review (1)</TabsTrigger>
                </TabsList>
                <TabsContent value='description' className='mt-5'>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </TabsContent>
                <TabsContent value='additional-information' className='mt-7.5'>
                    <p className='text-gray-1-foreground'>Elevate your dining experience with the Tacoma Carver Dining Chair, a perfect blend of modern elegance and timeless craftsmanship. Designed to offer both comfort and style, this chair is an ideal addition to any dining room or living space. The Tacoma Carver Dining Chair combines aesthetic appeal with practical functionality, making it a versatile and valuable addition to any home.</p>
                    <p className='text-gray-1-foreground'>Elevate your dining experience with the Tacoma Carver Dining Chair, a perfect blend of modern elegance and timeless craftsmanship. Designed to offer both comfort and style, this chair is an ideal addition to any dining room or living space. The Tacoma Carver Dining Chair combines aesthetic appeal with practical functionality, making it a versatile and valuable addition to any home.</p>
                </TabsContent>
                <TabsContent value='review' className='mt-7.5'>
                    <div className='flex flex-col gap-7.5'>
                        <div className='max-w-[900px]'>
                            <div className='flex items-center gap-2.5 mb-3'>
                                <Image width={60} height={60} sizes='100vw' src={"/images/product-details/author1.webp"} alt='img' className='rounded-full' />
                                <div>
                                    <Link href={"#"} className='lg:text-xl text-lg text-secondary-foreground font-medium inline-block mb-0.5'>Jannie Schumm</Link>
                                    <Rating star={5} iconSize='lg:size-4 size-3' />
                                </div>
                            </div>
                            <p className='text-gray-1-foreground'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account. consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</p>
                        </div>
                    </div>

                    <div className='mt-15'>
                        <p className='text-secondary-foreground font-medium lg:text-2xl text-xl mb-4'>Write a Review for this product</p>
                        <ReviewAddForm />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProductDetailsTabView