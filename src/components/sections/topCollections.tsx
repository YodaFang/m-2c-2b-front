'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@/lib/icon'
import Card, { CardDiscount, CardFooter, CardHeader, CardIcons, CardImg, CardLabel, CardTitle, CardPriceEnhanced } from '@/components/ui/card'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import Title from '@/components/ui/title'
import { ProductType } from '@/types/productType'

const TopCollections = ({data}:{data:ProductType[]}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [slidesOffset, setSlidesOffset] = useState(0);

    useEffect(() => {
        function updateOffset() {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                console.log(rect)
                setSlidesOffset(rect.left + 15);
            }
        }
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    return (
        <section className='bg-home-bg-1 lg:pt-25 pt-15 lg:pb-25 pb-15 group/section'>
            <div className='container md:flex justify-between md:items-center gap-4 mb-10' ref={containerRef}>
                <Title>Top Collections</Title>
                <Link href={"/shop"} className='text-gray-1-foreground lg:text-xl text-lg border-b border-b-primary mt-2.5 md:mt-0 inline-block hover:border-b-primary hover:text-secondary-foreground duration-500'>View All Collections</Link>
            </div>
            <div className='relative'>
                <Swiper
                    navigation={{
                        nextEl: ".next-el",
                        prevEl: ".prev-el"
                    }}
                    grabCursor
                    spaceBetween={20}
                    slidesOffsetBefore={slidesOffset}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.5,
                        },
                        640: {
                            slidesPerView: 2.5,
                        },
                        768: {
                            slidesPerView: 3.5,
                        },
                        1024: {
                            slidesPerView: 4.5,
                        },
                        1280: {
                            slidesPerView: 5.3472,
                        },
                        1536: {
                            slidesPerView: 5.3472,
                        },
                    }}

                    modules={[Navigation]}

                >
                    {data.map((prd) => {
                        return (
                            <SwiperSlide key={prd.id}>
                                <Card key={prd.id}>
                                    <CardHeader>
                                        <CardImg src={prd.thumbnail} height={400} width={340} />
                                        <CardLabel isLabel={prd.label ? prd.label : false}>{prd.label}</CardLabel>
                                        <CardDiscount isDiscountTrue={prd.discountPercentage ? prd.discountPercentage : false}>-{prd.discountPercentage}%</CardDiscount>
                                        <CardIcons product={prd} />
                                    </CardHeader>
                                    <CardFooter>
                                        <CardTitle path="/product-details">{prd.title}</CardTitle>
                                        <CardPriceEnhanced price={prd.price} discountPercentage={prd.discountPercentage} />
                                    </CardFooter>
                                </Card>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className='w-full invisible opacity-0 group-hover/section:visible group-hover/section:opacity-100 transition-all '>
                    <div className='next-el w-12.5 h-12.5 rounded-full bg-home-bg-1 absolute top-1/2 -translate-y-1/2 2xl:right-[11.5vw] right-0 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowRight /></div>
                    <div className='prev-el w-12.5 h-12.5 rounded-full bg-home-bg-1 absolute top-1/2 -translate-y-1/2 2xl:left-[11.5vw] left-0 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowLeft /></div>
                </div>
            </div>
        </section>
    )
}

export default TopCollections

