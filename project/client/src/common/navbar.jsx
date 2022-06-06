import React, { useEffect, useState } from 'react';
import common from './commonImports';
import { useSelector, useDispatch } from 'react-redux';
import { getName, logoutUser } from '../features/auth/authSlice';
import { CSSTransition } from 'react-transition-group';

const NavBar = (props) => {
	const dispatch = useDispatch();
	const fullName = useSelector(getName);
	const nodeRef = React.useRef(null);
	const [openDropdown, setOpenDropdown] = useState(false);
	const toggleOpenDropdown = () => {
		setOpenDropdown(!openDropdown);
	};
	const getCaretClass = () => {
		if (openDropdown) {
			return '-rotate-90';
		}
		return '';
	};
	useEffect(() => {
		if (openDropdown) {
			toggleOpenDropdown();
		}
	}, [props.closeDropdown]);

	function logout() {
		dispatch(logoutUser());
	}
	return (
		<div className='text-white bg-navbar items-center text-lg md:text-xl h-12 flex justify-between px-4'>
			<common.FontAwesomeIcon
				className='text-2xl md:text-3xl cursor-pointer lg:invisible'
				icon='bars'
				onClick={props.openIt}
			/>
			<div>
				<div className='flex justify-between w-48 items-center'>
					<div className='flex flex-col justify-center'>
						<common.FontAwesomeIcon
							className='text-2xl md:text-3xl cursor-pointer'
							icon='fa-regular fa-circle-user'
							onClick={toggleOpenDropdown}
						/>
					</div>
					<div
						className='flex space-x-4 cursor-pointer'
						onClick={toggleOpenDropdown}>
						<span>{fullName}</span>
						<div className='flex flex-col justify-center'>
							<common.FontAwesomeIcon
								className={
									'text-lg md:text-xl transition-all ' +
									getCaretClass()
								}
								icon='caret-left'
							/>
						</div>
					</div>
				</div>
				<CSSTransition
					in={openDropdown}
					timeout={{
						enter: 10,
						exit: 220,
					}}
					classNames={{
						enter: 'scale-y-0',
						enterActive: 'scale-y-100',
						enterDone: 'scale-y-100',
						exit: 'scale-y-0',
						exitActive: 'scale-y-0',
						exitDone: 'scale-y-0',
					}}
					unmountOnExit
					nodeRef={nodeRef}>
					<div
						ref={nodeRef}
						className='bg-sidebar border-[0.07rem] border-rich-black ml-5 h-fit w-44 absolute top-12 transition-all origin-top'>
						<ul className=''>
							<li className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								This option
							</li>
							<li className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								This option
							</li>
							<li
								onClick={logout}
								className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								Log Out
							</li>
						</ul>
					</div>
				</CSSTransition>
			</div>
		</div>
	);
};

export default NavBar;
