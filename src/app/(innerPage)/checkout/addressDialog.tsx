"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AddressForm } from "@/app/sections/address/address-form"
import { useCartActions } from "@/hooks/use-app"
import { useCheckoutAdressDialogOpen } from "@/hooks/use-global-vars";

export default function AddressDialog() {
    const { dialogOpen, setDialogOpen } = useCheckoutAdressDialogOpen();
    const { setCartShippingAddr } = useCartActions();

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="w-full py-8 lg:px-8 px-6 lg:max-w-2xl" aria-describedby={undefined}>
                <DialogTitle className="py-3"> New Address</DialogTitle>
                <AddressForm submitHandler={setCartShippingAddr} />
            </DialogContent>
        </Dialog>
    );
};

