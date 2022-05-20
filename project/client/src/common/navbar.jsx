import React from 'react';
import common from './commonImports';

const NavBar = (props) => {
	return (
		<div className='text-white bg-navbar items-center text-2xl h-12 grid grid-cols-10'>
			<common.FontAwesomeIcon
				className='text-3xl pl-3 col-span-1 cursor-pointer'
				icon='bars'
				onClick={props.openIt}
			/>
			<p className='hover:bg-nav-hover cursor-pointer h-full col-span-2 flex justify-center items-center w-full'>
				| I am a navbar |
			</p>
			<p className='hover:bg-nav-hover cursor-pointer h-full col-span-2 justify-center flex items-center w-full'>
				&nbsp;Second Thing |
			</p>
		</div>
	);
};

export default NavBar;
