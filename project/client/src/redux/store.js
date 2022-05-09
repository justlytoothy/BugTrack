import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
//import exampleReducer from './exampleReducer

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store;