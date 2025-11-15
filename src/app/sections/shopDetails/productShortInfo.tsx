"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/custom-ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Minus,
  Plus,
  Twitter,
} from "@/lib/icon";
import { cn } from "@/lib/utils";
import { useActions } from "@/hooks/use-app"

const ProductShortInfo = ({ product }: { product: any }) => {
  const [selectVariant, setSelectVariant] = useState<any>(product.variants[0]);
  const [productQuantity, setProductQuantity] = useState(1);
  const { addItem } = useActions();


  const handleProdcutQuantity = (type: string) => {
    if (type === "increment") {
      setProductQuantity(productQuantity + 1);
    } else {
      if (productQuantity === 1) {
        return;
      }
      setProductQuantity(productQuantity - 1);
    }
  };

  const discounted = product.price < product.org_price;
  const categoryNames = product.categories?.map((c: any) => c.name) || [];
  const tags = product.tags?.map((c: any) => c.name) || [];

  return (
    <div>
      <strong className="text-secondary-foreground lg:leading-[81%] lg:text-[32px] md:text-[28px] text-2xl font-semibold capitalize">
        {product.title}
      </strong>
      <div className="flex flex-row mt-5 gap-1">
        {discounted && (
          <span
            className="line-through text-xl text-destructive"
            data-testid="original-price"
          >
            {product.org_price} Lei
          </span>
        )}
        <b
          className={cn("text-xl lg:text-2xl xl:text-3xl xl:leading-[133%]", {
            "text-destructive": discounted,
            "text-important": !discounted,
          })}
          data-testid="price"
        >
          {product.price} Lei
        </b>
      </div>
      <p className="mt-5 text-gray-1-foreground">
        {product.subtitle}
      </p>
      <div className="mt-5">
        <p className="text-gray-1-foreground font-medium">Options:</p>
        <ul className="flex gap-2.5 mt-2.5">
          {product.variants.map((v: any) => (
            <li
              key={v.id}
              onClick={() => setSelectVariant(v)}
              className={`h-7 px-2 rounded-[4px] cursor-pointer border border-[#E5E2E1] uppercase flex justify-center items-center text-sm leading-[171%] ${v.id === selectVariant?.id
                ? "bg-primary text-white"
                : "text-gray-1-foreground"
                }`}
            >
              {v.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3 mt-10">
        <div className="border-[1.5px] border-[#000] text-secondary-foreground flex items-center gap-2.5 px-3 py-2.5 rounded-sm">
          <span
            className="cursor-pointer h-4 w-5 inline-flex items-center justify-center"
            onClick={() => handleProdcutQuantity("decrement")}
          >
            <Minus />
          </span>
          <input
            value={productQuantity}
            readOnly
            className="outline-none max-w-5 text-center text-sm"
          />
          <span
            className="cursor-pointer h-4 w-5 inline-flex items-center justify-center"
            onClick={() => handleProdcutQuantity("increment")}
          >
            <Plus />
          </span>
        </div>
        <Button
          size={"xm"}
          className="lg:leading-[166%] py-1.5"
          onClick={() => addItem(product, selectVariant, productQuantity)}
        >
          Add To Cart
        </Button>
      </div>
      <div className="mt-10 flex flex-col gap-2.5">
        <p className="text-gray-1-foreground">
          SKU: <span className="text-gray-1-foreground text-base">D1008</span>
        </p>
        <p className="text-gray-1-foreground">
          Categories:{" "}
          <span className="text-gray-1-foreground text-base">
            {categoryNames.join(', ')}
          </span>
        </p>
        <p className="text-gray-1-foreground">
          Tag:{" "}
          <span className="text-gray-1-foreground text-base">
            {tags.join(', ')}
          </span>
        </p>
        <div className="text-gray-1-foreground flex items-center gap-2.5">
          Share:
          <ul className="flex gap-2.5">
            <li>
              <Link
                href={"#"}
                aria-label="facebook"
                className="w-6 h-6 rounded-full flex justify-center items-center border border-gray-1 text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
              >
                <Facebook className="size-3" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                aria-label="twitter"
                className="w-6 h-6 rounded-full flex justify-center items-center border border-gray-1 text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
              >
                <Twitter className="size-2.5" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                aria-label="linkedin"
                className="w-6 h-6 rounded-full flex justify-center items-center border border-gray-1 text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
              >
                <Linkedin className="size-2.5" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                aria-label="instagram"
                className="w-6 h-6 rounded-full flex justify-center items-center border border-gray-1 text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
              >
                <Instagram className="size-2.5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductShortInfo;
