'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import AddressTab from './addressTab'
const Map = dynamic(() => import("./leafletMap"), { ssr: false })

const MapContainer = () => {
    const [mapDirection, setMapDirection] = useState([40.735501, -73.9953685])
    return (
        <div className='grid lg:grid-cols-[40.846%_auto] grid-cols-1 gap-4'>
            <AddressTab setMapDirection={setMapDirection} />
            <Map mapDirection={mapDirection}/>
        </div>
    )
}

export default MapContainer