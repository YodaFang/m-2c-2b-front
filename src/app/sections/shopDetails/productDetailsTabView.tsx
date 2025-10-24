import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Rating from '@/components/ui/rating'
import ReviewAddForm from '../reviewAddForm'

const ProductDetailsTabView = ({ className }: { className?: string }) => {
    return (
        <div className='lg:mt-25 mt-15'>
            <Tabs defaultValue="description">
                <TabsList className={cn('flex flex-wrap justify-start gap-y-5 md:gap-x-7.5 gap-x-6 border-b border-b-[#D9D9D9]', className)}>
                    <TabsTrigger value="description" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Description</TabsTrigger>
                    <TabsTrigger value="additional-information" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Additional Information</TabsTrigger>
                    <TabsTrigger value="review" className='data-[state=active]:text-secondary-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 data-[state=active]:after:bg-primary text-gray-3-foreground font-medium lg:text-xl lg:pb-5 pb-2'>Review (1)</TabsTrigger>
                </TabsList>
                <TabsContent value='description' className='mt-7.5'>
                    <p className='text-gray-1-foreground'>Elevate your dining experience with the Tacoma Carver Dining Chair, a perfect blend of modern elegance and timeless craftsmanship. Designed to offer both comfort and style, this chair is an ideal addition to any dining room or living space. The Tacoma Carver Dining Chair combines aesthetic appeal with practical functionality, making it a versatile and valuable addition to any home.</p>
                    <ul className='flex flex-col gap-5 mt-5'>
                        <li className='relative after:absolute after:left-0 after:top-2.5 after:w-2 after:h-2 after:bg-primary after:rounded-full pl-6'>
                            <p className='text-gray-1-foreground'><b className='font-medium'>Elegant Design:</b> The Tacoma Carver Dining Chair features a sleek, contemporary design that complements a variety of interior styles. Its clean lines and refined silhouette make it a standout piece in any room.</p>
                        </li>
                        <li className='relative after:absolute after:left-0 after:top-2.5 after:w-2 after:h-2 after:bg-primary after:rounded-full pl-6'>
                            <p className='text-gray-1-foreground'><b className='font-medium'>Superior Comfort:</b> Designed with your comfort in mind, the chair boasts a generously padded seat and backrest. The ergonomic design supports your posture, ensuring you can enjoy long meals and conversations in comfort.</p>
                        </li>
                        <li className='relative after:absolute after:left-0 after:top-2.5 after:w-2 after:h-2 after:bg-primary after:rounded-full pl-6'>
                            <p className='text-gray-1-foreground'><b className='font-medium'>High-Quality Materials:</b> Crafted from premium materials, the Tacoma Carver Dining Chair is built to last. The solid wood frame provides sturdy support, while the upholstered seat and backrest add a touch of luxury.</p>
                        </li>
                    </ul>
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