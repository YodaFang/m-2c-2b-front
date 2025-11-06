"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AppLink } from "@/components/custom-ui/link"
import { User } from '@/lib/icon'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import useApp from "@/hooks/use-app"

const AuthDialog = () => {
    const { customer } = useApp();
    const [open, setOpen] = useState(false);
    const [isLogin, setIslogin] = useState(true);
    if(customer){
        return <AppLink href="/account" ><User className="size-8" /></AppLink>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                aria-label="auth-dialog"
                className="text-gray-1-foreground relative"
            >
                <User className="size-8" />
            </DialogTrigger>
            <DialogContent className="w-full" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="text-center">{ isLogin ? "Sign In" : "Sign Up" }</DialogTitle>
                    <DialogDescription className="text-center text-base">
                        { isLogin ? <> New Customer? <AppLink href="#" onClick={() => setIslogin(false)} className='text-secondary-foreground font-medium' underline>Sign Up</AppLink></> : 
                        <> Already Have Account ? <AppLink href="#" onClick={() => setIslogin(true)} className='text-secondary-foreground font-medium' underline>Sign In</AppLink></> }
                    </DialogDescription>
                </DialogHeader>
                { isLogin ? <LoginForm /> : <RegisterForm /> }
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
