import React, { useEffect } from 'react';
import common from '../../common/commonImports.js';
import { useForm } from 'react-hook-form';
import { newProject } from './projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { listAllUsers, getAllUsers } from '../auth/authSlice.js';
import Select from 'react-select';

const NewProjectComponent = (props) => {
	const dispatch = useDispatch();
	const user = JSON.parse(sessionStorage.getItem('user'));
	let employees = [];
	employees.push(user._id);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const allEmployees = useSelector(getAllUsers);

	useEffect(() => {
		dispatch(listAllUsers());
	}, []);

	const submitMe = (data) => {
		data.createdBy = user._id;
		data.employees = assignedEmployees;
		dispatch(newProject(data));
		props.close();
	};
	let assignedEmployees = [];
	const onChange = (newValue, actionMeta) => {
		console.log('on change ', newValue, actionMeta);
		switch (actionMeta.action) {
			case 'clear':
				assignedEmployees = [];
				break;
			case 'select-option':
				assignedEmployees = [];
				assignedEmployees = newValue;
				break;
			default:
				break;
		}
	};
	const onInputChange = (newValue, actionMeta) => {
		console.log('on input change ', newValue, actionMeta);
	};
	// const handleEmployeesChange = (data) => {

	// }

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div className='h-full w-full'>
			<form className='text-black h-full w-full grid grid-cols-8 items-center'>
				<h1 className='col-span-7 text-2xl text-white text-center pt-4 pl-14'>
					New Project
				</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-white text-2xl col-span-1 pl-7 pb-5'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='New Project Name'
					name='projName'
					{...register('projName')}
				/>
				<input
					className='col-span-8 h-8 w-3/4 m-2 pl-2 mx-auto'
					type='text'
					placeholder='Description of project'
					name='projDesc'
					{...register('projDesc')}
				/>
				<span className='col-span-1'></span>
				<div className='col-span-6'>
					<Select
						isSearchable
						isClearable
						isMulti
						defaultValue='Select Employees'
						options={allEmployees}
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
					text='Create Project'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	);
};

export default NewProjectComponent;
