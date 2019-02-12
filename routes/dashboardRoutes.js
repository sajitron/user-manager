const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Group = mongoose.model('group');
const Member = mongoose.model('member');

module.exports = (app) => {
	app.get('/api/somegroups', requireLogin, cleanCache, async (req, res) => {
		const groups = await Group.find({}).limit(4);
		try {
			res.status(200).send(groups);
		} catch (error) {
			res.status(400).send(error);
		}
	});

	app.get('/api/somemembers', requireLogin, cleanCache, async (req, res) => {
		const members = await Member.find({}).limit(8);
		try {
			res.status(200).send(members);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
