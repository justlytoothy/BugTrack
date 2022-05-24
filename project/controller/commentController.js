import mongoose from 'mongoose';
import userModel from '../model/userModel.js';
import ticketModel from '../model/ticketModel.js';

const newComment = async (req, res) => {
	const { projName, projDesc, createdBy, employees } = req.body;
	let comment = '';
	try {
		const creator = await userModel.findById(createdBy);
		if (employees !== null) {
			comment = await commentModel.create({
				comment_name: projName,
				comment_description: projDesc,
				comment_owner: createdBy,
				employees: employees,
			});
		} else {
			comment = await commentModel.create({
				comment_name: first_name,
				comment_description: projDesc,
				comment_owner: createdBy,
			});
		}

		creator.assigned_comments.push(comment._id);
		creator.save();
		return res.status(201).json(comment);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ Error: err });
	}
};

const getAllComments = async (req, res) => {
	let id = req.query[0];
	const currUser = await userModel.findById(id);
	const assigned_comments = currUser.assigned_comments;
	try {
		const response = await commentModel
			.find({
				_id: { $in: assigned_comments },
			})
			.populate('employees')
			.exec();
		return res.json(response);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ Error: error });
	}
};

const getComment = async (req, res) => {
	const id = req.query[0];
	try {
		const comment = await commentModel
			.findById(id)
			.populate('employees')
			.populate({
				path: 'tickets',
				populate: { path: 'assigned_employees ticket_creator' },
			})
			.exec();
		return res.status(200).json(comment);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ Error: error });
	}
};

const deleteComment = async (req, res) => {
	try {
		const id = await commentModel.findOneAndDelete({
			_id: req.body.id,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ Error: error });
	}

	// const commentEmployees = await userModel.find({
	// 	assigned_comments: id,
	// });
	// console.log(commentEmployees);
};

export default {
	newComment,
	getAllComments,
	getComment,
	deleteComment,
};
