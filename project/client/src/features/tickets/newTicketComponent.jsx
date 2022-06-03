import React, { useEffect } from 'react';
import common from '../../common/commonImports.js';
import { useForm } from 'react-hook-form';
import { typeOptions, priorityOptions } from './optionArrays.js';
import { newTicket } from './ticketSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getSelectedProject } from '../projects/projectSlice.js';

const NewTicketComponent = (props) => {
	const dispatch = useDispatch();
	const selectedProject = useSelector(getSelectedProject);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	let assignedEmployees = [];
	let ticketPriority = 0;
	const onChange = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				assignedEmployees = [];
				break;
			case 'select-option':
				assignedEmployees = [];
				assignedEmployees.push(newValue._id);
				break;
			default:
				break;
		}
	};
	const onInputChangePriority = (newValue, actionMeta) => {};
	const onChangePriority = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				ticketPriority = 0;
				break;
			case 'select-option':
				console.log(newValue);
				ticketPriority = newValue.id;
				break;
			default:
				break;
		}
	};
	let ticketType = '';
	const onInputChangeType = (newValue, actionMeta) => {};
	const onChangeType = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				ticketType = '';
				break;
			case 'select-option':
				console.log(newValue.label);
				ticketType = newValue.label;
				break;
			default:
				break;
		}
	};
	const onInputChange = (newValue, actionMeta) => {};
	const submitMe = (data) => {
		console.log(assignedEmployees);
		const ticket = {
			project_id: props.project_id,
			ticket_name: data.ticket_name,
			ticket_description: data.ticket_description,
			ticket_status: data.ticket_status,
			ticket_type: ticketType,
			ticket_steps: data.ticket_steps,
			ticket_priority: ticketPriority,
			assigned_employees: assignedEmployees,
			ticket_creator: '',
		};
		dispatch(newTicket(ticket));
		props.close();
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*Actual return section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
					className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='New Ticket Name'
					name='ticket_name'
					{...register('ticket_name')}
				/>
				<input
					className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Description of ticket'
					name='ticket_description'
					{...register('ticket_description')}
				/>
				<input
					className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Status of ticket'
					name='ticket_status'
					{...register('ticket_status')}
				/>
				<div className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'>
					<Select
						isSearchable
						isClearable
						defaultValue='Select Type'
						options={typeOptions}
						getOptionLabel={(option) => option.label}
						name='type-select'
						onInputChange={onInputChangeType}
						onChange={onChangeType}
						getOptionValue={(option) => option.label}
					/>
				</div>
				<input
					className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Steps of ticket'
					name='ticket_steps'
					{...register('ticket_steps')}
				/>
				<div className='col-span-4 h-8 w-3/4 m-2 pl-2 mx-auto'>
					<Select
						isSearchable
						isClearable
						defaultValue='Select Priority'
						options={priorityOptions}
						getOptionLabel={(option) => option.option}
						name='priority-select'
						onInputChange={onInputChangePriority}
						onChange={onChangePriority}
						getOptionValue={(option) => option.id}
					/>
				</div>

				<span className='col-span-1'></span>
				<div className='col-span-6'>
					<Select
						isSearchable
						isClearable
						defaultValue='Select Employees'
						options={selectedProject.employees}
						getOptionLabel={(option) =>
							`${option.first_name} ${option.last_name}`
						}
						name='employee-select'
						onInputChange={onInputChange}
						onChange={onChange}
						getOptionValue={(option) => option._id}
					/>
				</div>
				<span className='col-span-1'></span>

				<common.ActionButton
					extraClass='col-span-8 mx-auto h-8'
					text='Submit Ticket'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	);
};

export default NewTicketComponent;
