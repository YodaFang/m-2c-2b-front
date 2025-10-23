import React from 'react'
import Newsletter from '@/components/sections/newsletter'
import InstagramGallery from '@/components/sections/instagramGallery'
import MapContainer from './mapContainer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Locations",
    description: "Find our store locations."
}

const page = () => {
    return (
        <main>
            <div className='container lg:py-25 py-15'>
                <p className='font-medium text-secondary-foreground text-2xl mb-5'>All Furniture Showroom Locations</p>
              <MapContainer/>
            </div>
            <Newsletter />
            <InstagramGallery />
        </main>
    )
}

export default page