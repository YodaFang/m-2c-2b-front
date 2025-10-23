import { configureStore } from '@reduxjs/toolkit'
import AddToCartSlice from './features/AddToCartSlice'
import AddToWishlistSlice from './features/AddToWishlistSlice'
import CompareProductsSlice from './features/CompareProductsSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            addToCart: AddToCartSlice,
            addToWishlist: AddToWishlistSlice,
            productCompare: CompareProductsSlice
        },
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']