import React, { useEffect } from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const TicketCard = (props) => {
	const navigate = useNavigate()
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
	// const listEmployees = (empArray) => {
	// 	let iter = empArray.length - 1
	// 	{
	// 		React.Children.toArray(
	// 			empArray.map((employee) => {
	// 				return <h1>{employee.first_name}</h1>
	// 			})
	// 		)
	// 	}
	// }

	const openTicketPage = () => {
		navigate(`/ticket/${props.ticket._id}`)
		props.close()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (props.ticket !== null) {
		return (
			<div className='h-full relative w-full grid grid-cols-4'>
				<div className='h-80 col-span-4 relative w-full flex flex-row justify-between p-2'>
					{/* Ticket Information Section */}
					<div className='h-full w-full grid grid-cols-4 bg-white-filled rounded text-rich-black mx-2'>
						<h1 className='col-span-4 text-2xl text-center'>Name</h1>
						<h2 className='col-span-4 text-xl text-center'>Id</h2>
						<h3 className='col-span-4 text-xl text-center'>Desc</h3>
					</div>
					{/* Employee Table Section */}
					<div className='h-full w-full flex flex-col bg-white-filled rounded text-rich-black p-1 mx-2'>
						<div className='border-rich-black border overflow-scroll no-scroll-bar min-h-full max-h-full bg-white'>
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
							{/*{React.Children.toArray(
								props.ticket.employees.map((employee) => {
									let iter = props.ticket.employees.length - 1
									if (iter !== 0) {
										iter--
										return (
											<div
												className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
												tabIndex={props.ticket.employees.length - iter}>
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
												tabIndex={props.ticket.employees.length - iter}
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
							)}*/}
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
						type='info'
						text='More Info'
						extraClass='col-span-1'
						click={openTicketPage}></common.ActionButton>
				</div>
			</div>
		)
	} else {
		;<div></div>
	}
}

export default TicketCard
