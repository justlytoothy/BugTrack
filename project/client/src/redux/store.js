import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import { logoutUser } from '../features/auth/authSlice';
//import exampleReducer from './exampleReducer

const store = configureStore({
	reducer: {
		auth: authReducer,
		project: projectReducer,
	},
});

export const logout = () => {
	store.dispatch(logoutUser);
};

export default store;
