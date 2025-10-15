import { createSlice } from '@reduxjs/toolkit'
import allCategories from '../../data/categories.json'
import allProducts from '../../data/products.json'

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        categories: allCategories,
        products: allProducts,
        categorySelected: "",
        productsFilteredByCategory: [],
        productSelected: {}
    },
    reducers: {
        selectCategory: (state, action) => {
            state.categorySelected = action.payload
        },
        filterProducts: (state) => {
            state.productsFilteredByCategory = state.products.filter(product => product.category.toLowerCase() === state.categorySelected.toLowerCase())
        },
        selectProduct: (state, action) => {
            state.productSelected = action.payload
        }
    }
})

export const { selectCategory, filterProducts, selectProduct } = shopSlice.actions

export default shopSlice.reducer


