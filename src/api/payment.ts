import 'server-only';

import { sdk } from "@/lib/medusaClient"
import { getAuthHeaders } from "./cookies"
import { HttpTypes } from "@medusajs/types"

// Shipping actions
export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) => payment_providers)
    .catch(() => {
      return null
    })
}
