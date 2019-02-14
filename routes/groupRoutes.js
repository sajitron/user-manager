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

	// fetch groups that user is not a member
	app.get('/api/membergroups/:id', async (req, res) => {
		let memberid = req.params.id;

		let member = await Member.findById(memberid);

		let allGroups = await Group.find({});
		let groups = await Group.find({ _id: { $in: member.groups } });

		let uniqArr1 = allGroups.filter((obj) => {
			return !groups.some((obj2) => {
				return obj.name == obj2.name;
			});
		});

		let uniqArr2 = groups.filter((obj) => {
			return !allGroups.some((obj2) => {
				return obj.name == obj2.name;
			});
		});

		let result = uniqArr1.concat(uniqArr2);
		try {
			res.status(200).send(result);
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
