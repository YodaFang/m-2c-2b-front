import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

const Newsletter = ({ className }: { className?: string }) => {
    return (
        <div className={cn('bg-home-bg-1 lg:py-25 py-15', className)}>
            <div className='container flex lg:flex-row flex-col lg:items-center justify-between gap-x-5 gap-y-12'>
                <div className='basis-1/2'>
                    <h5 className='mb-4 text-[clamp(1.75rem,1.3462rem+1.7949vw,3.5rem)] tracking-[-1.5px] font-bold leading-[120%] text-secondary-foreground max-w-[696px]'>Subscribe to our newsletter and Grab 30% OFF</h5>
                    <p className='tracking-[-0.2px] opacity-90 text-secondary-foreground text-base max-w-[572px]'>We believe in keeping you at the forefront of innovation information, and inspiration. That's why we invite you to.</p>
                </div>
                <form className='relative max-w-[579px] basis-1/2'>
                    <Input placeholder='Your email address' required className='placeholder:text-[#565959] font-medium text-base border-gray-2 pl-[22px] pr-[5px] py-1.5 lg:h-[70px] h-15 w-full max-w-[579px] rounded-[100px]' />
                    <button className='rounded-full sm:px-5 px-3 py-[11px] text-base font-semibold leading-[170%] tracking-[-0.2px] bg-primary text-white absolute right-1.5 top-1/2 -translate-y-1/2 max-h-[58px] border border-primary hover:bg-transparent hover:text-secondary-foreground transition-all duration-500'>Subscribe now</button>
                </form>
            </div>
        </div>
    )
}

export default Newsletter