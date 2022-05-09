import mongoose from "mongoose"

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
		//minlength: 6,
	},
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	token: {
		type: String
	},
	role: {
		type: String,
	},
})

const model = mongoose.model('User', userSchema)

export default model
