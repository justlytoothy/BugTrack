import React, { useEffect } from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const ProjectCard = (props) => {
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
	}
	const listEmployees = (empArray) => {
		let iter = empArray.length - 1
		{
			React.Children.toArray(
				empArray.map((employee) => {
					return <h1>{employee.first_name}</h1>
				})
			)
		}
	}

	const openProjectPage = () => {
		window.location.href = `/project/${props.project._id}`
		props.close()
	}
	// useEffect(() => {
	// 	console.log('hello');
	// }, []);
	if (props.project !== null) {
		return (
			<div className='h-full relative w-full grid grid-cols-4'>
				<div className='h-80 col-span-4 relative w-full flex flex-row justify-between p-2'>
					{/* Project Information Section */}
					<div className='h-full w-full grid grid-cols-4 bg-white-filled rounded text-rich-black mx-2'>
						<h1 className='col-span-4 text-2xl text-center'>
							{props.project.project_name}
						</h1>
						<h2 className='col-span-4 text-xl text-center'>
							{props.project._id}
						</h2>
						<h3 className='col-span-4 text-xl text-center'>
							{props.project.project_description}
						</h3>
					</div>
					{/* Employee Table Section */}
					<div className='h-full w-full flex flex-col bg-white-filled rounded text-rich-black p-1 mx-2'>
						<div className='border-rich-black border overflow-scroll min-h-full max-h-full bg-white'>
							<div className='grid grid-cols-4'>
								<span className='col-span-2 p-2 border-y border-r border-rich-black'>
									Employee Name
								</span>
								<span className='col-span-1 p-2 border-y border-r border-rich-black'>
									Job
								</span>
								<span className='col-span-1 p-2 border-y border-rich-black'>
									Tickets
								</span>
							</div>
							{React.Children.toArray(
								props.project.employees.map((employee) => {
									let iter = props.project.employees.length - 1
									if (iter !== 0) {
										iter--
										return (
											<div
												className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
												tabIndex={props.project.employees.length - iter}>
												<span className='p-2 border-r border-b border-rich-black col-span-2'>
													{employee.first_name + ' ' + employee.last_name}
												</span>
												<span className='p-2 border-r border-b border-rich-black col-span-1'>
													{employee.role}
												</span>
												<span className='p-2 border-b border-rich-black col-span-1'>
													{employee.role}
												</span>
											</div>
										)
									} else {
										return (
											<div
												tabIndex={props.project.employees.length - iter}
												className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'>
												<span className='p-2 border-r border-b border-rich-black col-span-2'>
													{employee.first_name + ' ' + employee.last_name}
												</span>
												<span className='p-2 border-r border-b border-rich-black col-span-1'>
													{employee.role}
												</span>
												<span className='p-2 border-b border-rich-black col-span-1'>
													{employee.role}
												</span>
											</div>
										)
									}
								})
							)}
						</div>
					</div>
				</div>
				<div className='h-64 col-span-2 relative w-full flex flex-row justify-between p-2'>
					<Doughnut
						options={{ maintainAspectRatio: false }}
						className='h-12 w-12'
						data={chartExampleData}></Doughnut>
				</div>
				<div className='h-64 col-span-2 relative w-full flex flex-row justify-between p-2'>
					<Doughnut
						options={{ maintainAspectRatio: false }}
						data={chartExampleData}></Doughnut>
				</div>
				<div className='col-span-3'>
					<common.ActionButton
						type='cancel'
						text='Close'
						extraClass='col-span-1'
						click={props.close}></common.ActionButton>
				</div>
				<div className='col-span-1 flex justify-end'>
					<common.ActionButton
						type='submit'
						text='More Info'
						extraClass='col-span-1'
						click={openProjectPage}></common.ActionButton>
				</div>
			</div>
		)
	} else {
		;<div></div>
	}
}

export default ProjectCard

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
