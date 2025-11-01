"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/custom-ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopCart } from "@/lib/icon";
import {
  MinusCircle,
  PlusCircle,
  Trash2Icon,
} from "lucide-react"
import currencyFormatter from "currency-formatter";
import Thumbnail from "@/components/custom-ui//thumbnail"
import Link from "next/link";
import useApp from "@/hooks/use-app"

const ShopingCartSidebar = () => {
  const pathName = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartItems, increaseItem, decreaseItem, deleteItem } = useApp();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.total,
    0
  );
  const totalProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="shoping-cart"
            className="text-gray-1-foreground relative"
          >
            <ShopCart className="size-6" />
            <span className="w-[15px] h-[15px] bg-primary rounded-full flex items-center justify-center text-xs text-white absolute -right-[3px] -top-[3px]">
              {totalProducts}
            </span>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[420px] w-full">
            <SheetHeader className="bg-home-bg-1 flex flex-row justify-between">
              <SheetTitle >
                Shopping cart: {totalProducts} items
              </SheetTitle>
            </SheetHeader>
            <div className="flex-col flex-1 pl-1 pr-4 overflow-y-auto">
              {cartItems.length ? (
                cartItems.map(({ id, unit_price: price, quantity, thumbnail, product_title: title, variant_title }) => (
                  <div key={id} className="flex items-center py-2 border-b-[1px]">
                    <div className="bg-white shrink-0">
                      <Thumbnail
                        className="w-[90] "
                        thumbnail={thumbnail!}
                        size="square"
                        type="preview"
                      />
                    </div>
                    <div className="flex flex-col shrink">
                      <b className="text-sm leading-tight line-clamp-2">
                        {title}
                      </b>
                      <div className="flex justify-between">
                        <span className="text-secondary-foreground text-sm">
                          {variant_title}
                        </span>
                        <span className="text-secondary-foreground text-sm">
                          ${price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2.5 px-1.5 py-1">
                          <button
                            className="text-neutral-500" 
                            onClick={() => decreaseItem(id)}
                          >
                            <MinusCircle size="21" />
                          </button>
                          <input
                            value={quantity}
                            readOnly
                            className="outline-none max-w-4 text-center text-base"
                          />
                          <button
                            className="text-neutral-500" 
                            onClick={() => increaseItem(id)}
                          >
                            <PlusCircle size="21" />
                          </button>
                        </div>
                        <button onClick={() => deleteItem(id)} className="text-neutral-500 text-sm underline">
                          <Trash2Icon size="18" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="capitalize text-secondary-foreground text-sm">
                  No Product in cart
                </p>
              )}
            </div>
            <SheetFooter className="flex-col bg-background w-full">
              {cartItems.length ? (
                <>
                  <div className="bg-[#F5F5F5] px-5 py-2 flex justify-between items-center">
                    <p className="text-secondary-foreground font-medium leading">
                      Subtotal:
                    </p>
                    <p className="text-secondary-foreground font-medium">
                      {currencyFormatter.format(totalPrice, { code: "USD" })}
                    </p>
                  </div>
                  <div className="px-5 py-2">
                    <p className="text-gray-1-foreground text-base">
                      Add{" "}
                      <span className="text-secondary-foreground">$436.00</span>{" "}
                      to cart and get{" "}
                      <span className="text-secondary-foreground">
                        Free shipping!
                      </span>
                    </p>
                    <div className="mt-1.5 w-full h-2 bg-[#F5F5F5] overflow-hidden">
                      <div className="h-full bg-stripes w-4/5 animate-stripes"></div>
                    </div>
                    <div className="mt-5">
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        asChild
                        className="w-full lg:text-lg lg:leading"
                      >
                        <Link href={"/cart"}>View Cart</Link>
                      </Button>
                      <Button
                        size={"sm"}
                        asChild
                        className="w-full lg:text-lg lg:leading mt-3"
                      >
                        <Link href={"/checkout"}>Check Out</Link>
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
                  <Link href={"/shop"}>Browse Shop</Link>
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
};

export default ShopingCartSidebar;
