import React, { useEffect } from 'react';
import common from '../../common/commonImports.js';
import { useForm } from 'react-hook-form';
import { newUser } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { listAllUsers, getAllUsers } from '../auth/authSlice.js';
import Select from 'react-select';

const NewUserComponent = (props) => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitMe = (data) => {
		data.role = 'developer';
		dispatch(newUser(data));
		props.close();
	};

	return (
		<div className='min-h-fit min-w-fit'>
			<form className='text-black h-full w-full grid grid-cols-8 items-center place-content-center space-y-8 pb-4'>
				<h1 className='col-span-8 text-3xl text-midnight-blue pt-4 text-center'>
					New User
				</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-rich-black text-2xl fixed -top-4 right-4'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<input
					className='h-10 col-span-8 md:col-span-4 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='First Name'
					name='first_name'
					{...register('first_name')}
				/>
				<input
					className='h-10 pl-2 m-2 col-span-8 md:col-span-4 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='Last Name'
					name='last_name'
					{...register('last_name')}
				/>
				<input
					className='col-span-8 h-10 m-2 mx-16 pl-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='Enter Username'
					name='username'
					{...register('username')}
				/>

				<input
					className='col-span-8 h-10 mt-[-0.5rem] mx-16 m-2 pl-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='password'
					placeholder='Enter Password'
					name='password'
					{...register('password')}
				/>
				<common.ActionButton
					extraClass='col-span-8 mx-auto h-10 mt-[-1rem]'
					text='Register'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	);
};

export default NewUserComponent;
