import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarItems from './sidebarItems';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../auth/authSlice';
import { CSSTransition } from 'react-transition-group';

const Sidebar = (props, { defaultActive }) => {
	const dispatch = useDispatch();
	function logout() {
		dispatch(logoutUser());
	}
	const nodeRef = React.useRef(null);

	const barClass = () => {
		if (props.open) {
			console.log('true');
			return 'scale-x-100';
		} else {
			return 'scale-x-0';
		}
	};
	return (
		<CSSTransition
			in={props.open}
			timeout={{
				enter: 10,
				exit: 220,
			}}
			classNames={{
				enter: 'scale-x-0',
				enterActive: 'scale-x-100',
				enterDone: 'scale-x-100',
				exit: 'scale-x-100',
				exitActive: 'scale-x-0',
				exitDone: 'scale-x-0',
			}}
			unmountOnExit
			nodeRef={nodeRef}>
			<div
				ref={nodeRef}
				className='bg-sidebar w-64 min-h-full flex flex-col z-50 transition-all motion-reduce:transition-none transform origin-left duration-300'>
				{SidebarItems.map((item, index) => {
					return (
						<NavLink
							to={item.route}
							key={item.name}
							onClick={props.closeIt}
							className={({ isActive }) =>
								isActive
									? 'bg-sidebar-button text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
									: 'hover:bg-sidebar-button text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
							}>
							{item.name}
						</NavLink>
					);
				})}
				<h1
					onClick={logout}
					className='hover:bg-sidebar-button text-white font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'>
					Logout
				</h1>
			</div>
		</CSSTransition>
	);
};

export default Sidebar;
