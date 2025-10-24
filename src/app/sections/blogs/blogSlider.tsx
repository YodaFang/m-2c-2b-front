'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/lib/icon'
import Image from 'next/image'
import Title from '@/components/ui/title'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import BlogCard from './blogCard'
import { BlogType } from '@/types/blogType'

const BlogSlider = ({ blogs }: { blogs: BlogType[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [slidesOffset, setSlidesOffset] = useState(0);

    useEffect(() => {
        function updateOffset() {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setSlidesOffset(rect.left + 15);
            }
        }
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    return (
        <section className='bg-home-bg-1 lg:pt-25 pt-15 lg:pb-25 pb-15'>
            <div className='container' ref={containerRef}>
                <div className='flex justify-between items-center'>
                    <Title>News & Blogs</Title>
                    <div className='flex items-center gap-x-2.5'>
                        <button aria-label='arrow-left' className='swiper-button-prev text-gray-1-foreground bg-background hover:text-white hover:bg-primary transition-all w-12.5 h-12.5 rounded-full flex justify-center items-center drop-shadow-[(0px_0px_4px_rgba(102,99,97,0.20))]'>
                            <ArrowLeft />
                        </button>
                        <button aria-label='arrow-right' className='swiper-button-next text-gray-1-foreground bg-background hover:text-white hover:bg-primary transition-all w-12.5 h-12.5 rounded-full flex justify-center items-center drop-shadow-[(0px_0px_4px_rgba(102,99,97,0.20))]'>
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Swiper
                    spaceBetween={24}
                    slidesOffsetBefore={slidesOffset}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.2,
                        },
                        640: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2.7,
                        },
                        1280: {
                            slidesPerView: 3.091,
                        },
                        1536: {
                            slidesOffsetBefore: 245,
                            slidesPerView: 3.091,
                        },
                    }}
                    grabCursor
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation]}
                >
                    {
                        blogs.map(({ category, date, id, thumbnail, title, author, description }) =>
                            <SwiperSlide key={id}>
                                <BlogCard>
                                    <BlogCard.Img>
                                        <Image
                                            width={552}
                                            height={340}
                                            src={thumbnail}
                                            alt='img'
                                            className='rounded-xl w-full h-auto max-h-[340px] object-cover aspect-[4/3]'
                                            sizes='100vw'
                                        />
                                    </BlogCard.Img>

                                    <BlogCard.Meta
                                        date={date}
                                        category={category}
                                        author={{ name: author?.name || '', href: '' }}
                                    />

                                    <BlogCard.Title href="/blog-single">
                                        {title}
                                    </BlogCard.Title>

                                    <BlogCard.Description>
                                        {description}
                                    </BlogCard.Description>
                                </BlogCard>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default BlogSlider

