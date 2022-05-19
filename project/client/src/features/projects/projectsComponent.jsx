import React, { useState, useEffect } from 'react';
import common from '../../common/commonImports.js';
import NewProjectComponent from './newProjectComponent.jsx';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProject,
	getAllProjects,
	allProjects,
	projectStatus,
} from './projectSlice.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const ProjectsComponent = () => {
	const projectArray = useSelector(allProjects);
	const status = useSelector(projectStatus);
	const [selectedProject, setSelectedProject] = useState();
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = useState(false);
	let showIt = false;
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
	Modal.setAppElement('#root');
	useEffect(() => {
		if (status === 'none') {
			dispatch(getAllProjects());
		}
	}, [status, dispatch]);

	const openForm = () => {
		setIsOpen(true);
	};
	const closeForm = () => {
		setIsOpen(false);
	};
	const deleteOne = () => {
		console.log(sessionStorage.getItem('user'));
		// dispatch(deleteProject(selectedProject._id));
		// refreshComponent();
	};
	const showProject = (project) => {
		setSelectedProject(project);
		showIt = true;
	};
	/**
	 * Takes an array of employee names and returns them put together as one string
	 * @param {*} empArray the array of employee names assigned to the specific project
	 * @returns
	 */
	const listEmployees = (empArray) => {
		let nameList = '';
		let first = true;
		empArray.forEach((employee) => {
			if (first === true) {
				let name = `${employee.first_name} ${employee.last_name}`;
				nameList = name;
				first = false;
			} else {
				let name = `${employee.first_name} ${employee.last_name}`;
				nameList = nameList + ', ' + name;
			}
		});
		return nameList;
	};
	/**
	 * Takes in the fetched project array and iterates over it to display relevant data in the table
	 * @returns project table
	 */
	const listProjects = () => {
		let iter = projectArray.length - 1;
		return (
			<div className='overflow-scroll max-h-[400px] min-h-[400px] border-4 border-carolina-blue w-[95%] mx-auto'>
				<div className='grid grid-cols-7 text-dark-heading font-bold border-gray-border whitespace-nowrap'>
					<span className='items-center flex justify-between col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border'>
						Project Name
					</span>
					<span className='items-center flex justify-between col-span-3 px-5 py-2 border-t border-b border-r border-gray-border'>
						Assigned Employees
					</span>
					<span className='items-center flex justify-between col-span-2 px-5 py-2 border-t border-b border-r border-gray-border'>
						Project Description
					</span>
				</div>
				{React.Children.toArray(
					projectArray.map((project) => {
						if (iter !== 0) {
							iter--;
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:animate-bounce active:text-white focus:animate-bounce focus:text-white h-full w-full'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border '>
										{project.project_name}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-gray-border'>
										{listEmployees(project.employees)}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-gray-border'>
										{project.project_description}
									</span>
								</div>
							);
						} else {
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:animate-bounce active:text-white focus:animate-bounce focus:text-white h-full w-full'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border'>
										{project.project_name}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-b border-gray-border'>
										{listEmployees(project.employees)}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-gray-border'>
										{project.project_description}
									</span>
								</div>
							);
						}
					})
				)}
			</div>
		);
	};

	const refreshComponent = () => {
		window.location.reload(false);
	};
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	//Actual Render Section
	//////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	return (
		<div className='bg-back-color w-full flex flex-col min-h-[100vh]'>
			<div className='w-full min-h-[7%] flex justify-center content-center text-3xl font-semibold'>
				<span className='self-center'>Projects</span>
			</div>
			<div className='w-full min-h-[93%] grid grid-cols-8'>
				<div className='col-span-8 text-xl'>{listProjects()}</div>
				<div className='col-span-8 flex justify-start items-center text-xl'>
					<span className='items-center py-2 ml-12 h-fit'>
						<common.ActionButton
							text={
								<div>
									New Project &nbsp;
									<common.FontAwesomeIcon
										className='text-midnight-blue text-xl'
										icon='fa-solid fa-square-plus'
									/>
								</div>
							}
							click={openForm}
							extraClass=''></common.ActionButton>
					</span>
				</div>

				<div className='col-span-4 flex justify-center border-8 border-black text-xl'></div>
				<div className='col-span-4 flex flex-wrap justify-center border-8 border-black text-3xl'>
					Ticket Completion
					<div className='break'></div>
					<common.FontAwesomeIcon
						className='text-carolina-blue'
						icon='fa-solid fa-ticket'
					/>
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
							}
							click={deleteOne}></common.ActionButton>
					</div>
				</div>
			</div>
			<Modal
				className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
				overlayClassName=''
				isOpen={modalIsOpen}
				onRequestClose={closeForm}
				contentLabel='New Project Form'>
				<NewProjectComponent
					close={closeForm}
					refresh={refreshComponent}></NewProjectComponent>
			</Modal>
		</div>
	);
};

export default ProjectsComponent;
