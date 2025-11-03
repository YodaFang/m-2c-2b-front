'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AppLink } from "@/components/custom-ui/link"
import { LoadingButton } from '@/components/custom-ui/loading-button'
import { Separator } from '@/components/ui/separator'
import { FieldGroup, } from "@/components/custom-ui/field"
import { useGeneratedFields, loginSchema } from "./actions"
import useApp from "@/hooks/use-app"

const LoginForm = () => {
    const [isLogining, setIsLogining] = useState(false);
    const { inputFields, validate } = useGeneratedFields(loginSchema);
    const { customer, login } = useApp();
    const handlerLogin = async () => {
        const data = validate();
        if (data && Object.keys(data).length) {
            try {
                setIsLogining(true);
                const resuslt = await login(data.email, data.password);
                console.log(resuslt)
            } finally {
                setIsLogining(false);
            }
        }
    }
    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='grid lg:grid-cols-[47.2%_auto] grid-cols-1 bg-home-bg-1'>
                <div className='xl:p-15 p-8'>
                    <FieldGroup>
                        {inputFields}
                        <LoadingButton className='w-full lg:py-[11px] text-lg mt-3' onClick={handlerLogin} isLoading={isLogining}>Sign In</LoadingButton>
                        <AppLink href={"#"} className='text-base text-gray-1-foreground text-center' underline>Am uitat parola</AppLink>
                    </FieldGroup>
                    <Separator className='mt-3 border-[1.5px]' />
                    <p className='text-center mt-3 text-base text-gray-1-foreground'>Or Login With</p>
                    <div className='flex md:flex-row flex-col justify-between gap-5 mt-5'>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
                            <img src="/images/google.png" alt="google" />
                            <span className='text-secondary-foreground text-lg font-semibold'>Google</span>
                        </div>
                        <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
                            <img src="/images/facebook.png" alt="facebook" />
                            <span className='text-secondary-foreground text-lg font-semibold'>Facebook</span>
                        </div>
                    </div>
                    <Separator className='mt-3 border-[1.5px]' />
                    <p className='text-center mt-3 text-base text-gray-1-foreground'>New customer? <AppLink href={"/register"} className='text-secondary-foreground font-medium'>Sign up</AppLink></p>
                </div>
                <div className='lg:block hidden'>
                    <Image width={750} height={667} style={{ width: "100%", height: "auto" }} src={"/images/contact-img.webp"} alt='img' className='max-h-[676px] object-cover' />
                </div>
            </div>
        </div>
    )
}

export default LoginForm