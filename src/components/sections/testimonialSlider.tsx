'use client'
import React from 'react'
import { StarFill } from '@/lib/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules'
import Title from '@/components/ui/title'
import { testimonialType } from '@/db/testimonialsData'

const TestimonialSlider = ({ testimonials }: { testimonials: testimonialType[] }) => {
    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <Title className='leading-[120%] tracking-[-1.5px] text-center text-[clamp(1.75rem,1.375rem+1.6667vw,3.375rem)]'>What People Are Saying</Title>
            <Swiper
                navigation={{
                    nextEl: ".next-el",
                    prevEl: ".prev-el"
                }}
                loop
                autoplay={{
                    delay: 4000
                }}
                modules={[Navigation, Autoplay]}
                className='mt-15'
            >
                {
                    testimonials.map(({ id, position, review, userImage, userName }) => {
                        return (
                            <SwiperSlide key={id}>
                                <div className='text-center max-w-[1073px] flex flex-col justify-center items-center mx-auto'>
                                    <ul className='flex items-center gap-1'>
                                        <li className='text-[#FBBF24]'>
                                            <StarFill className='size-8' />
                                        </li>
                                        <li className='text-[#FBBF24]'>
                                            <StarFill className='size-8' />
                                        </li>
                                        <li className='text-[#FBBF24]'>
                                            <StarFill className='size-8' />
                                        </li>
                                        <li className='text-[#FBBF24]'>
                                            <StarFill className='size-8' />
                                        </li>
                                        <li className='text-[#FBBF24]'>
                                            <StarFill className='size-8' />
                                        </li>
                                    </ul>
                                    <p className='text-secondary-foreground text-[clamp(1.125rem,0.8654rem+1.1538vw,2.25rem)] leading-[140%] tracking-[-1px] mt-10'>{review}</p>
                                    <div className='flex items-center gap-3 mt-10'>
                                        <img src={userImage} alt={userName} className='w-[54px] h-[54px] rounded-full' />
                                        <div>
                                            <h5 className='text-base font-medium text-secondary-foreground leading-[170%]'>{userName}</h5>
                                            <span className='text-gray-3-foreground leading-[170%] text-sm'>{position}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                {/* <div className='w-full '>
                    <div className='next-el w-10 h-10 rounded-full bg-home-bg-1 absolute top-[42%] right-1 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowRight className='size-4' /></div>
                    <div className='prev-el w-10 h-10 rounded-full bg-home-bg-1 absolute top-[42%] left-1 z-40 drop-shadow-3xl cursor-pointer text-gray-1-foreground flex justify-center items-center hover:text-white hover:bg-primary transition-all duration-500'><ArrowLeft className='size-4' /></div>
                </div> */}
            </Swiper>
        </div>
    )
}

export default TestimonialSlider