import { getMenuData } from "@/lib/data"
import { listProducts } from "@/api/products"
import { User } from '@/lib/icon'
import Image from 'next/image'
import Link from 'next/link'
import AuthDialog from '@/app/sections/auth-dialog'
import Navbar from './navbar'
import SearchPopup from './searchPopup'
import ShopingCartSidebar from '../cart/sidebar-cart'
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
                    <div className='flex items-center justify-end gap-8 w-full'>
                        <SearchPopup data={featuredProducts}/>
                        <AuthDialog />
                        <ShopingCartSidebar />
                    </div>
                </div>
            </div>
        </StickyHeader>
    )
}

export default Header