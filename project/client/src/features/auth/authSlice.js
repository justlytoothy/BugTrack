import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../services/auth-header';
let initialState = {};
if (
	sessionStorage.length > 0 &&
	sessionStorage.getItem('user') !== 'undefined'
) {
	const userPre = sessionStorage.getItem('user');
	let user = JSON.parse(userPre);
	if (user.token) {
		initialState = {
			isLoggedIn: true,
			user,
			status: 'none',
			error: null,
			allUsers: [],
			fullName: `${user.first_name} ${user.last_name}`,
		};
	} else {
		initialState = {
			isLoggedIn: false,
			user: null,
			status: 'none',
			error: null,
			allUsers: [],
			fullName: '',
		};
	}
} else {
	initialState = {
		isLoggedIn: false,
		user: null,
		status: 'none',
		error: null,
		allUsers: [],
		fullName: '',
	};
}

export const loginUser = createAsyncThunk('user/login', async (user) => {
	try {
		const response = await myAxios.post('user/login', user);
		return response.data;
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured');
		throw error;
	}
});
export const newUser = createAsyncThunk('user/register', async (user) => {
	try {
		const response = await myAxios.post('user/register', user);
		return response.data;
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured');
		throw error;
	}
});
export const listAllUsers = createAsyncThunk('user/list', async () => {
	try {
		const response = await myAxios.get('user');
		return response.data;
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured');
		throw error;
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
				state.fullName = `${action.payload.first_name} ${action.payload.last_name}`;
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
				let users = action.payload;
				users.forEach((user) => {
					user.password = '';
				});
				state.allUsers = users;
			})
			.addCase(listAllUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(newUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(newUser.fulfilled, (state, action) => {
				state.status = 'success';
			})
			.addCase(newUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getLoginStatus = (state) => state.auth.status;
export const getAllUsers = (state) => state.auth.allUsers;
export const getIsLogged = (state) => state.auth.isLoggedIn;
export const getLoginError = (state) => state.auth.error;
export const getName = (state) => state.auth.fullName;
export const { login } = authSlice.actions;
export default authSlice.reducer;
