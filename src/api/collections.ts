import 'server-only';

import { unstable_cache } from 'next/cache'
import { sdk } from "@/lib/medusaClient"
import { HttpTypes } from "@medusajs/types"

export const retrieveCollection = unstable_cache(
  async (id: string) => {
    return sdk.client
      .fetch<{ collection: HttpTypes.StoreCollection }>(
        `/store/collections/${id}`,
        {
          cache: "force-cache",
        }
      )
      .then(({ collection }) => collection)
  },
  ['cache-medusa-list-categories'],
  {
    revalidate: 360,
  }
);

export const listCollections = unstable_cache(
  async (
    queryParams: Record<string, string> = {}
  ): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
    queryParams.limit = queryParams.limit || "100"
    queryParams.offset = queryParams.offset || "0"

    return sdk.client
      .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
        "/store/collections",
        {
          query: queryParams,
          cache: "force-cache",
        }
      )
      .then(({ collections }) => ({ collections, count: collections.length }))
  },
  ['cache-medusa-list-categories'],
  {
    revalidate: 660,
  }
);

export const getCollectionByHandle = unstable_cache(
  async (
    handle: string
  ): Promise<HttpTypes.StoreCollection> => {
    return sdk.client
      .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
        query: { handle },
        cache: "force-cache",
      })
      .then(({ collections }) => collections[0])
  },
  ['cache-medusa-list-categories'],
  {
    revalidate: 360,
  }
);
