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
const ProjectsComponent = () => {
	const projectArray = useSelector(allProjects);
	const status = useSelector(projectStatus);
	const [selectedProject, setSelectedProject] = useState();
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = useState(false);
	let showIt = false;
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
		console.log(projectArray);
		//dispatch(deleteProject());
	};
	const showProject = (project) => {
		setSelectedProject(project);
		showIt = true;
	};

	const listProjects = () => {
		let iter = projectArray.length - 1;
		return (
			<div>
				{React.Children.toArray(
					projectArray.map((project) => {
						if (iter !== 0) {
							iter--;
							return (
								<div
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer'>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-l border-gray-border'>
										{project.project_name}
									</span>
									<span className='col-span-4 justify-left px-5 py-2 border-r border-t border-gray-border'>
										{project.project_description}
									</span>
								</div>
							);
						} else {
							return (
								<div
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer'>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border'>
										{project.project_name}
									</span>
									<span className='col-span-4 justify-left px-5 py-2 border-r border-t border-b border-gray-border'>
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

	return (
		<div className='bg-gray-200 w-full flex flex-col flex-wrap'>
			<div className='w-full h-[7%] text-center text-3xl font-semibold'>
				Projects
			</div>
			<div className='w-full h-[93%] grid grid-cols-8'>
				<div className='col-span-8 text-xl'>
					<div className='grid grid-cols-7 text-dark-heading font-bold mt-1 border-gray-border whitespace-nowrap'>
						<span className='items-center flex justify-between hover:bg-white-filled cursor-pointer col-span-3 px-5 py-2 border-r border-l border-t border-gray-border'>
							Project Name
						</span>
						<span className='items-center flex justify-between hover:bg-white-filled cursor-pointer col-span-4 px-5 py-2 border-t border-r border-gray-border'>
							Project Description
						</span>
					</div>
					{listProjects()}
				</div>

				<div className='col-span-4 flex justify-center border-8 border-black text-xl'>
					<div className='h-4'>
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
					</div>
				</div>
				<div className='col-span-4 flex flex-wrap justify-center border-8 border-black text-3xl'>
					Ticket Completion
					<div className='break'></div>
					<common.FontAwesomeIcon
						className='text-carolina-blue'
						icon='fa-solid fa-ticket'
					/>
				</div>
				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					<common.FontAwesomeIcon
						className='text-midnight-blue'
						icon='fa-solid fa-coffee'
					/>
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
