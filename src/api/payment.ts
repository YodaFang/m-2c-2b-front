'use server'

import { sdk } from "@/lib/medusaClient"
import { getAuthHeaders } from "./cookies"

export const listPaymentMethods = async (regionId: string) => {
  const headers = await getAuthHeaders();

  return sdk.store.payment.listPaymentProviders({ region_id: regionId }, headers)
    .then(({ payment_providers }) => payment_providers)
    .catch(() => {
      return null;
    });
}
