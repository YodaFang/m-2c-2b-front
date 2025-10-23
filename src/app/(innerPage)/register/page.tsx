import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import RegisterForm from './registerForm'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Register",
    description: "Create a new account."
}

const Register = () => {
    return (
        <main>
            <PageHeader pageTitle='My Account' currentPage='Create account' />
            <RegisterForm/>
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Register