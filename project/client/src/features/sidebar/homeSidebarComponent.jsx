import React, { useState } from 'react';
import { Router, Link } from 'react-router-dom';
import SidebarItems from './sidebarItems';

const Sidebar = (props, { defaultActive }) => {
	return (
		<>
			<div className='bg-[#c34a36] w-64 h-[105vh]'>
				{SidebarItems.map((item, index) => {
					return (
						<Link to={item.route} key={item.name}>
							<div className='py-4 px-6 transition-all duration-100 ease-in-out my-1 mx-3 rounded hover:bg-gray-600 cursor-pointer'>
								<p
									className='text-white font-bold text-xl'
									style={{ textDecoration: 'none' }}>
									{item.name}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
};

export default Sidebar;
