"use client";
import { Button } from "@/components/custom-ui/button";
import Rating from "@/components/custom-ui/rating";
import calcluteDiscount from "@/lib/calcluteDiscount";
import { addToCart } from "@/lib/features/AddToCartSlice";
import { addToWishlist } from "@/lib/features/AddToWishlistSlice";
import { addToCompare } from "@/lib/features/CompareProductsSlice";
import {
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Minus,
  Plus,
  Shuffle,
  Twitter,
} from "@/lib/icon";
import { useAppDispatch } from "@/lib/reduxHooks";
import currencyFormatter from "currency-formatter";
import Link from "next/link";
import { useState } from "react";

const colors = ["#E56F45", "#B4CBBB", "#CDA477", "#EADDC9", "#E5E2E1"];
const sizes = ["s", "m", "l"];

export interface ProductShortInfoPropsType {
  id: number | string;
  isSiteMapShow?: boolean;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  stock: number;
}
const ProductShortInfo = ({
  id,
  isSiteMapShow,
  title,
  price,
  discountPercentage,
  thumbnail,
  stock,
}: ProductShortInfoPropsType) => {
  const dispatch = useAppDispatch();
  const [selectSize, setSelectSize] = useState("m");
  const [selectColor, setSelectColor] = useState("#E56F45");
  const [productQuantity, setProductQuantity] = useState(1);

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

  const finalPrice = discountPercentage
    ? calcluteDiscount(price, discountPercentage)
    : price;

  return (
    <div>
      {isSiteMapShow && (
        <div className="flex items-center flex-wrap gap-0.5 mb-7.5">
          <Link
            href={"#"}
            className="text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500"
          >
            Home
          </Link>
          <span className="text-gray-3-foreground">
            <ChevronRight className="size-4" />
          </span>
          <Link
            href={"#"}
            className="text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500"
          >
            Shop
          </Link>
          <span className="text-gray-3-foreground">
            <ChevronRight className="size-4" />
          </span>
          <Link
            href={"#"}
            className="text-gray-3-foreground text-base hover:text-gray-1-foreground transition-all duration-500"
          >
            Furniture
          </Link>
          <span className="text-gray-3-foreground">
            <ChevronRight className="size-4" />
          </span>
          <span className="text-gray-1-foreground font-medium">
            Baxter Colette Chair
          </span>
        </div>
      )}

      <strong className="text-secondary-foreground lg:leading-[81%] lg:text-[32px] md:text-[28px] text-2xl font-semibold capitalize">
        {title}
      </strong>
      <div className="flex gap-10 mt-4">
        <div className="flex items-center gap-2">
          <Rating star={5} iconSize="lg:size-[15px]" />
          <span className="text-base text-gray-1-foreground leading-none">
            (3)
          </span>
        </div>
        <p className="text-secondary-foreground text-base">
          Stock: <span className="text-[#59994D]">In stock</span>
        </p>
      </div>
      <p className="text-xl lg:text-2xl xl:text-3xl xl:leading-[133%] text-secondary-foreground mt-5">
        {discountPercentage ? (
          <del className="text-gray-3-foreground">
            {currencyFormatter.format(price, { code: "USD" })}
          </del>
        ) : null}{" "}
        <span>{currencyFormatter.format(finalPrice, { code: "USD" })}</span>
      </p>
      <p className="mt-5 text-gray-1-foreground">
        The Tacoma Carver Dining Chair features a sleek, Its clean lines and
        refined silhouette make a standout pieceany room.
      </p>

      <div className="mt-7.5">
        <p className="text-gray-1-foreground font-medium">Color:</p>
        <ul className="flex gap-2.5 mt-2.5">
          {colors.map((color, index) => (
            <li
              key={index}
              onClick={() => setSelectColor(color)}
              className={`w-5 h-5 rounded-full cursor-pointer relative after:absolute after:left-1/2 after:top-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:w-7 after:h-7 after:rounded-full ${
                color === selectColor
                  ? "after:border after:border-[#E5E2E1]"
                  : ""
              }`}
              style={{ backgroundColor: color }}
            ></li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <p className="text-gray-1-foreground font-medium">Size:</p>
        <ul className="flex gap-2.5 mt-2.5">
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setSelectSize(size)}
              className={`w-7 h-7 rounded-[4px] cursor-pointer border border-[#E5E2E1] uppercase flex justify-center items-center text-sm leading-[171%] ${
                size === selectSize
                  ? "bg-primary text-white"
                  : "text-gray-1-foreground"
              }`}
            >
              {size}
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
          onClick={() =>
            dispatch(
              addToCart({
                id,
                thumbnail,
                quantity: productQuantity,
                price: finalPrice,
                color: selectColor,
                size: selectSize,
                title,
              })
            )
          }
        >
          Add To Cart
        </Button>
      </div>
      <div className="flex gap-4 mt-[22px]">
        <div
          onClick={() =>
            dispatch(
              addToWishlist({
                id,
                date: "May 14, 2025",
                price,
                thumbnail,
                title,
                color: selectColor,
                size: selectSize,
                stock,
              })
            )
          }
          className="flex items-center gap-2 text-gray-1-foreground cursor-pointer hover:text-secondary-foreground transition-all duration-500"
        >
          <Heart className="size-4" />
          <p>Add to wishlist</p>
        </div>
        <div
          onClick={() =>
            dispatch(
              addToCompare({
                id,
                price,
                discountPercentage,
                thumbnail,
                title,
                stock,
                color: selectColor,
                size: selectSize,
              })
            )
          }
          className="flex items-center gap-2 text-gray-1-foreground cursor-pointer hover:text-secondary-foreground transition-all duration-500"
        >
          <Shuffle className="size-4" />
          <p>Compare</p>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2.5">
        <p className="text-gray-1-foreground">
          SKU: <span className="text-gray-1-foreground text-base">D1008</span>
        </p>
        <p className="text-gray-1-foreground">
          Categories:{" "}
          <span className="text-gray-1-foreground text-base">
            Furniture, Chair
          </span>
        </p>
        <p className="text-gray-1-foreground">
          Tag:{" "}
          <span className="text-gray-1-foreground text-base">
            Chair, Table, Furniture, Decor,
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
