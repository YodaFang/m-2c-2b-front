'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Expand } from '@/lib/icon';

const imgeList = [
    "/images/product-details/img-1.webp",
    "/images/product-details/img-2.webp",
    "/images/product-details/img-3.webp",
    "/images/product-details/img-4.webp",
    "/images/product-details/img-5.webp",
]

const ProductPreviewTwo = () => {
    const [imgPath, setImgPath] = useState<string>("/images/product-details/img-1.webp");

    return (
        <div className='flex gap-5'>
            <div className='flex flex-col gap-5 max-h-[542px] overflow-y-auto scrollbar-hidden'>
                {
                    imgeList.map((img, index) => {
                        return (
                            <div key={index} className='bg-[#F2F2F2] cursor-pointer' onClick={() => setImgPath(img)}>
                                <Image width={130} height={120} src={img} alt='img' />
                            </div>
                        )
                    })
                }
            </div>
            <div className='bg-[#F2F2F2]'>
                <PhotoProvider maskOpacity={0.8} photoClassName='bg-[#F2F2F2]'>
                    <div className='relative'>
                        <Image width={560} height={560} style={{ width: "100%", height:"auto" }} src={imgPath} className='object-contain' alt='img' />
                        <PhotoView src={imgPath}>
                            <div className='text-gray-1-foreground absolute top-5 right-5 cursor-pointer'><Expand /></div>
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>
        </div>
    )
}

export default ProductPreviewTwo