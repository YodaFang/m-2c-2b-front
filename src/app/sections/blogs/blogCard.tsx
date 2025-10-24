import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PropsType {
    children: ReactNode
    className?: string
    href?: string
}

interface MetaProps {
    date: string
    category: string
    author: {
        name?: string
        href?: string
    }
}

const BlogCard = ({ children, className }: PropsType) => {
    return (
        <div className={cn('border border-[#EAEEF0] rounded-2xl bg-background sm:p-6 p-4', className)}>
            {children}
        </div>
    )
}

BlogCard.Img = function Img({ children, className }: PropsType) {
    return (
        <div className={cn('rounded-xl pb-6', className)}>
            {children}
        </div>
    )
}

BlogCard.Meta = function Meta({ date, category, author }: MetaProps) {
    return (
        <div className='rounded-3xl px-4 py-1.5 text-gray-3-foreground border border-[#F8F4F3] inline-flex flex-wrap gap-x-2 items-center text-sm font-medium leading-[170%] tracking-[-0.3px]'>
            <p>{date}</p>
            <span className='block w-[5px] h-[5px] rounded-full bg-[#4D4C4B]' />
            <Link href="#" className='hover:text-secondary-foreground transition-all duration-500'>{category}</Link>
            <span className='block w-[5px] h-[5px] rounded-full bg-[#4D4C4B]' />
            <Link href={author?.href || '#'} className='hover:text-secondary-foreground transition-all duration-500'>by {author?.name}</Link>
        </div>
    )
}

BlogCard.Title = function Title({ children, href, className }: PropsType) {
    return (
        <h3 className={cn('text-secondary-foreground lg:leading-[150%] lg:text-2xl md:text-xl text-lg font-medium tracking-[-1px] mt-3 mb-2 line-clamp-2', className)}>
            <Link href={href || '#'} className='multiline-hover'>
                {children}
            </Link>
        </h3>
    )
}

BlogCard.Description = function Description({ children, className }: PropsType) {
    return (
        <p className={cn('text-gray-1-foreground opacity-70 text-base leading-[170%] tracking-[-0.3px] line-clamp-2', className)}>
            {children}
        </p>
    )
}

export default BlogCard
