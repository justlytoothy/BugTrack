import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import {
	refreshTicketStatus,
	getTicket,
	getSelectedTicket,
} from './ticketSlice'
import { newComment, refreshCommentStatus } from '../comments/commentSlice'
import { CSSTransition } from 'react-transition-group'
import common from '../../common/commonImports'
import Modal from 'react-modal'

const TicketDetails = (props) => {
	const closeIt = useOutletContext()
	const { id } = useParams()
	const [showDetails, setShowDetails] = useState(false)
	const [selectedComment, setSelectedComment] = useState()
	const [modalIsOpen, setIsOpen] = useState(false)
	const nodeRef = React.useRef(null)

	const dispatch = useDispatch()
	const ticket = useSelector(getSelectedTicket)
	const refreshTicket = useSelector(refreshTicketStatus)
	const refreshComment = useSelector(refreshCommentStatus)
	useEffect(() => {
		dispatch(getTicket(id))
		console.log(ticket)
	}, [refreshTicket, refreshComment])
	Modal.setAppElement('#root')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const scrollMe = () => {
		if (!nodeRef) return
		// Get node coords from Ref
		const node = nodeRef.current.getBoundingClientRect().top + window.scrollY

		window.scroll({
			top: node,
			behavior: 'smooth',
		})
	}
	const scrollMeFirst = () => {
		nodeRef.current.scrollIntoView(true)
	}
	const toTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}

	const listComments = () => {
		return (
			<div className='border-rich-black border overflow-scroll no-scroll-bar min-h-[20rem] max-h-[20rem] bg-white'>
				<div className='grid grid-cols-8'>
					<span className='col-span-2 p-2 border-y border-rich-black text-2xl'>
						Commentor
					</span>
					<span className='col-span-4 p-2 border-y border-rich-black text-2xl'>
						Message
					</span>
					<span className='col-span-2 p-2 border-y border-rich-black text-2xl'>
						Date
					</span>
				</div>
				{React.Children.toArray(
					ticket.ticket_comments.map((comment) => {
						let iter = ticket.ticket_comments.length - 1
						if (iter !== 0) {
							iter--
							console.log(ticket.ticket_comments)
							return (
								<div
									className='grid grid-cols-8 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'
									tabIndex={ticket.ticket_comments.length - iter}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{`${comment.creator.first_name} ${comment.creator.last_name}`}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-4'>
										{comment.message}
									</span>

									<span className='p-2 border-b border-rich-black col-span-2'>
										{comment.created_at.slice(0, 10)}
									</span>
								</div>
							)
						} else {
							return (
								<div
									tabIndex={ticket.ticket_comments.length - iter}
									className='grid grid-cols-8 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{`${comment.creator.first_name} ${comment.creator.last_name}`}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-4'>
										{comment.message}
									</span>

									<span className='p-2 border-b border-rich-black col-span-2'>
										{comment.created_at.slice(0, 10)}
									</span>
								</div>
							)
						}
					})
				)}
			</div>
		)
	}

	const submitMe = (message) => {
		message.ticket_id = ticket._id
		dispatch(newComment(message))
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (Object.keys(ticket).length > 0) {
		return (
			<div
				className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
					<span className='self-center'>{`Details of ${ticket.ticket_name}`}</span>
				</div>
				<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
					<div className='col-span-8 max-h-fit min-h-[45rem] border-4 border-carolina-blue w-[95%] mx-auto p-2'>
						<div className='grid grid-cols-8'>
							<div className='col-span-8 flex flex-row justify-between'>
								<div className='min-h-[20rem] grid grid-cols-4 border border-rich-black p-2 w-[49%]'>
									<h1 className='text-2xl col-span-4 text-center'>
										Ticket Information
									</h1>
									<h2 className='col-span-4 text-xl'>{`Ticket Name: ${ticket.ticket_name}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Ticket ID: ${ticket._id}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Ticket Description: ${ticket.ticket_description}`}</h2>
									<h2 className='col-span-4 text-xl'>{`Assigned Employees: ${ticket.assigned_employees.length}`}</h2>
								</div>
								<div className='w-[49%]'>
									{listComments()}
									<div className='min-w-full grid grid-cols-3 h-8'>
										<form className='col-span-2 h-8'>
											<input
												className='h-full w-full'
												type='text'
												placeholder='Leave a comment'
												name='message'
												{...register('message')}
											/>
										</form>
										<common.ActionButton
											extraClass='col-span-1 text-base h-fit'
											text='Submit Ticket'
											type='submit'
											click={handleSubmit(submitMe)}></common.ActionButton>
									</div>
								</div>
							</div>
							<div className='col-span-8 flex flex-col'>
								<div className='mt-4 border border-rich-black'>
									<h1 className='py-4 text-3xl col-span-4 text-center'>
										Tickets
									</h1>
								</div>
								{/* {listTickets()} */}
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
							enter:
								'scale-y-0 duration-300 transition-all motion-reduce:transition-none transform origin-center',
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
							{/* <TicketCard
								ticket={selectedTicket}
								show={showDetails}
								close={closeDetailsScroll}></TicketCard> */}
						</div>
					</CSSTransition>
					<Modal
						className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
						overlayClassName=''
						isOpen={modalIsOpen}
						contentLabel='New Ticket Form'>
						{/* <NewTicketComponent
							project_id={project._id}
							close={closeForm}></NewTicketComponent> */}
					</Modal>
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<common.Spinner></common.Spinner>
			</div>
		)
	}
}

export default TicketDetails
