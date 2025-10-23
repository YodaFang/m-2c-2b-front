"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { AdsDataType } from "@/db/adsData";

const AdsSlider = ({ data }: { data: AdsDataType[] }) => {
    const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

    const handlePlayClick = (id: number) => {
        setPlayingVideoId(id);
    };

    const handleVideoEnd = () => {
        setPlayingVideoId(null); // Reset when video ends
    };
    return (
        <div className="lg:pt-25 lg:pb-25 pt-15 pb-15">
            <Swiper

                breakpoints={{
                    0: {
                        spaceBetween: 20,
                        slidesPerView: 1.2
                    },
                    1024: {
                        spaceBetween: 30,
                        slidesPerView: 1.65
                    }
                }}
                centeredSlides={true}
                loop
                grabCursor
            >
                {
                    data.map(({ id, thumbnail, video_src }) => {
                        const isVideoPlaying = playingVideoId === id;
                        return (
                            <SwiperSlide key={id} className="relative">
                                {isVideoPlaying ? (
                                    <video
                                        src={video_src}
                                        controls
                                        autoPlay
                                        onEnded={handleVideoEnd}
                                        className="w-full h-auto max-h-[618px] aspect-video object-cover rounded-xl"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <>
                                        <Image
                                            src={thumbnail}
                                            alt={`Ad Thumbnail ${id}`}
                                            width={1200}
                                            height={618}
                                            className="w-full h-auto max-h-[618px] aspect-video object-cover rounded-xl"
                                        />
                                        <button
                                            aria-label='play'
                                            onClick={() => handlePlayClick(id)}
                                            className="group hover:bg-[#e9e9e6] transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-25 md:h-25 w-[70px] h-[70px] rounded-full bg-background flex justify-center items-center"
                                        >
                                            <span className="inline-block md:ml-2 ml-1 text-[#BCBCBC] group-hover:text-secondary-foreground transition-all duration-500">
                                                <PlayIcon className="max-md:size-7" />
                                            </span>
                                        </button>
                                    </>
                                )}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
};

export default AdsSlider;

const PlayIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" viewBox="0 0 35 40" fill="none" className={className}>
        <path d="M33.5 17.4019C35.5 18.5566 35.5 21.4434 33.5 22.5981L5 39.0526C3 40.2073 0.499998 38.7639 0.499998 36.4545L0.5 3.54552C0.5 1.23612 3 -0.20726 5 0.94744L33.5 17.4019Z" fill="currentColor" />
    </svg>
)