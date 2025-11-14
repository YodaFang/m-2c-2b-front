import 'server-only';

import { unstable_cache } from 'next/cache'
import { sdk } from "@/lib/medusaClient"
import { HttpTypes } from "@medusajs/types"

export const listCategories = unstable_cache(
  async (): Promise<HttpTypes.StoreProductCategory[]> => {
    return sdk.client
      .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
        "/store/product-categories",
        {
          query: {
            fields:
              "*category_children, *products, *parent_category, *parent_category.parent_category",
            limit: 20,
          },
        }
      )
      .then(({ product_categories }) => product_categories)
  },
  ['cache-medusa-list-categories'],
  {
    revalidate: 660,
  }
);

export const getCategoryByHandle = unstable_cache(
  async (
    categoryHandle: string[]
  ): Promise<HttpTypes.StoreProductCategory> => {
    const handle = `${categoryHandle.join("/")}`

    return sdk.client
      .fetch<HttpTypes.StoreProductCategoryListResponse>(
        `/store/product-categories`,
        {
          query: {
            fields: "*category_children, *products",
            handle,
          },
        }
      )
      .then(({ product_categories }) => product_categories[0])
  },
  ['cache-medusa-list-categories'],
  {
    revalidate: 660,
  }
);
