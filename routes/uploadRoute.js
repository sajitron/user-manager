const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const keys = require('../config/keys');
const { requireLogin } = require('../middlewares');

cloudinary.config({
	cloud_name: keys.cloud_name,
	api_key: keys.cloudinary_api_key,
	api_secret: keys.cloudinary_api_secret
});

const storage = cloudinaryStorage({
	cloudinary,
	folder: 'user-manager',
	allowedFormats: [ 'jpg', 'jpeg', 'png' ],
	transformation: [ { width: 500, height: 500, crop: 'limit' } ]
});

const parser = multer({ storage });

module.exports = (app) => {
	app.post('/api/upload', requireLogin, (req, res) => {
		console.log(req.files);
		// const image = {};
		// image.url = req.file.url;
		// image.id = req.file.public_id;

		res.send('hello');
	});
};
