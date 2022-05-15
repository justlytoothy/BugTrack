import mongoose from 'mongoose'

const schema = mongoose.Schema({
	name: String,
	password: String,
	role: String,
})

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	preferred_full_name: {
		type: String,
	},
	token: {
		type: String,
	},
	role: {
		type: String,
	},
	assigned_projects: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
		required: false,
	},
})

const model = mongoose.model('User', userSchema)

export default model
