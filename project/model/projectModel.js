import mongoose from 'mongoose'
import userModel from './userModel.js'

const projectSchema = new mongoose.Schema(
	{
		project_name: {
			type: String,
			required: true,
		},
		project_description: {
			type: String,
			required: true,
			//minlength: 6,
		},
		employees: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			required: false,
		},
		tickets: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
			required: false,
		},
		project_owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
)

projectSchema.post('findOneAndDelete', (document) => {
	const projId = document._id
	userModel.find({ assigned_projects: { $in: [projId] } }).then((users) => {
		Promise.all(
			users.map(async (user) => {
				let thisUser = await userModel.findById(user._id)
				let projIndex = thisUser.assigned_projects.indexOf(projId)
				if (projIndex > -1) {
					thisUser.assigned_projects.splice(projIndex, 1)
				}
				thisUser.save()
			})
		)
	})
})

const model = mongoose.model('Project', projectSchema)

export default model
