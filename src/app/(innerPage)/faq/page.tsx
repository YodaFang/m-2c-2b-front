import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import FaqSection from '@/components/sections/faqSection'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "FAQ",
    description: "Frequently asked questions."
}

const Faq = () => {
    return (
        <main>
            <PageHeader pageTitle='FAQ' currentPage='Faq' />
            <FaqSection />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Faq