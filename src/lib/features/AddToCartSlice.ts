import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "@/components/custom-ui/toast";
import { Cart, CartItem } from "@/lib/data";

const loadCart = (): CartItem[] => {
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

const initialState = {
    items: loadCart(),
};

const AddToCartSlice = createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ variantId: string | number, quantity: number }>) => {
            const itemInCart = state.items.find((item) => item.variant_id === action.payload.variantId);
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity;
            } else {
                state.items.push({
                    ...action.payload,
                } as any);
            }
            toast.success('Add To Cart Successfully');
        },
        removeToCart: (state, action) => {
            const itemsInCart = state.items.filter(
                (item) => item.variant_id !== action.payload
            );
        },
        incrementProductQuentity: (state, action: PayloadAction<{ id: number | string }>) => {
            const itemInCart = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.quantity += 1;
            }
        },
        dicrementProductQuentity: (state, action: PayloadAction<{ id: number | string }>) => {
            const itemInCart = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                if (itemInCart.quantity < 2) {
                    return;
                }
                itemInCart.quantity -= 1;
            }
        },
    },
});

export const { addToCart, incrementProductQuentity, removeToCart, dicrementProductQuentity } = AddToCartSlice.actions;

export default AddToCartSlice.reducer;