import React from 'react';
import Sidebar from '../features/sidebar/sidebarComponent';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
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
			<Footer></Footer>
		</div>
	);
};

export default Layout;
