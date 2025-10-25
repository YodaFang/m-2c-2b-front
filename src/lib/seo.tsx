

export type ProductInfo = {
  name: string;
  description: string;
  image: string[];
  sku: string;
  price: string;
  currency: string;
  url: string;
  brand?: string;
};

export type BreadcrumbItem = {
  position: number;
  name: string;
  item: string;
};

export type OrganizationInfo = {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
};

/**
 * 生成 Organization JSON-LD
 */
export function generateOrganizationJsonLd(data: OrganizationInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    sameAs: data.sameAs || [],
  };
}

/**
 * 生成 BreadcrumbList JSON-LD
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * 生成 Product JSON-LD
 */
export function generateProductJsonLd(product: ProductInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand ?? "Furnisy" },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: product.url,
    },
  };
}

export const toJSONLD = (data: object) => {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c') // 安全转义 < 字符，防止 XSS
    .replace(/>/g, '\\u003e') // 安全转义 > 字符
    .replace(/&/g, '\\u0026'); // 安全转义 & 字符
};

/**
 * 生成 <script type="application/ld+json"> 标签
 * 直接在 React/Next.js 中使用
 */
export function jsonLdScript(data: object) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJSONLD(data) }}
    />
  );
}
