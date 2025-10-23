'use client'
import React, { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUser } from './actions'

const RegisterForm = () => {
    const [state, formAction] = useActionState(registerUser, null);

    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='grid lg:grid-cols-[46.7%_auto] grid-cols-1 bg-home-bg-1'>
                <div className='xl:p-15 p-8'>
                    <form action={formAction}>
                        <strong className='lg:text-2xl text-xl font-semibold text-gray-1-foreground block lg:mb-7.5 mb-5'>Create your account</strong>
                        <Label htmlFor='name' className='text-gray-1-foreground text-base block mb-5'>
                            Name<span className='text-red-400'>*</span>
                            <Input type='text' placeholder='Your name' name='name' id='name' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='email' className='text-gray-1-foreground text-base block mb-5'>
                            Email<span className='text-red-400'>*</span>
                            <Input type='email' placeholder='Email' name='email' id='email' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <Label htmlFor='password' className='text-gray-1-foreground text-base block mb-5'>
                            Password<span className='text-red-400'>*</span>
                            <Input type='password' placeholder='Create password' name='password' id='password' required className='py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5' />
                        </Label>
                        <div className='flex items-center gap-2.5'>
                            <Checkbox id="terms" className="rounded-[4px] border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                            <Label htmlFor="terms" className="text-base text-gray-1-foreground">I agree to all <Link href={"/terms-conditions"} className='text-gray-1-foreground underline decoration-skip-ink-none text-underline-position'>Terms & Conditions</Link> </Label>
                        </div>
                        <Button className='w-full lg:py-[11px] lg:text-lg mt-7.5'>Sign Up</Button>
                    </form>
                    {state && state.message && (
                        <p className={`text-center mt-2.5 text-base ${state.status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                            {state.message}
                        </p>
                    )}
                    <p className='text-center mt-7.5 text-base text-gray-1-foreground'>Or Login With</p>
                    <div className='flex lg:flex-row flex-col justify-between gap-5 mt-5'>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full lg:py-[15px] py-2.5 rounded-lg'>
                            <img src="/images/google.png" alt="google" />
                            <span className='text-secondary-foreground lg:text-xl text-lg font-semibold'>Google</span>
                        </div>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full lg:py-[15px] py-2.5 rounded-lg'>
                            <img src="/images/facebook.png" alt="facebook" />
                            <span className='text-secondary-foreground lg:text-xl text-lg font-semibold'>Facebook</span>
                        </div>
                    </div>
                    <p className='text-center mt-5 text-base text-gray-1-foreground'>Already have an account? <Link href={"/login"} className='text-secondary-foreground font-medium'>Login</Link></p>
                </div>
                <div className='lg:block hidden'>
                    <Image width={750} height={774} style={{ width: "100%", height: "auto" }} src={"/images/contact-img.webp"} alt='img' />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm