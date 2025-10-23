import PageHeader from '@/components/sections/pageHeader'

import React from 'react'
import ContactForm from './contactForm'
import ContactLocation from './contactLocation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with us."
}

const ContactUs = () => {
    return (
        <main>
            <PageHeader pageTitle='Contact Us' currentPage='Contact Us' />
            <div className='container lg:pt-25 lg:pb-25 pt-15 pb-15'>
                <ContactForm />
                <ContactLocation />
            </div>
        </main>
    )
}

export default ContactUs