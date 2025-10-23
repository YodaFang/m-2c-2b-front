import React, { ReactNode } from 'react'
import Footer from '@/components/sections/footer'
import Header from '@/components/sections/header/header'
import MobileNavbar from "@/components/sections/header/mobileNavbar";

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