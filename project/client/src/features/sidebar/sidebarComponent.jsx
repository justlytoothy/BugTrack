import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarItems from './sidebarItems';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../auth/authSlice';

const Sidebar = (props, { defaultActive }) => {
	const dispatch = useDispatch();

	function logout() {
		dispatch(logoutUser());
	}
	return (
		<div className='bg-carolina-blue w-64 min-h-full flex flex-col'>
			{SidebarItems.map((item, index) => {
				return (
					<NavLink
						to={item.route}
						key={item.name}
						className={({ isActive }) =>
							isActive
								? 'bg-gray-500 text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
								: 'hover:bg-gray-500 text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
						}>
						{item.name}
					</NavLink>
				);
			})}
			<h1
				onClick={logout}
				className='hover:bg-gray-500 text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'>
				Logout
			</h1>
		</div>
	);
};

export default Sidebar;
