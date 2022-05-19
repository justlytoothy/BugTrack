import React from 'react';
import logo from '../images/exLogo.png';

const NavBar = (props) => {
	return (
		<div className='text-white bg-navbar items-center text-2xl h-12 flex flex-row justify-evenly'>
			<img alt='logo small' className='h-full' src={logo}></img>
			<p className='hover:bg-nav-hover cursor-pointer h-full flex justify-center items-center w-full'>
				| I am a navbar |
			</p>
			<p className='hover:bg-nav-hover cursor-pointer h-full justify-center flex items-center w-full'>
				&nbsp;Second Thing |
			</p>
		</div>
	);
};

export default NavBar;
