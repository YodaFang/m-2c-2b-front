'use client'

import { useCallback, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showConfirmToast } from "@/components/custom-ui/toast";
import { Customer, retrieveCustomer, login, signup, signout, transferCart } from "@/api/customer"
import { Cart, retrieveCart, createCart, addItemToCart, updateLineItem, deleteLineItem, setCartEmail, setShippingAddress, setBillingAddress } from "@/api/cart";
import { event } from "@/hooks/use-event";

export const useCustomerActions = () => {
  const queryClient = useQueryClient();
  const { cart } = useGetCart();

  const loginHandler = async (username: string, password: string) => {
    try {
      event.emit('customer:login-start');
      const result = await login(username, password);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
        if (cart && cart.id && cart.items.length) {
          await transferCart(cart.id);
        } else {
          // TODO: 根据customer获取cart
        }
        event.emit('customer:login-success');
      } else {
        event.emit('customer:login-failure', result.message);
      }
    } finally {
      event.emit('customer:login-end');
    }
  };

  const signupHandler = useCallback(
    async (data: Record<string, any>) => {
      try {
        event.emit('customer:signup-start');
        const result = await signup(data);
        if (result.success) {
          event.emit('customer:signup-success');
          queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
        } else {
          event.emit('customer:signup-failure', result.message);
        }
      } finally {
        event.emit('customer:signup-end');
      }
    },
    [signup],
  );

  const logoutHandler = useCallback(
    async () => {
      try {
        event.emit('customer:logout-start');
        await signout();
        queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
        event.emit('customer:logout-success');
      } finally {
        event.emit('customer:logout-end');
      }
    },
    [signout],
  );

  return {
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
  }
}

export const useCartActions = () => {
  const queryClient = useQueryClient();
  const { cart, cartItems } = useGetCart();
  const creatingPromiseRef = useRef<Promise<any> | null>(null);

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
    event.emit('cart:del-success');
    return true;
  }

  const addItemHandler = async (product: any, variant: any, count = 1) => {
    if (!cart) {
      if (!creatingPromiseRef.current) {
        event.emit('cart:create-start', { product, variant });
        creatingPromiseRef.current = createCart([{ variant_id: variant.id, quantity: count }])
          .then((cart) => {
            queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
            event.emit('cart:add-success', { product, variant });
            return cart;
          })
          .finally(() => {
            creatingPromiseRef.current = null;
            event.emit('cart:create-end', { product, variant });
          });
        return true;
      }
      const newCart = await creatingPromiseRef.current;
      if (newCart) {
        const exists = newCart?.items?.some((i: any) => i.variant_id === variant.id);
        if (!exists) {
          await addItemToCart(newCart.id, { variant_id: variant.id, quantity: count });
          queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
          event.emit('cart:add-success', { product, variant });
        }
        return true;
      }
      return false;
    } else {
      const exists = cartItems.find(i => i.variant_id === variant.id);
      if (exists) {
        await increaseItemHandler(exists.id, count);
      } else {
        await addItemToCart(cart.id, { variant_id: variant.id, quantity: count });
      }
      queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
      event.emit('cart:add-success', { product, variant });
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

  const setCartEmailHandler = async (email: string) => {
    await setCartEmail(email);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  const setCartShippingAddrHandler = async (shippingAddr: any) => {
    await setShippingAddress(shippingAddr);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  const setCartBillingAddrHandler = async (billingAddr: any) => {
    await setBillingAddress(billingAddr);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  return {
    addItem: addItemHandler,
    increaseItem: increaseItemHandler,
    decreaseItem: decreaseItemHandler,
    deleteItem: deleteItemHandler,
    setCartEmail: setCartEmailHandler,
    setCartShippingAddr: setCartShippingAddrHandler,
    setCartBillingAddr: setCartBillingAddrHandler,
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

  return { query, customer: query.data };
};

/**
 * Hook: 获取当前购物车
 */
export const useGetCart = () => {
  const query = useQuery<Cart | null, Error>({
    queryKey: ["useGetCart"],
    queryFn: async () => {
      return await retrieveCart();
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });

  return { cart: query.data, cartItems: query.data?.items ?? [], isLoading: query.isLoading };
};

