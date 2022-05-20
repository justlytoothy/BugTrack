import React, { useEffect } from 'react';
const ProjectCard = (props) => {
	useEffect(() => {
		console.log('hello');
	}, []);
	if (props.project !== null) {
		return (
			<div className='h-80 relative w-full flex flex-row justify-between'>
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
				<div className='h-full w-full grid grid-cols-4 bg-white-filled rounded text-rich-black mx-2'>
					<h1 className='col-span-4 text-2xl'>
						Employees will go here
					</h1>
				</div>
			</div>
		);
	} else {
		<div></div>;
	}
};

export default ProjectCard;

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
