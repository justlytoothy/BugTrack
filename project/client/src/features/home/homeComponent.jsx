import React from 'react';
import { logoutUser, listAllUsers } from '../auth/authSlice.js';
import { useDispatch } from 'react-redux';
import common from '../../common/commonImports.js';

const HomeComponent = () => {
	const dispatch = useDispatch();

	function logout() {
		console.log(sessionStorage.getItem('user'));
		dispatch(logoutUser());
		console.log(sessionStorage.getItem('user'));
	}
	function listAll() {
		dispatch(listAllUsers());
	}

	return (
		<div>
			<p className='text-black'>Welcome Home</p>
			<common.ActionButton
				type='submit'
				click={logout}
				text='Log Out'></common.ActionButton>
			<common.ActionButton
				type='submit'
				click={listAll}
				text='List Users'></common.ActionButton>
		</div>
	);
};

export default HomeComponent;
