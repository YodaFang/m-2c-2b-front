'use client'; // This component needs to be a client component to use hooks

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Call, Email, Location } from '@/lib/icon';
import { useActionState } from 'react'; // Import useActionState
import { submitContactForm } from './actions'; // Import your server action

const ContactForm = () => {
    const initialState = {
        success: false,
        message: '',
    };

    const [state, formAction] = useActionState(submitContactForm, initialState);


    return (
        <div className='grid lg:grid-cols-[auto_28%] md:grid-cols-[auto_35%] items-start lg:gap-15 gap-10'>
            <form action={formAction}>
                <b className='mb-10 text-secondary-foreground text-xl font-medium block'>Contact Us</b>
                <div className='flex md:flex-row flex-col gap-7.5 mb-7.5'>
                    <Label htmlFor='name' className='text-gray-1-foreground text-base w-full'>
                        Name<span className='text-primary-foreground'>*</span>
                        <Input type='text' name='name' id='name' className='mt-2.5 border-[1.5px] border-[#999796] py-3 text-gray-1-foreground' />
                    </Label>
                    <Label htmlFor='email' className='text-gray-1-foreground text-base w-full'>
                        Email<span className='text-primary-foreground'>*</span>
                        <Input type='email' name='email' id='email' className='mt-2.5 border-[1.5px] border-[#999796] py-3 text-gray-1-foreground' />
                    </Label>
                </div>
                <Label htmlFor='message' className='text-gray-1-foreground text-base w-full'>
                    Message
                    <Textarea name='message' id='message' className='mt-2.5 border-[1.5px] border-[#999796] py-3 text-gray-1-foreground min-h-[140px]' />
                </Label>
                <Button  size={"lg"} className='mt-10 lg:px-12.5' type='submit'>
                    Submit
                </Button>
                {/* You can display state.message here for feedback */}
                {state.message && <p className={state.success ? 'text-green-500' : 'text-red-500'}>{state.message}</p>}
            </form>
            <div className='bg-home-bg-1 lg:p-10 p-7 flex flex-col gap-7.5 rounded-lg'>
                <div className='flex gap-5'>
                    <div className='shrink-0 lg:w-15 lg:h-15 w-12 h-12 flex justify-center items-center border border-muted text-gray-1-foreground rounded-full'>
                        <Location className='lg:size-[34px] size-7' />
                    </div>
                    <div>
                        <p className='text-secondary-foreground text-lg font-medium leading-[150%] relative after:absolute after:left-0 after:bottom-0 after:w-14 after:h-px after:bg-primary'>Office Address</p>
                        <p className='text-gray-1-foreground leading-[150%] mt-3'>265 New Ave, Califonia City-100, USA.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='shrink-0 lg:w-15 lg:h-15 w-12 h-12 flex justify-center items-center border border-muted text-gray-1-foreground rounded-full'>
                        <Email className='lg:size-[34px] size-7' />
                    </div>
                    <div>
                        <p className='text-secondary-foreground text-lg font-medium leading-[150%] relative after:absolute after:left-0 after:bottom-0 after:w-14 after:h-px after:bg-primary'>Send Message</p>
                        <Link href={"mailto:info@logistip.com"} className='text-gray-1-foreground leading-[150%] mt-3 inline-block hover:text-secondary-foreground transition-all duration-500'>info@yourdomin.com</Link>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='shrink-0 lg:w-15 lg:h-15 w-12 h-12 flex justify-center items-center border border-muted text-gray-1-foreground rounded-full'>
                        <Call className='lg:size-[34px] size-7' />
                    </div>
                    <div>
                        <p className='text-secondary-foreground text-lg font-medium leading-[150%] relative after:absolute after:left-0 after:bottom-0 after:w-14 after:h-px after:bg-primary'>Call Us</p>
                        <Link href={"tel:2345 56789"} className='text-gray-1-foreground leading-[150%] mt-3 inline-block hover:text-secondary-foreground transition-all duration-500'>(+0123) 2345 56789</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
