import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, getSelectedProject, refreshStatus } from '../projectSlice';
import { refreshTicketStatus } from '../../tickets/ticketSlice';
import { CSSTransition } from 'react-transition-group';
import common from '../../../common/commonImports';
import NewTicketComponent from '../../tickets/newTicketComponent';
import Modal from 'react-modal';

import TicketCard from '../../tickets/ticketCardComponent';

const ProjectDetails = (props) => {
	const closeIt = useOutletContext();
	const { id } = useParams();
	const [selectedTicket, setSelectedTicket] = useState();
	const [showDetails, setShowDetails] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const nodeRef = React.useRef(null);
	const dispatch = useDispatch();
	const refresh = useSelector(refreshStatus);
	const refreshTicket = useSelector(refreshTicketStatus);
	const project = useSelector(getSelectedProject);
	useEffect(() => {
		dispatch(getProject(id));
	}, [refresh, refreshTicket]);
	Modal.setAppElement('#root');

	const scrollMe = () => {
		if (!nodeRef) return;
		// Get node coords from Ref
		const node =
			nodeRef.current.getBoundingClientRect().top + window.scrollY;

		window.scroll({
			top: node,
			behavior: 'smooth',
		});
	};
	const scrollMeFirst = () => {
		nodeRef.current.scrollIntoView(true);
	};
	const toTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	const openForm = () => {
		setIsOpen(true);
	};
	const closeForm = () => {
		setIsOpen(false);
	};

	const openDetails = () => {
		setShowDetails(true);
	};
	const closeDetails = () => {
		setShowDetails(false);
	};
	const closeDetailsScroll = () => {
		setShowDetails(false);
		setTimeout(() => toTop(), 100);
	};

	const showTicket = (ticket) => {
		if (ticket !== selectedTicket && showDetails === true) {
			scrollMe();
			setTimeout(() => {
				closeDetails();
				setTimeout(() => {
					setSelectedTicket(ticket);
					openDetails();
				}, 500);
			}, 250);
		} else {
			setSelectedTicket(ticket);
			if (showDetails === true) {
				closeDetails();
			} else {
				setTimeout(() => scrollMeFirst(), 1);
				openDetails();
			}
		}
	};

	const listTickets = () => {
		return (
			<div className='border-rich-black border overflow-scroll min-h-[20rem] max-h-[20rem] bg-white'>
				<div className='grid grid-cols-8'>
					<span className='col-span-2 p-2 border-y border-r border-rich-black text-2xl'>
						Ticket Name
					</span>
					<span className='col-span-1 p-2 border-y border-r border-rich-black text-2xl'>
						Status
					</span>
					<span className='col-span-1 p-2 border-y border-r border-rich-black text-2xl'>
						Type
					</span>
					<span className='col-span-2 p-2 border-y border-r border-rich-black text-2xl'>
						Submitted By
					</span>
					<span className='col-span-2 p-2 border-y border-rich-black text-2xl'>
						Assigned To
					</span>
				</div>
				{React.Children.toArray(
					project.tickets.map((ticket) => {
						let iter = project.tickets.length - 1;
						if (iter !== 0) {
							iter--;
							return (
								<div
									className='grid grid-cols-8 hover:bg-white-filled focus:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'
									tabIndex={project.tickets.length - iter}
									onClick={() => showTicket(ticket)}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{ticket.ticket_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_status}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_type}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{ticket.ticket_creator}
									</span>
									<span className='p-2 border-b border-rich-black col-span-2'>
										{ticket.ticket_description}
									</span>
								</div>
							);
						} else {
							return (
								<div
									tabIndex={project.tickets.length - iter}
									className='grid grid-cols-8 hover:bg-white-filled focus:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'
									onClick={() => showTicket(ticket)}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{ticket.ticket_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_status}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_type}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{`${ticket.ticket_creator.first_name} ${ticket.ticket_creator.last_name}`}
									</span>
									<span className='p-2 border-b border-rich-black col-span-2'>
										{`${ticket.assigned_employees[0].first_name} ${ticket.assigned_employees[0].last_name}`}
									</span>
								</div>
							);
						}
					})
				)}
			</div>
		);
	};

	const listEmployees = () => {
		return (
			<div className='border-rich-black border overflow-scroll min-h-[20rem] max-h-[20rem] bg-white'>
				<div className='grid grid-cols-4'>
					<span className='col-span-2 p-2 border-y border-r border-rich-black text-2xl'>
						Employee Name
					</span>
					<span className='col-span-1 p-2 border-y border-r border-rich-black text-2xl'>
						Job
					</span>
					<span className='col-span-1 p-2 border-y border-rich-black text-2xl'>
						Tickets
					</span>
				</div>
				{React.Children.toArray(
					project.employees.map((employee) => {
						let iter = project.employees.length - 1;
						if (iter !== 0) {
							iter--;
							return (
								<div
									className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
									tabIndex={project.employees.length - iter}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{employee.first_name +
											' ' +
											employee.last_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{employee.role}
									</span>
									<span className='p-2 border-b border-rich-black col-span-1'>
										{employee.role}
									</span>
								</div>
							);
						} else {
							return (
								<div
									tabIndex={project.employees.length - iter}
									className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{employee.first_name +
											' ' +
											employee.last_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{employee.role}
									</span>
									<span className='p-2 border-b border-rich-black col-span-1'>
										{employee.role}
									</span>
								</div>
							);
						}
					})
				)}
			</div>
		);
	};

	if (Object.keys(project).length > 0) {
		return (
			<div
				className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
					<span className='self-center'>{`Details of ${project.project_name}`}</span>
				</div>
				<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
					<div className='col-span-8 max-h-fit min-h-[45rem] border-4 border-carolina-blue w-[95%] mx-auto p-2'>
						<div className='grid grid-cols-8'>
							<div className='col-span-8 flex flex-row justify-between'>
								<div className='min-h-[20rem] grid grid-cols-4 border border-rich-black p-2 w-[49%]'>
									<h1 className='text-2xl col-span-4 text-center'>
										Project Information
									</h1>
									<h2 className='col-span-4 text-xl'>{`Project Name: ${project.project_name}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Project ID: ${project._id}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Project Description: ${project.project_description}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Assigned Employees: ${project.employees.length}`}</h2>
								</div>
								<div className='w-[49%]'>{listEmployees()}</div>
							</div>
							<div className='col-span-8 flex flex-col'>
								<div className='mt-4 border border-rich-black'>
									<h1 className='py-4 text-3xl col-span-4 text-center'>
										Tickets
									</h1>
								</div>
								{listTickets()}
							</div>
						</div>
					</div>
					<div className='col-span-8 items-center text-xl'>
						<span className='items-center py-2 ml-6 mr-6 h-fit flex justify-between'>
							<common.ActionButton
								text={
									<div>
										New Ticket &nbsp;
										<common.FontAwesomeIcon
											className='text-midnight-blue text-xl'
											icon='fa-solid fa-square-plus'
										/>
									</div>
								}
								click={openForm}
								extraClass=''></common.ActionButton>
							<common.ActionButton
								text={
									<div className=''>
										Delete Ticket &nbsp;
										<common.FontAwesomeIcon
											className='text-midnight-blue text-xl'
											icon='fa-solid fa-square-plus'
										/>
									</div>
								}></common.ActionButton>
						</span>
					</div>
					<CSSTransition
						in={showDetails}
						timeout={{
							enter: 0,
							exit: 500,
						}}
						unmountOnExit
						classNames={{
							enter: 'scale-y-0 duration-300 transition-all motion-reduce:transition-none transform origin-center',
							enterActive:
								'scale-y-100 duration-300 transition-all motion-reduce:transition-none transform origin-center',
							enterDone:
								'scale-y-100 duration-300 transition-all motion-reduce:transition-none transform origin-center',
							exit: 'scale-y-0 duration-500 transition-all motion-reduce:transition-none transform origin-center',
							exitActive:
								'scale-y-0 duration-400 transition-all motion-reduce:transition-none transform origin-center',
							exitDone:
								'scale-y-0 duration-400 transition-all motion-reduce:transition-none transform origin-center',
						}}
						nodeRef={nodeRef}>
						<div
							ref={nodeRef}
							className='col-span-8 m-2 p-2 flex justify-center border-8 rounded h-full border-rich-black text-3xl'>
							<TicketCard
								ticket={selectedTicket}
								show={showDetails}
								close={closeDetailsScroll}></TicketCard>
						</div>
					</CSSTransition>
					<Modal
						className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
						overlayClassName=''
						isOpen={modalIsOpen}
						onRequestClose={closeForm}
						contentLabel='New Ticket Form'>
						<NewTicketComponent
							project_id={project._id}
							close={closeForm}></NewTicketComponent>
					</Modal>
				</div>
			</div>
		);
	} else {
		return <div>Loading Project Info...</div>;
	}
};

export default ProjectDetails;
