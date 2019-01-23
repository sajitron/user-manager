const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
	await next();

	clearHash(req.user.id);
};

// clearCache is meant to run after the route handler which is not supported in express. however, setting an await on next means the clearHash waits for next (route handler) to be called before running
