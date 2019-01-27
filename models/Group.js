const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'member'
		}
	],
	createdAt: {
		type: Date,
		default: Date.now().toString()
	}
});

mongoose.model('group', groupSchema);
