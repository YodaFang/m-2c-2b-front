'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { menuType } from '@/db/menuList'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Close } from '@/lib/icon'
import { usePathname } from 'next/navigation'
import MegaMenu from './megaMenu'
import { Product } from '@/lib/data'
import HeaderExtraInfo from './headerExtraInfo'


const MobileMenu = ({ data, featuredProducts }: { data: menuType[], featuredProducts: Product[] }) => {
    const pathName = usePathname()
    const [dropDownActive, setDropDownActive] = useState<boolean | string | number>(false)
    const [open, setOpen] = useState(false)

    const handleDropDown = (id: number | string, dropdownList: any, megaMenu:any) => {
        if (dropdownList?.length || megaMenu?.length) {
            setDropDownActive(dropDownActive === id ? false : id)
        }
        else {
            setDropDownActive(false)
        }
    }

    useEffect(() => {
        setOpen(false)
    }, [pathName])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label='toggle-btn' className='text-gray-1-foreground lg:hidden block'>
                <List />
            </SheetTrigger>
            <SheetContent side={"left"} className='overflow-y-auto [&_.close-orginal]:hidden'>
                <SheetTitle className='hidden'></SheetTitle>
                <SheetClose className='absolute right-3 top-2 text-gray-1-foreground shadow-3xl w-8 h-8 rounded-full flex justify-center items-center'>
                    <Close className='w-5 h-5' />
                </SheetClose>
                <ul className='flex flex-col gap-5 mt-4'>
                    {
                        data.map((item) => {
                            return (
                                <li key={item.id} className='relative group' onClick={() => handleDropDown(item.id, item.dropdownList, item.megaMenu)} >
                                    <Link href={item.path} className={cn('text-gray-1-foreground flex items-center gap-1 capitalize group-hover:font-medium group-hover:text-secondary-foreground transition-all duration-500')}>
                                        {item.label}
                                        {(item.dropdownList || item.megaMenu) && <span><ChevronDown size={16} /></span>}
                                    </Link>
                                    {item.dropdownList &&
                                        <ul className={` z-50 left-0 top-full bg-home-bg-1 min-w-44 px-3 py-1 flex flex-col gap-2 transition-all duration-500 ${dropDownActive === item.id ? "block" : "hidden"}`}>
                                            {
                                                item.dropdownList?.map((dropItem) => {
                                                    return (
                                                        <li key={dropItem.id}>
                                                            <Link href={dropItem.path} className={cn('text-gray-1-foreground capitalize hover:text-secondary-foreground transition-all duration-500')}>
                                                                {dropItem.label}
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                    <div className={`${dropDownActive === item.id ? "block" : "hidden"}`}>
                                        {
                                            item.megaMenu && <MegaMenu data={item.megaMenu} featuredProducts={featuredProducts} />
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <HeaderExtraInfo />
            </SheetContent>
        </Sheet>

    )
}

export default MobileMenu

const List = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
            <path d="M1 6H16M1 1H16M1 11H16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="round" />
        </svg>
    )
}