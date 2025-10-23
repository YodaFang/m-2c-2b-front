import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CouponCodeForm = () => {
    return (
        <Dialog>
            <div className='text-gray-1-foreground mt-2'>
                Have a coupon? {' '}
                <DialogTrigger className='text-secondary-foreground multiline-hover'>
                    Click here to enter your code
                </DialogTrigger>
            </div>

            <DialogContent className='sm:rounded-none max-w-[550px] justify-center'>
                <DialogTitle className='hidden'></DialogTitle>
                <DialogDescription className='hidden'></DialogDescription>
                <div className='border border-black bg-background p-7.5'>
                    <p className='text-base text-gray-3-foreground'>If you have a coupon code, please apply it below</p>
                    <div className='w-full flex items-center gap-2.5 mt-5'>
                        <Input type={"text"} placeholder={"Coupon code"} className={"border-gray px-5 py-[14px]"} />
                        <Button  className="lg:px-6 lg:py-3 lg:text-lg">Apply coupon</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CouponCodeForm