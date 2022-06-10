import mongoose from 'mongoose';
import userModel from './userModel.js';
import projectModel from './projectModel.js';
import mongooseTrack from 'mongoose-track';


const commentSchema = new mongoose.Schema(
	{
		message: String,
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);
const ticketSchema = new mongoose.Schema(
	{
		ticket_name: String,
		ticket_description: String,
		ticket_status: { type: String, required: false, default: 'open' },
		ticket_type: String,
		ticket_steps: String,
		ticket_priority: Number,
		assigned_employees: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		],
		project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
		ticket_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		ticket_comments: { type: [commentSchema], required: false },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

ticketSchema.plugin(mongooseTrack.plugin);

ticketSchema.post('findOneAndDelete', (document) => {
	const ticketId = document._id;
	projectModel.find({ tickets: { $in: [ticketId] } }).then((projects) => {
		Promise.all(
			projects.map((project) =>
				projectModel.findOneAndUpdate(
					project._id,
					{ $pull: { tickets: ticketId } },
					{ new: true }
				)
			)
		);
	});

	userModel
		.find({
			$or: [
				{ created_tickets: { $in: [ticketId] } },
				{ assigned_tickets: { $in: [ticketId] } },
			],
		})
		.then((users) => {
			Promise.all(
				users.map(async (user) => {
					let thisUser = await userModel.findById(user._id);
					let createdIndex =
						thisUser.created_tickets.indexOf(ticketId);
					let assignedIndex =
						thisUser.assigned_tickets.indexOf(ticketId);
					if (createdIndex > -1) {
						thisUser.created_tickets.splice(createdIndex, 1);
					}
					if (assignedIndex > -1) {
						thisUser.assigned_tickets.splice(assignedIndex, 1);
					}
					thisUser.save();
				})
			);
		});
});

const model = mongoose.model('Ticket', ticketSchema);

export default model;
