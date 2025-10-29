import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/custom-ui/button'
import { MegamenuType } from '@/db/menuList'
import currencyFormatter from 'currency-formatter';
import { cn } from '@/lib/utils'
import { Product } from "@/lib/data";

const MegaMenu = ({ data, featuredProducts }: { data: MegamenuType[], featuredProducts: Product[] }) => {

    return (
        <div className='absolute z-50 left-0 bg-home-bg-1 flex lg:flex-row flex-col justify-between w-full transition-all duration-500 lg:h-0 h-auto overflow-hidden lg:group-hover:h-[400px] shadow-lg rounded-b-lg'>
            {
                data.map(({ menus, id }) => {
                    return (
                        <div key={id}>
                            {
                                menus.map(({ id, items, title }) => {
                                    return (
                                        <div key={id} className='px-6 lg:py-7.5 py-3'>
                                            <b className='text-secondary-foreground font-medium block mb-3 capitalize'>{title}</b>
                                            <div className='w-full'>
                                                {
                                                    items.map(({ id, path, label }) => {
                                                        return (
                                                            <div key={id}>
                                                                <Link aria-label='nav' href={path} className={cn('dropdown-item text-base text-gray-1-foreground py-1.5 inline-block capitalize hover:text-secondary-foreground transition-all duration-500')}>
                                                                    {label}
                                                                </Link>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })}
            <div className='lg:py-7.5 py-3 flex flex-col gap-3 '>
                {
                    featuredProducts?.slice(0, 3).map(({ id, title, thumbnail, handle, discountPercentage, variants }) => {
                        const orgPrice = variants[0].price.original;
                        const finalPrice = variants[0].price.calculated;

                        return (
                            <div key={id} className='flex items-center gap-3'>
                                <Link href={`/product/${handle}`} className='inline-block overflow-hidden bg-slate-100 max-h-[900px] group/img'>
                                    <Image width={80} height={80} sizes='100vw' src={thumbnail} alt='img' className='group-hover/img:scale-110 transition-all duration-500 rounded-[4px]' />
                                </Link>
                                <div className='max-w-[200px]'>
                                    <Link href={`/product/${handle}`} className='text-gray-1-foreground hover:text-secondary-foreground transition-all duration-500 capitalize line-clamp-2'>
                                        {title}
                                    </Link>
                                    <p className='text-gray-1-foreground text-sm'>
                                        {discountPercentage ? <del className='text-gray-2-foreground font-normal'>{currencyFormatter.format(orgPrice, { code: 'RON' })}</del> : null} {' '}
                                        <span>{currencyFormatter.format(finalPrice, { code: 'RON' })}</span> RON
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='pr-6 lg:py-7.5 py-3'>
                <div className='bg-[url("/images/header-megamenu.webp")] rounded-sm object-cover bg-no-repeat max-w-[350px] h-full lg:px-7.5 lg:py-12.5 px-5 py-7'>
                    <div>
                        <p className='text-primary-foreground'>Urna's Special Offer</p>
                        <p className='lg:text-4xl text-3xl font-semibold text-primary-foreground'>Sale <span className='text-orange-500'>up to 30%</span> Only today!</p>
                        <Button asChild size={"medium"} className='lg:text-[15px] mt-7.5 hover:bg-primary hover:text-white hover:opacity-85 uppercase'>
                            <Link href={""}>By Theme</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MegaMenu