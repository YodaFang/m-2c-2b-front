'use client'

import { useCallback, useRef } from "react";
import { toast } from "@/components/custom-ui/toast";
import { useAddToCart, useCreateCart, useGetCart, useUpdateCartItem, useDeleteCartItem } from "./use-cart"

const useApp = () => {
  const { data: cart } = useGetCart();
  const { handler: createCart } = useCreateCart();
  const { handler: addCartItem } = useAddToCart();
  const { handler: updateCartItem } = useUpdateCartItem();
  const { handler: deleteCartItem } = useDeleteCartItem();

  const creatingPromiseRef = useRef<Promise<any> | null>(null);

  const increaseItem = useCallback(
    async (itemId: string, count: number = 1) => {
      const item = cart?.items?.find((e) => e.id === itemId);
      if (!item) return false;
      await updateCartItem({ itemId: item.id, quantity: count + item.quantity });
      return true;
    },
    [cart, updateCartItem],
  );

  const deleteItem = useCallback(
    async (itemId: string) => {
      const item = cart?.items?.find((e) => e.id === itemId);
      if (!item) return false;
      await deleteCartItem({ itemId: item.id });
      return true;
    },
    [cart, deleteCartItem],
  );

  const addItem = useCallback(async (variantId: string, count = 1) => {
    if (!cart) {
      if (!creatingPromiseRef.current) {
        creatingPromiseRef.current = createCart({ variant_id: variantId, quantity: count })
          .finally(() => {
            creatingPromiseRef.current = null;
            toast.success('Add To Cart Successfully');
          });
        return true;
      }
      const newCart = await creatingPromiseRef.current;
      const exists = newCart?.items?.some((i: any) => i.variant_id === variantId);
      if (exists) {
        return true;
      } else {
        await addCartItem({ variant_id: variantId, quantity: count });
        toast.success('Add To Cart Successfully');
        return true
      }
    }

    const exists = cart?.items?.find(i => i.variant_id === variantId);
    if (exists) {
      await increaseItem(exists.id, count);
    } else {
      await addCartItem({ variant_id: variantId, quantity: count });
    }
    toast.success('Add To Cart Successfully');
    return true;
  }, [cart, createCart, addCartItem, increaseItem, creatingPromiseRef]);

  const decreaseItem = useCallback(
    async (itemId: string, count: number = 1) => {
      const item = cart?.items?.find((e) => e.id === itemId);
      if (!item || count <= 0) return false;
      if (count >= item.quantity) {
        await deleteItem(item.id);
      } else {
        await updateCartItem({ itemId: item.id, quantity: item.quantity - count });
      }
      return true;
    },
    [cart, deleteItem, updateCartItem],
  );

  return { cartItems: cart?.items ?? [], addItem, increaseItem, decreaseItem, deleteItem }
}

export default useApp;
