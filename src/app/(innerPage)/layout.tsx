import React, { ReactNode } from 'react'
import Footer from '@/app/sections/footer'
import Header from '@/app/sections/header/header'
import MobileNavbar from "@/app/sections/header/mobileNavbar";

const InnerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <MobileNavbar />
        </>
    )
}

export default InnerLayout