const mongoose = require('mongoose');
const { requireLogin, cleanCache } = require('../middlewares');

const Group = mongoose.model('group');
const Member = mongoose.model('member');

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

	app.get('/api/groups', cleanCache, async (req, res) => {
		const groups = await Group.find({}).sort({ name: 1 }).populate('members');
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

	// add member to group
	app.get('/api/member2group/:memberid/:groupid', async (req, res) => {
		let memberId = req.params.memberid;
		let groupId = req.params.groupid;
		let groups = await Group.find({});

		let selectGroup = groups.filter((group) => {
			return group._id.toString() === groupId.toString();
		});

		let member = await Member.findById(memberId);

		selectGroup[0].members.push(member);

		member.groups.push(selectGroup[0]);

		selectGroup[0].save();
		member.save();
		// console.log(`Member: ${memberId}, Group: ${groupId}`);

		try {
			res.status(200).send(member);
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
