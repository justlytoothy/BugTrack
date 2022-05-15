import projectModel from '../model/projectModel.js'
import userModel from '../model/userModel.js'

const newProject = async (req, res) => {
	const { projName, projDesc, createdBy, employees } = req.body
	console.log(createdBy)
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
		creator.assigned_projects.push(project._id)
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

export default { newProject, getAllProjects, getProject }
