import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FuHomeFill, FuPhone, Location, MapPin, Search } from "@/lib/icon";
import { LatLngTuple } from "leaflet";

export const addressList = [
    {
        id: 1,
        thumbnail: "/images/locations/img-1.webp",
        showroomName: "Furnisy Furniture New York",
        address: "13th Street 47 W 13th St, New York.",
        lat_lng: [40.735501, -73.9953685] as LatLngTuple,
        phoneNumber: "+1 559-278-4240",
    },
    {
        id: 2,
        thumbnail: "/images/locations/img-2.webp",
        showroomName: "Furnisy Furniture Austin",
        address: "301 W. Second St., Austin.",
        lat_lng: [30.2650624, -97.7500382] as LatLngTuple,
        phoneNumber: "+1 559-278-4240",
    },
    {
        id: 3,
        thumbnail: "/images/locations/img-3.webp",
        showroomName: "Furnisy Furniture Phoenix",
        address: "200 W. Washington St. Phoenix.",
        lat_lng: [33.4489411, -112.0798297] as LatLngTuple,
        phoneNumber: "+1 559-278-4240",
    },
    {
        id: 4,
        thumbnail: "/images/locations/img-4.webp",
        showroomName: "Furnisy Furniture Chicago",
        address: "City Hall 121 N. LaSalle Street Chicago.",
        lat_lng: [41.8838268, -87.6346527] as LatLngTuple,
        phoneNumber: "+1 559-278-4240",
    },
];

const AddressTab = ({
    setMapDirection,
}: {
    setMapDirection: Dispatch<SetStateAction<any>>;
}) => {
    return (
        <div>
            <div className="relative">
                <span className="text-gray-1-foreground absolute left-5 top-1/2 -translate-y-1/2 -rotate-90">
                    <Search />
                </span>
                <Input
                    placeholder="Find your nearest store"
                    className="py-[15px] pl-12 pr-5 border-[#CCC9C5] placeholder:text-[#999794]"
                />
                <span className="text-gray-1-foreground absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Location />
                </span>
            </div>
            <Tabs defaultValue="all" className="mt-5">
                <TabsList className="gap-[14px] flex-wrap justify-start">
                    <TabsTrigger
                        value="all"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        all
                    </TabsTrigger>
                    <TabsTrigger
                        value="new-york"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        New York
                    </TabsTrigger>
                    <TabsTrigger
                        value="austin"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        Austin
                    </TabsTrigger>
                    <TabsTrigger
                        value="phoenix"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        Phoenix
                    </TabsTrigger>
                    <TabsTrigger
                        value="chicago"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        Chicago
                    </TabsTrigger>
                    <TabsTrigger
                        value="texas"
                        className="lg:text-base md:text-sm text-sm text-gray-1-foreground bg-[#F6F6F6] px-4 py-1.5 h-auto data-[state=active]:text-white data-[state=active]:bg-primary"
                    >
                        Texas
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList.map(
                            ({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            )
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="new-york" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList
                            .slice(1, 4)
                            .map(({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="austin" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList
                            .slice(0, 3)
                            .map(({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="phoenix" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList
                            .slice(2, 4)
                            .map(({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="chicago" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList
                            .slice(1, 2)
                            .map(({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="texas" className="mt-5">
                    <div className="flex flex-col gap-5">
                        {addressList
                            .slice(3, 4)
                            .map(({ address, id, phoneNumber, showroomName, thumbnail, lat_lng }) => (
                                <AddressCard
                                    key={id}
                                    address={address}
                                    phoneNumber={phoneNumber}
                                    showroomName={showroomName}
                                    thumbnail={thumbnail}
                                    setMapDirection={setMapDirection}
                                    lat_lng={lat_lng}
                                />
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AddressTab;

interface CardPropsType {
    showroomName: string;
    thumbnail: string;
    address: string;
    phoneNumber: string;
    setMapDirection: any;
    lat_lng: any
}
const AddressCard = ({
    thumbnail,
    address,
    showroomName,
    phoneNumber,
    setMapDirection,
    lat_lng
}: CardPropsType) => {
    return (
        <div className="border-[#CCC9C5] border-[1.5px] px-5 py-4 flex justify-between gap-1">
            <div>
                <p className="font-medium text-secondary-foreground flex items-center gap-1">
                    {" "}
                    <span className="flex justify-start w-4 -ml-0.5">
                        <MapPin />
                    </span>{" "}
                    {showroomName}
                </p>
                <p className="leading-[171%] text-gray-1-foreground text-sm flex items-center gap-1">
                    {" "}
                    <span className="flex justify-start w-4">
                        <FuHomeFill />
                    </span>
                    {address}
                </p>
                <p className="leading-[171%] text-gray-1-foreground text-sm flex items-center gap-1">
                    {" "}
                    <span className="flex justify-start w-4">
                        <FuPhone className="w-[11px]" />
                    </span>{" "}
                    {phoneNumber}
                </p>
                <div
                    onClick={() => setMapDirection(lat_lng)}
                    className="text-secondary-foreground text-sm underline decoration-skip-ink-none text-underline-position cursor-pointer"
                >
                    Showroom Details
                </div>
            </div>
            <Image width={116} height={116} src={thumbnail} alt="img" />
        </div>
    );
};
