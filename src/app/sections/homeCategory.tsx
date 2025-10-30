'use client'

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import Title from "@/components/ui/title"
import { CategoryType } from "@/lib/data"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function HomeCategory({ categories }: { categories: CategoryType[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [slidesPerView, setSlidesPerView] = useState(4)

    // 自动根据屏幕宽度调整显示数量
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) setSlidesPerView(1)
            else if (width < 768) setSlidesPerView(2)
            else if (width < 1024) setSlidesPerView(3)
            else if (width < 1280) setSlidesPerView(4)
            else setSlidesPerView(5)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="bg-home-bg-2 py-15">
            <div className="container text-center" ref={containerRef}>
                <Title>Shop by Category</Title>
                <p className="text-gray-1-foreground leading-[150%] font-light mt-1">
                    Discover everything you need through the categories!
                </p>
            </div>

            <div className="relative mt-8">
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2">
                        {categories.map(({ id, categoryName, categoryImg }) => (
                            <CarouselItem
                                key={id}
                                className={`pl-2 basis-[calc(100%/${slidesPerView})]`}
                            >
                                <div className="text-center">
                                    <Link
                                        href={`/category?name=${categoryName}`}
                                        className="block overflow-hidden mb-5 rounded-[15px]"
                                    >
                                        <Image
                                            width={340}
                                            height={400}
                                            src={categoryImg}
                                            alt={categoryName}
                                            className="w-full h-full object-cover hover:scale-105 transition-all duration-500 rounded-[15px] aspect-[4/5] sm:aspect-[3/4]"
                                        />
                                    </Link>
                                    <Link
                                        href={`/category?name=${categoryName}`}
                                        className="font-medium leading-[181.818%] lg:text-[22px] text-lg text-gray-1-foreground capitalize hover:text-secondary-foreground transition-all duration-500"
                                    >
                                        {categoryName}
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                </Carousel>
            </div>
        </div>
    )
}
