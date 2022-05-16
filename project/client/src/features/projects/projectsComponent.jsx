import React, { useState } from 'react'
import common from '../../common/commonImports.js'
import NewProjectComponent from './newProjectComponent.jsx'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { deleteProject } from './projectSlice.js'
const ProjectsComponent = () => {
	const dispatch = useDispatch()
	const [modalIsOpen, setIsOpen] = React.useState(false)
	Modal.setAppElement('#root')

	const openForm = () => {
		setIsOpen(true)
	}
	const closeForm = () => {
		setIsOpen(false)
	}
	const deleteOne = () => {
		const name = 'proj1'
		dispatch(deleteProject(name))
	}
	const refreshComponent = async () => {}

	return (
		<div className='bg-gray-200 w-full flex flex-col flex-wrap'>
			<h1 className='w-full h-[7%] text-center text-3xl border-8 border-black font-semibold'>
				Projects
			</h1>
			<div className='w-full h-[93%] grid grid-cols-8'>
				<div className='col-span-8 flex justify-center border-8 border-black text-xl'></div>

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
							extraClass=''>
							New Project &nbsp;
						</common.ActionButton>
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
				<div className='col-span-4 flex justify-center border-8 border-black text-3xl'>
					<common.ActionButton
						text={
							<div>
								Delete Project &nbsp;
								<common.FontAwesomeIcon
									className='text-midnight-blue text-3xl'
									icon='fa-solid fa-square-plus'
								/>
							</div>
						}
						click={deleteOne}>
						New Project &nbsp;
					</common.ActionButton>
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
	)
}

export default ProjectsComponent
