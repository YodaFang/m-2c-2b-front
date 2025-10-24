import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='lg:pt-[76px] pb-7.5 pt-12'>
            <div className='container'>
                <div className='flex lg:flex-row flex-col justify-between gap-y-10'>
                    <div>
                        <div className='max-w-[305px]'>
                            <Link href={"/"}>
                                <Image width={129} height={80} src={"/images/logo.png"} alt='logo' />
                            </Link>
                            <p className='mt-6 text-base text-[#4F4F59] leading-[170%]'>Furnisy provides you with the essential pieces to build a stunning online store for your furniture business.</p>
                        </div>
                    </div>
                    <div className='basis-[65%]'>
                        <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-x-5 gap-y-10'>
                            <div>
                                <h6 className='font-medium text-secondary-foreground leading-[170%] text-base'>Home Decor Solutions</h6>
                                <ul className='mt-[29px] text-[#4F4F59] text-base leading-[170%] flex flex-col gap-4'>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Interior Designer</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Furniture Analytics</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Boutique Furniture Store</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className='font-medium text-secondary-foreground leading-[170%] text-base'>Furnisy</h6>
                                <ul className='mt-[29px] text-[#4F4F59] text-base leading-[170%] flex flex-col gap-4'>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>About Furnisy</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Join Our Team</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Get in Touch</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className='font-medium text-secondary-foreground leading-[170%] text-base'>Resources</h6>
                                <ul className='mt-[29px] text-[#4F4F59] text-base leading-[170%] flex flex-col gap-4'>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Our Customers</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Smart Furniture Finance</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Guides on Furniture Design</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className='font-medium text-secondary-foreground leading-[170%] text-base'>Our Features</h6>
                                <ul className='mt-[29px] text-[#4F4F59] text-base leading-[170%] flex flex-col gap-4'>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Interior Designer</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Furniture Analytics</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"} className='hover:text-secondary-foreground transition-all duration-500'>Boutique Furniture Store</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10 mb-10 border-t border-[#E5E2E1]'></div>
                <div className='flex items-center justify-between flex-col lg:flex-row gap-5'>
                    <p className='text-[#4F4F59] text-base leading-[170%]'>© {new Date().getFullYear()}, All Rights Reserved by Furnisy Furniture</p>
                    <div className='flex items-center gap-2.5'>
                        <p className='text-base text-[#4F4F59]'>We accept</p>
                        <Image src="/images/payment-card.webp" alt="Payment Methods" width={166} height={62} />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer