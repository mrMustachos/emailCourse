const passport = require('passport');

exports.checkLogin = (req, res, next) => {
	if (!req.user) return res.status(401).send({ error: 'You Must Login!' });
	next();
};

exports.checkCredits = (req, res, next) => {
	if (req.user.credits < 1) return res.status(403).send({ error: 'Not enough credits!' });
	next();
};

exports.googleLoginOut = (req, res) => {
	req.logout();
	res.redirect('/');
};

exports.currentUser = (req, res) => {
	res.send(req.user);
};

exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google');

exports.googleRedirect = (req, res) => {
	res.redirect('/surveys');
};

