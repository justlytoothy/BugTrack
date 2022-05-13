import React from 'react';
import logo from '../images/exLogo.png';

const Footer = (props) => {
	return (
		<div className='pl-3 grid grid-cols-2 items-center text-center'>
			<img
				alt='My Example Logo'
				src={logo}
				width='80px'
				className='col-span-2 mx-auto block'></img>
			<small className='col-span-2'>
				&copy; Copyright 2022, Jakob Schilling
			</small>
		</div>
	);
};

export default Footer;
