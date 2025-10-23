'use client'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { GridView, List, Search } from '@/lib/icon'

interface Props {
    isGridView: boolean,
    setIsGridView?: React.Dispatch<React.SetStateAction<boolean>>
}
const ProductSorting = ({ isGridView, setIsGridView }: Props) => {

    return (
        <div className='flex flex-wrap sm:flex-nowrap items-center justify-between gap-5'>
            <div className='relative max-w-[330px] w-full'>
                <Input placeholder='Search Products' className='px-5 py-2 border-[#999796] text-gray-1-foreground' />
                <div className='absolute top-1/2 -translate-y-1/2 right-5 text-gray-1-foreground'>
                    <Search />
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className={` ${isGridView ? 'text-secondary-foreground' : 'text-[#999796]'} cursor-pointer`} onClick={() => setIsGridView && setIsGridView(true)}>
                    <GridView />
                </div>
                <div className={` ${isGridView ? 'text-[#999796]' : 'text-secondary-foreground'} cursor-pointer`} onClick={() => setIsGridView && setIsGridView(false)}>
                    <List />
                </div>
                <div>
                    <Select>
                        <SelectTrigger className="border-none rounded-sm bg-home-bg-1 text-gray-1-foreground py-2 text-base leading-[162%] min-w-[218px]">
                            <SelectValue placeholder="Default sorting" />
                        </SelectTrigger>
                        <SelectContent className='text-gray-1-foreground bg-home-bg-1 rounded-sm p-0'>
                            <SelectItem value="default" className='rounded-sm focus:bg-primary focus:text-white'>Default sorting</SelectItem>
                            <SelectItem value="popularity" className='rounded-sm focus:bg-primary focus:text-white'>Sort by popularity</SelectItem>
                            <SelectItem value="average" className='rounded-sm focus:bg-primary focus:text-white'>Sort by average rating</SelectItem>
                            <SelectItem value="latest" className='rounded-sm focus:bg-primary focus:text-white'>Sort by Latest</SelectItem>
                            <SelectItem value="low-to-high" className='rounded-sm focus:bg-primary focus:text-white'>Sort by price: low to high</SelectItem>
                            <SelectItem value="high-to-low" className='rounded-sm focus:bg-primary focus:text-white'>Sort by price: high to low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default ProductSorting