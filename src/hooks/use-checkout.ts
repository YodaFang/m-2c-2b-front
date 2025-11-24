'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listCartShippingMethods } from "@/api/fulfillment"
import { listPaymentMethods } from "@/api/payment"
import { setShippingMethod, initiatePaymentSession, completeCart } from "@/api/cart";

export const useCheckoutActions = () => {
  const queryClient = useQueryClient();

  const selectShippingMethod = async (methodId: string) => {
    await setShippingMethod(methodId);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  const initPayment = async (cart: any, paymentId: string, context?: Record<string, unknown>) => {
    await initiatePaymentSession(cart, { provider_id: paymentId, context });
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  const placeOrder = async (cart: any) => {
    await completeCart();
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  return {
    selectShippingMethod,
    initPayment,
    placeOrder,
  }
}

export const useGetShippingMethods = () => {
  const query = useQuery({
    queryKey: ["useGetShippingMethods"],
    queryFn: async () => {
      return await listCartShippingMethods();
    },
    staleTime: 3_000,
  });

  return { shippingMethods: query.data, isLoading: query.isLoading };
};

export const useGetPaymentgMethods = (regionId?: string) => {
  const query = useQuery({
    queryKey: ["useGetPaymentgMethods"],
    queryFn: async () => {
      return await listPaymentMethods(regionId!);
    },
    enabled: !!regionId,
    staleTime: 3_000,
  });

  return { paymentMethods: query.data, isLoading: query.isLoading };
};
