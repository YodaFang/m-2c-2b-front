'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Title from "@/components/ui/title";
import { CategoryType } from "@/db/categoriesData";

const HomeCategory = ({ categories }: { categories: CategoryType[] }) => {
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
        <div className="lg:mt-25 lg:mb-25 mt-15 mb-15">
            <div className="container text-center" ref={containerRef}>
                <Title>Shop by Category</Title>
                <p className="text-gray-1-foreground leading-[150%] font-light mt-1">Discover everything you need through the categories!</p>
            </div>
            <div className="">
                <Swiper
                    slidesOffsetBefore={slidesOffset}
                    spaceBetween={20}
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
                    // autoplay
                    grabCursor
                    modules={[Autoplay]}
                    className="lg:mt-11 mt-5"
                >
                    {categories.map(({ categoryName, id, categoryImg }) => {
                        return (
                            <SwiperSlide key={id}>
                                <div className="text-center">
                                    <Link
                                        href={`/category?name=${categoryName}`}
                                        className="block max-h-[400px] overflow-hidden mb-5 rounded-[15px]"
                                    >
                                        <Image
                                            width={340}
                                            height={400}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            src={categoryImg}
                                            alt="img"
                                            className="w-full h-full min-h-[300px] max-h-[400px] object-cover hover:scale-105 transition-all duration-500 rounded-[15px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4]"
                                        />
                                    </Link>
                                    <Link
                                        href={`/category?name=${categoryName}`}
                                        className="font-medium leading-[181.818%] lg:text-[22px] text-lg text-gray-1-foreground capitalize hover:text-secondary-foreground transition-all duration-500"
                                    >
                                        {categoryName}
                                    </Link>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeCategory;
