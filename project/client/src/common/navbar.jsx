import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import common from './commonImports';

const NavBar = (props) => {
	const dispatch = useDispatch();
	function logout() {
		dispatch(logoutUser());
	}
	return (
		<div className='text-white bg-charcoal items-center text-2xl h-12 flex flex-row justify-evenly'>
			<p className='hover:bg-blue-500 cursor-pointer h-full flex justify-center items-center w-full'>
				| I am a navbar |
			</p>
			<p className='hover:bg-blue-500 cursor-pointer h-full justify-center flex items-center w-full'>
				&nbsp;Second Thing |
			</p>
			<common.ActionButton
				extraClass=''
				type='submit'
				click={logout}
				text='Log Out'></common.ActionButton>
		</div>
	);
};

export default NavBar;
