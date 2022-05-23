import React from 'react'
import common from '../../common/commonImports.js'
import { useForm } from 'react-hook-form'
import { newTicket } from './ticketSlice.js'
import { useDispatch } from 'react-redux'

const NewTicketComponent = (props) => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const submitMe = (data) => {
		const ticket = {
			project_id: props.project_id,
			ticket_name: data.ticket_name,
			ticket_description: data.ticket_description,
			ticket_status: data.ticket_status,
			ticket_type: data.ticket_type,
			ticket_steps: data.ticket_steps,
			ticket_priority: data.ticket_priority,
			ticket_creator: '',
		}
		dispatch(newTicket(ticket))
		props.close()
	}
	// const handleEmployeesChange = (data) => {

	// }

	return (
		<div className='h-full w-full'>
			<form className='text-black h-full w-full grid grid-cols-8 items-center'>
				<h1 className='col-span-7 text-2xl text-white text-center pt-4 pl-14'>
					New Ticket
				</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-white text-2xl col-span-1 pl-7 pb-5'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='New Ticket Name'
					name='ticket_name'
					{...register('ticket_name')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Description of ticket'
					name='ticket_description'
					{...register('ticket_description')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Status of ticket'
					name='ticket_status'
					{...register('ticket_status')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Type of ticket'
					name='ticket_type'
					{...register('ticket_type')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Steps of ticket'
					name='ticket_steps'
					{...register('ticket_steps')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Priority of ticket'
					name='ticket_priority'
					{...register('ticket_priority')}
				/>
				<common.ActionButton
					extraClass='col-span-8 mx-auto h-8'
					text='Create Project'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	)
}

export default NewTicketComponent
