const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);

// client.hget returns a callback, however to circumvent that, we use the promisify method on utils to return a promise
client.hget = util.promisify(client.hget);

// store a reference to the original function
const exec = mongoose.Query.prototype.exec;

// set up top-level parameter (options object) which has a key property
mongoose.Query.prototype.cache = function(options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');

	return this;
};

mongoose.Query.prototype.exec = async function() {
	if (!this.useCache) {
		// return original exec function
		return exec.apply(this, arguments);
	}
	// create a copy of this.getQuery and add collection property to it in order to create a unique key using Object.assign()

	// getQuery() gets the current query(s) being run
	// this.mongooseCollection.name gets the current collection being queried
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name
		})
	);

	// see if we have a value for 'key' in redis
	const cacheValue = await client.hget(this.hashKey, key);

	// if we do, return that
	if (cacheValue) {
		// get cached data and parse it back to JavaScript object
		const doc = JSON.parse(cacheValue);

		// the exec function expects us to return a mongoose model instance, however, we are getting just a raw json object..

		// so, convert the data to models using Query.model.. the data could be an object or an array of objects(multiple blogposts)
		return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
	}

	// otherwise, issue the query by running the original exec function and store result in redis

	const result = await exec.apply(this, arguments);

	// turn result to json before storing in redis bcos mongoose returns a mongoose document
	client.hset(this.hashKey, key, JSON.stringify(result));

	return result;
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	}
};
