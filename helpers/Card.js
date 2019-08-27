const mongoose = require('mongoose');

const Card = mongoose.model('card');

module.exports = {
	updateCards: async (ids) => {
		console.log(ids);
		const updatedCards = await Card.findByIdAndUpdate(
			{ _id: { $in: ids } },
			{ $set: { is_default: false } }
		).exec();

		console.log('Cards updated', updatedCards);
	}
};
