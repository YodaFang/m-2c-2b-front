'use client'

import { useCallback, useRef, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2Icon } from "lucide-react";
import { toast, showErrorToast, showConfirmToast } from "@/components/custom-ui/toast";
import { showLoadingOverlay, hideLoadingOverlay } from "@/components/custom-ui/loading-overlay";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Thumbnail from "@/components/custom-ui/thumbnail";
import { Customer, retrieveCustomer, login, signup, signout, transferCart } from "@/api/customer"
import { Cart, retrieveCart, createCart, addItemToCart, updateLineItem, deleteLineItem, setCartId } from "@/api/cart";

export const useActions = () => {
  const router = useRouter();
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
          if (cart && cart.id && cart.items.length) {
            await transferCart(cart.id);
          } else {
            // TODO: 根据customer获取cart
          }
          hideLoadingOverlay();
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
        // 重定向到主页， 不然清空CartId后，cart items目前无法自动清空
        router.push('/');
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

  const addItemHandler = async (product: any, variant: any, count = 1) => {
    if (!cart) {
      if (!creatingPromiseRef.current) {
        showLoadingOverlay();
        creatingPromiseRef.current = createCart([{ variant_id: variant.id, quantity: count }])
          .then((cart) => {
            queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
            showAddCartToast(product, variant);
            return cart;
          })
          .finally(() => {
            creatingPromiseRef.current = null;
            hideLoadingOverlay();
          });
        return true;
      }
      const newCart = await creatingPromiseRef.current;
      if (newCart) {
        const exists = newCart?.items?.some((i: any) => i.variant_id === variant.id);
        if (!exists) {
          await addItemToCart(newCart.id, { variant_id: variant.id, quantity: count });
          queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
          showAddCartToast(product, variant);
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
      showAddCartToast(product, variant);
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

  const addTest = async (product: any, variant: any, count = 1) => {
    setCartId("");
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
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

  return { cart: query.data, cartItems: query.data?.items ?? [] };
};

export function showAddCartToast(p: any, v: any) {
  return toast.custom(
    (id) => (
      <Card className="bg-emerald-50 lg:w-[300px] w-full px-0 mx-0 py-2 gap-3">
        <CardHeader className="w-full px-2 gap-1">
          <CardTitle className="w-full flex flex-row justify-center text-base text-emerald-600"><CheckCircle2Icon size="23px" className="mx-1" /> Successfully Added</CardTitle>
          <CardDescription className="w-full px-0 py-1 mx-0 border-y-[1.5px]">
            <div className="flex gap-2 p-0">
              <div className="shrink-0">
                <Thumbnail
                  className="h-[54px]"
                  thumbnail={p.thumbnail!}
                  size="square"
                  type="preview"
                />
              </div>
              <div className="flex flex-col shrink">
                <b className="text-sm leading-tight line-clamp-2">{p.title}</b>
                <span className="text-secondary-foreground text-sm">{v.title}</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full px-2 mx-0 gap-3">
          <div className='w-full flex flex-row gap-2'>
            <button className='border-[1.5px] border-[#999796] flex justify-center items-center w-full py-1 rounded-lg'>
              <span className='text-secondary-foreground text-base font-semibold'>View Cart</span>
            </button>
            <button className='bg-primary border-[1.5px] border-[#999796] flex justify-center items-center w-full py-1 rounded-lg'>
              <span className='text-primary-foreground text-base font-semibold'>Checkout</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    ),
    {
      duration: 3000,
      closeButton: true,
    }
  )
}

