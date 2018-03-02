const keys = require('../../config/keys');

var extend = (obj1, obj2) => {
	for (key in obj2) { obj1[key] = obj2[key] }
	return obj1;
}

module.exports = (url, qs) => {
	qs = qs || {};
	var obj = {
		uri: `https://api.phish.net/v3${url}`,
		qs: { apikey: keys.phishKey },
		headers: { 'User-Agent': 'Request-Promise' },
		json: true
	}
	
	extend(obj.qs, qs);
	return obj;
};