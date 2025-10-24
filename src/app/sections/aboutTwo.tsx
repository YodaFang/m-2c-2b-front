import Image from 'next/image'
import React from 'react'
import Title from '@/components/ui/title'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowUp } from '@/lib/icon'


const AboutTwo = () => {
    return (
        <section className='lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='container'>
                <div className='grid lg:grid-cols-2 grid-cols-1 xl:gap-x-[143px] gap-x-20 gap-y-12 items-center'>
                    <div>
                        <Image src={"/images/about/about-two-img-1.webp"} alt='img' width={700} height={850} sizes='100vw' className='max-h-[850px] object-cover' />
                    </div>
                    <div className='flex flex-col justify-between h-full lg:pt-[58px] lg:pb-[52px]'>
                        <div className='lg:mb-20 mb-14'>
                            <Title className='text-[clamp(1.875rem,1.4423rem+1.9231vw,3.75rem)] leading-[120%] tracking-[-1.5px] mb-4'>Be Inspired...</Title>
                            <p className='text-gray-1-foreground lg:text-2xl text-lg tracking-[-0.2px]'>Are you planning on redecorating your living room or freshening things up a bit? Find soft furnishings to create a brand-new look in no time, or discover your next vibe for a complete refresh...</p>
                        </div>
                        <div>
                            <ul className='space-y-4'>
                                <li className='lg:text-xl text-lg font-medium text-secondary-foreground'>
                                    <CheckIcon className='inline-block mr-3' />
                                    Effortless browsing experience
                                </li>
                                <li className='lg:text-xl text-lg font-medium text-secondary-foreground'>
                                    <CheckIcon className='inline-block mr-3' />
                                    Access to the finest 5% of designers for your living space
                                </li>
                                <li className='lg:text-xl text-lg font-medium text-secondary-foreground'>
                                    <CheckIcon className='inline-block mr-3' />
                                    Secure payment options for peace of mind
                                </li>
                            </ul>

                            <Button asChild  size={"medium"} className='lg:mt-[90px] mt-15 lg:py-4 py-3 group max-w-[258px] max-h-[62px]'>
                                <Link href={"/shop"}>
                                    Shop Living Room
                                    <ArrowUp className="group-hover:rotate-45 transition-transform duration-500" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTwo


const CheckIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.0501 6.79703C20.5187 7.26566 20.5187 8.02546 20.0501 8.49408L10.4501 18.0941C9.98146 18.5627 9.22166 18.5627 8.75303 18.0941L3.95303 13.2941C3.48441 12.8255 3.48441 12.0657 3.95303 11.597C4.42166 11.1284 5.18146 11.1284 5.65009 11.597L9.60156 15.5485L18.353 6.79703C18.8217 6.3284 19.5815 6.3284 20.0501 6.79703Z" fill="currentColor" />
    </svg>
)