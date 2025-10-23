"use client";
import { Button } from "@/components/custom-ui/button";
import { Input } from "@/components/custom-ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom-ui/table";
import {
  dicrementProductQuentity,
  incrementProductQuentity,
  removeToCart,
} from "@/lib/features/AddToCartSlice";
import { Close, Minus, Plus } from "@/lib/icon";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import Image from "next/image";
import Link from "next/link";

const ProductsCartTable = () => {
  const { products } = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();
  return (
    <>
      {products.length ? (
        <div className="overflow-x-auto border rounded-lg">
          <Table className="min-w-[700px] xl:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="px-7.5 py-4 lg:text-xl text-lg font-semibold text-secondary-foreground">
                  Products
                </TableHead>
                <TableHead className="px-7.5 py-4 lg:text-xl text-lg font-semibold text-secondary-foreground w-[165px]">
                  Price
                </TableHead>
                <TableHead className="px-7.5 py-4 lg:text-xl text-lg font-semibold text-secondary-foreground w-[190px]">
                  Quantity
                </TableHead>
                <TableHead className="px-7.5 py-4 lg:text-xl text-lg font-semibold text-secondary-foreground w-[171px]">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(({ id, price, thumbnail, title, quantity }) => {
                const totalPrice = (price * quantity).toFixed(2);
                return (
                  <TableRow key={id}>
                    <TableCell className="flex items-center gap-5 py-5 px-7.5 w-[370px]">
                      <div className="bg-home-bg-1 p-[5px] w-20 h-20">
                        <Image
                          src={thumbnail}
                          width={80}
                          height={80}
                          alt="product"
                        />
                      </div>
                      <b className="lg:text-xl text-lg font-medium text-secondary-foreground capitalize max-w-[200px] line-clamp-1">
                        {title}
                      </b>
                    </TableCell>
                    <TableCell className="text-lg font-medium text-secondary-foreground py-5 px-7.5 w-[165px]">
                      ${price.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-5 px-7.5 w-[190px]">
                      <div className="max-w-25 border border-gray-1 flex items-center gap-4 px-[14px] py-[11px] text-sm font-medium text-gray-1-foreground">
                        <span
                          onClick={() =>
                            dispatch(dicrementProductQuentity({ id }))
                          }
                          className="cursor-pointer h-5 flex items-center"
                        >
                          <Minus />
                        </span>
                        {quantity}
                        <span
                          onClick={() =>
                            dispatch(incrementProductQuentity({ id }))
                          }
                          className="cursor-pointer h-5 flex items-center"
                        >
                          <Plus />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-lg font-medium text-gray-1-foreground py-5 px-7.5 w-[171px]">
                      ${Number(totalPrice).toFixed(2)}
                    </TableCell>
                    <TableCell
                      className="text-gray-1-foreground cursor-pointer py-5 px-7.5"
                      onClick={() => dispatch(removeToCart(id))}
                    >
                      <Close className="size-7.5" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5 border-t-[1.5px] border-t-[#E5E2E1] px-7.5 py-7.5">
            <div className="max-w-[522px] flex items-center gap-2.5">
              <Input
                type={"text"}
                placeholder={"Coupon code"}
                className={"border-gray px-5 py-[14px]"}
              />
              <Button className="lg:px-6 px-4 lg:py-3 lg:text-lg">
                Apply coupon
              </Button>
            </div>
            <Button
              variant={"outline"}
              asChild
              className="lg:px-6 lg:py-3 lg:text-lg"
            >
              <Link href={"/shop"}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="lg:text-2xl text-xl ">
            No Product in Cart{" "}
            <Link
              href={"/shop"}
              className="font-medium underline underline-offset-5 hover:no-underline transition-all duration-500"
            >
              Browse Shop
            </Link>
          </h3>
        </div>
      )}
    </>
  );
};

export default ProductsCartTable;
