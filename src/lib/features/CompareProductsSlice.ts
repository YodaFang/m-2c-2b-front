import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type CompareType = {
    id: string | number,
    price: number,
    discountPercentage: number,
    thumbnail: string,
    title: string,
    stock: number,
    color: string,
    size: string
}

// Function to load products from local storage
const loadFromLocalStorage = (): CompareType[] => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            console.warn("localStorage is not available");
            return [];
        }

        const serializedState = localStorage.getItem("compareProducts");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load from local storage", err);
        return [];
    }
};

// Function to save products to local storage
const saveToLocalStorage = (products: CompareType[]) => {
    try {
        const serializedState = JSON.stringify(products);
        localStorage.setItem("compareProducts", serializedState);
    } catch (err) {
        console.error("Could not save to local storage", err);
    }
};

const initialState = {
    products: loadFromLocalStorage(),
};

const CompareProductsSlice = createSlice({
    name: "productCompare",
    initialState,
    reducers: {
        addToCompare: (state, action: PayloadAction<CompareType>) => {
            const itemInCart = state.products.find((item) => item.id === action?.payload.id);
            if (itemInCart) {
                toast.success('The Product already has');
                return;
            } else {
                toast.success('Product Add Successfully');
                state.products.push({
                    ...action.payload,
                });
                saveToLocalStorage(state.products); // Save to local storage
            }
        },
        removeToCompare: (state, action) => {
            const itemsInCart = state.products.filter((item) => item.id !== action.payload);
            state.products = itemsInCart;
            saveToLocalStorage(state.products); // Save to local storage
        }
    }
});

export const { addToCompare, removeToCompare } = CompareProductsSlice.actions;

export default CompareProductsSlice.reducer;