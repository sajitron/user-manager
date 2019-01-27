const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Member = mongoose.model('member');

// @TODO add requireLogin
module.exports = (app) => {
	app.post('/api/clients', async (req, res) => {
		const { firstName, lastName, birthDate, imageUrl, email } = req.body;

		const member = new Member({
			firstName,
			lastName,
			email,
			birthDate,
			imageUrl
		});

		try {
			await member.save();
			res.status(200).send(member);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
