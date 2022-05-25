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
		<div className='h-full w-full'>
			<form className='text-black h-full w-full grid grid-cols-8 items-center'>
				<h1 className='col-span-7 text-3xl text-white text-center pt-4 pl-14'>
					New User
				</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-white text-2xl col-span-1 pl-7 pb-5'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<div className='col-span-8 flex justify-evenly mb-[-1rem]'>
					<span className=''></span>
					<input
						className='h-10 w-1/3 pl-2 m-2 text-lg'
						type='text'
						placeholder='Enter First Name'
						name='first_name'
						{...register('first_name')}
					/>
					<input
						className='h-10 w-1/3 pl-2 m-2 text-lg'
						type='text'
						placeholder='Enter Last Name'
						name='last_name'
						{...register('last_name')}
					/>
					<span className=''></span>
				</div>
				<input
					className='col-span-8 h-10 w-3/4 m-2 pl-2 mx-auto text-lg'
					type='text'
					placeholder='Enter Username'
					name='username'
					{...register('username')}
				/>
				<input
					className='col-span-8 h-10 w-3/4 mt-[-0.5rem] m-2 pl-2 mx-auto text-lg'
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
