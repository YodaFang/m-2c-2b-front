'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Close, Eye } from '@/lib/icon'
import { Button } from '@/components/ui/button'
import ProductQuickView, { ProductQuickViewType } from '@/components/sections/shopDetails/productQuickView'
import calcluteDiscount from '@/lib/calcluteDiscount'
import currencyFormatter from 'currency-formatter';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks'
import { addToCart } from '@/lib/features/AddToCartSlice'
import { ProductShortInfoPropsType } from '@/components/sections/shopDetails/productShortInfo'
import { useDispatch } from 'react-redux'
import { removeToCompare } from '@/lib/features/CompareProductsSlice'

const CompareTable = () => {
    const products = useAppSelector((data) => data.productCompare.products)
    const dispatch = useAppDispatch()
    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='overflow-x-auto'>
                {
                    products.length ?

                        <div className='flex mi-w-[1250px]'>
                            {
                                products.map(({ discountPercentage, id, price, stock, thumbnail, title, color, size }, index) => {
                                    const finalPrice = discountPercentage ? calcluteDiscount(price, discountPercentage) : price;
                                    return (
                                        <div key={index}>
                                            <div className={`${index === 0 && "flex"} border-b pb-8 px-2.5`}>
                                                {index === 0 &&
                                                    <p className="font-medium lg:text-xl text-lg text-secondary-foreground 2xl:w-[280px] lg:w-[200px] w-[160px]">Products</p>
                                                }
                                                <Card id={id} thumbnail={thumbnail} title={title} price={price} discountPercentage={discountPercentage} stock={stock} />
                                            </div>
                                            <div className={`${index === 0 && "flex"} border-b py-8 px-2.5`}>
                                                {index === 0 &&
                                                    <p className="font-medium lg:text-xl text-lg text-secondary-foreground 2xl:w-[280px] lg:w-[200px] w-[160px]">SKU</p>
                                                }
                                                <p className='text-gray-1-foreground lg:text-xl text-lg line-clamp-1 max-w-[250px]'> office-chair-01020304</p>
                                            </div>
                                            <div className={`${index === 0 && "flex"} border-b py-8 px-2.5`}>
                                                {index === 0 &&
                                                    <p className="font-medium lg:text-xl text-lg text-secondary-foreground 2xl:w-[280px] lg:w-[200px] w-[160px]">Price</p>
                                                }
                                                <p className='text-secondary-foreground lg:text-xl text-lg'>
                                                    {discountPercentage ? <del className='text-gray-3-foreground font-normal'>{currencyFormatter.format(price, { code: 'USD' })}</del> : null} {' '}
                                                    <span>{currencyFormatter.format(finalPrice, { code: 'USD' })}</span>
                                                </p>
                                            </div>
                                            <div className={`${index === 0 && "flex"} border-b py-8 px-2.5`}>
                                                {index === 0 &&
                                                    <p className='font-medium text-secondary-foreground lg:text-xl text-lg 2xl:w-[280px] lg:w-[200px] w-[160px]'>Availability</p>
                                                }
                                                {
                                                    stock ?
                                                        <p className='text-[#66995C] lg:text-xl text-lg'> In Stock</p>
                                                        :
                                                        <p className="lg:text-xl text-lg text-secondary-foreground">Out of stock</p>
                                                }
                                            </div>
                                            <div className={`${index === 0 && "flex items-center"} border-b py-8 px-2.5`}>
                                                {index === 0 &&
                                                    <p className='font-medium text-secondary-foreground lg:text-xl text-lg 2xl:w-[280px] lg:w-[200px] w-[160px]'>Add to cart</p>
                                                }
                                                <Button
                                                    onClick={() => dispatch(addToCart({ id, price: finalPrice, quantity: 1, thumbnail, title, color, size }))}
                                                    
                                                    size={'sm'}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <p className='text-secondary-foreground font-semibold text-2xl text-center capitalize'>No Products in your compare page</p>
                }
            </div>
        </div>

    )
}

export default CompareTable

type CardProps = {
    id: number | string,
    stock: number,
    title: string,
    thumbnail: string,
    price: number,
    discountPercentage: number
}
const Card = ({ id, title, thumbnail, price, discountPercentage, stock }: CardProps) => {
    const dispatch = useDispatch()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [product, setProduct] = useState<ProductShortInfoPropsType>({ id: 0, thumbnail: "", title: "", price: 0, discountPercentage: 0, stock: 0 })

    return (
        <div>
            <p onClick={() => dispatch(removeToCompare(id))} className='text-gray-3-foreground leading-[150%] text-base flex items-center gap-1.5 cursor-pointer hover:text-secondary-foreground transition-all duration-500'>
                <Close className='size-4 inline' /> Remove
            </p>
            <div className='bg-home-bg-1 mt-3 xl:w-[230px] 2xl:h-[230px] w-[210px] h-[220px] rounded-xl'>
                <Image width={230} height={230} sizes='100vw' src={thumbnail} alt='img' className='w-full rounded-xl max-h-[230px] object-cover' />
            </div>
            <div className='flex justify-between items-center mt-3'>
                <Link href={"#"} className='text-secondary-foreground font-medium text-lg capitalize line-clamp-1 max-w-[200px] multiline-hover'>{title}</Link>
                <div
                    onClick={() => { setIsDialogOpen(true), setProduct({ id, thumbnail, title, price, discountPercentage, stock }) }}
                    className='w-7.5 h-7.5 rounded-[4px] border text-gray-3-foreground flex justify-center items-center cursor-pointer hover:text-white hover:bg-primary transition-all duration-500'
                >
                    <Eye />
                </div>
            </div>
            <ProductQuickView isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} product={product} />
        </div>
    )
}