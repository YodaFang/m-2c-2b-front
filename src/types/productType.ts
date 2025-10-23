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
