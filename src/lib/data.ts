import 'server-only';
import { sdk } from "@/lib/medusaClient"
import { HttpTypes } from "@medusajs/types"

import { get } from '@/lib/apiClient';

const LONG_CACHE_TIME = 3600;

/**
 * 获取首页 Hero 内容，缓存 1 小时。
 */
// 假设 HeroDataType 是你的数据类型
export const getHeroData = () =>
    get<HeroDataType[]>('api/hero-content', LONG_CACHE_TIME);

/**
 * 获取广告数据，缓存 1 小时。
 */
export const getAdsData = () =>
    get<AdsDataType[]>('api/ads', LONG_CACHE_TIME);

/**
 * 获取菜单数据，缓存 1 小时。
 */
export const getMenuData = () =>
    get<menuType[]>('api/menu', LONG_CACHE_TIME);

/**
 * 获取分类数据，缓存 1 小时。
 */
export const getCategoriesData = () =>
    get<CategoryType[]>('api/categories');

/**
 * 获取博客数据，缓存 30 分钟 (1800秒)。
 */
export const getBlogData = () =>
    get<BlogType[]>('api/blogs');

/**
 * 获取 FAQ 数据，缓存 1 周，假定 FAQ 极少变动。
 */
export const getFaqData = () =>
    get<FaqDataType[]>('api/faq', LONG_CACHE_TIME);

/**
 * 获取画廊数据。
 */
export const getGalleryData = () =>
    get<GalleryType[]>('api/gallery', LONG_CACHE_TIME);

/**
 * 获取合作伙伴数据。
 */
export const getPartnerData = () =>
    get<partnerType[]>('api/partners', LONG_CACHE_TIME);

/**
 * 获取隐私政策数据，缓存 1 周。
 */
export const getPrivacyPolicyData = () =>
    get<PrivacyPolicType[]>('api/privacy-policy', LONG_CACHE_TIME);

/**
 * 获取条款与条件数据，缓存 1 周。
 */
export const getTermsAndConditionsData = () =>
    get<TermsAndConditionsType[]>('api/terms-and-conditions', LONG_CACHE_TIME);

/**
 * 获取客户评价数据。
 */
export const getTestimonialsData = () =>
    get<testimonialType[]>('api/testimonials', LONG_CACHE_TIME);


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

// 使用示例
async function fetchProducts() {
    const { products } = await sdk.store.product.list({
        limit: 20,
        offset: 0,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*images,*tags,*options.values,*collection,*type",
    })

    const transformedProducts: Product[] = products.map(transformMedusaProduct)
    return transformedProducts
}






export interface Cart {
    id: number | string,
    customer_id?: string
    email?: string
    currency_code?: string
    shipping_address?: Address
    billing_address?: Address
    items: CartItem[]
    shipping_methods: ShippingMethod[]
    payment_collection?: PaymentCollection
    metadata?: Record<string, any>
    created_at?: string
    updated_at?: string

    // totals
    item_total: number
    subtotal: number
    total: number
    tax_total: number
    discount_total?: number
    shipping_total?: number
    gift_card_total?: number
    promotions?: Promotion[]
}

export interface PaymentProvider {
    id: string
    is_enabled: boolean
}

export interface Address {
    id?: string
    first_name?: string
    last_name?: string
    phone?: string
    company?: string
    address_1: string
    address_2?: string
    city: string
    province?: string
    postal_code: string
}

export interface CartItem {
    id: string
    quantity: number
    product_id: string
    product_title: string
    product_handle: string
    thumbnail: string
    variant_id?: string
    variant_title?: string
    variant_sku?: string

    unit_price: number
    total: number
    subtotal: number
    tax_total: number
    discount_total?: number

    requires_shipping: boolean
    is_discountable?: boolean
    is_tax_inclusive?: boolean

    tax_lines?: TaxLine[]
    adjustments?: Adjustment[]
}

export interface TaxLine {
    id: string
    description?: string
    rate: number
    code?: string
    total: number
    subtotal: number
}

export interface Adjustment {
    id: string
    code: string
    amount: number
    description?: string
    promotion_id?: string
    provider_id?: string
}

/* -------------------- 配送 -------------------- */

export interface ShippingMethod {
    id: string
    name: string
    description?: string
    amount: number
    is_tax_inclusive: boolean
    shipping_option_id?: string

    tax_lines?: TaxLine[]
    adjustments?: Adjustment[]

    total: number
    subtotal: number
    tax_total: number
}

/* -------------------- 支付 -------------------- */

export interface PaymentCollection {
    id: string
    currency_code: string
    amount: number
    authorized_amount: number
    captured_amount: number
    refunded_amount: number
    status: 'pending' | 'authorized' | 'canceled' | 'completed'

    payment_providers?: { id: string }[]
    payments?: Payment[]
    payment_sessions?: PaymentSession[]
}

export interface Payment {
    id: string
    amount: number
    authorized_amount: number
    captured_amount: number
    refunded_amount: number
    currency_code: string
    provider_id: string
}

export interface PaymentSession {
    id: string
    amount: number
    currency_code: string
    provider_id: string
    status: 'pending' | 'authorized' | 'canceled'
}

/* -------------------- 优惠与活动 -------------------- */

export interface Promotion {
    id: string
    code: string
    is_automatic: boolean
    application_method: PromotionMethod
}

export interface PromotionMethod {
    type: 'fixed' | 'percentage'
    value: string
    currency_code?: string
}

export interface WishlistItem {
    id?: number | string,
    productId: string | number;
    product?: Product;
    variantId?: string | number;
    variant?: Variant;
    title: string;
    thumbnail: string;
    created_at?: string
}

export type BlogType = {
    "id": number | string,
    "title": string,
    "thumbnail": string,
    "date": string,
    "category": string,
    "description": string,
    "author"?: {
        "name": string
    }
}


export type AdsDataType = {
    id: number;
    thumbnail: string;
    video_src: string;
}

export type CategoryType = {
    "id": number | string,
    "categoryImg": string,
    "categoryName": string,
    "value"?: string,
}

export interface FaqDataType {
    id: string;
    title: string;
    ans: string
}

export interface GalleryType {
    id: number;
    thumbnail: string;
    title: string
}

export type HeroDataType = {
    id: number | string,
    title: string,
    description: string,
    thumbnail: string,
}

export type MegamenuType = {
    "id": string | number;
    "menus": {
        "id": string | number;
        "title"?: string;
        "items": {
            "id": string | number;
            "label": string;
            "path": string;
            "img"?: string;
        }[]

    }[]
}

export type menuType = {
    "id": string | number;
    "label": string;
    "path": string;
    "dropdownList"?: {
        "id": string | number;
        "label": string;
        "path": string;
    }[];
    "megaMenu"?: MegamenuType[]
}

export interface partnerType {
    id: number;
    logo: string
}

export interface PrivacyPolicType {
    title: string,
    description: string,
    details: {
        label: string,
        content: string
    }[]
}

interface ProductsType {
    topCollections: Product[];
    featuredProducts: Product[]
}

export interface TermsAndConditionsType {
    title: string,
    description: string,
    details: {
        label: string,
        content: string
    }[]
}

export interface testimonialType {
    id: number;
    userName: string;
    userImage: string;
    position: string;
    review: string
}
