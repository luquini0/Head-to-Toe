import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers: {
        addItems: (state, action) => {
            const { product, quantity } = action.payload
            //console.log("Añadiendo producto al carrito...", product, quantity)
            const productInCart = state.cartItems.find(item => item.id === product.id)
            if (!productInCart) {
                state.cartItems.push({ ...product, quantity })
            } else {
                productInCart.quantity += quantity;
            }
            state.total = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        removeItems: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            state.total = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        clearCart: (state) => {
            state.cartItems = []
            state.total = 0
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) item.quantity++;
            state.total = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity--;
            state.total = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);
            if (item && quantity > 0) item.quantity = quantity;
            state.total = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        }
    }
})

export const { addItems, removeItems, clearCart, incrementQuantity, decrementQuantity, updateQuantity } = cartSlice.actions

export default cartSlice.reducer