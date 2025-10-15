import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import { shopApi } from './services/shopApi'
import { authApi } from './services/authApi'
import { profileApi } from './services/profileApi'
import { setupListeners } from "@reduxjs/toolkit/query";


export const headToToe = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
  )
})

setupListeners(headToToe.dispatch)

