import React from 'react'
import PageHeader from '@/components/sections/pageHeader'
import LoginForm from './loginForm'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to your account."
}

const Login = () => {
    return (
        <main>
            <PageHeader pageTitle='My Account' currentPage='Login' />
            <LoginForm />
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default Login