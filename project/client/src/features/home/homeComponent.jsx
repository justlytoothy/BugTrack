import React from 'react';
import { logoutUser, listAllUsers } from '../auth/authSlice.js';
import { useDispatch } from 'react-redux';
import common from '../../common/commonImports.js';

const HomeComponent = (props) => {
	const dispatch = useDispatch();

	function logout() {
		dispatch(logoutUser());
	}
	function listAll() {
		dispatch(listAllUsers());
	}

	return (
		<div className='bg-gray-200 w-full flex flex-col flex-wrap'>
			<h1 className='w-full h-[7%] text-center text-3xl border-8 border-black font-semibold'>
				Dashboard
			</h1>
			<div className='bg-blue-600 w-full h-[93%] grid grid-cols-8 border-8 border-black'>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
				<div className='col-span-8 flex justify-center border bg-black text-white text-3xl'>
					Jello
				</div>
			</div>
		</div>
	);
};

export default HomeComponent;
