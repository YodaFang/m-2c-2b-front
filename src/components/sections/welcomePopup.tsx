'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogClose,  DialogTitle, } from "@/components/ui/dialog"
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Close } from '@/lib/icon'

const WelcomePopupTwo = () => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(true);
    }, [])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger className='text-primary-foreground'>welcome-2</DialogTrigger> */}
            <DialogContent className='max-w-[1000px] p-0 sm:rounded-none rounded-none border-0 overflow-y-auto [&_.close-orginal]:hidden'>
                <DialogTitle className='hidden'></DialogTitle>
                <DialogClose aria-label='button' className='absolute right-7.5 top-7.5 lg:w-15 lg:h-15 w-10 h-10 rounded-full bg-background shadow-3xl flex justify-center items-center text-gray-2-foreground hover:text-secondary-foreground transition-all duration-500'>
                    <Close className='lg:w-[31px] lg:h-[31px] w-5 h-5' />
                </DialogClose>
                <div className='h-full flex md:flex-row flex-col items-center lg:gap-x-15 gap-x-10 gap-y-10'>
                    <div>
                        <Image width={629} height={620} style={{ width: "100%" }} src={"/images/welcome/img-2.webp"} alt='img' className='aspect-[2/1] sm:aspect-auto object-cover'/>
                    </div>
                    <div className='md:max-w-[380px] md:pt-10 pt-0 pb-10 lg:pb-0 px-5 lg:px-0'>
                        <h5 className=' leading-[135%]'>Get <span className='text-primary-foreground'>20%</span> Everything!</h5>
                        <p className='mt-5 text-[#807E7C]  lg:text-xl text-lg lg:leading-[150%]'>Subscribe to our newletter and we will ship <span className='font-medium text-gray-2-foreground'>20% Discount</span> Code today</p>
                        <form className='flex lg:mt-20 mt-10'>
                            <Input placeholder='Type Email' required className='shrink px-5 py-[15px] lg:text-lg text-base lg:leading-[166%]  font-light border-none bg-[#F5F5F5]' />
                            <Button size={"medium"}  className='shrink-0 min-w-30'>Submit</Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default WelcomePopupTwo