import React, { ReactNode } from 'react'
import Footer from '@/app/sections/footer'
import Header from '@/app/sections/header/header'
import MobileNavbar from "@/app/sections/header/mobileNavbar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <MobileNavbar/>
        </>
    )
}

export default HomeLayout