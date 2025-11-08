'use client'

import { useCallback, useRef, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, showErrorToast, showConfirmToast } from "@/components/custom-ui/toast";
import { showLoadingOverlay, hideLoadingOverlay } from "@/components/custom-ui/loading-overlay";
import { Customer, retrieveCustomer, login, signup, signout } from "@/api/customer"
import { Cart, retrieveCart, createCart, updateCart, addItemToCart, addToCartBulk, updateLineItem, deleteLineItem } from "@/api/cart";
import { CartItem } from "@/app/sections/cart/cart-item";

export const useActions = () => {
  const queryClient = useQueryClient();
  const { data: customer } = useGetCustomer();
  const { cart, cartItems } = useGetCart();
  const creatingPromiseRef = useRef<Promise<any> | null>(null);

  const loginHandler = useCallback(
    async (username: string, password: string) => {
      try {
        showLoadingOverlay();
        const result = await login(username, password);
        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
          toast.success(<><b>Sign In Sucessfully</b><br /><p>Welcome back {customer?.first_name}!</p></>);
        } else {
          showErrorToast("Login Failed", result.message || "Invalid email or password, you can use 'forgot password' to resee your password");
        }
      } finally {
        hideLoadingOverlay();
      }
    },
    [login],
  );

  const signupHandler = useCallback(
    async (data: Record<string, any>) => {
      try {
        showLoadingOverlay();
        const result = await signup(data);
        if (!result.success) {
          showErrorToast("Login Failed", result.message || "");
        } else {
          queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
        }
      } finally {
        hideLoadingOverlay();
      }
    },
    [signup],
  );

  const logoutHandler = useCallback(
    async () => {
      try {
        showLoadingOverlay();
        await signout();
        setCartId("");
        queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
        queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
      } finally {
        hideLoadingOverlay();
      }
    },
    [signout],
  );

  const increaseItemHandler = async (itemId: string, count: number = 1) => {
    const item = cartItems.find((e) => e.id === itemId);
    if (!cart || !item) return false;
    await updateLineItem(cart.id, item.id, count + item.quantity);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  const deleteItemHandler = async (itemId: string) => {
    const item = cartItems.find((e) => e.id === itemId);
    if (!cart || !item) return false;
    const ok = await showConfirmToast({
      title: "Delete below item from cart?",
      description: `<b>${item.product_title}</b> <br/> (${item.variant_title})`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!ok) return false;
    await deleteLineItem(cart.id, item.id);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    toast.success('Item Removed Successfully');
    return true;
  }

  const addItemHandler = async (variantId: string, count = 1) => {
    if (!cart) {
      try {
        showLoadingOverlay();
        if (!creatingPromiseRef.current) {
          creatingPromiseRef.current = createCart([{ variant_id: variantId, quantity: count }])
            .finally(() => {
              creatingPromiseRef.current = null;
              toast.success('Add To Cart Successfully');
            });
          return true;
        }
        const newCart = await creatingPromiseRef.current;
        if (newCart) {
          setCartId(newCart.id);
          const exists = newCart?.items?.some((i: any) => i.variant_id === variantId);
          if (!exists) {
            await addItemToCart(newCart.id, { variant_id: variantId, quantity: count });
            toast.success('Add To Cart Successfully');
          }
          queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
          return true;
        }
      } finally {
        hideLoadingOverlay();
      }
      return false;
    } else {
      const exists = cartItems.find(i => i.variant_id === variantId);
      if (exists) {
        await increaseItemHandler(exists.id, count);
      } else {
        await addItemToCart(cart.id, { variant_id: variantId, quantity: count });
      }
      queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
      toast.success('Add To Cart Successfully');
      return true;
    }
  }

  const decreaseItemHandler = async (itemId: string, count: number = 1) => {
    const item = cartItems.find((e) => e.id === itemId);
    if (!cart || !item || count <= 0) return false;
    if (count >= item.quantity) {
      await deleteItemHandler(item.id);
    } else {
      await updateLineItem(cart.id, item.id, item.quantity - count);
    }
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  return {
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    addItem: addItemHandler,
    increaseItem: increaseItemHandler,
    decreaseItem: decreaseItemHandler,
    deleteItem: deleteItemHandler
  }
}

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

  return { cart: query.data, cartItems: query.data?.items ?? [] };
};
