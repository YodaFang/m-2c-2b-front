import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card, { CardFooter, CardHeader, CardIcons, CardImg, CardTitle, CardPriceEnhanced, CardLabel, CardDiscount } from "@/components/ui/card";
import Title from "@/components/ui/title";
import Link from "next/link";
import { ProductType } from "@/types/productType";
import { getProductsData } from "@/lib/data";

const FeaturedProducts = async () => {
    const { featuredProducts }: { featuredProducts: ProductType[] } = await getProductsData();
    let filterList: string[] = ["Best Sellers", "New arrivals", "featured"];

    return (
        <section className="bg-home-bg-1 lg:pt-25 lg:pb-25 pt-15 pb-15">
            <div className="container">
                <Title>Featured Products</Title>
                <p className="text-gray-1-foreground mt-3 leading-[166.667%]">
                    Explore the best of Furnisy Featured Collection.
                </p>
                <div className="mt-10">
                    <Tabs
                        defaultValue={filterList[0] || ''}
                        className="relative"
                    >
                        <div className="flex justify-between flex-wrap items-center mb-5">
                            <TabsList className="flex-wrap justify-start lg:gap-7.5 gap-5">
                                {filterList.map((item, index) => (
                                    <TabsTrigger
                                        key={index}
                                        value={item}
                                        className="data-[state=active]:text-secondary-foreground border-b border-b-transparent data-[state=active]:border-b-primary text-gray-1-foreground hover:text-secondary-foreground lg:text-xl transition-all duration-500"
                                    >
                                        {item}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <Link
                                href={"/shop"}
                                className="text-gray-1-foreground lg:text-xl text-lg border-b border-b-primary mt-2.5 md:mt-0 inline-block hover:border-b-primary hover:text-secondary-foreground duration-500"
                            >
                                View All
                            </Link>
                        </div>

                        {filterList.map((filter, index) => {
                            const filteredData = featuredProducts.filter((prd) => prd.filter === filter);
                            return (
                                <TabsContent key={index} value={filter}>
                                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-10">
                                        {filteredData.map((prd) => {
                                            return (
                                                <Card key={prd.id}>
                                                    <CardHeader>
                                                        <CardImg src={prd.thumbnail} height={400} width={340} />
                                                        <CardLabel isLabel={prd.label ? prd.label : false}>{prd.label}</CardLabel>
                                                        <CardDiscount isDiscountTrue={prd.discountPercentage ? prd.discountPercentage : false}>-{prd.discountPercentage}%</CardDiscount>
                                                        <CardIcons product={prd} />
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <CardTitle path="/product-details">{prd.title}</CardTitle>
                                                        <CardPriceEnhanced price={prd.price} discountPercentage={prd.discountPercentage} />
                                                    </CardFooter>
                                                </Card>
                                            );
                                        }
                                        )}
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;