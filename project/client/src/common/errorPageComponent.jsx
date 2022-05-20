import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ErrorPageComponent = () => {
	const closeIt = useOutletContext();

	return (
		<div
			className='pl-4 w-full min-h-[100vh] bg-back-color'
			onClick={closeIt}>
			<h1 className='text-black text-2xl'>
				Error, the page you are looking for does not exist!
			</h1>
		</div>
	);
};

export default ErrorPageComponent;
