import { cache } from "react";
import { adsData } from "@/db/adsData";
import { menuList } from "@/db/menuList";
import { categoriesOneData } from "@/db/categoriesData";
import { blogData } from "@/db/blogData";
import { faqData } from "@/db/faqData";
import { galleryDataOne } from "@/db/galleryData";
import { partnerData } from "@/db/partnerData";
import { privacyPolicyData } from "@/db/privacyPolicyData";
import { termsAndConditionsData } from "@/db/termsAndConditionsData";
import { testimonialData } from "@/db/testimonialsData";
import { heroData } from "@/db/heroData";
import { products } from "@/db/products";

const baseUrl = 'https://furnisy.vercel.app';

export const getHeroData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/hero-content`);
            if (!res.ok) throw new Error('Failed to fetch hero data');
            return res.json();
        }
        return heroData;
    } catch (error) {
        throw new Error('Error in getHeroData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getAdsData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/ads`);
            if (!res.ok) throw new Error('Failed to fetch ads data');
            return res.json();
        }
        return adsData;
    } catch (error) {
        throw new Error('Error in getAdsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getProductsData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/products`);
            if (!res.ok) throw new Error('Failed to fetch featured products');
            return res.json();
        }
        return products;
    } catch (error) {
        throw new Error('Error in getFeaturedData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getMenuData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/menu`);
            if (!res.ok) throw new Error('Failed to fetch menu data');
            return res.json();
        }
        return menuList;
    } catch (error) {
        throw new Error('Error in getMenuData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getCategoriesData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/categories`);
            if (!res.ok) throw new Error('Failed to fetch categories data');
            return res.json();
        }
        return categoriesOneData;
    } catch (error) {
        throw new Error('Error in getCategoriesData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getBlogData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/blogs`);
            if (!res.ok) throw new Error('Failed to fetch blog data');
            return res.json();
        }
        return blogData;
    } catch (error) {
        throw new Error('Error in getBlogData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getFaqData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/faq`);
            if (!res.ok) throw new Error('Failed to fetch FAQ data');
            return res.json();
        }
        return faqData;
    } catch (error) {
        throw new Error('Error in getFaqData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getGalleryData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/gallery`);
            if (!res.ok) throw new Error('Failed to fetch gallery data');
            return res.json();
        }
        return galleryDataOne;
    } catch (error) {
        throw new Error('Error in getGalleryData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getPartnerData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/partners`);
            if (!res.ok) throw new Error('Failed to fetch partner data');
            return res.json();
        }
        return partnerData;
    } catch (error) {
        throw new Error('Error in getPartnerData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getPrivacyPolicyData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/privacy-policy`);
            if (!res.ok) throw new Error('Failed to fetch privacy policy data');
            return res.json();
        }
        return privacyPolicyData;
    } catch (error) {
        throw new Error('Error in getPrivacyPolicyData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getTermsAndConditionsData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/terms-and-conditions`);
            if (!res.ok) throw new Error('Failed to fetch terms and conditions data');
            return res.json();
        }
        return termsAndConditionsData;
    } catch (error) {
        throw new Error('Error in getTermsAndConditionsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});

export const getTestimonialsData = cache(async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const res = await fetch(`${baseUrl}/api/testimonials`);
            if (!res.ok) throw new Error('Failed to fetch testimonials data');
            return res.json();
        }
        return testimonialData;
    } catch (error) {
        throw new Error('Error in getTestimonialsData: ' + (error instanceof Error ? error.message : String(error)));
    }
});