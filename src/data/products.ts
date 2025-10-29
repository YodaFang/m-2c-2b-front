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
          "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
      },
      headers,
    ).then(({ products }) => products.length && transformMedusaProduct(products[0]));
  },
  ['cache-medusa-get-products-by-handle'],
  {
    revalidate: 30,
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
  }) => {
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
    revalidate: 600, // 10 分钟
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
  }) => {
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
    revalidate: 600,
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
    revalidate: 600, // 10 分钟
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
  id: number | string,
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
  // 获取第一个 variant 的价格作为产品价格（如果有多个 variant，你可以根据业务逻辑调整）
  const firstVariant = medusaProduct.variants?.[0]
  const calculatedPrice = firstVariant?.calculated_price?.calculated_amount || 0
  const originalPrice = firstVariant?.calculated_price?.original_amount || calculatedPrice

  return {
    id: medusaProduct.id,
    title: medusaProduct.title,
    subtitle: medusaProduct.subtitle || undefined,
    description: medusaProduct.description || "",
    handle: medusaProduct.handle,
    discountPercentage: originalPrice > calculatedPrice
      ? Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100)
      : undefined,
    org_price: originalPrice,
    price: calculatedPrice,
    rating: undefined, // Medusa 默认不提供评分，需自行扩展
    totalRating: undefined,
    brand: medusaProduct.metadata?.brand as string || undefined,
    label: medusaProduct.metadata?.label as string || undefined,
    type: medusaProduct.type?.value || undefined,
    thumbnail: medusaProduct.thumbnail || "",
    collection_id: medusaProduct.collection_id || "",
    origin_country: medusaProduct.origin_country || undefined,
    created_at: medusaProduct.created_at || undefined,
    updated_at: medusaProduct.updated_at || undefined,
    images: medusaProduct.images?.map((img) => ({
      id: img.id,
      url: img.url,
      pos: undefined, // Medusa 默认不提供 pos，需自行扩展
      variant_id: undefined,
    })) || [],
    variants: medusaProduct.variants?.map((variant) => ({
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
      options: variant.options?.map((opt) => ({
        id: opt.id,
        option_id: opt.option_id || '',
        value: opt.value,
      })) || [],
      price: {
        calculated: variant.calculated_price?.calculated_amount || 0,
        original: variant.calculated_price?.original_amount || 0,
      },
      created_at: variant.created_at || undefined,
      updated_at: variant.updated_at || undefined,
    })) || [],
    options: medusaProduct.options?.map((option) => ({
      id: option.id,
      title: option.title,
      values: option.values?.map((val) => ({
        id: val.id,
        value: val.value,
      })) || [],
    })) || [],
    tags: medusaProduct.tags?.map((tag) => ({
      id: tag.id,
      value: tag.value,
      as_label: tag.metadata?.as_label as boolean || undefined,
    })) || [],
    collection: medusaProduct.collection || null,
  }
}
