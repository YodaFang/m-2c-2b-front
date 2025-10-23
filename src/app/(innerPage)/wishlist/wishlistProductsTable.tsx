'use client'
import React from 'react'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import currencyFormatter from 'currency-formatter';
import { Button } from '@/components/ui/button'
import { Close } from '@/lib/icon'
import { useAppSelector } from '@/lib/reduxHooks'
import calcluteDiscount from '@/lib/calcluteDiscount'
import { addToCart } from '@/lib/features/AddToCartSlice';
import { useDispatch } from 'react-redux';
import { removeToWishlist } from '@/lib/features/AddToWishlistSlice';
import Link from 'next/link';

const WishlistProductsTable = () => {
    const products = useAppSelector((product) => product.addToWishlist.products)
    const dispatch = useDispatch()

    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15' >
            {
                products.length ?

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
                                products.map(({ color, id, price, size, stock, thumbnail, title, discountPercentage }) => {
                                    const finalPrice = discountPercentage ? calcluteDiscount(price, discountPercentage) : price;

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
                                                    {discountPercentage ? <del className='text-gray-3-foreground font-normal'>{currencyFormatter.format(price, { code: 'USD' })}</del> : null} {' '}
                                                    <span>{currencyFormatter.format(finalPrice, { code: 'USD' })}</span>
                                                </p>
                                            </TableCell>
                                            <TableCell className="px-0 py-5 min-[1400px]:w-[300px] lg:w-[220px] w-[150px]">
                                                {
                                                    stock ?
                                                        <p className='text-[#66995C] text-lg font-medium'>In Stock</p>
                                                        :
                                                        <p className='text-lg font-medium'>Stock Out</p>
                                                }
                                            </TableCell>
                                            <TableCell className="px-0 py-5 ">
                                                <div className='flex items-center gap-15'>
                                                    <Button
                                                        onClick={() => dispatch(addToCart({ id, price: finalPrice, quantity: 1, thumbnail, title, color, size }))}
                                                        
                                                        className='lg:py-3 lg:px-6 lg:text-lg'
                                                    >
                                                        Add To cart
                                                    </Button>
                                                    <p
                                                        onClick={() => dispatch(removeToWishlist(id))}
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