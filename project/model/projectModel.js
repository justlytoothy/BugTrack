import mongoose from 'mongoose';
import userModel from './userModel.js';

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
	tickets: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
		required: false,
	},
	project_owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

projectSchema.post('findOneAndDelete', (document) => {
	const projId = document._id;
	console.log(`${projId} has been deleted`);
	userModel.find({ assigned_projects: { $in: [projId] } }).then((users) => {
		Promise.all(
			users.map((user) =>
				userModel.findOneAndUpdate(
					user._id,
					{ $pull: { assigned_projects: projId } },
					{ new: true }
				)
			)
		);
	});
});

const model = mongoose.model('Project', projectSchema);

export default model;
