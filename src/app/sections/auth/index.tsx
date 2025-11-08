"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AppLink } from "@/components/custom-ui/link"
import { User } from '@/lib/icon'
import { LoginRegister } from "./login-register"
import { useGetCustomer } from "@/hooks/use-app"

const AuthDialog = () => {
    const { data: customer } = useGetCustomer();
    const [open, setOpen] = useState(false);
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
            <DialogContent className="w-full py-8 lg:px-8 px-2"  aria-describedby={undefined}>
                <DialogTitle hidden></DialogTitle>
                <LoginRegister className="w-full p-0 m-0 border-0 shadow-none" />
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
