const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Member = mongoose.model('member');

// @TODO add requireLogin
module.exports = (app) => {
	app.post('/api/members', requireLogin, async (req, res) => {
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

	app.get('/api/members', requireLogin, cleanCache, async (req, res) => {
		const members = await Member.find({}).sort({ firstName: 1 });
		try {
			res.status(200).send(members);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
