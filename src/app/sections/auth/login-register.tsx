"use client";

import { useState } from "react";
import { z } from "zod";
import { AppLink } from "@/components/custom-ui/link"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

const registerSchema = z.object({
  first_name: z.string().min(3, { message: 'At least 3 charecters.' }).describe(JSON.stringify({
    inputType: "floating_label_field",
    default: "",
    label: "Name",
    type: "text",
    required: true,
    description: "",
    classNmae: "",
  })),
  email: z.string().email({ message: 'Invalid email address.' }).describe(JSON.stringify({
    inputType: "floating_label_field",
    default: "",
    label: "Email",
    type: "email",
    required: true,
    description: "",
    classNmae: "",
  })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }).describe(JSON.stringify({
    inputType: "floating_label_field",
    default: "",
    label: "Password",
    type: "password",
    required: true,
    description: "",
    classNmae: "",
  })),
  passwordConfirm: z.string().describe(JSON.stringify({
    inputType: "floating_label_field",
    default: "",
    label: "Password Confirm",
    type: "password",
    required: true,
    placeholder: "Must be the same with [Password]",
    classNmae: "",
  })),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "[Password Confirm] and [Password] not match.",
});

export function LoginRegister({ className }: { className?: string }) {
  const [isLogin, setIslogin] = useState(true);
  const { inputFields: loginFields, validate: validateLoginData } = useGeneratedFields(loginSchema);
  const { inputFields: regFields, validate: validateRegData } = useGeneratedFields(registerSchema);
  const { login, signup } = useApp();
  const handlerLogin = async () => {
    const data = validateLoginData();
    if (data && Object.keys(data).length) {
      await login(data.email, data.password);
    }
  }
  const handlerSignup = async () => {
    const data = validateRegData();
    if (data && Object.keys(data).length) {
      await signup(data);
    }
  }
  if (isLogin) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email & password to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" className="underline text-base font-semibold" onClick={() => (setIslogin(false))}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {loginFields}
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className='w-full lg:py-[11px] text-lg mt-3' onClick={handlerLogin}>Sign In</Button>
          <AppLink href={"#"} className='text-base text-gray-1-foreground text-center' underline>Am uitat parola</AppLink>
          <Separator className='mt-3 border-[1.5px]' />
          <p className='text-center mt-1 text-base text-gray-1-foreground'>Or Login With</p>
          <div className='w-full flex flex-row justify-between gap-5 mt-3'>
            <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
              <img src="/images/google.png" alt="google" />
              <span className='text-secondary-foreground text-lg font-semibold'>Google</span>
            </div>
            <div className='border-[1.5px] border-[#999796] flex justify-center items-center gap-3 cursor-pointer w-full py-1 rounded-lg'>
              <img src="/images/facebook.png" alt="facebook" />
              <span className='text-secondary-foreground text-lg font-semibold'>Facebook</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    )
  } else {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your info to get your account
          </CardDescription>
          <CardAction>
            <Button variant="link" className="underline text-base font-semibold" onClick={() => (setIslogin(true))}>Sign In</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {regFields}
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className='w-full lg:py-[11px] text-lg mt-3' onClick={handlerSignup}>Sign Up</Button>
        </CardFooter>
      </Card>
    )
  }
}
