'use client'

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "@/components/custom-ui/toast";
import { WishlistItem, Product } from "@/lib/data";

// Load initial state from local storage
const loadStateFromLocalStorage = (): WishlistItem[] => {
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
const saveStateToLocalStorage = (state: WishlistItem[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("wishlist", serializedState);
    } catch (err) {
        console.error("Could not save state to local storage", err);
    }
};

const initialState = {
    wishlist: loadStateFromLocalStorage(),
};

const AddToWishlistSlice = createSlice({
    name: "addToWishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const product = action?.payload;
            if(!product) return;
            const item = state.wishlist.find((item) => item.productId === product.id);
            if (item) {
                toast.success('The Product already existed in Wishlist');
                return;
            } else {
                state.wishlist.push({
                    id: "id",
                    productId: product.id,
                    product,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    created_at: new Date().toLocaleDateString(),
                });
                saveStateToLocalStorage(state.wishlist);
                toast.success('Add To Wishlist Successfully');
            }
        },
        removeToWishlist: (state, action) => {
            const items = state.wishlist.filter((item) => item.productId !== action.payload);
            state.wishlist = items;
            saveStateToLocalStorage(state.wishlist);
        }
    }
});

export const { addToWishlist, removeToWishlist } = AddToWishlistSlice.actions;

export default AddToWishlistSlice.reducer;