import 'server-only';
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
 * 获取产品数据，缓存 10 分钟 (600秒)，假定产品更新可能较频繁。
 */
// 假设 ProductDataType[] 是你的数据类型
export const getProductsData = () =>
    get<ProductsType>('api/products');

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

export type ProductType = {
    "id": number | string,
    "title": string,
    "description": string,
    "price": number,
    "currency": string,
    "discountPercentage": number,
    "rating": number,
    "totalRating": string,
    "stock": number,
    "brand": string,
    "label": string,
    "category": string,
    "thumbnail": string,
    "colors": {
        "code": string,
        "image": string
    }[],
    "filter": string,
    "images": String[],
    "cardSize"?: string,
    "isSlider"?: boolean,
    "adsInfo"?: {
        "id": number | string,
        "discountPercentage": number,
        "banner": string,
    }[],
    "size"?:[""]
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
    id:number;
    thumbnail:string;
    title:string
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
    topCollections: ProductType[];
    featuredProducts: ProductType[]
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
