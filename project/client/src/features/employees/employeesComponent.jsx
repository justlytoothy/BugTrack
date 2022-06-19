import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAllUsers, getAllUsers } from '../auth/authSlice'
import { useOutletContext } from 'react-router-dom'
import common from '../../common/commonImports'
import EmployeeInfoModal from './employeeInfoModal'
import Modal from 'react-modal'

const EmployeesComponent = (props) => {
	const closeIt = useOutletContext()
	Modal.setAppElement('#root')
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listAllUsers())
	}, [])
	const allEmployees = useSelector(getAllUsers)
	const [showInfo, setShowInfo] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [selectedEmployee, setSelectedEmployee] = useState('')
	console.log(allEmployees)
	const showEmployeeInfo = (employee) => {
		setSelectedEmployee(employee)
		setShowInfo(true)
	}
	const closeEmployeeInfo = () => {
		setShowInfo(false)
	}
	const openEditEmployee = () => {
		setShowEdit(true)
	}
	const closeEditEmployee = () => {
		setShowEdit(false)
	}

	/**
	 * Takes in the fetched employee array and iterates over it to display relevant data in the table
	 * @returns employee table
	 */
	const listEmployees = () => {
		let iter = allEmployees.length - 1
		return (
			<div className='overflow-scroll min-h-[58rem] max-h-[58rem] 2xl:min-h-[65rem] 2xl:max-h-[65rem] border-4 border-carolina-blue w-[95%] mx-auto'>
				<div className='grid grid-cols-7 text-rich-black font-semibold text-lg border-gray-border whitespace-nowrap'>
					<span className='col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Employee Name
					</span>
					<span className='col-span-3 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
						Assigned Projects
					</span>
					<span className='col-span-2 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
						Project Description
					</span>
				</div>
				{React.Children.toArray(
					allEmployees.map((employee) => {
						if (iter !== 0) {
							iter--
							return (
								<div
									tabIndex={allEmployees.length - 1 - iter}
									onClick={() => showEmployeeInfo(employee)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{`${employee.first_name} ${employee.last_name}`}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
										<p>{listProjects(employee.assigned_projects)}</p>
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
										{`${employee.first_name} ${employee.last_name}`}
									</span>
								</div>
							)
						} else {
							return (
								<div
									tabIndex={allEmployees.length - 1 - iter}
									onClick={() => showEmployeeInfo(employee)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{`${employee.first_name} ${employee.last_name}`}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
										<p>{listProjects(employee.assigned_projects)}</p>
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
										{`${employee.first_name} ${employee.last_name}`}
									</span>
								</div>
							)
						}
					})
				)}
			</div>
		)
	}

	const listProjects = (projects) => {
		let projectString = ''
		projects.forEach((project) => {
			if (projects.length - 1 === projects.indexOf(project)) {
				projectString += project.project_name
			} else {
				projectString += project.project_name + ', '
			}
		})
		return projectString
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (Object.keys(allEmployees).length > 0) {
		return (
			<div
				className='bg-back-color w-full grid grid-cols-2 min-h-full rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='col-span-2 h-full'>
					<div className='w-full flex justify-center content-center text-2xl lg:text-3xl font-semibold col-span-2 py-4'>
						<span className='self-center'>Employees</span>
					</div>
					<div className='w-full min-h-full grid grid-cols-8'>
						<div className='col-span-8'>
							{listEmployees()}
							<div className='flex flex-col justify-end pt-2'>
								<span className='ml-6 mr-6 h-fit flex justify-between'>
									<common.ActionButton
										text={
											<div>
												New Project
												{/* &nbsp;
											<common.FontAwesomeIcon
												className='text-midnight-blue text-xl'
												icon='fa-solid fa-square-plus'
									/>*/}
											</div>
										}
										type='submit'
										extraClass=''></common.ActionButton>
									<common.ActionButton
										text='Delete Project'
										type='delete'></common.ActionButton>
								</span>
							</div>
						</div>
					</div>
				</div>
				<Modal
					overlayClassName='fix-modal-overlay'
					className='fix-modal'
					style={{
						content: {
							WebkitOverflowScrolling: 'touch',
						},
					}}
					isOpen={showInfo}
					onRequestClose={closeEmployeeInfo}
					contentLabel='View Employee'>
					<EmployeeInfoModal
						employee={selectedEmployee}
						editEmployeet={openEditEmployee}
						close={closeEmployeeInfo}></EmployeeInfoModal>
				</Modal>
			</div>
		)
	} else {
		return <common.SpinnerPage closeIt={closeIt}></common.SpinnerPage>
	}
}

export default EmployeesComponent
