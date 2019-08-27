const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
	user_id: String,
	last_four: String,
	card_type: String,
	is_default: Boolean,
	created_at: {
		type: Date,
		default: Date.now().toString()
	}
});

model('card', CardSchema);
