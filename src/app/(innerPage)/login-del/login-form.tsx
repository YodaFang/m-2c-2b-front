'use client'

import { z } from "zod";
import { AppLink } from "@/components/custom-ui/link"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FieldGroup, } from "@/components/custom-ui/field"
import { useGeneratedFields } from "@/hooks/use-zod-fields"
import useApp from "@/hooks/use-app"

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }).describe(JSON.stringify({
        default: "",
        label: "Email",
        type: "email",
        required: true,
        description: "",
        classNmae: "",
    })),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }).describe(JSON.stringify({
        default: "",
        label: "Password",
        type: "password",
        required: true,
        description: "",
        classNmae: "",
    })),
});

const LoginForm = () => {
    const { inputFields, validate } = useGeneratedFields(loginSchema);
    const { login } = useApp();
    const handlerLogin = async () => {
        const data = validate();
        if (data && Object.keys(data).length) {
            await login(data.email, data.password);
        }
    }
    return (
        <div className='container'>
            <FieldGroup>
                {inputFields}
                <Button className='w-full lg:py-[11px] text-lg mt-3' onClick={handlerLogin}>Sign In</Button>
                <AppLink href={"#"} className='text-base text-gray-1-foreground text-center' underline>Am uitat parola</AppLink>
            </FieldGroup>
            <Separator className='mt-3 border-[1.5px]' />
            <p className='text-center mt-1 text-base text-gray-1-foreground'>Or Login With</p>
            <div className='flex flex-col justify-between gap-5 mt-3'>
                <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
                    <img src="/images/google.png" alt="google" />
                    <span className='text-secondary-foreground text-lg font-semibold'>Google</span>
                </div>
                <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
                    <img src="/images/facebook.png" alt="facebook" />
                    <span className='text-secondary-foreground text-lg font-semibold'>Facebook</span>
                </div>
            </div>
        </div>
    )
}

export default LoginForm