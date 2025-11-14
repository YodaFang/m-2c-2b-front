'use client'
import React from 'react'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import currencyFormatter from 'currency-formatter';
import { Button } from '@/components/custom-ui/button'
import { Close } from '@/lib/icon'
import Link from 'next/link';

const WishlistProductsTable = () => {
    const wishlist: any[] = [];

    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15' >
            {
                wishlist.length ?
                    <Table className='min-w-[1000px]'>
                        <TableHeader className='border-b-[1.5px] border-b-[#E5E2E1]'>
                            <TableRow className='pb-5'>
                                <TableHead className='h-auto px-0 pb-5 lg:text-xl text-lg font-medium text-secondary-foreground'>Product Name</TableHead>
                                <TableHead className='h-auto px-0 pb-5 lg:text-xl text-lg font-medium text-secondary-foreground'>Price</TableHead>
                                <TableHead className='h-auto px-0 pb-5 lg:text-xl text-lg font-medium text-secondary-foreground'>Stock status</TableHead>
                                <TableHead className='h-auto px-0 pb-5 lg:text-xl text-lg font-medium text-secondary-foreground'></TableHead>
                                <TableHead className='h-auto px-0 pb-5 lg:text-xl text-lg font-medium text-secondary-foreground'></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='border-b-[1.5px] border-b-[#E5E2E1]'>
                            {
                                wishlist.map(({ product }) => {
                                    if (!product) return null;
                                    const { id, price, org_price, thumbnail, title, discountPercentage } = product;
                                    return (
                                        <TableRow key={id}>
                                            <TableCell className="px-0 py-5 min-[1400px]:w-[570px] lg:w-[500px] w-[350px]">
                                                <div className='flex items-center gap-6 '>
                                                    <div className='bg-home-bg-1'>
                                                        <Image width={70} height={70} src={thumbnail} alt='img' className='max-h-[70px] w-fit object-contain' />
                                                    </div>
                                                    <Link href={"/product-details"} className='lg:text-xl text-lg text-secondary-foreground font-medium capitalize line-clamp-1'>{title}</Link>
                                                </div>
                                            </TableCell>
                                            <TableCell className='px-0 py-5 min-[1400px]:w-[300px] lg:w-[220px] w-[150px]'>
                                                <p className='text-lg text-secondary-foreground font-medium '>
                                                    {discountPercentage ? <del className='text-gray-3-foreground font-normal'>{currencyFormatter.format(org_price, { code: 'RON' })}</del> : null} {' '}
                                                    <span>{currencyFormatter.format(price, { code: 'RON' })}</span>
                                                </p>
                                            </TableCell>
                                            <TableCell className="px-0 py-5 min-[1400px]:w-[300px] lg:w-[220px] w-[150px]">

                                                <p className='text-[#66995C] text-lg font-medium'>In Stock</p>
                                            </TableCell>
                                            <TableCell className="px-0 py-5 ">
                                                <div className='flex items-center gap-15'>
                                                    <Button
                                                        onClick={() => {}}

                                                        className='lg:py-3 lg:px-6 lg:text-lg'
                                                    >
                                                        Add To cart
                                                    </Button>
                                                    <p
                                                        onClick={() => {}}
                                                        className='cursor-pointer text-gray-1-foreground flex justify-end hover:text-secondary-foreground transition-all duration-500'
                                                    >
                                                        <Close className='size-10' strokeWidth='1.5' />
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    :
                    <p className='text-secondary-foreground font-semibold text-2xl text-center capitalize'>No Products in your Wishlist page</p>
            }
        </div>
    )
}

export default WishlistProductsTable