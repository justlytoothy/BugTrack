import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllUsers } from '../auth/authSlice';
import common from '../../common/commonImports.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';
import {
	getAllProjects,
	allProjects,
	refreshStatus,
	projectStatus,
} from '../projects/projectSlice.js';
import ChartJS, { resizeChecker } from '../../common/chartDefaults';

const chartExampleData = {
	labels: ['Open', 'Closed', 'Failed'],
	datasets: [
		{
			label: 'Current Ticket Status',
			data: [12, 23, 6],
			backgroundColor: [
				'rgba(230, 255, 110, 1)',
				'rgba(63, 195, 128, 1)',
				'rgba(249, 180, 45, 1)',
			],
			borderColor: [
				'rgba(230, 255, 110, 1)',
				'rgba(63, 195, 128, 1)',
				'rgba(249, 180, 45, 1)',
			],
			borderWidth: 1,
		},
	],
};

const DashboardComponent = (props) => {
	const dispatch = useDispatch();
	/**
	 * Responsively change font size of chart title and legend labels
	 */
	window.addEventListener('resize', resizeChecker);
	/**
	 * End responsive chart sizing
	 */
	const projectArray = useSelector(allProjects);
	const refreshStat = useSelector(refreshStatus);
	const loading = useSelector(projectStatus);
	const closeIt = useOutletContext();
	useEffect(() => {
		dispatch(getAllProjects());
	}, [refreshStat]);

	const getUser = () => {
		const bruh = dispatch(listAllUsers());
	};
	/**
	 * Takes in the fetched project array and iterates over it to display relevant data in the table
	 * @returns project table
	 */
	const listProjects = () => {
		let iter = projectArray.length - 1;
		return (
			<div className='overflow-scroll min-h-[40rem] max-h-[40rem] 2xl:min-h-[65rem] 2xl:max-h-[65rem] border-4 border-carolina-blue w-[95%] mx-auto'>
				<div className='grid grid-cols-7 text-rich-black font-semibold text-lg border-gray-border whitespace-nowrap'>
					<span className='col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Project Name
					</span>
				</div>
				{React.Children.toArray(
					projectArray.map((project) => {
						if (iter !== 0) {
							iter--;
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() =>
										console.log('implement project select')
									}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{project.project_name}
									</span>
								</div>
							);
						} else {
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() =>
										console.log('implement project select')
									}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{project.project_name}
									</span>
								</div>
							);
						}
					})
				)}
			</div>
		);
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div
			className='bg-back-color w-full grid grid-cols-2 min-h-full rounded border-2 border-rich-black'
			onClick={closeIt}>
			<div className='col-span-2 h-full'>
				<div className='w-full flex justify-center content-center text-2xl lg:text-3xl font-semibold col-span-2 py-4'>
					<span className='self-center'>Dashboard</span>
				</div>
				<div className='w-full min-h-full grid grid-cols-8'>
					<div className='col-span-8'>
						<div className='overflow-scroll min-h-[40rem] max-h-[40rem] 2xl:min-h-[65rem] 2xl:max-h-[65rem] border-4 border-carolina-blue w-[95%] mx-auto'>
							<div className='h-36 lg:h-52 flex justify-between w-[47%] p-2 border border-rich-black'>
								<Doughnut
									options={{
										maintainAspectRatio: false,
										responsive: true,
										aspectRatio: 1,
										plugins: {
											title: {
												display: true,
												text: 'Ticket Types',
											},
										},
									}}
									data={chartExampleData}></Doughnut>
							</div>
						</div>
						<div className='flex flex-col justify-end pt-2'>
							<span className='ml-6 mr-6 h-fit flex justify-between'>
								<common.ActionButton
									text='New Project'
									type='submit'
									click={closeIt}
									extraClass=''></common.ActionButton>
								<common.ActionButton
									text='Delete Project'
									click={closeIt}
									type='delete'></common.ActionButton>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardComponent;
