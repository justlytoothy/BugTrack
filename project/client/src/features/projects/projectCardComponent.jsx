import React from 'react';
import common from '../../common/commonImports';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
//Chart Default Sizes Responsive
ChartJS.overrides['doughnut'].plugins.legend.position = 'right';
if (window.innerWidth >= 1440) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 15,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 23,
	};
} else if (window.innerWidth >= 1024) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 12,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 20,
	};
} else if (window.innerWidth >= 768) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 10,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 18,
	};
} else {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 7,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 15,
	};
}
///////////////////
///////////////////
const ProjectCard = (props) => {
	/**
	 * Responsively change font size of chart title and legend labels
	 */
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 1440) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 15,
			};
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 23,
			};
		} else if (window.innerWidth >= 1024) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 12,
			};
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 20,
			};
		} else if (window.innerWidth >= 768) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 10,
			};
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 18,
			};
		} else {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 7,
			};
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 15,
			};
		}
	});
	const typeData = (tickets) => {
		let bugs = 0;
		let plannedFeatures = 0;
		let complaints = 0;
		let suggestions = 0;
		let totals = [];
		tickets.forEach((ticket) => {
			if (ticket.ticket_type === 'Bug') {
				bugs++;
			}
			if (ticket.ticket_type === 'Planned Feature') {
				plannedFeatures++;
			}
			if (ticket.ticket_type === 'Complaint') {
				complaints++;
			}
			if (ticket.ticket_type === 'Suggestion') {
				suggestions++;
			}
		});
		totals = [bugs, plannedFeatures, complaints, suggestions];
		return totals;
	};
	const statusData = (tickets) => {
		let open = 0;
		let closed = 0;
		let onHold = 0;
		let totals = [];
		tickets.forEach((ticket) => {
			if (ticket.ticket_status === 'Open') {
				open++;
			}
			if (ticket.ticket_status === 'Closed') {
				closed++;
			}
			if (ticket.ticket_status === 'On Hold') {
				onHold++;
			}
		});
		totals = [open, closed, onHold];
		return totals;
	};
	const typeChartData = {
		labels: ['Bugs', 'Features', 'Complaints', 'Suggestions'],
		datasets: [
			{
				label: 'Ticket Types',
				data: typeData(props.project.tickets),
				backgroundColor: [
					'rgba(245, 3, 9, 1)',
					'rgba(24, 99, 187, 1)',
					'rgba(252, 150, 0, 1)',
					'rgba(81, 176, 100, 1)',
				],
				borderColor: [
					'rgba(245, 3, 9, 1)',
					'rgba(24, 99, 187, 1)',
					'rgba(252, 150, 0, 1)',
					'rgba(81, 176, 100, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	const statusChartData = {
		labels: ['Open', 'Closed', 'On Hold'],
		datasets: [
			{
				label: 'Ticket Status',
				data: statusData(props.project.tickets),
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

	console.log(props.project);

	const employeeGraph = () => {
		return (
			<div className='h-1/2 lg:h-full w-full flex flex-col rounded text-rich-black mx-2'>
				<div className='border-rich-black border rounded overflow-scroll min-h-full max-h-full bg-white'>
					<div className='grid grid-cols-4'>
						<span className='col-span-3 py-1 text-center flex flex-col justify-center border-b border-r border-rich-black'>
							<h1 className='truncate'>Employee Name</h1>
						</span>
						<span className='col-span-1 py-1 text-center border-b border-rich-black flex flex-col justify-center'>
							<h1 className='truncate'>Job</h1>
						</span>
					</div>
					{React.Children.toArray(
						props.project.employees.map((employee) => {
							let iter = props.project.employees.length - 1;
							if (iter !== 0) {
								iter--;
								return (
									<div
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
										tabIndex={
											props.project.employees.length -
											iter
										}>
										<span className='p-2 border-r border-b border-rich-black col-span-3 truncate'>
											{employee.first_name +
												' ' +
												employee.last_name}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1 truncate'>
											{employee.role}
										</span>
									</div>
								);
							} else {
								return (
									<div
										tabIndex={
											props.project.employees.length -
											iter
										}
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'>
										<span className='p-2 border-r border-b border-rich-black col-span-3 truncate'>
											{employee.first_name +
												' ' +
												employee.last_name}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1 truncate'>
											{employee.role}
										</span>
									</div>
								);
							}
						})
					)}
				</div>
			</div>
		);
	};

	const openProjectPage = () => {
		window.location.href = `/project/${props.project._id}`;
		props.close();
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (props.project !== null) {
		return (
			<div className='max-h-[80vh] relative min-w-[25vw] max-w-[85vw] lg:max-w-[50vw] grid grid-cols-4'>
				<div className='col-span-4 pb-4'>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl fixed top-3 right-4'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
					<h1 className='w-full mt-4 pl-8 text-3xl font-semibold'>
						{props.project.project_name}
						<common.FontAwesomeIcon
							className='cursor-pointer text-edit-pad hover:text-edit-pad-hover pl-4 pb-1 text-2xl'
							icon='fa-solid fa-edit'
							onClick={
								props.editProject
							}></common.FontAwesomeIcon>
					</h1>
				</div>
				<div className='col-span-4 grid grid-cols-4 border border-rich-black rounded p-2'>
					<div className='h-80 col-span-4 relative w-full flex justify-between flex-wrap lg:flex-nowrap p-2 space-y-2 lg:space-y-0'>
						{/* Project Information Section */}
						<div className='h-1/2 lg:h-full border border-rich-black rounded text-rich-black mx-2 w-full overflow-scroll p-1'>
							<h3 className='text-base'>
								{props.project.project_description}
							</h3>
						</div>
						{/* Employee Table Section */}
						{employeeGraph()}
					</div>
					<div className='col-span-4 flex justify-evenly mt-2'>
						<div className='h-36 lg:h-52 flex justify-between w-[47%] p-2 border border-rich-black'>
							<Doughnut
								options={{
									maintainAspectRatio: false,
									responsive: true,
									aspectRatio: 1,
									plugins: {
										title: {
											display: true,
											text: 'Ticket Status',
										},
									},
								}}
								data={statusChartData}></Doughnut>
						</div>
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
								data={typeChartData}></Doughnut>
						</div>
					</div>
				</div>
				<div className='col-span-3 ml-[-1rem] mt-1'>
					<common.ActionButton
						type='cancel'
						text='Close'
						extraClass='col-span-1'
						click={props.close}></common.ActionButton>
				</div>
				<div className='col-span-1 flex justify-end mr-[-1rem] mt-1'>
					<common.ActionButton
						type='info'
						text='Edit Project'
						extraClass='col-span-1'
						click={props.editProject}></common.ActionButton>
					<common.ActionButton
						type='info'
						text='More Info'
						extraClass='col-span-1'
						click={openProjectPage}></common.ActionButton>
				</div>
			</div>
		);
	} else {
		<div></div>;
	}
};

export default ProjectCard;

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
