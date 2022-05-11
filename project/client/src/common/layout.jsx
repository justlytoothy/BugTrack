import React from 'react';
import Sidebar from '../features/sidebar/homeSidebarComponent';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
const Layout = (props) => {
	return (
		<div>
			<div className='flex flex-col'>
				<NavBar />
				<div className='flex flex-row'>
					<Sidebar />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
