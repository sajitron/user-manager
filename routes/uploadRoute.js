const { requireLogin, cloudinaryConfig } = require('../middlewares');
const { uploads, dataUri, uploader } = cloudinaryConfig;

module.exports = (app) => {
	app.post('/api/upload', requireLogin, uploads, (req, res) => {
		if (req.files.file) {
			const file = dataUri(req).content;

			return uploader
				.upload(file)
				.then((result) => {
					return res.status(200).send(result);
				})
				.catch((err) => res.status(400).send(err));
		}
	});
};
