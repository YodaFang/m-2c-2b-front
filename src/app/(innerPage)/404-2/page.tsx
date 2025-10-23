import React from 'react'
import Link from 'next/link'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Button } from '@/components/ui/button'
import { ArrowUp } from '@/lib/icon'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "404 Not Found",
    description: "The page you are looking for does not exist."
}

const page = () => {
    return (
        <main>
            <section className='bg-[url("/images/404/404-2.webp")] bg-no-repeat bg-cover lg:py-[180px] py-[130px]'>
                <div className='text-center'>
                    <h1 className='font-semibold text-black lg:text-[200px] text-[130px] leading-[80%] lg:leading-[110%]'>404</h1>
                    <p className='mt-5 lg:text-4xl text-3xl lg:leading-[135%] text-black font-medium'>Opps! Something Wrong</p>
                    <p className='text-base text-gray-3-foreground'>Sorry but the page you are looking for doesn’t exist. </p>
                    <Button asChild  size={"medium"} className='mt-10 group lg:leading-[170%] leading-[170%]'>
                        <Link href={'/shop'}>Shop Now <ArrowUp className='group-hover:rotate-45 transition-transform duration-500'/> </Link>
                    </Button>
                </div>
            </section>
            <InstagramGallery />
        </main>
    )
}

export default page