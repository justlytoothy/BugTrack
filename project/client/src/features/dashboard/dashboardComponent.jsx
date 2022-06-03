import React from 'react';
import { useDispatch } from 'react-redux';
import { listAllUsers } from '../auth/authSlice';
import common from '../../common/commonImports.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const chartExampleData = {
	labels: ['Open', 'Closed', 'Failed'],
	datasets: [
		{
			label: 'Current Ticket Status',
			data: [12, 23, 6],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
			],
			borderWidth: 1,
		},
	],
};
const DashboardComponent = (props) => {
	const dispatch = useDispatch();
	const closeIt = useOutletContext();

	const getUser = () => {
		const bruh = dispatch(listAllUsers());
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*Actual return section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div
			className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
			onClick={closeIt}>
			<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
				<span className='self-center'>Dashboard</span>
			</div>
			<div className='w-full min-h-[93%] grid grid-cols-8 pb-4 border border-rich-black'>
				<div className='col-span-8 text-xl'></div>
				<div className='col-span-8 flex justify-start items-center text-xl'></div>
				<div className='col-span-4 flex justify-center border-8 border-black text-xl'></div>
				<div className='col-span-4 flex flex-wrap justify-center border-8 border-black text-3xl'>
					Ticket Completion
					<div className='break'></div>
					<common.FontAwesomeIcon
						className='text-carolina-blue'
						icon='fa-solid fa-ticket'
					/>
					<div className='col-span-8 flex justify-center border-8 border-black text-3xl'>
						Current Projects
						<button onClick={getUser}>click</button>
					</div>
				</div>
				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					<div>
						<Doughnut data={chartExampleData}></Doughnut>
					</div>
				</div>
				<div className='col-span-4 flex justify-center border-8 border-black text-xl'>
					<div className='h-4 items-center'>
						<common.ActionButton
							text={
								<div className=''>
									Delete Project &nbsp;
									<common.FontAwesomeIcon
										className='text-midnight-blue text-xl'
										icon='fa-solid fa-square-plus'
									/>
								</div>
							}></common.ActionButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardComponent;
