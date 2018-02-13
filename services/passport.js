// Commom PassportJS Issues:
//  - Does require us to reach into spcific points of the flow to make stuff work
//  - inharent confusion on how the library is constructed
//     • you always need passport [http://www.passportjs.org/docs/]
//     • you also need the libs for the type of auth you are trying to do ie fb, google, email/password, ect [http://www.passportjs.org/packages/]


const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
	// this user.id is the mongo generated id. this is a short hand for the _id.$oid.
	// i think this might be bad to do, consider making a uniqu id of your own.
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		});
});

passport.use(
	new googleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ googleId: profile.id })
			.then((existingUser) => {
				if (existingUser) {
					// we already have a record with the givin profile ID
					done(null, existingUser);
				} else {
					// we dont't have a user record with this ID, so make a new one
					new User({ googleId: profile.id })
						.save()
						.then((user) => done(null, user));
				}
			});
	})
);