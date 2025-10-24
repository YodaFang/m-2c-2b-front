'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowLeft, ArrowRight } from '@/lib/icon';
import { Navigation } from 'swiper/modules';
import { partnerType } from '@/db/partnerData';

const PartnerSlider = ({ partners, className }: { className?: string; partners: partnerType[] }) => {
  return (
    <div className={cn('container lg:pt-25 lg:pb-25 pt-15 pb-15', className)}>
      <Swiper
        navigation={{
          nextEl: '.next-el',
          prevEl: '.prev-el'
        }}

        breakpoints={{
          0: {
            slidesPerView: 2
          },
          568: {
            slidesPerView: 3
          },
          991: {
            slidesPerView: 5
          }
        }}
        loop
        modules={[Navigation]}
        wrapperClass='py-10'
      >

        {
          partners.map(({ id, logo }) =>
            <SwiperSlide key={id}>
              <div className='lg:px-14 px-10'>
                <Image width={250} height={60} src={logo} style={{ width: "100%", }} className='object-contain hover:grayscale transition-all duration-500' alt='img' />
              </div>
            </SwiperSlide>
          )
        }
        <div className='w-full '>
          <div className='next-el w-10 h-10 rounded-full bg-home-bg-1 absolute top-[42%] right-1 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowRight className='size-4' /></div>
          <div className='prev-el w-10 h-10 rounded-full bg-home-bg-1 absolute top-[42%] left-1 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowLeft className='size-4' /></div>
        </div>
      </Swiper>
    </div>
  )
}

export default PartnerSlider