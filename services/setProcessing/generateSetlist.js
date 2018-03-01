const requestP = require('request-promise-native');
const setlistDataCleaner = require('./setlistDataCleaner');
const options = require('./optionsCreater');


module.exports = async (req, res, next) => {
  const setlistPromise = requestP(options('/setlists/get', { showdate: '2017-08-06' }));
  const jamchartPromise = requestP(options('/jamcharts/all'));
  
  const [setlist, jamchart] = await Promise.all([setlistPromise, jamchartPromise]);
  const base = await setlistDataCleaner(setlist.response.data[0], jamchart.response.data);

  res.locals.base = base;
  next();
};










// module.exports = async (req, res, next) => {
// 	const user = await User.findOne({
// 		restPasswordToken: req.params.token,
// 		resetPasswordExpires: { $gt: Date.now() }
// 	});
// 	if (!user) {
// 		req.flash('error', 'Password rest is invalid or has expired');
// 		return res.redirect('/login');
// 	}
// 	res.locals.user = user;
// 	next();
// };