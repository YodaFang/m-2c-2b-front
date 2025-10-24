import React from 'react'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/custom-ui/select"

type CountriesList = {
    flag: string,
    country: string,
    code: string,
    symbol: string,
    language: string,
}

const countriesList: CountriesList[] = [
    {
        flag: "/images/flag/us.png",
        country: "United States",
        code: "USD",
        language: "EN",
        symbol: "$"
    },
    {
        flag: "/images/flag/uk.png",
        country: "united kingdom",
        code: "GBP",
        language: "EN",
        symbol: "£"
    },
    {
        flag: "/images/flag/russia.png",
        country: "Russia",
        code: "RUB",
        language: "RU",
        symbol: "₽"
    },
    {
        flag: "/images/flag/turkey.png",
        country: "Turkey",
        code: "TRY",
        language: "TR",
        symbol: "₺"
    },
]

const HeaderExtraInfo = () => {
    return (
        <div className='flex lg:flex-row flex-col lg:items-center gap-5 mt-5 lg:mt-0'>
            <Select defaultValue={'USD'}>
                <SelectTrigger aria-label='currency' className={`w-28 p-0 h-auto border-none bg-transparent text-gray-1-foreground font-normal capitalize flex`}>
                    <SelectValue>

                    </SelectValue>
                </SelectTrigger>
                <SelectContent className={`border-none bg-background`} >
                    {
                        countriesList.map(({ code, flag, symbol }) => {
                            return (
                                <SelectItem key={code} value={code} className="text-lg focus:bg-home-bg-1 focus:text-inherit pl-2 cursor-pointer capitalize">
                                    <Image src={flag} width={24} height={16} alt='uk flag' className='inline -inset -mt-1 mr-2' />
                                    <span>{code}</span>
                                    <span className='ml-1'>{symbol}</span>
                                </SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger aria-label='lang' className={`w-12 p-0 h-auto border-none bg-transparent text-gray-1-foreground font-normal capitalize [&_span]:mr-1 [&_span]:inline-block flex`}>
                    <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent className={`min-w-max border-none bg-background`} >
                    <SelectItem value="en" className="text-lg focus:bg-home-bg-1 focus:text-inherit cursor-pointer capitalize">EN</SelectItem>
                    <SelectItem value="ru" className="text-lg focus:bg-home-bg-1 focus:text-inherit cursor-pointer capitalize">RU</SelectItem>
                    <SelectItem value="tr" className="text-lg focus:bg-home-bg-1 focus:text-inherit cursor-pointer capitalize">TR</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default HeaderExtraInfo