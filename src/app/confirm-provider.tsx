"use client";

import * as React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

let confirmFn: ((value: boolean) => void) | null = null;

export default function ConfirmDialogProvider() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState({
        title: "Please Confirm",
        description: "Are you sure?",
        confirmText: "Confirm",
        cancelText: "Cancel",
    });

    React.useEffect(() => {
        (window as any).confirm = (opts: Partial<typeof options>) => {
            return new Promise<boolean>((resolve) => {
                setOptions((prev) => ({ ...prev, ...opts }));
                confirmFn = resolve;
                setOpen(true);
            });
        };
    }, []);

    const handleClose = (result: boolean) => {
        confirmFn?.(result);
        confirmFn = null;
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={(o) => !o && handleClose(false)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{options.title}</AlertDialogTitle>
                    <div
                        className="text-base text-muted-foreground text-center mt-2 space-y-2"
                        dangerouslySetInnerHTML={{ __html: options.description }}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => handleClose(false)}>
                        {options.cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-base text-white" onClick={() => handleClose(true)}>
                        <b>{options.confirmText}</b>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
