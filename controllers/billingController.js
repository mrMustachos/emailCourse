const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../services/requireLogin');


exports.getPayed = async (req, res) => {
	const charge = await stripe.charges.create({
		amount: 500,
		currency: 'usd',
		source: req.body.id,
		description: '$5 for 5 credits from emaily.com'
	});

	req.user.credits += 5;
	const user = await req.user.save();

	res.send(user);
};