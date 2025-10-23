'use client'
import React from 'react'
import Link from 'next/link'
import { Heart, IcHome, ShopBug, User } from '@/lib/icon'
import { usePathname } from 'next/navigation'

const MobileNavbar = () => {
    const pathName = usePathname()
    let currrentPathname
    if (pathName.endsWith('/')) {
        currrentPathname = pathName.substring(0, pathName.length - 1)
    }
    return (
        <div className='fixed bottom-0 left-0 z-50 w-full bg-home-bg-1 px-[33px] py-2 lg:hidden block border-t'>
            <div className='flex justify-between items-center'>
                <Link href={"/"} className={`flex flex-col items-center ${currrentPathname === "/" ? 'text-secondary-foreground' : 'text-gray-1-foreground'}`}>
                    <IcHome />
                    <span className='text-base inline-block mt-0.5'>Home</span>
                </Link>
                <Link href={"/wishlist"} className={`flex flex-col items-center ${currrentPathname === "/wishlist" ? 'text-secondary-foreground' : 'text-gray-1-foreground'}`}>
                    <Heart className='w-[27px] h-[25px]' />
                    <span className='text-base inline-block mt-0.5'>Wishlist</span>
                </Link>
                <Link href={"/shop"} className={`flex flex-col items-center ${currrentPathname === "/shop" ? 'text-secondary-foreground' : 'text-gray-1-foreground'}`}>
                    <ShopBug className='size-6' />
                    <span className='text-base inline-block mt-0.5'>Shop</span>
                </Link>
                <Link href={"/login"} className={`flex flex-col items-center ${currrentPathname === "/login" ? 'text-secondary-foreground' : 'text-gray-1-foreground'}`}>
                    <User />
                    <span className='text-base inline-block mt-0.5'>Account</span>
                </Link>
            </div>
        </div>
    )
}

export default MobileNavbar