'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import type { Swiper as TypeSwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { ChevronLeft, ChevronRight, Expand } from '@/lib/icon';

const imgeList = [
    "/images/product-details/img-1.webp",
    "/images/product-details/img-2.webp",
    "/images/product-details/img-3.webp",
    "/images/product-details/img-4.webp",
    "/images/product-details/img-5.webp",
]

const ProductPreview = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<TypeSwiper | null>(null);

    return (
        <div>
            <div className='bg-[#F2F2F2]'>
                <PhotoProvider maskOpacity={0.8} photoClassName='bg-[#F2F2F2]'>
                    <Swiper
                        // className='relative'
                        navigation={{
                            nextEl: ".next-arrow",
                            prevEl: ".prev-arrow"
                        }}
                        loop
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {
                            imgeList.map((img, index) => {
                                return (
                                    <SwiperSlide key={index} className='relative'>
                                        <Image width={580} height={560} style={{ width: "100%", height:"auto" }} sizes='100vw' src={img} className='object-contain' alt='img' />
                                        <PhotoView src={img}>
                                            <div className='text-gray-1-foreground absolute top-5 right-5 cursor-pointer'><Expand /></div>
                                        </PhotoView>
                                    </SwiperSlide>
                                )
                            })
                        }
                        <div className='z-20 absolute top-1/2 -translate-y-1/2 w-full flex justify-between'>
                            <div className='next-arrow text-[#807E7D] cursor-pointer'><ChevronLeft className='size-10' strokeWidth='1.5' /></div>
                            <div className='prev-arrow text-[#807E7D] cursor-pointer'><ChevronRight className='size-10' strokeWidth='1.5' /></div>
                        </div>
                    </Swiper>
                </PhotoProvider>
            </div>
            <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={20}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mt-5'
            >
                {
                    imgeList.map((img, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className='bg-[#F2F2F2]'>
                                    <Image width={130} height={120} src={img} style={{width:"100%", height:"auto"}} sizes='100vw' alt='img' className='aspect-[1/1]' />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default ProductPreview