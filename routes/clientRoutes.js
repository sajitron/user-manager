const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Client = mongoose.model('client');

// @TODO add requireLogin
module.exports = (app) => {
	app.post('/api/clients', async (req, res) => {
		const { firstName, lastName, birthDate, imageUrl, email } = req.body;

		const client = new Client({
			firstName,
			lastName,
			email,
			birthDate,
			imageUrl
		});

		try {
			await client.save();
			res.status(200).send(client);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
