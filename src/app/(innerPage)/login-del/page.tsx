import React from 'react'
import PageHeader from '@/app/sections/pageHeader'
import LoginForm from './auth-dialog'
import Newsletter from '@/app/sections/newsletter'
import InstagramGallery from '@/app/sections/instagramGallery'
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