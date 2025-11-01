'use client'
import React, { useActionState } from 'react'
import Image from 'next/image'
import { AppLink } from "@/components/custom-ui/link"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldError,
} from "@/components/ui/field"
import { loginUser } from './actions'


const LoginForm = () => {
    const [state, formAction] = useActionState(loginUser, null);

    return (
        <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
            <div className='grid lg:grid-cols-[47.2%_auto] grid-cols-1 bg-home-bg-1'>
                <div className='xl:p-15 p-8'>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username" requiredMark>Email</FieldLabel>
                                <Input id="username" type="email" className='border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground' />
                                <FieldError errors={[{ message: "" }]} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password" requiredMark>Password</FieldLabel>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                                <Input id="password" type="password" className='border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground' />
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox id="terms" className="rounded-[4px] mb-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                                <FieldLabel
                                    htmlFor="terms"
                                    className="text-base self-end"
                                >
                                    Remember me
                                </FieldLabel>
                            </Field>
                            <Button className='w-full lg:py-[11px] text-lg mt-3'>Sign In</Button>
                            <AppLink href={"#"} className='text-base text-gray-1-foreground text-center' underline>Am uitat parola</AppLink>
                        </FieldGroup>
                    </FieldSet>
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