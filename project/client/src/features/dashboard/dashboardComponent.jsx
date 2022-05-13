import React from 'react';
//import { useDispatch } from 'react-redux';
//import common from '../../common/commonImports.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardComponent = (props) => {
	//const dispatch = useDispatch();
	return (
		<div className='bg-gray-200 w-full flex flex-col flex-wrap'>
			<h1 className='w-full h-[7%] text-center text-3xl border-8 border-black font-semibold'>
				Dashboard
			</h1>
			<div className='w-full h-[93%] grid grid-cols-8'>
				<div className='col-span-8 flex justify-center border-8 border-black text-3xl'>
					Intro Section
				</div>

				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					Current Tickets Status
				</div>
				<div className='col-span-4 flex flex-wrap justify-center border-8 border-black text-3xl'>
					Ticket Completion
					<div className='break'></div>
					<FontAwesomeIcon
						className='text-carolina-blue'
						icon='fa-solid fa-ticket'
					/>
				</div>
				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					<FontAwesomeIcon
						className='text-midnight-blue'
						icon='fa-solid fa-coffee'
					/>
				</div>
				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					<FontAwesomeIcon
						className='text-midnight-blue'
						icon='fa-brands fa-twitter'
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardComponent;
