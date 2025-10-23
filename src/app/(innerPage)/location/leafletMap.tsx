'use client'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L, { LatLngExpression } from "leaflet";
import { LatLngTuple } from 'leaflet';
import { addressList } from './addressTab';

// type AddressType = {
//     id: string,
//     lat_lng: [number, number]
// }

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

// const createMarker = (coords: number[]): L.Marker | null => {
//     if (coords.length !== 2) {
//         console.error("Invalid coordinates:", coords);
//         return null;
//     }
//     try {
//         const latLng = new L.LatLng(coords[0], coords[1]);
//         return L.marker(latLng);
//     } catch (error) {
//         console.error("Error creating LatLng:", error);
//         return null;
//     }
// };


const MultipleMarkers = () => {
    return (
        <>
            {addressList.map(({ id, lat_lng }) => (
                <Marker key={id} position={lat_lng} icon={icon}>
                    <Popup>
                        <span>Marker ID: {id}</span>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};


function SetViewOnClick({ mapDirection }: { mapDirection: any }) {
    const map = useMap();
    map.setView(mapDirection, 10);

    return null;
}

const LeafletMap = ({ mapDirection }: { mapDirection: any }) => {
    return (
        <div className='relative -z-10'>
            <MapContainer center={mapDirection} zoom={3} scrollWheelZoom={true} style={{ height: "790px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">furniture</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick mapDirection={mapDirection} />
                <MultipleMarkers />
            </MapContainer>
        </div>

    )
}

export default LeafletMap