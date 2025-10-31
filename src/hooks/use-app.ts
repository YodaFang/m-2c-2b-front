'use client'

import { useCallback, useState, useEffect, useMemo } from "react";
import { useAddToCart, useCreateCart, useGetCart } from "./use-cart"

const useApp = () => {
  const { data: cart, isLoading } = useGetCart();
  const [cartItems, setCartItems] = useState(cart?.items ?? []);
  const { handler: createCart } = useCreateCart();
  const { handler: addToCart } = useAddToCart();

  useEffect(() => {
    setCartItems(cart?.items ?? []);
  }, [cart]);

  const addItem = useCallback(
    async (variantId: string, count: number = 1) => {
      if (!cart) {
        await createCart({ variant_id: variantId, quantity: count });
        return true;
      }
      const item = cartItems?.find((e) => e.variant_id === variantId);
      if (item) {
        return false;
      } else {
        await addToCart({ variant_id: variantId, quantity: count });
      }
      return true;
    },
    [cartItems, createCart, addToCart],
  );

  const increaseItem = useCallback(
    async (itemId: string, count: number = 1) => {
      const item = cartItems?.find((e) => e.id === itemId);
      if (!item) {
        return false;
      }
      return true;
    },
    [cartItems],
  );

  const decreaseItem = useCallback(
    async (itemId: string, count: number = 1) => {
      const item = cartItems?.find((e) => e.id === itemId);
      if (!item) {
        return false;
      }
      return true;
    },
    [cartItems],
  );

  return { cartItems, addItem, increaseItem, decreaseItem }
}

export default useApp;
