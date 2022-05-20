import React, { useState } from 'react';
import Sidebar from '../features/sidebar/sidebarComponent';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
const Layout = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const openSidebar = () => {
		setIsOpen(!isOpen);
	};
	const closeSidebar = () => {
		setIsOpen(false);
	};

	return (
		<div className='flex flex-col'>
			<div className='flex flex-col min-w-full'>
				<NavBar openIt={openSidebar} />

				<div className='flex flex-row min-h-full w-full'>
					<Sidebar open={isOpen} closeIt={closeSidebar} />
					<Outlet context={closeSidebar} />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
