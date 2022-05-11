import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import SidebarItems from './sidebarItems';

const Sidebar = (props, { defaultActive }) => {
	return (
		<>
			<div className='bg-[#c34a36] w-64 h-[105vh] flex flex-col'>
				{SidebarItems.map((item, index) => {
					return (
						<NavLink
							to={item.route}
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
