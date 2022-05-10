import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3500/';
const API_URL = 'http://localhost:3500/user';
const user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user
	? { isLoggedIn: true, user, status: 'none', error: null }
	: { isLoggedIn: false, user: null, status: 'none', error: null };

export const loginUser = createAsyncThunk('user/login', async (user) => {
	try {
		const response = await axios.post('user/login', user);
		return response.data;
	} catch (err) {
		console.log('An error of ' + err.message + ' has occured');
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.push(action.payload);
		},
		logout(state, action) {
			const todo = state.find((todo) => todo.id === action.payload);
			todo.completed = !todo.completed;
		},
		register(state, action) {
			return {
				...state,
				status: 'loading',
			};
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'success';
				console.log(action.payload);
				state.isLoggedIn = true;
				sessionStorage.setItem('user', action.payload);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getLoginStatus = (state) => state.auth.status;
export const getIsLogged = (state) => state.auth.isLoggedIn;
export const getLoginError = (state) => state.auth.error;
export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
