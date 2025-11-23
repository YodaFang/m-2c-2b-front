'use client'

import { z } from "zod";
import { Button } from '@/components/ui/button'
import { FieldGroup, } from "@/components/custom-ui/field"
import { useGeneratedFields } from "@/hooks/use-zod-fields"
import { useCustomerActions } from "@/hooks/use-app"

const registerSchema = z.object({
    first_name: z.string().min(3, { message: 'At least 3 charecters.' }).describe(JSON.stringify({
        default: "",
        label: "Name",
        type: "text",
        required: true,
        description: "",
        classNmae: "",
    })),
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
    passwordConfirm: z.string().describe(JSON.stringify({
        default: "",
        label: "Password Confirm",
        type: "password",
        required: true,
        description: "",
        classNmae: "",
    })),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "[Password Confirm] and [Password] not match.",
});

const RegsiterForm = () => {
    const { inputFields, validate } = useGeneratedFields(registerSchema);
    const { signup } = useCustomerActions();
    const handlerSignup = async () => {
        const data = validate();
        if (data && Object.keys(data).length) {
            await signup(data);
        }
    }
    return (
        <div className='container'>
            <FieldGroup className="max-h-[400px] overflow-y-auto pr-2">
                {inputFields}
            </FieldGroup>
            <Button className='w-full text-lg mt-3' onClick={handlerSignup}>Sign Up</Button>
        </div>
    )
}

export default RegsiterForm