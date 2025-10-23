import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface Product {
    id: string | number;
    quantity: number;
    price: number;
    title: string;
    thumbnail: string;
    color: string;
    size: string;
}

const loadStateFromLocalStorage = (): Product[] => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            console.warn("localStorage is not available");
            return [];
        }
        const serializedState = localStorage.getItem("cart");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return [];
    }
};

const saveStateToLocalStorage = (state: Product[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("cart", serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const initialState = {
    products: loadStateFromLocalStorage(),
};

const AddToCartSlice = createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            toast.success('Add To Cart Successfully');
            const itemInCart = state.products.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity;
            } else {
                state.products.push({
                    ...action.payload,
                });
            }
            saveStateToLocalStorage(state.products);
        },
        removeToCart: (state, action) => {
            const itemsInCart = state.products.filter(
                (item) => item.id !== action.payload
            );
            state.products = itemsInCart;
            saveStateToLocalStorage(state.products);
        },
        incrementProductQuentity: (state, action: PayloadAction<{ id: number | string }>) => {
            const itemInCart = state.products.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.quantity += 1;
            }
            saveStateToLocalStorage(state.products);
        },
        dicrementProductQuentity: (state, action: PayloadAction<{ id: number | string }>) => {
            const itemInCart = state.products.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                if (itemInCart.quantity < 2) {
                    return;
                }
                itemInCart.quantity -= 1;
            }
            saveStateToLocalStorage(state.products);
        },
    },
});

export const { addToCart, incrementProductQuentity, removeToCart, dicrementProductQuentity } = AddToCartSlice.actions;

export default AddToCartSlice.reducer;