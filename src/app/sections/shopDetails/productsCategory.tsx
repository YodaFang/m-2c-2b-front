import Image from "next/image";
import Link from "next/link";

const categoryList = [
  {
    id: 1,
    title: "All Furniture",
    thumbnail: "/images/category/img-1.webp",
    stock: 2200,
  },
  {
    id: 2,
    title: "Decor",
    thumbnail: "/images/category/img-2.webp",
    stock: 210,
  },
  {
    id: 3,
    title: "Office",
    thumbnail: "/images/category/img-3.webp",
    stock: 270,
  },
  {
    id: 4,
    title: "bed Room",
    thumbnail: "/images/category/img-4.webp",
    stock: 420,
  },
  {
    id: 5,
    title: "Living Room",
    thumbnail: "/images/category/img-5.webp",
    stock: 720,
  },
  {
    id: 6,
    title: "Accessories",
    thumbnail: "/images/category/img-6.webp",
    stock: 580,
  },
];
const ProductsCategory = () => {
  return (
    <div className="overflow-x-auto">
      <div className="flex lg:justify-center gap-10 min-w-[900px] w-full">
        {categoryList.map(({ id, stock, thumbnail, title }) => {
          return (
            <div key={id} className="text-center flex flex-col items-center">
              <Link
                href={"/category"}
                className="block overflow-hidden rounded-full"
              >
                <Image
                  width={140}
                  height={140}
                  src={thumbnail}
                  alt="img"
                  className="lg:max-w-40 lg:max-h-40 max-w-25 max-h-25 rounded-full hover:scale-110 transition-all duration-500"
                ></Image>
              </Link>
              <div className="mt-5">
                <Link
                  href={"/category"}
                  className="text-secondary-foreground lg:text-xl text-lg font-medium lg:leading-[150%] capitalize hover:text-secondary-foreground transition-all duration-500"
                >
                  {title}
                </Link>
                <span className="text-base text-gray-1-foreground block">
                  {stock} Products
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCategory;
