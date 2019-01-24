const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Group = mongoose.model('group');

module.exports = (app) => {
	app.post('/api/groups', async (req, res) => {
		const { name, description } = req.body;

		const group = new Group({
			name,
			description
		});

		try {
			await group.save();
			res.send(group);
		} catch (error) {
			res.send(400, error);
		}
	});
};
