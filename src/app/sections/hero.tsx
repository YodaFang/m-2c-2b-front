'use client'
import React from 'react'
import { Button } from '@/components/custom-ui/button'
import { ArrowUp } from '@/lib/icon'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules'
import { HeroDataType } from '@/lib/data'


const Hero = ({ data }: { data: HeroDataType[] }) => {
    return (
        <section>
            <Swiper
                grabCursor
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                pagination={{
                    el: '.hero-pagination',
                    clickable: true,
                    bulletClass: 'hero-pagination-bullet',
                    bulletActiveClass: 'hero-pagination-bullet-active',
                }}
                modules={[Autoplay, Pagination]}
            >
                {
                    data.map(({ description, id, thumbnail, title }) => {
                        return (
                            <SwiperSlide key={id} style={{ backgroundImage: `url(${thumbnail})` }} className={`bg-no-repeat bg-center bg-cover bg-gradient-to-l from-[rgba(255,255,255,0)_50%] to-[rgba(255,255,255,0.7)_100%]`}>
                                {({ isActive }) => (
                                    <div className='container lg:pt-[190px] sm:pt-[140px] pt-30 xl:pb-[193px] lg:pb-[170px] pb-[150px]'>
                                        <motion.h1
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: isActive ? 0.5 : 0,
                                            }}
                                            className='text-[clamp(2.25rem,1.3269rem+4.1026vw,6.25rem)] leading-[115%] max-w-[810px] text-secondary-foreground font-light mb-2.5'
                                        >
                                            {title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: isActive ? 0.7 : 0,
                                            }}
                                            className='max-w-[570px] text-[22px] text-secondary-foreground'
                                        >
                                            {description}
                                        </motion.p>
                                        <motion.div
                                            initial={{ y: 90, opacity: 0 }}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: isActive ? 0.9 : 0,
                                            }}
                                        >
                                            <Button
                                                asChild
                                                size={"medium"}
                                                className="mt-10 max-w-[188px] lg:leading-[170%] leading-[170%] group"
                                            >
                                                <Link href={"/shop"}>
                                                    Shop Now{" "}
                                                    <ArrowUp className="group-hover:rotate-45 transition-transform duration-500" />{" "}
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                )}

                            </SwiperSlide>
                        )
                    })
                }
                <div className='hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-x-2.5'></div>
            </Swiper>

        </section>
    )
}

export default Hero