const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 2
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	imageUrl: String,
	birthDate: {
		type: Date,
		required: true
	},
	groups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'group'
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('client', clientSchema);
