const mongoose = require('mongoose')
var Schema = mongoose.Schema

const schema = Schema({
	name: String,
	details: String,
	steps: String,
	version: String,
	priority: Number,
	assigned: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	creator: { type: Schema.Types.ObjectId, ref: 'User' },
	time: Date(),
})

const model = mongoose.model('Bugs', schema)

module.exports = model
