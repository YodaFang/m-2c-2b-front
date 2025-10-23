import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface Product {
    id: string | number;
    price: number;
    discountPercentage?: number;
    title: string;
    thumbnail: string;
    date: string;
    color: string;
    size: string;
    stock: number;
}

// Load initial state from local storage
const loadStateFromLocalStorage = (): Product[] => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            console.warn("localStorage is not available");
            return [];
        }
        const serializedState = localStorage.getItem("wishlist");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from local storage", err);
        return [];
    }
};

// Save state to local storage
const saveStateToLocalStorage = (state: Product[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("wishlist", serializedState);
    } catch (err) {
        console.error("Could not save state to local storage", err);
    }
};

const initialState = {
    products: loadStateFromLocalStorage(),
};

const AddToWishlistSlice = createSlice({
    name: "addToWishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const itemInCart = state.products.find((item) => item.id === action?.payload.id);
            if (itemInCart) {
                toast.success('The Product already has');
                return;
            } else {
                toast.success('Add To Wishlist Successfully');
                state.products.push({
                    ...action.payload,
                });
                saveStateToLocalStorage(state.products);
            }
        },
        removeToWishlist: (state, action) => {
            const itemsInCart = state.products.filter((item) => item.id !== action.payload);
            state.products = itemsInCart;
            saveStateToLocalStorage(state.products);
        }
    }
});

export const { addToWishlist, removeToWishlist } = AddToWishlistSlice.actions;

export default AddToWishlistSlice.reducer;