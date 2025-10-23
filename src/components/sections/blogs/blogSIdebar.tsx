import { Input } from "@/components/custom-ui/input";
import { Search } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";

const latestPosts = [
  {
    id: 1,
    title: "Modern home furniture",
    thumbnail: "/images/blog-sidebar/img-1.webp",
    date: "24 May 2025",
  },
  {
    id: 2,
    title: "Modern Tolik Chair",
    thumbnail: "/images/blog-sidebar/img-5.webp",
    date: "24 May 2025",
  },
  {
    id: 3,
    title: "Dining Table With Chair",
    thumbnail: "/images/blog-sidebar/img-4.webp",
    date: "24 May 2025",
  },
  {
    id: 4,
    title: "Cherie Chair With Fabric",
    thumbnail: "/images/blog-sidebar/img-3.webp",
    date: "24 May 2025",
  },
  {
    id: 5,
    title: "Large Double Sofa",
    thumbnail: "/images/blog-sidebar/img-2.webp",
    date: "24 May 2025",
  },
];

const tags = [
  "Furniture",
  "Bed room",
  "Living room",
  "Decor",
  "Office",
  "Accessories",
];
const categories = [
  "Furniture",
  "Furniture",
  "Living Room",
  "Decoration",
  "Office",
  "Accessories",
];

const BlogSIdebar = () => {
  return (
    <aside>
      <div className="relative">
        <Input
          placeholder="Search Products"
          className="px-5 py-3 border-[#E5E2E1] placeholder:text-[#807E7D]"
        />
        <p className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-3-foreground">
          <Search />
        </p>
      </div>
      <div className="border-[#E5E2E1] border-[1.5px] p-5 lg:mt-10 mt-8 rounded-sm">
        <b className="lg:text-2xl text-xl font-medium text-gray-1-foreground">
          Categories
        </b>
        <ul className="mt-5 flex flex-col gap-2.5">
          {categories.map((item, index) => (
            <li
              key={index}
              className="text-gray-1-foreground capitalize pl-5 relative after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-1 after:w-2 after:h-2 after:rounded-full hover:text-secondary-foreground transition-all duration-500"
            >
              <Link href={"#"}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:mt-10 mt-8">
        <b className="lg:text-2xl text-xl font-medium text-gray-1-foreground mb-5 inline-block">
          Latest posts
        </b>
        <div className="flex flex-col gap-5">
          {latestPosts.map(({ date, id, thumbnail, title }) => {
            return (
              <div key={id} className="flex items-center gap-2.5">
                <Image
                  width={80}
                  height={80}
                  src={thumbnail}
                  alt="img"
                  className="rounded-[4px]"
                />
                <div>
                  <Link
                    href={"/blog-single"}
                    className="text-gray-1-foreground font-medium leading-[155%] capitalize multiline-hover"
                  >
                    {title}
                  </Link>
                  <small className="text-gray-3-foreground block">{date}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:mt-10 mt-8">
        <b className="lg:text-2xl text-xl font-medium text-gray-1-foreground mb-5 inline-block">
          Tags
        </b>
        <div className="flex gap-x-1.5 gap-y-2.5 flex-wrap">
          {tags.map((tag, index) => (
            <Link
              key={index}
              href={"#"}
              className="px-4 lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] rounded-[4px] inline-block hover:bg-primary hover:text-white transition-all duration-500"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSIdebar;
