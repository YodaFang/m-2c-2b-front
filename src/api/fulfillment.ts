'use server'

import { sdk } from "@/lib/medusaClient"
import { getAuthHeaders, getCartId } from "./cookies"
import { StorePrice } from "@medusajs/types"

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

export const listCartShippingMethods = async () => {
  const headers = await getAuthHeaders();
  const cartId = await getCartId();
  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating");
  }

  return sdk.store.fulfillment.listCartOptions({ cart_id: cartId }, headers)
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
}

export const listCartFreeShippingPrices = async (
  cartId: string
): Promise<StoreFreeShippingPrice[]> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{
      prices: StoreFreeShippingPrice[]
    }>(`/store/free-shipping/prices`, {
      method: "GET",
      query: { cart_id: cartId },
      headers,
      cache: "force-cache",
    })
    .then((data) => data.prices)
}
