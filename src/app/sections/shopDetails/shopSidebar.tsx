import { Button } from "@/components/custom-ui/button";
import { Close } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PriceRangeSlider from "./priceRangeSlider";

export const categoriesDataSidebar = [
  {
    id: 1,
    categoryName: "Furniture (2200)",
    categoryImg: "",
    value: "furniture",
  },
  {
    id: 2,
    categoryName: "Living Room (720)",
    categoryImg: "",
    value: "Living Room",
  },
  {
    id: 3,
    categoryName: "Decoration (210)",
    categoryImg: "",
    value: "Decoration",
  },
  {
    id: 4,
    categoryName: "Office (210)",
    categoryImg: "",
    value: "Office",
  },
  {
    id: 5,
    categoryName: "Accessories (580)",
    categoryImg: "",
    value: "Accessories",
  },
];
const colors = [
  "#1A1A19",
  "#D9D9D9",
  "#96532A",
  "#0000001A",
  "#FFA34E",
  "#FBDBAC",
  "#EADDC9",
];

const bestProducts = [
  {
    id: 1,
    thumbnail: "/images/sidebar/img-1.webp",
    title: "Modular sofa with wood",
    price: 100,
  },
  {
    id: 2,
    thumbnail: "/images/sidebar/img-2.webp",
    title: "Modern Accent Chair",
    price: 299,
  },
  {
    id: 3,
    thumbnail: "/images/sidebar/img-3.webp",
    title: "Wooden Black Chair",
    price: 280,
  },
];

const tags = [
  "furniture",
  "Bed Room",
  "Living Room",
  "Office",
  "Decoration",
  "Lighting",
  "Accessories",
];

const ShopSidebar = ({
  isSidebarCategoryHide,
}: {
  isSidebarCategoryHide?: boolean;
}) => {
  const [isSidebarActive, setIsSidebatActive] = useState(false);
  return (
    <aside className="relative">
      <Button
        size={"sm"}
        className="lg:hidden inline-flex"
        onClick={() => setIsSidebatActive(true)}
      >
        Filter
      </Button>
      <div
        className={`bg-background max-w-[340px] pr-5 py-7.5 absolute top-0 z-40 lg:static lg:max-w-full lg:pr-0 lg:py-0 transition-all duration-500 ${
          isSidebarActive ? "left-0" : "-left-[150%] lg:left-0"
        }`}
      >
        <div
          className="text-gray-1-foreground absolute right-5 lg:hidden"
          onClick={() => setIsSidebatActive(false)}
        >
          <Close className="size-5" />
        </div>
        {isSidebarCategoryHide || (
          <div className="pb-10 border-b border-b-[#999796]">
            <strong className="font-medium text-xl text-secondary-foreground uppercase">
              Categories
            </strong>
            <ul className="mt-5 flex flex-col gap-2.5">
              {categoriesDataSidebar.map(({ categoryName, id, value }) => (
                <li key={id}>
                  <Link
                    href={`/category?name=${value}`}
                    className="text-gray-1-foreground text-base leading-[162%] hover:text-secondary-foreground transition-all duration-500"
                  >
                    {categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-10 pb-10 border-b border-b-[#999796]">
          <strong className="font-medium text-xl text-secondary-foreground uppercase">
            Filter by Price
          </strong>
          <PriceRangeSlider />
        </div>
        <div className="mt-10 pb-10 border-b border-b-[#999796]">
          <strong className="font-medium text-xl text-secondary-foreground uppercase">
            Filter by Color
          </strong>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {colors.map((color, index) => (
              <li
                key={index}
                className={`rounded-full w-7.5 h-7.5 cursor-pointer`}
                style={{ backgroundColor: color }}
              >
                {" "}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 pb-10">
          <strong className="font-medium text-xl text-secondary-foreground uppercase">
            Best Sellers
          </strong>
          <div className="mt-5 flex flex-col gap-5">
            {bestProducts.map(({ id, price, thumbnail, title, handle }) => {
              return (
                <div key={id} className="flex items-center gap-5">
                  <Image
                    width={90}
                    height={70}
                    sizes="100vw"
                    src={thumbnail}
                    alt="img"
                    className="rounded-sm"
                  />
                  <div>
                    <Link
                      href={`/product/${handle}`}
                      className="capitalize text-gray-1-foreground font-medium hover:text-secondary-foreground transition-all duration-500"
                    >
                      {title}
                    </Link>
                    <p className="text-secondary-foreground mt-1 font-medium">
                      ${price.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 pb-10">
          <strong className="font-medium text-xl text-secondary-foreground uppercase">
            Tags
          </strong>
          <div className="mt-5 flex flex-wrap gap-x-[15px] gap-y-2.5">
            {tags.map((tag, index) => {
              return (
                <Link
                  href={"#"}
                  key={index}
                  className="underline decoration-skip-ink-none text-underline-position capitalize text-gray-1-foreground text-base hover:text-secondary-foreground transition-all duration-500"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;
