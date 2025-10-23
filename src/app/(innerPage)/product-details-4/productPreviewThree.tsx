'use client'
import React from 'react'
import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Expand } from '@/lib/icon';

const ProductPreviewThree = () => {
    return (
        <div className='grid gap-7.5'>
            <div className='bg-[#F2F2F2]'>
                <PhotoProvider maskOpacity={0.8} photoClassName='bg-[#F2F2F2]'>
                    <div className='relative'>
                        <Image width={700} height={700} style={{ width: "100%", height: "auto" }} src={"/images/product-details/img-1.webp"} className='object-contain' alt='img' />
                        <PhotoView src={"/images/product-details/img-1.webp"}>
                            <div className='text-gray-1-foreground absolute top-5 right-5 cursor-pointer'><Expand /></div>
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>
            <div className='bg-[#F2F2F2]'>
                <Image width={700} height={700} style={{ width: "100%", height: "auto" }} src={"/images/product-details/img-2.webp"} className='object-contain' alt='img' />
            </div>
            <div className='bg-[#F2F2F2]'>
                <Image width={700} height={700} style={{ width: "100%", height: "auto" }} src={"/images/product-details/img-1.webp"} className='object-contain' alt='img' />
            </div>
        </div>
    )
}

export default ProductPreviewThree