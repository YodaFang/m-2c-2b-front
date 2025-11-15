import React from 'react'
import PageHeader from '@/app/sections/pageHeader'
import FaqSection from './faqSection'
import Newsletter from '@/app/sections/newsletter'
import InstagramGallery from '@/app/sections/instagramGallery'
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