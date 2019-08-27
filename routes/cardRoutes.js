const mongoose = require('mongoose');
const { requireLogin } = require('../middlewares');
const { updateCards } = require('../helpers/Card');

const Card = mongoose.model('card');

module.exports = async (app) => {
	app.post('/api/card', async (req, res) => {
		const { user_id, last_four, card_type } = req.body;

		//* get all users cards
		const userCards = await Card.find({ user_id }).exec();

		if (userCards.length) {
			// const cardIds = userCards.filter((card) => card._id);
			const cardIds = [ ...new Set(userCards.map((card) => card._id.toString())) ];

			const cardUpdates = await updateCards(cardIds);
			console.log('Updated Cards Success', cardUpdates);
		}

		const card = new Card({
			user_id,
			last_four,
			card_type,
			is_default: true
		});

		try {
			await card.save();
			res.status(200).send(card);
		} catch (error) {
			console.error('Card Save Error', error);
			res.status(400).send(error);
		}
	});
};
