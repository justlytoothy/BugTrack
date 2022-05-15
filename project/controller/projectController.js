import mongoose from 'mongoose'
import projectModel from '../model/projectModel.js'
import userModel from '../model/userModel.js'

const newProject = async (req, res) => {
	const { projName, projDesc, createdBy, employees } = req.body
	let project = ''
	try {
		if (employees !== null) {
			project = await projectModel.create({
				project_name: projName,
				project_description: projDesc,
				project_owner: createdBy,
				employees: employees,
			})
		} else {
			project = await projectModel.create({
				project_name: first_name,
				project_description: projDesc,
				project_owner: createdBy,
			})
		}
		const creator = await userModel.findById(createdBy)
		console.log(project._id)
		creator.assigned_projects.push(project._id)
		creator.save()
		console.log('success')
		res.status(201).json(project)
	} catch (err) {
		console.log(err)
		res.status(400).json({ Error: err })
	}
}

const getAllProjects = async (req, res) => {
	projectModel.find({}, (err, data) => {
		if (err) {
			return res.json({ Error: err })
		}
		return res.json(data)
	})
}

const getProject = async (req, res) => {
	const id = req.body._id
	projectModel.findOne({ id }, (err, data) => {
		if (err) {
			return res.json({ Error: err })
		}
		return res.json(data)
	})
}

const deleteProject = async (req, res) => {
	const name = req
	console.log('implement delete project, remember to cascade delete')
	// const id = await projectModel.findOne({ project_name: name })
	// const projectEmployees = await userModel.find({
	// 	assigned_projects: id,
	// })
	// console.log(projectEmployees)
}

export default { newProject, getAllProjects, getProject, deleteProject }
