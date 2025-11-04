import { Input } from '@/components/ui/input'
import { Label  } from '@/components/ui/label'
import { Field } from "@/components/custom-ui/field"
import { cn } from '@/lib/utils'
import React from 'react'

const Newsletter = ({ className }: { className?: string }) => {
    return (
        <div className={cn('bg-home-bg-1 lg:py-25 py-15', className)}>
            <div className='container flex lg:flex-row flex-col lg:items-center justify-between gap-x-5 gap-y-12'>
                <div className='basis-1/2'>
                    <h6 className='mb-4 text-[clamp(1.75rem,1.3462rem+1.7949vw,3.5rem)] tracking-[-1.5px] font-bold leading-[120%] text-secondary-foreground max-w-[696px]'>Subscribe to our newsletter and Grab 30% OFF</h6>
                </div>
                <Field className='relative'>
                    <Input name='email' placeholder='Your email address' required className='font-medium text-base border-gray-2 px-3 py-[1px] pt-4 h-12 w-full max-w-[579px] rounded' />
                    <Label htmlFor='email' className='px-2.5 py-1 text-xs text-neutral-500 absolute left-[3px] top-[1px]'>Subscribe now</Label>
                </Field>
            </div>
        </div>
    )
}

export default Newsletter