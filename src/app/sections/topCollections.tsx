
import * as React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@/lib/icon'
import { Product } from '@/lib/data'
import ProductCart from '@/app/sections/product-card'
import Title from '@/components/ui/title'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

const TopCollections = ({ data }: { data: Product[] }) => {
    return (
        <section className="bg-home-bg-1 lg:pt-25 pt-15 lg:pb-25 pb-15 group/section">
            <div className="container md:flex justify-between md:items-center gap-4 mb-10">
                <Title>Top Collections</Title>
                <Link
                    href="/shop"
                    className="text-gray-1-foreground lg:text-xl text-lg border-b border-b-primary mt-2.5 md:mt-0 inline-block hover:border-b-primary hover:text-secondary-foreground duration-500"
                >
                    View All Collections
                </Link>
            </div>

            <div className="relative">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {data?.map((prd) => (
                            <CarouselItem
                                key={prd.id}
                                className="pl-4 basis-[85%] sm:basis-[45%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]"
                            >
                                <ProductCart product={prd} isFeatured />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* 左右导航按钮 */}
                    <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-0 z-40 w-12.5 h-12.5 rounded-full bg-home-bg-1 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500">
                        <ArrowLeft />
                    </CarouselPrevious>
                    <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-0 z-40 w-12.5 h-12.5 rounded-full bg-home-bg-1 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500">
                        <ArrowRight />
                    </CarouselNext>
                </Carousel>
            </div>
        </section>
    )
}

export default TopCollections
