import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = ()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] }; 
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async({userId, guestId},{rejectedWithValue}) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                params: { userId, guestId},
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
    }
});

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async({productId, quantity, size, color, 
    guestId, userId}, {rejectedWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    size,
                    color,
                    guestId,
                    userId,
                }
            );
            return response.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
});

// Update the quantity of an item in the cart

export const updateCartItemQuantity = createAsyncThunk("cart/addToCart", async({productId, quantity, guestId, userId,
    size, color}, {rejectedWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    guestId,
                    userId,
                    size,
                    color
                }
            );
            return response.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
});

// Remove an item from the cart
