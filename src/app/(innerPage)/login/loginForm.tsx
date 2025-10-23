'use client'
import React, { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from './actions'

const LoginForm = () => {
    const [state, formAction] = useActionState(loginUser, null);

    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='grid lg:grid-cols-[47.2%_auto] grid-cols-1 bg-home-bg-1'>
                <div className='xl:p-15 p-8'>
                    <form action={formAction}>
                        <strong className='lg:text-2xl text-xl font-semibold text-gray-1-foreground block lg:mb-7.5 mb-5'>Login your Account</strong>
                        <Label htmlFor='email' className='text-gray-1-foreground text-base block mb-5'>
                            Email<span className='text-red-400'>*</span>
                            <Input type='email' placeholder='Enter Email' name='email' id='email' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='password' className='text-gray-1-foreground text-base block mb-5'>
                            Password<span className='text-red-400'>*</span>
                            <Input type='password' placeholder='Enter password' name='password' id='password' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <div className='flex sm:flex-row flex-col justify-between sm:items-center gap-y-2'>
                            <div className='flex items-center gap-2.5'>
                                <Checkbox id="terms" className="w-3 h-3 rounded-[4px] border-primary [&_span]:w-2.5 [&_span]:h-2.5 data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                                <Label htmlFor="terms" className="text-base text-gray-1-foreground">Remember me</Label>
                            </div>
                            <Link href={"#"} className='text-base text-gray-1-foreground multiline-hover'>Lost your password?</Link>
                        </div>
                        <Button className='w-full lg:py-[11px] lg:text-lg mt-7.5'>Sign In</Button>
                    </form>
                    {state && state.message && (
                        <p className={`text-center mt-2.5 text-base ${state.status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                            {state.message}
                        </p>
                    )}
                    <p className='text-center mt-7.5 text-base text-gray-1-foreground'>Or Login With</p>
                    <div className='flex md:flex-row flex-col justify-between gap-5 mt-5'>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full lg:py-[15px] py-2.5 rounded-lg'>
                            <img src="/images/google.png" alt="google" />
                            <span className='text-secondary-foreground lg:text-xl text-lg font-semibold'>Google</span>
                        </div>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full lg:py-[15px] py-2.5 rounded-lg'>
                            <img src="/images/facebook.png" alt="facebook" />
                            <span className='text-secondary-foreground lg:text-xl text-lg font-semibold'>Facebook</span>
                        </div>
                    </div>
                    <p className='text-center mt-5 text-base text-gray-1-foreground'>New customer? <Link href={"/register"} className='text-secondary-foreground font-medium'>Sign up</Link></p>
                </div>
                <div className='lg:block hidden'>
                    <Image width={750} height={667} style={{ width: "100%", height: "auto" }} src={"/images/contact-img.webp"} alt='img' className='max-h-[676px] object-cover' />
                </div>
            </div>
        </div>
    )
}

export default LoginForm