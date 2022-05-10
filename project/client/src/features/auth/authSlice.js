import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3500/';
const API_URL = 'http://localhost:3500/user';
const userPre = sessionStorage.getItem('user');
const user = JSON.parse(userPre);
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
export const listAllUsers = createAsyncThunk('user/list', async () => {
	try {
		const response = await axios.get('user', {
			headers: { 'x-access-token': user.token },
		});
		return response.data;
	} catch (err) {
		console.log('An error of ' + err.message + ' has occured');
	}
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
	return true;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.push(action.payload);
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
				state.isLoggedIn = true;
				state.user = action.payload;
				let myString = JSON.stringify(action.payload);
				sessionStorage.setItem('user', myString);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logoutUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.status = 'success';
				state.isLoggedIn = false;
				state.user = null;
				sessionStorage.removeItem('user');
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(listAllUsers.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(listAllUsers.fulfilled, (state, action) => {
				state.status = 'success';
				console.log(action.payload);
			})
			.addCase(listAllUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getLoginStatus = (state) => state.auth.status;
export const getIsLogged = (state) => state.auth.isLoggedIn;
export const getLoginError = (state) => state.auth.error;
export const { login, register } = authSlice.actions;
export default authSlice.reducer;
