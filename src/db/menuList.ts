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

export const menuList: menuType[] = [
    {
        "id": 1,
        "label": "Home",
        "path": "#",
        "dropdownList": [
            {
                "id": 1,
                "label": "Home-1",
                "path": `https://furnisy.vercel.app/`,
            },
            {
                "id": 2,
                "label": "Home-2",
                "path": `https://furnisy-home-2.vercel.app/`,
            },
            {
                "id": 3,
                "label": "Home-3",
                "path": `https://furnisy-home-3.vercel.app/`,
            },
        ]
    },
    {
        "id": 2,
        "label": "Shop",
        "path": "#",
        "dropdownList": [
            {
                "id": 1,
                "label": "Shop-1",
                "path": "/shop",
            },
            {
                "id": 2,
                "label": "Shop-2",
                "path": "/shop-2",
            },
            {
                "id": 3,
                "label": "Shop-3",
                "path": "/shop-3",
            },
        ]
    },
    {
        "id": 4,
        "label": "Blog",
        "path": "#",
        "dropdownList": [
            {
                "id": 1,
                "label": "blog-1",
                "path": "/blog",
            },
            {
                "id": 2,
                "label": "blog-2",
                "path": "/blog-2",
            },
            {
                "id": 3,
                "label": "blog-3",
                "path": "/blog-3",
            },
            {
                "id": 4,
                "label": "blog-single",
                "path": "/blog-single",
            },

        ]
    },
    {
        "id": 5,
        "label": "Pages",
        "path": "#",
        "megaMenu": [
            {
                "id": 1,
                "menus": [
                    {
                        "id": 0,
                        "title": "product layout",
                        "items": [
                            {
                                "id": 4,
                                "label": "product details 1",
                                "path": "/product-details",
                            },
                            {
                                "id": 6,
                                "label": "product details 3",
                                "path": "/product-details-3",
                            },
                            {
                                "id": 7,
                                "label": "product details 4",
                                "path": "/product-details-4",
                            },
                        ]
                    },

                ]
            },
            {
                "id": 2,
                "menus": [
                    {
                        "id": 0,
                        "title": "pages",
                        "items": [
                            {
                                "id": 1,
                                "label": "about-us",
                                "path": "/about-us",
                            },
                            {
                                "id": 2,
                                "label": "contact-us",
                                "path": "/contact-us",
                            },
                            {
                                "id": 3,
                                "label": "view Cart",
                                "path": "/cart",
                            },
                            {
                                "id": 4,
                                "label": "checkout",
                                "path": "/checkout",
                            },
                            {
                                "id": 5,
                                "label": "Wishlist",
                                "path": "/wishlist",
                            },
                            {
                                "id": 6,
                                "label": "Compare",
                                "path": "/compare",
                            },

                        ]
                    }

                ]
            },
            {
                "id": 3,
                "menus": [
                    {
                        "id": 0,
                        "title": "use full link",
                        "items": [
                            {
                                "id": 88,
                                "label": "register",
                                "path": "/register",
                            },
                            {
                                "id": 99,
                                "label": "login",
                                "path": "/login",
                            },
                            {
                                "id": 114,
                                "label": "location",
                                "path": "/location",
                            },
                            {
                                "id": 7,
                                "label": "faq",
                                "path": "/faq",
                            },
                            {
                                "id": 10,
                                "label": "404-1",
                                "path": "/404-1",
                            },
                            {
                                "id": 11,
                                "label": "404-2",
                                "path": "/404-2",
                            },
                        ]
                    }
                ]
            },

        ]
    }

]
