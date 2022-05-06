import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
//import exampleReducer from './exampleReducer

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store;