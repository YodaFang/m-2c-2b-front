'use client'

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "@/components/custom-ui/toast";
import { Cart, retrieveCart, createCart, addItemToCart } from "@/data/cart";

const loadCart = async () => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            console.warn("localStorage is not available");
            return null;
        }
        const cart_id = localStorage.getItem("medusa::cart_id");
        if (!cart_id) {
            return null;
        }
        return await retrieveCart(cart_id);
    } catch (err) {
        console.error("Could not load cart", err);
        return null;
    }
};

const initialState = {
    cart: await loadCart(),
};

const AddToCartSlice = createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCart: async (state, action: PayloadAction<{ variantId: string, quantity: number }>) => {
            let cart = state.cart;
            const data = action.payload;
            if (cart) {
                const itemInCart = cart.items.find((item) => item.variant_id === data.variantId);
                if (itemInCart) {
                    itemInCart.quantity += action.payload.quantity;
                } else {
                    addItemToCart({ cartId: cart.id, variantId: data.variantId, quantity: data.quantity })
                }
            } else {
                state.cart = await createCart([{ variant_id: data.variantId, quantity: data.quantity }]);
            }
            toast.success('Add To Cart Successfully');
        },
    },
});

export const { addToCart } = AddToCartSlice.actions;

export default AddToCartSlice.reducer;