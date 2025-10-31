'use client'

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart, AddCartItem, retrieveCart, createCart, updateCart, addItemToCart, addToCartBulk } from "@/api/cart";

/**
 * Hook: 获取当前购物车
 */
export const useGetCart = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const syncCartId = () => {
      const storedId = localStorage.getItem("common::cart_id");
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
        localStorage.setItem("common::cart_id", cart.id);
        // 刷新当前 tab 的 useGetCart 数据
        queryClient.invalidateQueries({ queryKey: ["useGetCart", cart.id] });
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

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Cart | undefined,
    Error,
    any
  >({
    mutationFn: async (data) => {
      const cartId = localStorage.getItem("common::cart_id");
      if (!cartId) return;
      const cart = await updateCart(cartId, data);
      if (cart) {
        queryClient.invalidateQueries({ queryKey: ["useGetCart", cart.id] });
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

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void | undefined,
    Error,
    AddCartItem | AddCartItem[]
  >({
    mutationFn: async (itemData) => {
      const cartId = localStorage.getItem("common::cart_id");
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
