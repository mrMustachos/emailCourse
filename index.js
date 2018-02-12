const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Commom PassportJS Issues:
//  - Does require us to reach into spcific points of the flow to make stuff work
//  - inharent confusion on how the library is constructed
//     • you always need passport [http://www.passportjs.org/docs/]
//     • you also need the libs for the type of auth you are trying to do ie fb, google, email/password, ect [http://www.passportjs.org/packages/]

passport.use(new googleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);