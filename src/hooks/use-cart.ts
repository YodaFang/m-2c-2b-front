'use client'

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart, AddCartItem, retrieveCart, createCart, updateCart, addItemToCart, addToCartBulk, updateLineItem, deleteLineItem } from "@/api/cart";

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

/**
 * Hook: 创建购物车（可选添加商品）
 */
export const useCreateCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Cart,
    Error,
    AddCartItem | AddCartItem[] | undefined
  >({
    mutationFn: async (itemData) => {
      const data = (!Array.isArray(itemData) && itemData) ? [itemData] : undefined
      const cart = data ? await createCart(data) : await createCart();
      if (cart) {
        // 更新 localStorage
        setCartId(cart.id);
        // 刷新当前 tab 的 useGetCart 数据
        queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
      }

      return cart;
    },
    onError: (err) => {
      console.error("Failed to create cart:", err);
    },
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void | undefined,
    Error,
    AddCartItem | AddCartItem[]
  >({
    mutationFn: async (itemData) => {
      const cartId = getCartId();
      if (!cartId) return;
      Array.isArray(itemData) ? await addToCartBulk(cartId, itemData) : await addItemToCart(cartId, itemData);
      return;
    },
    onError: (err) => {
      console.error("Failed to add to cart:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void | undefined,
    Error,
    { itemId: string, quantity: number }
  >({
    mutationFn: async (itemData) => {
      const cartId = getCartId();
      if (!cartId) return;
      await updateLineItem(cartId, itemData.itemId, itemData.quantity);
      return;
    },
    onError: (err) => {
      console.error("Failed to update lineitem:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void | undefined,
    Error,
    { itemId: string }
  >({
    mutationFn: async (itemData) => {
      const cartId = getCartId();
      if (!cartId) return;
      await deleteLineItem(cartId, itemData.itemId);
      return;
    },
    onError: (err) => {
      console.error("Failed to delete lineitem:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Cart | undefined,
    Error,
    any
  >({
    mutationFn: async (data) => {
      const cartId = getCartId();
      if (!cartId) return;
      const cart = await updateCart(cartId, data);
      if (cart) {
        queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
      }
      return cart;
    },
    onError: (err) => {
      console.error("Failed to update cart:", err);
    },
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};


const getCartId = () => localStorage.getItem("common::cart_id");
const setCartId = (cartId: string) => localStorage.setItem("common::cart_id", cartId);
