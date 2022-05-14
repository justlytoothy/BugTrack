import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/auth-header'

export const newProject = createAsyncThunk('project/new', async (data) => {
	try {
		const response = await axios.post('project', data)
	} catch (err) {
		console.log(err)
	}
})

export const getProject = createAsyncThunk('project/getone', async (data) => {
	try {
		const response = await axios.get('project', data)
	} catch (err) {
		console.log(err)
	}
})

export const getAllProjects = createAsyncThunk('project/getall', async () => {
	try {
		const response = await axios.get('project/all')
	} catch (err) {
		console.log(err)
	}
})

const initialState = {
	status: 'none',
	error: null,
}

const projectSlice = createSlice({
	name: 'project',
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
			.addCase(newProject.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(newProject.fulfilled, (state, action) => {
				state.status = 'success'
				console.log(action.payload)
				return action.payload
			})
			.addCase(newProject.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getProject.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getProject.fulfilled, (state, action) => {
				state.status = 'success'
				console.log(action.payload)
				return action.payload
			})
			.addCase(getProject.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getAllProjects.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getAllProjects.fulfilled, (state, action) => {
				state.status = 'success'
				console.log(action.payload)
				return action.payload
			})
			.addCase(getAllProjects.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const { login, register } = projectSlice.actions
export default projectSlice.reducer
