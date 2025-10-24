import React from 'react'
import { AppLink } from "@/components/custom-ui/link"
import { Separator } from "@/components/ui/separator"

const TopHeader = () => {
    return (
        <div className='py-1 bg-foreground hidden lg:flex items-center'>
            <div className='container'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-[11px]'>
                        <p className='text-sm leading-[150%] text-primary-foreground'>15% Off First Order - <AppLink href="/register">Sign Up</AppLink> Today</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <AppLink href={"#"} className='text-sm text-primary-foreground block leading-[150%] '>info@furnisy.com</AppLink>
                        <Separator orientation="vertical" className='bg-gray-1 data-[orientation=vertical]:h-5' />
                        <AppLink href={"#"} className='text-sm text-primary-foreground block leading-[150%] '>265 New Ave, Califonia, USA.</AppLink>
                        <Separator orientation="vertical" className='bg-gray-1 data-[orientation=vertical]:h-5' />
                        <AppLink href={"#"} className='text-sm text-primary-foreground block leading-[150%] '>(+0123) 2345 56789</AppLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
