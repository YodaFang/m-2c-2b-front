"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MinusCircle, PlusCircle, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShopCart } from "@/lib/icon";
import currencyFormatter from "currency-formatter";
import Thumbnail from "@/components/custom-ui/thumbnail";
import useApp from "@/hooks/use-app";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartItem } from "./cart-item"

const SidebarCart = () => {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { cartItems, increaseItem, decreaseItem, deleteItem } = useApp();

  const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);
  const totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label="shopping-cart"
        className="text-gray-1-foreground relative"
      >
        <ShopCart className="size-8" />
        <span className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center text-xs text-white font-medium absolute -right-[3px] -top-[3px]">
          {totalProducts}
        </span>
      </DrawerTrigger>
      <DrawerContent className="w-full h-[100vh]" aria-describedby={undefined}>
        <DrawerHeader className="border-b-[1px] border-b-primary">
          <DrawerTitle className="w-full flex justify-between"><span>{currencyFormatter.format(totalPrice, {})} Lei</span> <span>{totalProducts} items </span> </DrawerTitle>
        </DrawerHeader>
        <div className="flex-col flex-1 pl-1 pr-4 overflow-y-auto">
          {cartItems.length ? (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} decreaseItem={decreaseItem} increaseItem={increaseItem} deleteItem={decreaseItem} />
            ))
          ) : (
            <p className="capitalize text-secondary-foreground text-base">
              No Product in cart
            </p>
          )}
        </div>
        <DrawerFooter className="flex-col border-t-[1px] border-t-primary w-full">
          {cartItems.length ? (
            <>
              <div className="px-3">
                <span className="text-gray-1-foreground text-base">
                  Add{" "}
                  <span className="text-secondary-foreground">$436.00</span>{" "}
                  to  get{" "}
                  <span className="text-secondary-foreground">
                    Free shipping!
                  </span>
                </span>
                <div className="mt-1 w-full h-2 bg-[#F5F5F5] overflow-hidden">
                  <div className="h-full bg-stripes w-4/5 animate-stripes"></div>
                </div>
                <div className="my-5 flex flex-col gap-5">
                  <Button
                    asChild
                    className="w-full lg:text-lg lg:leading"
                  >
                    <Link href={"/checkout"}>Check Out</Link>
                  </Button>
                  <Button
                    variant={"outline"}
                    className="w-full lg:text-lg lg:leading"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Button
              size={"sm"}
              asChild
              className="w-full py-[11px] lg:text-lg lg:leading-[155%] mt-3"
            >
              <Link href={"/shop"}>Browse Shop</Link>
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarCart;
