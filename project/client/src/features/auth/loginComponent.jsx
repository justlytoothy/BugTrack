import React, { useState } from 'react';
import common from '../../common/commonImports.js';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, loginUser } from './authSlice.js';
import Modal from 'react-modal';
import NewUserComponent from './newUserComponent.jsx';
const LoginComponent = () => {
	Modal.setAppElement('#root');
	const dispatch = useDispatch();
	const loginStatus = useSelector(getLoginStatus);
	const [modalIsOpen, setIsOpen] = useState(false);
	const openForm = () => {
		setIsOpen(true);
	};
	const closeForm = () => {
		setIsOpen(false);
	};
	let isLoading;
	if (loginStatus === 'loading') {
		isLoading = true;
	} else {
		isLoading = false;
	}
	let errorStatus;
	if (loginStatus === 'failed') {
		errorStatus = true;
	} else {
		errorStatus = false;
	}

	const [formInput, setFormInput] = useState({
		username: '',
		password: '',
	});

	function inputChanged(e) {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value,
		});
	}

	function submit(e) {
		e.preventDefault();
		let data = formInput;
		dispatch(loginUser(data));
	}
	const errorMsg = () => {
		if (errorStatus) {
			return (
				<h3 className='text-white text-sm'>
					Username and/or password incorrect
				</h3>
			);
		}
	};

	return (
		<div className='overflow-hidden overflow-x-hidden overscroll-contain h-full min-w-[101vw] bg-[url("./images/imageBG.jpeg")] bg-cover bg-[rgba(0, 0, 0, 0.288)] bg-blend-multiply absolute'>
			<div className='h-full'>
				<form className='border-gray-500 rounded-md flex flex-wrap justify-center text-center bg-prime-color text-black mx-auto my-[25vh] h-[40%] w-1/4'>
					<h1 className='text-white text-3xl m-1 mt-12 mb-[-2rem] w-full'>
						Login:
					</h1>
					<input
						className='mx-4 h-12 w-[70%] border-none rounded-md mb-[-1rem] pl-[5px] focus:outline-2 focus:outline-white-filled'
						name='username'
						placeholder='Username'
						onChange={inputChanged}
						value={formInput.username}></input>
					<input
						className='mx-4 h-12 w-[70%] border-none rounded-md mt-[-1rem] pl-[5px] focus:outline-2 focus:outline-white-filled'
						name='password'
						type='password'
						placeholder='Password'
						onChange={inputChanged}
						value={formInput.password}></input>
					<h4 className='text-white basis-full mt-[-2.75rem]'>
						Don't have an account? Register{' '}
						<span
							className='font-semibold underline hover:font-extrabold hover:text-carolina-blue cursor-pointer'
							onClick={openForm}>
							here
						</span>
					</h4>
					<common.ActionButton
						extraClass='h-10 basis-1/3 mt-[-4rem]'
						loading={isLoading}
						click={submit}
						text='Login'
						type='submit'></common.ActionButton>
					{errorMsg()}
				</form>
			</div>
			<Modal
				className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
				overlayClassName=''
				isOpen={modalIsOpen}
				onRequestClose={closeForm}
				contentLabel='New User Form'>
				<NewUserComponent close={closeForm}></NewUserComponent>
			</Modal>
		</div>
	);
};
export default LoginComponent;
