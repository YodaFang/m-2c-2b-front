import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Close } from '@/lib/icon'

const AboutVideo = () => {
    return (
        <div className='container lg:pt-25 pt-15'>
            <div className='bg-[url("/images/about/img-4.webp")] bg-no-repeat bg-cover bg-center flex justify-center items-center lg:py-[137px] py-25'>
                <Dialog>
                    <DialogTrigger>
                        <div className='relative z-20 lg:w-[126px] lg:h-[126px] w-28 h-28 rounded-full border border-[#FFFFFF33] flex items-center justify-center'>
                            <div className='relative z-20 lg:w-25 lg:h-25 w-20 h-20 rounded-full border border-[#FFFFFFCC] flex items-center justify-center cursor-pointer'>
                                <p>Play</p>
                            </div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] after:absolute after:z-[-1] after:left-0 after:top-0 after:w-full after:h-full after:bg-[rgba(138,138,138,0.3)] after:rounded-full after:animate-spring-one'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] after:absolute after:z-[-1] after:left-0 after:top-0 after:w-full after:h-full after:bg-[rgba(138,138,138,0.3)] after:rounded-full after:animate-spring-two'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] after:absolute after:z-[-1] after:left-0 after:top-0 after:w-full after:h-full after:bg-[rgba(138,138,138,0.3)] after:rounded-full after:animate-spring-three'></div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className='p-0 border-0 max-w-4xl [&_.close-orginal]:hidden'>
                        <DialogHeader className='hidden '>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <DialogClose className='absolute right-0 -top-10 flex justify-center items-center border-none text-[#E5E2E1] hover:text-white transition-all duration-500'>
                            <Close className='w-8 h-8' />
                        </DialogClose>
                        <div className="relative w-full aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/TKnufs85hXk?autoplay=1"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-md"
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}

export default AboutVideo