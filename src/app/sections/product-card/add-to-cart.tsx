'use client'

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoadingButton } from "@/components/custom-ui/loading-button"
import { ShoppingBag } from "@/lib/icon"
import { useActions } from "@/hooks/use-app"

const AddToCartItem = ({ product }: { product: any }) => {
  const { addItem } = useActions();

  const [open, setOpen] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (product: any, variant: any) => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      setOpen(false);
      await addItem(product, variant, 1);
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setIsAdding(false);
      setOpen(false);
    }
  };

  const hasVariants = product?.variants && product.variants.length > 1;
  const singleVariant = product?.variants?.[0];

  if (!hasVariants) {
    return (
      <LoadingButton
        className="rounded-full p-1 border-none shadow-none"
        onClick={(e) => {
          e.preventDefault();
          if (singleVariant) handleAddToCart(product, singleVariant);
        }}
        isLoading={isAdding}
      >
        <ShoppingBag fill="#fff" />
      </LoadingButton>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <LoadingButton
          className="rounded-full p-1 border-none shadow-none"
          aria-expanded={open}
          isLoading={isAdding}
        >
          <ShoppingBag fill="#fff" />
        </LoadingButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" className="min-w-[8rem]">
        {product.variants.map((variant: any) => (
          <DropdownMenuItem
            key={variant.id}
            disabled={isAdding}
            onSelect={(e) => {
              e.preventDefault();
              if (!isAdding) handleAddToCart(product, variant);
            }}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{variant.title || "Unnamed variant"}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddToCartItem;
