import 'server-only';

import { unstable_cache } from 'next/cache'
import { sdk } from "@/lib/medusaClient"
import { getAuthHeaders } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const getProductByHandle = unstable_cache(
  async (handle: string, regionId?: string) => {
    const headers = {
      ...(await getAuthHeaders()),
    }

    return sdk.store.product.list(
      {
        handle,
        region_id: regionId || "",
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,+metadata,*categories,*tags,",
      },
      headers,
    ).then(({ products }) => products.length && transformMedusaProduct(products[0]));
  },
  ['cache-medusa-get-products-by-handle'],
  {
    revalidate: 180,
  }
);

export const listProducts = unstable_cache(
  async ({
    pageParam = 1,
    queryParams,
    regionId,
  }: {
    pageParam?: number
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
    regionId?: string
  } = {}) => {
    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam - 1) * limit

    const headers = {
      ...(await getAuthHeaders()),
    }

    return sdk.store.product.list(
      {
        limit,
        offset,
        region_id: regionId || "",
        fields: "*variants.calculated_price",
        order: "-created_at",
        ...queryParams,
      },
      headers,
    ).then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;
      return {
        products: products.map((p) => transformMedusaProduct(p)),
        count,
        nextPage,
        queryParams,
      };
    });
  },
  ['cache-medusa-list-products'],
  {
    revalidate: 300, // 10 分钟
  }
);

export const listCollectionsProducts = unstable_cache(
  async ({
    pageParam = 1,
    queryParams,
    regionId,
  }: {
    pageParam?: number
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreCollectionListParams
    regionId?: string
  } = {}) => {
    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam - 1) * limit

    const headers = {
      ...(await getAuthHeaders()),
    }

    return sdk.client
      .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
        "/store/collections/products",
        {
          query: {
            limit,
            offset,
            region_id: regionId || "",
            ...queryParams,
          },
          headers,
        }
      )
      .then(({ collections }) => {
        return collections.map((c) => ({
          ...c,
          products: c.products?.map((p) => transformMedusaProduct(p)),
        }));
      });
  },
  ['cache-medusa-list-collections-products'],
  {
    revalidate: 330,
  }
)

export const getProductsByIds = unstable_cache(
  async ({
    ids,
    regionId,
  }: {
    ids: string[]
    regionId?: string
  }) => {
    const headers = {
      ...(await getAuthHeaders()),
    }
    return sdk.store.product.list(
      {
        id: ids,
        region_id: regionId || "",
        fields:
          "*variants,*variants.calculated_price,*variants.inventory_quantity",
      },
      headers,
    ).then(({ products }) => products.map((p) => transformMedusaProduct(p)));
  },
  ['cache-medusa-get-products-by-ids'],
  {
    revalidate: 210,
  }
);

export interface Product {
  id: number | string,
  title: string,
  subtitle?: string,
  description: string,
  handle: string,
  discountPercentage?: number,
  org_price: number,
  price: number,
  rating?: number,
  totalRating?: string,
  brand?: string,
  label?: string,
  type?: string,
  thumbnail: string,
  collection_id: string,
  origin_country?: string,
  created_at?: string,
  updated_at?: string,
  images: {
    id: number | string,
    url: string,
    pos?: number,
    variant_id?: number | string,
  }[],
  variants: Variant[],
  options?: ProductOption[],
  categories: {
    id: number | string,
    name: string,
    handle: string,
    description: string,
  }[],
  tags: {
    id: number | string,
    value: string,
    as_label?: boolean,
  }[],
  collection: any,
}

export interface ProductOption {
  id: number | string,
  title: string,
  values: {
    id: number | string,
    value: string,
  }[],
}

export interface Variant {
  id: string,
  title: string | null,
  sku: string,
  barcode: string,
  ean: string,
  material: string,
  weight: string,
  length: string,
  height: string,
  width: string,
  options?: {
    id: number | string,
    option_id: number | string,
    value: string,
  }[],
  price: {
    calculated: number,
    original: number,
  },
  created_at?: string,
  updated_at?: string,
}


function transformMedusaProduct(medusaProduct: HttpTypes.StoreProduct): Product {
  let lowestCalculatedPrice: number = 0;
  let originalPrice: number = 0;

  const variants =
    medusaProduct.variants?.map((variant: HttpTypes.StoreProductVariant) => {
      const variantPrice = variant.calculated_price?.calculated_amount ?? 0;
      if ((!lowestCalculatedPrice && variantPrice) || variantPrice < lowestCalculatedPrice) {
        lowestCalculatedPrice = variantPrice;
        originalPrice = variant.calculated_price?.original_amount || lowestCalculatedPrice;
      }

      return {
        id: variant.id,
        title: variant.title,
        sku: variant.sku || "",
        barcode: variant.barcode || "",
        ean: variant.ean || "",
        material: variant.material || "",
        weight: variant.weight?.toString() || "",
        length: variant.length?.toString() || "",
        height: variant.height?.toString() || "",
        width: variant.width?.toString() || "",
        options:
          variant.options?.map((opt) => ({
            id: opt.id,
            option_id: opt.option_id || "",
            value: opt.value,
          })) || [],
        price: {
          calculated: variant.calculated_price?.calculated_amount || 0,
          original: variant.calculated_price?.original_amount || 0,
        },
        created_at: variant.created_at || undefined,
        updated_at: variant.updated_at || undefined,
      };
    }) || [];

  return {
    id: medusaProduct.id,
    title: medusaProduct.title,
    subtitle: medusaProduct.subtitle || "",
    description: medusaProduct.description || "",
    handle: medusaProduct.handle,
    discountPercentage:
      originalPrice > lowestCalculatedPrice
        ? Math.round(((originalPrice - lowestCalculatedPrice) / originalPrice) * 100)
        : undefined,
    org_price: originalPrice,
    price: lowestCalculatedPrice,
    rating: undefined,
    totalRating: undefined,
    brand: (medusaProduct.metadata?.brand as string) || undefined,
    label: (medusaProduct.metadata?.label as string) || undefined,
    type: medusaProduct.type?.value || undefined,
    thumbnail: medusaProduct.thumbnail || "",
    collection_id: medusaProduct.collection_id || "",
    origin_country: medusaProduct.origin_country || undefined,
    created_at: medusaProduct.created_at || undefined,
    updated_at: medusaProduct.updated_at || undefined,
    images:
      medusaProduct.images?.map((img) => ({
        id: img.id,
        url: img.url,
        pos: undefined,
        variant_id: undefined,
      })) || [],
    variants,
    options:
      medusaProduct.options?.map((option) => ({
        id: option.id,
        title: option.title,
        values:
          option.values?.map((val) => ({
            id: val.id,
            value: val.value,
          })) || [],
      })) || [],
    categories:
      medusaProduct.categories?.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        handle: c.handle,
      })) || [],
    tags:
      medusaProduct.tags?.map((tag) => ({
        id: tag.id,
        value: tag.value,
        as_label: (tag.metadata?.as_label as boolean) || undefined,
      })) || [],
    collection: medusaProduct.collection || null,
  };
}
