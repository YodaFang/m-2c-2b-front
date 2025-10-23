import PageHeader from '@/components/sections/pageHeader'
import Image from 'next/image'
import React from 'react'
import AboutDetails from './aboutDetails';
import TestimonialSlider from '@/components/sections/testimonialSlider';
import PartnerSlider from '@/components/sections/partnerSlider';
import Newsletter from '@/components/sections/newsletter';
import InstagramGallery from '@/components/sections/instagramGallery';
import AboutVideo from './aboutVideo';
import { Metadata } from 'next'
import { getPartnerData, getTestimonialsData } from '@/lib/data';

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our company and team."
}

const AboutUs = async () => {
    const partnerData = await getPartnerData();
    const testimonialData = await getTestimonialsData();

    return (
        <main>
            <PageHeader pageTitle='About Us' currentPage='About Us' />
            <div className='container lg:pt-25 pt-15 lg:pb-25 pb-15'>
                <Image width={1420} height={500} style={{ width: "100%" }} src={"/images/about/img-1.webp"} className='min-h-44' alt='img' />
            </div>
            <AboutDetails />
            <AboutVideo />
            <TestimonialSlider testimonials={testimonialData} />
            <PartnerSlider partners={partnerData} />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default AboutUs