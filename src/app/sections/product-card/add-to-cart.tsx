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

  // 控制 Dropdown 的打开状态（可用于点击或悬浮逻辑）
  const [open, setOpen] = useState(false);

  // 控制添加状态（loading）
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (variantId: string) => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      setOpen(false);
      await addItem(variantId, 1);
    } catch (err) {
      console.error("Add to cart failed", err);
      // 你可以在这里 show toast
    } finally {
      setIsAdding(false);
      setOpen(false);
    }
  };

  const hasVariants = product?.variants && product.variants.length > 1;
  const singleVariant = product?.variants?.[0];

  // 如果只有一个变体，直接按钮（不用 Dropdown）
  if (!hasVariants) {
    return (
      <LoadingButton
        className="rounded-full p-1 border-none shadow-none"
        onClick={(e) => {
          e.preventDefault();
          // 直接调用 singleVariant.id（可能为 undefined，需要 guard）
          if (singleVariant?.id) handleAddToCart(singleVariant.id);
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
              if (!isAdding) handleAddToCart(variant.id);
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
