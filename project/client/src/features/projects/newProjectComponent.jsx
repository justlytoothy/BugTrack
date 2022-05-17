import React from 'react';
import common from '../../common/commonImports.js';
import { useForm } from 'react-hook-form';
import { newProject } from './projectSlice';
import { useDispatch } from 'react-redux';

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
	const submitMe = (data) => {
		data.createdBy = user._id;
		data.employees = employees;
		dispatch(newProject(data));
		props.close();
		props.refresh();
	};
	// const handleEmployeesChange = (data) => {

	// }

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
				<h2 className='text-white text-xl text-center col-span-8'>
					Implement add employees
				</h2>
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
