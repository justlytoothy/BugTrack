import React from 'react';
import { useOutletContext } from 'react-router-dom';

const EmployeesComponent = (props) => {
	const closeIt = useOutletContext();

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div
			className='bg-back-color w-full min-h-[100vh] text-black p-2'
			onClick={closeIt}>
			<h1>Welcome to Employees Page</h1>
			<h2>Not Implemented yet</h2>
		</div>
	);
};

export default EmployeesComponent;
