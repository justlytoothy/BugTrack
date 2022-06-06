import React, { useState } from 'react';
import Sidebar from '../features/sidebar/sidebarComponent';
import NavBar from './navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
const Layout = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
	const openSidebar = () => {
		setIsOpen(!isOpen);
	};
	const onlyOpen = () => {
		setIsOpen(true);
	};
	const closeSidebar = () => {
		if (isOpen) {
			setIsOpen(false);
		}
		setDropdownIsOpen(!dropdownIsOpen);
	};

	return (
		<div className='flex flex-col min-h-full min-w-full'>
			<div className='flex flex-col min-w-full min-h-full'>
				<NavBar closeDropdown={dropdownIsOpen} openIt={openSidebar} />

				<div className='flex flex-row min-h-full w-full'>
					<Sidebar
						onlyOpen={onlyOpen}
						open={isOpen}
						closeIt={closeSidebar}
					/>
					<div className='p-8 w-full min-h-full'>
						<Outlet context={closeSidebar} />
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		</div>
	);
};

export default Layout;
