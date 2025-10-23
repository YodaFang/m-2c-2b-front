export interface testimonialType {
    id: number;
    userName: string;
    userImage: string;
    position: string;
    review: string
}

export const testimonialData: testimonialType[] = [
    {
        "id": 1,
        "userName": "Liam Smith",
        "userImage": "/images/home-1/testimonial/user-1.webp",
        "position": "Co-Founder",
        "review": `"I am thrilled with my new living Furnisy. The quality of  furniture is outstanding,the customization option allowed me  get exactly what I wanted. Customer support team was incredibly helpful. Highly recommend I couldn't be happier with my purchase!"`
    },
    {
        "id": 2,
        "userName": "Jon Deo",
        "userImage": "/images/home-1/testimonial/user-2.webp",
        "position": "CEO, Net2000",
        "review": `"Absolutely love my recent purchase from Furnisy! The craftsmanship is superb – you can tell these pieces are built to last. The delivery was smooth and efficient, and the furniture looks even better in person.  I'm so happy with the way it has transformed my living room."`
    },
    {
        "id": 3,
        "userName": "Smith Rok",
        "userImage": "/images/home-1/testimonial/user-1.webp",
        "position": "Founder, Focus",
        "review": `"Furnisy made furnishing my new apartment a breeze! Their online selection is huge, and the website is so easy to navigate. I found the perfect sofa and dining table at great prices. The whole process, from ordering to delivery, was seamless."`
    },
]