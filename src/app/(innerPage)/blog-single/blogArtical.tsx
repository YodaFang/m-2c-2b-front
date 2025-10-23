import BlogSIdebar from "@/components/sections/blogs/blogSIdebar";
import { Facebook, Instagram, Linkedin, Twitter } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";

const BlogArtical = () => {
  return (
    <div className="container lg:pt-25 pt-15">
      <div className="grid xl:grid-cols-[auto_24%] lg:grid-cols-[60%_auto] grid-cols-1 gap-x-10 gap-y-12">
        <div>
          <Image
            width={1040}
            height={500}
            style={{ width: "100%", height: "auto" }}
            src={"/images/blog/blog-single-1.webp"}
            alt="img"
          />
          <p className="mt-5 text-gray-3-foreground">
            <span>20 Jan 2025 </span>|{" "}
            <Link
              href={"#"}
              className="hover:text-secondary-foreground transition-all duration-500"
            >
              {" "}
              By Smith{" "}
            </Link>
            |{" "}
            <Link
              href={"#"}
              className="hover:text-secondary-foreground transition-all duration-500"
            >
              Furniture{" "}
            </Link>
            | <span>2 Comments</span>
          </p>
          <h5 className="text-gray-1-foreground mt-2.5 leading-[150%]">
            The Ultimate Guide to Choosing a Perfect Furniture for Your Home.
          </h5>
          <p className="text-gray-1-foreground mt-5">
            Get professional advice on furniture care, room layout, home
            organization. Our experts share practical tips to help you make the
            most of your space. Browse through our curated galleries featuring
            stunning homes and beautifully styled rooms. Find ideas and
            inspiration to create your dream space.
          </p>
          <ul className="mt-5 mb-7.5 flex flex-col gap-2.5">
            <li className="text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted">
              <b className="text-gray-1-foreground font-medium">
                Design Trends:
              </b>{" "}
              Stay updated with the newest trends in furniture and interior
              design. From modern minimalism to rustic charm, discover how to
              incorporate these styles into your home.
            </li>
            <li className="text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted">
              <b className="text-gray-1-foreground font-medium">Expert Tips:</b>{" "}
              Get professional advice on furniture care, room layout, and home
              organization. Our experts share practical tips to help you make
              the most of your space.
            </li>
            <li className="text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted">
              <b className="text-gray-1-foreground font-medium">
                Inspiration Galleries:
              </b>{" "}
              Browse through our curated galleries featuring stunning homes and
              beautifully styled rooms. Find ideas and inspiration to create
              your dream space.
            </li>
            <li className="text-gray-1-foreground pl-4 relative after:absolute after:left-0 after:top-3 after:w-1.5 after:h-1.5 after:rounded-full after:bg-muted">
              <b className="text-gray-1-foreground font-medium">
                Company News:
              </b>{" "}
              Stay informed about the latest updates from Luxura Pro. From new
              product launches to special promotions, be the first to know
              what's happening.
            </li>
          </ul>
          <blockquote className="px-5 py-2 border-l-[3px] border-l-muted bg-home-bg-1 font-medium lg:text-xl text-lg text-gray-1-foreground">
            Join our community of design enthusiasts and stay inspired with
            fresh content regularly. Whether you're planning a complete home
            makeover or looking for small updates to refresh your space.
          </blockquote>
          <p className="mt-7.5 text-gray-1-foreground">
            Join our community of design enthusiasts and stay inspired with
            fresh content regularly. Whether you're planning a complete home
            makeover or looking for small updates to refresh your space, the
            Luxura Pro Blog is here to guide and inspire you every step of the
            way.
          </p>
          <div className="mt-7.5 grid sm:grid-cols-2 grid-cols-1 gap-7.5">
            <figure>
              <Image
                width={505}
                height={570}
                style={{ width: "100%", height: "auto" }}
                src={"/images/blog/img-single-2.webp"}
                alt="img"
              />
              <figcaption className="text-gray-1-foreground font-medium sm:mt-5 mt-3">
                The Ultimate Guide to Choosing a Perfect Furniture for Your
                Home.
              </figcaption>
            </figure>
            <figure>
              <Image
                width={505}
                height={570}
                style={{ width: "100%", height: "auto" }}
                src={"/images/blog/img-single-3.webp"}
                alt="img"
              />
              <figcaption className="text-gray-1-foreground font-medium sm:mt-5 mt-3">
                Dorso Swivel Chair. Choosing a Perfect Furniture for Your Home.
              </figcaption>
            </figure>
          </div>
          <p className="mt-7.5 text-gray-1-foreground">
            Join our community of design enthusiasts and stay inspired with
            fresh content regularly. Whether you're planning a complete home
            makeover or looking for small updates to refresh your space, the
            Luxura Pro Blog is here to guide and inspire you every step of the
            way.
          </p>

          <div className="flex lg:flex-row flex-col justify-between gap-y-4 mt-10">
            <div className="flex items-center gap-2.5">
              <strong className="lg:text-2xl text-xl font-medium text-gray-1-foreground">
                Tags:
              </strong>
              <div className="flex flex-wrap gap-1.5">
                <Link
                  href={"#"}
                  className="px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Furniture
                </Link>
                <Link
                  href={"#"}
                  className="px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Bed room
                </Link>
                <Link
                  href={"#"}
                  className="px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Living room
                </Link>
                <Link
                  href={"#"}
                  className="px-4 rounded-[4px] lg:py-1.5 py-1 text-base text-gray-3-foreground border border-[#807E7D] inline-block hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Decor
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <strong className="lg:text-2xl text-xl font-medium text-gray-1-foreground">
                Share:
              </strong>
              <ul className="flex gap-2.5">
                <li>
                  <Link
                    href={"#"}
                    aria-label="facebook"
                    className="w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
                  >
                    <Facebook className="size-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    aria-label="twitter"
                    className="w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
                  >
                    <Twitter className="size-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    aria-label="linkedin"
                    className="w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
                  >
                    <Linkedin className="size-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    aria-label="instagram"
                    className="w-8 h-8 rounded-full flex justify-center items-center border border-[#807E7D] text-gray-1-foreground hover:bg-primary hover:text-white transition-all duration-500 "
                  >
                    <Instagram className="size-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <BlogSIdebar />
      </div>
    </div>
  );
};

export default BlogArtical;
