import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProject, getSelectedProject, refreshStatus } from '../projectSlice'
import common from '../../../common/commonImports'

const ProjectDetails = (props) => {
	const closeIt = useOutletContext()
	const { id } = useParams()
	const dispatch = useDispatch()
	const refresh = useSelector(refreshStatus)
	const project = useSelector(getSelectedProject)
	useEffect(() => {
		dispatch(getProject(id))
		console.log(project)
	}, [refresh])

	return (
		<div
			className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
			onClick={closeIt}>
			<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
				<span className='self-center'>Projects</span>
			</div>
			<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
				<div className='col-span-8 text-xl'>
					<div className='overflow-scroll max-h-[700px] min-h-[700px] border-4 border-carolina-blue w-[95%] mx-auto'>
						<div className='grid grid-cols-7 text-dark-heading font-bold border-gray-border whitespace-nowrap'>
							<span className='items-center flex justify-between col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
								Project Name
							</span>
							<span className='items-center flex justify-between col-span-3 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
								Assigned Employees
							</span>
							<span className='items-center flex justify-between col-span-2 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
								Project Description
							</span>
						</div>
						<div className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full'>
							<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
								{id}
							</span>
							<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
								employees
							</span>
							<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
								desc
							</span>
						</div>
					</div>
				</div>
				<div className='col-span-8 items-center text-xl'>
					<span className='items-center py-2 ml-6 mr-6 h-fit flex justify-between'>
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
							extraClass=''></common.ActionButton>
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
					</span>
				</div>
			</div>
		</div>
	)
}

export default ProjectDetails
