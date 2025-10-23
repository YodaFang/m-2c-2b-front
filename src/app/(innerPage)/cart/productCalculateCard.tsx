"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/lib/reduxHooks";
import Link from "next/link";
import { useState } from "react";

const ProductCalculateCard = () => {
  const [shippingPrice, setShippingPrice] = useState("0");
  const { products } = useAppSelector((state) => state.addToCart);
  const subTotal = products.reduce(
    (total, product) => total + product?.price * product?.quantity,
    0
  );
  const totalPrice = Number(subTotal) + Number(shippingPrice);

  // useEffect(() => {
  //     if (isCheckout) {
  //         setCustomerInfo({ ...customerInfo, products, paymentMehod, totalPrice })
  //     }
  // }, [products, paymentMehod, totalPrice])

  return (
    <>
      {products.length ? (
        <div className="border-primary border px-5 pt-5 pb-7.5 lg:sticky top-0 rounded-lg">
          <p className="font-semibold lg:text-2xl text-xl text-secondary-foreground">
            Cart Totals
          </p>
          <div className="mt-7.5 border-b border-b-[#E5E2E1] pb-5">
            <div className="flex items-center justify-between">
              <p className="lg:text-xl text-lg font-medium text-secondary-foreground">
                Subtotal
              </p>
              <p className="font-medium text-secondary-foreground">
                ${subTotal}
              </p>
            </div>
          </div>
          <div className="mt-7.5 border-b border-b-[#E5E2E1] pb-5">
            <RadioGroup
              onValueChange={setShippingPrice}
              defaultValue="0"
              className="gap-2.5 justify-end"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="0"
                  id="free-shipping"
                  aria-label="radio"
                  className="border-primary text-transparent"
                />
                <Label
                  htmlFor="free-shipping"
                  className="text-gray-1-foreground text-base"
                >
                  Free Shipping
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="10"
                  id="fat-rate"
                  aria-label="radio"
                  className="border-primary text-transparent"
                />
                <Label
                  htmlFor="fat-rate"
                  className="text-gray-1-foreground text-base"
                >
                  Fat Rate $10.00
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-start justify-between gap-9 mt-7.5">
              <p className="lg:text-xl text-lg font-medium text-secondary-foreground">
                Shipping
              </p>
              <div>
                <p className="text-gray-1-foreground">
                  Shipping to{" "}
                  <span className="text-secondary-foreground">USA</span>
                </p>
                <p className="text-secondary-foreground mt-3">Change address</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="lg:text-2xl text-xl font-medium text-secondary-foreground">
              Total
            </p>
            <p className="font-bold text-secondary-foreground">${totalPrice}</p>
          </div>
          <Button asChild className="mt-7.5 w-full lg:text-lg" size="lg">
            <Link href={"/checkout"}>Proceed to checkout</Link>
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default ProductCalculateCard;
