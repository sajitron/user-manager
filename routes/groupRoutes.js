const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Group = mongoose.model('group');

// @TODO
// Add requireLogin and cleanCache middlewares
module.exports = (app) => {
	app.post('/api/groups', requireLogin, async (req, res) => {
		const { name, description } = req.body;

		const group = new Group({
			name,
			description
		});

		try {
			await group.save();
			res.status(200).send(group);
		} catch (error) {
			res.status(400).send(error);
		}
	});

	app.get('/api/groups', requireLogin, cleanCache, async (req, res) => {
		const groups = await Group.find({});
		try {
			res.status(200).send(groups);
		} catch (error) {
			res.status(400).send(error);
		}
	});

	app.get('/api/groups/:id', requireLogin, async (req, res) => {
		const groupId = req.params.id;

		const group = await Group.findById(groupId);

		try {
			res.status(200).send(group);
		} catch (error) {
			res.status(400).send(error);
		}
	});

	app.delete('/api/groups/:id', requireLogin, async (req, res) => {
		const groupId = req.params.id;

		try {
			const group = await Group.findByIdAndRemove(groupId);
			res.status(200).send(group);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
