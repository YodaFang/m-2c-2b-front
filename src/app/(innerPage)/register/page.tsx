import React from 'react'
import PageHeader from '@/app/sections/pageHeader'
import RegisterForm from './registerForm'
import Newsletter from '@/app/sections/newsletter'
import InstagramGallery from '@/app/sections/instagramGallery'
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