import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import MobileMenu from "./mobileMenu";
import MegaMenu from "./megaMenu";
import { menuType } from "@/db/menuList";
import { ProductType } from "@/types/productType";

const Navbar = ({ data, featuredProducts }: { data: menuType[], featuredProducts: ProductType[] }) => {
    return (
        <>
            <MobileMenu data={data} featuredProducts={featuredProducts} />
            <nav className="lg:block hidden">
                <ul className="flex gap-10">
                    {data.map((item) => {
                        return (
                            <li key={item.id} className=" group">
                                <Link
                                    href={item.path}
                                    className="text-gray-1-foreground flex items-center gap-1 capitalize group-hover:text-secondary-foreground transition-all duration-500"
                                >
                                    {item.label}
                                    {(item.dropdownList || item.megaMenu) && (
                                        <span>
                                            <ChevronDown size={16} />
                                        </span>
                                    )}
                                </Link>
                                {item.dropdownList && (
                                    <ul
                                        className={`absolute z-50 bg-home-bg-1 min-w-44 px-6 py-7.5 shadow-3xl grid ${item.dropdownList.length > 5 ? "grid-cols-2" : ""
                                            } gap-x-10 gap-y-2 overflow-hidden opacity-0 invisible max-h-0 rounded-b-lg group-hover:max-h-[300px] group-hover:opacity-100 group-hover:visible transition-all duration-500`}
                                    >
                                        {item.dropdownList?.map((dropItem) => {
                                            return (
                                                <li key={dropItem.id}>
                                                    <Link
                                                        href={dropItem.path}
                                                        className="inline-block text-gray-1-foreground capitalize hover:text-secondary-foreground transition-all duration-500"
                                                    >
                                                        {dropItem.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                {item.megaMenu && <MegaMenu data={item.megaMenu} featuredProducts={featuredProducts} />}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
