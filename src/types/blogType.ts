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