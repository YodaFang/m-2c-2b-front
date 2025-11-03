'use client'

import { useCallback, useRef, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, showErrorToast, showConfirmToast } from "@/components/custom-ui/toast";
import { Customer, retrieveCustomer, login, signup, signout } from "@/api/customer"
import { Cart, AddCartItem, retrieveCart, createCart, updateCart, addItemToCart, addToCartBulk, updateLineItem, deleteLineItem } from "@/api/cart";
import { useAddToCart, useCreateCart, useUpdateCartItem, useDeleteCartItem } from "./use-cart"

const useApp = () => {
  const queryClient = useQueryClient();
  const { data: customer } = useGetCustomer();
  const { data: cart } = useGetCart();
  const { handler: createCart } = useCreateCart();
  const { handler: addCartItem } = useAddToCart();
  const { handler: updateCartItem } = useUpdateCartItem();
  const { handler: deleteCartItem } = useDeleteCartItem();
  const creatingPromiseRef = useRef<Promise<any> | null>(null);

  const loginHandler = useCallback(
    async (username: string, password: string) => {
      const result = await login(username, password);
      if(!result.success){
        showErrorToast("Login Failed", result.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
      }
    },
    [login],
  );

  const logout = useCallback(
    async () => {
      // TODO: Cart
      return true;
    },
    [],
  );

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
      const ok = await showConfirmToast({
        title: "Delete below item from cart?",
        description: `<b>${item.product_title}</b> <br/> (${item.variant_title})`,
        confirmText: "Delete",
        cancelText: "Cancel",
      });
      if (!ok) return false;
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

  return { customer, login: loginHandler, logout, signup, cartItems: cart?.items ?? [], addItem, increaseItem, decreaseItem, deleteItem }
}

export default useApp;

/**
 * Hook: 获取当前登录客户信息
 */
export const useGetCustomer = () => {
  const query = useQuery<Customer | null, Error>({
    queryKey: ["useGetCustomer"],
    queryFn: async () => {
      return await retrieveCustomer();
    },
    staleTime: 90_000,
    refetchOnWindowFocus: true,
  });

  return query;
};

const getCartId = () => localStorage.getItem("common::cart_id");
const setCartId = (cartId: string) => localStorage.setItem("common::cart_id", cartId);

/**
 * Hook: 获取当前购物车
 */
export const useGetCart = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const syncCartId = () => {
      const storedId = getCartId();
      setCartId(storedId);
    };
    syncCartId(); // 初始化执行
    return;
  }, []);

  const query = useQuery<Cart | null, Error>({
    queryKey: ["useGetCart", cartId],
    queryFn: async () => {
      if (!cartId) return null;
      return await retrieveCart(cartId);
    },
    enabled: !!cartId,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });

  return query;
};
