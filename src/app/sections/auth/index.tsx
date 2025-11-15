"use client";

import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AppLink } from "@/components/custom-ui/link"
import { LoginRegister } from "./login-register"
import { useGetCustomer } from "@/hooks/use-app"

export default function AuthDialog({ children, nullIfLogin }: { children: ReactNode, nullIfLogin: boolean }) {
    const { data: customer } = useGetCustomer();
    const [open, setOpen] = useState(false);
    if (customer) {
        return nullIfLogin ? null : <AppLink href="/account" >{children}</AppLink>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                aria-label="auth-dialog"
            >
                {children}
            </DialogTrigger>
            <DialogContent className="w-full py-8 lg:px-8 px-2" aria-describedby={undefined}>
                <DialogTitle hidden></DialogTitle>
                <LoginRegister className="w-full p-0 m-0 border-0 shadow-none" />
            </DialogContent>
        </Dialog>
    );
};

