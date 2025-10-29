"use client";
import { addToCart } from "@/lib/features/AddToCartSlice";
import { addToWishlist } from "@/lib/features/AddToWishlistSlice";
import { Eye, Heart, ShopCart } from "@/lib/icon";
import { useAppDispatch } from "@/lib/reduxHooks";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/data";
import currencyFormatter from "currency-formatter";
import Thumbnail from "@/components/custom-ui/thumbnail";
import Link from "next/link";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Tooltip from "@/components/custom-ui/tooltip";
import ProductQuickView from "./shopDetails/productQuickView";

interface CardPropsType {
  children?: ReactNode;
  className?: string;
}

type ContextType = {
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
};

export const CardContext = createContext<ContextType | null>(null);

const Card = ({ children, className }: CardPropsType) => {
  const [currentImage, setCurrentImage] = useState("");

  return (
    <CardContext.Provider value={{ currentImage, setCurrentImage }}>
      <div
        onMouseLeave={() => setCurrentImage("")}
        className={cn("group", className)}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

export default Card;

export function CardFooter({ children, className }: CardPropsType) {
  return <div className={cn("mt-5", className)}>{children}</div>;
}

export function CardHeader({ children, className }: CardPropsType) {
  return (
    <div
      className={cn(
        "bg-[#F2F2F2] border border-[#F2F2F2] rounded-[15px] drop-shadow-[0px_4px_40px_rgba(0,0,0,0.08)] relative overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardImg({
  src,
  className,
}: {
  src: string;
  height: number;
  width: number;
  className?: string;
}) {
  const context = useContext(CardContext);
  const currentImage = context ? context.currentImage : "";
  return <Thumbnail className={className} thumbnail={currentImage || src} size="medium" />
}

// Enhanced CardIcons with built-in functionality
interface CardIconsProps extends CardPropsType {
  product: Product;
}

export function CardIcons({ children, className, product }: CardIconsProps) {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultActions = product && {
    handleWishlist: () => {
      if (product) {
        dispatch(
          addToWishlist(product)
        );
      }
    },
    handleQuickView: () => {
      if (product) {
        setIsDialogOpen(true);
      }
    },
    handleAddToCart: () => {
      if (product) {
        dispatch(
          addToCart({
            variantId: product.id,
            quantity: 1,
          })
        );
      }
    },
  };

  // If children are provided, render them instead of default icons
  if (children) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2.5 pt-2.5 transition-all duration-500",
          className
        )}
      >
        {children}
      </div>
    );
  }

  // Render default icons with functionality
  return (
    <div
      className={cn(
        "absolute bottom-5 left-5 right-5 flex justify-center gap-2.5 transition-all duration-500",
        className
      )}
    >
      {/* Add to wishlist */}
      <Tooltip text={"Add to wishlist"}>
        <button
          aria-label="wishlist"
          onClick={defaultActions?.handleWishlist}
          className="w-7.5 h-7.5 bg-background flex justify-center items-center rounded-full lg:opacity-0 lg:group-hover:opacity-100 delay-0 transform lg:translate-y-full lg:group-hover:translate-y-0 transition-all duration-300"
        >
          <span className="flex justify-center items-center w-full h-full rounded-full text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-300">
            <Heart className="size-4" />
          </span>
        </button>
      </Tooltip>

      {/* Quick view */}
      <Tooltip text={"Quick view"}>
        <button
          aria-label="Quick"
          onClick={defaultActions?.handleQuickView}
          className="w-7.5 h-7.5 bg-background flex justify-center items-center rounded-full lg:opacity-0 lg:group-hover:opacity-100 delay-100 transform lg:translate-y-full lg:group-hover:translate-y-0 transition-all duration-300"
        >
          <span className="flex justify-center items-center w-full h-full rounded-full text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-300">
            <Eye className="size-4" />
          </span>
        </button>
      </Tooltip>

      {/* Add to cart */}
      <Tooltip text={"Add to cart"}>
        <button
          aria-label="cart"
          onClick={defaultActions?.handleAddToCart}
          className="w-7.5 h-7.5 bg-background flex justify-center items-center rounded-full lg:opacity-0 lg:group-hover:opacity-100 delay-200 transform lg:translate-y-full lg:group-hover:translate-y-0 transition-all duration-300"
        >
          <span className="flex justify-center items-center w-full h-full rounded-full text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-300">
            <ShopCart className="size-4" />
          </span>
        </button>
      </Tooltip>
      <ProductQuickView
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        product={product}
      />
    </div>
  );
}

export function CardLabel({
  children,
  className,
  isLabel,
}: {
  children: ReactNode;
  className?: string;
  isLabel?: boolean | string;
}) {
  return (
    <>
      {isLabel ? (
        <div
          className={cn(
            "bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0",
            className
          )}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export function CardDiscount({
  children,
  className,
  isDiscountTrue,
}: {
  children: ReactNode;
  className?: string;
  isDiscountTrue?: boolean | number;
}) {
  return (
    <>
      {isDiscountTrue ? (
        <div
          className={cn(
            "bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0",
            className
          )}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export function CardSoldOut({
  children,
  className,
  isStockTrue,
}: {
  children: ReactNode;
  className?: string;
  isStockTrue?: boolean | number;
}) {
  return (
    <>
      {isStockTrue === 0 || isStockTrue === null ? (
        <div
          className={cn(
            "bg-primary py-2 px-4 text-white text-lg leading-6 inline capitalize absolute top-5 left-0",
            className
          )}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

type ColorProps = {
  colors?: {
    code: string;
    image: string;
  }[];
  className?: string;
};

export function CardColors({ colors, className }: ColorProps) {
  const context = useContext(CardContext);

  if (!context) {
    return null;
  }

  const { setCurrentImage } = context;

  return (
    <>
      {colors ? (
        <div className={cn("flex gap-2.5 absolute bottom-5 left-5", className)}>
          {colors.map((color, index) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full bg-primary block cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: color.code }}
              onMouseEnter={() => setCurrentImage(color.image)}
            ></span>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function CardCategory({
  path,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  path?: string;
}) {
  return (
    <Link
      href={path || "#"}
      className={cn(
        "text-gray-3-foreground hover:text-secondary-foreground transition-all duration-500",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function CardTitle({
  children,
  className,
  path,
}: {
  children: ReactNode;
  className?: string;
  path?: string;
}) {
  return (
    <Link
      href={path || "#"}
      className={cn(
        "line-clamp-1 text-lg font-medium capitalize text-secondary-foreground hover:text-gray-1-foreground transition-all duration-500",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function CardPrice({ children, className }: CardPropsType) {
  return (
    <p
      className={cn(
        "inline-block mt-2.5 font-semibold text-lg text-secondary-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

// Enhanced CardPrice with discount display
interface CardPriceEnhancedProps {
  price: number;
  discountPercentage?: number;
  className?: string;
}

export function CardPriceEnhanced({
  price,
  discountPercentage,
  className,
}: CardPriceEnhancedProps) {
  const finalPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  return (
    <p className={cn("font-normal mt-px text-gray-1-foreground", className)}>
      {discountPercentage ? (
        <del className="text-gray-3-foreground font-normal">
          {currencyFormatter.format(price, { code: "USD" })}
        </del>
      ) : null}{" "}
      <span>{currencyFormatter.format(finalPrice, { code: "USD" })}</span>{" "}
    </p>
  );
}
