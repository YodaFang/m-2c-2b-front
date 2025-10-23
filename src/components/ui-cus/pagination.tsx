import { ChevronLeft, ChevronRight } from '@/lib/icon'
import React from 'react'

const Pagination = () => {
    return (
        <ul className='flex gap-2.5 mt-15'>
            <li className='bg-[#F2F2F2] hover:bg-primary hover:text-white transition-all duration-500 text-gray-1-foreground font-medium w-10 h-10 flex items-center justify-center cursor-pointer'><ChevronLeft className='size-6' /></li>
            <li className='bg-primary text-white hover:bg-primary hover:text-white transition-all font-medium w-10 h-10 flex items-center justify-center cursor-pointer'>1</li>
            <li className='bg-[#F2F2F2] hover:bg-primary hover:text-white transition-all duration-500 text-gray-1-foreground font-medium w-10 h-10 flex items-center justify-center cursor-pointer'>2</li>
            <li className='bg-[#F2F2F2] hover:bg-primary hover:text-white transition-all duration-500 text-gray-1-foreground font-medium w-10 h-10 flex items-center justify-center cursor-pointer'>3</li>
            <li className='bg-[#F2F2F2] hover:bg-primary hover:text-white transition-all duration-500 text-gray-1-foreground font-medium w-10 h-10 flex items-center justify-center cursor-pointer'>4</li>
            <li className='bg-[#F2F2F2] hover:bg-primary hover:text-white transition-all duration-500 text-secondary-foreground font-medium w-10 h-10 flex items-center justify-center cursor-pointer'><ChevronRight className='size-6' /></li>
        </ul>
    )
}

export default Pagination