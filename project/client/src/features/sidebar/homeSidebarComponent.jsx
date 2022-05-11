import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import SidebarItems from './sidebarItems';

const Sidebar = (props, { defaultActive }) => {
	const location = useLocation().pathname;
	return (
		<>
			<div className='bg-[#c34a36] w-64 h-[105vh] flex flex-col'>
				{SidebarItems.map((item, index) => {
					return (
						<NavLink
							to={item.route}
							isActive={(match, location) => {
								if (!match) {
									return false;
								}

								// only consider an event active if its event id is an odd number
								const eventID = parseInt(match.params.eventID);
								return !isNaN(eventID) && eventID % 2 === 1;
							}}
							key={item.name}
							className={({ isActive }) =>
								isActive
									? 'bg-gray-500 text-white font-bold text-xl py-4 px-6 transition-all duration-100 ease-in-out my-1 mx-3 rounded cursor-pointer'
									: 'hover:bg-gray-500 text-white font-bold text-xl py-4 px-6 transition-all duration-100 ease-in-out my-1 mx-3 rounded cursor-pointer'
							}>
							{item.name}
						</NavLink>
					);
				})}
			</div>
		</>
	);
};

export default Sidebar;

// 'bg-gray-500 text-white font-bold text-xl py-4 px-6 transition-all duration-100 ease-in-out my-1 mx-3 rounded cursor-pointer'
// className={({ isActive }) => (isActive ? 'active' : 'inactive')}
// 'hover:bg-gray-500 text-white font-bold text-xl py-4 px-6 transition-all duration-100 ease-in-out my-1 mx-3 rounded cursor-pointer'
