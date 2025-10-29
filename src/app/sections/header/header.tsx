import { getMenuData } from "@/lib/data"
import { listProducts } from "@/data/products"
import { User } from '@/lib/icon'
import Image from 'next/image'
import Link from 'next/link'
import HeaderExtraInfo from './headerExtraInfo'
import Navbar from './navbar'
import SearchPopup from './searchPopup'
import ShopingCartSidebar from './shopingCartSidebar'
import StickyHeader from './stickyHeader'
import TopHeader from './topHeader'

const Header = async () => {
    const menuList = await getMenuData();
    const { products: featuredProducts } = await listProducts({});
    return (
        <StickyHeader topHeaderContent={<TopHeader />}>
            <div className='py-2 bg-secondary [.header-pinned_&]:shadow-md'>
                <div className='container flex justify-between items-center h-full relative'>
                    <div className='w-full'>
                        <Navbar data={menuList} featuredProducts={featuredProducts} />
                    </div>
                    <Link href={"/"} className='shrink-0'>
                        <Image width={60} height={40} src={"/images/logo.png"} alt='logo' />
                    </Link>
                    <div className='flex items-center justify-end gap-5 w-full'>
                        <SearchPopup data={featuredProducts}/>
                        <div className='lg:block hidden'>
                            <HeaderExtraInfo />
                        </div>
                        <Link
                            aria-label='user'
                            href={'/login'}
                            className='text-gray-1-foreground cursor-pointer lg:block hidden'
                        >
                            <User />
                        </Link>
                        <ShopingCartSidebar />
                    </div>
                </div>
            </div>
        </StickyHeader>
    )
}

export default Header