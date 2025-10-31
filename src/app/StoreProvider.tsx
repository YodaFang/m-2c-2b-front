'use client'

import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import AddToCartSlice from '@/lib/features/AddToCartSlice'
import AddToWishlistSlice from '@/lib/features/AddToWishlistSlice'

const makeStore = () => {
    return configureStore({
        reducer: {
            addToCart: AddToCartSlice,
            addToWishlist: AddToWishlistSlice,
        },
    })
}

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']