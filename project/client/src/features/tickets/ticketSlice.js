import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/auth-header'

const initialState = {
	status: 'none',
	error: null,
	allTickets: [],
	selectedTicket: {},
	refresh: 0,
}

export const newTicket = createAsyncThunk(
	'ticket/new',
	async (data, { getState }) => {
		try {
			const state = getState()
			const user_id = state.auth.user._id
			data.ticket_creator = user_id
			const response = await axios.post('ticket', data)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

export const getTicket = createAsyncThunk('ticket/getone', async (data) => {
	try {
		let { id } = data
		const response = await axios.get('ticket', {
			params: data,
		})
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
})

export const getAllProjectTickets = createAsyncThunk(
	'ticket/project/getall',
	async (data) => {
		try {
			const response = await axios.get('ticket/all/project', {
				params: data,
			})
			return response.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)
export const getAllUserTickets = createAsyncThunk(
	'ticket/user/getall',
	async (arg, { getState }) => {
		try {
			const state = getState()
			const user_id = state.auth.user._id
			const response = await axios.get('ticket/all/user', {
				params: user_id,
			})
			return response.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)
export const deleteTicket = createAsyncThunk('ticket/delete', async (data) => {
	try {
		const response = await axios.delete('ticket', {
			data: { id: data },
		})
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
})

const ticketSlice = createSlice({
	name: 'ticket',
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
			.addCase(newTicket.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(newTicket.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh++
				return action.payload
			})
			.addCase(newTicket.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getTicket.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.status = 'success'
				state.selectedTicket = action.payload
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getAllUserTickets.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getAllUserTickets.fulfilled, (state, action) => {
				state.status = 'success'
				state.allTickets = action.payload
			})
			.addCase(getAllUserTickets.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getAllProjectTickets.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getAllProjectTickets.fulfilled, (state, action) => {
				state.status = 'success'
				state.allTickets = action.payload
			})
			.addCase(getAllProjectTickets.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(deleteTicket.pending, (state, action) => {
				state.status = 'loading'
				state.refresh++
			})
			.addCase(deleteTicket.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh = state.refresh + 1
			})
			.addCase(deleteTicket.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const ticketStatus = (state) => state.ticket.status
export const refreshTicketStatus = (state) => state.ticket.refresh
export const allTickets = (state) => state.ticket.allTickets
export const getSelectedTicket = (state) => state.ticket.selectedTicket
export const { login, register } = ticketSlice.actions
export default ticketSlice.reducer
