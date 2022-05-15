import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/auth-header'
let initialState = {}
if (
	sessionStorage.length > 0 &&
	sessionStorage.getItem('user') !== 'undefined'
) {
	const userPre = sessionStorage.getItem('user')
	let user = JSON.parse(userPre)
	initialState = user
		? { isLoggedIn: true, user, status: 'none', error: null }
		: { isLoggedIn: false, user: null, status: 'none', error: null }
} else {
	initialState = {
		isLoggedIn: false,
		user: null,
		status: 'none',
		error: null,
	}
}

export const loginUser = createAsyncThunk('user/login', async (user) => {
	try {
		const response = await axios.post('user/login', user)
		return response.data
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured')
		throw error
	}
})
export const listAllUsers = createAsyncThunk('user/list', async () => {
	try {
		const response = await axios.get('user')
		return response.data
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured')
		throw error
	}
})

export const logoutUser = createAsyncThunk('user/logout', async () => {
	return true
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.push(action.payload)
		},
		register(state, action) {
			return {
				...state,
				status: 'loading',
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'success'
				state.isLoggedIn = true
				state.user = action.payload
				let myString = JSON.stringify(action.payload)
				sessionStorage.setItem('user', myString)
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(logoutUser.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.status = 'success'
				state.isLoggedIn = false
				state.user = null
				sessionStorage.removeItem('user')
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(listAllUsers.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(listAllUsers.fulfilled, (state, action) => {
				state.status = 'success'
			})
			.addCase(listAllUsers.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const getLoginStatus = (state) => state.auth.status
export const getIsLogged = (state) => state.auth.isLoggedIn
export const getLoginError = (state) => state.auth.error
export const { login, register } = authSlice.actions
export default authSlice.reducer
