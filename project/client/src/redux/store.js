import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import projectReducer from '../features/projects/projectSlice'
//import exampleReducer from './exampleReducer

const store = configureStore({
	reducer: {
		auth: authReducer,
		project: projectReducer,
	},
})

export default store
