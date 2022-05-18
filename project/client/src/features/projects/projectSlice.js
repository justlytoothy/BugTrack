import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/auth-header';

const initialState = {
	status: 'none',
	error: null,
	allProjects: [],
};

export const newProject = createAsyncThunk('project/new', async (data) => {
	try {
		const response = await axios.post('project', data);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const getProject = createAsyncThunk('project/getone', async (data) => {
	try {
		const response = await axios.get('project', data);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const getAllProjects = createAsyncThunk(
	'project/getall',
	async (arg, { getState }) => {
		try {
			const state = getState();
			const user_id = state.auth.user._id;
			const response = await axios.get('project/all', {
				params: user_id,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);
export const deleteProject = createAsyncThunk(
	'project/delete',
	async (data) => {
		try {
			console.log(data);
			const response = await axios.delete('project', {
				data: { id: data },
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

const projectSlice = createSlice({
	name: 'project',
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
			.addCase(newProject.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(newProject.fulfilled, (state, action) => {
				state.status = 'success';
				return action.payload;
			})
			.addCase(newProject.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getProject.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getProject.fulfilled, (state, action) => {
				state.status = 'success';
				return action.payload;
			})
			.addCase(getProject.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getAllProjects.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getAllProjects.fulfilled, (state, action) => {
				state.status = 'success';
				state.allProjects = action.payload;
			})
			.addCase(getAllProjects.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteProject.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				state.status = 'success';
				return action.payload;
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const projectStatus = (state) => state.project.status;
export const allProjects = (state) => state.project.allProjects;
export const { login, register } = projectSlice.actions;
export default projectSlice.reducer;
