"use client";
import { Button } from "@/components/custom-ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  dicrementProductQuentity,
  incrementProductQuentity,
  removeToCart,
} from "@/lib/features/AddToCartSlice";
import { Close, Minus, Plus, ShopCart } from "@/lib/icon";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import currencyFormatter from "currency-formatter";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ShopingCartSidebar = () => {
  const pathName = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.addToCart.items);

  const totalPrice = products.reduce(
    (total, product) => total + product.unit_price * product.quantity,
    0
  );
  const totalProducts = products.reduce(
    (total, product) => total + product.quantity,
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
          <SheetContent className="sm:max-w-[420px] w-full p-0 [&_.close-orginal]:hidden">
            <SheetHeader className="bg-[#F5F5F5] px-7.5 py-[31px] flex flex-row justify-between items-center space-y-0">
              <SheetTitle className="text-secondary-foreground font-inter font-medium uppercase leading-[155%]">
                Shopping cart({totalProducts})
              </SheetTitle>
              <SheetClose className="text-gray-1-foreground mt-0">
                <Close className="lg:w-7.5 lg:h-7.5 w-5 h-5" />
              </SheetClose>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-7.5 max-h-[540px] h-full overflow-y-auto">
              {products.length ? (
                products.map(({ id, price, quantity, thumbnail, title }) => (
                  <div key={id} className="flex items-center gap-4">
                    <div className="bg-[#F2F2F2] p-2.5 shrink-0">
                      <Image
                        width={80}
                        height={90}
                        src={thumbnail}
                        sizes="100vw"
                        alt="img"
                        className="h-[90px] w-20 object-cover"
                      />
                    </div>
                    <div className="shrink">
                      <b className="lg:text-xl text-lg font-medium text-gray-1-foreground leading-[150%] capitalize line-clamp-1">
                        {title}
                      </b>
                      <div className="flex items-center gap-3 mt-2.5 mb-3">
                        <div className="border-[1.5px] border-[#000] text-secondary-foreground flex items-center gap-2.5 px-2.5 py-1.5">
                          <span
                            className="cursor-pointer h-4 w-5 inline-flex items-center justify-center"
                            onClick={() =>
                              dispatch(dicrementProductQuentity({ id }))
                            }
                          >
                            <Minus />
                          </span>
                          <input
                            value={quantity}
                            readOnly
                            className="outline-none max-w-5 text-center text-sm"
                          />
                          <span
                            className="cursor-pointer h-4 w-5 inline-flex items-center justify-center"
                            onClick={() =>
                              dispatch(incrementProductQuentity({ id }))
                            }
                          >
                            <Plus />
                          </span>
                        </div>
                        <span className="text-secondary-foreground text-base">
                          ${price.toFixed(2)}
                        </span>
                      </div>
                      <p
                        onClick={() => dispatch(removeToCart(id))}
                        className="text-gray-1-foreground capitalize underline decoration-skip-ink-none text-underline-position decoration-[#666564] cursor-pointer leading-[150%] text-base hover:text-secondary-foreground transition-all duration-500"
                      >
                        remove
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="capitalize text-secondary-foreground text-xl">
                  No Product in cart
                </p>
              )}
            </div>
            <SheetFooter className="absolute bottom-7.5 sm:flex-col bg-background w-full">
              {products.length ? (
                <>
                  <div className="bg-[#F5F5F5] px-7.5 py-4 flex justify-between items-center">
                    <p className="text-secondary-foreground font-medium leading-[155%]">
                      Subtotal:
                    </p>
                    <p className="text-secondary-foreground font-medium">
                      {currencyFormatter.format(totalPrice, { code: "USD" })}
                    </p>
                  </div>
                  <div className="px-7.5 pt-7.5">
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
                    <div className="mt-10">
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        asChild
                        className="w-full py-[11px] lg:text-lg lg:leading-[155%]"
                      >
                        <Link href={"/cart"}>View Cart</Link>
                      </Button>
                      <Button
                        size={"sm"}
                        asChild
                        className="w-full py-[11px] lg:text-lg lg:leading-[155%] mt-3"
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
