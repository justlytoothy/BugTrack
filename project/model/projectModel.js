import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
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
	project_owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

const model = mongoose.model('Project', projectSchema)

export default model
