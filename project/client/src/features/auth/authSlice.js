import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

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
});

const { reducer } = authSlice;
export default reducer;
